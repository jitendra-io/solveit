import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Puzzle,
  Settings,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react';

import PuzzleBoard from './components/PuzzleBoard';
import LiveHUD from './components/LiveHUD';
import ResultsModal from './components/ResultsModal';
import RulesDrawer from './components/RulesDrawer';
import ImageSelector from './components/ImageSelector';
import BottomDock from './components/BottomDock';

import { PRESET_IMAGES } from './constants/presets';
import { DIFFICULTIES, DEFAULT_GAME_RULES } from './constants/gameConfig';
import {
  generateDerangement,
  svgToNormalizedDataUrl,
  calculateLiveScore,
  evaluateResultsTier
} from './utils/canvas';
import { sound } from './utils/sound';

export default function App() {
  // Game Configuration & Rules State
  const [rules, setRules] = useState(DEFAULT_GAME_RULES);
  const [currentDifficulty, setCurrentDifficulty] = useState(DIFFICULTIES[0]); // Easy (3x3)
  const [currentPreset, setCurrentPreset] = useState(PRESET_IMAGES[0]); // Jungle Safari Express
  const [normalizedImageSrc, setNormalizedImageSrc] = useState('');

  // Game Play State
  const [gameState, setGameState] = useState('setup'); // 'setup' | 'playing' | 'paused' | 'won' | 'lost'
  const [tiles, setTiles] = useState([]);
  const [moves, setMoves] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(DIFFICULTIES[0].defaultTimeLimit);

  // UI Interactive States
  const [isPeeking, setIsPeeking] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [resultsTierInfo, setResultsTierInfo] = useState(null);

  // Ref to hold current timer ID
  const timerRef = useRef(null);

  // Synchronize sound enabled state with sound engine
  useEffect(() => {
    sound.setEnabled(rules.soundEnabled);
  }, [rules.soundEnabled]);

  // Load preset SVG as normalized square data URL
  const loadPresetArtwork = useCallback(async (preset) => {
    try {
      const dataUrl = await svgToNormalizedDataUrl(preset.svg);
      setNormalizedImageSrc(dataUrl);
      return dataUrl;
    } catch (err) {
      console.error('Failed to normalize preset image:', err);
      return null;
    }
  }, []);

  // Initialize board with guaranteed 0% initial correct placement (Derangement)
  const initializeBoard = useCallback((gridSize, customTime = null) => {
    const totalTiles = gridSize * gridSize;
    const initialTiles = generateDerangement(totalTiles);
    setTiles(initialTiles);
    setMoves(0);
    setElapsedSeconds(0);

    const timeLimit = customTime !== null
      ? customTime
      : (rules.customTimeLimit || currentDifficulty.defaultTimeLimit);

    setTimeRemaining(timeLimit);
    setGameState('playing');
    setIsResultsOpen(false);
    setResultsTierInfo(null);
  }, [rules.customTimeLimit, currentDifficulty]);

  // Initial mount: load first preset and start board
  useEffect(() => {
    let mounted = true;
    loadPresetArtwork(PRESET_IMAGES[0]).then(() => {
      if (mounted) {
        initializeBoard(DIFFICULTIES[0].gridSize);
      }
    });
    return () => {
      mounted = false;
    };
  }, [initializeBoard, loadPresetArtwork]);

  // Handle Game Over (Timeout or Moves Exceeded)
  const handleGameOver = useCallback((reason) => {
    setGameState('lost');

    const currentCorrect = tiles.filter((t, i) => t.correctIndex === i).length;
    const timeLimit = rules.customTimeLimit || currentDifficulty.defaultTimeLimit;

    const tier = evaluateResultsTier({
      isWon: false,
      elapsedSeconds,
      timeLimit,
      isCountdown: rules.timerMode === 'countdown',
      moves,
      gridSize: currentDifficulty.gridSize,
      pieceCount: currentDifficulty.pieceCount,
      tierThresholds: rules.tierThresholds,
      lossReason: reason,
      correctCount: currentCorrect,
    });

    setResultsTierInfo(tier);
    setIsResultsOpen(true);
  }, [tiles, rules, currentDifficulty, elapsedSeconds, moves]);

  // Handle Win Condition
  const handleGameWon = useCallback(() => {
    setGameState('won');
    if (timerRef.current) clearInterval(timerRef.current);

    const timeLimit = rules.customTimeLimit || currentDifficulty.defaultTimeLimit;

    const tier = evaluateResultsTier({
      isWon: true,
      elapsedSeconds,
      timeLimit,
      isCountdown: rules.timerMode === 'countdown',
      moves: moves + 1,
      gridSize: currentDifficulty.gridSize,
      pieceCount: currentDifficulty.pieceCount,
      tierThresholds: rules.tierThresholds,
      correctCount: currentDifficulty.pieceCount,
    });

    setResultsTierInfo(tier);
    setIsResultsOpen(true);
  }, [rules, currentDifficulty, elapsedSeconds, moves]);

  // Timer Tick Hook (Accurate with pause and cleanup)
  useEffect(() => {
    if (gameState !== 'playing' || isSettingsOpen) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);

      if (rules.timerMode === 'countdown') {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleGameOver('timeout');
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, isSettingsOpen, rules.timerMode, handleGameOver]);

  // Dynamically calculate live score via memoization (cleaner than setting state in effect)
  const liveScore = useMemo(() => {
    const correctPieces = tiles.filter((t, i) => t.correctIndex === i).length;
    return calculateLiveScore({
      basePoints: currentDifficulty.basePoints,
      gridSize: currentDifficulty.gridSize,
      moves,
      timeRemaining,
      isCountdown: rules.timerMode === 'countdown',
      elapsedSeconds,
      correctCount: correctPieces,
      totalTiles: currentDifficulty.pieceCount,
    });
  }, [tiles, moves, timeRemaining, elapsedSeconds, currentDifficulty, rules.timerMode]);

  // Tile Swap Engine with Win Condition Detection
  const handleSwapTiles = useCallback((slotA, slotB) => {
    if (gameState !== 'playing' || slotA === slotB) return;

    setTiles((prevTiles) => {
      const newTiles = [...prevTiles];
      const tileA = { ...newTiles[slotA], currentSlot: slotB };
      const tileB = { ...newTiles[slotB], currentSlot: slotA };
      newTiles[slotA] = tileB;
      newTiles[slotB] = tileA;

      // Increment moves counter
      const nextMoves = moves + 1;
      setMoves(nextMoves);

      // Check move limit violation
      if (rules.moveLimitEnabled && rules.customMoveLimit > 0 && nextMoves >= rules.customMoveLimit) {
        // Check if this swap actually won the game before calling game over
        const isNowSolved = newTiles.every((t, idx) => t.correctIndex === idx);
        if (isNowSolved) {
          setTimeout(handleGameWon, 250);
        } else {
          setTimeout(() => handleGameOver('moves_exceeded'), 250);
        }
        return newTiles;
      }

      // Check win condition (all tiles match their correctIndex)
      const isNowSolved = newTiles.every((t, idx) => t.correctIndex === idx);
      if (isNowSolved) {
        setTimeout(handleGameWon, 250);
      }

      return newTiles;
    });
  }, [gameState, moves, rules, handleGameWon, handleGameOver]);

  // Difficulty Selector Handler
  const handleSelectDifficulty = (diff) => {
    setCurrentDifficulty(diff);
    initializeBoard(diff.gridSize, diff.defaultTimeLimit);
  };

  // Preset Selection Handler
  const handleSelectPreset = async (preset) => {
    setCurrentPreset(preset);
    await loadPresetArtwork(preset);
    initializeBoard(currentDifficulty.gridSize);
  };

  // Custom Image Upload Handler
  const handleCustomImageUploaded = (dataUrl, fileName) => {
    setCurrentPreset({
      id: 'custom-upload',
      name: fileName || 'Custom Photo',
      category: 'Uploaded',
      description: 'Custom 1:1 normalized image',
      badge: 'Custom',
    });
    setNormalizedImageSrc(dataUrl);
    initializeBoard(currentDifficulty.gridSize);
  };

  // Adaptive CTAs for Results Modal
  const handleNextDifficulty = () => {
    const currentIndex = DIFFICULTIES.findIndex((d) => d.id === currentDifficulty.id);
    const nextDiff = DIFFICULTIES[Math.min(DIFFICULTIES.length - 1, currentIndex + 1)];
    setCurrentDifficulty(nextDiff);
    setIsResultsOpen(false);
    initializeBoard(nextDiff.gridSize, nextDiff.defaultTimeLimit);
  };

  const handleRetryWithBonus = () => {
    setIsResultsOpen(false);
    const bonusTime = timeRemaining + 15;
    initializeBoard(currentDifficulty.gridSize, bonusTime);
  };

  const handleSwitchToCasual = () => {
    setRules((prev) => ({ ...prev, timerMode: 'stopwatch' }));
    setIsResultsOpen(false);
    initializeBoard(currentDifficulty.gridSize);
  };

  // Count correct pieces
  const correctCount = tiles.filter((t, i) => t.correctIndex === i).length;
  const isSolved = gameState === 'won';

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 font-sans ${
        rules.theme === 'artisan-wood' ? 'bg-wood-table text-[#f5ede6]' : 'bg-studio-dark text-slate-100'
      }`}
    >
      {/* Top Navigation & Brand Header */}
      <header
        className={`w-full py-2.5 px-4 md:px-8 border-b transition-colors z-20 flex items-center justify-between ${
          rules.theme === 'artisan-wood'
            ? 'bg-[#21150c]/90 border-[#633e1e]/60 shadow-md backdrop-blur-md'
            : 'bg-slate-900/80 border-slate-800 shadow-md backdrop-blur-md'
        }`}
      >
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-xl border flex items-center justify-center shadow ${
              rules.theme === 'artisan-wood'
                ? 'bg-[#d8a873] border-[#e8c89b] text-[#24170d]'
                : 'bg-amber-500 border-amber-400 text-slate-950'
            }`}
          >
            <Puzzle className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-base md:text-lg tracking-tight flex items-center gap-2">
              <span>SolveIt</span>
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                yourjitendra
              </span>
            </h1>
            <p className="text-[11px] opacity-60 hidden sm:block">
              Tactile browser-based image slicing puzzle with hybrid touch & drag
            </p>
          </div>
        </div>

        {/* Desktop Quick Header Actions */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => setRules((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
            title={rules.soundEnabled ? 'Mute Audio' : 'Enable Audio'}
            className="p-2 rounded-xl bg-black/20 hover:bg-black/30 border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
          >
            {rules.soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
          </button>

          {/* Quick Shuffle */}
          <button
            type="button"
            onClick={() => initializeBoard(currentDifficulty.gridSize)}
            title="Shuffle Board"
            className="hidden sm:flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-black/20 hover:bg-black/30 border border-white/10 text-sky-300 font-semibold text-xs transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Shuffle</span>
          </button>

          {/* Settings Trigger */}
          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md cursor-pointer active:scale-95"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Game Rules</span>
          </button>
        </div>
      </header>

      {/* Main Responsive Playground */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-3 md:p-6 lg:p-8 flex flex-col justify-center">
        {/* Mobile Layout (< 768px): Compact 100dvh Fit */}
        <div className="flex md:hidden flex-col items-center justify-between w-full max-w-[440px] mx-auto gap-2.5">
          {/* Compact Top Live HUD */}
          <LiveHUD
            timerMode={rules.timerMode}
            timeRemaining={timeRemaining}
            elapsedSeconds={elapsedSeconds}
            timeLimit={rules.customTimeLimit || currentDifficulty.defaultTimeLimit}
            moves={moves}
            maxMoves={rules.moveLimitEnabled ? rules.customMoveLimit : 0}
            correctCount={correctCount}
            totalPieces={currentDifficulty.pieceCount}
            liveScore={liveScore}
            isPaused={gameState === 'paused'}
            isPeeking={isPeeking}
            soundEnabled={rules.soundEnabled}
            onToggleSound={() => setRules((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
            onTogglePause={() => setGameState((prev) => (prev === 'playing' ? 'paused' : 'playing'))}
            onRestart={() => initializeBoard(currentDifficulty.gridSize)}
            onPeekStart={() => setIsPeeking(true)}
            onPeekEnd={() => setIsPeeking(false)}
            theme={rules.theme}
          />

          {/* Centered Wooden Puzzle Board */}
          <div className="w-[92vw] max-w-[420px] aspect-square flex items-center justify-center my-1">
            <PuzzleBoard
              gridSize={currentDifficulty.gridSize}
              tiles={tiles}
              imageSrc={normalizedImageSrc}
              isLockedPiecesEnabled={rules.lockCorrectPieces}
              isPeeking={isPeeking}
              isSolved={isSolved}
              isGameActive={gameState === 'playing'}
              onSwapTiles={handleSwapTiles}
              theme={rules.theme}
            />
          </div>

          {/* Bottom Dock with Quick Actions */}
          <BottomDock
            currentDifficulty={currentDifficulty}
            onSelectDifficulty={handleSelectDifficulty}
            onRestart={() => initializeBoard(currentDifficulty.gridSize)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onPeekStart={() => setIsPeeking(true)}
            onPeekEnd={() => setIsPeeking(false)}
            isPeeking={isPeeking}
            theme={rules.theme}
          />
        </div>

        {/* Desktop Layout (>= 768px): Two-Column Studio Layout */}
        <div className="hidden md:grid md:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left / Center Stage: Interactive Wooden Puzzle Board */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col items-center justify-center">
            {/* Board Sub-header / Difficulty Quick Bar */}
            <div className="w-full max-w-[520px] flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold opacity-75 uppercase tracking-wider">Difficulty:</span>
                <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-white/10">
                  {DIFFICULTIES.map((diff) => {
                    const isSelected = diff.gridSize === currentDifficulty.gridSize;
                    return (
                      <button
                        key={diff.id}
                        type="button"
                        onClick={() => handleSelectDifficulty(diff)}
                        className={`py-1 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 shadow-md'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {diff.name} ({diff.gridSize}&times;{diff.gridSize})
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="text-xs font-mono text-amber-300">
                {currentDifficulty.pieceCount} Pieces
              </div>
            </div>

            {/* The Wooden Board */}
            <PuzzleBoard
              gridSize={currentDifficulty.gridSize}
              tiles={tiles}
              imageSrc={normalizedImageSrc}
              isLockedPiecesEnabled={rules.lockCorrectPieces}
              isPeeking={isPeeking}
              isSolved={isSolved}
              isGameActive={gameState === 'playing'}
              onSwapTiles={handleSwapTiles}
              theme={rules.theme}
            />

            <div className="w-full max-w-[520px] mt-3 px-2 flex items-center justify-between text-xs opacity-60">
              <span>Method A: Click two pieces to swap</span>
              <span>Method B: Drag & drop pieces smoothly</span>
            </div>
          </div>

          {/* Right Sidebar: Live HUD, Image Ingestion, and Preset Selector */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-4">
            {/* Live HUD Panel */}
            <LiveHUD
              timerMode={rules.timerMode}
              timeRemaining={timeRemaining}
              elapsedSeconds={elapsedSeconds}
              timeLimit={rules.customTimeLimit || currentDifficulty.defaultTimeLimit}
              moves={moves}
              maxMoves={rules.moveLimitEnabled ? rules.customMoveLimit : 0}
              correctCount={correctCount}
              totalPieces={currentDifficulty.pieceCount}
              liveScore={liveScore}
              isPaused={gameState === 'paused'}
              isPeeking={isPeeking}
              soundEnabled={rules.soundEnabled}
              onToggleSound={() => setRules((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
              onTogglePause={() => setGameState((prev) => (prev === 'playing' ? 'paused' : 'playing'))}
              onRestart={() => initializeBoard(currentDifficulty.gridSize)}
              onPeekStart={() => setIsPeeking(true)}
              onPeekEnd={() => setIsPeeking(false)}
              theme={rules.theme}
            />

            {/* Image Selector & Custom Uploader Card */}
            <ImageSelector
              currentPresetId={currentPreset?.id}
              onSelectPreset={handleSelectPreset}
              onCustomImageUploaded={handleCustomImageUploaded}
              currentImageSrc={normalizedImageSrc}
              theme={rules.theme}
            />
          </div>
        </div>
      </main>

      {/* Rules & Setup Drawer */}
      <RulesDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        rules={rules}
        onUpdateRules={setRules}
        currentDifficulty={currentDifficulty}
        theme={rules.theme}
      />

      {/* Personalized Results Modal (4 Visibility Conditions) */}
      <ResultsModal
        isOpen={isResultsOpen}
        tierInfo={resultsTierInfo}
        score={liveScore}
        moves={moves}
        elapsedSeconds={elapsedSeconds}
        timeRemaining={timeRemaining}
        difficulty={currentDifficulty}
        isWon={gameState === 'won'}
        onClose={() => setIsResultsOpen(false)}
        onReplay={() => initializeBoard(currentDifficulty.gridSize)}
        onNextDifficulty={handleNextDifficulty}
        onRetryWithBonus={handleRetryWithBonus}
        onSwitchToCasual={handleSwitchToCasual}
        theme={rules.theme}
      />
    </div>
  );
}
