import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { GLOWS, RECEIVERS } from "../data/content";
import { stampsOf, useStore } from "../state/store";
import { ButterflyCheck, EchoSays, Scene, confetti } from "../ui/kit";
import { pickParcel, useParcels } from "./parcels";
import "./post.css";

/** A stable shuffle, so the slip doesn't jump around while the receiver taps. */
const mix = (arr, seed) =>
  arr
    .map((x, i) => ({ x, k: Math.sin(seed * 99 + i * 7.3) }))
    .sort((a, b) => a.k - b.k)
    .map((o) => o.x);

export function Deliver() {
  const st = useStore();
  const [params] = useSearchParams();
  const parcels = useParcels();
  const [parcelId, setParcelId] = useState(params.get("parcel"));
  const parcel = pickParcel(parcels, parcelId);
  const [kind, setKind] = useState(params.get("kind") ?? "family");
  const [names, setNames] = useState(["", ""]);
  const [count, setCount] = useState(4);
  const [step, setStep] = useState("who"); // who, tell, slip, again, reply, sign, done
  const [picked, setPicked] = useState([]);
  const [remember, setRemember] = useState("");
  const [understood, setUnderstood] = useState(null);
  const [rephrased, setRephrased] = useState(false);
  const [question, setQuestion] = useState("");
  const [answered, setAnswered] = useState(false);
  const [glow, setGlow] = useState(null);
  const [before, setBefore] = useState(null);
  const [after, setAfter] = useState(null);
  const [outcome, setOutcome] = useState(null);
  const receiver = RECEIVERS.find((r) => r.id === kind);
  const letter = parcel?.letter;
  const options = useMemo(() => (letter ? mix([...letter.notes, ...letter.decoys], letter.id.length) : []), [letter]);

  if (!parcel)
    return (
      <Scene kicker="Deliver" title="📬 Deliver a message" sub="Tell your message to a real person.">
        <div className="card stack" data-enter>
          <p className="big">Your bag is empty! Pack a letter (or today’s postcard) first.</p>
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

  const multi = kind === "group" || kind === "class";
  const toName = kind === "two" ? names.map((n) => n.trim()).filter(Boolean).join(" & ") : names[0].trim();
  const whoReady = kind === "two" ? names[0].trim() && names[1].trim() : names[0].trim();
  const me = st.name || "your courier";
  const arrived = letter ? picked.filter((p) => letter.notes.includes(p)).length : (understood ?? 0);
  const missed = letter ? letter.notes.map((n, i) => (picked.includes(n) ? null : i)).filter((i) => i != null) : [];
  const wrong = letter ? picked.filter((p) => !letter.notes.includes(p)).length : 0;

  const finish = () => {
    const isNew = !stampsOf(st).includes(kind);
    st.deliver({
      parcel: parcel.id,
      topic: parcel.topic,
      kind,
      to: toName,
      count: multi ? count : kind === "two" ? 2 : 1,
      arrived,
      rephrased,
      answered,
      glow,
    });
    if (parcel.id === "postcard") st.postcardDone();
    setOutcome({ isNew });
    setStep("done");
    confetti();
  };

  return (
    <Scene
      kicker={`Delivery · ${parcel.icon} ${parcel.title}`}
      title="📬 Deliver a message"
      sub="Tell your message to a real person. They’ll show you what really arrived — that’s how you know you communicated."
    >
      <ol className="steps5" data-enter aria-label="Delivery steps">
        {[
          ["who", "👤", "Receiver"],
          ["tell", "🗣️", "Tell"],
          ["slip", "✍️", "What arrived?"],
          ["reply", "❓", "Reply"],
          ["sign", "🖊️", "Sign"],
        ].map(([id, icon, label], i, all) => {
          const order = ["who", "tell", "slip", "again", "reply", "sign", "done"];
          const at = order.indexOf(step === "again" ? "slip" : step);
          const mine = order.indexOf(id);
          return (
            <li key={id} data-now={mine === at || undefined} data-done={mine < at || undefined} aria-label={`Step ${i + 1} of ${all.length}: ${label}`}>
              <span>{icon}</span> {label}
            </li>
          );
        })}
      </ol>

      {step === "who" && (
        <div className="two">
          <div className="card stack" data-enter>
            <h2>Who will receive it?</h2>
            <div className="chips">
              {RECEIVERS.filter((r) => r.id !== "echo").map((r) => (
                <button key={r.id} type="button" className="chip" aria-pressed={kind === r.id} onClick={() => setKind(r.id)}>
                  {r.icon} {r.name}
                </button>
              ))}
            </div>
            <p className="muted">{receiver.who}</p>
            <label className="namefield">
              {multi ? "Name for this group (e.g. My cousins, Class 4B)" : kind === "two" ? "First receiver’s name" : "Receiver’s name"}
              <input value={names[0]} maxLength={30} onChange={(e) => setNames([e.target.value, names[1]])} placeholder={multi ? "e.g. Class 4B" : "e.g. Amma"} />
            </label>
            {kind === "two" && (
              <label className="namefield">
                Second receiver’s name
                <input value={names[1]} maxLength={30} onChange={(e) => setNames([names[0], e.target.value])} placeholder="e.g. Appa" />
              </label>
            )}
            {multi && (
              <label className="namefield" style={{ maxWidth: 200 }}>
                How many people?
                <input type="number" min={3} max={60} value={count} onChange={(e) => setCount(Math.max(3, Math.min(60, +e.target.value || 3)))} />
              </label>
            )}
            {parcels.length > 1 && (
              <>
                <p className="invite__q">Parcel:</p>
                <div className="chips">
                  {parcels.map((p) => (
                    <button key={p.id} type="button" className="chip" aria-pressed={p.id === parcel.id} onClick={() => setParcelId(p.id)}>
                      {p.icon} {p.title}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="card stack" data-enter>
            <ButterflyCheck
              value={before}
              onPick={(n) => {
                setBefore(n);
                st.butterfly("before", n, "deliver");
              }}
            />
            <p>
              {kind === "class" ? "📢 The Class Bulletin is the biggest delivery. Only when YOU feel ready — never because someone said so." : "Butterflies? Totally normal. Remember: you’re not performing — you’re just delivering a message."}
            </p>
            <button type="button" className="btn btn--gold" disabled={!whoReady} onClick={() => setStep("tell")}>
              🎒 I’m ready — open my bag
            </button>
          </div>
        </div>
      )}

      {(step === "tell" || step === "again") && (
        <div className="tell" data-enter>
          <p className="tell__to">
            To: <b>{toName}</b> {receiver.icon}
          </p>
          {step === "again" && <p className="big tell__again">🔁 Some ideas didn’t arrive. Say them ANOTHER way — use different words, an example, or slow down.</p>}
          <div className="cards3">
            {parcel.notes.map((n, i) => (
              <div key={i} className="ncard" data-glow={(step === "again" && missed.includes(i)) || undefined} data-said={(step === "again" && !missed.includes(i)) || undefined}>
                <i>{i + 1}</i>
                {n}
              </div>
            ))}
          </div>
          <ul className="tell__tips">
            <li>👀 Glance at a note → look UP at {toName || "them"} → tell it.</li>
            <li>😊 Tell it like news you’re excited about — not like reading.</li>
            <li>🐢 Not too fast. A little breath between ideas.</li>
          </ul>
          <button
            type="button"
            className="btn btn--gold"
            onClick={() => {
              if (step === "again") setRephrased(true);
              setPicked([]);
              setUnderstood(null);
              setStep("slip");
            }}
          >
            ✅ I’ve told it — hand the device to {toName || "them"} ➜
          </button>
        </div>
      )}

      {step === "slip" && (
        <div className="slip" data-enter>
          <p className="slip__hi">
            Hi {toName}! 👋 {me} just delivered a message to you.
          </p>
          {letter ? (
            <>
              <h2>Tap everything you heard about {letter.topic}:</h2>
              <p className="muted">Some of these were NOT in the message — only tap what you really heard.</p>
              <div className="slip__grid">
                {options.map((o) => (
                  <button key={o} type="button" className="chip chip--big" aria-pressed={picked.includes(o)} onClick={() => setPicked((v) => (v.includes(o) ? v.filter((x) => x !== o) : [...v, o]))}>
                    {picked.includes(o) ? "✔ " : ""}
                    {o}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2>What did you understand?</h2>
              <label className="namefield">
                One thing I remember:
                <input value={remember} onChange={(e) => setRemember(e.target.value)} placeholder="Type one thing you heard" />
              </label>
              <div className="chips">
                {[
                  [3, "😃 All of it"],
                  [2, "🙂 Most of it"],
                  [1, "🤔 A little bit"],
                ].map(([n, t]) => (
                  <button key={n} type="button" className="chip" aria-pressed={understood === n} onClick={() => setUnderstood(n)}>
                    {t}
                  </button>
                ))}
              </div>
            </>
          )}
          <div className="row">
            <button type="button" className="btn btn--gold" disabled={letter ? picked.length === 0 : !understood || !remember.trim()} onClick={() => setStep(arrived < 3 && !rephrased ? "again" : "reply")}>
              ✍️ Done
            </button>
            <button type="button" className="btn btn--ghost btn--small" onClick={() => setStep("again")}>
              🔁 Please say it another way
            </button>
          </div>
          {letter && arrived < 3 && !rephrased && picked.length > 0 && <small className="muted">The courier will get a chance to say the missing ideas another way.</small>}
          {letter && wrong > 0 && <small className="muted">(Tip for the courier: {wrong} thing{wrong > 1 ? "s" : ""} the receiver “heard” weren’t in the message. Be extra clear!)</small>}
        </div>
      )}

      {step === "reply" && (
        <div className="slip" data-enter>
          <p className="slip__hi">✉️ A reply letter! {toName}, ask {me} one question:</p>
          {letter && (
            <button type="button" className="chip chip--big" aria-pressed={question === letter.ask} onClick={() => setQuestion(letter.ask)}>
              ❓ {letter.ask}
            </button>
          )}
          <label className="namefield">
            …or your own question
            <input value={question === letter?.ask ? "" : question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask anything about the message" />
          </label>
          <p>Ask it out loud. Then {me} answers — on the spot, no notes needed!</p>
          <div className="row">
            <button type="button" className="btn btn--gold" disabled={!question.trim()} onClick={() => (setAnswered(true), setStep("sign"))}>
              👍 They answered!
            </button>
            <button type="button" className="btn btn--ghost btn--small" onClick={() => setStep("sign")}>
              Skip the question
            </button>
          </div>
        </div>
      )}

      {step === "sign" && (
        <div className="slip" data-enter>
          <p className="slip__hi">🖊️ Sign the delivery slip</p>
          <p className="big">
            Message arrived: {"✉️".repeat(arrived)}
            {"▫️".repeat(3 - arrived)} {arrived}/3
          </p>
          <h2>One thing {me} did really well:</h2>
          <div className="chips">
            {GLOWS.map((g) => (
              <button key={g} type="button" className="chip" aria-pressed={glow === g} onClick={() => setGlow(g)}>
                {g}
              </button>
            ))}
          </div>
          <button type="button" className="btn btn--gold" disabled={!glow} onClick={finish}>
            🖊️ Signed — by {toName}
          </button>
        </div>
      )}

      {step === "done" && outcome && (
        <div className="two">
          <div className="card stack delivered" data-enter>
            {outcome.isNew && (
              <div className="wax" style={{ "--c": receiver.color }}>
                <span>{receiver.icon}</span>
                <small>{receiver.name}</small>
              </div>
            )}
            <h2>{outcome.isNew ? "🛂 New passport stamp!" : "📬 Delivered!"}</h2>
            <p className="big">
              {arrived === 3 ? "Your whole message arrived — every idea!" : `${arrived} of 3 ideas arrived.`} {rephrased && "And you said it another way when you needed to — that’s real communication."}
            </p>
            <p>
              {toName} says: <b>“{glow}”</b>
            </p>
            <ButterflyCheck
              question="And now — how many butterflies?"
              value={after}
              onPick={(n) => {
                setAfter(n);
                st.butterfly("after", n, "deliver");
              }}
            />
          </div>
          <div className="card stack" data-enter>
            <h2>What next?</h2>
            <Link to="/passport" className="btn btn--gold">
              🛂 See my Passport
            </Link>
            <Link to="/mailbag" className="btn btn--ghost">
              📬 Pack another letter
            </Link>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => {
                setStep("who");
                setNames(["", ""]);
                setPicked([]);
                setRephrased(false);
                setAnswered(false);
                setQuestion("");
                setGlow(null);
                setBefore(null);
                setAfter(null);
              }}
            >
              🔁 Deliver it to someone else
            </button>
          </div>
        </div>
      )}
      {step === "who" && <EchoSays mood="happy">Couriers don’t worry about looking perfect. They only care about one thing: did the message arrive?</EchoSays>}
    </Scene>
  );
}
