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
          ? 'bg-[#140b07]/95 border-[#381e10] text-[#f7efe6] shadow-xl backdrop-blur-md'
          : 'bg-slate-900/80 border-slate-700/60 text-slate-100 shadow-xl backdrop-blur-md'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-[#e0985c]" />
          <h3 className="font-bold text-sm text-[#f7efe6]">Puzzle Artwork</h3>
        </div>
        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#5c341b]/35 text-[#e0985c] border border-[#8a4e28]/50">
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
                  ? 'border-[#d98b50] bg-[#5c341b]/35 ring-2 ring-[#d98b50]/60 shadow-md'
                  : 'border-[#2d180b] hover:border-[#522d16] bg-[#0c0704]/80 hover:bg-[#180d07]'
              }`}
            >
              <div
                className="w-full aspect-square rounded-lg overflow-hidden relative bg-black/60 mb-1.5"
                dangerouslySetInnerHTML={{ __html: preset.svg }}
              />
              <div className="w-full px-1">
                <span className="text-xs font-semibold block truncate leading-tight text-[#f7efe6]">
                  {preset.name}
                </span>
                <span className="text-[10px] opacity-60 block truncate text-[#e0d0c3]">
                  {preset.category}
                </span>
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2 bg-[#d97706] text-slate-950 p-0.5 rounded-full shadow-md">
                  <Check className="w-3 h-3 text-slate-950 stroke-[3]" />
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
            ? 'border-[#d98b50] bg-[#5c341b]/20 scale-[1.01]'
            : 'border-[#3a2012] hover:border-[#8a4e28]/80 bg-[#0c0704]/70 hover:bg-[#150c07]'
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
          <div className="p-2 rounded-full bg-[#5c341b]/35 text-[#e0985c] border border-[#8a4e28]/50">
            <Upload className="w-4 h-4" />
          </div>
          <div className="text-xs font-semibold text-[#f7efe6]">
            {isProcessing ? 'Normalizing Canvas Square...' : 'Drop Custom Photo Here, or Click to Browse'}
          </div>
          <p className="text-[10px] opacity-60 text-[#e0d0c3]">
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
        <div className="mt-3 pt-3 border-t border-[#381e10] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#5a331c] shadow">
              <img
                src={currentImageSrc}
                alt="Mini Target Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-xs font-semibold block text-[#f7efe6]">Goal Reference</span>
              <span className="text-[10px] opacity-60 block text-[#e0d0c3]">Target Alignment</span>
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
