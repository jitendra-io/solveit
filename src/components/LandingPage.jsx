import React, { useRef } from 'react';
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
  currentImageSrc = '',
  customImage = null,
  onSelectPreset,
  selectedDifficulty,
  onSelectDifficulty,
  selectedMode,
  onChangeMode,
  onCustomImageUploaded,
  onStartGame,
  theme = 'artisan-wood',
}) {
  const fileInputRef = useRef(null);
  const highScores = getHighScores();
  const currentBest = highScores[selectedDifficulty.id];

  const isCustomSelected =
    selectedPreset?.id === 'custom-upload' ||
    Boolean(!selectedPreset?.svg && (selectedPreset?.imageSrc || currentImageSrc));

  const displayImageSrc =
    (isCustomSelected && (selectedPreset?.imageSrc || currentImageSrc || customImage?.dataUrl)) ||
    selectedPreset?.imageSrc ||
    currentImageSrc;

  const hasCustomImage = Boolean(
    customImage?.dataUrl ||
    (selectedPreset?.id === 'custom-upload' && (selectedPreset?.imageSrc || currentImageSrc))
  );

  const customImageSrc =
    customImage?.dataUrl ||
    (selectedPreset?.id === 'custom-upload' ? (selectedPreset?.imageSrc || currentImageSrc) : null);

  const handleStart = () => {
    sound.playPickup();
    sound.playDrop();
    onStartGame();
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-3 md:py-6 px-3 md:px-6 flex flex-col items-center animate-fadeIn select-none overflow-x-hidden">
      {/* Hero Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5c341b]/35 border border-[#8a4e28]/50 text-[#e0985c] text-[11px] font-bold uppercase tracking-wider mb-2.5 shadow-sm">
        <Sparkles className="w-3 h-3 text-[#e0985c]" />
        <span>Handcrafted Wooden Puzzle Studio</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-center max-w-xl leading-tight text-[#f7efe6]">
        Slice, Slide &amp; Solve
      </h1>
      <p className="text-xs sm:text-sm md:text-base opacity-75 text-center max-w-md mt-1 font-medium leading-normal text-[#e0d0c3]">
        Tactile wooden puzzle with real-time 3D sliding physics and hybrid touch controls.
      </p>

      {/* Stacked Wooden Board Showcase (Black & Brown Wood Craft) */}
      <div className="relative w-full max-w-md h-36 sm:h-52 my-3 sm:my-5 flex items-center justify-center">
        {/* Board 4: Space (Backmost) */}
        <div
          onClick={() => onSelectPreset(PRESET_IMAGES[1])}
          className="absolute w-44 sm:w-64 aspect-[4/3] rounded-xl sm:rounded-2xl bg-wood-grain wood-board-frame border-2 border-[#422413] p-1.5 sm:p-2.5 transform -translate-y-5 -rotate-6 opacity-60 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg"
        >
          <div
            className="w-full h-full rounded-lg sm:rounded-xl overflow-hidden wood-tray-recess bg-black/60"
            dangerouslySetInnerHTML={{ __html: PRESET_IMAGES[1].svg }}
          />
        </div>

        {/* Board 3: Dinosaurs (Third layer) */}
        <div
          onClick={() => onSelectPreset(PRESET_IMAGES[2])}
          className="absolute w-48 sm:w-72 aspect-[4/3] rounded-xl sm:rounded-2xl bg-wood-grain wood-board-frame border-2 border-[#542d17] p-1.5 sm:p-2.5 transform -translate-y-2.5 -rotate-3 opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl"
        >
          <div
            className="w-full h-full rounded-lg sm:rounded-xl overflow-hidden wood-tray-recess bg-black/60"
            dangerouslySetInnerHTML={{ __html: PRESET_IMAGES[2].svg }}
          />
        </div>

        {/* Board 2: City Rescue (Second layer) */}
        <div
          onClick={() => onSelectPreset(PRESET_IMAGES[3])}
          className="absolute w-52 sm:w-80 aspect-[4/3] rounded-xl sm:rounded-2xl bg-wood-grain wood-board-frame border-2 border-[#69391e] p-2 sm:p-2.5 transform -translate-y-0.5 rotate-2 opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl"
        >
          <div
            className="w-full h-full rounded-lg sm:rounded-xl overflow-hidden wood-tray-recess bg-black/60"
            dangerouslySetInnerHTML={{ __html: PRESET_IMAGES[3].svg }}
          />
        </div>

        {/* Board 1: Active Front Board (Top Frame) */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              onCustomImageUploaded(e.dataTransfer.files[0]);
            }
          }}
          className="absolute w-56 sm:w-88 aspect-[4/3] rounded-xl sm:rounded-3xl bg-wood-grain wood-board-frame border-3 sm:border-4 border-[#854724] p-2 sm:p-3 transform translate-y-2 rotate-0 hover:scale-[1.02] transition-all duration-300 shadow-2xl shadow-black/90 z-10"
        >
          <div className="w-full h-full rounded-lg sm:rounded-2xl overflow-hidden wood-tray-recess bg-black/60 relative group flex items-center justify-center">
            {isCustomSelected && displayImageSrc ? (
              <img
                src={displayImageSrc}
                alt={selectedPreset?.name || 'Custom Artwork'}
                className="w-full h-full object-cover rounded-lg sm:rounded-2xl"
              />
            ) : (
              <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{ __html: selectedPreset?.svg || PRESET_IMAGES[0].svg }}
              />
            )}
          </div>
          <div className="absolute bottom-2.5 sm:bottom-4 left-3 sm:left-5 bg-[#0a0604]/85 backdrop-blur-md px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold text-[#e0985c] border border-[#6b3a1d]/60 flex items-center gap-1 shadow-lg pointer-events-none">
            <Check className="w-3 h-3 text-[#d97706]" />
            <span className="truncate max-w-[140px] sm:max-w-none">
              {selectedPreset?.name || 'Jungle Safari'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Configuration Card (Black & Brown Theme) */}
      <div
        className={`w-full max-w-xl rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border shadow-2xl transition-all duration-300 ${
          theme === 'artisan-wood'
            ? 'bg-[#120a06]/95 border-[#381e0f] text-[#f7efe6] shadow-black/90'
            : 'bg-slate-900/90 border-slate-700/80 text-slate-100'
        }`}
      >
        {/* Step 1: Artwork Selector */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider opacity-75 flex items-center gap-1 text-[#d98b50]">
              <Layers className="w-3.5 h-3.5 text-[#e0985c]" />
              <span>1. Choose Artwork</span>
            </span>
            <label className="text-[11px] sm:text-xs font-semibold text-[#e0985c] hover:text-[#f5b882] flex items-center gap-1 cursor-pointer">
              <Upload className="w-3 h-3" />
              <span>{hasCustomImage ? 'Upload Different' : 'Upload Photo'}</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    onCustomImageUploaded(e.target.files[0]);
                    e.target.value = '';
                  }
                }}
              />
            </label>
          </div>

          {/* 5 Presets + Custom Slot in 1 clean responsive layout */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2">
            {PRESET_IMAGES.map((preset) => {
              const isSelected = !isCustomSelected && selectedPreset?.id === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onSelectPreset(preset)}
                  className={`relative flex flex-col items-center rounded-xl p-1 border transition-all cursor-pointer overflow-hidden ${
                    isSelected
                      ? 'border-[#d98b50] bg-[#5c341b]/35 ring-2 ring-[#d98b50]/60 shadow-lg scale-[1.03]'
                      : 'border-[#2d180b] hover:border-[#522d16] bg-[#0c0704]/80 hover:bg-[#180d07]'
                  }`}
                >
                  <div
                    className="w-full aspect-square rounded-lg overflow-hidden bg-black/60 mb-0.5 sm:mb-1"
                    dangerouslySetInnerHTML={{ __html: preset.svg }}
                  />
                  <span className="text-[9px] sm:text-[11px] font-semibold truncate w-full text-center leading-tight">
                    {preset.name.split(' ')[0]}
                  </span>
                  {isSelected && (
                    <div className="absolute top-1 right-1 bg-[#d97706] text-slate-950 p-0.5 rounded-full shadow">
                      <Check className="w-2 h-2 text-slate-950 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}

            {/* Slot 6: Custom Upload Thumbnail or Device Upload Button */}
            {hasCustomImage && customImageSrc ? (
              <button
                type="button"
                onClick={() =>
                  onSelectPreset({
                    id: 'custom-upload',
                    name: customImage?.name || selectedPreset?.name || 'Custom Photo',
                    category: 'Uploaded',
                    description: 'Custom 1:1 normalized image',
                    badge: 'Custom',
                    imageSrc: customImageSrc,
                  })
                }
                className={`relative flex flex-col items-center rounded-xl p-1 border transition-all cursor-pointer overflow-hidden ${
                  isCustomSelected
                    ? 'border-[#d98b50] bg-[#5c341b]/35 ring-2 ring-[#d98b50]/60 shadow-lg scale-[1.03]'
                    : 'border-[#2d180b] hover:border-[#522d16] bg-[#0c0704]/80 hover:bg-[#180d07]'
                }`}
              >
                <div className="w-full aspect-square rounded-lg overflow-hidden bg-black/60 mb-0.5 sm:mb-1 border border-[#522d16]">
                  <img
                    src={customImageSrc}
                    alt="Custom Upload"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[9px] sm:text-[11px] font-semibold truncate w-full text-center leading-tight text-[#e0985c]">
                  Custom
                </span>
                {isCustomSelected && (
                  <div className="absolute top-1 right-1 bg-[#d97706] text-slate-950 p-0.5 rounded-full shadow">
                    <Check className="w-2 h-2 text-slate-950 stroke-[3]" />
                  </div>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="relative flex flex-col items-center justify-center rounded-xl p-1 border border-dashed border-[#542d17] hover:border-[#8a4e28] bg-[#0c0704]/60 hover:bg-[#180d07] transition-all cursor-pointer overflow-hidden group"
              >
                <div className="w-full aspect-square rounded-lg flex flex-col items-center justify-center bg-[#180d07]/60 mb-0.5 sm:mb-1 group-hover:scale-105 transition-transform">
                  <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-[#e0985c] mb-0.5" />
                  <span className="text-[8px] uppercase tracking-wider text-[#e0985c] font-bold">
                    Upload
                  </span>
                </div>
                <span className="text-[9px] sm:text-[11px] font-semibold truncate w-full text-center leading-tight opacity-75">
                  Device
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Step 2: Difficulty Selector */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider opacity-75 flex items-center gap-1 text-[#d98b50]">
              <Puzzle className="w-3.5 h-3.5 text-[#e0985c]" />
              <span>2. Difficulty</span>
            </span>
            <span className="text-[11px] sm:text-xs font-mono text-[#e0985c]">
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
                      ? 'border-[#d98b50] bg-[#5c341b]/35 ring-2 ring-[#d98b50]/60 shadow-lg scale-[1.02]'
                      : 'border-[#2d180b] hover:border-[#522d16] bg-[#0c0704]/80 hover:bg-[#180d07]'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-bold block">{diff.name}</span>
                  <span className="text-[10px] sm:text-xs font-mono opacity-80 block text-[#e0985c]">
                    {diff.gridSize}&times;{diff.gridSize}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Timer Mode */}
        <div className="mb-4 sm:mb-5">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider opacity-75 flex items-center gap-1 mb-2 text-[#d98b50]">
            <Clock className="w-3.5 h-3.5 text-[#e0985c]" />
            <span>3. Timer Mode</span>
          </span>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onChangeMode('countdown')}
              className={`p-2 sm:p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedMode === 'countdown'
                  ? 'border-[#d98b50] bg-[#5c341b]/35 ring-2 ring-[#d98b50]/60 shadow-lg'
                  : 'border-[#2d180b] hover:border-[#522d16] bg-[#0c0704]/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">Challenge</span>
                <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#5c341b]/50 text-[#f5d7b5] border border-[#8a4e28]/50">
                  Countdown
                </span>
              </div>
              <p className="text-[10px] opacity-65 mt-0.5 hidden sm:block">
                Race against time limit to unlock Gold Tier.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onChangeMode('stopwatch')}
              className={`p-2 sm:p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedMode === 'stopwatch'
                  ? 'border-[#d98b50] bg-[#5c341b]/35 ring-2 ring-[#d98b50]/60 shadow-lg'
                  : 'border-[#2d180b] hover:border-[#522d16] bg-[#0c0704]/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">Casual</span>
                <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#2e190d] text-[#e0985c] border border-[#522d16]">
                  Stopwatch
                </span>
              </div>
              <p className="text-[10px] opacity-65 mt-0.5 hidden sm:block">
                Count up from 00:00 with no time limits.
              </p>
            </button>
          </div>
        </div>

        {/* High Score / Best Score pill */}
        {currentBest && currentBest.bestScore > 0 && (
          <div className="mb-3.5 p-2 rounded-xl bg-[#5c341b]/20 border border-[#8a4e28]/40 flex items-center justify-between text-[11px] text-[#f5d7b5]">
            <div className="flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-[#e0985c] shrink-0" />
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
          className="w-full py-3 sm:py-3.5 px-5 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base bg-gradient-to-r from-[#94552c] via-[#b36a38] to-[#94552c] hover:from-[#a66032] hover:to-[#c47740] text-[#fff8f2] shadow-xl shadow-black/80 flex items-center justify-center gap-2 cursor-pointer transition-all transform active:scale-98 border-2 border-[#e0985c]/40"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Start Puzzle Challenge</span>
        </button>
      </div>

      {/* Feature Highlights (Black & Brown Cards) */}
      <div className="w-full max-w-xl grid grid-cols-3 gap-2 mt-4 pb-6">
        <div className="p-2 sm:p-3 rounded-xl bg-[#0e0805]/90 border border-[#2e190d] text-center flex flex-col items-center">
          <Move className="w-4 h-4 text-[#e0985c] mb-1" />
          <h4 className="font-bold text-[10px] sm:text-xs">Drag &amp; Swap</h4>
          <p className="text-[9px] opacity-60 mt-0.5 hidden sm:block">
            Smooth 3D pointer slide with wooden clacks.
          </p>
        </div>

        <div className="p-2 sm:p-3 rounded-xl bg-[#0e0805]/90 border border-[#2e190d] text-center flex flex-col items-center">
          <Eye className="w-4 h-4 text-[#e0985c] mb-1" />
          <h4 className="font-bold text-[10px] sm:text-xs">Hold to Peek</h4>
          <p className="text-[9px] opacity-60 mt-0.5 hidden sm:block">
            Hold eye button to preview complete image.
          </p>
        </div>

        <div className="p-2 sm:p-3 rounded-xl bg-[#0e0805]/90 border border-[#2e190d] text-center flex flex-col items-center">
          <Award className="w-4 h-4 text-[#e0985c] mb-1" />
          <h4 className="font-bold text-[10px] sm:text-xs">Smart Tiers</h4>
          <p className="text-[9px] opacity-60 mt-0.5 hidden sm:block">
            Gold, Silver &amp; Bronze personalized results.
          </p>
        </div>
      </div>
    </div>
  );
}
