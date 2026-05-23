import { useEffect, useRef } from 'react';
import useIsTouchDevice from '../../hooks/useIsTouchDevice.js';

/**
 * Two-layer cursor:
 *  - dot: snaps instantly to pointer
 *  - ring: lerps with lag for smooth follow
 *
 * Disabled on touch devices and on `prefers-reduced-motion`.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    if (isTouch) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    document.body.classList.add('has-custom-cursor');

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;
    let hovering = false;

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      const scale = hovering ? 1.7 : 1;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e) => {
      const t = e.target;
      if (t instanceof Element && t.closest('a, button, [data-cursor="hover"]')) {
        hovering = true;
        ring.dataset.hover = 'true';
      }
    };
    const onOut = (e) => {
      const t = e.target;
      if (t instanceof Element && t.closest('a, button, [data-cursor="hover"]')) {
        hovering = false;
        ring.dataset.hover = 'false';
      }
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerout', onOut, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerout', onOut);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border border-signal/70 mix-blend-screen transition-[opacity] duration-300"
        style={{
          transform: 'translate3d(-100px,-100px,0)',
          willChange: 'transform',
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[101] h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_18px_4px_rgba(245,197,24,0.55)]"
        style={{
          transform: 'translate3d(-100px,-100px,0)',
          willChange: 'transform',
        }}
      />
    </>
  );
}
