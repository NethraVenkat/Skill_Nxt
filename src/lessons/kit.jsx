import gsap from 'gsap'
import { useLayoutEffect, useRef, useState } from 'react'

/**
 * Small building blocks the lesson games share. They animate data as physical things: tokens move
 * to where they go, wrong answers shake, right answers snap and settle.
 */

/** Python-ish highlighting for short snippets: keys gold, strings green, numbers coral. */
export function Code({ children, hl }) {
  const src = String(children).replace(/\n$/, '')
  const parts = src.split(/("[^"]*"|\b\d+\b|#.*$)/gm)
  return (
    <pre className="code">
      <code>
        {parts.map((p, i) => {
          let cls
          if (p.startsWith('"')) cls = 's'
          else if (/^\d+$/.test(p)) cls = 'n'
          else if (p.startsWith('#')) cls = 'c'
          const node = cls ? (
            <span key={i} className={cls}>
              {p}
            </span>
          ) : (
            p
          )
          return hl && p === hl ? (
            <mark key={i} className="hl">
              {node}
            </mark>
          ) : (
            node
          )
        })}
      </code>
    </pre>
  )
}

/** A value as a physical token you can pick up. */
export function Token({ children, kind = 'value', picked, placed, onClick, ...rest }) {
  return (
    <button
      type="button"
      className="tok"
      data-kind={kind}
      data-picked={picked || undefined}
      data-placed={placed || undefined}
      aria-pressed={picked}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}

/** Shake an element: the physical "no". */
export function shake(el) {
  if (!el) return
  gsap.fromTo(el, { x: 0 }, { keyframes: { x: [-10, 9, -6, 4, 0] }, duration: 0.45, ease: 'none' })
}

/** Pop an element in: the physical "yes". */
export function pop(el) {
  if (!el) return
  gsap.fromTo(el, { scale: 0.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out(2.4)' })
}

/**
 * Fly a value from one element to another (a ghost copy travels on a curve), then call done.
 * This is how data "moves" in the lessons.
 */
export function fly(fromEl, toEl, label, done) {
  if (!fromEl || !toEl || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return done?.()
  const a = fromEl.getBoundingClientRect()
  const b = toEl.getBoundingClientRect()
  const ghost = document.createElement('span')
  ghost.className = 'tok tok--ghost'
  ghost.textContent = label
  document.body.appendChild(ghost)
  gsap.set(ghost, { position: 'fixed', left: a.left, top: a.top, zIndex: 70, margin: 0 })
  const dx = b.left + b.width / 2 - (a.left + a.width / 2)
  const dy = b.top + b.height / 2 - (a.top + a.height / 2)
  gsap.to(ghost, {
    keyframes: { x: [0, dx * 0.5, dx], y: [0, Math.min(dy, 0) - 80, dy], rotate: [0, -8, 0], scale: [1, 1.15, 0.9] },
    duration: 0.75,
    ease: 'power2.inOut',
    onComplete: () => {
      ghost.remove()
      done?.()
    },
  })
}

/** A multiple-choice check with clear right/wrong feedback and an explanation. */
export function Check({ q, options, answer, why, onRight }) {
  const [pick, setPick] = useState(null)
  const refs = useRef([])
  const choose = (i) => {
    setPick(i)
    if (i === answer) onRight?.()
    else shake(refs.current[i])
  }
  return (
    <div className="check">
      <p className="check__q">{q}</p>
      <div className="check__opts">
        {options.map((o, i) => (
          <button
            key={o}
            ref={(el) => (refs.current[i] = el)}
            type="button"
            className="check__opt"
            data-state={pick === i ? (i === answer ? 'right' : 'wrong') : undefined}
            onClick={() => choose(i)}
          >
            <code>{o}</code>
          </button>
        ))}
      </div>
      {pick !== null && (
        <p className="check__why" data-ok={pick === answer || undefined} role="status">
          {pick === answer ? `Correct! ${why}` : 'Not quite. Look again and try another answer.'}
        </p>
      )}
    </div>
  )
}

/** Reveal the children with a soft rise the first time they mount. */
export function Rise({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = gsap.fromTo(ref.current, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, delay, ease: 'power3.out' })
    return () => t.revert()
  }, [delay])
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
