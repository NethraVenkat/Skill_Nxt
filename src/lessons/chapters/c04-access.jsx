import { useState } from 'react'
import { database } from '../../data/lessons'
import { Code } from '../kit'

/** Chapter 4 — Accessing Nested Values. Key Finder: build the path that reaches Meera's age. */
const KEYS = ['"user1"', '"user2"', '"name"', '"age"', '"skills"']

function Game({ onWin }) {
  const [path, setPath] = useState([])
  const [res, setRes] = useState(null)
  const add = (k) => path.length < 2 && setPath([...path, k])
  const run = () => {
    const [a, b] = path.map((p) => JSON.parse(p))
    const lvl1 = database[a]
    if (!lvl1) return setRes({ bad: true, t: `KeyError: ${path[0]} — the database has "user1" and "user2".` })
    const v = lvl1[b]
    if (v === undefined) return setRes({ bad: true, t: `KeyError: ${path[1]} isn’t a key inside ${path[0]}.` })
    const ok = a === 'user2' && b === 'age'
    setRes({ ok, t: `${JSON.stringify(v)}${ok ? '  ✓ Meera’s age!' : '  — real value, but not Meera’s age.'}` })
    if (ok) onWin()
  }
  return (
    <div className="board">
      <p className="board__hint">
        <b>Arjun:</b> “Meera, how old are you?” Find it in the database: choose two keys, then run.
      </p>
      <div className="tokens">
        {KEYS.map((k) => (
          <button
            key={k}
            type="button"
            className="tok"
            data-kind="key"
            onClick={() => add(k)}
            disabled={path.length >= 2}
          >
            {k}
          </button>
        ))}
      </div>
      <div className="expr">
        <code>
          database{path.map((p) => `[${p}]`).join('')}
          <span className="expr__caret">{path.length < 2 ? '[ ? ]' : ''}</span>
        </code>
        <button type="button" className="btn btn--run" onClick={run} disabled={path.length < 2}>
          ▶ Run
        </button>
        <button type="button" className="btn btn--ghost" onClick={() => (setPath([]), setRes(null))}>
          Clear
        </button>
      </div>
      {res && (
        <p className="board__msg" data-ok={res.ok || undefined} data-bad={res.bad || undefined} role="status">
          &gt;&gt;&gt; {res.t}
        </p>
      )}
    </div>
  )
}

export default {
  story: {
    who: 'arjun',
    mood: 'think',
    line: 'Meera’s age is in there somewhere. How do I get it out?',
    with: 'meera',
    reply: 'Ask for my user first, then my age.',
  },
  learn: (
    <div className="split">
      <div>
        <p>
          To reach a value, write the keys <strong>one after another</strong>, from the outside in. The first key picks
          the user; the second picks the detail.
        </p>
        <p className="note" style={{ marginTop: 16 }}>
          Keys are written as strings, in square brackets: <code>["user2"]</code>.
        </p>
      </div>
      <Code hl={'"age"'}>{`database["user2"]["age"]   # 16\ndatabase["user1"]["name"]  # "Arjun"`}</Code>
    </div>
  ),
  game: (p) => <Game {...p} />,
  check: {
    q: 'Which line gives Arjun’s name?',
    options: ['database["user1"]["name"]', 'database["name"]["user1"]', 'database["Arjun"]'],
    answer: 0,
    why: 'Outer key first ("user1"), then the inner key ("name").',
  },
}
