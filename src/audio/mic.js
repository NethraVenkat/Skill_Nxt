/**
 * The microphone engine. Everything is measured live, in the browser, from the audio signal only:
 * nothing is recorded, sent or stored here.
 *
 *   level       how loud right now (0..1, after removing the room's background noise)
 *   speaking    is the child speaking at this moment
 *   talkMs      total speaking time
 *   pauses      breaths taken between phrases (silences of 0.35–2 s after speech)
 *   pace        syllable-like bursts per second (turtle < 2.5 < just right < 5.5 < rabbit)
 *   expression  how much the voice's pitch moves (flat robot ≈ 0 … lively friend ≈ 1)
 *   claps       sharp, short sounds (for the Clap Meter)
 */
let shared = null;

export async function openMic() {
  if (shared) return shared;
  if (!navigator.mediaDevices?.getUserMedia)
    throw new Error("This browser has no microphone support.");
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true,
      noiseSuppression: false,
      autoGainControl: false,
    },
  });
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const src = ctx.createMediaStreamSource(stream);
  const an = ctx.createAnalyser();
  an.fftSize = 2048;
  src.connect(an);
  shared = { stream, ctx, an, buf: new Float32Array(an.fftSize), floor: 0.008 };
  return shared;
}

export function closeMic() {
  if (!shared) return;
  shared.stream.getTracks().forEach((t) => t.stop());
  shared.ctx.close();
  shared = null;
}

export const micOpen = () => !!shared;

/** Root-mean-square loudness of the current frame. */
function rms(buf) {
  let s = 0;
  for (let i = 0; i < buf.length; i++) s += buf[i] * buf[i];
  return Math.sqrt(s / buf.length);
}

/** A rough fundamental-frequency estimate by autocorrelation (80–400 Hz, children's voices). */
function pitch(buf, rate) {
  const min = Math.floor(rate / 400);
  const max = Math.floor(rate / 80);
  let best = 0;
  let bestLag = 0;
  for (let lag = min; lag <= max; lag++) {
    let c = 0;
    for (let i = 0; i < 1024; i++) c += buf[i] * buf[i + lag];
    if (c > best) {
      best = c;
      bestLag = lag;
    }
  }
  return bestLag ? rate / bestLag : 0;
}

/** Listen to the room for a moment and set the noise floor, so a noisy classroom still works. */
export async function calibrate(ms = 1200) {
  const m = await openMic();
  const vals = [];
  const t0 = performance.now();
  await new Promise((res) => {
    const tick = () => {
      m.an.getFloatTimeDomainData(m.buf);
      vals.push(rms(m.buf));
      if (performance.now() - t0 < ms) requestAnimationFrame(tick);
      else res();
    };
    tick();
  });
  vals.sort((a, b) => a - b);
  m.floor = Math.max(0.006, vals[Math.floor(vals.length * 0.8)] * 1.4);
  return m.floor;
}

/**
 * Start measuring. `onFrame(stats)` is called every animation frame. Returns a stop function.
 */
export function listen(onFrame, { onClap } = {}) {
  const m = shared;
  if (!m) throw new Error("Open the microphone first.");
  const st = {
    level: 0,
    speaking: false,
    talkMs: 0,
    pauses: 0,
    bursts: 0,
    pace: 0,
    expression: 0,
    claps: 0,
    peak: 0,
  };
  let last = performance.now();
  let silentFor = 0;
  let hadSpeech = false;
  let above = false;
  let lastClap = 0;
  const pitches = [];
  let raf;
  const tick = (now) => {
    raf = requestAnimationFrame(tick);
    const dt = now - last;
    last = now;
    m.an.getFloatTimeDomainData(m.buf);
    const r = rms(m.buf);
    const lvl = Math.min(1, Math.max(0, (r - m.floor) / 0.12));
    st.level = st.level * 0.6 + lvl * 0.4;
    st.peak = Math.max(st.peak * 0.995, st.level);
    const speaking = r > m.floor * 1.8;
    // bursts: rising edges of loudness ≈ syllables
    if (speaking && !above) st.bursts++;
    above = speaking;
    if (speaking) {
      st.talkMs += dt;
      if (hadSpeech && silentFor > 350 && silentFor < 2000) st.pauses++;
      silentFor = 0;
      hadSpeech = true;
      const f = pitch(m.buf, m.ctx.sampleRate);
      if (f > 80 && f < 420) {
        pitches.push(f);
        if (pitches.length > 240) pitches.shift();
      }
    } else silentFor += dt;
    st.speaking = speaking;
    st.pace = st.talkMs > 1500 ? st.bursts / (st.talkMs / 1000) : 0;
    if (pitches.length > 20) {
      const mean = pitches.reduce((a, b) => a + b, 0) / pitches.length;
      const sd = Math.sqrt(
        pitches.reduce((a, b) => a + (b - mean) ** 2, 0) / pitches.length,
      );
      st.expression = Math.min(1, sd / mean / 0.22);
    }
    // claps: a sudden, very loud, very short sound
    if (onClap && r > Math.max(0.18, m.floor * 8) && now - lastClap > 160) {
      lastClap = now;
      st.claps++;
      onClap(st.claps);
    }
    onFrame({ ...st });
  };
  raf = requestAnimationFrame(tick);
  const stop = () => cancelAnimationFrame(raf);
  /** Start counting again (talk time, pauses, pace, expression, claps) without reopening. */
  stop.reset = () => {
    Object.assign(st, {
      talkMs: 0,
      pauses: 0,
      bursts: 0,
      pace: 0,
      expression: 0,
      claps: 0,
      peak: 0,
    });
    pitches.length = 0;
    hadSpeech = false;
  };
  return stop;
}

/** Words for the meters, in Grade 4 language. */
export const describe = {
  volume: (l) => (l < 0.12 ? "Whisper" : l > 0.8 ? "Too loud!" : "Just right"),
  pace: (p) =>
    !p ? "—" : p < 2.5 ? "Turtle 🐢" : p > 5.5 ? "Rabbit 🐇" : "Just right",
  expression: (e) =>
    e < 0.3 ? "Robot 🤖" : e < 0.6 ? "Getting there" : "Friend 😊",
};
