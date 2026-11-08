import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Lock, Eye, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

export default function PuzzleBoard({
  gridSize = 3,
  tiles = [],
  imageSrc = '',
  isLockedPiecesEnabled = false,
  isPeeking = false,
  isSolved = false,
  isGameActive = true,
  onSwapTiles,
  theme = 'artisan-wood',
}) {
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Real-time dragging state
  const [draggingSlot, setDraggingSlot] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hoverTargetSlot, setHoverTargetSlot] = useState(null);

  // Sliding animation state for smooth FLIP / coordinate transitions
  const [slidingPair, setSlidingPair] = useState(null); // { slotA, slotB, dx, dy }
  const [justLockedId, setJustLockedId] = useState(null);

  const boardRef = useRef(null);
  const tileRefs = useRef([]);
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);

  // Check for newly locked pieces to trigger pulse animation
  useEffect(() => {
    if (!isLockedPiecesEnabled) return;
    const lockedTile = tiles.find(t => t.currentSlot === t.correctIndex && !t.wasLockedNotified);
    if (lockedTile) {
      setJustLockedId(lockedTile.id);
      sound.playCorrectSnap();
      const timer = setTimeout(() => setJustLockedId(null), 500);
      return () => clearTimeout(timer);
    }
  }, [tiles, isLockedPiecesEnabled]);

  // Execute smooth animated slide between two slots
  const animateAndSwap = useCallback((slotA, slotB) => {
    if (slotA === slotB || slidingPair) return;

    const elA = tileRefs.current[slotA];
    const elB = tileRefs.current[slotB];

    if (!elA || !elB) {
      // Fallback direct swap if elements aren't measured
      sound.playSlide(0.2);
      sound.playDrop();
      onSwapTiles(slotA, slotB);
      return;
    }

    const rectA = elA.getBoundingClientRect();
    const rectB = elB.getBoundingClientRect();

    const dx = rectB.left - rectA.left;
    const dy = rectB.top - rectA.top;

    // Start slide animation & play wooden friction slide sound
    setSlidingPair({ slotA, slotB, dx, dy });
    sound.playSlide(0.25);

    // After animation duration, finalize swap and play landing clack
    setTimeout(() => {
      onSwapTiles(slotA, slotB);
      setSlidingPair(null);
      sound.playDrop();
    }, 240);
  }, [slidingPair, onSwapTiles]);

  // Method A: Tap-to-Swap (with visible smooth sliding)
  const handleTileClick = (slotIndex) => {
    if (!isGameActive || isSolved || slidingPair) return;
    // If user dragged, click is ignored
    if (hasMovedRef.current) return;

    const tileAtSlot = tiles[slotIndex];
    if (!tileAtSlot) return;

    // If piece is locked, it cannot be swapped
    if (isLockedPiecesEnabled && tileAtSlot.correctIndex === slotIndex) {
      sound.playCorrectSnap();
      return;
    }

    if (selectedSlot === null) {
      setSelectedSlot(slotIndex);
      sound.playPickup();
    } else if (selectedSlot === slotIndex) {
      // Tap again to deselect
      setSelectedSlot(null);
    } else {
      // Tap second tile -> Visibly slide them into each other's slots!
      const sourceSlot = selectedSlot;
      setSelectedSlot(null);
      animateAndSwap(sourceSlot, slotIndex);
    }
  };

  // Method B: Pointer Drag-and-Swap with Real-Time Sliding
  const handlePointerDown = (e, slotIndex) => {
    if (!isGameActive || isSolved || slidingPair) return;

    const tileAtSlot = tiles[slotIndex];
    if (!tileAtSlot) return;

    // Prevent dragging locked pieces
    if (isLockedPiecesEnabled && tileAtSlot.correctIndex === slotIndex) {
      return;
    }

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    pointerStartRef.current = { x: e.clientX, y: e.clientY };
    hasMovedRef.current = false;
    setDraggingSlot(slotIndex);
    setDragOffset({ x: 0, y: 0 });
    setHoverTargetSlot(null);
    sound.playPickup();
  };

  const handlePointerMove = (e) => {
    if (draggingSlot === null) return;

    const dx = e.clientX - pointerStartRef.current.x;
    const dy = e.clientY - pointerStartRef.current.y;
    const distance = Math.hypot(dx, dy);

    if (distance > 5) {
      hasMovedRef.current = true;
      // Play wooden sliding friction sound as block slides across board
      sound.playSlide(0.18);
    }

    setDragOffset({ x: dx, y: dy });

    // Determine target slot underneath the dragged tile's center
    if (boardRef.current) {
      const boardRect = boardRef.current.getBoundingClientRect();
      const relativeX = e.clientX - boardRect.left;
      const relativeY = e.clientY - boardRect.top;

      if (
        relativeX >= 0 &&
        relativeX <= boardRect.width &&
        relativeY >= 0 &&
        relativeY <= boardRect.height
      ) {
        const col = Math.min(gridSize - 1, Math.max(0, Math.floor((relativeX / boardRect.width) * gridSize)));
        const row = Math.min(gridSize - 1, Math.max(0, Math.floor((relativeY / boardRect.height) * gridSize)));
        const targetSlot = row * gridSize + col;

        if (targetSlot !== draggingSlot) {
          const targetTile = tiles[targetSlot];
          // Can only swap if target is not a locked piece
          if (!isLockedPiecesEnabled || (targetTile && targetTile.correctIndex !== targetSlot)) {
            setHoverTargetSlot(targetSlot);
            return;
          }
        }
      }
    }
    setHoverTargetSlot(null);
  };

  const handlePointerUp = (e) => {
    if (draggingSlot === null) return;

    const sourceSlot = draggingSlot;
    const targetSlot = hoverTargetSlot;
    const wasMoved = hasMovedRef.current;

    setDraggingSlot(null);
    setDragOffset({ x: 0, y: 0 });
    setHoverTargetSlot(null);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    if (wasMoved && targetSlot !== null && targetSlot !== sourceSlot) {
      // Visible slide transition to target slot
      animateAndSwap(sourceSlot, targetSlot);
      setSelectedSlot(null);
    } else if (wasMoved) {
      // Snapped back to original slot
      sound.playDrop();
    }
  };

  const handlePointerCancel = () => {
    setDraggingSlot(null);
    setDragOffset({ x: 0, y: 0 });
    setHoverTargetSlot(null);
    hasMovedRef.current = false;
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full select-none">
      {/* Outer Wooden Tray Frame (Screenshot inspired) */}
      <div
        className={`relative w-full max-w-[460px] md:max-w-[500px] lg:max-w-[520px] aspect-square rounded-2xl md:rounded-3xl p-3 md:p-4.5 transition-all duration-300 ${
          theme === 'artisan-wood'
            ? 'bg-wood-grain wood-board-frame border-4 border-[#c29663]'
            : 'bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-xl'
        }`}
      >
        {/* Beveled Inset Puzzle Well */}
        <div
          ref={boardRef}
          onPointerMove={handlePointerMove}
          onPointerCancel={handlePointerCancel}
          className={`relative w-full h-full rounded-xl md:rounded-2xl overflow-hidden touch-puzzle-board ${
            theme === 'artisan-wood'
              ? 'wood-tray-recess bg-[#3d2714]/85 border-2 border-[#805329]/40'
              : 'bg-slate-950 border border-slate-800'
          }`}
          style={{
            touchAction: 'none',
          }}
        >
          {/* Active Puzzle Grid */}
          <div
            className="grid w-full h-full p-1 gap-1 md:gap-1.5 transition-all duration-300"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
            }}
          >
            {tiles.map((tile, currentSlot) => {
              const isSelected = selectedSlot === currentSlot;
              const isDragging = draggingSlot === currentSlot;
              const isHoverTarget = hoverTargetSlot === currentSlot;
              const isCorrect = tile.correctIndex === currentSlot;
              const isLocked = isLockedPiecesEnabled && isCorrect;
              const isJustLocked = justLockedId === tile.id;

              // Check if tile is in a visible sliding animation
              let slideTransform = '';
              let slideTransition = '';
              let zIndex = 10;

              if (isDragging) {
                // Real-time pointer sliding follow
                slideTransform = `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) scale(1.08)`;
                slideTransition = 'none';
                zIndex = 50;
              } else if (slidingPair) {
                if (slidingPair.slotA === currentSlot) {
                  // Sliding to Slot B
                  slideTransform = `translate3d(${slidingPair.dx}px, ${slidingPair.dy}px, 0)`;
                  slideTransition = 'transform 240ms cubic-bezier(0.22, 1, 0.36, 1)';
                  zIndex = 35;
                } else if (slidingPair.slotB === currentSlot) {
                  // Sliding to Slot A
                  slideTransform = `translate3d(${-slidingPair.dx}px, ${-slidingPair.dy}px, 0)`;
                  slideTransition = 'transform 240ms cubic-bezier(0.22, 1, 0.36, 1)';
                  zIndex = 30;
                }
              }

              // Background position percentage calculation for NxN grid
              // posX = (col / (N - 1)) * 100%
              // posY = (row / (N - 1)) * 100%
              const col = tile.correctIndex % gridSize;
              const row = Math.floor(tile.correctIndex / gridSize);
              const posX = gridSize > 1 ? (col / (gridSize - 1)) * 100 : 0;
              const posY = gridSize > 1 ? (row / (gridSize - 1)) * 100 : 0;
              const bgSize = `${gridSize * 100}% ${gridSize * 100}%`;

              return (
                <div
                  key={tile.id || currentSlot}
                  ref={(el) => (tileRefs.current[currentSlot] = el)}
                  onClick={() => handleTileClick(currentSlot)}
                  onPointerDown={(e) => handlePointerDown(e, currentSlot)}
                  onPointerUp={handlePointerUp}
                  className={`relative rounded-lg md:rounded-xl cursor-pointer overflow-hidden wood-tile-piece ${
                    isSelected ? 'wood-tile-selected' : ''
                  } ${isDragging ? 'wood-tile-dragging' : ''} ${
                    isHoverTarget ? 'wood-tile-target ring-2 ring-emerald-400' : ''
                  } ${isJustLocked ? 'animate-emerald-snap' : ''} ${
                    isLocked ? 'ring-2 ring-emerald-500/70' : ''
                  }`}
                  style={{
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: bgSize,
                    backgroundPosition: `${posX}% ${posY}%`,
                    backgroundRepeat: 'no-repeat',
                    transform: slideTransform || undefined,
                    transition: slideTransition || undefined,
                    zIndex,
                  }}
                >
                  {/* Subtle wooden piece edge bevel highlight */}
                  <div className="absolute inset-0 pointer-events-none rounded-lg border border-white/20 shadow-inner" />

                  {/* Tile locked badge */}
                  {isLocked && (
                    <div className="absolute top-1 right-1 bg-emerald-600/90 text-white p-0.5 md:p-1 rounded-md shadow-md backdrop-blur-sm">
                      <Lock className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    </div>
                  )}

                  {/* Correct position subtle emerald indicator (when tile lock is disabled) */}
                  {!isLocked && isCorrect && !isSolved && (
                    <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-400/80 shadow-[0_0_6px_#10b981]" />
                  )}

                  {/* Tile index badge (subtle assistance for learning) */}
                  <div className="absolute bottom-1 left-1 bg-black/40 text-white/70 text-[9px] md:text-[10px] font-mono px-1 rounded pointer-events-none">
                    {tile.correctIndex + 1}
                  </div>
                </div>
              );
            })}
          </div>

          {/* "Hold to Peek" Full Reference Overlay */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-200 z-30 flex items-center justify-center ${
              isPeeking ? 'opacity-85' : 'opacity-0'
            }`}
          >
            <img
              src={imageSrc}
              alt="Puzzle Reference Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-slate-900/90 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Reference Preview</span>
            </div>
          </div>

          {/* Solved Celebration Overlay */}
          {isSolved && (
            <div className="absolute inset-0 pointer-events-none z-20 flex flex-col items-center justify-center bg-black/20 backdrop-blur-[1px] animate-fadeIn">
              <div className="bg-amber-500/90 text-slate-950 font-bold px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 border-2 border-white/40 transform scale-110 animate-bounce">
                <CheckCircle2 className="w-5 h-5" />
                <span>Puzzle Completed!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
