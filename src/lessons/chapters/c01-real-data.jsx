import { useEffect, useRef, useState } from 'react'
import { Code, Token, fly, shake } from '../kit'

/** Chapter 1 — Real Data Is Never Flat. Memory Catch: sort the scattered values into each person. */
const ITEMS = [
  { v: '"Python"', who: 'arjun' },
  { v: '16', who: 'meera' },
  { v: '"Arjun"', who: 'arjun' },
  { v: '"Data"', who: 'meera' },
  { v: '15', who: 'arjun' },
  { v: '"Meera"', who: 'meera' },
  { v: '"AI"', who: 'arjun' },
  { v: '"ML"', who: 'meera' },
]

function Game({ onWin }) {
  const [held, setHeld] = useState(null)
  const [placed, setPlaced] = useState({})
  const [msg, setMsg] = useState({ t: 'Tap a floating memory, then tap the chest it belongs in.' })
  const tokRefs = useRef({})
  const all = Object.keys(placed).length === ITEMS.length
  useEffect(() => {
    if (!all) return
    setMsg({ t: 'Every memory is home. One person, many connected values!', ok: true })
    onWin()
    // win once, when the last memory lands
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [all])
  const chestRefs = useRef({})

  const drop = (who) => {
    if (held === null) return setMsg({ t: 'Pick a memory first.' })
    const item = ITEMS[held]
    if (item.who !== who) {
      shake(chestRefs.current[who])
      return setMsg({
        t: `${item.v} doesn’t belong to ${who === 'arjun' ? 'Arjun' : 'Meera'}. Which person is it about?`,
        bad: true,
      })
    }
    const idx = held
    setHeld(null)
    fly(tokRefs.current[idx], chestRefs.current[who], item.v, () => {
      setPlaced((p) => ({ ...p, [idx]: who }))
      setMsg({ t: `Yes! ${item.v} is one of ${who === 'arjun' ? 'Arjun' : 'Meera'}’s memories.`, ok: true })
    })
  }

  return (
    <div className="board">
      <p className="board__hint">The glitch scattered these memories. Put each one back with its person.</p>
      <div className="tokens float">
        {ITEMS.map((it, i) =>
          placed[i] ? null : (
            <Token key={i} ref={(el) => (tokRefs.current[i] = el)} picked={held === i} onClick={() => setHeld(i)}>
              {it.v}
            </Token>
          ),
        )}
      </div>
      <div className="chests">
        {['arjun', 'meera'].map((who) => (
          <button
            key={who}
            type="button"
            className="chest"
            data-who={who}
            ref={(el) => (chestRefs.current[who] = el)}
            onClick={() => drop(who)}
          >
            <b>{who === 'arjun' ? 'Arjun’s memories' : 'Meera’s memories'}</b>
            <span className="chest__in">
              {ITEMS.map((it, i) =>
                placed[i] === who ? (
                  <span key={i} className="chip">
                    {it.v}
                  </span>
                ) : null,
              )}
            </span>
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
    who: 'arjun',
    mood: 'confused',
    line: 'My name, my age, my skills… they’re floating everywhere! How do we keep them together?',
    with: 'meera',
    reply: 'Real data is never just one value. Let’s group it.',
  },
  learn: (
    <>
      <div className="split">
        <div>
          <p>
            A contact app doesn’t store just a name. It stores{' '}
            <strong>many pieces of information about one person</strong>: name, age, phone, email, skills, history…
          </p>
          <p style={{ marginTop: 12 }}>
            As loose variables, nothing says these values belong together. That is <strong>flat data</strong>.
          </p>
        </div>
        <Code>{`# flat: separate values, no connection\nname = "Arjun"\nage = 15\nskill1 = "Python"\nskill2 = "AI"`}</Code>
      </div>
      <p className="note">
        Grouping related values into one structure keeps them connected. That is the first step to{' '}
        <strong>nested data</strong>.
      </p>
    </>
  ),
  game: (p) => <Game {...p} />,
  check: {
    q: 'Why is flat data a problem for an app with many users?',
    options: [
      'Nothing connects the values to the right person',
      'Python cannot store numbers',
      'Flat data is too fast',
    ],
    answer: 0,
    why: 'Without structure, you can’t tell which age or skill belongs to whom.',
  },
}
