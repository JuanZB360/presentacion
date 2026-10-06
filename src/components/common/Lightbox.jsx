import React, { useEffect } from 'react'

/**
 * SRP & ISP: Dedicated modal dialog for inspecting an image in full detail
 */
export default function Lightbox({
  isOpen,
  image,
  currentIndex,
  total,
  onClose,
  onNext,
  onPrev,
  accentColor = '#38bdf8',
}) {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') onNext()
      else if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onNext, onPrev])

  if (!isOpen || !image) return null

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-950/80 hover:bg-slate-800 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
          title="Cerrar (Esc)"
        >
          ✕
        </button>

        {/* Main Image Display */}
        <div className="flex-1 flex items-center justify-center bg-black/95 max-h-[65vh] sm:max-h-[72vh] p-1 sm:p-2 overflow-hidden">
          <img
            src={image.url}
            alt={image.caption}
            className="max-h-full max-w-full object-contain select-none"
          />
        </div>

        {/* Footer Info & Nav */}
        <div className="p-3 sm:p-4 bg-slate-950/90 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <span
              className="text-xs font-mono font-semibold px-2 py-0.5 rounded border border-white/10 shrink-0"
              style={{ color: accentColor }}
            >
              {currentIndex + 1} / {total}
            </span>
            <p className="text-xs sm:text-sm font-medium text-slate-200 truncate max-w-[220px] sm:max-w-md">
              {image.caption}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
            <button
              onClick={onPrev}
              className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 border border-white/10 cursor-pointer transition-all text-center"
            >
              ◀ Anterior
            </button>
            <button
              onClick={onNext}
              className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 border border-white/10 cursor-pointer transition-all text-center"
            >
              Siguiente ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
