import { test } from "node:test";
import assert from "node:assert/strict";
import {
  initialState,
  lessonReducer,
  blankConcept,
  stats,
} from "../src/state/lessonReducer.js";
const timer = (s, command, now = 1000) =>
  lessonReducer(s, { type: "TIMER", id: "storm", command, now });
test("timer follows elapsed time, pauses, resumes, ends and resets", () => {
  let s = timer(initialState(), "start");
  s = lessonReducer(s, { type: "TICK", now: 11100 });
  assert.equal(s.timers.storm.remaining, 50);
  s = timer(s, "pause");
  s = lessonReducer(s, { type: "TICK", now: 51000 });
  assert.equal(s.timers.storm.remaining, 50);
  s = timer(s, "start", 51000);
  s = lessonReducer(s, { type: "TICK", now: 101000 });
  assert.equal(s.timers.storm.remaining, 0);
  assert.equal(s.timers.storm.running, false);
  s = timer(s, "reset");
  assert.equal(s.timers.storm.remaining, 60);
  assert.equal(s.timers.storm.started, false);
  s = timer(s, "end");
  assert.equal(s.timers.storm.remaining, 0);
});
test("pausing all timers leaves problems and concepts intact", () => {
  let s = initialState();
  s.problemStormProblems = [{ id: "test", text: "Heavy bags" }];
  s = timer(s, "start");
  s = lessonReducer(s, { type: "PAUSE_ALL" });
  assert.equal(s.timers.storm.running, false);
  assert.equal(s.problemStormProblems[0].text, "Heavy bags");
});
test("flags are idempotent and editable", () => {
  let s = initialState();
  s = lessonReducer(s, { type: "FLAG", flag: { id: "live", label: "A" } });
  s = lessonReducer(s, { type: "FLAG", flag: { id: "live", label: "B" } });
  assert.equal(s.globeFlags.length, 1);
  assert.equal(s.globeFlags[0].label, "B");
});
test("totals deduplicate reused pair concepts and require all three fields", () => {
  const s = initialState();
  const c = {
    ...blankConcept(),
    who: "Students",
    what: "Heavy bags",
    how: "Book lockers",
    filters: [true, true, true, true],
  };
  s.pairConcepts[0] = c;
  s.soloConcepts[0] = { ...c };
  s.soloConcepts[1] = { ...blankConcept(), who: "Students" };
  assert.deepEqual(stats(s), { generated: 1, passing: 1 });
});
test("reset clears every class activity", () => {
  let s = initialState();
  s.liveBuilt = true;
  s.problemStormProblems = [{ id: "x", text: "x" }];
  s = lessonReducer(s, { type: "RESET" });
  assert.deepEqual(s, initialState());
});
