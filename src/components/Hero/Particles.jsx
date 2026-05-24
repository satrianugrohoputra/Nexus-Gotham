import { useMemo } from 'react';

/**
 * Floating dust/ash particles that drift inside the beam. Pure CSS,
 * positions/durations/delays randomized once on mount.
 */
export default function Particles({ count = 18 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100, // % within beam width
        size: 1 + Math.random() * 2.2,
        delay: -Math.random() * 12,
        duration: 9 + Math.random() * 8,
        sway: -10 + Math.random() * 20,
        opacity: 0.25 + Math.random() * 0.45,
      })),
    [count]
  );

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-[4] h-[80vh] w-[18vmin] -translate-x-1/2 -translate-y-full overflow-hidden"
      aria-hidden="true"
      style={{ mixBlendMode: 'screen' }}
    >
      {items.map((p) => (
        <span
          key={p.id}
          className="absolute block rounded-full bg-signal-warm"
          style={{
            left: `${p.left}%`,
            bottom: 0,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            filter: `blur(${p.size > 2 ? 0.6 : 0}px)`,
            animation: `particleRise ${p.duration}s linear ${p.delay}s infinite`,
            ['--sway']: `${p.sway}px`,
          }}
        />
      ))}
      <style>{`
        @keyframes particleRise {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          12% { opacity: 0.7; }
          90% { opacity: 0.5; }
          100% {
            transform: translate(var(--sway), -100vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
