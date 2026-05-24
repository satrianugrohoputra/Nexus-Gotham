import { useEffect } from 'react';

/**
 * Subscribes to deviceorientation events and writes smoothed tilt values to
 * CSS variables on the element ref. Used as the touch-device fallback for
 * cursor follow.
 */
export default function useDeviceTilt(targetRef, {
  maxTiltX = 10,
  maxTiltY = 6,
  smoothing = 0.1,
  enabled = true,
} = {}) {
  useEffect(() => {
    if (!enabled) return undefined;
    const el = targetRef.current;
    if (!el || typeof window === 'undefined' || !window.DeviceOrientationEvent) return undefined;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let raf = 0;

    const handle = (event) => {
      // gamma: -90..90 (left/right tilt), beta: -180..180 (front/back)
      const g = event.gamma ?? 0;
      const b = (event.beta ?? 0) - 30; // assume held ~30deg from horizontal
      targetX = Math.max(-1, Math.min(1, g / 30)) * maxTiltX;
      targetY = Math.max(-1, Math.min(1, b / 30)) * maxTiltY;
    };

    const tick = () => {
      currentX += (targetX - currentX) * smoothing;
      currentY += (targetY - currentY) * smoothing;
      el.style.setProperty('--cursor-tilt-x', `${currentX.toFixed(3)}deg`);
      el.style.setProperty('--cursor-tilt-y', `${currentY.toFixed(3)}deg`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('deviceorientation', handle, true);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('deviceorientation', handle, true);
    };
  }, [targetRef, maxTiltX, maxTiltY, smoothing, enabled]);
}
