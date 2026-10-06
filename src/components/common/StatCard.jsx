import React from 'react'

/**
 * SRP & ISP: Reusable Developer Stat/Metric Card component
 */
export default function StatCard({
  label,
  value,
  subtext,
  icon,
  onClick,
  className = '',
}) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col gap-1 p-3.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/10 rounded-xl transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:scale-[1.02] hover:border-cyan-500/30' : ''
      } ${className}`}
    >
      <div className="flex items-center justify-between text-slate-400 text-xs">
        <span className="uppercase tracking-wider font-medium text-[11px] text-slate-500">
          {label}
        </span>
        {icon && <span className="text-base">{icon}</span>}
      </div>

      <div className="text-sm sm:text-base font-semibold font-mono text-slate-100">
        {value}
      </div>

      {subtext && (
        <span className="text-[11px] text-slate-400">
          {subtext}
        </span>
      )}
    </div>
  )
}
