import React from 'react'
import { Link } from 'react-router-dom'
import { getPathBySlideIndex } from '../../routes/routes'

/**
 * SRP: Component responsible for bottom presentation navigation controls and keyboard legend
 */
export default function Footer({
  currentSlideIndex,
  totalSlides,
  slides,
  onPrev,
  onNext,
}) {
  const currentSlide = slides[currentSlideIndex]
  const isFirst = currentSlideIndex === 0
  const isLast = currentSlideIndex === totalSlides - 1

  return (
    <footer className="shrink-0 h-16 bg-slate-950/85 backdrop-blur-xl border-t border-white/5 z-40 select-none">
      <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Previous Button */}
        <div>
          <button
            onClick={onPrev}
            disabled={isFirst}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
              isFirst
                ? 'opacity-30 cursor-not-allowed border-transparent text-slate-500'
                : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border-white/10 hover:border-white/20'
            }`}
            title="Diapositiva anterior [←]"
          >
            <span>←</span>
            <span>Anterior</span>
            <kbd className="hidden sm:inline text-[10px] font-mono opacity-50">[←]</kbd>
          </button>
        </div>

        {/* Center: Slide dots & info */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="text-xs font-mono">
            <span className="font-bold text-cyan-400">
              {String(currentSlideIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-slate-600"> / </span>
            <span className="text-slate-400">
              {String(totalSlides).padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {slides.map((s, idx) => {
              const isActive = idx === currentSlideIndex
              return (
                <Link
                  key={s.id}
                  to={getPathBySlideIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    isActive ? 'scale-125 shadow-md' : 'opacity-30 hover:opacity-75'
                  }`}
                  style={{
                    backgroundColor: isActive ? s.accentColor : '#94a3b8',
                  }}
                  title={`${s.number}. ${s.title}`}
                  aria-label={`Ir a diapositiva ${idx + 1}`}
                />
              )
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-slate-500">
            <span><kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10">← / →</kbd> Mover</span>
            <span>•</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10">Espacio</kbd> Avanzar</span>
            <span>•</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10">N</kbd> Guion</span>
          </div>
        </div>

        {/* Right: Next Button */}
        <div>
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
            style={{
              backgroundColor: currentSlide.accentColor || '#38bdf8',
              color: '#070a13',
              boxShadow: `0 0 20px ${currentSlide.accentColor}30`,
            }}
            title={isLast ? 'Reiniciar presentación' : 'Siguiente diapositiva [→ o Espacio]'}
          >
            <span>{isLast ? 'Reiniciar ↺' : 'Siguiente'}</span>
            {!isLast && <span>→</span>}
            <kbd className="hidden sm:inline text-[10px] font-mono opacity-60">[→]</kbd>
          </button>
        </div>
      </div>
    </footer>
  )
}
