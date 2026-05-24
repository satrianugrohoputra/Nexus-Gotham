import { useState } from 'react';
import { motion } from 'framer-motion';
import PageScaffold from '../components/PageScaffold.jsx';

// Using existing reference images for heroes
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
    description:
      'The Dark Knight of Gotham. No superpowers — only peak human conditioning, genius-level intellect, and an indomitable will forged in tragedy.',
    stats: { intellect: 96, combat: 94, tech: 98, stealth: 95 },
  },
  {
    id: 'superman',
    name: 'Superman',
    alias: 'Kal-El / Clark Kent',
    image: sceneImg,
    universe: 'Earth-1',
    role: 'The Beacon',
    description:
      'Last Son of Krypton. Empowered by Earth\'s yellow sun, he represents the ideal that humanity can aspire to — strength tempered by compassion.',
    stats: { intellect: 78, combat: 99, tech: 60, stealth: 30 },
  },
  {
    id: 'wonderwoman',
    name: 'Wonder Woman',
    alias: 'Diana Prince',
    image: null,
    universe: 'Earth-1',
    role: 'The Warrior',
    description:
      'Princess of Themyscira, ambassador to Man\'s World. Combines the wisdom of Athena with the strength of Heracles — diplomacy and fury in equal measure.',
    stats: { intellect: 88, combat: 97, tech: 55, stealth: 60 },
  },
  {
    id: 'flash',
    name: 'The Flash',
    alias: 'Barry Allen',
    image: null,
    universe: 'Earth-1',
    role: 'The Speedster',
    description:
      'Connected to the Speed Force — a fundamental cosmic energy. Can perceive events in attoseconds and vibrate through solid matter.',
    stats: { intellect: 85, combat: 70, tech: 82, stealth: 45 },
  },
];

function StatBar({ label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-16 text-[9px] uppercase tracking-[0.3em] text-nexusBlue-accent/70">
        {label}
      </span>
      <div className="flex-1">
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-nexusBlue-accent to-blue-300"
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
            style={{ boxShadow: '0 0 8px rgba(90,200,250,0.4)' }}
          />
        </div>
      </div>
      <span className="w-8 text-right font-mono text-[10px] text-ink-100">
        {value}
      </span>
    </div>
  );
}

function HeroCard({ hero, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] backdrop-blur-xl transition-all duration-500 hover:border-nexusBlue-accent/30"
      style={{
        background: hovered
          ? 'linear-gradient(135deg, rgba(90,200,250,0.04) 0%, rgba(13,27,61,0.95) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(13,27,61,0.9) 100%)',
        boxShadow: hovered
          ? '0 0 50px rgba(90,200,250,0.08), inset 0 1px 0 rgba(255,255,255,0.06)'
          : 'inset 0 1px 0 rgba(255,255,255,0.03)',
      }}
      data-cursor="hover"
    >
      {/* Image or placeholder */}
      {hero.image ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <img
            src={hero.image}
            alt={hero.name}
            className="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:opacity-90 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b3d] via-[#0d1b3d]/50 to-transparent" />
        </div>
      ) : (
        <div className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-nexusBlue-base to-gotham-900">
          <span className="font-display text-6xl uppercase tracking-widest text-nexusBlue-accent/10">
            {hero.name[0]}
          </span>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b3d] via-transparent to-transparent" />
        </div>
      )}

      {/* Universe badge */}
      <div className="absolute left-4 top-4">
        <span className="rounded border border-nexusBlue-accent/40 bg-[#0d1b3d]/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.3em] text-nexusBlue-accent">
          {hero.universe}
        </span>
      </div>
      {/* Role badge */}
      <div className="absolute right-4 top-4">
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-ink-100">
          {hero.role}
        </span>
      </div>

      {/* Content */}
      <div className="relative p-6">
        <p className="text-[10px] uppercase tracking-[0.5em] text-nexusBlue-accent/70">
          {hero.alias}
        </p>
        <h3 className="mt-1 font-display text-2xl uppercase tracking-[0.15em] text-ink-50">
          {hero.name}
        </h3>

        <p className="mt-3 text-[13px] leading-relaxed text-ink-200/80">
          {hero.description}
        </p>

        {/* Stats */}
        <div className="mt-5 space-y-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="mb-3 text-[9px] uppercase tracking-[0.5em] text-nexusBlue-accent/50">
            Profile Metrics
          </p>
          <StatBar label="INT" value={hero.stats.intellect} />
          <StatBar label="CMBT" value={hero.stats.combat} />
          <StatBar label="TECH" value={hero.stats.tech} />
          <StatBar label="STLH" value={hero.stats.stealth} />
        </div>
      </div>
    </motion.div>
  );
}

export default function Nexus() {
  return (
    <PageScaffold
      palette="nexus"
      eyebrow="Nexus"
      title="Beyond Gotham"
      lead="The Justice League data node. Heroes from across the multiverse — their capabilities, allegiances, and threat assessments cataloged for cross-dimensional coordination."
    >
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {heroes.map((hero, i) => (
          <HeroCard key={hero.id} hero={hero} index={i} />
        ))}
      </div>
    </PageScaffold>
  );
}
