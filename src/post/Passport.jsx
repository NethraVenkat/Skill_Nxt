import { useState } from "react";
import { Link } from "react-router";
import { Echo } from "../echo/Echo";
import { LESSON, RECEIVERS } from "../data/content";
import { RANKS, listenersOf, rankOf, roadLevel, stampsOf, sum, useStore } from "../state/store";
import { Scene } from "../ui/kit";
import "./post.css";

export function Passport() {
  const st = useStore();
  const stamps = stampsOf(st);
  const rank = rankOf(st);
  const next = RANKS.find((r) => r.min > stamps.length);
  const real = st.deliveries;
  const full = real.filter((d) => d.arrived === 3).length;
  const firstAt = (kind) => (kind === "echo" ? null : real.find((d) => d.kind === kind)?.at);
  const feelings = st.butterflies.slice(-10);
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <Scene kicker="Only you see this — no rankings" title="🛂 My Courier Passport" sub="Every new kind of receiver is a new stamp. Small and safe first, bigger when you’re ready.">
      <div className="passport" data-enter>
        <div className="passport__cover">
          <Echo glow={0.3 + stamps.length * 0.1} mood="happy" size={90} />
          <div>
            <p className="passport__label">Voice Courier</p>
            <label className="passport__name">
              <input value={st.name} maxLength={24} onChange={(e) => st.setField("name", e.target.value)} placeholder="Type your name" aria-label="Your name" />
            </label>
            <p className="passport__rank">
              {rank.icon} {rank.name}
            </p>
            <small>{next ? `${next.min - stamps.length} more stamp${next.min - stamps.length > 1 ? "s" : ""} to ${next.icon} ${next.name}` : "The highest rank!"}</small>
          </div>
        </div>
        <div className="passport__pages">
          {RECEIVERS.map((r, i) => {
            const on = stamps.includes(r.id);
            const at = firstAt(r.id);
            return (
              <div key={r.id} className="pstamp" data-on={on || undefined}>
                <span className="pstamp__n">{i + 1}</span>
                {on ? (
                  <span className="wax" style={{ "--c": r.color }}>
                    <span>{r.icon}</span>
                    <small>{r.name}</small>
                  </span>
                ) : (
                  <span className="pstamp__empty">{r.icon}</span>
                )}
                <b>{r.name}</b>
                <small>{on ? (at ? new Date(at).toLocaleDateString() : "✓") : r.who}</small>
              </div>
            );
          })}
        </div>
      </div>

      <div className="statrow" data-enter>
        <div className="stat">
          <b>{real.length}</b>
          <span>messages delivered</span>
        </div>
        <div className="stat">
          <b>{listenersOf(real)}</b>
          <span>people heard you</span>
        </div>
        <div className="stat">
          <b>{full}</b>
          <span>arrived 3/3 ✉️✉️✉️</span>
        </div>
        <div className="stat">
          <b>{st.rides}</b>
          <span>Ride-Alongs</span>
        </div>
        <div className="stat">
          <b>{st.rescues}</b>
          <span>freezes rescued</span>
        </div>
        <div className="stat">
          <b>{roadLevel(sum(st.bumps)).icon}</b>
          <span>{roadLevel(sum(st.bumps)).name}</span>
        </div>
      </div>

      <div className="two">
        <div className="card" data-enter>
          <h2>📒 Delivery log</h2>
          {real.length === 0 ? (
            <p className="muted">
              No real deliveries yet. <Link to="/deliver">Deliver your first message</Link> — start with someone at home!
            </p>
          ) : (
            <ul className="log">
              {[...real].reverse().map((d) => {
                const r = RECEIVERS.find((x) => x.id === d.kind);
                return (
                  <li key={d.at}>
                    <span className="log__icon" style={{ background: r.color }}>
                      {r.icon}
                    </span>
                    <div>
                      <b>
                        {d.topic} → {d.to}
                        {d.count > 2 ? ` (${d.count})` : ""}
                      </b>
                      <small>
                        {"✉️".repeat(d.arrived)}
                        {"▫️".repeat(3 - d.arrived)} {d.arrived}/3 arrived
                        {d.rephrased ? " · 🔁 said it another way" : ""}
                        {d.answered ? " · ❓ answered a question" : ""}
                      </small>
                      {d.glow && <p>“{d.glow}”</p>}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="card" data-enter>
          <h2>🦋 My butterflies</h2>
          {feelings.length < 2 ? (
            <p className="muted">Answer the butterflies question a few times to watch them shrink.</p>
          ) : (
            <div className="bflies">
              {feelings.map((f) => (
                <div key={f.at} className="bflies__bar" data-when={f.when}>
                  <span style={{ height: `${f.level * 20}%` }} />
                  <small>{f.when}</small>
                </div>
              ))}
            </div>
          )}
          <p className="muted">Butterflies are normal. Couriers feel them — and deliver anyway.</p>
        </div>
      </div>

      <div className="licence" data-enter>
        <div className="licence__stripe" aria-hidden="true" />
        <p className="licence__top">Echo’s Talking Post · {LESSON.course}</p>
        <h2>Official Voice Courier Licence</h2>
        <p className="licence__name">{st.name || "A Brave Courier"}</p>
        <p>
          is a <b>
            {rank.icon} {rank.name}
          </b>{" "}
          who has told {real.length} message{real.length === 1 ? "" : "s"} to {listenersOf(real)} {listenersOf(real) === 1 ? "person" : "people"} — by telling, not reading.
        </p>
        <div className="licence__stamps">
          {RECEIVERS.filter((r) => stamps.includes(r.id)).map((r) => (
            <span key={r.id} title={r.name}>
              {r.icon}
            </span>
          ))}
        </div>
        <p className="muted">Signed: Echo, Postmaster · {new Date().toLocaleDateString()}</p>
      </div>
      <div className="row noprint" data-enter>
        <button type="button" className="btn btn--gold" onClick={() => window.print()}>
          🖨️ Print my licence
        </button>
        {!confirmReset ? (
          <button type="button" className="btn btn--ghost btn--small" onClick={() => setConfirmReset(true)}>
            Start over on this device
          </button>
        ) : (
          <>
            <span className="muted">Erase everything?</span>
            <button type="button" className="btn btn--red btn--small" onClick={() => (st.reset(), setConfirmReset(false))}>
              Yes, erase
            </button>
            <button type="button" className="btn btn--ghost btn--small" onClick={() => setConfirmReset(false)}>
              No, keep it
            </button>
          </>
        )}
      </div>
    </Scene>
  );
}
