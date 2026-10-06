import React, { useState } from 'react'
import TerminalWindow from '../common/TerminalWindow'
import Badge from '../common/Badge'
import CodeSnippet from '../common/CodeSnippet'

/**
 * SRP & LSP: Slide 4 component - Work principles, core dev values and mindset
 */
export default function PrinciplesSlide({ slide, onOpenGuion }) {
  const [activePrinciple, setActivePrinciple] = useState(0)

  return (
    <div className="w-full max-w-5xl mx-auto h-full min-h-0 flex flex-col justify-center items-center overflow-hidden">
      <TerminalWindow
        title="core-values.manifest // Principios de Trabajo"
        lang="principles.ts"
        className="w-full h-full min-h-0 flex-1"
      >
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-1">
          <span className="text-xs font-mono font-bold tracking-wider text-indigo-400">
            {slide.codeTag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {slide.title}
          </h2>
          <p className="text-sm text-slate-400 max-w-xl">
            {slide.subtitle}
          </p>
        </div>

        {/* 3 Principles Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          {slide.principles.map((p, idx) => {
            const isActive = activePrinciple === idx
            return (
              <div
                key={p.title}
                onClick={() => setActivePrinciple(idx)}
                className={`p-4 rounded-xl border flex flex-col gap-3 transition-all cursor-pointer relative ${
                  isActive
                    ? 'bg-indigo-500/[0.08] border-indigo-500/40 shadow-[0_0_20px_rgba(129,140,248,0.15)] scale-[1.02]'
                    : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Badge variant="purple">{p.tag}</Badge>
                  <span className="text-xs font-mono text-slate-500">0{idx + 1}</span>
                </div>

                <h3 className="text-base font-bold text-white">
                  {p.title}
                </h3>

                <p className="text-xs font-mono text-cyan-300 bg-cyan-950/30 p-2 rounded-lg border border-cyan-500/20 leading-relaxed">
                  "{p.highlight}"
                </p>

                <p className="text-xs text-slate-400 leading-relaxed flex-1">
                  {p.detail}
                </p>

                <CodeSnippet code={p.code} />
              </div>
            )
          })}
        </div>

        {/* Bottom Banner */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="text-sm font-semibold text-slate-100">
                El código fluye cuando la actitud es constructiva
              </h4>
              <p className="text-xs text-slate-400">
                Calidad técnica combinada con empatía, compañerismo y perseverancia ante los retos.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenGuion}
            className="shrink-0 px-4 py-2 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 text-xs font-mono text-indigo-300 transition-all cursor-pointer"
          >
            🎙️ Ver guion ({slide.speechTime})
          </button>
        </div>
      </TerminalWindow>
    </div>
  )
}
