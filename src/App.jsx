import React from 'react'
import { slidesData } from './data/slidesData'
import { usePresentation } from './hooks/usePresentation'
import { PresentationRoutes } from './routes/routes.jsx'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import SpeakerNotesDrawer from './components/teleprompter/SpeakerNotesDrawer'
import './index.css'

/**
 * High-level Application Orchestrator adhering to SOLID principles:
 * - SRP: Orchestrates layout and composition
 * - DIP: Inverts state management to usePresentation hook and slide rendering to SlideRenderer
 */
export default function App() {
  const {
    currentSlideIndex,
    isGuionOpen,
    isFullscreen,
    setIsGuionOpen,
    nextSlide,
    prevSlide,
    toggleGuion,
    toggleFullscreen,
  } = usePresentation(slidesData)

  const currentSlide = slidesData[currentSlideIndex]

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-slate-950 text-slate-100 font-sans select-none">
      {/* Background Ambient Glows & Cyber Grid */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full blur-[100px] opacity-25 transition-all duration-700"
          style={{ backgroundColor: currentSlide.accentColor || '#38bdf8' }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[550px] h-[550px] rounded-full blur-[100px] opacity-20 transition-all duration-700"
          style={{ backgroundColor: currentSlide.accentColor || '#38bdf8' }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Presentation Shell */}
      <div className="relative z-10 flex flex-col w-full h-full">
        {/* Header Navigation */}
        <Header
          currentSlideIndex={currentSlideIndex}
          totalSlides={slidesData.length}
          slides={slidesData}
          isGuionOpen={isGuionOpen}
          onToggleGuion={toggleGuion}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        />

        {/* Viewport for current slide - Handled by PresentationRoutes */}
        <main className="flex-1 min-h-0 overflow-hidden px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-center">
          <PresentationRoutes
            slides={slidesData}
            onOpenGuion={() => setIsGuionOpen(true)}
          />
        </main>

        {/* Footer Navigation Controls */}
        <Footer
          currentSlideIndex={currentSlideIndex}
          totalSlides={slidesData.length}
          slides={slidesData}
          onPrev={prevSlide}
          onNext={nextSlide}
        />
      </div>

      {/* Speaker Notes Drawer / Teleprompter */}
      <SpeakerNotesDrawer
        key={currentSlideIndex}
        isOpen={isGuionOpen}
        onClose={() => setIsGuionOpen(false)}
        slide={currentSlide}
        slideIndex={currentSlideIndex}
        totalSlides={slidesData.length}
      />
    </div>
  )
}
