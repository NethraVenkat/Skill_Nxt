import { useEffect, useState } from "react";
import { Link } from "react-router";
import { LESSON, RECEIVERS, slides, teacherScript } from "../data/content";
import { listenersOf, rankOf, rideFor, roadLevel, stampsOf, sum, useStore } from "../state/store";
import { EchoSays, Scene, Timer } from "../ui/kit";
import "./post.css";

/* ---------- Teacher Mode ---------- */
const CKEY = "echo-post:courage";
function loadCourage() {
  try {
    return JSON.parse(localStorage.getItem(CKEY)) ?? [];
  } catch {
    return [];
  }
}

export function Teacher() {
  const [n, setN] = useState(1);
  const [run, setRun] = useState(false);
  const [board, setBoard] = useState(loadCourage);
  const [who, setWho] = useState("");
  const [what, setWhat] = useState("");
  const st = useStore();
  const s = slides[n - 1];
  const sc = teacherScript[n];
  useEffect(() => {
    try {
      localStorage.setItem(CKEY, JSON.stringify(board));
    } catch {
      /* storage unavailable */
    }
  }, [board]);
  const add = () => {
    if (!who.trim() || !what.trim()) return;
    setBoard((b) => [{ who: who.trim(), what: what.trim(), at: Date.now() }, ...b].slice(0, 60));
    setWho("");
    setWhat("");
  };
  const go = (k) => {
    setN(k);
    setRun(false);
  };
  return (
    <Scene kicker={`${LESSON.grade} · ${LESSON.module}`} title="👩‍🏫 Teacher Mode" sub={`“${LESSON.title}” · 9 slides · 30 minutes. Your script and timer, how to use the Talking Post, and the Courage Board.`}>
      <div className="slidepick" data-enter>
        {slides.map((x) => (
          <button key={x.n} type="button" aria-pressed={x.n === n} onClick={() => go(x.n)}>
            {x.n}
          </button>
        ))}
      </div>
      <div className="two">
        <div className="card script" data-enter>
          <p className="pill">
            Slide {s.n} · {s.min} min
          </p>
          <h2>{s.title}</h2>
          <p className="muted">{s.purpose}</p>
          <h3>🎙️ Say</h3>
          <p className="script__say">{sc.say}</p>
          <h3>✋ Ask the class</h3>
          <p>{sc.prompt}</p>
          <h3>👂 Expect</h3>
          <p>{sc.expect}</p>
        </div>
        <div className="card script__side" data-enter>
          <Timer key={n} seconds={s.min * 60} running={run} onDone={() => setRun(false)} label="Slide time" />
          <div className="row" style={{ justifyContent: "center" }}>
            <button type="button" className="btn btn--gold btn--small" onClick={() => setRun((r) => !r)}>
              {run ? "⏸ Pause" : "▶ Start timer"}
            </button>
            <Link to={`/lesson/${s.slug}`} className="btn btn--ghost btn--small">
              📽️ Show slide
            </Link>
          </div>
          <div className="row" style={{ justifyContent: "center" }}>
            <button type="button" className="btn btn--ghost btn--small" disabled={n === 1} onClick={() => go(n - 1)}>
              ← Prev
            </button>
            <button type="button" className="btn btn--ghost btn--small" disabled={n === 9} onClick={() => go(n + 1)}>
              Next →
            </button>
          </div>
          <Link to="/relay" className="btn btn--red">
            📡 Open the Class Relay
          </Link>
        </div>
      </div>

      <div className="card" data-enter>
        <h2>📮 Using the Talking Post against speaking fear</h2>
        <ul className="tips">
          <li>
            <b>Couriers, not performers.</b> Say “deliver your message to…” instead of “present to the class”. The job is for the message to arrive.
          </li>
          <li>
            <b>Ride-Along first.</b> 4 rides with Echo (homework or a class corner). Echo helps less each ride, and whispers a note if a child freezes.
          </li>
          <li>
            <b>Class Relay.</b> Play once without notes, once with the 3-Note Trick. Ask: “Why did the message survive better with notes?”
          </li>
          <li>
            <b>Grow the audience slowly.</b> Family → friend → teacher → two people → a group → the class. The Class Bulletin is always opt-in.
          </li>
          <li>
            <b>Praise arrivals and repairs.</b> Celebrate “you said it another way!” as loudly as “3/3 arrived”.
          </li>
        </ul>
      </div>

      <div className="card" data-enter>
        <h2>💪 Class Courage Board</h2>
        <p className="muted">Celebrate brave moments — not who was “best”. No scores, no rankings.</p>
        <div className="row">
          <input className="field" style={{ maxWidth: 200 }} value={who} onChange={(e) => setWho(e.target.value)} placeholder="Name" aria-label="Child’s name" />
          <input
            className="field"
            style={{ flex: 1, minWidth: 200 }}
            value={what}
            onChange={(e) => setWhat(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="Brave moment, e.g. said it another way when the class looked confused"
            aria-label="Brave moment"
          />
          <button type="button" className="btn btn--gold btn--small" onClick={add}>
            + Add
          </button>
        </div>
        <div className="courage">
          {board.map((c) => (
            <div key={c.at} className="courage__item">
              <b>⭐ {c.who}</b>
              <span>{c.what}</span>
              <button type="button" aria-label={`Remove ${c.who}`} onClick={() => setBoard((b) => b.filter((x) => x.at !== c.at))}>
                ×
              </button>
            </div>
          ))}
          {!board.length && <small className="muted">No brave moments yet — they’re coming!</small>}
        </div>
      </div>

      <div className="card" data-enter>
        <h2>📈 This device’s courier</h2>
        <div className="stats">
          <span>
            {rankOf(st).icon} <b>{rankOf(st).name}</b>
          </span>
          <span>
            <b>{st.rides}</b> rides · next: {rideFor(st.rides).name}
          </span>
          <span>
            <b>{st.rescues}</b> freezes rescued
          </span>
          <span>
            <b>{sum(st.bumps)}</b> bumps · {roadLevel(sum(st.bumps)).name}
          </span>
          <span>
            <b>{st.deliveries.length}</b> deliveries to <b>{listenersOf(st.deliveries)}</b> people
          </span>
          <span>
            <b>{stampsOf(st).length}</b>/7 stamps
          </span>
        </div>
      </div>
    </Scene>
  );
}

/* ---------- Family page ---------- */
const FAMILY_IDEAS = [
  { icon: "🍽️", title: "Dinner-time delivery", text: "At dinner, your child delivers one packed letter. Everyone at the table is the receiver." },
  { icon: "📞", title: "Phone a grandparent", text: "Your child tells today’s Postcard to a grandparent on the phone — with no paper!" },
  { icon: "🛒", title: "Brave question", text: "At a shop or library (with you nearby), your child asks one question themselves." },
];

export function Family() {
  const { deliveries, name } = useStore();
  const home = deliveries.filter((d) => d.kind === "family" || d.kind === "two");
  return (
    <Scene
      kicker="For grown-ups at home"
      title="👨‍👩‍👧 Family Receivers"
      sub={`Your child is learning to speak from 3 short notes instead of reading — and to beat speaking fear one real listener at a time. You are the friendliest receiver ${name || "they"} will ever have!`}
    >
      <div className="two">
        <div className="card" data-enter>
          <h2>How to be a great receiver 💛</h2>
          <ul className="tips">
            <li>👀 Look at your child and smile — put the phone down.</li>
            <li>🤐 Don’t correct them while they talk. Let them finish.</li>
            <li>✍️ On the delivery slip, tap only what you REALLY heard — honest slips help them grow.</li>
            <li>🔁 If something was unclear, tap “say it another way”. That’s a skill, not a failure.</li>
            <li>❓ Ask one curious question — then enjoy their answer.</li>
          </ul>
        </div>
        <div className="card stack" data-enter>
          <h2>Start a delivery</h2>
          <p>Your child opens their bag, tells you the message, then hands you the device to sign the slip.</p>
          <Link to="/deliver?kind=family" className="btn btn--gold">
            📬 Receive a message now
          </Link>
          <Link to="/postcard" className="btn btn--ghost">
            💌 Today’s 1-minute Postcard
          </Link>
        </div>
      </div>
      <div className="ideas">
        {FAMILY_IDEAS.map((f) => (
          <div key={f.title} className="card" data-enter>
            <h2>
              {f.icon} {f.title}
            </h2>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
      <div className="card" data-enter>
        <h2>📒 Messages delivered at home</h2>
        {home.length === 0 ? (
          <p className="muted">None yet — you could be the first receiver!</p>
        ) : (
          <ul className="log">
            {[...home].reverse().map((d) => (
              <li key={d.at}>
                <span className="log__icon" style={{ background: RECEIVERS.find((r) => r.id === d.kind).color }}>
                  🏠
                </span>
                <div>
                  <b>
                    {d.topic} → {d.to}
                  </b>
                  <small>
                    {d.arrived}/3 arrived · {new Date(d.at).toLocaleDateString()}
                  </small>
                  {d.glow && <p>“{d.glow}”</p>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <EchoSays mood="happy">Everything stays on this device. No accounts, no uploads — just you, your child and a message.</EchoSays>
    </Scene>
  );
}
