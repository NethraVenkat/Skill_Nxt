export const blankConcept = () => ({
  name: "",
  who: "",
  what: "",
  how: "",
  filters: [false, false, false, false],
});
export const newTimer = (seconds) => ({
  remaining: seconds,
  total: seconds,
  running: false,
  deadline: null,
  started: false,
});
import { applyDecision, createInitialCompanyState } from "../simulator/engine.js";

export const initialState = () => ({
  version: 2,
  companyState: createInitialCompanyState(),
  companyHistory: [],
  completedLessons: [],
  missionSubmissions: [],
  passportItems: [],
  currentScene: 0,
  completedScenes: [],
  globeFlags: [],
  missionProgress: [],
  reserved: false,
  rewound: false,
  seeds: ["", ""],
  penModules: [],
  penFilters: [],
  problemStormProblems: [],
  selectedProblem: "",
  gates: {
    3: { round: 0, gate: 0, done: [], feedback: "", result: null },
    7: { round: 0, gate: 0, done: [], feedback: "", result: null },
  },
  liveConcept: blankConcept(),
  liveBuilt: false,
  pairConcepts: [blankConcept(), blankConcept()],
  pairVotes: [0, 0],
  strongerConcept: null,
  battlePhase: 0,
  battles: [],
  soloConcepts: [blankConcept(), blankConcept(), blankConcept()],
  soloSubmitted: false,
  classStats: { generated: "", passing: "", bestPitch: "" },
  statsConfirmed: false,
  recap: false,
  auctionOpen: false,
  timers: {
    storm: newTimer(60),
    battle: newTimer(120),
    pitchA: newTimer(20),
    pitchB: newTimer(20),
    solo: newTimer(180),
  },
  audioEnabled: false,
  reducedMotion: false,
  teacherControls: false,
});
export const complete = (c) =>
  Boolean(c.who.trim() && c.what.trim() && c.how.trim());
export const passes = (c) => complete(c) && c.filters.every(Boolean);
export function stats(s) {
  const entries = [
    ...(s.penModules.length === 3
      ? [
          {
            ...blankConcept(),
            who: "Grades 6–8",
            what: "Stationery",
            how: "Lending",
            filters: [true, true, true, true],
          },
        ]
      : []),
    ...(s.gates[7].done.includes(2)
      ? [
          {
            ...blankConcept(),
            who: "Students",
            what: "Books",
            how: "Exchange",
            filters: [true, true, true, true],
          },
        ]
      : []),
    s.liveConcept,
    ...s.battles.flatMap((b) => b.concepts),
    ...s.pairConcepts,
    ...s.soloConcepts,
  ].filter(complete);
  const unique = new Map();
  for (const c of entries) {
    const key = [c.who, c.what, c.how]
      .map((v) => v.trim().toLowerCase())
      .join("|");
    const previous = unique.get(key);
    if (!previous || passes(c)) unique.set(key, c);
  }
  const concepts = [...unique.values()];
  return {
    generated: concepts.length,
    passing: concepts.filter(passes).length,
  };
}
export function lessonReducer(s, a) {
  switch (a.type) {
    case "SET":
      return {
        ...s,
        [a.key]: typeof a.value === "function" ? a.value(s[a.key]) : a.value,
      };
    case "PATCH":
      return { ...s, ...a.value };
    case "FLAG":
      return s.globeFlags.some((f) => f.id === a.flag.id)
        ? {
            ...s,
            globeFlags: s.globeFlags.map((f) =>
              f.id === a.flag.id ? a.flag : f,
            ),
          }
        : { ...s, globeFlags: [...s.globeFlags, a.flag] };
    case "COMPANY_DECISION": {
      const transition = applyDecision(s.companyState, a.decisionId);
      return {
        ...s,
        companyState: transition.stateAfter,
        companyHistory: [
        ...s.companyHistory,
        {
          month: transition.stateAfter.monthsElapsed,
          decisionId: transition.decision.id,
          consequence: transition.consequence,
        },
        ],
      };
    }
    case "TIMER": {
      const t = s.timers[a.id];
      let next = { ...t };
      if (a.command === "start")
        next = {
          ...t,
          running: true,
          started: true,
          deadline: a.now + t.remaining * 1000,
        };
      if (a.command === "pause")
        next = { ...t, running: false, deadline: null };
      if (a.command === "reset") next = newTimer(t.total);
      if (a.command === "end")
        next = {
          ...t,
          remaining: 0,
          running: false,
          started: true,
          deadline: null,
        };
      return { ...s, timers: { ...s.timers, [a.id]: next } };
    }
    case "TICK": {
      let changed = false;
      const timers = Object.fromEntries(
        Object.entries(s.timers).map(([k, t]) => {
          if (!t.running) return [k, t];
          const left = Math.max(0, Math.ceil((t.deadline - a.now) / 1000));
          if (left === t.remaining) return [k, t];
          changed = true;
          return [
            k,
            {
              ...t,
              remaining: left,
              running: left > 0,
              deadline: left > 0 ? t.deadline : null,
            },
          ];
        }),
      );
      return changed ? { ...s, timers } : s;
    }
    case "PAUSE_ALL":
      return {
        ...s,
        timers: Object.fromEntries(
          Object.entries(s.timers).map(([k, t]) => [
            k,
            { ...t, running: false, deadline: null },
          ]),
        ),
      };
    case "RESET":
      return initialState();
    default:
      return s;
  }
}
