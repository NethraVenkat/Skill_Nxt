import { useState } from "react";
import { Link } from "react-router";
import { POSTCARD_TOPICS, postcardFor } from "../data/content";
import { today, useStore } from "../state/store";
import { EchoSays, Scene, Timer } from "../ui/kit";
import { noteIssue } from "./Mailbag";
import "./post.css";

function lastDays() {
  const out = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

export function Postcard() {
  const { postcard, postcards, setField } = useStore();
  const day = today();
  const saved = postcard?.day === day ? postcard : null;
  const [topic, setTopic] = useState(saved?.topic ?? postcardFor(day));
  const [notes, setNotes] = useState(saved?.notes ?? ["", "", ""]);
  const [timing, setTiming] = useState(false);
  const issues = notes.map(noteIssue);
  const ready = issues.every((x) => !x);
  const save = () => setField("postcard", { day, topic, notes: notes.map((n) => n.trim()) });
  const another = () => {
    const pool = POSTCARD_TOPICS.filter((t) => t !== topic);
    setTopic(pool[Math.floor(Math.random() * pool.length)]);
    setNotes(["", "", ""]);
    setTiming(false);
  };

  return (
    <Scene
      kicker="1 minute a day"
      title="💌 Daily Postcard"
      sub="A tiny message every day. Write 3 notes in one minute, then tell it to someone at home. Small and often beats big and scary."
    >
      <div className="postcard" data-enter>
        <div className="postcard__left">
          <p className="muted">Today’s postcard</p>
          <p className="postcard__topic">“{topic}”</p>
          <div className="row">
            {!timing ? (
              <button type="button" className="btn btn--gold btn--small" onClick={() => setTiming(true)}>
                ⏱️ Start my 1 minute
              </button>
            ) : (
              <Timer seconds={60} running onDone={() => setTiming(false)} label="Note time" />
            )}
            <button type="button" className="btn btn--ghost btn--small" onClick={another}>
              🔀 Different topic
            </button>
          </div>
        </div>
        <div className="postcard__right">
          <span className="postcard__stamp" aria-hidden="true">
            💌
          </span>
          {notes.map((n, i) => (
            <label key={i} className="postcard__line">
              <span className="sr-only">Note {i + 1}</span>
              <input
                value={n}
                maxLength={40}
                placeholder={["First idea…", "Second idea…", "Third idea…"][i]}
                onChange={(e) => setNotes((v) => v.map((x, k) => (k === i ? e.target.value : x)))}
              />
              {n.trim() && issues[i] && <small>{issues[i]}</small>}
            </label>
          ))}
        </div>
      </div>
      <div className="card row" data-enter>
        {ready ? (
          <>
            <Link to="/deliver?parcel=postcard&kind=family" className="btn btn--gold" onClick={save}>
              📬 Deliver it to someone
            </Link>
            <Link to="/ride-along?parcel=postcard" className="btn btn--ghost" onClick={save}>
              🚲 Practise with Echo first
            </Link>
          </>
        ) : (
          <span className="muted">Write 3 short notes (3–4 words each) to send your postcard.</span>
        )}
        {postcards.includes(day) && <span className="done-line">💌 Today’s postcard is delivered!</span>}
      </div>
      <div className="card" data-enter>
        <h2>My last 14 days</h2>
        <div className="garden">
          {lastDays().map((d) => (
            <span key={d} className="garden__day" data-on={postcards.includes(d) || undefined} title={d}>
              {postcards.includes(d) ? "💌" : "·"}
            </span>
          ))}
        </div>
        <p className="muted">Every postcard counts. Missed a day? That’s fine — there are no streaks to lose here.</p>
      </div>
      <EchoSays mood="happy">Tiny messages every day make the big ones feel easy!</EchoSays>
    </Scene>
  );
}
