// Web Audio API Ambient Fantasy Soundscape Generator

let audioCtx = null;
let masterGain = null;
let isPlaying = false;
let timerId = null;

// Magical Pentatonic Frequencies (Hz) for ethereal harp/chime tones
const notes = [
  293.66, // D4
  329.63, // E4
  369.99, // F#4
  440.00, // A4
  493.88, // B4
  587.33, // D5
  659.25, // E5
  739.99, // F#5
  880.00, // A5
  987.77, // B5
];

export function toggleAmbientAudio(onStateChange) {
  if (isPlaying) {
    stopAmbientAudio();
    if (onStateChange) onStateChange(false);
    return false;
  } else {
    startAmbientAudio();
    if (onStateChange) onStateChange(true);
    return true;
  }
}

export function startAmbientAudio() {
  if (isPlaying) return;

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContext();
    } else if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.12, audioCtx.currentTime); // Soft background volume
    masterGain.connect(audioCtx.destination);

    isPlaying = true;

    // Schedule gentle, floating chime notes every 1.5 to 3 seconds
    const scheduleNextNote = () => {
      if (!isPlaying || !audioCtx) return;

      playChimeNote();
      const delay = Math.random() * 2000 + 1200;
      timerId = setTimeout(scheduleNextNote, delay);
    };

    scheduleNextNote();
  } catch (e) {
    console.warn("Web Audio API not supported or blocked by browser:", e);
  }
}

export function stopAmbientAudio() {
  isPlaying = false;
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }
  if (masterGain && audioCtx) {
    try {
      masterGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.5);
    } catch (e) {
      // Ignore cleanup error
    }
  }
}

function playChimeNote() {
  if (!audioCtx || !masterGain || audioCtx.state !== 'running') return;

  const noteFreq = notes[Math.floor(Math.random() * notes.length)];
  const osc = audioCtx.createOscillator();
  const noteGain = audioCtx.createGain();

  // Pure sine wave with soft harmonic envelope for harp/celeste sound
  osc.type = 'sine';
  osc.frequency.setValueAtTime(noteFreq, audioCtx.currentTime);

  const now = audioCtx.currentTime;
  const attack = 0.15;
  const decay = 2.8;

  noteGain.gain.setValueAtTime(0, now);
  noteGain.gain.linearRampToValueAtTime(0.2, now + attack);
  noteGain.gain.exponentialRampToValueAtTime(0.0001, now + attack + decay);

  osc.connect(noteGain);
  noteGain.connect(masterGain);

  osc.start(now);
  osc.stop(now + attack + decay + 0.1);
}

export function isAudioPlaying() {
  return isPlaying;
}
