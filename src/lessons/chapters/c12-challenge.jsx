import { useRef, useState } from 'react'
import { Code, shake } from '../kit'

/** Chapter 12 — Challenge Extension. The Tower Trials: three floors, each unlocks the next. */
const FLOORS = [
  {
    title: 'Floor 1 · Add a key',
    task: 'Give Arjun a grade: add "grade": 9 to user1.',
    options: ['database["user1"]["grade"] = 9', 'database["grade"] = 9', 'database["user1"].append(9)'],
    out: "{'name': 'Arjun', 'age': 15, 'skills': ['Python', 'AI'], 'grade': 9}",
    hint: 'The new key belongs inside user1’s dictionary.',
  },
  {
    title: 'Floor 2 · Build a function',
    task: 'Complete get_skill(database, user, index).',
    options: [
      'return database[user]["skills"][index]',
      'return database["skills"][index]',
      'return user["skills"][index]',
    ],
    out: "get_skill(database, 'user2', 1)  →  'Data'",
    hint: 'Same path as always: database → user → "skills" → index.',
  },
  {
    title: 'Floor 3 · Loop the city',
    task: 'Print every user’s name.',
    options: [
      'for user in database:\n    print(database[user]["name"])',
      'for name in database:\n    print(name)',
      'print(database["name"])',
    ],
    out: 'Arjun\nMeera',
    hint: 'The loop gives keys (user1, user2). Use each key to reach "name".',
  },
]

function Game({ onWin }) {
  const [solved, setSolved] = useState(0)
  const [msg, setMsg] = useState(null)
  const refs = useRef([])
  const f = FLOORS[solved]
  const pick = (i) => {
    if (i !== 0) {
      shake(refs.current[i])
      return setMsg({ bad: true, t: `Hint: ${f.hint}` })
    }
    setMsg({ ok: true, t: f.out })
    const n = solved + 1
    setTimeout(() => {
      setSolved(n)
      setMsg(null)
      if (n === FLOORS.length) onWin()
    }, 1400)
  }
  return (
    <div className="board tower-board">
      <div className="tower" aria-label={`${solved} of 3 floors unlocked`}>
        {[...FLOORS].reverse().map((fl, ri) => {
          const i = FLOORS.length - 1 - ri
          return (
            <div
              key={fl.title}
              className="tower__floor"
              data-state={i < solved ? 'done' : i === solved ? 'open' : 'locked'}
            >
              {i < solved ? '✓ ' : i > solved ? '🔒 ' : '▸ '}
              {fl.title}
            </div>
          )
        })}
        <div className="tower__base" />
      </div>
      <div className="tower__task">
        {f ? (
          <>
            <h3>{f.title}</h3>
            <p>{f.task}</p>
            <div className="fixes">
              {f.options.map((o, i) => (
                <button
                  key={o}
                  type="button"
                  className="check__opt"
                  ref={(el) => (refs.current[i] = el)}
                  onClick={() => pick(i)}
                >
                  <code>{o}</code>
                </button>
              ))}
            </div>
          </>
        ) : (
          <h3>🏆 The tower is yours. You extended, reused and looped the database.</h3>
        )}
        {msg &&
          (msg.ok ? (
            <Code>{msg.out ?? msg.t}</Code>
          ) : (
            <p className="board__msg" data-bad>
              {msg.t}
            </p>
          ))}
      </div>
    </div>
  )
}

export default {
  story: {
    who: 'teacher',
    line: 'Ready for the tower? Three floors. Each one uses something you already know.',
    with: 'meera',
    reply: 'Let’s climb!',
  },
  learn: (
    <div className="split">
      <ul style={{ display: 'grid', gap: 10, paddingLeft: 20, margin: 0 }}>
        <li>
          <strong>Extend</strong> a user with a new key
        </li>
        <li>
          <strong>Reuse</strong> an access path with a function
        </li>
        <li>
          <strong>Repeat</strong> for every user with a loop
        </li>
      </ul>
      <p className="note">Each floor unlocks the next. Wrong answers give a hint, never a penalty.</p>
    </div>
  ),
  game: (p) => <Game {...p} />,
  check: {
    q: 'Which line adds a new key to Meera’s profile?',
    options: [
      'database["user2"]["city"] = "Chennai"',
      'database.append("city")',
      'database["city"]["user2"] = "Chennai"',
    ],
    answer: 0,
    why: 'Assigning to a new key inside user2 adds it to her dictionary.',
  },
}
