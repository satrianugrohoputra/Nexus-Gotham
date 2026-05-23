import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

/**
 * "Explore Gotham" call-to-action. Pulses softly to invite a click. When
 * pressed, it triggers a brief flash + camera-zoom feel via parent transition,
 * then unlocks the page scroll.
 */
export default function ExploreCTA({ revealDelayMs = 3300, onTrigger }) {
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    if (pressed) return;
    setPressed(true);
    onTrigger?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group relative overflow-hidden rounded-full border border-signal/60 bg-signal/5 px-7 py-3 backdrop-blur-sm transition-all duration-500 hover:border-signal hover:bg-signal/10"
      style={{
        opacity: 0,
        animation: `letterIn 700ms ease ${revealDelayMs / 1000}s forwards, ctaPulse 2.6s ease-in-out ${
          revealDelayMs / 1000 + 1
        }s infinite`,
      }}
      data-cursor="hover"
      aria-label="Explore Gotham — unlock the page"
    >
      <span className="relative z-[1] flex items-center gap-3 font-display text-[12px] uppercase tracking-[0.42em] text-ink-50 transition-colors group-hover:text-signal">
        Explore Gotham
        <ArrowRight
          size={16}
          className="transition-transform duration-500 group-hover:translate-x-1.5"
        />
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-signal/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
    </button>
  );
}
