import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Follows one speaking turn from the live mic stats:
 *   spokeMs   how long the child has spoken since `begin()`
 *   silentMs  how long it has been quiet (since the last sound, or since `begin()`)
 *   finished  spoke a real bit, then paused — the note is said
 *   frozen    quiet for `freezeMs` without finishing — time for Echo to whisper
 * `paused` lets the caller ignore the room while Echo itself is talking.
 */
export function useTurn(
  mic,
  {
    active,
    paused = false,
    doneSpeechMs = 1500,
    donePauseMs = 1300,
    freezeMs = 4000,
  },
) {
  const startTalk = useRef(0);
  const lastSound = useRef(0);
  const [now, setNow] = useState(0);
  const [base, setBase] = useState(null);

  const begin = useCallback(() => {
    const t = performance.now();
    startTalk.current = null;
    lastSound.current = t;
    setBase(t);
    setNow(t);
  }, []);

  // A gentle clock so silence still counts up when the mic stats stop changing.
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setNow(performance.now()), 200);
    return () => clearInterval(id);
  }, [active]);

  useEffect(() => {
    if (!active || paused || !mic.on || base == null) return;
    if (startTalk.current == null) startTalk.current = mic.stats.talkMs;
    if (mic.stats.speaking) lastSound.current = performance.now();
  }, [mic.on, mic.stats, active, paused, base]);

  useEffect(() => {
    if (paused) lastSound.current = performance.now();
  }, [paused, now]);

  const spokeMs =
    mic.on && startTalk.current != null
      ? Math.max(0, mic.stats.talkMs - startTalk.current)
      : 0;
  const silentMs = active && base != null ? now - lastSound.current : 0;
  return {
    begin,
    spokeMs,
    silentMs,
    finished: mic.on && spokeMs >= doneSpeechMs && silentMs >= donePauseMs,
    frozen: mic.on && !paused && silentMs >= freezeMs,
  };
}
