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
    <div className="w-full max-w-5xl mx-auto py-6 px-4 md:px-8 flex flex-col items-center animate-fadeIn select-none">
      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Handcrafted Wooden Puzzle Studio</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-center max-w-2xl leading-tight md:leading-tight">
        Slice, Slide &amp; Solve Handcrafted Wooden Puzzles
      </h1>
      <p className="text-sm md:text-base opacity-75 text-center max-w-xl mt-2.5 font-medium leading-relaxed">
        Tactile browser-based image puzzle with physical wooden clacks, real-time 3D dragging, and dynamic tier challenges.
      </p>

      {/* Stacked Wooden Board Showcase (Faithful to Screenshot) */}
      <div className="relative w-full max-w-2xl h-52 sm:h-64 my-6 flex items-center justify-center">
        {/* Board 4: Space (Backmost) */}
        <div
          onClick={() => onSelectPreset(PRESET_IMAGES[1])}
          className="absolute w-56 sm:w-72 aspect-[4/3] rounded-2xl bg-wood-grain wood-board-frame border-2 border-[#b88c58] p-2.5 transform -translate-y-8 -rotate-6 opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl"
        >
          <div
            className="w-full h-full rounded-xl overflow-hidden wood-tray-recess bg-black/40"
            dangerouslySetInnerHTML={{ __html: PRESET_IMAGES[1].svg }}
          />
        </div>

        {/* Board 3: Dinosaurs (Third layer) */}
        <div
          onClick={() => onSelectPreset(PRESET_IMAGES[2])}
          className="absolute w-60 sm:w-80 aspect-[4/3] rounded-2xl bg-wood-grain wood-board-frame border-2 border-[#b88c58] p-2.5 transform -translate-y-4 -rotate-3 opacity-85 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl"
        >
          <div
            className="w-full h-full rounded-xl overflow-hidden wood-tray-recess bg-black/40"
            dangerouslySetInnerHTML={{ __html: PRESET_IMAGES[2].svg }}
          />
        </div>

        {/* Board 2: City Rescue (Second layer) */}
        <div
          onClick={() => onSelectPreset(PRESET_IMAGES[3])}
          className="absolute w-64 sm:w-88 aspect-[4/3] rounded-2xl bg-wood-grain wood-board-frame border-2 border-[#c29663] p-2.5 transform -translate-y-1 rotate-2 opacity-95 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer shadow-2xl"
        >
          <div
            className="w-full h-full rounded-xl overflow-hidden wood-tray-recess bg-black/40"
            dangerouslySetInnerHTML={{ __html: PRESET_IMAGES[3].svg }}
          />
        </div>

        {/* Board 1: Safari Train (Frontmost Active Preview) */}
        <div
          onClick={() => onSelectPreset(PRESET_IMAGES[0])}
          className="absolute w-68 sm:w-96 aspect-[4/3] rounded-2xl sm:rounded-3xl bg-wood-grain wood-board-frame border-4 border-[#c89d68] p-3 transform translate-y-3 rotate-0 hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-2xl z-10"
        >
          <div
            className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden wood-tray-recess bg-black/40 relative group"
            dangerouslySetInnerHTML={{ __html: selectedPreset?.svg || PRESET_IMAGES[0].svg }}
          />
          <div className="absolute bottom-4 left-5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-300 border border-white/20 flex items-center gap-1.5 shadow-lg">
            <Check className="w-3.5 h-3.5" />
            <span>Active: {selectedPreset?.name || 'Jungle Safari'}</span>
          </div>
        </div>
      </div>

      {/* Configuration Card */}
      <div
        className={`w-full max-w-2xl rounded-3xl p-5 md:p-7 border shadow-2xl transition-all duration-300 mt-2 ${
          theme === 'artisan-wood'
            ? 'bg-[#24170d]/95 border-[#6b4221]/70 text-[#f7ede1]'
            : 'bg-slate-900/90 border-slate-700/80 text-slate-100'
        }`}
      >
        {/* Step 1: Artwork Selection */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider opacity-75 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>1. Choose Artwork</span>
            </span>
            <label className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Custom Photo</span>
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

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {PRESET_IMAGES.map((preset) => {
              const isSelected = selectedPreset?.id === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onSelectPreset(preset)}
                  className={`relative flex flex-col items-center rounded-xl p-1.5 border transition-all cursor-pointer overflow-hidden ${
                    isSelected
                      ? 'border-amber-400 bg-amber-500/20 ring-2 ring-amber-400/50 shadow-md scale-[1.03]'
                      : 'border-white/10 hover:border-white/30 bg-black/20 hover:bg-black/30'
                  }`}
                >
                  <div
                    className="w-full aspect-square rounded-lg overflow-hidden bg-black/40 mb-1"
                    dangerouslySetInnerHTML={{ __html: preset.svg }}
                  />
                  <span className="text-[11px] font-semibold truncate w-full text-center leading-tight">
                    {preset.name.split(' ')[0]}
                  </span>
                  {isSelected && (
                    <div className="absolute top-1 right-1 bg-amber-500 text-slate-950 p-0.5 rounded-full shadow">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Difficulty Selection */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider opacity-75 flex items-center gap-1.5">
              <Puzzle className="w-4 h-4 text-sky-400" />
              <span>2. Grid Difficulty</span>
            </span>
            <span className="text-xs font-mono text-amber-300">
              {selectedDifficulty.pieceCount} Pieces
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {DIFFICULTIES.map((diff) => {
              const isSelected = selectedDifficulty.id === diff.id;
              return (
                <button
                  key={diff.id}
                  type="button"
                  onClick={() => onSelectDifficulty(diff)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center ${
                    isSelected
                      ? 'border-amber-400 bg-amber-500/20 ring-2 ring-amber-400/50 shadow-md scale-[1.02]'
                      : 'border-white/10 hover:border-white/20 bg-black/20 hover:bg-black/30'
                  }`}
                >
                  <span className="text-sm font-bold block">{diff.name}</span>
                  <span className="text-xs font-mono opacity-80 block text-amber-300">
                    {diff.gridSize}&times;{diff.gridSize} Grid
                  </span>
                  <span className="text-[10px] opacity-60 block mt-0.5">
                    {diff.defaultTimeLimit}s limit
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Game Mode Selector */}
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider opacity-75 flex items-center gap-1.5 mb-2.5">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>3. Gameplay Timer Mode</span>
          </span>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => onChangeMode('countdown')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedMode === 'countdown'
                  ? 'border-amber-400 bg-amber-500/20 ring-2 ring-amber-400/50 shadow-md'
                  : 'border-white/10 hover:border-white/20 bg-black/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">Time Challenge</span>
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                  Competitive
                </span>
              </div>
              <p className="text-[11px] opacity-65 mt-1 leading-normal">
                Race against the clock to unlock Gold ("Speed Demon") tier rewards.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onChangeMode('stopwatch')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedMode === 'stopwatch'
                  ? 'border-amber-400 bg-amber-500/20 ring-2 ring-amber-400/50 shadow-md'
                  : 'border-white/10 hover:border-white/20 bg-black/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">Casual Mode</span>
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300">
                  Relaxed
                </span>
              </div>
              <p className="text-[11px] opacity-65 mt-1 leading-normal">
                Count up from 00:00 with no time pressure or loss conditions.
              </p>
            </button>
          </div>
        </div>

        {/* High Score / Personal Best Banner if exists */}
        {currentBest && currentBest.bestScore > 0 && (
          <div className="mb-5 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-200">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Personal Best on {selectedDifficulty.name}:</span>
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
          className="w-full py-4 px-6 rounded-2xl font-black text-base md:text-lg bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-2xl shadow-amber-500/30 flex items-center justify-center gap-3 cursor-pointer transition-all transform active:scale-98 border-2 border-white/30"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>Start Puzzle Challenge</span>
        </button>
      </div>

      {/* Feature Highlights Grid */}
      <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
        <div className="p-3.5 rounded-2xl bg-black/20 border border-white/10 text-center flex flex-col items-center">
          <Move className="w-5 h-5 text-amber-400 mb-1.5" />
          <h4 className="font-bold text-xs">Hybrid Controls</h4>
          <p className="text-[11px] opacity-60 mt-0.5">
            Real-time 3D pointer dragging or tap-to-swap with visible glide animation.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-black/20 border border-white/10 text-center flex flex-col items-center">
          <Eye className="w-5 h-5 text-sky-400 mb-1.5" />
          <h4 className="font-bold text-xs">Hold to Peek</h4>
          <p className="text-[11px] opacity-60 mt-0.5">
            Hold down the eye button anytime to reveal the unsliced reference image.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-black/20 border border-white/10 text-center flex flex-col items-center">
          <Award className="w-5 h-5 text-emerald-400 mb-1.5" />
          <h4 className="font-bold text-xs">Smart Visibility Tiers</h4>
          <p className="text-[11px] opacity-60 mt-0.5">
            Gold (Speed Demon), Silver (Tactician), and Bronze (Clutch) personalized results.
          </p>
        </div>
      </div>
    </div>
  );
}
