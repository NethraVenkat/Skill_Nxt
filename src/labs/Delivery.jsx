import gsap from 'gsap'
import { useRef, useState } from 'react'
import { Code } from '../lessons/kit'

/** Food Delivery: items inside an order, orders inside a customer. A loop prints the receipt. */
const MENU = [
  { item: 'Dosa', price: 60, icon: '🫓' },
  { item: 'Idli', price: 40, icon: '🍚' },
  { item: 'Juice', price: 50, icon: '🧃' },
  { item: 'Pizza', price: 180, icon: '🍕' },
]

export function DeliveryLab({ onDone }) {
  const [items, setItems] = useState([])
  const [stage, setStage] = useState('build')
  const [printed, setPrinted] = useState(0)
  const scooter = useRef(null)
  const road = useRef(null)
  const total = items.reduce((s, i) => s + i.price, 0)
  const send = () => {
    setStage('riding')
    const w = road.current.clientWidth - 90
    gsap.fromTo(
      scooter.current,
      { x: 0 },
      {
        x: w,
        duration: 2.6,
        ease: 'power1.inOut',
        onComplete: () => {
          setStage('delivered')
          items.forEach((_, i) => setTimeout(() => setPrinted(i + 1), 350 * (i + 1)))
          onDone()
        },
      },
    )
  }
  const reset = () => {
    setItems([])
    setStage('build')
    setPrinted(0)
    gsap.set(scooter.current, { x: 0 })
  }
  return (
    <div className="lab-scene">
      <div className="lab-form">
        <div className="menu">
          {MENU.map((m) => (
            <button
              key={m.item}
              type="button"
              className="menu__item"
              onClick={() => stage === 'build' && setItems((v) => [...v, m])}
              disabled={stage !== 'build'}
            >
              <span>{m.icon}</span>
              {m.item} · ₹{m.price}
            </button>
          ))}
        </div>
        <Code>{`customer = {\n    "name": "Meera",\n    "orders": [\n        {"items": [${items.map((i) => `"${i.item}"`).join(', ')}], "to": "Anna Nagar"}\n    ]\n}\n\nfor item in customer["orders"][0]["items"]:\n    print(item)`}</Code>
        <div className="row">
          <button type="button" className="btn btn--sun" onClick={send} disabled={!items.length || stage !== 'build'}>
            Place order 🛵
          </button>
          <button type="button" className="btn btn--ghost" onClick={reset}>
            New order
          </button>
        </div>
      </div>
      <div className="delivery">
        <div className="lane" ref={road}>
          <span className="lane__shop">🏪</span>
          <span className="lane__home">🏠</span>
          <span className="scooter" ref={scooter} aria-hidden="true">
            🛵
          </span>
        </div>
        <div className="receipt" data-on={stage === 'delivered' || undefined}>
          <b>Receipt · Meera</b>
          <ul>
            {items.slice(0, printed).map((it, i) => (
              <li key={i}>
                <span>{it.item}</span>
                <span>₹{it.price}</span>
              </li>
            ))}
          </ul>
          {stage === 'delivered' && printed === items.length && (
            <p className="receipt__total">Total ₹{total} · Delivered!</p>
          )}
          {stage === 'build' && (
            <p>{items.length ? `${items.length} item(s) in the order` : 'Add items from the menu'}</p>
          )}
          {stage === 'riding' && <p>On the way…</p>}
        </div>
      </div>
    </div>
  )
}
