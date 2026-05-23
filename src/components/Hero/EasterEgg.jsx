import { useEffect, useMemo, useState } from 'react';

const villains = [
  {
    id: 'joker',
    name: 'J.',
    color: '#7c3aed',
    quote: 'hmm... seems Batman’s not around tonight.',
  },
  {
    id: 'joker-2',
    name: 'J.',
    color: '#9d4edd',
    quote: 'with him gone, this city... is mine. hehehe.',
  },
  {
    id: 'riddler',
    name: '?',
    color: '#16a34a',
    quote: 'riddle me this — where does justice hide when no one is watching?',
  },
  {
    id: 'two-face',
    name: 'II',
    color: '#dc2626',
    quote: 'heads or tails, Gotham. your call.',
  },
  {
    id: 'scarecrow',
    name: 'S.',
    color: '#a16207',
    quote: 'sleep tight, citizen. dream of every promise the bat couldn’t keep.',
  },
];

/**
 * Full-screen 60s villain takeover. Fades in over the hero, displays a
 * villain card with quote, glass cracks, then dismisses itself so the
 * hero can resume.
 *
 * `active` is controlled by the parent (idleLevel === 2). We rotate which
 * villain is shown across consecutive triggers via a counter ref.
 */
export default function EasterEgg({ active, onDismiss }) {
  const [step, setStep] = useState(0); // 0 hidden, 1 darken, 2 quote, 3 crack, 4 fade-out
  const [villainIndex, setVillainIndex] = useState(() =>
    Math.floor(Math.random() * villains.length)
  );

  useEffect(() => {
    if (!active) {
      setStep(0);
      return undefined;
    }
    setVillainIndex((v) => (v + 1) % villains.length);
    setStep(1);
    const timers = [
      setTimeout(() => setStep(2), 900),
      setTimeout(() => setStep(3), 5200),
      setTimeout(() => setStep(4), 6000),
      setTimeout(() => {
        setStep(0);
        onDismiss?.();
      }, 6800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [active, onDismiss]);

  const villain = useMemo(() => villains[villainIndex], [villainIndex]);

  if (!active && step === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[80]"
      aria-hidden="true"
    >
      {/* Darken over scene */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          opacity: step >= 1 && step < 4 ? 0.92 : 0,
          transition: 'opacity 800ms ease',
        }}
      />

      {/* Quote card */}
      <div
        className="absolute inset-0 flex items-center justify-center px-6"
        style={{
          opacity: step === 2 ? 1 : 0,
          transform: step === 2 ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 700ms ease, transform 900ms ease',
        }}
      >
        <div className="max-w-xl text-center">
          <div
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border"
            style={{
              borderColor: `${villain.color}66`,
              boxShadow: `0 0 28px ${villain.color}44`,
              color: villain.color,
            }}
          >
            <span className="font-display text-xl">{villain.name}</span>
          </div>
          <p
            className="font-glitch text-[clamp(18px,2.6vw,28px)] leading-relaxed text-ink-50"
            style={{
              textShadow: `0 0 18px ${villain.color}33`,
            }}
          >
            “{villain.quote}”
          </p>
          <p
            className="mt-6 text-[10px] uppercase tracking-[0.5em] text-ink-200/70"
          >
            move the mouse to break the silence
          </p>
        </div>
      </div>

      {/* Glass crack overlay */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        style={{
          opacity: step >= 3 && step < 4 ? 0.85 : 0,
          transition: 'opacity 350ms ease',
        }}
      >
        <g
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        >
          <path d="M800 480 L500 200 L350 130" />
          <path d="M800 480 L1100 220 L1280 100" />
          <path d="M800 480 L600 750 L450 850" />
          <path d="M800 480 L1080 760 L1230 870" />
          <path d="M800 480 L300 500 L100 460" />
          <path d="M800 480 L1320 470 L1500 500" />
          <path d="M650 320 L520 250" />
          <path d="M970 350 L1090 280" />
          <path d="M620 640 L500 720" />
          <path d="M980 640 L1120 720" />
        </g>
      </svg>
    </div>
  );
}
