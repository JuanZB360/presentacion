import React from 'react'
import IntroSlide from './IntroSlide'
import FamilySlide from './FamilySlide'
import HistorySlide from './HistorySlide'
import PrinciplesSlide from './PrinciplesSlide'
import HobbiesSlide from './HobbiesSlide'
import AnecdoteSlide from './AnecdoteSlide'

/**
 * OCP & DIP: Component Registry mapping slide IDs to dedicated Slide components.
 * Open for extension (add new entries without touching existing ones), closed for modification.
 */
const SLIDE_COMPONENTS = {
  intro: IntroSlide,
  motor: FamilySlide,
  historia: HistorySlide,
  valores: PrinciplesSlide,
  pasatiempos: HobbiesSlide,
  curiosidad: AnecdoteSlide,
}

/**
 * SlideRenderer dispatches rendering to the corresponding modular slide component adhering to LSP
 */
export default function SlideRenderer({ slide, onOpenGuion }) {
  const SlideComponent = SLIDE_COMPONENTS[slide.id]

  if (!SlideComponent) {
    return (
      <div className="flex items-center justify-center h-full p-8 text-center">
        <p className="font-mono text-xs text-rose-400">
          Error 404: Diapositiva "{slide.id}" no registrada en el sistema.
        </p>
      </div>
    )
  }

  return <SlideComponent slide={slide} onOpenGuion={onOpenGuion} />
}
