import { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { slidesData } from '../data/slidesData'
import { getSlideIndexFromPath, getPathBySlideIndex } from '../routes/routes'

/**
 * SRP & DIP: Hook encapsulating presentation navigation, route synchronization,
 * fullscreen control, and keyboard listeners with React Router.
 */
export function usePresentation(slides = slidesData) {
  const navigate = useNavigate()
  const location = useLocation()
  const slidesList = Array.isArray(slides) ? slides : slidesData
  const totalSlides = slidesList.length

  const [isGuionOpen, setIsGuionOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Derive current slide index directly from URL pathname matching presentation routes
  const currentSlideIndex = useMemo(() => {
    return getSlideIndexFromPath(location.pathname)
  }, [location.pathname])

  const goToSlide = useCallback(
    (index) => {
      if (index >= 0 && index < totalSlides) {
        navigate(getPathBySlideIndex(index))
      }
    },
    [navigate, totalSlides]
  )

  const nextSlide = useCallback(() => {
    const nextIdx = (currentSlideIndex + 1) % totalSlides
    navigate(getPathBySlideIndex(nextIdx))
  }, [currentSlideIndex, totalSlides, navigate])

  const prevSlide = useCallback(() => {
    const prevIdx = (currentSlideIndex - 1 + totalSlides) % totalSlides
    navigate(getPathBySlideIndex(prevIdx))
  }, [currentSlideIndex, totalSlides, navigate])

  const toggleGuion = useCallback(() => setIsGuionOpen((prev) => !prev), [])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {})
      }
      setIsFullscreen(false)
    }
  }, [])

  // Listen to fullscreen changes triggered externally (e.g. Esc)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Global presentation keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault()
        nextSlide()
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        prevSlide()
      } else if (e.key === 'n' || e.key === 'N') {
        e.preventDefault()
        toggleGuion()
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault()
        toggleFullscreen()
      } else if (e.key >= '1' && e.key <= String(totalSlides)) {
        const target = parseInt(e.key, 10) - 1
        goToSlide(target)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide, toggleGuion, toggleFullscreen, goToSlide, totalSlides])

  return {
    currentSlideIndex,
    isGuionOpen,
    isFullscreen,
    setIsGuionOpen,
    nextSlide,
    prevSlide,
    goToSlide,
    toggleGuion,
    toggleFullscreen,
  }
}
