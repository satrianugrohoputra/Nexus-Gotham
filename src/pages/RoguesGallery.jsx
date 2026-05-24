import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageScaffold from '../components/PageScaffold.jsx';

// Character portraits from your assets
import jokerImg from '../assets/images/reference/image (2).png';
import riddlerImg from '../assets/images/reference/image (3).png';
import scarecrowImg from '../assets/images/reference/image (4).png';

const villains = [
  {
    id: 'joker',
    name: 'The Joker',
    alias: 'Jack Napier',
    image: jokerImg,
    threat: 98,
    status: 'AT LARGE',
    bio: 'Gotham\'s Clown Prince of Crime. A mind shattered beyond repair, driven by a nihilistic desire to prove that anyone can be broken. No pattern. No motive. Pure chaos.',
    abilities: ['Chemical Warfare', 'Psychological Manipulation', 'Unpredictability'],
  },
  {
    id: 'riddler',
    name: 'The Riddler',
    alias: 'Edward Nashton',
    image: riddlerImg,
    threat: 82,
    status: 'ARKHAM',
    bio: 'A brilliant cryptographer turned serial killer. Obsessed with exposing Gotham\'s corrupt elite through elaborate puzzles and public executions broadcast online.',
    abilities: ['Genius IQ', 'Cryptography', 'Engineering', 'Cyber Warfare'],
  },
  {
    id: 'scarecrow',
    name: 'Scarecrow',
    alias: 'Dr. Jonathan Crane',
    image: scarecrowImg,
    threat: 75,
    status: 'AT LARGE',
    bio: 'Former Arkham psychiatrist who weaponized fear itself. His toxin attacks the amygdala, manifesting a victim\'s deepest terrors into perceived reality.',
    abilities: ['Fear Toxin', 'Psychology', 'Chemical Engineering'],
  },
];

function ThreatBar({ level }) {
  const color =
    level >= 90 ? 'from-red-600 to-red-400' :
    level >= 70 ? 'from-orange-600 to-yellow-400' :
    'from-yellow-600 to-green-400';

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.4em] text-ink-200">
        <span>Threat Level</span>
        <span className="font-mono text-ink-50">{level}/100</span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          style={{
            boxShadow: level >= 90
              ? '0 0 12px rgba(239,68,68,0.6)'
              : '0 0 8px rgba(245,197,24,0.4)',
          }}
        />
      </div>
    </div>
  );
}

function VillainCard({ villain, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-signal/40 hover:bg-white/[0.04]"
      style={{
        boxShadow: hovered
          ? '0 0 40px rgba(245,197,24,0.08), inset 0 1px 0 rgba(255,255,255,0.06)'
          : 'inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
      data-cursor="hover"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <img
          src={villain.image}
          alt={villain.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gotham-900 via-gotham-900/60 to-transparent" />
        {/* Status badge */}
        <div className="absolute right-3 top-3">
          <span
            className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.3em] ${
              villain.status === 'AT LARGE'
                ? 'bg-red-500/20 text-red-400 ring-1 ring-red-500/40'
                : 'bg-yellow-500/20 text-yellow-400 ring-1 ring-yellow-500/40'
            }`}
          >
            {villain.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-5">
        <p className="text-[10px] uppercase tracking-[0.5em] text-signal/70">
          {villain.alias}
        </p>
        <h3 className="mt-1 font-display text-2xl uppercase tracking-[0.15em] text-ink-50">
          {villain.name}
        </h3>

        <ThreatBar level={villain.threat} />

        <p className="mt-4 text-[13px] leading-relaxed text-ink-200/80">
          {villain.bio}
        </p>

        {/* Abilities tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {villain.abilities.map((ability) => (
            <span
              key={ability}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] text-ink-100"
            >
              {ability}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function RoguesGallery() {
  return (
    <PageScaffold
      eyebrow="Rogues Gallery"
      title="The Shadows of Gotham"
      lead="A catalog of the city's most dangerous minds. Threat assessments, psychological profiles, and active status reports from the GCPD database."
    >
      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {villains.map((villain, i) => (
          <VillainCard key={villain.id} villain={villain} index={i} />
        ))}
      </div>
    </PageScaffold>
  );
}
