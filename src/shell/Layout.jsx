import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { slides } from "../data/content";
import { rankOf, stampsOf, useStore } from "../state/store";
import "./layout.css";

/**
 * The post office around every page: the navigation, and an envelope that opens whenever you
 * change page — every page arrives like a new letter.
 */
export function Layout() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(null);
  const flap = useRef(null);
  const main = useRef(null);
  const st = useStore();
  const rank = rankOf(st);
  const stamps = stampsOf(st).length;

  useLayoutEffect(() => {
    setOpen(null);
    window.scrollTo(0, 0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pieces = main.current?.querySelectorAll("[data-enter]") ?? [];
    const stamp = flap.current.firstChild;
    const tl = gsap.timeline();
    tl.set(flap.current, { yPercent: 0, autoAlpha: 1 })
      .fromTo(stamp, { scale: 1.4, rotate: -20, autoAlpha: 0 }, { scale: 1, rotate: -6, autoAlpha: 1, duration: 0.35, ease: "back.out(2)" })
      .to(flap.current, { yPercent: -102, duration: 0.85, ease: "power3.inOut" }, 0.45)
      .fromTo(
        pieces,
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.07, duration: 0.6, ease: "power3.out" },
        0.75,
      )
      .set(flap.current, { autoAlpha: 0 });
    return () => tl.revert();
  }, [pathname]);

  const menu = (id, label, items, base) => (
    <div className="nav__menu" onMouseLeave={() => setOpen(null)}>
      <button
        type="button"
        aria-expanded={open === id}
        className={pathname.startsWith(base) ? "active" : ""}
        onClick={() => setOpen(open === id ? null : id)}
        onMouseEnter={() => setOpen(id)}
      >
        {label} <span aria-hidden="true">▾</span>
      </button>
      {open === id && (
        <ul className="drop">
          {items.map(([to, text]) => (
            <li key={to}>
              <NavLink to={`${base}/${to}`}>{text}</NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="app">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="nav">
        <Link to="/" className="nav__brand" aria-label="Echo's Talking Post home">
          <span aria-hidden="true">📮</span> Echo’s Talking Post
        </Link>
        <nav className="nav__links" aria-label="Main">
          <NavLink to="/" end>
            Post Office
          </NavLink>
          {menu(
            "lesson",
            "Lesson",
            slides.map((s) => [s.slug, `${s.n}. ${s.title}`]),
            "/lesson",
          )}
          <NavLink to="/mailbag">My Mailbag</NavLink>
          <NavLink to="/ride-along">Ride-Along</NavLink>
          <NavLink to="/bumpy-roads">Bumpy Roads</NavLink>
          <NavLink to="/passport">Passport</NavLink>
          <NavLink to="/relay">Class Relay</NavLink>
        </nav>
        <div className="nav__end">
          <Link to="/passport" className="nav__glow" title={`${rank.name} · ${stamps} of 7 passport stamps`}>
            {rank.icon} <b>{stamps}/7</b>
          </Link>
          <NavLink to="/teacher" className="nav__role">
            👩‍🏫 Teacher
          </NavLink>
          <NavLink to="/family" className="nav__role">
            👨‍👩‍👧 Family
          </NavLink>
        </div>
      </header>
      <main id="main" ref={main}>
        <Outlet />
      </main>
      {st.toast && (
        <div className="toast" key={st.toast.k} role="status">
          {st.toast.text}
        </div>
      )}
      <div className="flap" ref={flap} aria-hidden="true">
        <span className="flap__stamp">📮</span>
      </div>
    </div>
  );
}
