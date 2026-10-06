import { useState, useEffect, useCallback } from 'react'

/**
 * SRP: Hook dedicated solely to carousel state management, cyclic navigation, and autoplay timer
 */
export function useCarousel(itemsCount, autoPlayInterval = 4000) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const next = useCallback(() => {
    if (itemsCount <= 1) return
    setCurrentIndex((prev) => (prev + 1) % itemsCount)
  }, [itemsCount])

  const prev = useCallback(() => {
    if (itemsCount <= 1) return
    setCurrentIndex((prev) => (prev - 1 + itemsCount) % itemsCount)
  }, [itemsCount])

  const goTo = useCallback(
    (index) => {
      if (index >= 0 && index < itemsCount) {
        setCurrentIndex(index)
      }
    },
    [itemsCount]
  )

  const togglePlay = useCallback(() => setIsPlaying((prev) => !prev), [])

  useEffect(() => {
    if (!isPlaying || isHovered || isLightboxOpen || itemsCount <= 1) return

    const timer = setInterval(() => {
      next()
    }, autoPlayInterval)

    return () => clearInterval(timer)
  }, [isPlaying, isHovered, isLightboxOpen, itemsCount, autoPlayInterval, next])

  return {
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
  }
}
