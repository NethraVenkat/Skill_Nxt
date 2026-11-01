import { useRef, useState } from 'react'
import { Code, pop, shake } from '../kit'

/** Chapter 6 — List Indexing. Drawer Game: open the right numbered drawer. */
const DRAWERS = ['"ML"', '"Data"']
const ROUNDS = [
  { ask: 'Open the drawer that holds "Data".', want: 1 },
  { ask: 'Open Meera’s FIRST skill.', want: 0 },
]

function Game({ onWin }) {
  const [round, setRound] = useState(0)
  const [open, setOpen] = useState(null)
  const [msg, setMsg] = useState(null)
  const refs = useRef([])
  const r = ROUNDS[round]
  const pick = (i) => {
    if (!r) return
    setOpen(i)
    if (i === r.want) {
      pop(refs.current[i]?.querySelector('.drawer__in'))
      setMsg({ ok: true, t: `Yes! skills[${i}] is ${DRAWERS[i]}.` })
      setTimeout(() => {
        if (round + 1 === ROUNDS.length) onWin()
        setRound((x) => x + 1)
        setOpen(null)
      }, 1300)
    } else {
      shake(refs.current[i])
      setMsg({ bad: true, t: `That’s skills[${i}]. Remember: counting starts at 0.` })
    }
  }
  const tryThree = () => {
    shake(refs.current[1])
    setMsg({
      bad: true,
      t: 'IndexError: list index out of range — there is no drawer [2]. Two items means indexes 0 and 1.',
    })
  }
  return (
    <div className="board">
      <p className="board__hint">
        {r ? `Round ${round + 1}: ${r.ask}` : 'Both drawers found. You can count like Python now!'}
      </p>
      <div className="drawers">
        {DRAWERS.map((d, i) => (
          <button
            key={d}
            type="button"
            className="drawer"
            data-open={open === i || undefined}
            ref={(el) => (refs.current[i] = el)}
            onClick={() => pick(i)}
          >
            <span className="drawer__n">[{i}]</span>
            <span className="drawer__in">{open === i ? d : ' '}</span>
          </button>
        ))}
        <button type="button" className="drawer drawer--ghost" onClick={tryThree}>
          <span className="drawer__n">[2]</span>
          <span className="drawer__in">?</span>
        </button>
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
    who: 'meera',
    line: 'My skills are ["ML", "Data"]. Which number is "Data"?',
    with: 'arjun',
    reply: 'Two? …or is it one?',
  },
  learn: (
    <div className="split">
      <div>
        <p>
          A list is a row of numbered drawers. Python counts from <strong>0</strong>: the first item is index 0, the
          second is index 1.
        </p>
        <p className="note" style={{ marginTop: 16 }}>
          A list with 2 items has indexes <strong>0 and 1</strong> only. Asking for [2] or [3] is an{' '}
          <strong>IndexError</strong>.
        </p>
      </div>
      <Code>{`skills = ["ML", "Data"]\nskills[0]   # "ML"\nskills[1]   # "Data"`}</Code>
    </div>
  ),
  game: (p) => <Game {...p} />,
  check: {
    q: 'In ["Python", "AI"], what is at index 0?',
    options: ['"Python"', '"AI"', 'nothing — lists start at 1'],
    answer: 0,
    why: 'Index 0 is always the first item.',
  },
}
