// Canvas image normalization, smart Fisher-Yates derangement, scoring and tier evaluation

/**
 * Off-screen canvas image normalization
 * Center-crops image to 1:1 aspect ratio and caps resolution at max 1080x1080 for 60fps DOM performance
 */
export async function processImageFile(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Selected file is not an image'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to decode image data'));
      img.onload = () => {
        try {
          const resultDataUrl = normalizeImageToSquare(img);
          resolve(resultDataUrl);
        } catch (err) {
          reject(err);
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Converts SVG string to a normalized 1080x1080 square canvas data URL
 */
export async function svgToNormalizedDataUrl(svgString) {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const resultDataUrl = normalizeImageToSquare(img, 1080);
      URL.revokeObjectURL(url);
      resolve(resultDataUrl);
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
  });
}

/**
 * Crops source image center-square and paints onto offscreen canvas capped at maxDimension (default 1080)
 */
export function normalizeImageToSquare(img, maxDimension = 1080) {
  const canvas = document.createElement('canvas');
  const naturalWidth = img.naturalWidth || img.width;
  const naturalHeight = img.naturalHeight || img.height;

  // Find center-crop bounding box
  const minSide = Math.min(naturalWidth, naturalHeight);
  const sx = (naturalWidth - minSide) / 2;
  const sy = (naturalHeight - minSide) / 2;

  // Cap size at maxDimension
  const targetDimension = Math.min(minSide, maxDimension);
  canvas.width = targetDimension;
  canvas.height = targetDimension;

  const ctx = canvas.getContext('2d', { alpha: false });
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Draw center-cropped square
  ctx.drawImage(
    img,
    sx,
    sy,
    minSide,
    minSide,
    0,
    0,
    targetDimension,
    targetDimension
  );

  return canvas.toDataURL('image/jpeg', 0.92);
}

/**
 * Smart Fisher-Yates Derangement Algorithm
 * Randomizes tile positions such that strictly ZERO percent (0%) of tiles start in their solved correctIndex.
 */
export function generateDerangement(totalTiles) {
  const indices = Array.from({ length: totalTiles }, (_, i) => i);
  let shuffled = [...indices];

  let isDerangement = false;
  let attempts = 0;
  const maxAttempts = 200;

  while (!isDerangement && attempts < maxAttempts) {
    attempts++;
    // Standard Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Check if 0% are in their correct spot
    const hasAnyInPlace = shuffled.some((val, idx) => val === idx);
    if (!hasAnyInPlace) {
      isDerangement = true;
      break;
    }
  }

  // Fallback deterministic derangement shift if random derangement took too many attempts
  if (!isDerangement) {
    shuffled = indices.map((_, i) => (i + 1) % totalTiles);
    // Extra swap for variety if totalTiles > 3
    if (totalTiles > 3) {
      [shuffled[1], shuffled[2]] = [shuffled[2], shuffled[1]];
      // Validate again
      for (let i = 0; i < totalTiles; i++) {
        if (shuffled[i] === i) {
          const next = (i + 1) % totalTiles;
          [shuffled[i], shuffled[next]] = [shuffled[next], shuffled[i]];
        }
      }
    }
  }

  return shuffled.map((correctIndex, currentSlot) => ({
    id: `tile-${correctIndex}`,
    correctIndex,
    currentSlot,
    isLocked: false,
  }));
}

/**
 * Live dynamic score calculator
 * Score = (Base Difficulty Points) + (Time Remaining Bonus) - (Excess Move Penalty)
 */
export function calculateLiveScore({
  basePoints = 1000,
  gridSize = 3,
  moves = 0,
  timeRemaining = 0,
  isCountdown = true,
  elapsedSeconds = 0,
  correctCount = 0,
  totalTiles = 9,
}) {
  const recommendedMoves = Math.round(totalTiles * 1.5);
  const excessMoves = Math.max(0, moves - recommendedMoves);
  const movePenalty = excessMoves * (gridSize * 15);

  let timeBonus = 0;
  if (isCountdown) {
    timeBonus = Math.max(0, Math.round(timeRemaining * (gridSize * 20)));
  } else {
    // In stopwatch mode, fast times give bonus against a baseline target
    const baseline = totalTiles * 5;
    const timeSaved = Math.max(0, baseline - elapsedSeconds);
    timeBonus = Math.round(timeSaved * (gridSize * 15));
  }

  // Partial accuracy contribution during active play
  const accuracyRatio = totalTiles > 0 ? correctCount / totalTiles : 0;
  const progressPoints = Math.round(basePoints * accuracyRatio);

  const total = Math.max(100, progressPoints + timeBonus - movePenalty);
  return total;
}

/**
 * Results Visibility Conditions Evaluator
 * Maps game outcome to one of 4 rich tiers:
 * - Condition 1: Fast Finish (Gold Tier / Speed Demon)
 * - Condition 2: Average Finish (Silver Tier / Puzzle Tactician)
 * - Condition 3: Slow Finish (Bronze Tier / Clutch Survivor)
 * - Condition 4: Loser State (Time's Up / Out of Moves)
 */
export function evaluateResultsTier({
  isWon,
  elapsedSeconds,
  timeLimit,
  isCountdown,
  moves,
  pieceCount,
  tierThresholds,
  lossReason = 'timeout', // 'timeout' | 'moves_exceeded'
  correctCount = 0,
}) {
  if (!isWon) {
    return {
      tierId: 'loss',
      title: lossReason === 'timeout' ? "Time's Up!" : 'Move Limit Exceeded!',
      subtitle: `You placed ${correctCount} of ${pieceCount} pieces into position.`,
      badgeText: 'Challenge Incomplete',
      themeColor: 'rose', // rose / crimson theme
      lossReason,
      correctCount,
      pieceCount,
    };
  }

  const fastPercent = tierThresholds.fastMaxTimePercent;
  const fastMultiplier = tierThresholds.fastMoveMultiplier;
  const avgPercent = tierThresholds.averageMaxTimePercent;
  const slowRemaining = tierThresholds.slowTimeRemainingPercent;

  let timePercentUsed = 50;
  if (isCountdown && timeLimit > 0) {
    timePercentUsed = (elapsedSeconds / timeLimit) * 100;
  } else {
    // Stopwatch benchmark
    const benchmark = pieceCount * 3.5;
    timePercentUsed = Math.min(100, (elapsedSeconds / benchmark) * 100);
  }

  const movesRatio = moves / pieceCount;

  // Condition 1: Fast Finish (Gold Tier)
  if (timePercentUsed <= fastPercent && movesRatio <= fastMultiplier) {
    return {
      tierId: 'gold',
      title: 'Flawless Execution!',
      subtitle: 'Speed Demon Tier Mastered',
      badgeText: 'Gold Tier',
      themeColor: 'amber', // gold / amber
      efficiencyRating: 'Masterful',
      timePercentUsed: Math.round(timePercentUsed),
      movesRatio: movesRatio.toFixed(1),
    };
  }

  // Condition 3: Buzzer-Beater / Slow Finish (Bronze Tier)
  if (timePercentUsed >= (100 - slowRemaining) || movesRatio >= 3.0) {
    return {
      tierId: 'bronze',
      title: 'Right Down to the Wire!',
      subtitle: 'Clutch Survivor Finish',
      badgeText: 'Bronze Tier',
      themeColor: 'orange', // bronze / copper
      tip: 'Pro Tip: Use the Hold to Peek button strategically to plan ahead!',
      timePercentUsed: Math.round(timePercentUsed),
      movesRatio: movesRatio.toFixed(1),
    };
  }

  // Condition 2: Average Finish (Silver Tier)
  return {
    tierId: 'silver',
    title: 'Sharp Eyes & Solid Pacing!',
    subtitle: 'Puzzle Tactician Performance',
    badgeText: 'Silver Tier',
    themeColor: 'sky', // silver / cyan / indigo
    efficiencyRating: 'Strategic',
    timePercentUsed: Math.round(timePercentUsed),
    movesRatio: movesRatio.toFixed(1),
    thresholdTarget: avgPercent,
  };
}
