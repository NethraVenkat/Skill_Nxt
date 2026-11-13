import { useEffect, useRef } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Volume2,
  VolumeX,
  Settings2,
  Flag,
  Compass,
  RotateCcw,
  Check,
  X,
} from "lucide-react";
import { useLesson } from "../state/LessonProvider";
import { scenes } from "../data/lessonContent";
import Nova from "../components/Nova";
import { sound } from "../components/Audio";
import Home from "../scenes/Home";
import { Scene01, Scene02, Scene04, Scene05 } from "../scenes/OpeningScenes";
import FilterGates from "../scenes/FilterGates";
import ProblemStorm from "../scenes/ProblemStorm";
import BuildLive from "../scenes/BuildLive";
import ConceptWars from "../scenes/ConceptWars";
import ConceptList from "../scenes/ConceptList";
import Finale from "../scenes/Finale";
import VentureHQ from "../scenes/VentureHQ";
import { LabPage, MissionPage, PassportPage } from "../scenes/MvpSurfaces";
const contents = [
  Scene01,
  Scene02,
  () => <FilterGates />,
  Scene04,
  Scene05,
  ProblemStorm,
  () => <FilterGates challenge />,
  BuildLive,
  ConceptWars,
  ConceptList,
  Finale,
];
function Scene({ number }) {
  const { state } = useLesson();
  const pose =
    number === 9 && state.strongerConcept
      ? "winner"
      : number === 11 && state.auctionOpen
        ? "goodbye"
        : number === 8 && state.liveBuilt
          ? "impressed"
          : null;
  const item = scenes[number - 1],
    Content = contents[number - 1];
  return (
    <main id="main" className={`lesson-scene scene-${number} scene-enter`}>
      <div className="scene-heading">
        <span className="eyebrow">
          <span className="copper">{String(number).padStart(2, "0")} / 11</span>
          <span className="heading-line" />
          {item.zone}
        </span>
        <span className="eyebrow lesson-time">
          {item.minutes} MIN · {item.short}
        </span>
      </div>
      <h1 className="sr-only" tabIndex="-1">
        {item.title}
      </h1>
      <Content />
      <Nova compact pose={pose || item.pose} quote={item.quote} />
    </main>
  );
}
export default function App() {
  const { state, set, dispatch, saved } = useLesson();
  const location = useLocation();
  const navigate = useNavigate();
  const match = location.pathname.match(/^\/scene\/(\d+)\/?$/);
  const scene =
    match && Number(match[1]) >= 1 && Number(match[1]) <= 11
      ? Number(match[1])
      : 0;
  const dialog = useRef(null);
  const teacherRef = useRef(null);
  useEffect(() => {
    dispatch({ type: "PAUSE_ALL" });
    if (scene) set("currentScene", scene);
    window.scrollTo(0, 0);
    document.querySelector("main h1")?.focus({ preventScroll: true });
    document.title = `${scene ? scenes[scene - 1].title : "Nova’s Venture Atlas"} · VentureCraft`;
  }, [location.pathname, scene, dispatch, set]);
  function next() {
    if (scene) {
      set("completedScenes", (p) => (p.includes(scene) ? p : [...p, scene]));
    }
    navigate(scene === 11 ? "/" : `/scene/${scene + 1}`);
    sound("click", state.audioEnabled);
  }
  function reset() {
    dispatch({ type: "RESET" });
    dialog.current.close();
    navigate("/");
  }
  return (
    <div
      className={`atlas-app ${state.reducedMotion ? "reduce-motion" : ""} ${scene === 0 ? "home-view" : `room-${scene}`}`}
    >
      <a className="skip-link" href="#main">
        Skip to lesson
      </a>
      {scene > 0 && (
        <div className="room-environment" aria-hidden="true">
          <img
            src={`/art/${{ 1: "observatory", 2: "studio", 3: "validation", 4: "laboratory", 5: "laboratory", 6: "laboratory", 7: "validation", 8: "laboratory", 9: "arena", 10: "studio", 11: "observatory" }[scene]}.webp`}
            alt=""
          />
          <div className="room-scrim" />
        </div>
      )}
      <header className="site-header">
        <Link className="brand" to="/" aria-label="VentureCraft home">
          <span className="brand-mark">
            <Compass size={28} />
          </span>
          <span>
            VENTURE<span className="copper">CRAFT</span>
            <small>NOVA’S VENTURE ATLAS</small>
          </span>
        </Link>
        <div className="header-center">AN EXPEDITION IN POSSIBILITIES</div>
        <div className="header-actions">
          <span className="flag-count">
            <Flag size={15} />
            {String(state.globeFlags.length).padStart(2, "0")}{" "}
            <span>FLAGS</span>
          </span>
          <button
            className="icon-button"
            onClick={() => {
              set("audioEnabled", !state.audioEnabled);
              sound("click", !state.audioEnabled);
            }}
            aria-label={state.audioEnabled ? "Turn sound off" : "Turn sound on"}
            title={state.audioEnabled ? "Sound on" : "Sound off"}
          >
            {state.audioEnabled ? <Volume2 size={19} /> : <VolumeX size={19} />}
          </button>
          <button
            className="teacher-toggle"
            aria-label="Teacher controls"
            ref={teacherRef}
            aria-expanded={state.teacherControls}
            onClick={() => set("teacherControls", !state.teacherControls)}
          >
            <Settings2 size={18} />
            <span>Teacher controls</span>
          </button>
        </div>
      </header>
      {state.teacherControls && (
        <section className="teacher-panel" aria-label="Teacher controls">
          <div>
            <span className="eyebrow copper">CLASSROOM CONTROLS</span>
            <button
              aria-label="Close teacher controls"
              className="icon-button"
              onClick={() => {
                set("teacherControls", false);
                teacherRef.current?.focus();
              }}
            >
              <X size={18} />
            </button>
          </div>
          <label>
            Jump to scene
            <select
              value={scene}
              onChange={(e) =>
                navigate(
                  Number(e.target.value) ? `/scene/${e.target.value}` : "/",
                )
              }
            >
              <option value={0}>Home · The observatory</option>
              {scenes.map((s, i) => (
                <option key={s.title} value={i + 1}>
                  {String(i + 1).padStart(2, "0")} · {s.title}
                </option>
              ))}
            </select>
          </label>
          <label className="motion-toggle">
            <input
              type="checkbox"
              checked={state.reducedMotion}
              onChange={(e) => set("reducedMotion", e.target.checked)}
            />{" "}
            Reduce motion
          </label>
          <p>
            {scene
              ? scenes[scene - 1].teacher
              : "Teacher-led lesson. Students can work on paper while you capture class consensus here."}
          </p>
          <p className="muted">
            Timers pause when leaving a scene or reloading. All lesson work
            stays on this browser.
          </p>
          <button onClick={() => dialog.current.showModal()}>
            <RotateCcw size={16} /> Reset lesson
          </button>
        </section>
      )}
      <div className="route-transit" key={location.pathname} aria-hidden="true">
        <div />
        <span>
          VENTURE ATLAS · {scene ? scenes[scene - 1].zone : "THE OBSERVATORY"}
        </span>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hq" element={<VentureHQ />} />
        <Route path="/mission/1" element={<MissionPage />} />
        <Route path="/lab/persona" element={<LabPage />} />
        <Route path="/lab/pricing" element={<LabPage type="pricing" />} />
        <Route path="/passport" element={<PassportPage />} />
        {scenes.map((s, i) => (
          <Route
            key={s.title}
            path={`/scene/${i + 1}`}
            element={<Scene key={i} number={i + 1} />}
          />
        ))}
        <Route
          path="*"
          element={
            <main id="main" className="not-found">
              <h1>This location isn’t on the map.</h1>
              <Link className="primary" to="/">
                Return to the observatory
              </Link>
            </main>
          }
        />
      </Routes>
      {scene > 0 ? (
        <footer className="lesson-nav">
          <button
            onClick={() => navigate(scene === 1 ? "/" : `/scene/${scene - 1}`)}
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
          <nav aria-label="Lesson progress">
            {scenes.map((s, i) => (
              <Link
                key={s.title}
                to={`/scene/${i + 1}`}
                className={`${scene === i + 1 ? "current" : ""} ${state.completedScenes.includes(i + 1) ? "complete" : ""}`}
                aria-current={scene === i + 1 ? "step" : undefined}
                aria-label={`Scene ${i + 1}: ${s.title}`}
                title={s.title}
              >
                {state.completedScenes.includes(i + 1) && scene !== i + 1 ? (
                  <Check size={12} />
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </Link>
            ))}
          </nav>
          <button className="next-button" onClick={next}>
            {scene === 11 ? "Return home" : "Next scene"}
            <ArrowRight size={18} />
          </button>
        </footer>
      ) : (
        <footer className="home-footer">
          <span>OBSERVE THE ORDINARY. BUILD THE EXTRAORDINARY.</span>
          <span>GRADE 6 / SIMPLE BUSINESS IDEAS</span>
        </footer>
      )}
      <div className="save-warning" role="status">
        {!saved
          ? "Browser storage is unavailable. Keep this tab open and download your concept list."
          : ""}
      </div>
      <dialog ref={dialog} className="reset-dialog">
        <h2>Start a fresh expedition?</h2>
        <p>
          This clears all saved problems, concepts, votes, flags and timers on
          this browser. Download your concept list first if you need it.
        </p>
        <div>
          <button autoFocus onClick={() => dialog.current.close()}>
            Keep my lesson
          </button>
          <button className="danger-button" onClick={reset}>
            Reset lesson
          </button>
        </div>
      </dialog>
    </div>
  );
}
