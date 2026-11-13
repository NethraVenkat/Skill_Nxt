import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Compass, Flag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLesson } from "../state/LessonProvider";
import { sound } from "../components/Audio";
export default function Home() {
  const { state } = useLesson(),
    navigate = useNavigate();
  const root = useRef(null),
    flight = useRef(null),
    raf = useRef(null);
  const [entering, setEntering] = useState(false),
    [skipped, setSkipped] = useState(false);
  useEffect(
    () => () => {
      clearTimeout(flight.current);
      cancelAnimationFrame(raf.current);
    },
    [],
  );
  const still = () =>
    state.reducedMotion ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function move(e) {
    if (still() || !window.matchMedia("(pointer:fine)").matches) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2,
      y = (e.clientY / window.innerHeight - 0.5) * 2;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      root.current?.style.setProperty("--depth-x", `${x}`);
      root.current?.style.setProperty("--depth-y", `${y}`);
    });
  }
  function enter(e) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (entering) return;
    setSkipped(true);
    sound("flag", state.audioEnabled);
    if (still()) {
      navigate("/scene/1");
      return;
    }
    setEntering(true);
    flight.current = setTimeout(() => navigate("/scene/1"), 1050);
  }
  return (
    <main
      ref={root}
      onPointerMove={move}
      onPointerLeave={() => {
        root.current?.style.setProperty("--depth-x", "0");
        root.current?.style.setProperty("--depth-y", "0");
      }}
      onPointerDown={() => setSkipped(true)}
      id="main"
      className={`cinematic-home ${entering ? "entering-atlas" : ""} ${skipped ? "intro-skipped" : ""}`}
    >
      <div className="home-environment" aria-hidden="true">
        <img
          className="observatory-plate"
          src="/art/observatory.webp"
          alt=""
          fetchPriority="high"
        />
        <div className="city-light-layer" />
        <div className="globe-light-layer" />
        <svg
          className="home-route-layer"
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
        >
          <path d="M835 484 Q1100 130 1335 405 Q1230 650 954 480" />
        </svg>
        <div className="home-cinema-shade" />
        <div className="home-foreground-reflection" />
      </div>
      <div className="home-scene-topline">
        <span className="eyebrow">
          <Compass size={15} /> THE VENTURE OBSERVATORY
        </span>
        <span className="eyebrow">EXPEDITION 001 / GRADE 6</span>
      </div>
      <div className="home-composition">
        <div className="home-command">
          <span className="home-chapter-label">
            <i /> SMALL-SCALE CONCEPT GENERATION
          </span>
          <h1>
            <span>Nova’s</span>
            <strong>Venture</strong>
            <em>Atlas.</em>
          </h1>
          <p className="home-invitation">
            Find a problem.
            <br />
            Shape an idea. <span>Plant your flag.</span>
          </p>
          <Link onClick={enter} className="primary enter-atlas" to="/scene/1">
            <span className="control-indicator" />
            Enter the Venture Atlas <ArrowUpRight size={23} />
          </Link>
          {state.currentScene > 0 && (
            <Link className="resume-link" to={`/scene/${state.currentScene}`}>
              Continue expedition · Scene{" "}
              {String(state.currentScene).padStart(2, "0")}
            </Link>
          )}
          <p className="home-lesson-meta">
            MODULE 02 · CLASS 01 <span>31 MINUTES</span>
          </p>
        </div>
        <div className="home-world-stage">
          <div className="home-flag-field" aria-hidden="true">
            {state.globeFlags.map((f, i) => (
              <Flag
                key={f.id}
                className="world-pin"
                size={22}
                fill="currentColor"
                style={{
                  left: `${25 + ((i * 19) % 55)}%`,
                  top: `${10 + ((i * 17) % 48)}%`,
                }}
              />
            ))}
          </div>
          <div className="home-character">
            <img
              src="/art/nova.webp"
              alt="Nova, your adventurous guide, holding a field journal"
              fetchPriority="high"
            />
          </div>
          <div className="home-guide-line">
            <span className="eyebrow">NOVA / YOUR EXPEDITION GUIDE</span>
            <p>
              “Every great venture starts
              <br />
              with someone who notices.”
            </p>
          </div>
        </div>
      </div>
      <nav className="floor-route" aria-label="Your learning journey">
        {[
          ["Observe", "Find the friction"],
          ["Test", "Challenge the idea"],
          ["Build", "Give it a shape"],
          ["Pitch", "Make your case"],
        ].map(([title, desc], i) => (
          <div key={title} style={{ "--station": i }}>
            <span className="floor-route-number">0{i + 1}</span>
            <div>
              <strong>{title}</strong>
              <span>{desc}</span>
            </div>
            <i />
          </div>
        ))}
      </nav>
      <div className="enter-route-wipe" aria-hidden="true" />
    </main>
  );
}
