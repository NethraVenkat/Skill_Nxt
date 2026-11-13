import {
  Check,
  ArrowRight,
  RotateCcw,
  Flag,
  LockKeyhole,
  Plus,
} from "lucide-react";
import { useLesson } from "../state/LessonProvider";
import { mission, filters, penstop } from "../data/lessonContent";
import { sound } from "../components/Audio";
import Globe from "../components/Globe";
export function Scene01() {
  return (
    <div className="opening-world">
      <div className="statement">
        <span className="eyebrow copper">EVERY VENTURE HAS A BEGINNING</span>
        <h2>
          One idea.
          <br />
          <em>Anywhere.</em>
        </h2>
        <p>Every business you see started as one idea in someone’s head.</p>
        <p className="muted">
          The next one could be yours. Reserve your place on the map.
        </p>
      </div>
      <Globe interactive />
    </div>
  );
}
export function Scene02() {
  const { state, set } = useLesson();
  return (
    <div className="mission-room">
      <div className="scene-intro">
        <h2>
          Your mission,
          <br />
          <em>should you accept it.</em>
        </h2>
        <p>By the end: three business concepts with your name on them.</p>
      </div>
      <div className="mission-route">
        {mission.map((text, i) => {
          const done = state.missionProgress.includes(i);
          return (
            <button
              key={text}
              className={`mission-station ${done ? "active" : ""}`}
              onClick={() =>
                set("missionProgress", (p) => (p.includes(i) ? p : [...p, i]))
              }
            >
              <span className="station-number">
                {done ? <Check /> : `0${i + 1}`}
              </span>
              <strong>{text}</strong>
              <span>{done ? "STATION ACTIVATED" : "ACTIVATE STATION"}</span>
            </button>
          );
        })}
      </div>
      <div
        className={`auction-signal ${state.missionProgress.length === 4 ? "visible" : ""}`}
        aria-live="polite"
      >
        <LockKeyhole size={20} /> AUCTION HALL SIGNAL DETECTED{" "}
        <span>Unlocks after your expedition</span>
      </div>
    </div>
  );
}
export function Scene04() {
  const { state, set } = useLesson();
  return (
    <div className="problem-first">
      <div className="scene-intro">
        <span className="eyebrow copper">THE OBSERVER’S ADVANTAGE</span>
        <h2>
          Before the idea,
          <br />
          <em>find the problem.</em>
        </h2>
      </div>
      <div className={`rewind-machine ${state.rewound ? "rewound" : ""}`}>
        <span className="eyebrow">
          {state.rewound ? "PROBLEM-FIRST THINKING" : "IDEA-FIRST THINKING"}
        </span>
        <blockquote key={String(state.rewound)}>
          {state.rewound
            ? "“Students forget pens — what if there was a borrow system?”"
            : "“I want to sell stationery.”"}
        </blockquote>
        <button
          className="primary"
          onClick={() => set("rewound", !state.rewound)}
        >
          <RotateCcw size={18} />
          {state.rewound
            ? "Replay the transformation"
            : "Rewind to the problem"}
        </button>
      </div>
      <div className="formula">
        {[
          "WHO has the problem?",
          "WHAT is the issue?",
          "HOW could we solve it?",
        ].map((t, i) => (
          <div key={t}>
            <strong>{t.split(" ")[0]}</strong>
            <span>{t.slice(t.indexOf(" ") + 1)}</span>
            {i < 2 && <ArrowRight aria-hidden="true" />}
          </div>
        ))}
      </div>
      <div className="seed-board">
        <span className="eyebrow">TWO PROBLEMS FROM YOUR CLASS</span>
        {state.seeds.map((s, i) => (
          <label key={i}>
            Observation {i + 1}
            <input
              value={s}
              maxLength={160}
              placeholder={
                i ? "e.g. Heavy school bags" : "e.g. Long canteen queues"
              }
              onChange={(e) =>
                set("seeds", (p) =>
                  p.map((v, j) => (i === j ? e.target.value : v)),
                )
              }
            />
          </label>
        ))}
      </div>
    </div>
  );
}
export function Scene05() {
  const { state, set, flag } = useLesson();
  const all = state.penModules.length === 3;
  const checked = state.penFilters.length === 4;
  function lock(i) {
    set("penModules", (p) => (p.includes(i) ? p : [...p, i]));
    sound("click", state.audioEnabled);
  }
  function test(i) {
    const next = state.penFilters.includes(i)
      ? state.penFilters
      : [...state.penFilters, i];
    set("penFilters", next);
    if (next.length === 4) {
      flag("penstop", "PenStop");
      sound("flag", state.audioEnabled);
    }
  }
  return (
    <div className="penstop-room">
      <div className="scene-intro">
        <span className="eyebrow copper">WATCH NOVA WORK</span>
        <h2>
          A forgotten pen.
          <br />
          <em>A first venture.</em>
        </h2>
      </div>
      <div className="assembly">
        {["who", "what", "how"].map((k, i) => (
          <button
            key={k}
            className={`assembly-module ${state.penModules.includes(i) ? "locked" : ""}`}
            onClick={() => lock(i)}
          >
            <span className="module-label">
              0{i + 1} <strong>{k.toUpperCase()}</strong>
              {state.penModules.includes(i) ? <Check /> : <Plus />}
            </span>
            <p>{penstop[k]}</p>
            <small>
              {state.penModules.includes(i)
                ? "LOCKED INTO PLACE"
                : "CLICK TO CONNECT"}
            </small>
          </button>
        ))}
      </div>
      {all && (
        <div className="penstop-result scene-enter">
          <div className="concept-ticket">
            <span className="eyebrow">VENTURE NO. 001</span>
            <h3>PenStop</h3>
            <p>A pen when you need one.</p>
            <div className="ticket-foot">
              ₹2 refundable deposit <Flag size={20} />
            </div>
          </div>
          <div className="penstop-filters">
            <h3>Put it through the four filters.</h3>
            <div className="filter-buttons">
              {filters.map((f, i) => (
                <button
                  key={f}
                  onClick={() => test(i)}
                  className={state.penFilters.includes(i) ? "pass" : ""}
                >
                  {state.penFilters.includes(i) ? (
                    <Check size={18} />
                  ) : (
                    <Plus size={18} />
                  )}{" "}
                  {f}
                </button>
              ))}
            </div>
            <strong className="score">{state.penFilters.length} / 4</strong>
            <p aria-live="polite">
              {checked
                ? "Flag planted. Small, fair, useful, appealing."
                : "Ask one student to explain each filter. Tap to confirm."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
