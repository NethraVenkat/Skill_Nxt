import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { RECEIVERS } from "../data/content";

/**
 * Everything the courier has done, kept in this browser (one device, no login):
 *  - packed:     the 3 notes packed for each letter (the letter itself stays at the post office)
 *  - rides:      Ride-Along deliveries with Echo (Echo helps less each ride — 4 rides → alone)
 *  - rescues:    times Echo whispered a note and the courier carried on
 *  - bumps:      Bumpy Roads survived, per bump
 *  - deliveries: messages told to REAL people, with how many ideas the receiver actually got
 *  - postcards:  days the Daily Postcard was delivered
 * No points, no rankings. A delivery succeeds when the message arrives — not when it looks good.
 */
const KEY = "echo-post:v1";
const Ctx = createContext(null);

const EMPTY = {
  name: "",
  myNotes: ["", "", ""],
  lessons: [],
  packed: {},
  rides: 0,
  rescues: 0,
  bumps: {},
  deliveries: [],
  postcards: [],
  postcard: null,
  butterflies: [],
};

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...EMPTY, ...JSON.parse(raw) };
  } catch {
    /* storage unavailable */
  }
  return EMPTY;
}

/** Ride-Along: Echo comes with you, and helps a little less every ride. */
export const RIDES = [
  { n: 1, name: "Echo pedals", icon: "🚲", echo: "Echo tells the middle idea for you." },
  { n: 2, name: "Echo starts", icon: "✋", echo: "Echo starts the middle idea — you finish it." },
  { n: 3, name: "Echo hints", icon: "💡", echo: "Echo whispers one word before each idea." },
  { n: 4, name: "Echo watches", icon: "👀", echo: "You tell it all. Echo whispers only if you freeze." },
  { n: 5, name: "Solo courier", icon: "🌟", echo: "Echo waves from the post office. Tap 🆘 only if you need it." },
];
export const rideFor = (rides) => RIDES[Math.min(rides, RIDES.length - 1)];

/** Courier ranks, by how many different kinds of receivers you have delivered to. */
export const RANKS = [
  { min: 0, name: "Trainee Courier", icon: "🐣" },
  { min: 2, name: "Bicycle Courier", icon: "🚲" },
  { min: 4, name: "Speedy Courier", icon: "🛵" },
  { min: 6, name: "Chief Courier", icon: "🎖️" },
  { min: 7, name: "Master of Messages", icon: "👑" },
];
/** Bumpy Roads levels, by bumps survived. */
export const ROAD_LEVELS = [
  { min: 0, name: "Wobbly Wheels", icon: "🛞" },
  { min: 2, name: "Steady Pedals", icon: "🚲" },
  { min: 5, name: "Puddle Jumper", icon: "💦" },
  { min: 9, name: "Storm Rider", icon: "⛈️" },
  { min: 14, name: "All-Weather Courier", icon: "🦸" },
];
const levelOf = (list, n) => [...list].reverse().find((l) => n >= l.min);
export const sum = (o) => Object.values(o).reduce((a, b) => a + b, 0);

/** Passport stamps: the kinds of receivers reached (Echo counts after the first Ride-Along). */
export function stampsOf(s) {
  const got = new Set(s.deliveries.map((d) => d.kind));
  if (s.rides > 0) got.add("echo");
  return RECEIVERS.filter((r) => got.has(r.id)).map((r) => r.id);
}
export const rankOf = (s) => levelOf(RANKS, stampsOf(s).length);
export const roadLevel = (n) => levelOf(ROAD_LEVELS, n);
/** People who have received a message from you. */
export const listenersOf = (deliveries) =>
  deliveries.reduce((n, d) => n + (d.count ?? 1), 0);

export const today = () => new Date().toISOString().slice(0, 10);

export function StoreProvider({ children }) {
  const [s, set] = useState(load);
  const [toast, setToast] = useState(null);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch {
      /* storage unavailable */
    }
  }, [s]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const say = useCallback((text) => setToast({ text, k: Date.now() }), []);
  const lessonDone = useCallback(
    (n) => set((x) => (x.lessons.includes(n) ? x : { ...x, lessons: [...x.lessons, n] })),
    [],
  );
  const setField = useCallback((k, v) => set((x) => ({ ...x, [k]: v })), []);
  const pack = useCallback(
    (letterId, notes) => set((x) => ({ ...x, packed: { ...x.packed, [letterId]: notes } })),
    [],
  );
  const rideDone = useCallback(
    (rescued) => set((x) => ({ ...x, rides: x.rides + 1, rescues: x.rescues + rescued })),
    [],
  );
  const bumpSurvived = useCallback(
    (id) => set((x) => ({ ...x, bumps: { ...x.bumps, [id]: (x.bumps[id] ?? 0) + 1 } })),
    [],
  );
  /** A message reached a real person (or a whole class). */
  const deliver = useCallback(
    (d) => {
      const r = RECEIVERS.find((r) => r.id === d.kind);
      const isNew = !s.deliveries.some((o) => o.kind === d.kind);
      set((x) => ({ ...x, deliveries: [...x.deliveries, { count: 1, ...d, at: Date.now() }] }));
      say(isNew ? `🛂 New passport stamp: ${r.icon} ${r.name}!` : `📬 Delivered to ${d.to}!`);
    },
    [say, s.deliveries],
  );
  const postcardDone = useCallback(
    () => set((x) => (x.postcards.includes(today()) ? x : { ...x, postcards: [...x.postcards, today()] })),
    [],
  );
  const butterfly = useCallback(
    (when, level, about) =>
      set((x) => ({ ...x, butterflies: [...x.butterflies, { when, level, about, at: Date.now() }] })),
    [],
  );
  const reset = useCallback(() => set(EMPTY), []);

  const value = useMemo(
    () => ({
      ...s,
      toast,
      say,
      lessonDone,
      setField,
      pack,
      rideDone,
      bumpSurvived,
      deliver,
      postcardDone,
      butterfly,
      reset,
    }),
    [s, toast, say, lessonDone, setField, pack, rideDone, bumpSurvived, deliver, postcardDone, butterfly, reset],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStore = () => useContext(Ctx);
