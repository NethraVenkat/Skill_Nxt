import { initialState } from "./lessonReducer";
export const STORAGE_KEY = "venturecraft-atlas-v1";
export function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const base = initialState();
    if (raw?.version !== 1) return base;
    return {
      ...base,
      ...raw,
      timers: Object.fromEntries(
        Object.entries(base.timers).map(([k, t]) => [
          k,
          { ...t, ...raw.timers?.[k], running: false, deadline: null },
        ]),
      ),
    };
  } catch {
    return initialState();
  }
}
export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}
