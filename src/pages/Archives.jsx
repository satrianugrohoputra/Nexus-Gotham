import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageScaffold from '../components/PageScaffold.jsx';

const quotes = [
  {
    text: "It's not who I am underneath, but what I do that defines me.",
    character: 'Batman',
    source: 'Batman Begins',
    tone: 'dark',
  },
  {
    text: 'The night is darkest just before the dawn. And I promise you, the dawn is coming.',
    character: 'Harvey Dent',
    source: 'The Dark Knight',
    tone: 'dark',
  },
  {
    text: "You either die a hero, or you live long enough to see yourself become the villain.",
    character: 'Harvey Dent',
    source: 'The Dark Knight',
    tone: 'dark',
  },
  {
    text: "In a world of ordinary mortals, you are a wonder woman.",
    character: 'Wonder Woman',
    source: 'DC Universe',
    tone: 'hopeful',
  },
  {
    text: "You're much stronger than you think you are. Trust me.",
    character: 'Superman',
    source: 'All-Star Superman',
    tone: 'hopeful',
  },
  {
    text: 'Sometimes it is the people no one imagines anything of who do the things that no one can imagine.',
    character: 'Alfred Pennyworth',
    source: 'The Dark Knight',
    tone: 'wisdom',
  },
  {
    text: "Why do we fall? So we can learn to pick ourselves back up.",
    character: 'Alfred Pennyworth',
    source: 'Batman Begins',
    tone: 'wisdom',
  },
  {
    text: "I am vengeance. I am the night. I am Batman.",
    character: 'Batman',
    source: 'Batman: The Animated Series',
    tone: 'dark',
  },
  {
    text: "Life doesn't give us purpose. We give life purpose.",
    character: 'The Flash',
    source: 'The Flash',
    tone: 'hopeful',
  },
  {
    text: "A hero can be anyone. Even a man doing something as simple as putting a coat around a young boy's shoulders.",
    character: 'Batman',
    source: 'The Dark Knight Rises',
    tone: 'dark',
  },
  {
    text: "Madness is like gravity. All it takes is a little push.",
    character: 'The Joker',
    source: 'The Dark Knight',
    tone: 'chaotic',
  },
  {
    text: "I believe in Harvey Dent... I mean, I believe in the goodness that still exists in Gotham.",
    character: 'Batman',
    source: 'The Dark Knight',
    tone: 'dark',
  },
];

export default function Archives() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const shuffle = useCallback(() => {
    setDirection(1);
    let next = Math.floor(Math.random() * quotes.length);
    while (next === currentIndex && quotes.length > 1) {
      next = Math.floor(Math.random() * quotes.length);
    }
    setCurrentIndex(next);
  }, [currentIndex]);

  const quote = quotes[currentIndex];

  const toneColor = {
    dark: 'text-signal',
    hopeful: 'text-blue-400',
    wisdom: 'text-emerald-400',
    chaotic: 'text-red-400',
  };

  return (
    <PageScaffold
      eyebrow="Archives"
      title="Words from the Watchtower"
      lead="Iconic words preserved across the DC multiverse. Wisdom, darkness, and hope — all housed in one vault."
    >
      {/* Fog background animation */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute left-1/2 top-1/2 h-[60vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(ellipse, rgba(28,35,54,0.8) 0%, transparent 70%)',
            animation: 'fogRise 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute left-[30%] top-[40%] h-[40vmin] w-[50vmin] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(ellipse, rgba(245,197,24,0.05) 0%, transparent 60%)',
            animation: 'fogRise 12s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* Quote Card */}
      <div className="relative mt-16 flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/[0.08] p-8 md:p-12"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(10,13,20,0.9) 100%)',
              backdropFilter: 'blur(20px)',
              boxShadow:
                '0 0 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            {/* Decorative quote mark */}
            <span
              className="absolute -left-2 -top-4 font-display text-[120px] leading-none text-signal/10"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            {/* Quote text */}
            <blockquote className="relative z-10">
              <p className="font-display text-xl leading-relaxed text-ink-50 md:text-2xl lg:text-3xl" style={{ fontStyle: 'italic' }}>
                &ldquo;{quote.text}&rdquo;
              </p>
            </blockquote>

            {/* Attribution */}
            <div className="relative z-10 mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-signal/40 to-transparent" />
              <div className="text-right">
                <p className={`font-display text-sm uppercase tracking-[0.3em] ${toneColor[quote.tone] || 'text-signal'}`}>
                  {quote.character}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.4em] text-ink-300">
                  {quote.source}
                </p>
              </div>
            </div>

            {/* Tone badge */}
            <div className="absolute right-6 top-6">
              <span className={`rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[9px] uppercase tracking-[0.3em] ${toneColor[quote.tone] || 'text-ink-200'}`}>
                {quote.tone}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Shuffle Button */}
        <motion.button
          onClick={shuffle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative mt-10 overflow-hidden rounded-full border border-signal/50 bg-signal/5 px-8 py-3 backdrop-blur-sm transition-all duration-500 hover:border-signal hover:bg-signal/10"
          data-cursor="hover"
        >
          <span className="relative z-[1] flex items-center gap-3 font-display text-[12px] uppercase tracking-[0.4em] text-ink-50 transition-colors group-hover:text-signal">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 3 21 3 21 8" />
              <line x1="4" y1="20" x2="21" y2="3" />
              <polyline points="21 16 21 21 16 21" />
              <line x1="15" y1="15" x2="21" y2="21" />
              <line x1="4" y1="4" x2="9" y2="9" />
            </svg>
            Shuffle Archive
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-signal/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
          />
        </motion.button>

        {/* Counter */}
        <p className="mt-4 text-[10px] uppercase tracking-[0.5em] text-ink-300">
          {currentIndex + 1} / {quotes.length} entries
        </p>
      </div>
    </PageScaffold>
  );
}
