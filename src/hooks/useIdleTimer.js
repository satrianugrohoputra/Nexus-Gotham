import { useEffect, useRef, useState } from 'react';

/**
 * Tracks user idle state across multiple thresholds.
 * Returns: { idleLevel: 0 | 1 | 2 } where:
 *   0 = active
 *   1 = soft idle (default 6s) — flicker time
 *   2 = deep idle (default 60s) — villain easter egg
 *
 * `enabled` lets callers temporarily pause tracking (e.g. during intro reveal).
 */
export default function useIdleTimer({
  softMs = 6000,
  deepMs = 60000,
  enabled = true,
} = {}) {
  const [idleLevel, setIdleLevel] = useState(0);
  const softRef = useRef(null);
  const deepRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      setIdleLevel(0);
      return undefined;
    }

    const clearTimers = () => {
      if (softRef.current) clearTimeout(softRef.current);
      if (deepRef.current) clearTimeout(deepRef.current);
    };

    const reset = () => {
      clearTimers();
      setIdleLevel(0);
      softRef.current = setTimeout(() => setIdleLevel(1), softMs);
      deepRef.current = setTimeout(() => setIdleLevel(2), deepMs);
    };

    const events = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart'];
    events.forEach((ev) => window.addEventListener(ev, reset, { passive: true }));
    reset();

    return () => {
      clearTimers();
      events.forEach((ev) => window.removeEventListener(ev, reset));
    };
  }, [softMs, deepMs, enabled]);

  return { idleLevel };
}
