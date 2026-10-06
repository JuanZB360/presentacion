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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-slate-800 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
          title="Cerrar (Esc)"
        >
          ✕
        </button>

        {/* Main Image Display */}
        <div className="flex-1 flex items-center justify-center bg-black/95 max-h-[72vh] p-2 overflow-hidden">
          <img
            src={image.url}
            alt={image.caption}
            className="max-h-full max-w-full object-contain select-none"
          />
        </div>

        {/* Footer Info & Nav */}
        <div className="p-4 bg-slate-950/90 border-t border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-mono font-semibold px-2 py-0.5 rounded border border-white/10"
              style={{ color: accentColor }}
            >
              {currentIndex + 1} / {total}
            </span>
            <p className="text-sm font-medium text-slate-200 truncate max-w-md">
              {image.caption}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 border border-white/10 cursor-pointer transition-all"
            >
              ◀ Anterior
            </button>
            <button
              onClick={onNext}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 border border-white/10 cursor-pointer transition-all"
            >
              Siguiente ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
