import React from 'react'
import { useStopwatch } from '../../hooks/useStopwatch'
import Badge from '../common/Badge'

/**
 * SRP & DIP: Teleprompter drawer for the speaker with practice chronometer and guidance tips
 */
export default function SpeakerNotesDrawer({
  isOpen,
  onClose,
  slide,
  slideIndex,
  totalSlides,
}) {
  const { isRunning, toggle, reset, formattedTime } = useStopwatch()

  if (!isOpen) return null

  return (
    <aside
      className="fixed bottom-16 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
      aria-label="Notas del orador"
    >
      <div className="pointer-events-auto max-w-4xl w-full bg-slate-900/95 backdrop-blur-2xl border border-cyan-500/30 rounded-t-2xl shadow-2xl overflow-hidden flex flex-col max-h-[55vh] animate-in slide-in-from-bottom duration-300">
        {/* Drawer Header */}
        <div className="p-4 bg-slate-950/70 border-b border-white/10 flex items-center justify-between gap-4 select-none">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              Guion del Presentador
              <span className="text-xs font-mono text-cyan-400 font-normal">// Teleprompter</span>
            </h3>
            <Badge variant="cyan">
              Slide {slideIndex + 1}/{totalSlides}
            </Badge>
          </div>

          {/* Stopwatch Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-black/40 border border-white/5 text-xs font-mono">
              <span className="text-slate-400">Cronómetro:</span>
              <span className="font-bold text-emerald-400">{formattedTime}</span>
              <span className="text-slate-500 text-[11px]">(Meta: {slide.speechTime})</span>
            </div>

            <button
              onClick={toggle}
              className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-xs text-white transition-all cursor-pointer font-mono"
            >
              {isRunning ? '⏸ Pausa' : '▶ Iniciar'}
            </button>
            <button
              onClick={reset}
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-all cursor-pointer font-mono"
            >
              ↺ Reset
            </button>

            <button
              onClick={onClose}
              className="ml-2 w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              title="Cerrar guion (N)"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="p-6 overflow-y-auto flex flex-col gap-5">
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400 border-b border-white/5 pb-2">
            <span><strong>Diapositiva:</strong> {slide.title}</span>
            <span>•</span>
            <span><strong>Tiempo sugerido:</strong> {slide.speechTime}</span>
          </div>

          {/* Speech Script */}
          <div className="relative p-5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-slate-100 text-base sm:text-lg leading-relaxed font-normal">
            <span className="absolute top-2 left-2 text-3xl text-cyan-500/20 select-none font-serif">“</span>
            <p className="relative z-10 pl-3">
              {slide.script}
            </p>
          </div>

          {/* Advice */}
          <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-slate-400 space-y-1">
            <p className="font-semibold text-slate-300">💡 Consejos para la presentación:</p>
            <ul className="list-disc pl-5 space-y-0.5 text-slate-400">
              <li>Habla con ritmo pausado, transmite entusiasmo y mantén buen ánimo.</li>
              <li>Si estás compartiendo pantalla en Meet o Teams, puedes dejar este guion abierto abajo para apoyarte.</li>
              <li>Avanza con la tecla <kbd className="px-1 py-0.5 rounded bg-black/40 text-slate-300">Espacio</kbd> o <kbd className="px-1 py-0.5 rounded bg-black/40 text-slate-300">→</kbd>.</li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  )
}
