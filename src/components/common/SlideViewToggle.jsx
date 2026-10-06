import React from 'react'

/**
 * SRP: Mobile segmented view switcher component (visible only on < lg screens)
 * Allows presenters and viewers on mobile devices to toggle seamlessly between
 * informative profile/code cards and the interactive image gallery.
 */
export default function SlideViewToggle({
  activeTab = 'info',
  onTabChange,
  infoLabel = 'Información',
  galleryLabel = 'Galería',
  photoCount = null,
  accentColor = '#38bdf8',
}) {
  return (
    <div className="lg:hidden w-full flex items-center justify-center mb-2 shrink-0 select-none">
      <div className="inline-flex p-1 rounded-xl bg-slate-900/90 border border-white/10 shadow-lg backdrop-blur-md">
        <button
          type="button"
          onClick={() => onTabChange('info')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            activeTab === 'info'
              ? 'bg-white/15 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          style={{
            borderBottom: activeTab === 'info' ? `2px solid ${accentColor}` : '2px solid transparent',
          }}
        >
          <span>💻</span>
          <span className="font-mono text-[11px] sm:text-xs">{infoLabel}</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('gallery')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            activeTab === 'gallery'
              ? 'bg-white/15 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          style={{
            borderBottom: activeTab === 'gallery' ? `2px solid ${accentColor}` : '2px solid transparent',
          }}
        >
          <span>📸</span>
          <span className="font-mono text-[11px] sm:text-xs">{galleryLabel}</span>
          {photoCount !== null && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-white/10 text-slate-300">
              {photoCount}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}

