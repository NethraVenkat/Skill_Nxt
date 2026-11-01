import { useEffect, useState, useRef } from "react";
import { lesson } from "./shared-lesson";
import { checks } from "./echo-checks";
const guide = [
  [
    "Your voice belongs here.",
    "Choose your route. Tell a partner what you will practise.",
  ],
  [
    "Try the same sentence in two voices.",
    "Say “The cat sat on the mat” stiffly, then like a friend.",
  ],
  [
    "Four steps make the mission clear.",
    "Point to the step where you speak, then explain why.",
  ],
  [
    "Listen for a conversation.",
    "Choose a delivery and explain what helped you follow it.",
  ],
  [
    "Three ideas become three reminders.",
    "Find a cat fact and turn it into a short cue.",
  ],
  [
    "Your note reminds you; your voice explains.",
    "Use “Sharp claws” to explain the climbing idea.",
  ],
  [
    "Watch the glance, then the explanation.",
    "Match the butterfly explanation to its reminder.",
  ],
  [
    "Read for meaning first.",
    "Find the dog sentence about helping people and objects.",
  ],
  [
    "Short reminders leave room for your voice.",
    "Shorten one full sentence without losing its idea.",
  ],
  [
    "Both partners deserve a speaking turn.",
    "Explain the speaker and listener jobs to each other.",
  ],
  [
    "Partner A: take your time.",
    "Explain your next cue without reading a full script.",
  ],
  [
    "Partner B: your turn matters too.",
    "Switch roles. Listen for one idea to remember.",
  ],
  [
    "A helpful comment changes the next attempt.",
    "Give a specific suggestion about explaining an idea.",
  ],
  [
    "Use one comment in a real repeat.",
    "Repeat the same message with one useful improvement.",
  ],
  [
    "A buddy and a note card can come with you.",
    "Choose support, then share with real listeners.",
  ],
  [
    "Listen for the message, not a score.",
    "Recall one idea and welcome every presenter equally.",
  ],
  [
    "Take these habits into your next talk.",
    "Explain what a note is for without reading the answer.",
  ],
  [
    "Choose a small step you can practise.",
    "Tell your teacher one manageable next goal.",
  ],
];
export default function EchoInteraction({ step }) {
  const opener = useRef(null),
    dialog = useRef(null);
  const [open, setOpen] = useState(false),
    [tab, setTab] = useState("guide"),
    [choice, setChoice] = useState(""),
    [revealed, setRevealed] = useState(false),
    [talking, setTalking] = useState(false);
  useEffect(() => {
    setOpen(false);
    setTab("guide");
    setChoice("");
    setRevealed(false);
    setTalking(false);
    window.speechSynthesis?.cancel();
  }, [step]);
  useEffect(() => () => window.speechSynthesis?.cancel(), []);
  useEffect(() => {
    if (!open) return;
    dialog.current?.querySelector("button")?.focus();
    const key = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        window.speechSynthesis?.cancel();
      }
      if (e.key === "Tab") {
        const items = [
          ...(dialog.current?.querySelectorAll(
            'button:not(:disabled),input,select,textarea,[tabindex="0"]',
          ) || []),
        ].filter((x) => x.offsetParent !== null);
        const first = items[0],
          last = items.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      opener.current?.focus();
    };
  }, [open]);
  function speak() {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(guide[step][0]);
    u.rate = 0.9;
    u.onend = () => setTalking(false);
    u.onerror = () => setTalking(false);
    setTalking(true);
    window.speechSynthesis.speak(u);
  }
  const questions = checks[step];
  const models = [
    "Today I will explain three ideas using short reminders.",
    "“The cat sat on the mat!” Try sharing it warmly, as if telling a friend.",
    "Notice the difference → make notes → practise speaking → share with a partner.",
    lesson.natural,
    lesson.catNotes.join(" · "),
    "“Sharp claws” is the reminder. “Cats have sharp claws they use for climbing” is one explanation.",
    lesson.butterflySpeech.join(" "),
    lesson.dog,
    lesson.dogIdeas.join(" · "),
    "The speaker explains. The listener remembers an idea. Then they switch roles.",
    "Dogs notice smells we miss. Police use dogs to help find people and objects.",
    "Now I speak from my own notes, while my partner listens for the message.",
    "“I learned that dogs help find people. Next time, explain your last idea a little more.”",
    "I will repeat the same message and explain that last idea more clearly.",
    "I can bring my three reminders and stand beside a buddy.",
    "“One idea I remember is that dogs can notice smells humans miss.”",
    lesson.habits[1],
    "My next goal: glance at a reminder, then look toward my listener and explain.",
  ];
  return (
    <>
      <button
        ref={opener}
        className={"echo-page-character " + (open ? "awake" : "")}
        onClick={() => setOpen(true)}
        aria-label="Ask Echo for this activity"
      >
        <img src="/art/echo-character.png" alt="Echo, your speaking buddy" />
        <span>Ask Echo ✦</span>
      </button>
      {open && (
        <div className="echo-overlay">
          <section
            ref={dialog}
            className="echo-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="echo-dialog-title"
          >
            <div className="echo-dialog-head">
              <img src="/art/echo-character.png" alt="Echo" />
              <div>
                <span className="eyebrow">YOUR PAGE COMPANION</span>
                <h2 id="echo-dialog-title">Let’s try it together.</h2>
              </div>
              <button
                className="btn soft"
                onClick={() => {
                  setOpen(false);
                  window.speechSynthesis?.cancel();
                }}
              >
                Close ×
              </button>
            </div>
            <div className="echo-tabs">
              {[
                ["guide", "Echo says"],
                ["try", "Try it"],
                ["check", "Check an idea"],
              ].map(([id, label]) => (
                <button
                  className={tab === id ? "selected" : ""}
                  key={id}
                  onClick={() => setTab(id)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="echo-tab-content">
              {tab === "guide" && (
                <>
                  <h3>{guide[step][0]}</h3>
                  <p>
                    This activity uses the same lesson facts. Take the support
                    you need.
                  </p>
                  <button className="btn" disabled={talking} onClick={speak}>
                    {talking ? "Echo is speaking…" : "Hear Echo ▷"}
                  </button>
                </>
              )}
              {tab === "try" && (
                <>
                  <h3>{guide[step][1]}</h3>
                  <button
                    className="btn soft"
                    onClick={() => setRevealed(!revealed)}
                  >
                    {revealed ? "Hide a model" : "Show a useful model"}
                  </button>
                  {revealed && <div className="echo-model">{models[step]}</div>}
                </>
              )}
              {tab === "check" && (
                <>
                  <h3>{questions[0]}</h3>
                  <div className="echo-check-options">
                    {questions[1].map((a) => (
                      <button
                        className={choice === a ? "selected" : ""}
                        key={a}
                        onClick={() => setChoice(a)}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                  {choice && (
                    <p className="echo-check-feedback" role="status">
                      {choice === questions[2]
                        ? "Yes. Now explain why to a listener."
                        : "Try again. Use the lesson facts or ask your teacher for help."}
                    </p>
                  )}
                </>
              )}
            </div>
            <p className="echo-footnote">
              No points or voice scoring. Your real speaking practice matters.
            </p>
          </section>
        </div>
      )}
    </>
  );
}
