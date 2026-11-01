import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

/**
 * The learner's journey: which lessons and labs are finished, and the data gems collected. Saved in
 * the browser so a student can close the tab and continue later.
 */
const KEY = 'datacity:journey:v1'
const Ctx = createContext(null)

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { done: [], labs: [], name: '', ...JSON.parse(raw) }
  } catch {
    /* storage unavailable */
  }
  return { done: [], labs: [], name: '' }
}

export function ProgressProvider({ children }) {
  const [state, setState] = useState(load)
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* storage unavailable */
    }
  }, [state])

  const complete = useCallback((slug) => {
    setState((s) => (s.done.includes(slug) ? s : { ...s, done: [...s.done, slug] }))
  }, [])
  const completeLab = useCallback((id) => {
    setState((s) => (s.labs.includes(id) ? s : { ...s, labs: [...s.labs, id] }))
  }, [])
  const setName = useCallback((name) => setState((s) => ({ ...s, name })), [])
  const reset = useCallback(() => setState({ done: [], labs: [], name: '' }), [])

  const value = useMemo(
    () => ({ ...state, complete, completeLab, setName, reset }),
    [state, complete, completeLab, setName, reset],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProgress = () => useContext(Ctx)
