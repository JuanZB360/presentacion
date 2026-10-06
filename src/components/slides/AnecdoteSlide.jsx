import React from 'react'
import TerminalWindow from '../common/TerminalWindow'
import Badge from '../common/Badge'

/**
 * SRP & LSP: Slide 6 component - The truck anecdote presented as an incident report with moralejas
 */
export default function AnecdoteSlide({ slide, onOpenGuion }) {
  const steps = [
    {
      num: '01',
      title: 'El Escenario',
      text: 'Tenía apenas 19 años, flaquito y completamente desgualamido. Viajaba en un camión con dos compañeros gigantes, fornidos y curtidos de carretera repartiendo mercados del ICBF.',
      isSuccess: false,
    },
    {
      num: '02',
      title: 'El Plot Twist',
      text: 'En pleno viaje me doy cuenta de que mis propios compañeros me estaban montando una jugada para robarme a mis espaldas. No había señal, ni policía, ni a quién llamar; solo estábamos los tres y el camión en la nada.',
      isSuccess: false,
    },
    {
      num: '03',
      title: 'La Reacción',
      text: 'Me tocó armarme de valor y enfrentarme a esos dos gigantes yo solito. Sin dar un paso atrás, con determinación y cabeza fría.',
      isSuccess: false,
    },
    {
      num: '✓',
      title: 'El Desenlace',
      text: 'Salí invicto, con todas las cosas completas, la misión cumplida y la integridad intacta.',
      isSuccess: true,
    },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto h-full min-h-0 flex flex-col justify-center items-center overflow-hidden">
      <TerminalWindow
        title="incident-report-19yo.log // La Prueba de Fuego"
        lang="postmortem.md"
        className="w-full h-full min-h-0 flex-1"
      >
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-1">
          <span className="text-xs font-mono font-bold tracking-wider text-rose-400">
            {slide.codeTag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {slide.title}
          </h2>
          <p className="text-sm text-slate-400 max-w-xl">
            {slide.subtitle}
          </p>
        </div>

        {/* Narrative & Moraleja Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-2">
          {/* Incident Timeline */}
          <div className="lg:col-span-7 flex flex-col gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="flex flex-wrap gap-2">
              <Badge variant="rose">🚨 Incidente Crítico</Badge>
              <Badge variant="neutral">Carretera remota</Badge>
              <Badge variant="cyan">Mercados ICBF</Badge>
            </div>

            <h3 className="text-base font-bold text-white mt-1">
              David vs. Goliat en el Camión
            </h3>

            <div className="flex flex-col gap-2.5">
              {steps.map((s) => (
                <div
                  key={s.title}
                  className={`flex gap-3 p-2.5 rounded-lg text-xs leading-relaxed border ${
                    s.isSuccess
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                      : 'bg-black/30 border-white/5 text-slate-300'
                  }`}
                >
                  <span
                    className={`font-mono font-bold shrink-0 ${
                      s.isSuccess ? 'text-emerald-400' : 'text-cyan-400'
                    }`}
                  >
                    {s.num}
                  </span>
                  <div>
                    <strong className="text-white">{s.title}:</strong> {s.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Moralejas & Welcome Card */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {/* Status card */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-rose-950/30 to-black/40 border border-rose-500/20 text-center flex flex-col items-center gap-1">
              <span className="text-3xl">🚚 💨</span>
              <h4 className="text-sm font-bold text-white">Status: Invicto & Bajo Control</h4>
              <span className="text-xs font-mono text-emerald-400">exit_code: 0 (SUCCESS)</span>
            </div>

            {/* Moraleja cards */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex gap-3 items-start">
              <span className="text-xl">🛡️</span>
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Moraleja Principal</span>
                <p className="text-xs sm:text-sm font-mono font-semibold text-cyan-300">
                  "Tranquilos, no muerdo... pero no me dejo tumbar."
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex gap-3 items-start">
              <span className="text-xl">⚡</span>
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-mono text-slate-400 uppercase">En el Trabajo</span>
                <p className="text-xs text-slate-300">
                  Soy tranquilo y cordial, pero mantengo la calma y sé responder con firmeza ante situaciones de alta presión o producción en llamas.
                </p>
              </div>
            </div>

            {/* Welcome banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/15 via-emerald-500/15 to-transparent border border-cyan-500/30 text-center">
              <h4 className="text-sm font-bold text-white">
                ¡Gracias y un gusto enorme estar con todos!
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Listo para picar código, aprender y sumar en cada proyecto.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Guion Trigger */}
        <div className="flex justify-center mt-auto pt-2">
          <button
            type="button"
            onClick={onOpenGuion}
            className="px-5 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-xs font-mono text-rose-300 transition-all cursor-pointer"
          >
            🎙️ Ver guion de esta anécdota ({slide.speechTime})
          </button>
        </div>
      </TerminalWindow>
    </div>
  )
}
