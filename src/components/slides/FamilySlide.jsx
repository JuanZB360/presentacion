import React, { useState } from 'react'
import TerminalWindow from '../common/TerminalWindow'
import Badge from '../common/Badge'
import CodeSnippet from '../common/CodeSnippet'
import ImageCarousel from '../carousel/ImageCarousel'
import SlideViewToggle from '../common/SlideViewToggle'

/**
 * SRP & LSP: Slide 2 component - Family and partner cluster with prominent code block
 */
export default function FamilySlide({ slide, onOpenGuion }) {
  const [mobileTab, setMobileTab] = useState('info')
  const siblings = ['Deisy', 'Carolina', 'Samuel', 'Santiago', 'Pablo', 'Ana']

  return (
    <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
      {/* Mobile Switcher (visible on < lg screens) */}
      <SlideViewToggle
        activeTab={mobileTab}
        onTabChange={setMobileTab}
        infoLabel="Familia & Motor"
        galleryLabel="Galería Familiar"
        photoCount={slide.images.length}
        accentColor={slide.accentColor}
      />

      {/* Main Grid: 2 columns on lg (desktop), cleanly toggled on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center justify-center w-full flex-1 min-h-0 overflow-hidden">
        {/* Left Column: Family Cluster Info */}
        <div
          className={`flex-col gap-2.5 w-full h-full min-h-0 justify-between ${
            mobileTab === 'gallery' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          <TerminalWindow
            title="cluster.config.json // Mi Motor"
            lang="family.json"
            className="w-full flex-1 min-h-0"
          >
            {/* Header */}
            <div>
              <span className="text-xs font-mono font-bold tracking-wider text-rose-400">
                {slide.codeTag}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                {slide.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                {slide.subtitle}
              </p>
            </div>

            {/* Compact Family Network Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
              {/* Parents Card */}
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">👨‍👩‍👦</span>
                  <h4 className="text-xs font-semibold text-slate-100">
                    Adriana y Gabriel (Padres)
                  </h4>
                </div>
                <p className="text-[11px] text-slate-400">
                  El pilar, la raíz y el ejemplo de trabajo constante.
                </p>
              </div>

              {/* Partner Card */}
              <div className="p-2.5 rounded-xl bg-rose-500/[0.08] border border-rose-500/25 flex flex-col gap-0.5 shadow-[0_0_15px_rgba(244,63,94,0.06)]">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">💖</span>
                  <h4 className="text-xs font-semibold text-rose-300">
                    Carolina (Compañera de ruta)
                  </h4>
                </div>
                <p className="text-[11px] text-slate-300">
                  Apoyo incondicional y quien me aterriza cada día.
                </p>
              </div>

              {/* Siblings Card (spans 2 columns) */}
              <div className="sm:col-span-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">🛡️</span>
                    <h4 className="text-xs font-semibold text-slate-100">
                      Hermanos: Modo Clan
                    </h4>
                  </div>
                  <Badge variant="cyan">[6 hermanos]</Badge>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {siblings.map((name, i) => (
                    <span
                      key={name}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-[11px] text-slate-200"
                    >
                      <span className="text-[10px] font-mono text-cyan-400 font-bold">{i + 1}.</span>
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Generous Code block: Easily readable, prominent, syntax highlighted */}
            <div className="flex flex-col gap-1 mt-1 shrink-0">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-0.5">
                <span className="flex items-center gap-1.5 text-rose-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_6px_#f43f5e]" />
                  <span>miMotor.js</span>
                </span>
                <span className="text-slate-500">// Estructura de mi respaldo</span>
              </div>
              <CodeSnippet code={slide.codeSnippet} className="min-h-[160px]" />
            </div>
          </TerminalWindow>

          {/* Quick Guion Trigger */}
          <button
            type="button"
            onClick={onOpenGuion}
            className="shrink-0 flex items-center justify-between px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-rose-500/30 text-xs sm:text-sm text-slate-300 hover:text-rose-400 transition-all cursor-pointer"
          >
            <span>🎙️ Ver guion para esta diapositiva</span>
            <Badge variant="rose">{slide.speechTime}</Badge>
          </button>
        </div>

        {/* Right Column: Family & Partner Photos Carousel */}
        <div
          className={`flex-col gap-2 justify-center items-center w-full shrink-0 h-full ${
            mobileTab === 'info' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          <div className="flex items-center justify-between px-1 w-full max-w-[500px]">
            <Badge variant="rose">👨‍👩‍👧‍👦 Galería Familiar ({slide.images.length} fotos)</Badge>
            <span className="text-[11px] font-mono text-slate-500">Desliza o amplía para ver</span>
          </div>
          <ImageCarousel
            images={slide.images}
            accentColor={slide.accentColor}
            categoryTitle="Familia & Carolina"
          />
        </div>
      </div>
    </div>
  )
}
