import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useMic } from "../audio/useMic";
import { speak, stopSpeaking } from "../audio/voice";
import { Echo } from "../echo/Echo";
import { BUMPS, LETTERS } from "../data/content";
import { ROAD_LEVELS, roadLevel, sum, useStore } from "../state/store";
import { EchoSays, MicSwitch, Scene, confetti } from "../ui/kit";
import { useParcels } from "./parcels";
import { useTurn } from "./useTurn";
import "./post.css";

const RECOVER_MS = 15000;

export function BumpyRoads() {
  const st = useStore();
  const packed = useParcels();
  // Bumpy Roads works even before packing: Echo lends its own notes.
  const parcels = packed.length
    ? packed
    : LETTERS.slice(0, 4).map((l) => ({ id: l.id, icon: l.icon, title: `${l.topic} (Echo’s notes)`, notes: l.notes }));
  const [parcelId, setParcelId] = useState(parcels[0].id);
  const parcel = parcels.find((p) => p.id === parcelId) ?? parcels[0];
  const [bump, setBump] = useState(null);
  const [phase, setPhase] = useState("pick"); // pick, ride, bump, recover, survived, retry
  const [hidden, setHidden] = useState([]);
  const [rainLeft, setRainLeft] = useState(0);
  const [loudOk, setLoudOk] = useState(false);
  const mic = useMic();
  const turn = useTurn(mic, { active: phase === "ride" || phase === "recover" });
  const { begin } = turn;
  const timers = useRef([]);
  const fired = useRef(false);
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      stopSpeaking();
    },
    [],
  );

  const total = sum(st.bumps);
  const lvl = roadLevel(total);
  const nextLvl = ROAD_LEVELS.find((l) => l.min > total);

  const go = (b) => {
    clearTimers();
    fired.current = false;
    setBump(b);
    setHidden([]);
    setLoudOk(false);
    setPhase("ride");
    begin();
    if (!mic.on) later(() => hit(b), 5000);
  };
  const recover = () => {
    setPhase("recover");
    begin();
    later(() => setPhase((p) => (p === "recover" ? "retry" : p)), RECOVER_MS);
  };
  function hit(b) {
    setPhase("bump");
    if (b.id === "torn") {
      setHidden([Math.floor(Math.random() * 3)]);
      later(recover, 600);
    } else if (b.id === "rain") {
      setHidden([0, 1, 2]);
      setRainLeft(6);
      for (let s = 1; s <= 6; s++) later(() => setRainLeft(6 - s), s * 1000);
      later(() => {
        setHidden([]);
        recover();
      }, 6000);
    } else speak(b.sound, "friend", () => later(recover, 250));
  }
  function survive() {
    clearTimers();
    setPhase("survived");
    setHidden([]);
    st.bumpSurvived(bump.id);
    confetti();
  }

  // The bump comes once the courier is really talking.
  useEffect(() => {
    if (phase === "ride" && mic.on && turn.spokeMs > 2500 && !fired.current) {
      fired.current = true;
      later(() => hit(bump), 300 + Math.random() * 1200);
    }
  });
  // Did they keep going?
  useEffect(() => {
    if (phase !== "recover" || !mic.on) return;
    if (bump.id === "pardon" && mic.stats.speaking && mic.stats.level > 0.45 && !loudOk) setLoudOk(true);
    if (turn.spokeMs > 2000 && (bump.id !== "pardon" || loudOk)) survive();
  });

  const surprise = () => go(BUMPS[Math.floor(Math.random() * BUMPS.length)]);

  return (
    <Scene
      kicker="Practise what goes wrong"
      title="🕳️ Bumpy Roads"
      sub="On real deliveries, things go wrong: dogs bark, people interrupt, notes fall out. Here they go wrong ON PURPOSE — where it’s safe — so they can’t scare you any more."
    >
      <div className="card level" data-enter>
        <span className="level__icon" aria-hidden="true">
          {lvl.icon}
        </span>
        <div>
          <p className="big">{lvl.name}</p>
          <p className="muted">
            {total} bump{total === 1 ? "" : "s"} survived
            {nextLvl ? ` · ${nextLvl.min - total} more to ${nextLvl.icon} ${nextLvl.name}` : " · the top level!"}
          </p>
        </div>
      </div>

      {phase === "pick" && (
        <>
          <div className="bumps">
            {BUMPS.map((b) => (
              <button key={b.id} type="button" className="bump card" data-enter onClick={() => go(b)}>
                <span className="bump__icon">{b.icon}</span>
                <b>{b.name}</b>
                <small>{b.what}</small>
                <span className="bump__count">{st.bumps[b.id] ? `✓ survived ×${st.bumps[b.id]}` : "not tried yet"}</span>
              </button>
            ))}
            <button type="button" className="bump card bump--surprise" data-enter onClick={surprise}>
              <span className="bump__icon">🎲</span>
              <b>Surprise Road!</b>
              <small>You won’t know what’s coming — just like real life.</small>
            </button>
          </div>
          <div className="two">
            <div className="card" data-enter>
              <h2>Your parcel</h2>
              <div className="chips">
                {parcels.map((p) => (
                  <button key={p.id} type="button" className="chip" aria-pressed={p.id === parcel.id} onClick={() => setParcelId(p.id)}>
                    {p.icon} {p.title}
                  </button>
                ))}
              </div>
            </div>
            <div className="card" data-enter>
              <h2>Mic</h2>
              <MicSwitch mic={mic} label="Let Echo hear me (recommended)" />
              {!mic.on && <p className="muted">Without the mic, the bump comes after 5 seconds and you tap when you’ve recovered.</p>}
            </div>
          </div>
        </>
      )}

      {phase !== "pick" && bump && (
        <div className="ride" data-enter data-shake={phase === "bump" || undefined}>
          <div className="ride__top">
            <span className="pill">
              {bump.icon} {bump.name}
            </span>
            <button type="button" className="btn btn--ghost btn--small" onClick={() => (clearTimers(), stopSpeaking(), setPhase("pick"))}>
              ✕ Stop
            </button>
          </div>
          {phase === "bump" && bump.sound && (
            <p className="boom" aria-live="assertive">
              {bump.icon} “{bump.sound}”
            </p>
          )}
          {phase === "bump" && bump.id === "rain" && (
            <p className="boom boom--calm" aria-live="assertive">
              🌧️ Rain smudged your notes! {rainLeft % 2 === 0 ? "Breathe IN… 🎈" : "Breathe OUT… 💨"} ({rainLeft})
            </p>
          )}
          <div className="ride__row">
            <div className="ride__echo">
              <Echo
                glow={mic.on ? 0.25 + mic.stats.level * 0.7 : 0.45}
                mood={phase === "survived" ? "cheer" : phase === "bump" ? "oops" : mic.stats.speaking ? "listen" : "happy"}
                size={130}
              />
            </div>
            <div className="ride__main">
              <div className="cards3">
                {parcel.notes.map((n, i) => (
                  <div key={i} className="ncard" data-gone={hidden.includes(i) || undefined} data-rain={(bump.id === "rain" && hidden.includes(i)) || undefined}>
                    <i>{i + 1}</i>
                    {hidden.includes(i) ? (bump.id === "rain" ? "~~~ smudged ~~~" : "❓ fell out!") : n}
                  </div>
                ))}
              </div>
              <p className="cue" aria-live="polite">
                {phase === "ride" && "👉 Start telling your message. Something might happen on the road… stay ready!"}
                {phase === "recover" && (bump.id === "pardon" ? "📢 Bigger voice! Keep telling — louder!" : bump.id === "interrupt" ? "🙋 Answer in one sentence, say “Anyway…” and carry on!" : "💪 Keep going! Carry on with your message.")}
                {phase === "survived" && "🎉 You kept going! Bump survived."}
                {phase === "retry" && "That’s OK! Everyone wobbles. Each try makes the road smoother."}
              </p>
              {phase === "recover" && (
                <div className="row" style={{ justifyContent: "center" }}>
                  <button type="button" className="btn btn--gold btn--small" onClick={survive}>
                    ✓ I kept going!
                  </button>
                </div>
              )}
              {phase === "ride" && !mic.on && <p className="muted" style={{ textAlign: "center" }}>Keep talking… the bump is coming!</p>}
            </div>
          </div>
          <div className="road" aria-hidden="true">
            <span className="road__bike" style={{ left: phase === "survived" ? "86%" : phase === "pick" ? "0%" : "42%" }}>
              🚲
            </span>
            {phase === "bump" && <span className="road__hole">🕳️</span>}
            <span className="road__house">🏠</span>
          </div>
        </div>
      )}

      {(phase === "survived" || phase === "retry") && bump && (
        <div className="two">
          <div className="card" data-enter>
            <h2>🛟 The courier’s trick</h2>
            <p className="big">{bump.fix}</p>
            <p className="muted">When it happens on a real delivery, your body will remember: “I’ve done this before.”</p>
          </div>
          <div className="card stack" data-enter>
            <button type="button" className="btn btn--gold" onClick={() => go(bump)}>
              🔁 {phase === "retry" ? "Try again" : "Same road again"}
            </button>
            <button type="button" className="btn btn--ghost" onClick={surprise}>
              🎲 Surprise road
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => setPhase("pick")}>
              Choose another bump
            </button>
            <Link to="/deliver" className="btn btn--ghost">
              📬 Ready for a real delivery?
            </Link>
          </div>
        </div>
      )}
      {phase === "pick" && <EchoSays mood="happy">Even the best couriers hit bumps. The difference? They’ve practised what to do next.</EchoSays>}
    </Scene>
  );
}
