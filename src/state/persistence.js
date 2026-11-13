import { initialState } from "./lessonReducer";
export const STORAGE_KEY = "venturecraft-atlas-v1";
export function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const base = initialState();
    if (![1, 2].includes(raw?.version)) return base;
    return {
      ...base,
      ...raw,
      version: 2,
      companyState: raw.companyState || base.companyState,
      companyHistory: raw.companyHistory || base.companyHistory,
      completedLessons: raw.completedLessons || base.completedLessons,
      missionSubmissions: raw.missionSubmissions || base.missionSubmissions,
      passportItems: raw.passportItems || base.passportItems,
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
