import React from 'react';
import {
  Play,
  Puzzle,
  Clock,
  Trophy,
  Upload,
  Sparkles,
  Layers,
  Check,
  Eye,
  Move,
  Award
} from 'lucide-react';
import { PRESET_IMAGES } from '../constants/presets';
import { DIFFICULTIES } from '../constants/gameConfig';
import { getHighScores } from '../utils/storage';
import { sound } from '../utils/sound';

export default function LandingPage({
  selectedPreset,
  onSelectPreset,
  selectedDifficulty,
  onSelectDifficulty,
  selectedMode,
  onChangeMode,
  onCustomImageUploaded,
  onStartGame,
  theme = 'artisan-wood',
}) {
  const highScores = getHighScores();
  const currentBest = highScores[selectedDifficulty.id];

  const handleStart = () => {
    sound.playPickup();
    sound.playDrop();
    onStartGame();
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-3 md:py-6 px-3 md:px-6 flex flex-col items-center animate-fadeIn select-none overflow-x-hidden">
      {/* Hero Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-2.5 shadow-sm">
        <Sparkles className="w-3 h-3 text-amber-400" />
        <span>Handcrafted Wooden Puzzle Studio</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-center max-w-xl leading-tight">
        Slice, Slide &amp; Solve
      </h1>
      <p className="text-xs sm:text-sm md:text-base opacity-75 text-center max-w-md mt-1 font-medium leading-normal">
        Tactile wooden puzzle with real-time 3D sliding physics and hybrid touch controls.
      </p>

      {/* Stacked Wooden Board Showcase (Mobile Responsive Scale) */}
      <div className="relative w-full max-w-md h-36 sm:h-52 my-3 sm:my-5 flex items-center justify-center">
        {/* Board 4: Space (Backmost) */}
        <div
          onClick={() => onSelectPreset(PRESET_IMAGES[1])}
          className="absolute w-44 sm:w-64 aspect-[4/3] rounded-xl sm:rounded-2xl bg-wood-grain wood-board-frame border-2 border-[#b88c58] p-1.5 sm:p-2.5 transform -translate-y-5 -rotate-6 opacity-60 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg"
        >
          <div
            className="w-full h-full rounded-lg sm:rounded-xl overflow-hidden wood-tray-recess bg-black/40"
            dangerouslySetInnerHTML={{ __html: PRESET_IMAGES[1].svg }}
          />
        </div>

        {/* Board 3: Dinosaurs (Third layer) */}
        <div
          onClick={() => onSelectPreset(PRESET_IMAGES[2])}
          className="absolute w-48 sm:w-72 aspect-[4/3] rounded-xl sm:rounded-2xl bg-wood-grain wood-board-frame border-2 border-[#b88c58] p-1.5 sm:p-2.5 transform -translate-y-2.5 -rotate-3 opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl"
        >
          <div
            className="w-full h-full rounded-lg sm:rounded-xl overflow-hidden wood-tray-recess bg-black/40"
            dangerouslySetInnerHTML={{ __html: PRESET_IMAGES[2].svg }}
          />
        </div>

        {/* Board 2: City Rescue (Second layer) */}
        <div
          onClick={() => onSelectPreset(PRESET_IMAGES[3])}
          className="absolute w-52 sm:w-80 aspect-[4/3] rounded-xl sm:rounded-2xl bg-wood-grain wood-board-frame border-2 border-[#c29663] p-2 sm:p-2.5 transform -translate-y-0.5 rotate-2 opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl"
        >
          <div
            className="w-full h-full rounded-lg sm:rounded-xl overflow-hidden wood-tray-recess bg-black/40"
            dangerouslySetInnerHTML={{ __html: PRESET_IMAGES[3].svg }}
          />
        </div>

        {/* Board 1: Active Front Board */}
        <div
          onClick={() => onSelectPreset(PRESET_IMAGES[0])}
          className="absolute w-56 sm:w-88 aspect-[4/3] rounded-xl sm:rounded-3xl bg-wood-grain wood-board-frame border-3 sm:border-4 border-[#c89d68] p-2 sm:p-3 transform translate-y-2 rotate-0 hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-2xl z-10"
        >
          <div
            className="w-full h-full rounded-lg sm:rounded-2xl overflow-hidden wood-tray-recess bg-black/40 relative group"
            dangerouslySetInnerHTML={{ __html: selectedPreset?.svg || PRESET_IMAGES[0].svg }}
          />
          <div className="absolute bottom-2.5 sm:bottom-4 left-3 sm:left-5 bg-black/70 backdrop-blur-md px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold text-amber-300 border border-white/20 flex items-center gap-1 shadow">
            <Check className="w-3 h-3 text-emerald-400" />
            <span className="truncate max-w-[140px] sm:max-w-none">
              {selectedPreset?.name || 'Jungle Safari'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Configuration Card */}
      <div
        className={`w-full max-w-xl rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border shadow-2xl transition-all duration-300 ${
          theme === 'artisan-wood'
            ? 'bg-[#24170d]/95 border-[#6b4221]/70 text-[#f7ede1]'
            : 'bg-slate-900/90 border-slate-700/80 text-slate-100'
        }`}
      >
        {/* Step 1: Artwork Selector */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider opacity-75 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>1. Choose Artwork</span>
            </span>
            <label className="text-[11px] sm:text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer">
              <Upload className="w-3 h-3" />
              <span>Upload Photo</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    onCustomImageUploaded(e.target.files[0]);
                  }
                }}
              />
            </label>
          </div>

          {/* 5 Presets in 1 compact responsive row */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {PRESET_IMAGES.map((preset) => {
              const isSelected = selectedPreset?.id === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onSelectPreset(preset)}
                  className={`relative flex flex-col items-center rounded-xl p-1 border transition-all cursor-pointer overflow-hidden ${
                    isSelected
                      ? 'border-amber-400 bg-amber-500/20 ring-2 ring-amber-400/50 shadow-md scale-[1.03]'
                      : 'border-white/10 hover:border-white/30 bg-black/20 hover:bg-black/30'
                  }`}
                >
                  <div
                    className="w-full aspect-square rounded-lg overflow-hidden bg-black/40 mb-0.5 sm:mb-1"
                    dangerouslySetInnerHTML={{ __html: preset.svg }}
                  />
                  <span className="text-[9px] sm:text-[11px] font-semibold truncate w-full text-center leading-tight">
                    {preset.name.split(' ')[0]}
                  </span>
                  {isSelected && (
                    <div className="absolute top-1 right-1 bg-amber-500 text-slate-950 p-0.5 rounded-full shadow">
                      <Check className="w-2 h-2" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Difficulty Selector */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider opacity-75 flex items-center gap-1">
              <Puzzle className="w-3.5 h-3.5 text-sky-400" />
              <span>2. Difficulty</span>
            </span>
            <span className="text-[11px] sm:text-xs font-mono text-amber-300">
              {selectedDifficulty.pieceCount} Pieces
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
            {DIFFICULTIES.map((diff) => {
              const isSelected = selectedDifficulty.id === diff.id;
              return (
                <button
                  key={diff.id}
                  type="button"
                  onClick={() => onSelectDifficulty(diff)}
                  className={`p-2 sm:p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center ${
                    isSelected
                      ? 'border-amber-400 bg-amber-500/20 ring-2 ring-amber-400/50 shadow-md scale-[1.02]'
                      : 'border-white/10 hover:border-white/20 bg-black/20 hover:bg-black/30'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-bold block">{diff.name}</span>
                  <span className="text-[10px] sm:text-xs font-mono opacity-80 block text-amber-300">
                    {diff.gridSize}&times;{diff.gridSize}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Timer Mode */}
        <div className="mb-4 sm:mb-5">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider opacity-75 flex items-center gap-1 mb-2">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>3. Timer Mode</span>
          </span>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onChangeMode('countdown')}
              className={`p-2 sm:p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedMode === 'countdown'
                  ? 'border-amber-400 bg-amber-500/20 ring-2 ring-amber-400/50 shadow-md'
                  : 'border-white/10 hover:border-white/20 bg-black/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">Challenge</span>
                <span className="text-[9px] font-bold uppercase px-1 rounded bg-amber-500/20 text-amber-300">
                  Countdown
                </span>
              </div>
              <p className="text-[10px] opacity-60 mt-0.5 hidden sm:block">
                Race against time limit to unlock Gold Tier.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onChangeMode('stopwatch')}
              className={`p-2 sm:p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedMode === 'stopwatch'
                  ? 'border-amber-400 bg-amber-500/20 ring-2 ring-amber-400/50 shadow-md'
                  : 'border-white/10 hover:border-white/20 bg-black/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">Casual</span>
                <span className="text-[9px] font-bold uppercase px-1 rounded bg-sky-500/20 text-sky-300">
                  Stopwatch
                </span>
              </div>
              <p className="text-[10px] opacity-60 mt-0.5 hidden sm:block">
                Count up from 00:00 with no time limits.
              </p>
            </button>
          </div>
        </div>

        {/* High Score / Best Score pill */}
        {currentBest && currentBest.bestScore > 0 && (
          <div className="mb-3.5 p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-[11px] text-amber-200">
            <div className="flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Record:</span>
            </div>
            <div className="font-mono font-bold">
              {currentBest.bestScore.toLocaleString()} pts &bull; {currentBest.bestMoves} moves
            </div>
          </div>
        )}

        {/* Big Start Button */}
        <button
          type="button"
          onClick={handleStart}
          className="w-full py-3 sm:py-3.5 px-5 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all transform active:scale-98 border-2 border-white/30"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Start Puzzle Challenge</span>
        </button>
      </div>

      {/* Feature Highlights (Mobile 3-col) */}
      <div className="w-full max-w-xl grid grid-cols-3 gap-2 mt-4 pb-6">
        <div className="p-2 sm:p-3 rounded-xl bg-black/20 border border-white/10 text-center flex flex-col items-center">
          <Move className="w-4 h-4 text-amber-400 mb-1" />
          <h4 className="font-bold text-[10px] sm:text-xs">Drag &amp; Swap</h4>
          <p className="text-[9px] opacity-60 mt-0.5 hidden sm:block">
            Smooth 3D pointer slide with wooden clacks.
          </p>
        </div>

        <div className="p-2 sm:p-3 rounded-xl bg-black/20 border border-white/10 text-center flex flex-col items-center">
          <Eye className="w-4 h-4 text-sky-400 mb-1" />
          <h4 className="font-bold text-[10px] sm:text-xs">Hold to Peek</h4>
          <p className="text-[9px] opacity-60 mt-0.5 hidden sm:block">
            Hold eye button to preview complete image.
          </p>
        </div>

        <div className="p-2 sm:p-3 rounded-xl bg-black/20 border border-white/10 text-center flex flex-col items-center">
          <Award className="w-4 h-4 text-emerald-400 mb-1" />
          <h4 className="font-bold text-[10px] sm:text-xs">Smart Tiers</h4>
          <p className="text-[9px] opacity-60 mt-0.5 hidden sm:block">
            Gold, Silver &amp; Bronze personalized results.
          </p>
        </div>
      </div>
    </div>
  );
}
