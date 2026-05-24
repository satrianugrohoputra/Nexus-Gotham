import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageScaffold from '../components/PageScaffold.jsx';

// Using existing reference images
import batmanImg from '../assets/images/reference/batman eyes rain.jpg';
import sceneImg from '../assets/images/reference/imagebatman2.png';

const heroes = [
  {
    id: 'batman',
    name: 'Batman',
    alias: 'Bruce Wayne',
    image: batmanImg,
    universe: 'Earth-1',
    role: 'The Detective',
    affiliation: 'Justice League — Founder',
    description:
      "The Dark Knight of Gotham. No superpowers — only peak human conditioning, genius-level intellect, and an indomitable will forged in tragedy. The contingency plan for when gods fall.",
    stats: { intellect: 96, combat: 94, tech: 98, stealth: 95, willpower: 99 },
    weakness: 'Human physiology. Emotional isolation. The memory of Crime Alley.',
    quote: "I am vengeance. I am the night.",
  },
  {
    id: 'superman',
    name: 'Superman',
    alias: 'Kal-El / Clark Kent',
    image: sceneImg,
    universe: 'Earth-1',
    role: 'The Beacon',
    affiliation: 'Justice League — Leader',
    description:
      "Last Son of Krypton. Empowered by Earth's yellow sun, he represents the ideal that humanity can aspire to — strength tempered by compassion. The most powerful being on the planet chooses kindness.",
    stats: { intellect: 78, combat: 99, tech: 60, stealth: 30, willpower: 92 },
    weakness: 'Kryptonite. Magic. Emotional bonds to humanity.',
    quote: "You're much stronger than you think you are. Trust me.",
  },
  {
    id: 'wonderwoman',
    name: 'Wonder Woman',
    alias: 'Diana of Themyscira',
    image: null,
    universe: 'Earth-1',
    role: 'The Warrior',
    affiliation: 'Justice League — Trinity',
    description:
      "Princess of Themyscira, ambassador to Man's World. Combines the wisdom of Athena with the strength of Heracles. Thousands of years of combat experience make her the League's most skilled warrior.",
    stats: { intellect: 88, combat: 97, tech: 55, stealth: 60, willpower: 95 },
    weakness: 'Piercing weapons if unguarded. Emotional compassion exploitable.',
    quote: "I fight for those who cannot fight for themselves.",
  },
  {
    id: 'flash',
    name: 'The Flash',
    alias: 'Barry Allen',
    image: null,
    universe: 'Earth-1',
    role: 'The Speedster',
    affiliation: 'Justice League — Core',
    description:
      "Connected to the Speed Force — a fundamental cosmic energy. Can perceive events in attoseconds and vibrate through solid matter. His speed makes him the League's most versatile asset.",
    stats: { intellect: 85, combat: 70, tech: 82, stealth: 45, willpower: 78 },
    weakness: 'Cold-based weapons. Requires caloric intake. Speed Force instability.',
    quote: "Life doesn't give us purpose. We give life purpose.",
  },
  {
    id: 'aquaman',
    name: 'Aquaman',
    alias: 'Arthur Curry',
    image: null,
    universe: 'Earth-1',
    role: 'The King',
    affiliation: 'Justice League — Core',
    description:
      "King of Atlantis. Commands the oceans and everything within. Superhuman strength, telepathic control over marine life, and political authority over 70% of the planet's surface.",
    stats: { intellect: 72, combat: 90, tech: 65, stealth: 50, willpower: 85 },
    weakness: 'Prolonged dehydration. Political obligations. Surface-world prejudice.',
    quote: "I am the King of the Seven Seas.",
  },
];

/* ─── Stat Bar (Blue/Gold themed) ─── */
function StatBar({ label, value, delay = 0 }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-12 text-[9px] uppercase tracking-[0.3em] text-blue-300/70">
        {label}
      </span>
      <div className="flex-1">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #1e40af, #3b82f6, #d4af37)',
              boxShadow: '0 0 8px rgba(59,130,246,0.5)',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: delay + 0.3 }}
          />
        </div>
      </div>
      <span className="w-8 text-right font-mono text-[10px] text-ink-100">{value}</span>
    </div>
  );
}

/* ─── Hero Detail Modal ─── */
function HeroModal({ hero, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <motion.div
        className="relative z-10 max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-blue-500/20 p-0"
        style={{
          background: 'linear-gradient(145deg, rgba(13,27,61,0.98) 0%, rgba(5,7,20,0.99) 100%)',
          boxShadow: '0 0 80px rgba(0,0,0,0.6), 0 0 40px rgba(59,130,246,0.08)',
        }}
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* Header */}
        {hero.image ? (
          <div className="relative h-44 w-full overflow-hidden rounded-t-2xl">
            <img src={hero.image} alt={hero.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b3d] via-[#0d1b3d]/50 to-transparent" />
          </div>
        ) : (
          <div className="relative flex h-44 w-full items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#0d1b3d] to-[#1e3a6e]">
            <span className="font-display text-8xl uppercase text-blue-500/10">{hero.name[0]}</span>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b3d] to-transparent" />
          </div>
        )}

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/50 text-ink-50 backdrop-blur-sm transition-all hover:border-blue-400/50 hover:text-blue-400"
          data-cursor="hover"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.5em] text-blue-400/70">{hero.alias}</p>
            <h2 className="mt-1 font-display text-3xl uppercase tracking-[0.12em] text-ink-50">{hero.name}</h2>
            <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-[#d4af37]">{hero.affiliation}</p>
          </div>

          <p className="text-[13px] leading-relaxed text-ink-200/80">{hero.description}</p>

          {/* Quote */}
          <div className="rounded-lg border border-blue-500/20 bg-blue-500/[0.04] p-4">
            <p className="font-display text-sm italic text-blue-200">&ldquo;{hero.quote}&rdquo;</p>
          </div>

          {/* Stats */}
          <div className="space-y-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="mb-3 text-[9px] uppercase tracking-[0.5em] text-blue-400/50">Profile Metrics</p>
            {Object.entries(hero.stats).map(([key, val], i) => (
              <StatBar key={key} label={key.slice(0, 4).toUpperCase()} value={val} delay={i * 0.08} />
            ))}
          </div>

          {/* Weakness */}
          <div className="rounded-lg border border-red-500/20 bg-red-500/[0.03] p-4">
            <p className="mb-1 text-[9px] uppercase tracking-[0.5em] text-red-400/60">Known Vulnerabilities</p>
            <p className="text-[12px] text-red-300/80">{hero.weakness}</p>
          </div>

          {/* Footer */}
          <div className="border-t border-white/[0.06] pt-4 text-center">
            <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-ink-300/60">
              JUSTICE LEAGUE DATABASE — CLEARANCE: WATCHTOWER LEVEL
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Hero Card ─── */
function HeroCard({ hero, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] backdrop-blur-xl transition-all duration-500 hover:border-blue-400/30"
      style={{
        background: hovered
          ? 'linear-gradient(135deg, rgba(59,130,246,0.04) 0%, rgba(13,27,61,0.95) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(13,27,61,0.9) 100%)',
        boxShadow: hovered
          ? '0 0 50px rgba(59,130,246,0.08), inset 0 1px 0 rgba(255,255,255,0.06)'
          : 'inset 0 1px 0 rgba(255,255,255,0.03)',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
      }}
      data-cursor="hover"
    >
      {/* Image or Initial */}
      {hero.image ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <img
            src={hero.image}
            alt={hero.name}
            className="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:opacity-90 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b3d] via-[#0d1b3d]/50 to-transparent" />
          {/* Scan effect on hover */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(59,130,246,0.02) 3px, rgba(59,130,246,0.02) 6px)',
            }}
          />
        </div>
      ) : (
        <div className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#0d1b3d] to-[#1a3270]">
          <span className="font-display text-7xl uppercase tracking-widest text-blue-500/10 transition-all duration-500 group-hover:text-blue-500/20 group-hover:scale-110">
            {hero.name[0]}
          </span>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b3d] via-transparent to-transparent" />
        </div>
      )}

      {/* Universe badge */}
      <div className="absolute left-4 top-4">
        <span className="rounded border border-blue-400/40 bg-[#0d1b3d]/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.3em] text-blue-400">
          {hero.universe}
        </span>
      </div>
      {/* Role badge */}
      <div className="absolute right-4 top-4">
        <span className="rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-[#d4af37]">
          {hero.role}
        </span>
      </div>

      {/* Click hint */}
      <div className="absolute bottom-4 left-0 right-0 z-10 text-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="rounded-full border border-blue-400/40 bg-[#0d1b3d]/80 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.3em] text-blue-400">
          Access Profile →
        </span>
      </div>

      {/* Content */}
      <div className="relative p-5">
        <p className="text-[10px] uppercase tracking-[0.5em] text-blue-400/70">
          {hero.alias}
        </p>
        <h3 className="mt-1 font-display text-2xl uppercase tracking-[0.15em] text-ink-50">
          {hero.name}
        </h3>

        <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-ink-200/80">
          {hero.description}
        </p>

        {/* Mini stat preview */}
        <div className="mt-4 flex gap-3">
          {Object.entries(hero.stats).slice(0, 3).map(([key, val]) => (
            <div key={key} className="flex-1 rounded border border-white/[0.06] bg-white/[0.02] px-2 py-1.5 text-center">
              <p className="text-[8px] uppercase tracking-[0.3em] text-blue-400/50">{key.slice(0, 4)}</p>
              <p className="font-mono text-[12px] font-bold text-ink-50">{val}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Page with Theme Transition ─── */
export default function Nexus() {
  const [themeReady, setThemeReady] = useState(false);
  const [selected, setSelected] = useState(null);

  // Smooth global theme transition on mount
  useEffect(() => {
    // Apply nexus theme to document
    document.documentElement.style.setProperty('--nexus-active', '1');
    document.documentElement.classList.add('nexus-theme');

    const timer = setTimeout(() => setThemeReady(true), 100);

    return () => {
      document.documentElement.style.removeProperty('--nexus-active');
      document.documentElement.classList.remove('nexus-theme');
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Theme transition overlay */}
      <AnimatePresence>
        {!themeReady && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0d1b3d]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="mx-auto h-12 w-12 rounded-full border-2 border-blue-400/30 border-t-blue-400 animate-spin" />
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.5em] text-blue-400/70">
                Connecting to Watchtower...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PageScaffold
        palette="nexus"
        eyebrow="The Multiverse Nexus"
        title="Beyond Gotham"
        lead="Justice League data node. Click a profile to access full dossier — capabilities, vulnerabilities, and cross-dimensional threat assessments."
      >
        {/* Nexus-themed atmospheric background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute left-1/2 top-[30%] h-[50vmin] w-[70vmin] -translate-x-1/2 rounded-full opacity-20"
            style={{
              background: 'radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)',
              animation: 'fogRise 12s ease-in-out infinite',
            }}
          />
          <div
            className="absolute right-[20%] top-[50%] h-[30vmin] w-[40vmin] rounded-full opacity-15"
            style={{
              background: 'radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 60%)',
              animation: 'fogRise 9s ease-in-out infinite reverse',
            }}
          />
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {heroes.map((hero, i) => (
            <HeroCard
              key={hero.id}
              hero={hero}
              index={i}
              onClick={() => setSelected(hero)}
            />
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selected && (
            <HeroModal hero={selected} onClose={() => setSelected(null)} />
          )}
        </AnimatePresence>
      </PageScaffold>
    </>
  );
}
