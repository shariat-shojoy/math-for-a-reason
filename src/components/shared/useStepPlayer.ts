import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Generic step-through player: drives an integer index from 0..maxStep,
 * either by hand (Step / Back) or auto-play at an adjustable speed.
 * Every visualization on the site uses this so controls feel identical
 * everywhere — only the rendering of each "step" differs.
 */
export function useStepPlayer(maxStep: number) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(2); // steps per second
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);

  const clamped = (n: number) => Math.max(0, Math.min(maxStep, n));

  const goTo = useCallback((n: number) => setStep(clamped(n)), [maxStep]);
  const next = useCallback(() => setStep((s) => clamped(s + 1)), [maxStep]);
  const back = useCallback(() => setStep((s) => clamped(s - 1)), [maxStep]);
  const reset = useCallback(() => {
    setStep(0);
    setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing) return;
    if (step >= maxStep) {
      setPlaying(false);
      return;
    }
    const intervalMs = 1000 / speed;
    lastTickRef.current = performance.now();

    const tick = (now: number) => {
      if (now - lastTickRef.current >= intervalMs) {
        lastTickRef.current = now;
        setStep((s) => {
          if (s >= maxStep) {
            setPlaying(false);
            return s;
          }
          return s + 1;
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, speed, maxStep]);

  return {
    step,
    setStep: goTo,
    playing,
    setPlaying,
    speed,
    setSpeed,
    next,
    back,
    reset,
    atEnd: step >= maxStep,
    atStart: step <= 0,
  };
}
