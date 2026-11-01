import { useEffect, useState } from 'react'
import { Character } from '../../cast/Character'
import { database } from '../../data/lessons'
import { Code } from '../kit'

/** Chapter 11 — Looping Through Users. The Citizens' Parade: each loop step, one citizen steps out. */
const USERS = Object.entries(database)
const FACE = { user1: 'arjun', user2: 'meera' }

function Game({ onWin }) {
  const [step, setStep] = useState(-1)
  const [auto, setAuto] = useState(false)
  const done = step >= USERS.length - 1
  useEffect(() => {
    if (!auto || done) return
    const t = setTimeout(() => setStep((s) => s + 1), 1100)
    return () => clearTimeout(t)
  }, [auto, step, done])
  useEffect(() => {
    if (done) onWin()
    // win once the loop has visited every user
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done])
  const line = step < 0 ? null : step >= USERS.length ? null : USERS[step]
  return (
    <div className="board">
      <p className="board__hint">Step through the loop. Each time round, `user` takes the next key.</p>
      <div className="split">
        <div>
          <Code>{`for user in database:\n    print(database[user]["name"])`}</Code>
          <div className="loopvar" aria-live="polite">
            {line ? (
              <>
                user = <b>"{line[0]}"</b>
              </>
            ) : (
              'user = ?'
            )}
          </div>
          <div className="builder-row">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => setStep((s) => Math.min(s + 1, USERS.length - 1))}
              disabled={done}
            >
              Next step ▸
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => (setStep(-1), setAuto(true))}>
              ▶ Play the parade
            </button>
          </div>
        </div>
        <div className="parade">
          {USERS.map(([key, u], i) => (
            <div key={key} className="parade__slot" data-out={step >= i || undefined}>
              {step >= i && (
                <Character id={FACE[key]} say={u.name} height={210} crop={0.6} mood={step === i ? 'happy' : 'idle'} />
              )}
            </div>
          ))}
        </div>
      </div>
      <pre className="term" aria-label="Output">
        {USERS.slice(0, step + 1)
          .map(([, u]) => u.name)
          .join('\n') || '(output appears here)'}
      </pre>
      {done && (
        <p className="board__msg" data-ok>
          The loop visited every user — and it would work for 2 users or 200.
        </p>
      )}
    </div>
  )
}

export default {
  story: {
    who: 'arjun',
    line: 'What if the city had a hundred citizens? Do I write a hundred print lines?',
    with: 'teacher',
    reply: 'One loop visits them all.',
  },
  learn: (
    <div className="split">
      <div>
        <p>
          <code>for user in database:</code> goes through the database <strong>one key at a time</strong>. Inside the
          loop, <code>user</code> is "user1", then "user2"…
        </p>
        <p className="note" style={{ marginTop: 16 }}>
          Use the loop variable as a key: <code>database[user]["name"]</code>
        </p>
      </div>
      <Code>{`for user in database:\n    print(database[user]["name"])\n# Arjun\n# Meera`}</Code>
    </div>
  ),
  game: (p) => <Game {...p} />,
  check: {
    q: 'In the loop, what is `user` the first time round?',
    options: ['"user1"', '"Arjun"', 'the whole dictionary'],
    answer: 0,
    why: 'Looping over a dictionary gives its keys.',
  },
}
