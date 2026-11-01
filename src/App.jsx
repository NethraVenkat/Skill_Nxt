import { useEffect, useState } from "react";
import { ladder } from "./echo-content";
import { routes as shows, stages as screens } from "./shared-lesson";
import { KEY, fresh, valid, stats, addTalk } from "./echo-state";
import "./echo-live.css";
import "./space-theatre.css";
import "./cinematic-theatre.css";
import LessonRoute from "./LessonRoute";
import "./lesson-route.css";
import "./distinct-shows.css";
function initial() {
  try {
    const d = JSON.parse(localStorage.getItem(KEY));
    return valid(d) ? d : fresh();
  } catch {
    return fresh();
  }
}
function Echo({ small = false }) {
  return (
    <div
      className={"echo " + (small ? "small" : "")}
      aria-label="Echo, the friendly microphone"
    >
      <img
        src="/art/echo-character.png"
        alt="Echo, a smiling golden microphone in a space jacket"
        width="1408"
        height="1120"
        draggable="false"
      />
    </div>
  );
}
function Button({ children, soft = false, ...rest }) {
  return (
    <button className={"btn " + (soft ? "soft" : "")} {...rest}>
      {children}
    </button>
  );
}
function Timer({ seconds = 60 }) {
  const [left, setLeft] = useState(seconds),
    [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running || !left) return;
    const id = setInterval(() => setLeft((v) => Math.max(0, v - 1)), 1000);
    return () => clearInterval(id);
  }, [running, left]);
  return (
    <div className="timer">
      <span>
        {Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}
      </span>
      <button onClick={() => setRunning(!running)} disabled={!left}>
        {running ? "Pause" : "Start"}
      </button>
      <button
        onClick={() => {
          setLeft(seconds);
          setRunning(false);
        }}
      >
        Reset
      </button>
      {!left && <small role="status">Finish your idea calmly.</small>}
    </div>
  );
}
const emptyPractice = () => ({
  listener: "",
  level: 0,
  feeling: "A little nervous",
  recall: "",
  feedback: "",
  support: "Independent",
  clarity: "Some ideas",
  confirmed: false,
  repeated: false,
  recovered: false,
  firstId: crypto.randomUUID(),
  secondId: crypto.randomUUID(),
});
function Pagination({ page, setPage, total }) {
  return (
    <div className="pagination">
      <button disabled={page === 0} onClick={() => setPage(page - 1)}>
        ←
      </button>
      <span>
        {page + 1} / {Math.max(1, total)}
      </span>
      <button disabled={page >= total - 1} onClick={() => setPage(page + 1)}>
        →
      </button>
    </div>
  );
}
export default function App() {
  const [d, setD] = useState(initial),
    [view, setView] = useState("landing"),
    [menuPage, setMenuPage] = useState(0),
    [help, setHelp] = useState(false),
    [cue, setCue] = useState(0),
    [choice, setChoice] = useState(""),
    [showAnswer, setShowAnswer] = useState(false),
    [p, setP] = useState(emptyPractice),
    [rescue, setRescue] = useState(false),
    [toast, setToast] = useState(""),
    [storageError, setStorageError] = useState(false),
    [projector, setProjector] = useState(false),
    [speaking, setSpeaking] = useState(false),
    [audioError, setAudioError] = useState(""),
    [stageSupport, setStageSupport] = useState("Buddy beside me"),
    [stageConfirmed, setStageConfirmed] = useState(false),
    [stageId, setStageId] = useState(() => crypto.randomUUID()),
    [menuReturn, setMenuReturn] = useState("menu");
  const student = d.students.find((s) => s.id === d.active) || d.students[0],
    show = shows[d.session],
    screen = screens[d.screen],
    noteKey = student.id + ":" + show.id,
    notes = d.notes[noteKey] || ["", "", ""],
    ready = notes.every((n) => n.trim());
  const [compact, setCompact] = useState(
    () => window.innerWidth < 650 || window.innerHeight < 650,
  );
  useEffect(() => {
    const resize = () =>
      setCompact(window.innerWidth < 650 || window.innerHeight < 650);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(d));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [d]);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(id);
  }, [toast]);
  useEffect(() => {
    setP(emptyPractice());
    setStageConfirmed(false);
    setStageId(crypto.randomUUID());
  }, [d.active, d.session]);
  useEffect(() => {
    setCue(0);
    setHelp(false);
    setRescue(false);
    if (d.screen === 13 || d.screen === 14) {
      setP((previous) => ({ ...previous, recovered: false }));
    }
    setShowAnswer(false);
    setChoice("");
    setAudioError("");
    setSpeaking(false);
    window.speechSynthesis?.cancel();
  }, [d.screen, view, d.session]);
  useEffect(() => () => window.speechSynthesis?.cancel(), []);
  const patchP = (changes) => setP((v) => ({ ...v, ...changes }));
  const patchStudent = (changes) =>
    setD((v) => ({
      ...v,
      students: v.students.map((s) =>
        s.id === student.id ? { ...s, ...changes } : s,
      ),
    }));
  function start(i, from = 0) {
    setD((v) => ({ ...v, session: i, screen: from }));
    setP(emptyPractice());
    setStageConfirmed(false);
    setStageId(crypto.randomUUID());
    setView("lesson");
  }
  const pageCount = 18;
  function move(delta) {
    setD((v) => ({
      ...v,
      screen: Math.max(0, Math.min(pageCount - 1, v.screen + delta)),
    }));
  }
  function speak(text) {
    if (!window.speechSynthesis) {
      setAudioError(
        "Audio is unavailable here. Your teacher can read the example.",
      );
      return;
    }
    window.speechSynthesis.cancel();
    if (speaking) {
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(
      text.replace(/\[.*?\]/g, ""),
    );
    utterance.lang = "en-IN";
    utterance.rate = 0.88;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => {
      setSpeaking(false);
      setAudioError("Audio could not play. Your teacher can read the example.");
    };
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }
  function record(attempt) {
    const id = attempt === 1 ? p.firstId : attempt === 2 ? p.secondId : stageId;
    const talk = {
      id,
      student: student.id,
      session: d.session,
      at: new Date().toISOString(),
      attempt,
      level: attempt === 3 ? (stageSupport === "Independent" ? 4 : 3) : p.level,
      listener: attempt === 3 ? "Classroom audience" : p.listener,
      recall: attempt === 3 ? "Stage opportunity completed" : p.recall,
      feedback: attempt === 3 ? "Ask listeners to recall one idea" : p.feedback,
      support: attempt === 3 ? stageSupport : p.support,
      clarity: attempt === 3 ? "Not assessed" : p.clarity,
      recovered: p.recovered,
      notes: [...notes],
    };
    setD((v) => addTalk(v, talk));
    setToast("Saved for " + student.name + ".");
  }
  function exportBackup() {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(d, null, 2)], { type: "application/json" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "echo-live-backup.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const savedFirst = d.talks.some((t) => t.id === p.firstId),
    savedSecond = d.talks.some((t) => t.id === p.secondId),
    savedStage = d.talks.some((t) => t.id === stageId);
  const disableNext =
    view === "lesson" &&
    ((screen.id === "notes" && !ready) ||
      (screen.id === "setup" && !p.listener.trim()));
  const menuSize = compact ? 2 : 3;
  useEffect(() => {
    setMenuPage((current) =>
      Math.min(current, Math.ceil(shows.length / menuSize) - 1),
    );
  }, [menuSize]);
  return (
    <div className={"app " + (projector ? "projector" : "")}>
      <header className="topbar">
        <button
          className="brand"
          onClick={() => setView("landing")}
          aria-label="Echo Live home"
        >
          <span className="brand-spark">✳</span>
          <span>
            echo<span className="brand-live">live!</span>
          </span>
        </button>
        <div className="header-middle">
          <span className="live-dot" />{" "}
          {view === "lesson" ? show.title : "SPACE THEATRE · GRADE 4"}
        </div>
        <div className="header-actions">
          <button
            className="icon-btn projector-button"
            onClick={() => setProjector(!projector)}
          >
            {projector ? "Exit projector" : "Projector"}
          </button>
          <label className="profile">
            <span className="avatar">{student.name.charAt(0) || "E"}</span>
            <select
              aria-label="Active presenter"
              value={student.id}
              onChange={(e) => setD((v) => ({ ...v, active: e.target.value }))}
            >
              {d.students.map((s) => (
                <option value={s.id} key={s.id}>
                  {s.name || "Presenter"}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>
      <main
        className={
          "screen " +
          (view === "lesson" && screen.id === "stage" ? "stage-screen" : "")
        }
      >
        {storageError && (
          <div className="storage-alert" role="alert">
            Saving unavailable. Export a backup from Teacher Desk before
            closing.
          </div>
        )}
        {view === "landing" && (
          <section className="landing">
            <div className="landing-layout">
              <div>
                <span className="eyebrow">WELCOME TO ECHO LIVE!</span>
                <h1>
                  Your voice
                  <br />
                  <span>belongs here.</span>
                </h1>
                <p>Three notes. One discovery. Your words.</p>
                <Button
                  onClick={() => setView("menu")}
                  className="btn enter-button"
                >
                  Enter the show →
                </Button>
              </div>
              <div className="landing-character">
                <img
                  src="/art/echo-character.png"
                  alt="Echo welcomes you to the theatre"
                />
              </div>
            </div>
          </section>
        )}
        {view === "menu" && (
          <>
            <div className="menu-heading">
              <span className="eyebrow">WELCOME TO THE SPACE THEATRE</span>
              <h1>
                One lesson.
                <br />
                <em>Three ways to learn.</em>
              </h1>
              <p>The same 18-screen period. Choose a teaching route.</p>
            </div>
            <div className="menu-shows">
              {shows
                .slice(menuPage * menuSize, menuPage * menuSize + menuSize)
                .map((s, j) => {
                  const i = menuPage * menuSize + j;
                  return (
                    <button
                      className={"show-card " + s.color}
                      key={s.id}
                      onClick={() => start(i)}
                    >
                      <div className="show-card-top">
                        <span>SHOW 0{i + 1}</span>
                        <span>{s.icon}</span>
                      </div>
                      <h2>{s.title}</h2>
                      <p>{s.description}</p>
                      <div className="show-card-bottom">
                        <span>
                          {d.completed.includes(i)
                            ? "✓ Completed"
                            : "35 min · 18 screens"}
                        </span>
                        <b>Enter the show ↗</b>
                      </div>
                    </button>
                  );
                })}
            </div>
            <div className="menu-bottom">
              <Pagination
                page={menuPage}
                setPage={setMenuPage}
                total={Math.ceil(shows.length / menuSize)}
              />
              <div className="menu-links">
                <Button
                  soft
                  onClick={() => {
                    setView("journey");
                    setMenuReturn("menu");
                  }}
                >
                  My next step ↗
                </Button>
                <Button soft onClick={() => setView("teacher")}>
                  Teacher Desk ▦
                </Button>
                <Button
                  onClick={() => {
                    setView("lesson");
                  }}
                >
                  Resume show →
                </Button>
              </div>
            </div>
          </>
        )}
        {view === "journey" && (
          <>
            <PageTitle
              eyebrow="YOUR OWN PACE"
              title="One step braver."
              text="Choose a manageable challenge with your teacher. Repeat any step."
            />
            <div className="journey-layout">
              <div className="ladder">
                {ladder.map((l, i) => (
                  <button
                    key={l}
                    className={student.step === i ? "chosen" : ""}
                    onClick={() => patchStudent({ step: i })}
                  >
                    <span>0{i + 1}</span>
                    <strong>{l}</strong>
                    {student.step === i && <b>Next step</b>}
                  </button>
                ))}
              </div>
              <div className="goal-card">
                <Echo small />
                <h2>Your next little goal</h2>
                <label>
                  What would you like to try?
                  <input
                    value={student.goal}
                    maxLength={100}
                    onChange={(e) => patchStudent({ goal: e.target.value })}
                  />
                </label>
                <div className="mini-stats">
                  <b>
                    {d.talks.filter((t) => t.student === student.id).length}
                    <small>saved attempts</small>
                  </b>
                  <b>
                    {
                      d.talks.filter(
                        (t) => t.student === student.id && t.attempt === 2,
                      ).length
                    }
                    <small>second tries</small>
                  </b>
                </div>
                <p>“You can feel nervous and still share a good idea.”</p>
              </div>
            </div>
          </>
        )}
        {view === "teacher" && (
          <Teacher
            d={d}
            setD={setD}
            compact={compact}
            exportBackup={exportBackup}
            notify={setToast}
            onStart={start}
          />
        )}
        {view === "lesson" && (
          <LessonRoute
            key={student.id + show.id}
            session={d.session}
            step={d.screen}
            student={student}
            onGoal={(goal) => patchStudent({ goal })}
            onPrint={() => window.print()}
            onComplete={() => {
              setD((v) => ({
                ...v,
                completed: [...new Set([...v.completed, v.session])],
              }));
              setView("menu");
              setToast(
                "Teaching route completed. Speaking records are separate.",
              );
            }}
            notes={notes}
            setNotes={(next) =>
              setD((v) => ({ ...v, notes: { ...v.notes, [noteKey]: next } }))
            }
            onSave={(details) => {
              setD((v) =>
                addTalk(v, {
                  id: crypto.randomUUID(),
                  student: student.id,
                  session: d.session,
                  at: new Date().toISOString(),
                  attempt: 1,
                  level: 0,
                  listener: "Real classroom listener",
                  support: "Not recorded",
                  clarity: "Not assessed",
                  ...details,
                }),
              );
              setToast("Speaking attempt saved for " + student.name);
            }}
          />
        )}
      </main>
      <footer className="bottom-bar">
        <div className="footer-left">
          {view === "lesson" ? (
            <>
              <button
                className="back-btn"
                disabled={!d.screen}
                onClick={() => move(-1)}
              >
                ← Back
              </button>
              <button className="help-btn" onClick={() => setHelp(true)}>
                Teacher help ?
              </button>
            </>
          ) : (
            <button
              className="back-btn"
              disabled={view === "landing"}
              onClick={() =>
                setView(
                  view === "journey"
                    ? menuReturn
                    : view === "menu"
                      ? "landing"
                      : "menu",
                )
              }
            >
              {view === "landing"
                ? "Welcome aboard"
                : view === "menu"
                  ? "← Home"
                  : "← Show menu"}
            </button>
          )}
        </div>
        <div className="progress-zone">
          {view === "lesson" ? (
            <>
              <div className="progress-track">
                <div
                  style={{
                    width:
                      ((Math.min(d.screen, pageCount - 1) + 1) / pageCount) *
                        100 +
                      "%",
                  }}
                />
              </div>
              <span>
                {String(Math.min(d.screen, pageCount - 1) + 1).padStart(2, "0")}{" "}
                <small>/ {pageCount}</small>
              </span>
            </>
          ) : (
            <span className="footer-caption">
              {view === "landing"
                ? "DISCOVER · PREPARE · REHEARSE · SHARE"
                : "ONE SCREEN · ONE SMALL STEP"}
            </span>
          )}
        </div>
        <div className="footer-right">
          {view === "landing" ? (
            <Button onClick={() => setView("menu")}>Next →</Button>
          ) : view === "lesson" ? (
            <Button
              disabled={disableNext}
              onClick={() => {
                if (d.screen >= pageCount - 1) {
                  if (d.session >= 0)
                    setD((v) => ({
                      ...v,
                      completed: [...new Set([...v.completed, v.session])],
                    }));
                  setView("menu");
                } else move(1);
              }}
            >
              {d.screen >= pageCount - 1 ? "Finish route" : "Next"}{" "}
              →
            </Button>
          ) : (
            <span className="local-label">Saved on this browser</span>
          )}
        </div>
      </footer>
      {help && (
        <div className="modal-backdrop">
          <section
            className="help-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="help-title"
          >
            <span className="eyebrow">TEACHER GUIDANCE · {screen.group}</span>
            <h2 id="help-title">{screen.title}</h2>
            <p>{screen.help}</p>
            <p className="small-note">
              {d.session === 0 ? show.teacher : show.focus}
            </p>
            <div className="button-row">
              <Button soft onClick={() => setHelp(false)}>
                Return to activity
              </Button>
              <Button
                onClick={() => {
                  setHelp(false);
                  move(1);
                }}
              >
                Skip this activity →
              </Button>
            </div>
          </section>
        </div>
      )}
      {toast && (
        <div className="toast" role="status">
          ✓ {toast}
        </div>
      )}
      <div className="print-cards">
        <h1>
          {show.title} · {student.name}
        </h1>
        {notes.map((n, i) => (
          <div key={i}>
            <span>IDEA {i + 1}</span>
            <h2>{n || "____________________"}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
function PageTitle({ eyebrow, title, text }) {
  return (
    <div className="page-title">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </div>
  );
}
function Teacher({ d, setD, compact, exportBackup, notify, onStart }) {
  const [tab, setTab] = useState("overview"),
    [page, setPage] = useState(0),
    [selected, setSelected] = useState(d.active),
    [name, setName] = useState(""),
    [backup, setBackup] = useState(null),
    [reset, setReset] = useState(false),
    [historyPage, setHistoryPage] = useState(0),
    [toolsPage, setToolsPage] = useState(0);
  const person = d.students.find((s) => s.id === selected) || d.students[0],
    counts = stats(d),
    size = compact ? 2 : 4,
    talks = [...d.talks.filter((t) => t.student === person.id)].reverse();
  useEffect(() => {
    setPage(0);
    setHistoryPage(0);
    setToolsPage(0);
  }, [compact]);
  function patch(changes) {
    setD((v) => ({
      ...v,
      students: v.students.map((s) =>
        s.id === person.id ? { ...s, ...changes } : s,
      ),
    }));
  }
  async function read(e) {
    const f = e.target.files[0];
    if (!f) return;
    try {
      const parsed = JSON.parse(await f.text());
      if (!valid(parsed)) throw Error();
      setBackup(parsed);
      setTab("restore");
    } catch {
      notify("This is not a valid Echo Live backup.");
    }
    e.target.value = "";
  }
  return (
    <div className="teacher-workspace">
      <div className="teacher-title">
        <PageTitle
          eyebrow="TEACHER DESK"
          title={
            tab === "overview"
              ? "Make room for every voice."
              : tab === "roster"
                ? "Your classroom."
                : tab === "student"
                  ? "One presenter, one next step."
                  : tab === "history"
                    ? "Speaking observations."
                    : tab === "observation"
                      ? "Teacher observation."
                      : tab === "priorities"
                        ? "Every voice matters."
                        : tab === "reset"
                          ? "Review classroom reset."
                          : tab === "restore"
                            ? "Restore a classroom."
                            : "Cards, records & backups."
          }
        />
        <div className="teacher-tabs">
          {[
            ["overview", "Overview"],
            ["roster", "Roster"],
            ["tools", "Tools"],
            ["priorities", "Priorities"],
          ].map(([id, label]) => (
            <button
              key={id}
              className={tab === id ? "selected" : ""}
              onClick={() => {
                setTab(id);
                setPage(0);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {tab === "overview" && (
        <>
          <div className="teacher-stats">
            {[
              [counts.students, "Student profiles"],
              [counts.speakers, "With a recorded attempt"],
              [counts.awaiting, "Without a stage turn"],
            ].map(([n, t]) => (
              <div key={t}>
                <strong>{n}</strong>
                <span>{t}</span>
              </div>
            ))}
          </div>
          <div className="teacher-overview">
            <div className="teacher-checklist">
              <h2>Today’s teaching priorities</h2>
              <p>✓ Everyone speaks with a partner.</p>
              <p>✓ Feedback leads to another attempt.</p>
              <p>✓ Supported stage opportunities rotate.</p>
              <p>✓ Compare clarity and support, not personalities.</p>
            </div>
            <div className="teacher-launch">
              <span className="eyebrow">RUN A SHOW</span>
              <select
                aria-label="Session to run"
                value={d.session}
                onChange={(e) =>
                  setD((v) => ({
                    ...v,
                    session: Number(e.target.value),
                    screen: 0,
                  }))
                }
              >
                {shows.map((s, i) => (
                  <option key={s.id} value={i}>
                    {i + 1}. {s.title}
                  </option>
                ))}
              </select>
              <Button onClick={() => onStart(d.session)}>
                Start selected show →
              </Button>
              <p className="small-note">
                35 minutes: 30-minute core + 5 for settling and transitions.
                Activity labels share time; they are not additive.
              </p>
            </div>
          </div>
          <div className="privacy-note">
            Local workspace · No login or teacher access lock. Use a
            teacher-controlled device. Backups contain classroom records.
          </div>
        </>
      )}
      {tab === "roster" && (
        <>
          <form
            className="add-profile"
            onSubmit={(e) => {
              e.preventDefault();
              if (!name.trim()) return;
              const id = crypto.randomUUID();
              setD((v) => ({
                ...v,
                students: [
                  ...v.students,
                  {
                    id,
                    name: name.trim(),
                    step: 0,
                    goal: "Explain my three ideas",
                    observation: "",
                  },
                ],
                active: id,
              }));
              setSelected(id);
              setName("");
              setPage(Math.floor(d.students.length / size));
              notify("Presenter added.");
            }}
          >
            <input
              aria-label="Student name or nickname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Student name or nickname"
              maxLength={50}
              required
            />
            <Button>Add presenter +</Button>
          </form>
          <div className="roster-list">
            {d.students.slice(page * size, page * size + size).map((s) => {
              const ts = d.talks.filter((t) => t.student === s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelected(s.id);
                    setTab("student");
                    setHistoryPage(0);
                  }}
                >
                  <span className="avatar">{s.name.charAt(0) || "S"}</span>
                  <div>
                    <strong>{s.name}</strong>
                    <small>{ladder[s.step]}</small>
                  </div>
                  <span>
                    {ts.length} talks{" "}
                    <small>
                      {ts.filter((t) => t.attempt === 3 || t.level >= 3).length}{" "}
                      stage steps
                    </small>
                  </span>
                  <b>Review ↗</b>
                </button>
              );
            })}
          </div>
          <Pagination
            page={page}
            setPage={setPage}
            total={Math.ceil(d.students.length / size)}
          />
        </>
      )}
      {tab === "student" && (
        <div className="student-editor">
          <div className="editor-fields">
            <label>
              Display name
              <input
                value={person.name}
                maxLength={50}
                onChange={(e) => patch({ name: e.target.value })}
              />
            </label>
            <label>
              Personal next goal
              <input
                value={person.goal}
                maxLength={100}
                onChange={(e) => patch({ goal: e.target.value })}
              />
            </label>
            <label>
              Next audience step
              <select
                value={person.step}
                onChange={(e) => patch({ step: Number(e.target.value) })}
              >
                {ladder.map((l, i) => (
                  <option key={l} value={i}>
                    {l}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="editor-note">
            {!compact && (
              <label>
                Teacher observation
                <textarea
                  value={person.observation}
                  maxLength={500}
                  onChange={(e) => patch({ observation: e.target.value })}
                  placeholder="Record clarity, support used, or how the student continued after a pause."
                />
              </label>
            )}
            <div className="button-row">
              <Button soft onClick={() => setTab("roster")}>
                ← Roster
              </Button>
              {compact && (
                <Button soft onClick={() => setTab("observation")}>
                  Observation →
                </Button>
              )}
              <Button
                onClick={() => {
                  setHistoryPage(0);
                  setTab("history");
                }}
              >
                Review speaking records →
              </Button>
            </div>
            {!compact && (
              <p className="small-note">
                Updates save automatically. Feelings are not grades.
              </p>
            )}
          </div>
        </div>
      )}
      {tab === "observation" && (
        <div className="observation-page">
          <h2>{person.name}</h2>
          <label>
            Teacher observation
            <textarea
              value={person.observation}
              maxLength={500}
              onChange={(e) => patch({ observation: e.target.value })}
              placeholder="Record clarity, support used, or how the student continued after a pause."
            />
          </label>
          <p className="small-note">
            Updates save automatically. Feelings are not grades.
          </p>
          <div className="button-row">
            <Button soft onClick={() => setTab("student")}>
              ← Profile
            </Button>
            <Button
              onClick={() => {
                setHistoryPage(0);
                setTab("history");
              }}
            >
              Speaking records →
            </Button>
          </div>
        </div>
      )}
      {tab === "history" && (
        <>
          <div className="record-heading">
            <h2>{person.name}</h2>
            <Button soft onClick={() => setTab("student")}>
              ← Profile
            </Button>
          </div>
          {!talks.length ? (
            <div className="empty-state">
              <Echo small />
              <h2>No recorded attempts yet.</h2>
              <p>Save an observation after this student actually speaks.</p>
            </div>
          ) : (
            <>
              <div className="record-list">
                {talks
                  .slice(
                    historyPage * (compact ? 1 : 2),
                    historyPage * (compact ? 1 : 2) + (compact ? 1 : 2),
                  )
                  .map((t) => (
                    <div className="record" key={t.id}>
                      <div className="record-meta">
                        <strong>{shows[t.session].title}</strong>
                        <span>
                          {new Date(t.at).toLocaleDateString()} ·{" "}
                          {t.attempt === 3 ? "Stage turn" : "Try " + t.attempt}
                        </span>
                      </div>
                      <p>
                        <b>{ladder[t.level]}</b> · {t.support}
                      </p>
                      <p>Listener remembered: {t.recall}</p>
                      <p>Next suggestion: {t.feedback}</p>
                      <small>
                        {t.clarity}
                        {t.recovered ? " · Paused and continued" : ""}
                      </small>
                    </div>
                  ))}
              </div>
              <Pagination
                page={historyPage}
                setPage={setHistoryPage}
                total={Math.ceil(talks.length / (compact ? 1 : 2))}
              />
            </>
          )}
        </>
      )}
      {tab === "priorities" && (
        <div className="priorities-page">
          <h2>Give every student a useful turn.</h2>
          <p>✓ Everyone speaks with a partner.</p>
          <p>✓ A specific comment leads to another attempt.</p>
          <p>✓ Supported stage opportunities rotate.</p>
          <p>✓ Compare clarity and support, not personalities.</p>
          <p>✓ Notes are memory triggers, not a script.</p>
        </div>
      )}
      {tab === "restore" && backup && (
        <div className="confirm-page">
          <h2>Replace this classroom?</h2>
          <p>
            The backup contains {backup.students.length} profiles and{" "}
            {backup.talks.length} speaking records. Current records will be
            replaced. Export them first if you want to keep them.
          </p>
          <div className="button-row">
            <Button soft onClick={exportBackup}>
              Export current records
            </Button>
            <Button
              soft
              onClick={() => {
                setBackup(null);
                setTab("tools");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setD(backup);
                setSelected(backup.active);
                setPage(0);
                setHistoryPage(0);
                setBackup(null);
                setTab("overview");
                notify("Backup restored.");
              }}
            >
              Replace records
            </Button>
          </div>
        </div>
      )}
      {tab === "reset" && (
        <div className="confirm-page">
          <h2>Delete local classroom records?</h2>
          <p>
            All Echo Live profiles, notes and attempts will be removed from this
            browser. Export a backup first.
          </p>
          <div className="button-row">
            <Button soft onClick={exportBackup}>
              Export backup
            </Button>
            <Button
              soft
              onClick={() => {
                setReset(false);
                setTab("tools");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                const x = fresh();
                setD(x);
                setSelected(x.active);
                setPage(0);
                setHistoryPage(0);
                setReset(false);
                setBackup(null);
                setTab("overview");
                notify("Local classroom reset.");
              }}
            >
              Delete local records
            </Button>
          </div>
        </div>
      )}
      {tab === "tools" && (
        <div className={"tools-layout tools-page-" + toolsPage}>
          <div>
            <h2>Keep a copy of your classroom.</h2>
            <p>
              Records stay in this browser and on this address. Export before
              clearing browser storage or moving devices.
            </p>
            <div className="button-row">
              <Button onClick={exportBackup}>Export backup ↓</Button>
              <label className="btn soft file-button">
                Choose backup
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={read}
                />
              </label>
            </div>
          </div>
          <div className="tools-note">
            <h2>Paper is welcome here.</h2>
            <p>
              Use Print my cards on the note-writing screen. Everyone can
              rehearse from paper while a teacher runs the show.
            </p>
            <Button
              soft
              onClick={() => {
                setReset(true);
                setTab("reset");
              }}
            >
              Review classroom reset
            </Button>
          </div>
        </div>
      )}
      {tab === "tools" && compact && (
        <Pagination page={toolsPage} setPage={setToolsPage} total={2} />
      )}
    </div>
  );
}
