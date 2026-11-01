export const KEY = "echo-live-shared-lesson-v2";
export const fresh = () => ({
  schemaVersion: 2,
  lessonId: "module4-class1-notes-to-speech",
  students: [
    {
      id: "first",
      name: "My presenter profile",
      step: 0,
      goal: "Explain my three ideas",
      observation: "",
    },
  ],
  active: "first",
  notes: {},
  talks: [],
  completed: [],
  session: 0,
  screen: 0,
});
const str = (v) => typeof v === "string";
const bounded = (v, max) => str(v) && v.length <= max;
const idx = (v, max) => Number.isInteger(v) && v >= 0 && v < max;
export function valid(d) {
  if (
    !d ||
    d.schemaVersion !== 2 ||
    d.lessonId !== "module4-class1-notes-to-speech" ||
    !Array.isArray(d.students) ||
    !d.students.length ||
    !d.students.every(
      (s) =>
        s &&
        bounded(s.id, 128) &&
        s.id &&
        bounded(s.name, 50) &&
        bounded(s.goal, 100) &&
        bounded(s.observation, 500) &&
        idx(s.step, 6),
    )
  )
    return false;
  const ids = new Set(d.students.map((s) => s.id));
  if (ids.size !== d.students.length || !ids.has(d.active)) return false;
  if (
    !Array.isArray(d.talks) ||
    !d.talks.every(
      (t) =>
        t &&
        bounded(t.id, 128) &&
        ids.has(t.student) &&
        idx(t.session, 3) &&
        idx(t.level, 6) &&
        [1, 2, 3].includes(t.attempt) &&
        bounded(t.at, 50) &&
        Number.isFinite(Date.parse(t.at)) &&
        ["listener", "recall", "feedback", "support", "clarity"].every((k) =>
          bounded(t[k], 120),
        ) &&
        typeof t.recovered === "boolean",
    )
  )
    return false;
  if (new Set(d.talks.map((t) => t.id)).size !== d.talks.length) return false;
  return (
    d.notes &&
    typeof d.notes === "object" &&
    !Array.isArray(d.notes) &&
    Object.values(d.notes).every(
      (n) =>
        Array.isArray(n) && n.length === 3 && n.every((v) => bounded(v, 70)),
    ) &&
    Array.isArray(d.completed) &&
    d.completed.every((v) => idx(v, 3)) &&
    idx(d.session, 3) &&
    idx(d.screen, 18)
  );
}
export function stats(d) {
  return {
    students: d.students.length,
    speakers: d.students.filter((s) => d.talks.some((t) => t.student === s.id))
      .length,
    awaiting: d.students.filter(
      (s) => !d.talks.some((t) => t.student === s.id && t.level >= 3),
    ).length,
  };
}
export function addTalk(d, t) {
  return d.talks.some((x) => x.id === t.id)
    ? d
    : { ...d, talks: [...d.talks, t] };
}
