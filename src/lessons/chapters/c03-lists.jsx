import { useEffect, useRef, useState } from 'react'
import { Code, Token, fly, shake } from '../kit'

/** Chapter 3 — Lists Inside Dictionaries. Shelf Stacker: put Arjun's skills on his shelf, in order. */
const POOL = ['"AI"', '15', '"Python"', '"Arjun"']
const WANT = ['"Python"', '"AI"']

function Game({ onWin }) {
  const [shelf, setShelf] = useState([])
  const [held, setHeld] = useState(null)
  const [msg, setMsg] = useState({ t: 'Arjun’s skills are "Python" then "AI". Stack them on the skills shelf.' })
  const tok = useRef({})
  const full = shelf.length === WANT.length
  useEffect(() => {
    if (!full) return
    setMsg({ t: 'The list sits inside the dictionary: "skills": ["Python", "AI"]', ok: true })
    onWin()
    // win once, when the shelf is full
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [full])
  const slot = useRef([])
  const place = (i) => {
    if (held === null) return setMsg({ t: 'Pick a value first.' })
    const v = POOL[held]
    if (i !== shelf.length) return setMsg({ t: 'Fill the shelf from the left: slot [0] first.', bad: true })
    if (v !== WANT[i]) {
      shake(slot.current[i])
      return setMsg({
        t:
          v === '15' || v === '"Arjun"'
            ? `${v} isn’t a skill. Skills go in the list.`
            : `Order matters: slot [${i}] holds ${WANT[i]}.`,
        bad: true,
      })
    }
    const h = held
    setHeld(null)
    fly(tok.current[h], slot.current[i], v, () => {
      setShelf((s) => [...s, v])
    })
  }
  return (
    <div className="board">
      <p className="board__hint">One key, many values: the "skills" key holds a whole list.</p>
      <div className="tokens">
        {POOL.map((v, i) =>
          shelf.includes(v) ? null : (
            <Token
              key={v}
              ref={(el) => (tok.current[i] = el)}
              kind={v.startsWith('"') ? 'skill' : 'num'}
              picked={held === i}
              onClick={() => setHeld(i)}
            >
              {v}
            </Token>
          ),
        )}
      </div>
      <div className="shelf">
        <span className="shelf__key">"skills":</span>
        {WANT.map((_, i) => (
          <button
            key={i}
            type="button"
            className="shelf__slot"
            ref={(el) => (slot.current[i] = el)}
            onClick={() => place(i)}
          >
            <small>[{i}]</small>
            {shelf[i] ?? ' '}
          </button>
        ))}
      </div>
      <p className="board__msg" data-ok={msg.ok || undefined} data-bad={msg.bad || undefined} role="status">
        {msg.t}
      </p>
    </div>
  )
}

export default {
  story: {
    who: 'meera',
    line: 'I have more than one skill. Do I need a key for each?',
    with: 'teacher',
    reply: 'No — one key can hold a list.',
  },
  learn: (
    <div className="split">
      <div>
        <p>
          A value inside a dictionary can be a <strong>list</strong>. Lists keep several values{' '}
          <strong>in order</strong>.
        </p>
        <p className="note" style={{ marginTop: 16 }}>
          Dictionary → named by <strong>keys</strong>. List → ordered by <strong>position</strong>.
        </p>
      </div>
      <Code>{`database = {\n    "user1": {\n        "name": "Arjun",\n        "age": 15,\n        "skills": ["Python", "AI"]\n    }\n}`}</Code>
    </div>
  ),
  game: (p) => <Game {...p} />,
  check: {
    q: 'What type is the value of "skills"?',
    options: ['A list', 'A dictionary', 'A number'],
    answer: 0,
    why: 'Square brackets [ ] make a list: ["Python", "AI"].',
  },
}
