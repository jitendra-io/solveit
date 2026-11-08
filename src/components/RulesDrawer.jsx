import React, { useState } from 'react';
import {
  X,
  Sliders,
  Clock,
  Move,
  Lock,
  Palette,
  Code,
  Check,
  RotateCcw,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { DEFAULT_TIER_THRESHOLDS } from '../constants/gameConfig';

export default function RulesDrawer({
  isOpen = false,
  onClose,
  rules,
  onUpdateRules,
  currentDifficulty,
  theme = 'artisan-wood',
}) {
  const [activeTab, setActiveTab] = useState('rules'); // 'rules' | 'thresholds' | 'json'
  const [jsonText, setJsonText] = useState(JSON.stringify(rules.tierThresholds, null, 2));
  const [jsonError, setJsonError] = useState(null);

  if (!isOpen) return null;

  const handleJsonChange = (e) => {
    const text = e.target.value;
    setJsonText(text);
    try {
      const parsed = JSON.parse(text);
      setJsonError(null);
      onUpdateRules({
        ...rules,
        tierThresholds: parsed,
      });
    } catch (err) {
      setJsonError(err.message);
    }
  };

  const handleResetThresholds = () => {
    onUpdateRules({
      ...rules,
      tierThresholds: { ...DEFAULT_TIER_THRESHOLDS },
    });
    setJsonText(JSON.stringify(DEFAULT_TIER_THRESHOLDS, null, 2));
    setJsonError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Drawer Container (Black & Brown Woodcraft) */}
      <div
        className={`w-full max-w-md h-full flex flex-col border-l shadow-2xl transition-all duration-300 ${
          theme === 'artisan-wood'
            ? 'bg-[#120a06] border-[#381e10] text-[#f7efe6]'
            : 'bg-slate-900 border-slate-700 text-slate-100'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 md:p-5 border-b border-[#2d180b] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#5c341b]/35 text-[#e0985c] border border-[#8a4e28]/50">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base md:text-lg text-[#f7efe6]">Game Rules & Configuration</h2>
              <p className="text-xs opacity-60 text-[#e0d0c3]">Fine-tune gameplay mechanics & tiers</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#2d180b] px-4 pt-2 gap-2 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('rules')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'rules'
                ? 'border-[#d98b50] text-[#e0985c]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            Gameplay Rules
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('thresholds')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'thresholds'
                ? 'border-[#d98b50] text-[#e0985c]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            Tier Thresholds
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('json')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'json'
                ? 'border-[#d98b50] text-[#e0985c]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>JSON Editor</span>
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-5">
          {/* TAB 1: Gameplay Rules */}
          {activeTab === 'rules' && (
            <div className="space-y-4">
              {/* Timer Mode Toggle */}
              <div
                className={`p-4 rounded-2xl border ${
                  theme === 'artisan-wood'
                    ? 'bg-[#180f08] border-[#422915]'
                    : 'bg-slate-950/70 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-sky-400" />
                  <span className="font-bold text-sm">Timer Mode</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => onUpdateRules({ ...rules, timerMode: 'countdown' })}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      rules.timerMode === 'countdown'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : 'border-white/10 hover:bg-white/5 opacity-70'
                    }`}
                  >
                    Time Challenge (Countdown)
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateRules({ ...rules, timerMode: 'stopwatch' })}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      rules.timerMode === 'stopwatch'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : 'border-white/10 hover:bg-white/5 opacity-70'
                    }`}
                  >
                    Casual (Stopwatch)
                  </button>
                </div>

                {rules.timerMode === 'countdown' && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="opacity-80">Countdown Limit:</span>
                      <span className="font-mono font-bold text-amber-300">
                        {rules.customTimeLimit || currentDifficulty.defaultTimeLimit}s
                      </span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="300"
                      step="5"
                      value={rules.customTimeLimit || currentDifficulty.defaultTimeLimit}
                      onChange={(e) =>
                        onUpdateRules({
                          ...rules,
                          customTimeLimit: parseInt(e.target.value, 10),
                        })
                      }
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] opacity-50 mt-1">
                      <span>15s (Blitz)</span>
                      <span>{currentDifficulty.defaultTimeLimit}s (Default)</span>
                      <span>300s (Relaxed)</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Move Limit Setting */}
              <div
                className={`p-4 rounded-2xl border ${
                  theme === 'artisan-wood'
                    ? 'bg-[#180f08] border-[#422915]'
                    : 'bg-slate-950/70 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Move className="w-4 h-4 text-indigo-400" />
                    <span className="font-bold text-sm">Move Limit Restriction</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={rules.moveLimitEnabled}
                    onChange={(e) =>
                      onUpdateRules({
                        ...rules,
                        moveLimitEnabled: e.target.checked,
                        customMoveLimit: e.target.checked ? currentDifficulty.recommendedMoves * 2 : 0,
                      })
                    }
                    className="w-4 h-4 accent-amber-500 cursor-pointer"
                  />
                </div>
                <p className="text-xs opacity-60">
                  Caps total allowed tile swaps. Exceeding triggers loss state.
                </p>

                {rules.moveLimitEnabled && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="opacity-80">Max Swaps Allowed:</span>
                      <span className="font-mono font-bold text-indigo-300">
                        {rules.customMoveLimit || currentDifficulty.recommendedMoves * 2} moves
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="150"
                      step="5"
                      value={rules.customMoveLimit || currentDifficulty.recommendedMoves * 2}
                      onChange={(e) =>
                        onUpdateRules({
                          ...rules,
                          customMoveLimit: parseInt(e.target.value, 10),
                        })
                      }
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* Optional Tile Lock Setting */}
              <div
                className={`p-4 rounded-2xl border ${
                  theme === 'artisan-wood'
                    ? 'bg-[#180f08] border-[#422915]'
                    : 'bg-slate-950/70 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="font-bold text-sm block">Lock Correct Pieces</span>
                      <span className="text-[11px] opacity-60 block">
                        Locks pieces in place once positioned correctly
                      </span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={rules.lockCorrectPieces}
                    onChange={(e) =>
                      onUpdateRules({
                        ...rules,
                        lockCorrectPieces: e.target.checked,
                      })
                    }
                    className="w-4 h-4 accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Theme & Aesthetics */}
              <div
                className={`p-4 rounded-2xl border ${
                  theme === 'artisan-wood'
                    ? 'bg-[#180f08] border-[#422915]'
                    : 'bg-slate-950/70 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Palette className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-sm">Visual Board Theme</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => onUpdateRules({ ...rules, theme: 'artisan-wood' })}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      rules.theme === 'artisan-wood'
                        ? 'bg-[#d8a873] text-[#24170d] border-[#ebd0b0] font-bold shadow-md'
                        : 'border-white/10 hover:bg-white/5 opacity-70'
                    }`}
                  >
                    Artisan Woodcraft
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateRules({ ...rules, theme: 'studio-dark' })}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      rules.theme === 'studio-dark'
                        ? 'bg-slate-700 text-white border-slate-500 font-bold shadow-md'
                        : 'border-white/10 hover:bg-white/5 opacity-70'
                    }`}
                  >
                    Studio Dark Slate
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Custom Tier Thresholds */}
          {activeTab === 'thresholds' && (
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Adjust the criteria that determine whether a player qualifies for Gold (Speed Demon),
                  Silver (Tactician), or Bronze (Clutch Survivor).
                </span>
              </div>

              {/* Fast Finish (Gold Tier) Threshold */}
              <div
                className={`p-4 rounded-2xl border ${
                  theme === 'artisan-wood'
                    ? 'bg-[#180f08] border-[#422915]'
                    : 'bg-slate-950/70 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-amber-400">Gold Tier (Speed Demon)</span>
                  <span className="text-xs font-mono opacity-80">
                    &le; {rules.tierThresholds.fastMaxTimePercent}% time
                  </span>
                </div>
                <label className="text-xs opacity-70 block mb-1">Max Time Used (% of limit):</label>
                <input
                  type="range"
                  min="20"
                  max="60"
                  step="5"
                  value={rules.tierThresholds.fastMaxTimePercent}
                  onChange={(e) => {
                    const updated = {
                      ...rules.tierThresholds,
                      fastMaxTimePercent: parseInt(e.target.value, 10),
                    };
                    onUpdateRules({ ...rules, tierThresholds: updated });
                    setJsonText(JSON.stringify(updated, null, 2));
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />

                <label className="text-xs opacity-70 block mt-3 mb-1">
                  Max Move Multiplier (&times; piece count):
                </label>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="opacity-60">Move efficiency requirement</span>
                  <span className="font-mono font-bold text-amber-300">
                    &le; {rules.tierThresholds.fastMoveMultiplier}x
                  </span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="2.5"
                  step="0.1"
                  value={rules.tierThresholds.fastMoveMultiplier}
                  onChange={(e) => {
                    const updated = {
                      ...rules.tierThresholds,
                      fastMoveMultiplier: parseFloat(e.target.value),
                    };
                    onUpdateRules({ ...rules, tierThresholds: updated });
                    setJsonText(JSON.stringify(updated, null, 2));
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Average Finish (Silver Tier) Threshold */}
              <div
                className={`p-4 rounded-2xl border ${
                  theme === 'artisan-wood'
                    ? 'bg-[#180f08] border-[#422915]'
                    : 'bg-slate-950/70 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-sky-400">Silver Tier (Tactician)</span>
                  <span className="text-xs font-mono opacity-80">
                    &le; {rules.tierThresholds.averageMaxTimePercent}% time
                  </span>
                </div>
                <label className="text-xs opacity-70 block mb-1">Max Time Used (% of limit):</label>
                <input
                  type="range"
                  min="60"
                  max="90"
                  step="5"
                  value={rules.tierThresholds.averageMaxTimePercent}
                  onChange={(e) => {
                    const updated = {
                      ...rules.tierThresholds,
                      averageMaxTimePercent: parseInt(e.target.value, 10),
                    };
                    onUpdateRules({ ...rules, tierThresholds: updated });
                    setJsonText(JSON.stringify(updated, null, 2));
                  }}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              {/* Slow / Clutch Finish (Bronze Tier) Threshold */}
              <div
                className={`p-4 rounded-2xl border ${
                  theme === 'artisan-wood'
                    ? 'bg-[#180f08] border-[#422915]'
                    : 'bg-slate-950/70 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-orange-400">Bronze Tier (Clutch)</span>
                  <span className="text-xs font-mono opacity-80">
                    &le; {rules.tierThresholds.slowTimeRemainingPercent}% remaining
                  </span>
                </div>
                <label className="text-xs opacity-70 block mb-1">Buzzer-Beater Time Remaining (%):</label>
                <input
                  type="range"
                  min="5"
                  max="35"
                  step="5"
                  value={rules.tierThresholds.slowTimeRemainingPercent}
                  onChange={(e) => {
                    const updated = {
                      ...rules.tierThresholds,
                      slowTimeRemainingPercent: parseInt(e.target.value, 10),
                    };
                    onUpdateRules({ ...rules, tierThresholds: updated });
                    setJsonText(JSON.stringify(updated, null, 2));
                  }}
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>

              <button
                type="button"
                onClick={handleResetThresholds}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold border border-white/20 hover:bg-white/10 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default Tier Thresholds</span>
              </button>
            </div>
          )}

          {/* TAB 3: JSON Config Editor */}
          {activeTab === 'json' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs opacity-75">
                <span>Direct JSON Configuration Payload:</span>
                <button
                  type="button"
                  onClick={handleResetThresholds}
                  className="text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Defaults</span>
                </button>
              </div>

              <textarea
                rows={10}
                value={jsonText}
                onChange={handleJsonChange}
                className="w-full p-3 font-mono text-xs bg-black/60 border border-white/20 rounded-xl text-emerald-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />

              {jsonError && (
                <div className="p-2.5 rounded-xl bg-rose-950/70 border border-rose-600/70 text-rose-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Invalid JSON: {jsonError}</span>
                </div>
              )}

              {!jsonError && (
                <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-600/60 text-emerald-200 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Valid JSON schema loaded successfully.</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-white/10 bg-black/20 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>Apply & Close</span>
          </button>
        </div>
      </div>
    </div>
  );
}
