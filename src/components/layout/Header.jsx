import React from 'react'
import { Link } from 'react-router-dom'
import ProgressBar from '../common/ProgressBar'
import { ROUTES, PRESENTATION_ROUTES, getPathBySlideIndex } from '../../routes/routes'

/**
 * SRP: Component responsible for top presentation branding, slide pills, and utility toggles.
 * Sized with shrink-0 anchors so utility buttons (Guion, Presentar) are never clipped or overflowed.
 */
export default function Header({
  currentSlideIndex,
  totalSlides,
  slides,
  isGuionOpen,
  onToggleGuion,
  isFullscreen,
  onToggleFullscreen,
}) {
  const currentSlide = slides[currentSlideIndex]
  const progressPercent = ((currentSlideIndex + 1) / totalSlides) * 100

  return (
    <header className="relative shrink-0 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 z-40 select-none">
      {/* Top Micro Progress Bar */}
      <ProgressBar
        percentage={progressPercent}
        accentColor={currentSlide.accentColor || '#38bdf8'}
        height="h-[2px]"
        className="absolute top-0 inset-x-0"
      />

      <div className="w-full max-w-7xl mx-auto h-full px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand / Logo - Always pinned on the left */}
        <div className="shrink-0 flex items-center gap-2">
          <Link
            to={ROUTES.MI_PRESENTACION}
            className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            <span className="font-mono text-xs font-bold text-cyan-400 tracking-tight whitespace-nowrap">
              &gt; JDZ.dev
            </span>
          </Link>
          <span className="text-slate-600 hidden 2xl:inline">/</span>
          <span className="text-[11px] font-mono text-slate-400 hidden 2xl:inline tracking-wider whitespace-nowrap">
            ONBOARDING_PRESENTATION
          </span>
        </div>

        {/* Center: Slide Pills - Compact, flexible, and never overflows */}
        <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-1.5 p-1 bg-white/[0.03] border border-white/5 rounded-xl max-w-full overflow-x-auto scrollbar-none">
          {slides.map((s, idx) => {
            const isActive = idx === currentSlideIndex
            const routeInfo = PRESENTATION_ROUTES[idx]
            const label = routeInfo?.navLabel || s.title.split(':')[0]

            return (
              <Link
                key={s.id}
                to={getPathBySlideIndex(idx)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
                style={{
                  borderBottom: isActive ? `2px solid ${s.accentColor}` : '2px solid transparent',
                }}
              >
                <span className="font-mono text-[10px] text-cyan-400 font-bold">
                  {s.number}
                </span>
                <span className="truncate max-w-[85px] xl:max-w-[110px]">
                  {label}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Right: Quick Actions - ALWAYS pinned, shrink-0, never pushed off */}
        <div className="shrink-0 flex items-center gap-1.5 sm:gap-2">
          {/* Speaker notes toggle button */}
          <button
            type="button"
            onClick={onToggleGuion}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer shrink-0 ${
              isGuionOpen
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border-white/10'
            }`}
            title="Abrir u ocultar guion del presentador (Tecla N)"
          >
            <span>🎙️</span>
            <span className="inline">Guion</span>
            <kbd className="hidden sm:inline text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-slate-400 border border-white/10">
              N
            </kbd>
          </button>

          {/* Fullscreen toggle button */}
          <button
            type="button"
            onClick={onToggleFullscreen}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer shrink-0 ${
              isFullscreen
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border-white/10'
            }`}
            title="Pantalla completa (Tecla F)"
          >
            <span>{isFullscreen ? '⤦' : '⛶'}</span>
            <span className="inline">{isFullscreen ? 'Salir' : 'Presentar'}</span>
            <kbd className="hidden sm:inline text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-slate-400 border border-white/10">
              F
            </kbd>
          </button>
        </div>
      </div>
    </header>
  )
}
