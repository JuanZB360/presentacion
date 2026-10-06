import React from 'react'

const COLOR_VARIANTS = {
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  rose: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  purple: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
  neutral: 'bg-white/5 text-slate-300 border-white/10',
}

/**
 * SRP & OCP: Atomic Badge component with multiple color variants and extension through children
 */
export default function Badge({
  children,
  variant = 'cyan',
  hasDot = false,
  className = '',
  onClick,
}) {
  const colorClass = COLOR_VARIANTS[variant] || COLOR_VARIANTS.cyan

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium border backdrop-blur-sm transition-all ${colorClass} ${
        onClick ? 'cursor-pointer hover:brightness-125' : ''
      } ${className}`}
    >
      {hasDot && (
        <span
          className={`w-1.5 h-1.5 rounded-full animate-pulse ${
            variant === 'emerald'
              ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
              : 'bg-cyan-400 shadow-[0_0_8px_#38bdf8]'
          }`}
        />
      )}
      {children}
    </span>
  )
}
