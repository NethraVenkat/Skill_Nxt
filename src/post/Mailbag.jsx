import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { speak } from "../audio/voice";
import { LETTERS, letterById, sentencesOf } from "../data/content";
import { useStore } from "../state/store";
import { EchoSays, Scene, confetti } from "../ui/kit";
import { useParcels } from "./parcels";
import "./post.css";

const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;
/** What is wrong with a note, if anything (Grade 4 words). */
export function noteIssue(n) {
  if (!n.trim()) return "empty";
  if (words(n) > 4) return "Too long! A note is 3–4 words.";
  if (/[.!?]$/.test(n.trim()) && words(n) > 2) return "That looks like a sentence — squeeze it into a note.";
  return null;
}

function PackLetter({ letter, onClose }) {
  const { packed, pack } = useStore();
  const [notes, setNotes] = useState(packed[letter.id] ?? ["", "", ""]);
  const [found, setFound] = useState([]);
  const [done, setDone] = useState(!!packed[letter.id]);
  const sentences = sentencesOf(letter.text);
  const issues = notes.map(noteIssue);
  const ok = issues.every((x) => !x);
  return (
    <div className="two pack">
      <article className="letter" data-enter>
        <button type="button" className="letter__close btn btn--ghost btn--small" onClick={onClose}>
          ← All letters
        </button>
        <p className="letter__from">From: {letter.from}</p>
        <h2>
          {letter.icon} All about {letter.topic}
        </h2>
        <p className="muted">Tap each sentence to find its BIG idea.</p>
        <ol className="letter__lines">
          {sentences.map((s, i) => (
            <li key={i}>
              <button
                type="button"
                data-found={found.includes(i) || undefined}
                onClick={() => setFound((f) => (f.includes(i) ? f : [...f, i]))}
              >
                {s}
              </button>
            </li>
          ))}
        </ol>
        <button type="button" className="btn btn--ghost btn--small" onClick={() => speak(letter.text, "friend")}>
          🔊 Read it to me
        </button>
      </article>
      <div className="card bag" data-enter>
        <h2>🎒 Pack your bag</h2>
        <p>
          Only <b>3 short notes</b> fit in a courier’s bag. The letter stays here at the post office — so you’ll{" "}
          <b>tell</b> it, not read it!
        </p>
        {notes.map((n, i) => (
          <label key={i} className="bag__note" data-issue={n.trim() ? (issues[i] ? "bad" : "ok") : undefined}>
            <span>Note {i + 1}</span>
            <input
              value={n}
              maxLength={40}
              placeholder={found.includes(i) ? "3–4 words…" : "Find idea " + (i + 1) + " first ←"}
              onChange={(e) => {
                setDone(false);
                setNotes((v) => v.map((x, k) => (k === i ? e.target.value : x)));
              }}
            />
            {n.trim() && <small>{issues[i] ?? `✓ ${words(n)} words — perfect`}</small>}
          </label>
        ))}
        {!done ? (
          <button
            type="button"
            className="btn btn--gold"
            disabled={!ok}
            onClick={() => {
              pack(letter.id, notes.map((n) => n.trim()));
              setDone(true);
              confetti();
            }}
          >
            🎒 Pack it!
          </button>
        ) : (
          <div className="stack">
            <p className="done-line">Packed! Your bag is ready.</p>
            <p className="muted">
              Echo packed: {letter.notes.map((n) => `“${n}”`).join(" · ")} — yours can be different. That’s fine!
            </p>
            <div className="row">
              <Link to={`/ride-along?parcel=${letter.id}`} className="btn btn--gold">
                🚲 Ride-Along with Echo
              </Link>
              <Link to={`/deliver?parcel=${letter.id}`} className="btn btn--ghost">
                📬 Deliver to a real person
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function Mailbag() {
  const [params, setParams] = useSearchParams();
  const openId = params.get("open");
  const letter = openId ? letterById(openId) : null;
  const { packed, deliveries } = useStore();
  const parcels = useParcels();
  const sent = (id) => deliveries.filter((d) => d.parcel === id).length;
  const open = (id) => setParams(id ? { open: id } : {});

  if (letter)
    return (
      <Scene kicker="My Mailbag · the 3-Note Trick" title={`${letter.icon} A letter about ${letter.topic}`} sub="Find the 3 big ideas. Pack 3 short notes. Leave the letter behind.">
        <PackLetter key={letter.id} letter={letter} onClose={() => open(null)} />
      </Scene>
    );

  return (
    <Scene
      kicker="Letters can’t be read aloud here — they must be TOLD"
      title="📬 My Mailbag"
      sub="Letters are waiting to be delivered. Open one, pack your 3 notes, then tell the message to someone so it really arrives."
    >
      <div className="envelopes">
        {LETTERS.map((l, i) => (
          <button key={l.id} type="button" className="envelope" style={{ "--tilt": `${(i % 3) - 1}deg` }} data-enter onClick={() => open(l.id)}>
            <span className="envelope__stamp" aria-hidden="true">
              {l.icon}
            </span>
            <span className="envelope__to">To: a Voice Courier</span>
            <b>{l.topic}</b>
            <small>From: {l.from}</small>
            <span className="envelope__tag" data-packed={packed[l.id] ? true : undefined}>
              {packed[l.id] ? (sent(l.id) ? `✓ Delivered ×${sent(l.id)}` : "🎒 Packed") : "✉️ New"}
            </span>
          </button>
        ))}
      </div>

      <div className="card" data-enter>
        <h2>🎒 Ready to deliver</h2>
        {parcels.length === 0 ? (
          <p className="muted">Nothing packed yet. Open a letter above and pack your 3 notes!</p>
        ) : (
          <ul className="parcels">
            {parcels.map((p) => (
              <li key={p.id}>
                <span className="parcels__title">
                  {p.icon} {p.title}
                </span>
                <span className="parcels__notes">{p.notes.join(" · ")}</span>
                <span className="row">
                  <Link to={`/ride-along?parcel=${p.id}`} className="btn btn--ghost btn--small">
                    🚲 Ride-Along
                  </Link>
                  <Link to={`/deliver?parcel=${p.id}`} className="btn btn--gold btn--small">
                    📬 Deliver
                  </Link>
                </span>
              </li>
            ))}
          </ul>
        )}
        <p className="muted" style={{ marginTop: 10 }}>
          Want a quick one? <Link to="/postcard">💌 Today’s Postcard</Link> takes 1 minute.
        </p>
      </div>
      <EchoSays mood="happy">A good courier doesn’t carry the whole letter — just 3 little notes. The rest is in your head!</EchoSays>
    </Scene>
  );
}
