/**
 * Programmatic Web Audio Synthesizer for Creative Quran
 * Synthesizes a beautiful, warm, zero-latency spiritual bell chime
 * Blends a fundamental frequency (528Hz Solfeggio frequency) with harmonic overtones
 * and an exponential decay envelope.
 */
export const playCustomChime = () => {
  if (typeof window === "undefined") return;

  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;

  try {
    const ctx = new AudioContextClass();
    
    // Rich overtone spectrum based on Solfeggio frequency 528 Hz (Miracles / Transformation)
    // 528 Hz - Fundamental
    // 660 Hz - Major Third
    // 792 Hz - Perfect Fifth
    // 1056 Hz - Octave
    const frequencies = [528, 660, 792, 1056];
    const now = ctx.currentTime;
    
    // Master Volume Gain Envelope
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.25, now + 0.04); // quick, smooth attack
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8); // soft physical decay
    masterGain.connect(ctx.destination);

    frequencies.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Deeper, warmer sound by reducing volume of high overtones
      const volume = index === 0 ? 0.65 : index === 1 ? 0.28 : index === 2 ? 0.18 : 0.09;
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      
      gain.gain.setValueAtTime(volume, now);
      // Higher overtones fade out faster to mimic organic physical bells
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5 - (index * 0.22)); 
      
      osc.connect(gain);
      gain.connect(masterGain);
      
      osc.start(now);
      osc.stop(now + 2.0);
    });
  } catch (error) {
    console.error("Failed to play custom synthesized chime:", error);
  }
};
