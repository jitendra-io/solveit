import React from 'react';
import { Clock, Move, Trophy, CheckCircle2, Eye, Volume2, VolumeX, Pause, Play, RotateCcw } from 'lucide-react';

export default function LiveHUD({
  timerMode = 'countdown', // 'countdown' | 'stopwatch'
  timeRemaining = 0,
  elapsedSeconds = 0,
  timeLimit = 60,
  moves = 0,
  maxMoves = 0,
  correctCount = 0,
  totalPieces = 9,
  liveScore = 0,
  isPaused = false,
  isPeeking = false,
  soundEnabled = true,
  onToggleSound,
  onTogglePause,
  onRestart,
  onPeekStart,
  onPeekEnd,
  theme = 'artisan-wood',
}) {
  const formatTime = (secs) => {
    const s = Math.max(0, Math.floor(secs));
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  let progressPercent = 100;
  let timerStatus = 'normal'; // 'normal' | 'warning' | 'critical'

  if (timerMode === 'countdown' && timeLimit > 0) {
    progressPercent = Math.min(100, Math.max(0, (timeRemaining / timeLimit) * 100));
    if (progressPercent <= 10) {
      timerStatus = 'critical';
    } else if (progressPercent <= 30) {
      timerStatus = 'warning';
    }
  } else {
    const expected = totalPieces * 4;
    progressPercent = Math.min(100, (elapsedSeconds / expected) * 100);
  }

  const completionPercent = Math.round((correctCount / totalPieces) * 100);

  return (
    <div className="w-full">
      {/* MOBILE COMPACT HUD (< 768px): Sleek 1-Row Bar Fits in 100dvh */}
      <div
        className={`md:hidden w-full rounded-2xl p-2 border shadow-lg backdrop-blur-md select-none transition-all ${
          theme === 'artisan-wood'
            ? 'bg-[#140b07]/95 border-[#381e10] text-[#f7efe6]'
            : 'bg-slate-900/90 border-slate-700/60 text-slate-100'
        }`}
      >
        {/* 4 Stats in 1 Compact Row with safe truncation */}
        <div className="grid grid-cols-4 gap-1.5 text-center">
          {/* Timer */}
          <div
            className={`p-1.5 rounded-xl border flex flex-col items-center justify-center min-w-0 ${
              timerStatus === 'critical'
                ? 'bg-rose-950/60 border-rose-600/70 text-rose-200 animate-pulse'
                : timerStatus === 'warning'
                ? 'bg-amber-950/50 border-amber-600/60 text-amber-200'
                : 'bg-[#1c100a] border-[#381e10]'
            }`}
          >
            <span className="text-[9px] opacity-70 flex items-center gap-0.5 font-bold uppercase tracking-wider truncate">
              <Clock className="w-2.5 h-2.5 shrink-0" />
              <span>Time</span>
            </span>
            <span className="font-mono text-xs font-black tracking-tight leading-none mt-0.5 truncate tabular-nums">
              {timerMode === 'countdown' ? formatTime(timeRemaining) : formatTime(elapsedSeconds)}
            </span>
          </div>

          {/* Moves */}
          <div className="p-1.5 rounded-xl border border-[#381e10] bg-[#1c100a] flex flex-col items-center justify-center min-w-0">
            <span className="text-[9px] opacity-70 flex items-center gap-0.5 font-bold uppercase tracking-wider truncate">
              <Move className="w-2.5 h-2.5 text-indigo-400 shrink-0" />
              <span>Moves</span>
            </span>
            <span className="font-mono text-xs font-black tracking-tight leading-none mt-0.5 truncate tabular-nums">
              {moves}
            </span>
          </div>

          {/* In Place */}
          <div className="p-1.5 rounded-xl border border-[#381e10] bg-[#1c100a] flex flex-col items-center justify-center min-w-0">
            <span className="text-[9px] opacity-70 flex items-center gap-0.5 font-bold uppercase tracking-wider truncate">
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
              <span>Placed</span>
            </span>
            <span className="font-mono text-xs font-black tracking-tight leading-none mt-0.5 text-emerald-300 truncate tabular-nums">
              {correctCount}/{totalPieces}
            </span>
          </div>

          {/* Live Score */}
          <div className="p-1.5 rounded-xl border border-[#381e10] bg-[#1c100a] flex flex-col items-center justify-center min-w-0">
            <span className="text-[9px] opacity-70 flex items-center gap-0.5 font-bold uppercase tracking-wider truncate">
              <Trophy className="w-2.5 h-2.5 text-amber-400 shrink-0" />
              <span>Score</span>
            </span>
            <span className="font-mono text-xs font-black tracking-tight leading-none mt-0.5 text-amber-300 truncate tabular-nums">
              {liveScore.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Unified Thin Progress Bar */}
        <div className="w-full bg-black/60 h-1.5 rounded-full mt-1.5 overflow-hidden flex">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              timerStatus === 'critical'
                ? 'bg-rose-500 animate-pulse'
                : timerStatus === 'warning'
                ? 'bg-amber-400'
                : 'bg-emerald-400'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* DESKTOP STUDIO HUD (>= 768px): Spacious 2x2 Grid Layout (Never Exceeds Card Area) */}
      <div
        className={`hidden md:block w-full rounded-2xl p-3.5 lg:p-4 transition-all duration-300 border ${
          theme === 'artisan-wood'
            ? 'bg-[#140b07]/95 border-[#381e10] text-[#f7efe6] shadow-xl backdrop-blur-md'
            : 'bg-slate-900/80 border-slate-700/60 text-slate-100 shadow-xl backdrop-blur-md'
        }`}
      >
        {/* Balanced 2x2 Grid: Gives each metric over 150px of width! */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Card 1: Time */}
          <div
            className={`flex flex-col justify-between rounded-xl p-3 transition-colors border min-w-0 ${
              timerStatus === 'critical'
                ? 'bg-rose-950/60 border-rose-600/70 text-rose-200 animate-pulse'
                : timerStatus === 'warning'
                ? 'bg-[#331807]/90 border-amber-600/60 text-amber-200'
                : theme === 'artisan-wood'
                ? 'bg-[#1c100a] border-[#381e10]'
                : 'bg-slate-950/60 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between text-xs opacity-75 mb-1.5 min-w-0">
              <span className="flex items-center gap-1.5 font-medium truncate">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{timerMode === 'countdown' ? 'Time Left' : 'Elapsed'}</span>
              </span>
            </div>
            <div className="font-mono text-xl lg:text-2xl font-bold tracking-tight truncate tabular-nums">
              {timerMode === 'countdown' ? formatTime(timeRemaining) : formatTime(elapsedSeconds)}
            </div>
            <div className="w-full bg-black/60 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  timerStatus === 'critical'
                    ? 'bg-rose-500 animate-pulse'
                    : timerStatus === 'warning'
                    ? 'bg-amber-400'
                    : 'bg-emerald-400'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Card 2: Live Score (Generous Width - Never Overflows!) */}
          <div
            className={`flex flex-col justify-between rounded-xl p-3 border min-w-0 ${
              theme === 'artisan-wood'
                ? 'bg-[#1c100a] border-[#381e10]'
                : 'bg-slate-950/60 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between text-xs opacity-75 mb-1.5 min-w-0">
              <span className="flex items-center gap-1.5 font-medium truncate text-amber-300">
                <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">Live Score</span>
              </span>
            </div>
            <div className="font-mono text-xl lg:text-2xl font-bold tracking-tight text-amber-400 truncate tabular-nums">
              {liveScore.toLocaleString()}
            </div>
            <div className="text-[10px] opacity-60 mt-2 font-mono truncate">
              Dynamic Rating
            </div>
          </div>

          {/* Card 3: Swaps / Moves */}
          <div
            className={`flex flex-col justify-between rounded-xl p-3 border min-w-0 ${
              theme === 'artisan-wood'
                ? 'bg-[#1c100a] border-[#381e10]'
                : 'bg-slate-950/60 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between text-xs opacity-75 mb-1.5 min-w-0">
              <span className="flex items-center gap-1.5 font-medium truncate">
                <Move className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="truncate">Swaps / Moves</span>
              </span>
              {maxMoves > 0 && (
                <span className="text-[10px] text-amber-400 font-mono shrink-0">Max {maxMoves}</span>
              )}
            </div>
            <div className="font-mono text-xl lg:text-2xl font-bold tracking-tight flex items-baseline gap-1 truncate tabular-nums">
              <span>{moves}</span>
              {maxMoves > 0 && <span className="text-xs opacity-50 font-normal">/ {maxMoves}</span>}
            </div>
            {maxMoves > 0 ? (
              <div className="w-full bg-black/60 h-1.5 rounded-full mt-2.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    moves >= maxMoves ? 'bg-rose-500' : 'bg-sky-400'
                  }`}
                  style={{ width: `${Math.min(100, (moves / maxMoves) * 100)}%` }}
                />
              </div>
            ) : (
              <div className="text-[10px] opacity-60 mt-2 font-mono truncate">Casual Moves</div>
            )}
          </div>

          {/* Card 4: Pieces In Place */}
          <div
            className={`flex flex-col justify-between rounded-xl p-3 border min-w-0 ${
              theme === 'artisan-wood'
                ? 'bg-[#1c100a] border-[#381e10]'
                : 'bg-slate-950/60 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between text-xs opacity-75 mb-1.5 min-w-0">
              <span className="flex items-center gap-1.5 font-medium truncate">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">In Place</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 shrink-0">{completionPercent}%</span>
            </div>
            <div className="font-mono text-xl lg:text-2xl font-bold tracking-tight text-emerald-300 flex items-baseline gap-1 truncate tabular-nums">
              <span>{correctCount}</span>
              <span className="text-xs opacity-50 font-normal">/ {totalPieces}</span>
            </div>
            <div className="w-full bg-black/60 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div
                className="h-full bg-emerald-400 transition-all duration-300 rounded-full"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Desktop Bottom Control Bar */}
        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#381e10] gap-2">
          <button
            type="button"
            onPointerDown={onPeekStart}
            onPointerUp={onPeekEnd}
            onPointerLeave={onPeekEnd}
            onTouchStart={onPeekStart}
            onTouchEnd={onPeekEnd}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs md:text-sm transition-all select-none cursor-pointer border shadow-md active:scale-95 ${
              isPeeking
                ? 'bg-amber-500 text-slate-950 border-amber-300 ring-2 ring-amber-400/60'
                : theme === 'artisan-wood'
                ? 'bg-[#27170e] hover:bg-[#382013] border-[#5a331c] text-[#f5ebd9]'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-100'
            }`}
          >
            <Eye className={`w-4 h-4 ${isPeeking ? 'text-slate-950' : 'text-amber-400'}`} />
            <span>{isPeeking ? 'Peeking Reference...' : 'Hold to Peek'}</span>
          </button>

          <button
            type="button"
            onClick={onTogglePause}
            title={isPaused ? 'Resume Game' : 'Pause Game'}
            className={`p-2.5 rounded-xl transition-all border cursor-pointer active:scale-95 ${
              isPaused
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : theme === 'artisan-wood'
                ? 'bg-[#23150d] hover:bg-[#331e13] border-[#472714] text-[#e0985c]'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-200'
            }`}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onRestart}
            title="Restart / Shuffle Board"
            className={`p-2.5 rounded-xl transition-all border cursor-pointer active:scale-95 ${
              theme === 'artisan-wood'
                ? 'bg-[#23150d] hover:bg-[#331e13] border-[#472714] text-sky-400'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-200'
            }`}
          >
            <RotateCcw className="w-4 h-4 text-sky-400" />
          </button>

          <button
            type="button"
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute Sound' : 'Enable Audio'}
            className={`p-2.5 rounded-xl transition-all border cursor-pointer active:scale-95 ${
              soundEnabled
                ? theme === 'artisan-wood'
                  ? 'bg-[#23150d] hover:bg-[#331e13] border-[#472714] text-emerald-400'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-emerald-400'
                : 'bg-rose-950/60 hover:bg-rose-900/60 border-rose-800 text-rose-300'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
