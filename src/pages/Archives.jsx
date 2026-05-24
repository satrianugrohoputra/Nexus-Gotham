import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageScaffold from '../components/PageScaffold.jsx';

const quotes = [
  {
    text: "It's not who I am underneath, but what I do that defines me.",
    character: 'Batman',
    source: 'Batman Begins (2005)',
    tone: 'dark',
  },
  {
    text: 'The night is darkest just before the dawn. And I promise you, the dawn is coming.',
    character: 'Harvey Dent',
    source: 'The Dark Knight (2008)',
    tone: 'hopeful',
  },
  {
    text: "You either die a hero, or you live long enough to see yourself become the villain.",
    character: 'Harvey Dent',
    source: 'The Dark Knight (2008)',
    tone: 'dark',
  },
  {
    text: "I believe in truth — but I'm also a big fan of justice.",
    character: 'Wonder Woman',
    source: 'Justice League',
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
    source: 'The Dark Knight (2008)',
    tone: 'wisdom',
  },
  {
    text: "Why do we fall? So we can learn to pick ourselves back up.",
    character: 'Alfred Pennyworth',
    source: 'Batman Begins (2005)',
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
    source: 'The Dark Knight Rises (2012)',
    tone: 'dark',
  },
  {
    text: "Madness is like gravity. All it takes is a little push.",
    character: 'The Joker',
    source: 'The Dark Knight (2008)',
    tone: 'chaotic',
  },
  {
    text: "In this world, every act of destruction eventually becomes an act of creation.",
    character: 'Superman',
    source: 'Man of Steel',
    tone: 'hopeful',
  },
  {
    text: "I fight for those who cannot fight for themselves.",
    character: 'Wonder Woman',
    source: 'Wonder Woman (2017)',
    tone: 'hopeful',
  },
  {
    text: "All men have limits. They learn what they are and learn not to exceed them. I ignore mine.",
    character: 'Batman',
    source: 'Knightfall',
    tone: 'dark',
  },
  {
    text: "The world only makes sense if you force it to.",
    character: 'Batman',
    source: 'The Dark Knight Returns',
    tone: 'dark',
  },
];

const toneConfig = {
  dark: { color: 'text-signal', bg: 'bg-signal/10', border: 'border-signal/30', glow: 'rgba(245,197,24,0.15)' },
  hopeful: { color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/30', glow: 'rgba(96,165,250,0.15)' },
  wisdom: { color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/30', glow: 'rgba(52,211,153,0.15)' },
  chaotic: { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30', glow: 'rgba(248,113,113,0.15)' },
};

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

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  }, []);

  const quote = quotes[currentIndex];
  const tone = toneConfig[quote.tone] || toneConfig.dark;

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60, scale: 0.96 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60, scale: 0.96 }),
  };

  return (
    <PageScaffold
      eyebrow="Archives"
      title="Words from the Watchtower"
      lead="Iconic words preserved across the DC multiverse. Wisdom, darkness, chaos, and hope — all housed in one vault."
    >
      {/* Atmospheric fog background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute left-1/2 top-1/2 h-[70vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25"
          style={{
            background: `radial-gradient(ellipse, ${tone.glow} 0%, transparent 70%)`,
            transition: 'background 800ms ease',
            animation: 'fogRise 10s ease-in-out infinite',
          }}
        />
        <div
          className="absolute left-[25%] top-[35%] h-[45vmin] w-[55vmin] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(ellipse, rgba(28,35,54,0.6) 0%, transparent 60%)',
            animation: 'fogRise 14s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute right-[20%] top-[55%] h-[35vmin] w-[40vmin] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(ellipse, rgba(245,197,24,0.04) 0%, transparent 60%)',
            animation: 'fogRise 8s ease-in-out infinite',
            animationDelay: '-3s',
          }}
        />
      </div>

      {/* Quote Card */}
      <div className="relative mt-16 flex flex-col items-center">
        <div className="relative w-full max-w-3xl" style={{ minHeight: '320px' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full overflow-hidden rounded-2xl border border-white/[0.08] p-8 md:p-12"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(10,13,20,0.92) 100%)',
                backdropFilter: 'blur(24px)',
                boxShadow:
                  `0 0 100px rgba(0,0,0,0.5), 0 0 40px ${tone.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
              }}
            >
              {/* Decorative quote mark */}
              <span
                className="absolute -left-2 -top-6 font-display text-[140px] leading-none opacity-[0.06]"
                style={{ color: tone.color.replace('text-', '') }}
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Corner accents */}
              <div className={`absolute left-4 top-4 h-5 w-5 border-l border-t ${tone.border}`} />
              <div className={`absolute right-4 top-4 h-5 w-5 border-r border-t ${tone.border}`} />
              <div className={`absolute bottom-4 left-4 h-5 w-5 border-b border-l ${tone.border}`} />
              <div className={`absolute bottom-4 right-4 h-5 w-5 border-b border-r ${tone.border}`} />

              {/* Quote text */}
              <blockquote className="relative z-10">
                <p
                  className="font-display text-xl leading-relaxed text-ink-50 md:text-2xl lg:text-[28px] lg:leading-[1.5]"
                  style={{ fontStyle: 'italic' }}
                >
                  &ldquo;{quote.text}&rdquo;
                </p>
              </blockquote>

              {/* Attribution */}
              <div className="relative z-10 mt-8 flex items-center gap-4">
                <div className={`h-px flex-1 bg-gradient-to-r ${tone.border.replace('border', 'from')}/40 to-transparent`} />
                <div className="text-right">
                  <p className={`font-display text-sm uppercase tracking-[0.3em] ${tone.color}`}>
                    {quote.character}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.4em] text-ink-300">
                    {quote.source}
                  </p>
                </div>
              </div>

              {/* Tone badge */}
              <div className="absolute right-6 top-6">
                <span className={`rounded-full border px-2.5 py-0.5 text-[9px] uppercase tracking-[0.3em] ${tone.border} ${tone.bg} ${tone.color}`}>
                  {quote.tone}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center gap-4">
          {/* Prev */}
          <motion.button
            onClick={goPrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-ink-200 backdrop-blur-sm transition-all hover:border-signal/40 hover:text-signal"
            data-cursor="hover"
            aria-label="Previous quote"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </motion.button>

          {/* Shuffle */}
          <motion.button
            onClick={shuffle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden rounded-full border border-signal/50 bg-signal/5 px-8 py-3 backdrop-blur-sm transition-all duration-500 hover:border-signal hover:bg-signal/10"
            data-cursor="hover"
          >
            <span className="relative z-[1] flex items-center gap-3 font-display text-[12px] uppercase tracking-[0.4em] text-ink-50 transition-colors group-hover:text-signal">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 3 21 3 21 8"/>
                <line x1="4" y1="20" x2="21" y2="3"/>
                <polyline points="21 16 21 21 16 21"/>
                <line x1="15" y1="15" x2="21" y2="21"/>
                <line x1="4" y1="4" x2="9" y2="9"/>
              </svg>
              Shuffle Archive
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-signal/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
          </motion.button>

          {/* Next */}
          <motion.button
            onClick={goNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-ink-200 backdrop-blur-sm transition-all hover:border-signal/40 hover:text-signal"
            data-cursor="hover"
            aria-label="Next quote"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </motion.button>
        </div>

        {/* Progress indicator */}
        <div className="mt-6 flex items-center gap-1.5">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setDirection(idx > currentIndex ? 1 : -1); setCurrentIndex(idx); }}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-6 bg-signal'
                  : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to quote ${idx + 1}`}
              data-cursor="hover"
            />
          ))}
        </div>

        {/* Counter */}
        <p className="mt-4 text-[10px] uppercase tracking-[0.5em] text-ink-300">
          {currentIndex + 1} / {quotes.length} archived transmissions
        </p>
      </div>
    </PageScaffold>
  );
}
