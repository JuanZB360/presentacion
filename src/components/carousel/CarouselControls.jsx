import React from 'react'

/**
 * SRP & ISP: Component solely responsible for rendering Carousel navigation and state controls
 */
export default function CarouselControls({
  currentIndex,
  totalItems,
  isPlaying,
  accentColor = '#38bdf8',
  categoryTitle = 'Galería',
  onPrev,
  onNext,
  onTogglePlay,
  onOpenZoom,
}) {
  return (
    <>
      {/* Top Floating Bar */}
      <div
        className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex items-center justify-between z-20 pointer-events-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-slate-950/80 backdrop-blur-md border text-[11px] sm:text-xs font-mono text-slate-200"
          style={{ borderColor: `${accentColor}40` }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: accentColor }}
          />
          <span>
            {categoryTitle} • {String(currentIndex + 1).padStart(2, '0')} / {String(totalItems).padStart(2, '0')}
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onTogglePlay()
            }}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-200 border border-white/10 flex items-center justify-center transition-all cursor-pointer hover:scale-105"
            title={isPlaying ? 'Pausar avance automático' : 'Reanudar avance automático'}
          >
            {isPlaying ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 4l15 8-15 8V4z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onOpenZoom()
            }}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-200 border border-white/10 flex items-center justify-center transition-all cursor-pointer hover:scale-105"
            title="Ver imagen completa (Zoom)"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Prev / Next Arrows */}
      {totalItems > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onPrev()
            }}
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-950/70 hover:bg-slate-800 text-white border border-white/15 flex items-center justify-center opacity-80 hover:opacity-100 transition-all cursor-pointer hover:scale-110 shadow-lg"
            aria-label="Foto anterior"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onNext()
            }}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-950/70 hover:bg-slate-800 text-white border border-white/15 flex items-center justify-center opacity-80 hover:opacity-100 transition-all cursor-pointer hover:scale-110 shadow-lg"
            aria-label="Foto siguiente"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}
    </>
  )
}
