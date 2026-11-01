import { labs } from '../data/lessons'
import { DeliveryLab } from '../labs/Delivery'
import { InventoryLab } from '../labs/Inventory'
import { MusicLab } from '../labs/Music'
import { ReportLab } from '../labs/Report'
import { RobotLab } from '../labs/Robot'
import { useProgress } from '../state/progress'
import { World } from '../world/World'
import '../labs/labs.css'
import './pages.css'

/**
 * The Real-World Lab: five living examples built only from this module's ideas (nested
 * dictionaries, lists, access, append, functions, loops). Each one is a small working scene.
 */
const SCENES = {
  robot: {
    C: RobotLab,
    concepts: 'nested access · lists',
    lead: 'A blank bot knows nothing. Feed it a profile dictionary and it reads the values to greet you.',
  },
  music: {
    C: MusicLab,
    concepts: 'lists in dictionaries · append · indexing',
    lead: 'A playlist is a list inside a user. Add songs to the end; play one by its index.',
  },
  report: {
    C: ReportLab,
    concepts: 'nested dictionaries · functions · loops',
    lead: 'Marks are a dictionary inside a student. A function reads one mark; a loop fills the whole card.',
  },
  inventory: {
    C: InventoryLab,
    concepts: 'append · indexing · IndexError',
    lead: 'Every item you pick up is appended. Equip one by its index — but only indexes that exist.',
  },
  delivery: {
    C: DeliveryLab,
    concepts: 'lists of dictionaries · chained access · loops',
    lead: 'Items live inside an order, orders inside a customer. Place it and watch it ride.',
  },
}

export function Lab() {
  const { labs: done, completeLab } = useProgress()
  return (
    <div className="page">
      <header className="page__hero">
        <World tone="afternoon" archiveLit={0.7} />
        <div className="page__title">
          <p className="lesson__n" data-enter>
            {done.length} of {labs.length} experiments complete
          </p>
          <h1 data-enter>Real-World Lab</h1>
          <p data-enter>The same ideas you learned, running the apps you use every day.</p>
        </div>
      </header>
      {labs.map((l, i) => {
        const { C, concepts, lead } = SCENES[l.id]
        return (
          <section key={l.id} id={l.id} className="lab" style={{ '--c': l.color }} data-reveal>
            <header className="lab__head">
              <span className="lab__n">Experiment {i + 1}</span>
              <h2>
                {l.title} {done.includes(l.id) && <span className="lab__done">✓ done</span>}
              </h2>
              <p>{lead}</p>
              <p className="lab__concepts">Uses: {concepts}</p>
            </header>
            <C onDone={() => completeLab(l.id)} />
          </section>
        )
      })}
    </div>
  )
}
