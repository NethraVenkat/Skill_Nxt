import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { labs, lessons } from '../data/lessons'
import { useProgress } from '../state/progress'
import { PaperBird } from '../world/PaperBird'
import './layout.css'

gsap.registerPlugin(ScrollTrigger)
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * The frame of the whole film: the navigation, buttery smooth scrolling (Lenis driving GSAP's
 * ticker), and the "flight" between pages. Changing page never cuts: a sky curtain sweeps across
 * with the paper bird, and the new page's pieces settle in one after another. Anything marked
 * [data-reveal] rises into place as it scrolls into view.
 */
export function Layout() {
  const { pathname } = useLocation()
  const curtain = useRef(null)
  const bird = useRef(null)
  const main = useRef(null)
  const lenis = useRef(null)
  const [menu, setMenu] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('datacity:theme') || 'day')
  const { done } = useProgress()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('datacity:theme', theme)
  }, [theme])

  // smooth scrolling
  useEffect(() => {
    if (reduced()) return
    const l = new Lenis({ lerp: 0.085, smoothWheel: true })
    lenis.current = l
    l.on('scroll', ScrollTrigger.update)
    const raf = (t) => l.raf(t * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      l.destroy()
    }
  }, [])

  // the flight between pages
  useLayoutEffect(() => {
    setMenu(false)
    if (lenis.current) lenis.current.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
    const pieces = main.current?.querySelectorAll('[data-enter]') ?? []
    if (reduced()) {
      gsap.set(curtain.current, { autoAlpha: 0 })
      return
    }
    const tl = gsap.timeline()
    tl.set(curtain.current, { autoAlpha: 1, xPercent: 0 })
      .fromTo(
        bird.current,
        { x: '-15vw', y: '60vh', rotate: -18, scale: 0.8 },
        { x: '110vw', y: '12vh', rotate: -6, scale: 1.25, duration: 1.25, ease: 'power2.inOut' },
        0,
      )
      .to(curtain.current, { xPercent: -105, duration: 1.0, ease: 'power3.inOut' }, 0.15)
      .fromTo(pieces, { y: 46, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.09, ease: 'power3.out' }, 0.55)
      .set(curtain.current, { autoAlpha: 0 })
    // scroll reveals
    const triggers = [...(main.current?.querySelectorAll('[data-reveal]') ?? [])].map((el) =>
      gsap.fromTo(el, { y: 60, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 1,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      }),
    )
    ScrollTrigger.refresh()
    return () => {
      // revert, not kill: a half-played entrance must not leave anything hidden
      tl.revert()
      triggers.forEach((t) => {
        t.scrollTrigger?.kill()
        t.revert()
      })
    }
  }, [pathname])

  const lessonsActive = pathname.startsWith('/lessons')
  return (
    <div className="app">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="nav">
        <Link to="/" className="nav__brand" aria-label="DATA CITY home">
          <span className="nav__logo" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="30" height="30">
              <path d="M16 2 L29 9 L16 16 L3 9 Z" fill="#ffc857" />
              <path d="M3 9 L16 16 V30 L3 23 Z" fill="#2f6fe0" />
              <path d="M29 9 L16 16 V30 L29 23 Z" fill="#14213d" />
            </svg>
          </span>
          DATA CITY
        </Link>
        <nav className="nav__links" aria-label="Main">
          <NavLink to="/" end>
            Home
          </NavLink>
          <div className="nav__menu" onMouseLeave={() => setMenu(false)}>
            <button
              type="button"
              className={lessonsActive ? 'active' : ''}
              aria-expanded={menu}
              onClick={() => setMenu((m) => !m)}
              onMouseEnter={() => setMenu(true)}
            >
              Lessons <span aria-hidden="true">▾</span>
            </button>
            {menu && (
              <div className="mega">
                <ol>
                  {lessons.map((l, i) => (
                    <li key={l.slug}>
                      <NavLink to={`/lessons/${l.slug}`}>
                        <span className="mega__n">{String(i + 1).padStart(2, '0')}</span>
                        <span>
                          <b>{l.title}</b>
                          <small>{l.chapter}</small>
                        </span>
                        {done.includes(l.slug) && (
                          <span className="mega__done" aria-label="completed">
                            ✓
                          </span>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ol>
                <Link to="/lessons" className="mega__all">
                  See the whole journey →
                </Link>
              </div>
            )}
          </div>
          <NavLink to="/lab">Real-World Lab</NavLink>
          <NavLink to="/playground">Playground</NavLink>
          <NavLink to="/journey">My Journey</NavLink>
        </nav>
        <button
          type="button"
          className="nav__theme"
          onClick={() => setTheme((t) => (t === 'day' ? 'night' : 'day'))}
          aria-label={theme === 'day' ? 'Switch to night' : 'Switch to day'}
        >
          {theme === 'day' ? '☀︎' : '☾'}
        </button>
        <span className="sr-only">
          {labs.length} labs, {lessons.length} lessons
        </span>
      </header>
      <main id="main" ref={main}>
        <Outlet />
      </main>
      <div className="curtain" ref={curtain} aria-hidden="true">
        <div className="curtain__clouds" />
      </div>
      <PaperBird ref={bird} size={72} className="bird--flight" />
    </div>
  )
}
