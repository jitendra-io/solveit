// LocalStorage high scores & personal best records tracker

const STORAGE_KEY = 'solveit_records_v1';

export function getHighScores() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveHighScore({ difficultyId, score, moves, timeSeconds }) {
  if (typeof window === 'undefined') return { isNewBest: false };
  try {
    const records = getHighScores();
    const existing = records[difficultyId] || { bestScore: 0, bestTime: Infinity, bestMoves: Infinity };

    const isNewBestScore = score > existing.bestScore;
    const isNewBestTime = timeSeconds < existing.bestTime;
    const isNewBestMoves = moves < existing.bestMoves;

    const updated = {
      bestScore: Math.max(existing.bestScore, score),
      bestTime: Math.min(existing.bestTime, timeSeconds),
      bestMoves: Math.min(existing.bestMoves, moves),
      lastPlayed: new Date().toISOString(),
    };

    records[difficultyId] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));

    return {
      isNewBest: isNewBestScore || isNewBestTime || isNewBestMoves,
      updatedRecord: updated,
    };
  } catch {
    return { isNewBest: false };
  }
}

