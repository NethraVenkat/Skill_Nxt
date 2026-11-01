import { Link } from "react-router";
import { useMic } from "../audio/useMic";
import { Echo } from "../echo/Echo";
import { LESSON, LETTERS, postcardFor } from "../data/content";
import { listenersOf, rankOf, roadLevel, stampsOf, sum, today, useStore } from "../state/store";
import "./post.css";

export function Home() {
  const st = useStore();
  const mic = useMic();
  const stamps = stampsOf(st);
  const rank = rankOf(st);
  const packedCount = Object.keys(st.packed).length;
  const bumpsTried = Object.keys(st.bumps).length;
  const path = [
    { to: "/lesson/echo-arrives", icon: "🎬", title: "Learn the 3-Note Trick", now: `${st.lessons.length} / 9 scenes`, done: st.lessons.length >= 9 },
    { to: "/mailbag", icon: "🎒", title: "Pack a letter", now: `${packedCount} / ${LETTERS.length} packed`, done: packedCount > 0 },
    { to: "/ride-along", icon: "🚲", title: "Ride-Along with Echo", now: st.rides >= 4 ? `Solo! (${st.rides} rides)` : `Ride ${st.rides} / 4`, done: st.rides >= 4 },
    { to: "/bumpy-roads", icon: "🕳️", title: "Bumpy Roads", now: `${roadLevel(sum(st.bumps)).icon} ${bumpsTried} / 5 tried`, done: bumpsTried >= 3 },
    { to: "/deliver?kind=family", icon: "🏠", title: "Deliver to real people", now: `${listenersOf(st.deliveries)} people · ${stamps.length}/7 stamps`, done: stamps.length >= 5 },
    { to: "/deliver?kind=class", icon: "📢", title: "Class Bulletin", now: stamps.includes("class") ? "Delivered!" : "When you feel ready", done: stamps.includes("class") },
  ];
  const next = path.find((p) => !p.done) ?? path[4];
  const glow = mic.on ? 0.25 + mic.stats.level * 0.75 : 0.35;

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__copy">
          <p className="pill" data-enter>
            {LESSON.grade} · {LESSON.title}
          </p>
          <h1 data-enter>
            Don’t give a speech.
            <br />
            <span>Deliver a message.</span>
          </h1>
          <p className="hero__sub" data-enter>
            {st.name ? `Welcome back, Courier ${st.name}! ` : ""}In Echo’s village, letters can’t be read aloud — they must be <b>told</b>. Pack 3
            little notes, tell the message, and see if it really arrives. No stage. No spotlight. Just you, a message, and someone who wants to hear it.
          </p>
          <div className="row" data-enter>
            <Link to={next.to} className="btn btn--gold">
              {next.icon} {next.title} →
            </Link>
            <Link to="/postcard" className="btn btn--ghost">
              💌 Today: “{postcardFor(today())}”
            </Link>
          </div>
        </div>
        <div className="hero__echo" data-enter>
          <div className="hero__postbox" aria-hidden="true">
            <span>ECHO POST</span>
          </div>
          <Echo glow={glow} mood={mic.stats.speaking ? "listen" : "happy"} size={210} />
          {!mic.on ? (
            <button type="button" className="btn btn--ghost btn--small" onClick={mic.start} disabled={mic.busy}>
              🎤 {mic.busy ? "Listening to the room…" : "Say hello to Echo"}
            </button>
          ) : (
            <p className="hero__hint">{mic.stats.speaking ? "Echo hears you! ✨" : "Say “Hello, Echo!”"}</p>
          )}
          {mic.error && <p className="hero__hint">{mic.error}</p>}
        </div>
      </section>

      <section className="village" aria-label="My courier route">
        <h2 className="village__title" data-enter>
          🗺️ My courier route
        </h2>
        <ol className="route">
          {path.map((p, i) => (
            <li key={p.title} data-enter>
              <Link to={p.to} className="route__stop" data-done={p.done || undefined} data-next={p === next || undefined}>
                <span className="route__n">{p.done ? "✓" : i + 1}</span>
                <span className="route__icon" aria-hidden="true">
                  {p.icon}
                </span>
                <b>{p.title}</b>
                <small>{p.now}</small>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="why">
        <div className="card" data-enter>
          <h2>🎯 The message matters, not you</h2>
          <p>Your receiver shows which ideas really reached them. If something got lost, you say it another way. That’s real communication.</p>
        </div>
        <div className="card" data-enter>
          <h2>🚲 Echo rides with you</h2>
          <p>First deliveries are together with Echo. Echo helps less each time — and whispers your note if you freeze.</p>
        </div>
        <div className="card" data-enter>
          <h2>🛂 Small to big</h2>
          <p>
            Echo → family → a friend → a teacher → two people → a group → the class. One new stamp at a time. You are {rank.icon} {rank.name}.
          </p>
        </div>
      </section>

      <section className="card promise" data-enter>
        <h2>Echo’s Promise</h2>
        <ul>
          <li>🎤 Echo only listens to how loud you are. Nothing is recorded or sent anywhere.</li>
          <li>🙅 Nobody is ever pushed to the class. The Class Bulletin is only when YOU are ready.</li>
          <li>🌟 No points and no rankings. Only messages that arrived.</li>
          <li>🦋 Butterflies are welcome. Couriers feel them — and deliver anyway.</li>
        </ul>
      </section>
    </div>
  );
}
