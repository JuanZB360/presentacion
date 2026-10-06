import React from 'react'
import { useCarousel } from '../../hooks/useCarousel'
import CarouselStage from './CarouselStage'
import CarouselControls from './CarouselControls'
import CarouselThumbnails from './CarouselThumbnails'
import Lightbox from '../common/Lightbox'

/**
 * DIP & SRP: High-level Carousel composer delegating state to useCarousel hook and views to subcomponents
 */
export default function ImageCarousel({
  images = [],
  accentColor = '#38bdf8',
  categoryTitle = 'Galería',
}) {
  const {
    currentIndex,
    isPlaying,
    isHovered,
    isLightboxOpen,
    setIsHovered,
    setIsLightboxOpen,
    next,
    prev,
    goTo,
    togglePlay,
  } = useCarousel(images.length, 4000)

  if (!images || images.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-900/50 border border-white/5 rounded-2xl">
        <p className="text-xs font-mono text-slate-500">// No hay imágenes en este módulo</p>
      </div>
    )
  }

  const currentImage = images[currentIndex]

  return (
    <div
      className="flex flex-col gap-2.5 w-full max-w-[500px] mx-auto select-none overflow-hidden justify-center items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Relative container wrapping Stage and Controls */}
      <div className="relative w-full">
        <CarouselStage
          currentImage={currentImage}
          accentColor={accentColor}
          onOpenZoom={() => setIsLightboxOpen(true)}
          isPlaying={isPlaying}
          totalItems={images.length}
          isHovered={isHovered}
        />

        <CarouselControls
          currentIndex={currentIndex}
          totalItems={images.length}
          isPlaying={isPlaying}
          accentColor={accentColor}
          categoryTitle={categoryTitle}
          onPrev={prev}
          onNext={next}
          onTogglePlay={togglePlay}
          onOpenZoom={() => setIsLightboxOpen(true)}
        />
      </div>

      {/* Thumbnails Rail */}
      <CarouselThumbnails
        images={images}
        currentIndex={currentIndex}
        accentColor={accentColor}
        onSelect={(idx) => {
          goTo(idx)
        }}
      />

      {/* Lightbox full-size view */}
      <Lightbox
        isOpen={isLightboxOpen}
        image={currentImage}
        currentIndex={currentIndex}
        total={images.length}
        onClose={() => setIsLightboxOpen(false)}
        onNext={next}
        onPrev={prev}
        accentColor={accentColor}
      />
    </div>
  )
}
