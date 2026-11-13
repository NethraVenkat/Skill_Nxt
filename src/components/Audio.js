let ctx;
export function sound(kind, enabled) {
  if (!enabled) return;
  try {
    ctx ||= new (window.AudioContext || window.webkitAudioContext)();
    ctx.resume();
    const notes =
      kind === "gavel"
        ? [90, 45]
        : kind === "fail"
          ? [190, 135]
          : kind === "flag"
            ? [360, 540, 720]
            : [440, 660];
    notes.forEach((hz, i) => {
      const o = ctx.createOscillator(),
        g = ctx.createGain();
      o.type = kind === "gavel" ? "triangle" : "sine";
      o.frequency.value = hz;
      g.gain.setValueAtTime(0, ctx.currentTime + i * 0.08);
      g.gain.linearRampToValueAtTime(0.08, ctx.currentTime + i * 0.08 + 0.015);
      g.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + i * 0.08 + 0.24,
      );
      o.connect(g);
      g.connect(ctx.destination);
      o.start(ctx.currentTime + i * 0.08);
      o.stop(ctx.currentTime + i * 0.08 + 0.25);
    });
  } catch {
    /* Audio is optional. */
  }
}
