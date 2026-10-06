import React, { useState } from 'react'
import TerminalWindow from '../common/TerminalWindow'
import Badge from '../common/Badge'
import ImageCarousel from '../carousel/ImageCarousel'
import SlideViewToggle from '../common/SlideViewToggle'

/**
 * SRP & LSP: Slide 5 component - Life outside of code, recharge mode and music
 */
export default function HobbiesSlide({ slide, onOpenGuion }) {
  const [mobileTab, setMobileTab] = useState('info')

  return (
    <div className="flex flex-col w-full h-full min-h-0 overflow-hidden">
      {/* Mobile Switcher (visible on < lg screens) */}
      <SlideViewToggle
        activeTab={mobileTab}
        onTabChange={setMobileTab}
        infoLabel="Offline Mode"
        galleryLabel="Galería Hobbies"
        photoCount={slide.images.length}
        accentColor={slide.accentColor}
      />

      {/* Main Grid: 2 columns on lg (desktop), cleanly toggled on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center justify-center w-full flex-1 min-h-0 overflow-hidden">
        {/* Left Column: Hobbies Cards */}
        <div
          className={`flex-col gap-2.5 w-full h-full min-h-0 justify-between ${
            mobileTab === 'gallery' ? 'hidden lg:flex' : 'flex'
          }`}
        >
        <TerminalWindow
          title="lifestyle.config // Offline Mode"
          lang="balance.yaml"
          className="w-full flex-1 min-h-0"
        >
          {/* Header */}
          <div>
            <span className="text-xs font-mono font-bold tracking-wider text-amber-400">
              {slide.codeTag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {slide.title}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              {slide.subtitle}
            </p>
          </div>

          {/* Hobbies list */}
          <div className="flex flex-col gap-3">
            {/* Guitar Card */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex gap-3.5 items-start">
              <span className="p-2.5 rounded-xl bg-amber-500/10 text-xl shrink-0">🎸</span>
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-100">
                    Guitarra en mano
                  </h4>
                  <Badge variant="amber">Creando música</Badge>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Toco la guitarra para desconectarme de la pantalla, explorar acordes y despejar la cabeza.
                </p>
                {/* Audio soundwave mock */}
                <div className="flex items-end gap-1 h-3.5 mt-1">
                  {[40, 80, 100, 50, 90, 60, 75].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 bg-amber-400 rounded-sm animate-pulse"
                      style={{ height: `${h}%`, animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Food Card */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex gap-3.5 items-start">
              <span className="p-2.5 rounded-xl bg-amber-500/10 text-xl shrink-0">🍜</span>
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-100">
                    Rutas gastronómicas
                  </h4>
                  <Badge variant="amber">Salir a comer</Badge>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Me apasiona salir a comer rico, descubrir restaurantes nuevos y compartir la mesa en buena compañía.
                </p>
              </div>
            </div>

            {/* Gaming & Relax Card */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex gap-3.5 items-start">
              <span className="p-2.5 rounded-xl bg-amber-500/10 text-xl shrink-0">🎮</span>
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-100">
                    Videojuegos & Planes tranquilos
                  </h4>
                  <Badge variant="amber">Con Carolina</Badge>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Partidas casuales y tiempo de calidad en pareja para recargar batería y llegar al otro día con la cabeza fresca.
                </p>
              </div>
            </div>
          </div>
        </TerminalWindow>

        {/* Quick Guion Trigger */}
        <button
          type="button"
          onClick={onOpenGuion}
          className="shrink-0 flex items-center justify-between px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-amber-500/30 text-xs sm:text-sm text-slate-300 hover:text-amber-400 transition-all cursor-pointer"
        >
          <span>🎙️ Ver guion para esta diapositiva</span>
          <Badge variant="amber">{slide.speechTime}</Badge>
        </button>
      </div>

        {/* Right Column: Hobbies Photos Carousel */}
        <div
          className={`flex-col gap-2 justify-center items-center w-full shrink-0 h-full ${
            mobileTab === 'info' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          <div className="flex items-center justify-between px-1 w-full max-w-[500px]">
            <Badge variant="amber">🎸 Galería Pasatiempos ({slide.images.length} fotos)</Badge>
            <span className="text-[11px] font-mono text-slate-500">Música, comida y descanso</span>
          </div>
          <ImageCarousel
            images={slide.images}
            accentColor={slide.accentColor}
            categoryTitle="Pasatiempos"
          />
        </div>
      </div>
    </div>
  )
}
