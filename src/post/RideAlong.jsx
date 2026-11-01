import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { describe } from "../audio/mic";
import { useMic } from "../audio/useMic";
import { speak, stopSpeaking } from "../audio/voice";
import { Echo } from "../echo/Echo";
import { RIDES, rideFor, useStore } from "../state/store";
import { ButterflyCheck, EchoSays, MicSwitch, Scene, confetti } from "../ui/kit";
import { pickParcel, useParcels } from "./parcels";
import { useTurn } from "./useTurn";
import "./post.css";

const firstWords = (t, n = 4) => t.split(/\s+/).slice(0, n).join(" ") + "…";

/** The delivery, turn by turn, for one rung of the Ride-Along ladder. */
function buildTurns(rideIdx, parcel) {
  const { notes, sentences } = parcel;
  const full = (i) => sentences?.[i] ?? `Here’s something cool: ${notes[i]}!`;
  const half = (i) => (sentences ? firstWords(sentences[i]) : `And next… ${firstWords(notes[i], 1)}`);
  const you = (i, finish) => ({ kind: "you", i, finish });
  const echo = (i, text, style = "echo") => ({ kind: "echo", i, text, style });
  switch (rideIdx) {
    case 0:
      return [you(0), echo(1, full(1)), you(2)];
    case 1:
      return [you(0), echo(1, half(1)), you(1, true), you(2)];
    case 2:
      return [0, 1, 2].flatMap((i) => [echo(i, notes[i], "whisper"), you(i)]);
    default:
      return [you(0), you(1), you(2)];
  }
}

export function RideAlong() {
  const st = useStore();
  const [params] = useSearchParams();
  const parcels = useParcels();
  const [parcelId, setParcelId] = useState(params.get("parcel"));
  const parcel = pickParcel(parcels, parcelId);
  const ride = rideFor(st.rides);
  const rideIdx = ride.n - 1;
  const turns = useMemo(() => (parcel ? buildTurns(rideIdx, parcel) : []), [rideIdx, parcel]);

  const mic = useMic();
  const [phase, setPhase] = useState("pick"); // pick, go, done
  const [idx, setIdx] = useState(0);
  const [whispering, setWhispering] = useState(false);
  const [glowNote, setGlowNote] = useState(null);
  const [silent, setSilent] = useState(false);
  const [result, setResult] = useState(null);
  const [feel, setFeel] = useState(null);
  const helped = useRef(new Set());
  const box = useRef(null);

  const cur = phase === "go" ? turns[idx] : null;
  const turn = useTurn(mic, { active: cur?.kind === "you", paused: whispering });
  const { begin } = turn;
  const advance = useCallback((from) => setIdx((i) => (i === from ? i + 1 : i)), []);

  const start = () => {
    helped.current = new Set();
    mic.reset();
    setIdx(0);
    setGlowNote(null);
    setResult(null);
    setFeel(null);
    setPhase("go");
  };

  // Echo's turns: say it, then hand back to the courier.
  useEffect(() => {
    if (cur?.kind !== "echo") return;
    let live = true;
    setGlowNote(cur.i);
    if (cur.style === "whisper" && silent) {
      const t = setTimeout(() => live && advance(idx), 1400);
      return () => {
        live = false;
        clearTimeout(t);
      };
    }
    speak(cur.text, cur.style, () => live && setTimeout(() => live && advance(idx), 350));
    return () => {
      live = false;
      stopSpeaking();
    };
  }, [cur, idx, advance, silent]);

  useEffect(() => {
    if (cur?.kind === "you") {
      setGlowNote(null);
      begin();
    }
  }, [cur, idx, begin]);

  const whisper = useCallback(
    (i) => {
      helped.current.add(idx);
      setGlowNote(i);
      setWhispering(true);
      if (silent) setTimeout(() => setWhispering(false), 1600);
      else speak(parcel.notes[i], "whisper", () => setWhispering(false));
    },
    [idx, silent, parcel],
  );

  // Idea told → next. Frozen → Echo whispers (solo couriers ask with 🆘 instead).
  useEffect(() => {
    if (cur?.kind !== "you" || whispering) return;
    if (turn.finished) advance(idx);
    else if (turn.frozen && rideIdx < 4 && !helped.current.has(idx)) whisper(cur.i);
  }, [cur, idx, turn.finished, turn.frozen, whispering, rideIdx, advance, whisper]);

  // Delivery complete.
  useEffect(() => {
    if (phase !== "go" || idx < turns.length) return;
    const rescued = helped.current.size;
    st.rideDone(rescued);
    if (parcel.id === "postcard") st.postcardDone();
    setResult({
      rescued,
      solo: rideIdx === 4,
      voice: mic.on && mic.stats.talkMs > 2500 ? mic.stats.expression : null,
    });
    setPhase("done");
    confetti();
  }, [phase, idx, turns.length, st, rideIdx, parcel, mic.on, mic.stats]);

  useEffect(() => () => stopSpeaking(), []);

  const full = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else box.current?.requestFullscreen?.().catch(() => {});
  };

  if (!parcel)
    return (
      <Scene kicker="Ride-Along" title="🚲 Ride-Along with Echo" sub="Echo rides with you on your first deliveries.">
        <div className="card stack" data-enter>
          <p className="big">Your bag is empty! Pack a letter first — it only takes a minute.</p>
          <div className="row">
            <Link to="/mailbag" className="btn btn--gold">
              📬 Open my Mailbag
            </Link>
            <Link to="/postcard" className="btn btn--ghost">
              💌 Today’s Postcard
            </Link>
          </div>
        </div>
      </Scene>
    );

  const solo = rideIdx === 4;
  const progress = phase === "done" ? 1 : phase === "go" ? idx / turns.length : 0;
  return (
    <Scene
      kicker="You’re never alone on the road"
      title="🚲 Ride-Along with Echo"
      sub="Deliver your message TOGETHER with Echo. Every ride, Echo helps a little less — until you’re riding on your own and didn’t even notice."
    >
      <ol className="ladder" data-enter aria-label="Ride-Along ladder">
        {RIDES.map((r, i) => (
          <li key={r.n} data-done={i < st.rides || undefined} data-now={i === rideIdx || undefined}>
            <span aria-hidden="true">{r.icon}</span>
            <b>{r.name}</b>
            <small>{r.echo}</small>
          </li>
        ))}
      </ol>

      {phase === "pick" && (
        <div className="two">
          <div className="card" data-enter>
            <h2>1 · Which parcel?</h2>
            <div className="chips">
              {parcels.map((p) => (
                <button key={p.id} type="button" className="chip" aria-pressed={p.id === parcel.id} onClick={() => setParcelId(p.id)}>
                  {p.icon} {p.title}
                </button>
              ))}
            </div>
            <div className="minis">
              {parcel.notes.map((n, i) => (
                <span key={i} className="mini">
                  <i>{i + 1}</i>
                  {n}
                </span>
              ))}
            </div>
          </div>
          <div className="card stack" data-enter>
            <h2>
              2 · Ride {st.rides + 1}: {ride.icon} {ride.name}
            </h2>
            <p>{ride.echo}</p>
            <MicSwitch mic={mic} label="Let Echo hear me (recommended)" />
            {!mic.on && <p className="muted">Without the mic you tap “Next” after each idea — Echo can’t notice a freeze.</p>}
            <label className="check">
              <input type="checkbox" checked={silent} onChange={(e) => setSilent(e.target.checked)} />
              🤫 Silent whispers (only your note glows — for class)
            </label>
            <button type="button" className="btn btn--gold" onClick={start}>
              ▶ Start the ride
            </button>
          </div>
        </div>
      )}

      {phase !== "pick" && (
        <div className="ride" ref={box} data-enter>
          <div className="ride__top">
            <span className="pill">
              {ride.icon} {ride.name} · {parcel.icon} {parcel.title}
            </span>
            <button type="button" className="btn btn--ghost btn--small" onClick={full}>
              ⛶ Big screen
            </button>
          </div>
          <div className="ride__row">
            <div className="ride__echo">
              <Echo
                glow={cur?.kind === "echo" || whispering ? 0.9 : mic.on ? 0.25 + mic.stats.level * 0.7 : 0.45}
                mood={phase === "done" ? "cheer" : cur?.kind === "echo" ? "talk" : whispering ? "think" : mic.stats.speaking ? "listen" : "happy"}
                size={solo ? 100 : 150}
              />
              <small>{solo ? "Echo waves from the post office 👋" : "Echo, riding with you"}</small>
            </div>
            <div className="ride__main">
              <div className="cards3">
                {parcel.notes.map((n, i) => (
                  <div
                    key={i}
                    className="ncard"
                    data-now={(cur?.kind === "you" && cur.i === i) || undefined}
                    data-echo={(cur?.kind === "echo" && cur.style !== "whisper" && cur.i === i) || undefined}
                    data-glow={glowNote === i || undefined}
                    data-said={(phase === "done" || (cur && i < cur.i)) || undefined}
                  >
                    <i>{i + 1}</i>
                    {n}
                  </div>
                ))}
              </div>
              <p className="cue" aria-live="polite">
                {phase === "done"
                  ? "📬 Message delivered!"
                  : cur?.kind === "echo"
                    ? cur.style === "whisper"
                      ? `💡 Echo whispers: “${cur.text}”`
                      : `🎙️ Echo: “${cur.text}”`
                    : whispering
                      ? "💡 Echo whispered your note — breathe, and go!"
                      : cur?.finish
                        ? "👉 YOUR turn: finish Echo’s sentence!"
                        : `👉 YOUR turn: tell idea ${cur?.i + 1} in your own words — then look UP.`}
              </p>
              {phase === "go" && cur?.kind === "you" && (
                <div className="row" style={{ justifyContent: "center" }}>
                  {mic.on && (
                    <span className="talkbar" aria-label="How much you have said">
                      <span style={{ width: `${Math.min(100, (turn.spokeMs / 1500) * 100)}%` }} />
                    </span>
                  )}
                  <button type="button" className="btn btn--gold btn--small" onClick={() => advance(idx)}>
                    Next ➜
                  </button>
                  <button type="button" className="btn btn--ghost btn--small" onClick={() => whisper(cur.i)} disabled={whispering}>
                    🆘 Help, Echo!
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="road" aria-hidden="true">
            <span className="road__bike" style={{ left: `calc(${progress * 100}% * 0.86)` }}>
              🚲
            </span>
            <span className="road__house">🏠</span>
          </div>
        </div>
      )}

      {phase === "done" && result && (
        <div className="two">
          <div className="card stack" data-enter>
            <h2>{result.solo ? "🌟 You delivered it SOLO!" : "📬 Delivered!"}</h2>
            <p className="big">
              {result.rescued === 0
                ? "You didn’t need a single whisper!"
                : `Echo whispered ${result.rescued} time${result.rescued > 1 ? "s" : ""} — and you kept going every time. That’s what real couriers do.`}
            </p>
            {result.voice != null && (
              <p>
                Your voice: <b>{describe.expression(result.voice)}</b>
                {result.voice < 0.3 ? " — that sounded a bit like reading. Next time, tell it like exciting news to a friend!" : " — it sounded like real telling. 🎉"}
              </p>
            )}
            <p className="muted">
              {st.rides < 5
                ? `Next ride: ${rideFor(st.rides).icon} ${rideFor(st.rides).name} — ${rideFor(st.rides).echo}`
                : "You’ve finished the Ride-Along ladder. From now on you ride solo, with Echo cheering from the post office."}
            </p>
            <ButterflyCheck
              question="How many butterflies did you feel?"
              value={feel}
              onPick={(n) => {
                setFeel(n);
                st.butterfly("after", n, "ride");
              }}
            />
          </div>
          <div className="card stack" data-enter>
            <h2>What next?</h2>
            <button type="button" className="btn btn--gold" onClick={() => setPhase("pick")}>
              🚲 Another ride
            </button>
            <Link to={`/deliver?parcel=${parcel.id}`} className="btn btn--ghost">
              📬 Deliver it to a REAL person
            </Link>
            <Link to="/bumpy-roads" className="btn btn--ghost">
              🕳️ Practise a Bumpy Road
            </Link>
          </div>
        </div>
      )}
      {phase === "pick" && st.rides === 0 && (
        <EchoSays mood="happy">On our first ride I’ll tell the middle part for you. We’re a team — you’re never alone on the road!</EchoSays>
      )}
    </Scene>
  );
}
