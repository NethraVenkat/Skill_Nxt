import gsap from 'gsap'
import { useRef, useState } from 'react'
import { database } from '../../data/lessons'
import { Code } from '../kit'

/** Chapter 10 — Functions: get_skill(). The Skill Machine: arguments in, a skill out. */
function Game({ onWin }) {
  const [user, setUser] = useState('user2')
  const [index, setIndex] = useState(1)
  const [out, setOut] = useState(null)
  const [runs, setRuns] = useState(0)
  const gears = useRef(null)
  const run = () => {
    gsap.fromTo(gears.current, { rotate: 0 }, { rotate: 360, duration: 0.9, ease: 'power2.inOut' })
    const list = database[user].skills
    const res =
      index < list.length
        ? { ok: true, t: `'${list[index]}'` }
        : {
            bad: true,
            t: `IndexError: ${database[user].name} has ${list.length} skills (indexes 0–${list.length - 1})`,
          }
    setTimeout(() => {
      setOut(res)
      if (res.ok) {
        const n = runs + 1
        setRuns(n)
        if (n === 2) onWin()
      }
    }, 800)
  }
  return (
    <div className="board">
      <p className="board__hint">Feed the machine two arguments. It runs the same path every time.</p>
      <div className="machine">
        <div className="machine__in">
          <label>
            user
            <select value={user} onChange={(e) => setUser(e.target.value)}>
              <option value="user1">"user1"</option>
              <option value="user2">"user2"</option>
            </select>
          </label>
          <label>
            index
            <select value={index} onChange={(e) => setIndex(Number(e.target.value))}>
              {[0, 1, 2].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <button type="button" className="btn btn--run" onClick={run}>
            ⚙ Run get_skill
          </button>
        </div>
        <div className="machine__box">
          <svg ref={gears} viewBox="0 0 100 100" width="96" height="96" aria-hidden="true">
            <circle cx="50" cy="50" r="30" fill="#f4a62a" />
            {Array.from({ length: 8 }, (_, i) => (
              <rect
                key={i}
                x="45"
                y="8"
                width="10"
                height="18"
                rx="3"
                fill="#f4a62a"
                transform={`rotate(${i * 45} 50 50)`}
              />
            ))}
            <circle cx="50" cy="50" r="11" fill="#fff" />
          </svg>
          <code>
            get_skill(database, "{user}", {index})
          </code>
        </div>
        <div
          className="machine__out"
          data-ok={out?.ok || undefined}
          data-bad={out?.bad || undefined}
          aria-live="polite"
        >
          {out ? out.t : 'output'}
        </div>
      </div>
      <p className="board__msg">
        {runs >= 2 ? 'One function, many inputs: that is reuse!' : `Successful runs: ${runs} / 2`}
      </p>
    </div>
  )
}

export default {
  story: {
    who: 'meera',
    line: 'Writing database[...]["skills"][...] again and again is tiring.',
    with: 'teacher',
    reply: 'Then put the path in a function.',
  },
  learn: (
    <div className="split">
      <div>
        <p>
          A <strong>function</strong> packs a piece of code under a name. Its <strong>parameters</strong> are the parts
          that change; <code>return</code> sends the answer back.
        </p>
        <p className="note" style={{ marginTop: 16 }}>
          Write the access path once, use it for any user and any index.
        </p>
      </div>
      <Code>{`def get_skill(database, user, index):\n    return database[user]["skills"][index]\n\nprint(get_skill(database, "user2", 1))   # Data`}</Code>
    </div>
  ),
  game: (p) => <Game {...p} />,
  check: {
    q: 'What does get_skill(database, "user1", 0) return?',
    options: ['"Python"', '"AI"', '"Arjun"'],
    answer: 0,
    why: 'user1’s skills are ["Python", "AI"]; index 0 is "Python".',
  },
}
