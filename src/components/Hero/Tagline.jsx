/**
 * Two-line tagline. Letters of the headline animate in with stagger
 * (handled by the `style.animationDelay`). The thin divider and small
 * subtitle fade in afterward.
 *
 * The shimmer sweep is added via the `shimmer-mask` global utility.
 */
const headline = 'WHERE JUSTICE MEETS INTELLIGENCE';

export default function Tagline({ revealStartDelayMs = 1700 }) {
  const startSec = revealStartDelayMs / 1000;
  return (
    <div className="relative z-[7] flex w-full flex-col items-center px-6 text-center">
      <h1
        className="shimmer-mask font-display text-[clamp(20px,4.2vw,46px)] uppercase tracking-[0.18em] text-ink-50"
        style={{ textShadow: '0 0 22px rgba(245,197,24,0.18)' }}
        aria-label={headline}
      >
        {headline.split('').map((char, i) => (
          <span
            key={i}
            aria-hidden="true"
            style={{
              display: 'inline-block',
              opacity: 0,
              animation: `letterIn 700ms cubic-bezier(0.2, 0.6, 0.2, 1) ${
                startSec + i * 0.035
              }s forwards`,
              whiteSpace: char === ' ' ? 'pre' : 'normal',
            }}
          >
            {char}
          </span>
        ))}
      </h1>

      <span
        className="mt-4 block h-px w-24 bg-signal/60"
        style={{
          opacity: 0,
          animation: `letterIn 700ms ease ${startSec + 1.4}s forwards`,
        }}
        aria-hidden="true"
      />

      <p
        className="mt-3 text-[11px] uppercase tracking-[0.45em] text-ink-200/80"
        style={{
          opacity: 0,
          animation: `letterIn 700ms ease ${startSec + 1.6}s forwards`,
        }}
      >
        gotham&apos;s under your shadow
      </p>
    </div>
  );
}
