import { useRef, useState } from 'react'
import { Code, shake } from '../kit'

/**
 * Chapter 8 — Bug Hunt. The four bugs of the lesson, each a small gremlin breaking the Archive.
 * Choose the right fix and the gremlin turns friendly; a wrong fix gets a hint about that bug.
 */
const BUGS = [
  {
    name: 'Comma Gremlin',
    broken: 'database["user1"] = {\n    "name": "Arjun"\n    "age": 15\n}',
    error: 'SyntaxError: invalid syntax',
    fixes: ['Add a comma after "Arjun"', 'Remove the quotes around Arjun', 'Change { } to [ ]'],
    hint: 'Every key–value pair needs a comma before the next one. Look at the end of the "name" line.',
    fixed: 'database["user1"] = {\n    "name": "Arjun",\n    "age": 15\n}',
  },
  {
    name: 'Capital Goblin',
    broken: 'print(database["user1"]["Name"])',
    error: "KeyError: 'Name'",
    fixes: ['Use "name" in lowercase', 'Remove the quotes: [Name]', 'Use database["Name"]'],
    hint: 'Keys are case-sensitive. The key was written as "name".',
    fixed: 'print(database["user1"]["name"])',
  },
  {
    name: 'Index Ghost',
    broken: 'print(database["user2"]["skills"][3])',
    error: 'IndexError: list index out of range',
    fixes: ['Use an index that exists: 0 or 1', 'Use index 2', 'Use "3" in quotes'],
    hint: 'Meera has 2 skills, so only indexes 0 and 1 exist.',
    fixed: 'print(database["user2"]["skills"][1])',
  },
  {
    name: 'Append Imp',
    broken: 'database["user1"]["skills"].Append("Web")',
    error: "AttributeError: 'list' object has no attribute 'Append'",
    fixes: ['Use .append() in lowercase', 'Use .add()', 'Use .push()'],
    hint: 'Python method names are case-sensitive: the list method is append.',
    fixed: 'database["user1"]["skills"].append("Web")',
  },
]

function Gremlin({ fixed }) {
  return (
    <svg viewBox="0 0 120 110" className="gremlin" data-fixed={fixed || undefined} aria-hidden="true">
      <path d="M42 30 Q34 14 26 8 M78 30 Q86 14 94 8" fill="none" stroke="#14213d" strokeWidth="3" strokeLinecap="round" />
      <circle cx="26" cy="8" r="6" fill={fixed ? '#ffd166' : '#ff9f43'} />
      <circle cx="94" cy="8" r="6" fill={fixed ? '#ffd166' : '#ff9f43'} />
      <ellipse cx="60" cy="62" rx="44" ry="40" fill={fixed ? '#5cc06c' : '#ff8a7a'} />
      <ellipse cx="44" cy="54" rx="11" ry="12" fill="#fff" />
      <ellipse cx="76" cy="54" rx="11" ry="12" fill="#fff" />
      <circle cx={fixed ? 44 : 46} cy="56" r="5" fill="#14213d" />
      <circle cx={fixed ? 76 : 74} cy="56" r="5" fill="#14213d" />
      {fixed ? (
        <path d="M42 76 Q60 92 78 76" fill="none" stroke="#14213d" strokeWidth="4" strokeLinecap="round" />
      ) : (
        <>
          <path d="M36 40 L52 44 M84 40 L68 44" stroke="#14213d" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M48 82 Q60 76 72 82" fill="none" stroke="#14213d" strokeWidth="4" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

function Game({ onWin }) {
  const [fixed, setFixed] = useState([])
  const [open, setOpen] = useState(0)
  const [msg, setMsg] = useState(null)
  const opts = useRef([])
  const bug = BUGS[open]
  const isFixed = fixed.includes(open)
  const choose = (i) => {
    if (isFixed) return
    if (i === 0) {
      const n = [...fixed, open]
      setFixed(n)
      setMsg({ ok: true, t: `${bug.name} is friendly now! The code runs.` })
      if (n.length === BUGS.length) onWin()
    } else {
      shake(opts.current[i])
      setMsg({ bad: true, t: `Hint: ${bug.hint}` })
    }
  }
  return (
    <div className="board">
      <div className="alarm" data-clear={fixed.length === BUGS.length || undefined} role="status">
        {fixed.length === BUGS.length
          ? '✓ ARCHIVE REPAIRED — all four gremlins are friendly'
          : `⚠ SYSTEM ALERT: ${BUGS.length - fixed.length} bug${BUGS.length - fixed.length > 1 ? 's' : ''} in the Archive`}
      </div>
      <div className="gremlins">
        {BUGS.map((b, i) => (
          <button
            key={b.name}
            type="button"
            className="gremlin-card"
            aria-pressed={open === i}
            onClick={() => (setOpen(i), setMsg(null))}
          >
            <Gremlin fixed={fixed.includes(i)} />
            <span>{b.name}</span>
          </button>
        ))}
      </div>
      <div className="split">
        <div>
          <Code>{isFixed ? bug.fixed : bug.broken}</Code>
          <p className="errline" data-fixed={isFixed || undefined}>
            {isFixed ? '✓ runs without errors' : bug.error}
          </p>
        </div>
        <div className="fixes">
          <p>
            <b>How do you fix it?</b>
          </p>
          {bug.fixes.map((f, i) => (
            <button
              key={f}
              type="button"
              className="check__opt"
              ref={(el) => (opts.current[i] = el)}
              onClick={() => choose(i)}
              data-state={isFixed && i === 0 ? 'right' : undefined}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      {msg && (
        <p className="board__msg" data-ok={msg.ok || undefined} data-bad={msg.bad || undefined} role="status">
          {msg.t}
        </p>
      )}
    </div>
  )
}

export default {
  story: {
    who: 'teacher',
    mood: 'think',
    line: 'Four gremlins got into the Archive. Each one is a tiny mistake. Read the error message, it tells you where to look.',
    with: 'arjun',
    reply: 'Bug hunting time!',
  },
  learn: (
    <div className="split">
      <ul style={{ display: 'grid', gap: 10, paddingLeft: 20, margin: 0 }}>
        <li>
          <strong>Missing comma</strong> between key–value pairs → SyntaxError
        </li>
        <li>
          <strong>Case sensitivity</strong>: "Name" ≠ "name" → KeyError
        </li>
        <li>
          <strong>Index out of range</strong>: skills[3] on a 2-item list → IndexError
        </li>
        <li>
          <strong>Method naming</strong>: .Append() ≠ .append() → AttributeError
        </li>
      </ul>
      <p className="note">
        Errors are clues, not failures. The <strong>name</strong> of the error tells you what kind of mistake it is.
      </p>
    </div>
  ),
  game: (p) => <Game {...p} />,
  check: {
    q: "You see KeyError: 'Name'. What is the most likely bug?",
    options: ['The key’s capital letter doesn’t match', 'A missing comma', 'The list is too short'],
    answer: 0,
    why: 'A KeyError means that exact key isn’t there — keys are case-sensitive.',
  },
}
