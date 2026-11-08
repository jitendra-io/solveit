import React from 'react';
import { Settings, RotateCcw, Eye, Home } from 'lucide-react';
import { DIFFICULTIES } from '../constants/gameConfig';

export default function BottomDock({
  currentDifficulty,
  onSelectDifficulty,
  onRestart,
  onOpenSettings,
  onReturnHome,
  onPeekStart,
  onPeekEnd,
  isPeeking,
  theme = 'artisan-wood',
}) {
  return (
    <div
      className={`w-full max-w-[460px] mx-auto rounded-2xl p-2 px-3 flex items-center justify-between border shadow-2xl backdrop-blur-lg select-none transition-all ${
        theme === 'artisan-wood'
          ? 'bg-[#140b07]/95 border-[#381e10] text-[#f7efe6]'
          : 'bg-slate-900/90 border-slate-700/80 text-slate-100'
      }`}
    >
      {/* Quick Difficulty Pills */}
      <div className="flex items-center gap-1 bg-[#0c0704]/90 p-1 rounded-xl border border-[#2d180b]">
        {DIFFICULTIES.map((diff) => {
          const isSelected = diff.gridSize === currentDifficulty.gridSize;
          return (
            <button
              key={diff.id}
              type="button"
              onClick={() => onSelectDifficulty(diff)}
              className={`py-1 px-2 md:px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-[#94552c] to-[#b36a38] text-[#fff8f2] shadow-sm'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
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
              : 'bg-[#0c0704]/80 border-[#2d180b] text-[#e0985c] hover:bg-white/5'
          }`}
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Shuffle / Restart */}
        <button
          type="button"
          onClick={onRestart}
          title="Shuffle pieces"
          className="p-2 rounded-xl bg-[#0c0704]/80 border border-[#2d180b] text-sky-400 hover:bg-white/5 transition-all cursor-pointer active:scale-90"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Home / Menu Button */}
        <button
          type="button"
          onClick={onReturnHome}
          title="Return to Main Menu"
          className="p-2 rounded-xl bg-[#0c0704]/80 border border-[#2d180b] text-[#e0985c] hover:bg-white/5 transition-all cursor-pointer active:scale-90"
        >
          <Home className="w-4 h-4" />
        </button>

        {/* Rules & Settings Drawer Trigger */}
        <button
          type="button"
          onClick={onOpenSettings}
          title="Game Rules & Setup"
          className="p-2 rounded-xl bg-[#5c341b]/35 border border-[#8a4e28]/50 text-[#e0985c] hover:bg-[#5c341b]/50 transition-all cursor-pointer active:scale-90"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
