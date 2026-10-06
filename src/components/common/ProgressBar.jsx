import React from 'react'

/**
 * SRP & ISP: Simple, reusable horizontal progress bar with animation
 */
export default function ProgressBar({
  percentage = 0,
  accentColor = '#38bdf8',
  height = 'h-1',
  className = '',
}) {
  return (
    <div className={`w-full bg-white/5 overflow-hidden ${height} ${className}`}>
      <div
        className="h-full transition-all duration-300 ease-out"
        style={{
          width: `${Math.min(Math.max(percentage, 0), 100)}%`,
          backgroundColor: accentColor,
          boxShadow: `0 0 10px ${accentColor}`,
        }}
      />
    </div>
  )
}
