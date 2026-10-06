import React from 'react'

/**
 * SRP & ISP: Component solely responsible for displaying the main current image, caption, and zoom trigger
 */
export default function CarouselStage({
  currentImage,
  accentColor = '#38bdf8',
  onOpenZoom,
  isPlaying,
  totalItems,
  isHovered,
}) {
  return (
    <div
      onClick={onOpenZoom}
      className="relative w-full h-[440px] sm:h-[480px] lg:h-[520px] max-h-[58vh] bg-slate-950/90 border border-white/10 rounded-2xl overflow-hidden cursor-pointer group flex items-center justify-center shadow-2xl transition-all duration-300 hover:border-white/20 select-none shrink-0"
    >
      {/* Subtle ambient blurred background from the image itself */}
      <img
        src={currentImage.url}
        alt=""
        className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20 scale-110 pointer-events-none select-none"
      />

      {/* Main image - fits container completely, NEVER overflows or desborda */}
      <img
        key={currentImage.url}
        src={currentImage.url}
        alt={currentImage.caption}
        className="relative z-10 max-w-full max-h-full w-auto h-auto object-contain select-none transition-transform duration-300 group-hover:scale-[1.02]"
        loading="lazy"
      />

      {/* Caption Overlay */}
      <div className="absolute bottom-0 inset-x-0 p-4 pt-12 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent flex items-center justify-between pointer-events-none">
        <p className="text-sm font-medium text-slate-100 drop-shadow-md truncate max-w-[80%]">
          {currentImage.caption}
        </p>
        <span className="text-[11px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-white/10">
          Click zoom 🔍
        </span>
      </div>

      {/* Auto-play progress bar at bottom of stage */}
      {isPlaying && totalItems > 1 && !isHovered && (
        <div className="absolute bottom-0 inset-x-0 h-0.5 bg-white/10 z-10 overflow-hidden">
          <div
            key={currentImage.url}
            className="h-full w-full origin-left animate-[progressFill_4s_linear_forwards]"
            style={{ backgroundColor: accentColor }}
          />
        </div>
      )}
    </div>
  )
}
