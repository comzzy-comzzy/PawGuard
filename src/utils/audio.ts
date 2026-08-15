// Web Audio API Synthesizer for calm puppy music and UI sound effects
let audioCtx: AudioContext | null = null;
let musicGainNode: GainNode | null = null;
let musicDelayNode: DelayNode | null = null;
let isMusicPlaying = false;
let musicIntervalId: number | null = null;
let noteIndex = 0;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Relaxing, gentle puppy lullaby note frequencies (Hz) in C-Major Pentatonic / Warm Lydian
// Frequencies: C3=130.81, G3=196.00, A3=220.00, C4=261.63, D4=293.66, E4=329.63, G4=392.00, A4=440.00, C5=523.25, D5=587.33, E5=659.25, G5=783.99
const PUPPY_LULLABY_NOTES = [
  // Measure 1: Gentle C major opening
  { note: 261.63, bass: 130.81, duration: 0.9 }, // C4 + C3
  { note: 329.63, bass: null,   duration: 0.8 }, // E4
  { note: 392.00, bass: 196.00, duration: 1.1 }, // G4 + G3
  { note: 523.25, bass: null,   duration: 0.9 }, // C5

  // Measure 2: Soothing descent
  { note: 440.00, bass: 174.61, duration: 1.0 }, // A4 + F3
  { note: 392.00, bass: null,   duration: 0.8 }, // G4
  { note: 329.63, bass: 196.00, duration: 1.2 }, // E4 + G3
  { note: 293.66, bass: null,   duration: 0.9 }, // D4

  // Measure 3: Warm peaceful melody
  { note: 329.63, bass: 130.81, duration: 0.9 }, // E4 + C3
  { note: 392.00, bass: null,   duration: 0.8 }, // G4
  { note: 440.00, bass: 220.00, duration: 1.1 }, // A4 + A3
  { note: 587.33, bass: null,   duration: 0.9 }, // D5

  // Measure 4: Gentle cuddle cadence
  { note: 523.25, bass: 196.00, duration: 1.2 }, // C5 + G3
  { note: 440.00, bass: null,   duration: 0.8 }, // A4
  { note: 392.00, bass: 130.81, duration: 1.4 }, // G4 + C3
  { note: 261.63, bass: null,   duration: 1.2 }, // C4

  // Measure 5: Sweet dream variation
  { note: 392.00, bass: 174.61, duration: 0.9 }, // G4 + F3
  { note: 523.25, bass: null,   duration: 0.8 }, // C5
  { note: 659.25, bass: 196.00, duration: 1.2 }, // E5 + G3
  { note: 587.33, bass: null,   duration: 0.9 }, // D5

  // Measure 6: Peaceful resolution
  { note: 523.25, bass: 220.00, duration: 1.0 }, // C5 + A3
  { note: 392.00, bass: null,   duration: 0.8 }, // G4
  { note: 329.63, bass: 196.00, duration: 1.0 }, // E4 + G3
  { note: 293.66, bass: 130.81, duration: 1.6 }, // D4 + C3
];

/**
 * Synthesizes a soft, warm music-box / kalimba bell tone with gentle harmonic overtones
 */
function playTone(freq: number, isBass = false) {
  const ctx = getAudioContext();
  if (!ctx || !musicGainNode) return;

  const now = ctx.currentTime;

  // Primary soft sine oscillator
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(freq, now);

  // Subtle warm overtone (soft triangle)
  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(freq * (isBass ? 2 : 2.003), now);

  // Warm gentle low-pass filter
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(isBass ? 450 : 1200, now);
  filter.frequency.exponentialRampToValueAtTime(isBass ? 200 : 500, now + (isBass ? 1.4 : 1.0));

  const peakVol = isBass ? 0.08 : 0.09;
  const decayTime = isBass ? 1.5 : 1.2;

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(peakVol, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + decayTime);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(musicGainNode);

  if (musicDelayNode) {
    gain.connect(musicDelayNode);
  }

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + decayTime + 0.1);
  osc2.stop(now + decayTime + 0.1);
}

/**
 * Starts the calm, peaceful puppy background music
 */
export const startCalmPuppyMusic = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (isMusicPlaying) return;
  isMusicPlaying = true;

  // Create Master Music Gain with soft fade-in
  musicGainNode = ctx.createGain();
  musicGainNode.gain.setValueAtTime(0.001, ctx.currentTime);
  musicGainNode.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 1.2);
  musicGainNode.connect(ctx.destination);

  // Create warm spatial delay for peaceful ambient resonance
  musicDelayNode = ctx.createDelay();
  musicDelayNode.delayTime.setValueAtTime(0.32, ctx.currentTime);

  const delayFeedback = ctx.createGain();
  delayFeedback.gain.setValueAtTime(0.22, ctx.currentTime);

  const delayFilter = ctx.createBiquadFilter();
  delayFilter.type = 'lowpass';
  delayFilter.frequency.setValueAtTime(900, ctx.currentTime);

  musicDelayNode.connect(delayFilter);
  delayFilter.connect(delayFeedback);
  delayFeedback.connect(musicDelayNode);
  delayFilter.connect(musicGainNode);

  noteIndex = 0;

  // Step function for melody
  const step = () => {
    if (!isMusicPlaying) return;

    const current = PUPPY_LULLABY_NOTES[noteIndex % PUPPY_LULLABY_NOTES.length];
    
    // Play melody note
    playTone(current.note, false);

    // Play bass root if present
    if (current.bass) {
      playTone(current.bass, true);
    }

    noteIndex++;
    musicIntervalId = window.setTimeout(step, 620); // Peaceful tempo ~96 BPM
  };

  step();
};

/**
 * Stops the calm puppy background music with a soft fade-out
 */
export const stopCalmPuppyMusic = () => {
  if (!isMusicPlaying) return;
  isMusicPlaying = false;

  if (musicIntervalId !== null) {
    clearTimeout(musicIntervalId);
    musicIntervalId = null;
  }

  if (musicGainNode && audioCtx) {
    try {
      const now = audioCtx.currentTime;
      musicGainNode.gain.setValueAtTime(musicGainNode.gain.value, now);
      musicGainNode.gain.linearRampToValueAtTime(0.0001, now + 0.6);
      setTimeout(() => {
        musicGainNode?.disconnect();
        musicGainNode = null;
      }, 700);
    } catch {
      musicGainNode = null;
    }
  }
};

/**
 * Toggle the calm puppy music on and off
 */
export const toggleCalmPuppyMusic = (): boolean => {
  if (isMusicPlaying) {
    stopCalmPuppyMusic();
    return false;
  } else {
    startCalmPuppyMusic();
    return true;
  }
};

export const isPuppyMusicPlaying = (): boolean => isMusicPlaying;

/**
 * Plays a discrete gentle UI click
 */
export const playClickSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  } catch {
    // Graceful fallback
  }
};

/**
 * Heart pop sound
 */
export const playHeartPop = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  } catch {
    // Graceful fallback
  }
};

/**
 * Alert chime
 */
export const playAlertSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(659.25, now + 0.1); // E5

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.36);
  } catch {
    // Graceful fallback
  }
};
