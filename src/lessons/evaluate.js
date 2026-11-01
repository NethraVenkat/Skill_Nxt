import { database } from '../data/lessons'

/**
 * Evaluates a Python access expression such as database["user2"]["skills"][1] against a data
 * structure, step by step, and reports every stop on the way (for the flight) or the exact error
 * Python would raise (KeyError, IndexError, TypeError).
 */
export function evaluate(src, db = database) {
  const m = src.trim().match(/^database((\[\s*(?:"[^"]*"|'[^']*'|-?\d+)\s*\])+)$/)
  if (!m)
    return {
      error: 'SyntaxError: start with database and use [ ] for each step, e.g. database["user1"]["name"]',
      stops: [],
    }
  const steps = [...m[1].matchAll(/\[\s*("[^"]*"|'[^']*'|-?\d+)\s*\]/g)].map((x) => x[1])
  let cur = db
  const stops = [{ label: 'database', kind: 'root' }]
  for (const raw of steps) {
    const isNum = /^-?\d+$/.test(raw)
    const key = isNum ? Number(raw) : raw.slice(1, -1)
    if (Array.isArray(cur)) {
      if (!isNum) return { stops, error: `TypeError: list indices must be integers, not str (${raw})` }
      if (key >= cur.length || key < -cur.length)
        return { stops, error: `IndexError: list index ${key} is out of range (this list has ${cur.length} items)` }
      cur = cur.at(key)
      stops.push({ label: `[${key}]`, kind: 'index' })
    } else if (cur && typeof cur === 'object') {
      if (isNum || !(key in cur)) return { stops, error: `KeyError: ${raw}` }
      cur = cur[key]
      stops.push({ label: `"${key}"`, kind: Array.isArray(cur) ? 'list' : typeof cur === 'object' ? 'dict' : 'key' })
    } else return { stops, error: `TypeError: ${JSON.stringify(cur)} has no keys or indexes` }
  }
  return { stops, value: cur }
}

/** Turns a small Python literal (dicts, lists, strings, numbers, True/False/None) into a value. */
export function parsePython(src) {
  const json = src
    .replace(/#.*$/gm, '')
    .replace(/'([^']*)'/g, (_, s) => JSON.stringify(s))
    .replace(/\bTrue\b/g, 'true')
    .replace(/\bFalse\b/g, 'false')
    .replace(/\bNone\b/g, 'null')
    .replace(/,(\s*[}\]])/g, '$1')
  return JSON.parse(json)
}
