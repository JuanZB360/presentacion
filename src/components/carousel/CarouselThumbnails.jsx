import React, { useRef, useEffect } from 'react'

/**
 * SRP & ISP: Component solely responsible for rendering the horizontal preview thumbnail strip
 * Uses container.scrollTo instead of scrollIntoView to prevent shifting the parent webpage/viewport.
 */
export default function CarouselThumbnails({
  images,
  currentIndex,
  accentColor = '#38bdf8',
  onSelect,
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      const activeChild = containerRef.current.firstElementChild?.children[currentIndex]
      if (activeChild) {
        const container = containerRef.current
        const childLeft = activeChild.offsetLeft
        const childWidth = activeChild.offsetWidth
        const containerWidth = container.clientWidth
        const targetScrollLeft = childLeft - containerWidth / 2 + childWidth / 2

        container.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: 'smooth',
        })
      }
    }
  }, [currentIndex])

  if (!images || images.length <= 1) return null

  return (
    <div
      ref={containerRef}
      className="h-10 sm:h-12 w-full overflow-x-auto overflow-y-hidden pb-0.5 scrollbar-thin select-none"
    >
      <div className="flex gap-1.5 h-full items-center">
        {images.map((img, idx) => {
          const isActive = idx === currentIndex
          return (
            <button
              key={img.url + idx}
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onSelect(idx)
              }}
              className={`relative h-full aspect-[4/3] shrink-0 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                isActive
                  ? 'scale-105 opacity-100 shadow-md'
                  : 'opacity-40 hover:opacity-80 border-transparent'
              }`}
              style={{
                borderColor: isActive ? accentColor : 'transparent',
              }}
              title={img.caption || `Foto ${idx + 1}`}
            >
              <img
                src={img.url}
                alt={`miniatura ${idx + 1}`}
                className="w-full h-full object-cover select-none"
                loading="lazy"
              />
              {isActive && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 shadow-[0_0_8px_currentColor]"
                  style={{ backgroundColor: accentColor, color: accentColor }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
