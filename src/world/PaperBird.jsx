import { forwardRef } from 'react'

/**
 * The guide: a folded paper bird. It never speaks; it leads the eye and carries data from place
 * to place. Its wings flap with CSS; where it flies is decided by the page (GSAP).
 */
export const PaperBird = forwardRef(function PaperBird({ size = 64, className = '', carrying }, ref) {
  return (
    <div ref={ref} className={`bird ${className}`} style={{ '--s': `${size}px` }} aria-hidden="true">
      <svg viewBox="0 0 64 48" width={size} height={size * 0.75}>
        <path className="bird__wing bird__wing--back" d="M30 24 L8 4 L36 18 Z" fill="#cfe0f5" />
        <path d="M2 26 L62 20 L34 34 Z" fill="#ffffff" />
        <path d="M34 34 L62 20 L40 40 Z" fill="#dbe7f7" />
        <path className="bird__wing" d="M30 24 L20 2 L44 20 Z" fill="#f4f8ff" />
        <path d="M2 26 L62 20" stroke="#9fb6d8" strokeWidth="1" />
      </svg>
      {carrying && <span className="bird__cargo">{carrying}</span>}
    </div>
  )
})
