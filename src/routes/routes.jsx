import React from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import SlideRenderer from '../components/slides/SlideRenderer'
import {
  ROUTES,
  PRESENTATION_ROUTES,
  getSlideIndexFromPath,
  getPathBySlideIndex,
} from './routes'

/**
 * Helper redirect component for parameterized /slide/:slideId routes
 */const miMotor = {

  parents: ["Adriana", "Gabriel"],

  siblingsCount: 6,

  siblings: ["Deisy", "Carolina", "Samuel", "Santiago", "Pablo", "Ana"],

  partner: "Carolina 💖",

  purpose: "Aterrizarme después de un día frente a la pantalla"

};
function SlideParamRedirect() {
  const { slideId } = useParams()
  const targetIndex = getSlideIndexFromPath(`/slide/${slideId}`)
  return <Navigate to={getPathBySlideIndex(targetIndex)} replace />
}

/**
 * Helper redirect component for single-segment aliases like /intro, /1, /hobbies
 */
function SlideAliasRedirect() {
  const { alias } = useParams()
  const targetIndex = getSlideIndexFromPath(`/${alias}`)
  return <Navigate to={getPathBySlideIndex(targetIndex)} replace />
}

/**
 * Central Presentation Routes Component (SRP & OCP)
 * Configures all slide routes with their custom URLs, aliases and fallback
 */
export function PresentationRoutes({ slides, onOpenGuion }) {
  return (
    <Routes>
      {/* Root redirect to first slide */}
      <Route path="/" element={<Navigate to={ROUTES.MI_PRESENTACION} replace />} />

      {/* Main Canonical Slide Routes */}
      {PRESENTATION_ROUTES.map((route) => {
        const slide = slides[route.index]
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <div
                key={slide?.id || route.path}
                className="w-full max-w-6xl h-full min-h-0 flex flex-col justify-center items-center overflow-hidden animate-in fade-in zoom-in-[0.99] duration-300"
              >
                <SlideRenderer
                  slide={slide}
                  onOpenGuion={onOpenGuion}
                />
              </div>
            }
          />
        )
      })}

      {/* Legacy/Utility parameterized routes: /slide/:slideId */}
      <Route path="/slide/:slideId" element={<SlideParamRedirect />} />

      {/* Alias routes e.g. /1, /intro, /hobbies */}
      <Route path="/:alias" element={<SlideAliasRedirect />} />

      {/* Catch-all 404 fallback */}
      <Route path="*" element={<Navigate to={ROUTES.MI_PRESENTACION} replace />} />
    </Routes>
  )
}

