import React, { useState } from 'react'
import TerminalWindow from '../common/TerminalWindow'
import Badge from '../common/Badge'
import StatCard from '../common/StatCard'
import CodeSnippet from '../common/CodeSnippet'
import ImageCarousel from '../carousel/ImageCarousel'

/**
 * SRP & LSP: Slide 1 component - Developer introduction and status
 */
export default function IntroSlide({ slide, onOpenGuion }) {
  const [coffeeCount, setCoffeeCount] = useState(3)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center w-full h-full max-h-[calc(100vh-140px)] overflow-hidden">
      {/* Left Column: Terminal & Profile Info */}
      <div className="flex flex-col gap-2.5 w-full h-full min-h-0 justify-between">
        <TerminalWindow
          title="juan-david-zapata@dev:~$ whoami"
          lang="react 19 / vite"
          className="w-full flex-1 min-h-0"
        >
          {/* Header Row: Prompt + Badges */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <span className="text-cyan-400 font-bold">&gt;</span>
              <span>whoami --role --status</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Badge variant="cyan" hasDot>
                💻 {slide.role}
              </Badge>
              <Badge variant="emerald" hasDot>
                Activo
              </Badge>
            </div>
          </div>

          {/* Name & Quote */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
              Juan David Zapata
            </h1>
            <p className="p-2.5 mt-2 rounded-r-xl bg-black/30 border-l-4 border-cyan-400 text-slate-200 text-xs sm:text-sm leading-relaxed">
              "{slide.status}"
            </p>
          </div>

          {/* Developer Stats Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            <StatCard
              label="Semana 1"
              value="0 Caídas 🛡️"
              subtext="En producción"
            />
            <StatCard
              label="Combustible ☕"
              value={`${coffeeCount} tazas`}
              subtext="Click servir +"
              onClick={() => setCoffeeCount((prev) => prev + 1)}
            />
            <StatCard
              label="Mentalidad"
              value="Aprender & Sumar"
              subtext="Con el equipo 🚀"
            />
          </div>

          {/* Code preview: Generous, readable, syntax-highlighted block */}
          <div className="flex flex-col gap-1 mt-1 shrink-0">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-0.5">
              <span className="flex items-center gap-1.5 text-cyan-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
                <span>newTeamMember.js</span>
              </span>
              <span className="text-slate-500">// Objeto de configuración</span>
            </div>
            <CodeSnippet code={slide.codeSnippet} className="min-h-[160px]" />
          </div>
        </TerminalWindow>

        {/* Quick Guion Trigger */}
        <button
          type="button"
          onClick={onOpenGuion}
          className="shrink-0 flex items-center justify-between px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-cyan-500/30 text-xs sm:text-sm text-slate-300 hover:text-cyan-400 transition-all cursor-pointer"
        >
          <span>🎙️ Ver guion para esta diapositiva</span>
          <Badge variant="emerald">{slide.speechTime}</Badge>
        </button>
      </div>

      {/* Right Column: Interactive Photo Gallery */}
      <div className="flex flex-col gap-2 justify-center items-center w-full shrink-0">
        <div className="flex items-center justify-between px-1 w-full max-w-[500px]">
          <Badge variant="cyan">📸 Galería Personal (yo)</Badge>
          <span className="text-[11px] font-mono text-slate-500">Interactúa con el carrusel</span>
        </div>
        <ImageCarousel
          images={slide.images}
          accentColor={slide.accentColor}
          categoryTitle="Juan David"
        />
      </div>
    </div>
  )
}
