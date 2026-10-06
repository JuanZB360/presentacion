import React, { useState } from 'react'
import TerminalWindow from '../common/TerminalWindow'
import Badge from '../common/Badge'
import ImageCarousel from '../carousel/ImageCarousel'

/**
 * SRP & LSP: Slide 3 component - Career trajectory, life lessons, and timeline
 */
export default function HistorySlide({ slide, onOpenGuion }) {
  const [selectedStep, setSelectedStep] = useState(null)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center w-full h-full min-h-0 overflow-hidden">
      {/* Left Column: Timeline & Story */}
      <div className="flex flex-col gap-2.5 w-full h-full min-h-0 justify-between">
        <TerminalWindow
          title="git log --trajectory // El Camino Largo"
          lang="career.log"
          className="w-full flex-1 min-h-0"
        >
          {/* Header */}
          <div>
            <span className="text-xs font-mono font-bold tracking-wider text-emerald-400">
              {slide.codeTag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {slide.title}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              {slide.subtitle}
            </p>
          </div>

          {/* Interactive Timeline */}
          <div className="flex flex-col gap-1.5 mt-2">
            {slide.timeline.map((item, idx) => {
              const isSelected = selectedStep === idx
              return (
                <div
                  key={item.year}
                  onClick={() => setSelectedStep(isSelected ? null : idx)}
                  className={`flex gap-3.5 p-3 rounded-xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-white/[0.02] hover:bg-white/[0.05] border-transparent'
                  }`}
                >
                  {/* Node & Line */}
                  <div className="flex flex-col items-center shrink-0 pt-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]"
                      style={{ backgroundColor: slide.accentColor, color: slide.accentColor }}
                    />
                    {idx < slide.timeline.length - 1 && (
                      <span className="w-0.5 flex-1 bg-white/10 my-1" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {item.year}
                      </span>
                      <Badge variant="emerald">{item.badge}</Badge>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-100">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </TerminalWindow>

        {/* Quick Guion Trigger */}
        <button
          type="button"
          onClick={onOpenGuion}
          className="shrink-0 flex items-center justify-between px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-emerald-500/30 text-xs sm:text-sm text-slate-300 hover:text-emerald-400 transition-all cursor-pointer"
        >
          <span>🎙️ Ver guion para esta diapositiva</span>
          <Badge variant="emerald">{slide.speechTime}</Badge>
        </button>
      </div>

      {/* Right Column: Work Photos Carousel */}
      <div className="flex flex-col gap-2 justify-center items-center w-full shrink-0">
        <div className="flex items-center justify-between px-1 w-full max-w-[500px]">
          <Badge variant="emerald">🛠️ Escuela de la Vida ({slide.images.length} fotos)</Badge>
          <span className="text-[11px] font-mono text-slate-500">Plaza, bananeras, soldadura</span>
        </div>
        <ImageCarousel
          images={slide.images}
          accentColor={slide.accentColor}
          categoryTitle="Trabajo y Campo"
        />
      </div>
    </div>
  )
}
