import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Lock, Eye, CheckCircle2, ArrowLeftRight } from 'lucide-react';
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

  // Coordinated sliding & swapping animation states
  const [slidingPair, setSlidingPair] = useState(null); // { slotA, slotB, dx, dy }
  const [settlingSlots, setSettlingSlots] = useState([]); // slots executing landing bounce
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

  // Execute remarkable coordinated 2-way swapping animation between blocks
  const animateAndSwap = useCallback((slotA, slotB) => {
    if (slotA === slotB || slidingPair) return;

    const elA = tileRefs.current[slotA];
    const elB = tileRefs.current[slotB];

    if (!elA || !elB) {
      sound.playSlide(0.2);
      sound.playDrop();
      onSwapTiles(slotA, slotB);
      return;
    }

    const rectA = elA.getBoundingClientRect();
    const rectB = elB.getBoundingClientRect();

    const dx = rectB.left - rectA.left;
    const dy = rectB.top - rectA.top;

    // Start 2-way coordinated glide & play realistic wooden slide friction sound
    setSlidingPair({ slotA, slotB, dx, dy });
    sound.playSlide(0.28);

    // After transit duration, finalize tile state and trigger settling bounce
    setTimeout(() => {
      onSwapTiles(slotA, slotB);
      setSlidingPair(null);
      setSettlingSlots([slotA, slotB]);
      sound.playDrop();

      // Clear settle bounce after animation completes
      setTimeout(() => {
        setSettlingSlots([]);
      }, 360);
    }, 280);
  }, [slidingPair, onSwapTiles]);

  // Method A: Tap-to-Swap (with choreographed 2-way sliding)
  const handleTileClick = (slotIndex) => {
    if (!isGameActive || isSolved || slidingPair) return;
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
      // Tap second tile -> Visibly slide both blocks to trade places!
      const sourceSlot = selectedSlot;
      setSelectedSlot(null);
      animateAndSwap(sourceSlot, slotIndex);
    }
  };

  // Method B: Pointer Drag-and-Swap with 3D Tilt & Magnetic Target Reaction
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
      // Play wooden sliding sound while dragging
      sound.playSlide(0.18);
    }

    setDragOffset({ x: dx, y: dy });

    // Detect target slot directly beneath pointer
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
          // Can only swap if target is not locked
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
      // Execute 2-way swapping transition
      animateAndSwap(sourceSlot, targetSlot);
      setSelectedSlot(null);
    } else if (wasMoved) {
      // Snapped back home to original socket
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
            className="grid w-full h-full p-1 gap-1 md:gap-1.5 transition-all duration-300 relative"
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
              const isSettling = settlingSlots.includes(currentSlot);

              // 3D dynamic tilt and shadow calculations for dragging
              const tiltX = Math.max(-14, Math.min(14, dragOffset.y * -0.07));
              const tiltY = Math.max(-14, Math.min(14, dragOffset.x * 0.07));
              const tiltZ = Math.max(-8, Math.min(8, dragOffset.x * 0.04));

              let slideTransform = '';
              let slideTransition = '';
              let zIndex = 10;
              let customBoxShadow = undefined;

              if (isDragging) {
                // Real-time 3D floating follow
                slideTransform = `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) scale(1.12) rotate(${tiltZ}deg) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
                slideTransition = 'none';
                zIndex = 50;
                customBoxShadow = `${-dragOffset.x * 0.12}px ${18 + Math.abs(dragOffset.y * 0.08)}px 36px rgba(0,0,0,0.7), 0 0 0 3px #f59e0b, 0 0 25px rgba(245,158,11,0.7)`;
              } else if (slidingPair) {
                if (slidingPair.slotA === currentSlot) {
                  // Active Block A glides with elevated layer to Slot B
                  slideTransform = `translate3d(${slidingPair.dx}px, ${slidingPair.dy}px, 0) scale(1.06)`;
                  slideTransition = 'transform 280ms cubic-bezier(0.34, 1.35, 0.64, 1)';
                  zIndex = 40;
                } else if (slidingPair.slotB === currentSlot) {
                  // Displaced Block B glides along tray groove to Slot A
                  slideTransform = `translate3d(${-slidingPair.dx}px, ${-slidingPair.dy}px, 0) scale(0.96)`;
                  slideTransition = 'transform 280ms cubic-bezier(0.34, 1.35, 0.64, 1)';
                  zIndex = 30;
                }
              }

              // Background position percentage calculation for NxN grid
              const col = tile.correctIndex % gridSize;
              const row = Math.floor(tile.correctIndex / gridSize);
              const posX = gridSize > 1 ? (col / (gridSize - 1)) * 100 : 0;
              const posY = gridSize > 1 ? (row / (gridSize - 1)) * 100 : 0;
              const bgSize = `${gridSize * 100}% ${gridSize * 100}%`;

              return (
                <div key={tile.id || currentSlot} className="relative w-full h-full">
                  {/* Empty carved wooden recess revealed when piece is lifted out */}
                  {isDragging && (
                    <div className="absolute inset-0 rounded-lg md:rounded-xl wood-empty-socket flex flex-col items-center justify-center border border-dashed border-amber-500/40 z-0">
                      <div className="w-5 h-5 rounded-full border border-amber-500/30 bg-amber-500/10 flex items-center justify-center">
                        <span className="text-[10px] font-mono text-amber-400/60 font-bold">
                          {currentSlot + 1}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Physical Wooden Block */}
                  <div
                    ref={(el) => (tileRefs.current[currentSlot] = el)}
                    onClick={() => handleTileClick(currentSlot)}
                    onPointerDown={(e) => handlePointerDown(e, currentSlot)}
                    onPointerUp={handlePointerUp}
                    className={`relative w-full h-full rounded-lg md:rounded-xl cursor-pointer overflow-hidden wood-tile-piece ${
                      isSelected ? 'wood-tile-selected' : ''
                    } ${isDragging ? 'wood-tile-dragging' : ''} ${
                      isHoverTarget ? 'wood-tile-target' : ''
                    } ${isSettling ? 'animate-tile-settle' : ''} ${
                      isJustLocked ? 'animate-emerald-snap' : ''
                    } ${isLocked ? 'ring-2 ring-emerald-500/70' : ''}`}
                    style={{
                      backgroundImage: `url(${imageSrc})`,
                      backgroundSize: bgSize,
                      backgroundPosition: `${posX}% ${posY}%`,
                      backgroundRepeat: 'no-repeat',
                      transform: slideTransform || undefined,
                      transition: slideTransition || undefined,
                      boxShadow: customBoxShadow,
                      zIndex,
                      touchAction: 'none',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                    }}
                  >
                    {/* Subtle wooden piece edge bevel highlight */}
                    <div className="absolute inset-0 pointer-events-none rounded-lg border border-white/20 shadow-inner" />

                    {/* Magnetic target swap indicator badge */}
                    {isHoverTarget && (
                      <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-[1px] flex flex-col items-center justify-center pointer-events-none animate-fadeIn">
                        <div className="p-1.5 rounded-full bg-emerald-500/90 text-slate-950 shadow-lg animate-pulse">
                          <ArrowLeftRight className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-bold text-emerald-200 mt-1 uppercase tracking-wider drop-shadow">
                          Swap
                        </span>
                      </div>
                    )}

                    {/* Tile locked badge */}
                    {isLocked && (
                      <div className="absolute top-1 right-1 bg-emerald-600/90 text-white p-0.5 md:p-1 rounded-md shadow-md backdrop-blur-sm">
                        <Lock className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      </div>
                    )}

                    {/* Correct position subtle emerald indicator */}
                    {!isLocked && isCorrect && !isSolved && (
                      <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-400/80 shadow-[0_0_6px_#10b981]" />
                    )}

                    {/* Corner tile index badge */}
                    <div className="absolute bottom-1 left-1 bg-black/40 text-white/70 text-[9px] md:text-[10px] font-mono px-1 rounded pointer-events-none">
                      {tile.correctIndex + 1}
                    </div>
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
