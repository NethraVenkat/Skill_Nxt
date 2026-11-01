import { useRef, useState } from 'react'
import { Character } from '../cast/Character'
import { Code, fly, shake } from '../lessons/kit'

/** Game Inventory: picking up an item appends it; equipping uses an index (mind the range). */
const WORLD_ITEMS = [
  { id: 'map', icon: '🗺️' },
  { id: 'torch', icon: '🔦' },
  { id: 'key', icon: '🗝️' },
  { id: 'shield', icon: '🛡️' },
]

export function InventoryLab({ onDone }) {
  const [inv, setInv] = useState([])
  const [idx, setIdx] = useState(0)
  const [eq, setEq] = useState(null)
  const [err, setErr] = useState(null)
  const bag = useRef(null)
  const itemRefs = useRef({})
  const hero = useRef(null)
  const pick = (it) => {
    fly(itemRefs.current[it.id], bag.current, it.icon, () => setInv((v) => [...v, it]))
  }
  const equip = () => {
    if (idx < 0 || idx >= inv.length) {
      shake(hero.current)
      return setErr(
        inv.length
          ? `IndexError: inventory has ${inv.length} items (indexes 0–${inv.length - 1})`
          : 'IndexError: the inventory is empty — pick something up first',
      )
    }
    setErr(null)
    setEq(inv[idx])
    onDone()
  }
  return (
    <div className="lab-scene">
      <div className="lab-form">
        <p>Click items in the world to pick them up.</p>
        <div className="world-items">
          {WORLD_ITEMS.filter((it) => !inv.includes(it)).map((it) => (
            <button
              key={it.id}
              type="button"
              className="witem"
              ref={(el) => (itemRefs.current[it.id] = el)}
              onClick={() => pick(it)}
              aria-label={`Pick up ${it.id}`}
            >
              {it.icon}
            </button>
          ))}
        </div>
        <Code>{`player = {"name": "Arjun", "inventory": [${inv.map((i) => `"${i.id}"`).join(', ')}]}\n\nplayer["inventory"].append(item)   # pick up\nplayer["inventory"][${idx}]          # equip`}</Code>
      </div>
      <div className="hero-scene">
        <div ref={hero} className="hero-scene__who">
          <Character
            id="arjun"
            height={260}
            crop={0.6}
            mood={eq ? 'happy' : 'idle'}
            say={err ?? (eq ? `Equipped the ${eq.id}! ${eq.icon}` : undefined)}
          />
        </div>
        <div className="bag" ref={bag}>
          <b>"inventory"</b>
          <div>
            {inv.map((it, i) => (
              <span key={it.id} className="bag__slot">
                <small>[{i}]</small>
                {it.icon}
              </span>
            ))}
            {!inv.length && <em>empty</em>}
          </div>
        </div>
        <div className="row">
          <label>
            index{' '}
            <input type="number" value={idx} onChange={(e) => setIdx(Number(e.target.value))} style={{ width: 80 }} />
          </label>
          <button type="button" className="btn btn--sun" onClick={equip}>
            Equip
          </button>
        </div>
      </div>
    </div>
  )
}
