import { useEffect, useRef } from 'react';

/**
 * Tracks pointer position and exposes smoothed tilt values via CSS variables on
 * the provided element. Returns the ref to attach to the container.
 *
 * Cursor X/Y are written as percentages so children can also use them
 * for parallax glow positioning.
 */
export default function useCursorTilt({
  maxTiltX = 12,
  maxTiltY = 8,
  smoothing = 0.12,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let cursorX = 50;
    let cursorY = 50;
    let raf = 0;

    const update = (clientX, clientY) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const nx = (clientX / w) * 2 - 1; // -1..1
      const ny = (clientY / h) * 2 - 1;
      targetX = nx * maxTiltX;
      targetY = ny * maxTiltY;
      cursorX = (clientX / w) * 100;
      cursorY = (clientY / h) * 100;
    };

    const handleMove = (e) => update(e.clientX, e.clientY);

    const tick = () => {
      currentX += (targetX - currentX) * smoothing;
      currentY += (targetY - currentY) * smoothing;
      el.style.setProperty('--cursor-tilt-x', `${currentX.toFixed(3)}deg`);
      el.style.setProperty('--cursor-tilt-y', `${currentY.toFixed(3)}deg`);
      el.style.setProperty('--cursor-x', `${cursorX.toFixed(2)}%`);
      el.style.setProperty('--cursor-y', `${cursorY.toFixed(2)}%`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', handleMove);
    };
  }, [maxTiltX, maxTiltY, smoothing]);

  return ref;
}
