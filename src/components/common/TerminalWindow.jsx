import React from 'react'

/**
 * SRP & OCP: Reusable macOS/Linux terminal window frame styled with Tailwind glassmorphism.
 * Configured with min-h-0 and internal overflow-y-auto to allow content scrolling inside the card
 * while guaranteeing the outer page never scrolls.
 */
export default function TerminalWindow({
  title = 'terminal@bash:~$',
  lang = 'bash',
  children,
  className = '',
  accentBorder = null,
}) {
  return (
    <div
      className={`flex flex-col flex-1 min-h-0 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
        accentBorder ? `border-${accentBorder}/30` : ''
      } ${className}`}
    >
      {/* Terminal Titlebar */}
      <div className="h-10 shrink-0 bg-slate-950/60 border-b border-white/5 px-4 flex items-center justify-between gap-3 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90 inline-block shadow-sm" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90 inline-block shadow-sm" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 inline-block shadow-sm" />
        </div>

        <span className="text-xs font-mono text-slate-400 truncate tracking-wide">
          {title}
        </span>

        <span className="text-[11px] font-mono text-cyan-400/80 uppercase">
          {lang}
        </span>
      </div>

      {/* Terminal Content Body - Internal scrolling only with overscroll-contain */}
      <div className="p-5 sm:p-6 flex flex-col gap-4 flex-1 min-h-0 overflow-y-auto overscroll-contain">
        {children}
      </div>
    </div>
  )
}
