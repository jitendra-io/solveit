import React from 'react';
import { Settings, RotateCcw, Eye } from 'lucide-react';
import { DIFFICULTIES } from '../constants/gameConfig';

export default function BottomDock({
  currentDifficulty,
  onSelectDifficulty,
  onRestart,
  onOpenSettings,
  onPeekStart,
  onPeekEnd,
  isPeeking,
  theme = 'artisan-wood',
}) {
  return (
    <div
      className={`w-full max-w-[460px] mx-auto rounded-2xl p-2 px-3 flex items-center justify-between border shadow-xl backdrop-blur-lg select-none transition-all ${
        theme === 'artisan-wood'
          ? 'bg-[#24170d]/95 border-[#633e1e]/60 text-[#f7ede1]'
          : 'bg-slate-900/90 border-slate-700/80 text-slate-100'
      }`}
    >
      {/* Quick Difficulty Pills */}
      <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-white/10">
        {DIFFICULTIES.map((diff) => {
          const isSelected = diff.gridSize === currentDifficulty.gridSize;
          return (
            <button
              key={diff.id}
              type="button"
              onClick={() => onSelectDifficulty(diff)}
              className={`py-1 px-2 md:px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {diff.gridSize}&times;{diff.gridSize}
            </button>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5">
        {/* Hold to Peek */}
        <button
          type="button"
          onPointerDown={onPeekStart}
          onPointerUp={onPeekEnd}
          onPointerLeave={onPeekEnd}
          onTouchStart={onPeekStart}
          onTouchEnd={onPeekEnd}
          title="Hold to Peek reference image"
          className={`p-2 rounded-xl border transition-all cursor-pointer active:scale-90 ${
            isPeeking
              ? 'bg-amber-500 text-slate-950 border-amber-300'
              : 'bg-black/30 border-white/10 text-amber-400 hover:bg-white/10'
          }`}
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Shuffle / Restart */}
        <button
          type="button"
          onClick={onRestart}
          title="Shuffle pieces"
          className="p-2 rounded-xl bg-black/30 border border-white/10 text-sky-400 hover:bg-white/10 transition-all cursor-pointer active:scale-90"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Rules & Settings Drawer Trigger */}
        <button
          type="button"
          onClick={onOpenSettings}
          title="Game Rules & Setup"
          className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 transition-all cursor-pointer active:scale-90"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
