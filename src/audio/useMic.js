import { useCallback, useEffect, useRef, useState } from "react";
import { calibrate, listen, openMic } from "./mic";

/**
 * React hook around the microphone engine. `start()` asks permission (once), listens to the room
 * for a second to learn its noise, then streams live stats. Stats update at most ~15×/s to keep
 * React calm; the glow itself can use `stats.level`.
 */
export function useMic({ onClap } = {}) {
  const [on, setOn] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    level: 0,
    speaking: false,
    talkMs: 0,
    pauses: 0,
    pace: 0,
    expression: 0,
    claps: 0,
  });
  const stopRef = useRef(null);
  const clapRef = useRef(onClap);
  useEffect(() => {
    clapRef.current = onClap;
  });

  const stop = useCallback(() => {
    stopRef.current?.();
    stopRef.current = null;
    setOn(false);
  }, []);

  const start = useCallback(async () => {
    setError(null);
    setBusy(true);
    try {
      await openMic();
      await calibrate(900);
      let lastPush = 0;
      stopRef.current = listen(
        (s) => {
          const now = performance.now();
          if (now - lastPush > 66) {
            lastPush = now;
            setStats(s);
          }
        },
        { onClap: (n) => clapRef.current?.(n) },
      );
      setOn(true);
    } catch (e) {
      setError(
        e?.name === "NotAllowedError"
          ? "The microphone is switched off. Ask a grown-up to allow it — or use the tap buttons instead."
          : "No microphone found. You can still use the tap buttons!",
      );
    } finally {
      setBusy(false);
    }
  }, []);

  const reset = useCallback(
    () => (
      stopRef.current?.reset?.(),
      setStats((s) => ({
        ...s,
        talkMs: 0,
        pauses: 0,
        pace: 0,
        expression: 0,
        claps: 0,
      }))
    ),
    [],
  );

  useEffect(() => () => stopRef.current?.(), []);
  return { on, busy, error, stats, start, stop, reset };
}
