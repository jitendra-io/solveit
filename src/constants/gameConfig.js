// Game configuration, difficulty presets, and customizable tier rules

export const DIFFICULTIES = [
  {
    id: 'easy',
    name: 'Easy',
    gridSize: 3,
    pieceCount: 9,
    basePoints: 1000,
    defaultTimeLimit: 45, // seconds
    stopwatchFastTarget: 25,
    stopwatchAverageTarget: 50,
    recommendedMoves: 14,
  },
  {
    id: 'medium',
    name: 'Medium',
    gridSize: 4,
    pieceCount: 16,
    basePoints: 2500,
    defaultTimeLimit: 90,
    stopwatchFastTarget: 45,
    stopwatchAverageTarget: 90,
    recommendedMoves: 28,
  },
  {
    id: 'hard',
    name: 'Hard',
    gridSize: 5,
    pieceCount: 25,
    basePoints: 5000,
    defaultTimeLimit: 150,
    stopwatchFastTarget: 90,
    stopwatchAverageTarget: 160,
    recommendedMoves: 45,
  },
  {
    id: 'expert',
    name: 'Expert',
    gridSize: 6,
    pieceCount: 36,
    basePoints: 8000,
    defaultTimeLimit: 240,
    stopwatchFastTarget: 140,
    stopwatchAverageTarget: 260,
    recommendedMoves: 65,
  },
];

export const DEFAULT_TIER_THRESHOLDS = {
  // Fast finish: solved in <= fastPercent of limit (e.g. 45%) AND moves <= moveMultiplier * pieceCount
  fastMaxTimePercent: 45,
  fastMoveMultiplier: 1.5,
  
  // Average finish: solved between 46% and averageMaxTimePercent (e.g. 80%) of limit
  averageMaxTimePercent: 80,
  averageMoveMultiplier: 2.2,
  
  // Slow / Buzzer-Beater: solved with <= slowTimeRemainingPercent (e.g. 20%) time remaining
  slowTimeRemainingPercent: 20,
};

export const DEFAULT_GAME_RULES = {
  timerMode: 'countdown', // 'countdown' | 'stopwatch'
  customTimeLimit: null,  // null uses difficulty default
  moveLimitEnabled: false,
  customMoveLimit: 0,     // 0 = unlimited
  lockCorrectPieces: false,
  soundEnabled: true,
  showNumbers: true,      // toggleable corner numbering guide
  theme: 'artisan-wood',  // 'artisan-wood' | 'studio-dark'
  tierThresholds: { ...DEFAULT_TIER_THRESHOLDS },
};
