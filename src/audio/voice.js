/**
 * Echo's voice and the robot's voice, using the browser's built-in speech (no recording, no
 * network on most systems). Every spoken line is also shown as text on screen.
 */
const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

function pickVoice() {
  const vs = synth?.getVoices() ?? [];
  return (
    vs.find(
      (v) =>
        /en-(IN|GB|US)/i.test(v.lang) &&
        /female|zira|samantha|google uk english female|heera/i.test(v.name),
    ) ||
    vs.find((v) => /^en/i.test(v.lang)) ||
    null
  );
}

export function stopSpeaking() {
  synth?.cancel();
}

/** Speak a line. `style` is 'echo' (warm, lively), 'friend' (natural), 'whisper' (quiet prompt) or 'robot' (flat, word by word). */
export function speak(text, style = "echo", onEnd) {
  if (!synth) return onEnd?.();
  synth.cancel();
  const robot = style === "robot";
  const parts = robot
    ? text.split(/\s+/).map((w) => w.replace(/[.,!?]/g, "") + ".")
    : [text];
  let i = 0;
  const next = () => {
    if (i >= parts.length) return onEnd?.();
    const u = new SpeechSynthesisUtterance(parts[i++]);
    const v = pickVoice();
    if (v) u.voice = v;
    u.rate = robot ? 0.8 : style === "friend" ? 1.02 : 1.05;
    u.pitch = robot ? 0.2 : style === "friend" ? 1.1 : 1.3;
    if (style === "whisper") {
      u.rate = 0.95;
      u.pitch = 1.2;
      u.volume = 0.35;
    }
    u.onend = next;
    u.onerror = () => onEnd?.();
    synth.speak(u);
  };
  next();
}

export const canSpeak = () => !!synth;
