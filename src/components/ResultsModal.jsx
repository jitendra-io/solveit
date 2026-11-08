import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Zap,
  Award,
  Flame,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  Clock,
  Move,
  CheckCircle2,
  Share2,
  Sparkles,
  HelpCircle,
  Play,
  X,
  Home
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function ResultsModal({
  isOpen = false,
  tierInfo = null,
  score = 0,
  moves = 0,
  elapsedSeconds = 0,
  timeRemaining = 0,
  difficulty = {},
  isWon = true,
  onClose,
  onReplay,
  onNextDifficulty,
  onRetryWithBonus,
  onSwitchToCasual,
  onReturnHome,
  theme = 'artisan-wood',
}) {
  useEffect(() => {
    if (!isOpen) return;

    if (isWon) {
      sound.playVictory();
      const count = tierInfo?.tierId === 'gold' ? 120 : 60;
      confetti({
        particleCount: count,
        spread: 80,
        origin: { y: 0.6 },
        colors: tierInfo?.tierId === 'gold' 
          ? ['#f59e0b', '#fbbf24', '#fde68a', '#ffffff'] 
          : ['#38bdf8', '#818cf8', '#34d399', '#ffffff'],
      });
    } else {
      sound.playTimeout();
    }
  }, [isOpen, isWon, tierInfo]);

  if (!isOpen || !tierInfo) return null;

  const formatTime = (secs) => {
    const s = Math.max(0, Math.floor(secs));
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const isGold = tierInfo.tierId === 'gold';
  const isSilver = tierInfo.tierId === 'silver';
  const isBronze = tierInfo.tierId === 'bronze';
  const isLoss = tierInfo.tierId === 'loss';

  const getTierIcon = () => {
    if (isGold) return <Zap className="w-8 h-8 text-amber-300" />;
    if (isSilver) return <Award className="w-8 h-8 text-sky-300" />;
    if (isBronze) return <Flame className="w-8 h-8 text-orange-300" />;
    return <AlertTriangle className="w-8 h-8 text-rose-400" />;
  };

  const getTierBannerClass = () => {
    if (isGold) return 'from-amber-500/20 via-amber-600/10 to-transparent border-amber-500/40 text-amber-200';
    if (isSilver) return 'from-sky-500/20 via-indigo-600/10 to-transparent border-sky-500/40 text-sky-200';
    if (isBronze) return 'from-orange-500/20 via-amber-700/10 to-transparent border-orange-500/40 text-orange-200';
    return 'from-rose-500/20 via-rose-700/10 to-transparent border-rose-500/40 text-rose-200';
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'SolveIt Wooden Puzzle Game',
        text: `I just scored ${score} pts on ${difficulty.name} (${difficulty.gridSize}x${difficulty.gridSize}) in ${moves} moves! Can you beat my time?`,
        url: window.location.href,
      }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `I scored ${score} pts on SolveIt ${difficulty.name} (${difficulty.gridSize}x${difficulty.gridSize}) in ${moves} moves!`
      );
      alert('Score summary copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative w-full max-w-md max-h-[92dvh] overflow-y-auto rounded-3xl border-2 shadow-2xl transition-all duration-300 transform scale-100 ${
          theme === 'artisan-wood'
            ? 'bg-[#120a06] border-[#4a2816] text-[#f7efe6] shadow-black/90'
            : 'bg-slate-900 border-slate-700 text-slate-100'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className={`p-6 text-center border-b bg-gradient-to-b ${getTierBannerClass()}`}>
          <div className="inline-flex p-3 rounded-2xl bg-black/40 border border-white/10 shadow-lg mb-3">
            {getTierIcon()}
          </div>
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/30 border border-white/10 mb-2">
            {tierInfo.badgeText}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            {tierInfo.title}
          </h2>
          <p className="text-sm opacity-80 mt-1 font-medium">
            {tierInfo.subtitle}
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div
              className={`p-3 rounded-2xl border flex flex-col ${
                theme === 'artisan-wood'
                  ? 'bg-[#1a0f08] border-[#523318]'
                  : 'bg-slate-950/70 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs opacity-70">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Final Score</span>
              </div>
              <div className="font-mono text-xl font-bold mt-1 text-amber-300">
                {score.toLocaleString()}
              </div>
            </div>

            <div
              className={`p-3 rounded-2xl border flex flex-col ${
                theme === 'artisan-wood'
                  ? 'bg-[#1a0f08] border-[#523318]'
                  : 'bg-slate-950/70 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs opacity-70">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>Total Time</span>
              </div>
              <div className="font-mono text-xl font-bold mt-1 text-sky-300">
                {formatTime(elapsedSeconds)}
              </div>
            </div>

            <div
              className={`p-3 rounded-2xl border flex flex-col ${
                theme === 'artisan-wood'
                  ? 'bg-[#1a0f08] border-[#523318]'
                  : 'bg-slate-950/70 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs opacity-70">
                <Move className="w-3.5 h-3.5 text-indigo-400" />
                <span>Total Moves</span>
              </div>
              <div className="font-mono text-xl font-bold mt-1">
                {moves}
              </div>
            </div>

            <div
              className={`p-3 rounded-2xl border flex flex-col ${
                theme === 'artisan-wood'
                  ? 'bg-[#1a0f08] border-[#523318]'
                  : 'bg-slate-950/70 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs opacity-70">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Grid Tier</span>
              </div>
              <div className="font-mono text-xl font-bold mt-1 text-emerald-300">
                {difficulty.gridSize}x{difficulty.gridSize} ({difficulty.name})
              </div>
            </div>
          </div>

          {timeRemaining > 0 && isWon && (
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center justify-between">
              <span>Time Remaining Bonus:</span>
              <span className="font-mono font-bold">+{formatTime(timeRemaining)}</span>
            </div>
          )}

          {tierInfo.tip && (
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{tierInfo.tip}</span>
            </div>
          )}

          {tierInfo.efficiencyRating && (
            <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-200 text-xs flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>Efficiency Rating</span>
              </span>
              <span className="font-bold uppercase tracking-wider">{tierInfo.efficiencyRating}</span>
            </div>
          )}

          <div className="pt-2 space-y-2">
            {isGold && (
              <button
                type="button"
                onClick={onNextDifficulty}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <span>Challenge Next Difficulty Tier</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {isSilver && (
              <button
                type="button"
                onClick={onReplay}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Beat Your Time</span>
              </button>
            )}

            {isBronze && (
              <button
                type="button"
                onClick={onReplay}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Replay for Silver / Gold</span>
              </button>
            )}

            {isLoss && (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={onRetryWithBonus}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retry Same Board (+15s Bonus Time)</span>
                </button>
                <button
                  type="button"
                  onClick={onSwitchToCasual}
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs border border-white/20 hover:bg-white/10 text-slate-200 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Switch to Casual Mode</span>
                </button>
              </div>
            )}

            <div className="flex gap-2 pt-1">
              {!isLoss && (
                <button
                  type="button"
                  onClick={onReplay}
                  className="flex-1 py-2.5 px-3 rounded-xl font-medium text-xs border border-white/20 hover:bg-white/10 text-slate-200 flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Play Again</span>
                </button>
              )}
              <button
                type="button"
                onClick={onReturnHome}
                className="flex-1 py-2.5 px-3 rounded-xl font-medium text-xs border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-200 flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
              >
                <Home className="w-3.5 h-3.5 text-amber-400" />
                <span>Menu</span>
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="flex-1 py-2.5 px-3 rounded-xl font-medium text-xs border border-white/20 hover:bg-white/10 text-slate-200 flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
