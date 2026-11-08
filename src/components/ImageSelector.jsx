import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, Check, CheckCircle2, AlertCircle } from 'lucide-react';
import { PRESET_IMAGES } from '../constants/presets';
import { processImageFile } from '../utils/canvas';

export default function ImageSelector({
  currentPresetId = 'safari-train',
  onSelectPreset,
  onCustomImageUploaded,
  currentImageSrc = '',
  theme = 'artisan-wood',
}) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    setUploadError(null);
    setIsProcessing(true);

    try {
      const normalizedDataUrl = await processImageFile(file);
      onCustomImageUploaded(normalizedDataUrl, file.name);
    } catch (err) {
      setUploadError(err.message || 'Error processing image file');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  return (
    <div
      className={`rounded-2xl p-4 border transition-all duration-300 ${
        theme === 'artisan-wood'
          ? 'bg-[#2a1a0f]/90 border-[#69421f]/50 text-[#f5ebd9] shadow-lg backdrop-blur-md'
          : 'bg-slate-900/80 border-slate-700/60 text-slate-100 shadow-xl backdrop-blur-md'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-amber-400" />
          <h3 className="font-bold text-sm">Puzzle Artwork & Theme</h3>
        </div>
        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
          1:1 Normalized
        </span>
      </div>

      {/* Preset Art Carousel/Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
        {PRESET_IMAGES.map((preset) => {
          const isSelected = currentPresetId === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset)}
              className={`group relative flex flex-col items-center rounded-xl p-1.5 border text-left transition-all cursor-pointer overflow-hidden ${
                isSelected
                  ? 'border-amber-400 bg-amber-500/15 ring-2 ring-amber-400/50 shadow-md'
                  : 'border-white/10 hover:border-white/30 bg-black/20 hover:bg-black/30'
              }`}
            >
              <div
                className="w-full aspect-square rounded-lg overflow-hidden relative bg-black/30 mb-1.5"
                dangerouslySetInnerHTML={{ __html: preset.svg }}
              />
              <div className="w-full px-1">
                <span className="text-xs font-semibold block truncate leading-tight">
                  {preset.name}
                </span>
                <span className="text-[10px] opacity-60 block truncate">
                  {preset.category}
                </span>
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2 bg-amber-500 text-slate-950 p-0.5 rounded-full shadow-md">
                  <Check className="w-3 h-3" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Custom Upload Dropzone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-3 text-center transition-all cursor-pointer ${
          isDraggingOver
            ? 'border-amber-400 bg-amber-500/10 scale-[1.01]'
            : 'border-white/20 hover:border-amber-400/50 bg-black/20 hover:bg-black/30'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => e.target.files && handleFile(e.target.files[0])}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center gap-1.5 py-1">
          <div className="p-2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Upload className="w-4 h-4" />
          </div>
          <div className="text-xs font-semibold">
            {isProcessing ? 'Normalizing Canvas Square...' : 'Drop Custom Photo Here, or Click to Browse'}
          </div>
          <p className="text-[10px] opacity-60">
            Auto center-cropped to 1:1 square (up to 1080x1080px) &bull; JPG, PNG, WebP
          </p>
        </div>
      </div>

      {uploadError && (
        <div className="mt-2 p-2 rounded-xl bg-rose-950/70 border border-rose-600/70 text-rose-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Mini Reference Preview Thumbnail */}
      {currentImageSrc && (
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/20 shadow">
              <img
                src={currentImageSrc}
                alt="Mini Target Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-xs font-semibold block">Goal Reference</span>
              <span className="text-[10px] opacity-60 block">Solved Target Alignment</span>
            </div>
          </div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
            <CheckCircle2 className="w-3 h-3" />
            <span>Target Ready</span>
          </span>
        </div>
      )}
    </div>
  );
}
