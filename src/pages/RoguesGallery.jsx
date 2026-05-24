import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import PageScaffold from '../components/PageScaffold.jsx';

// Character portraits from assets
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
    bio: "Gotham's Clown Prince of Crime. A mind shattered beyond repair, driven by a nihilistic desire to prove that anyone can be broken. No pattern. No motive. Pure chaos.",
    abilities: ['Chemical Warfare', 'Psychological Manipulation', 'Unpredictability', 'Improvised Weapons'],
    psych: 'Subject exhibits extreme narcissistic personality disorder combined with antisocial tendencies. Complete detachment from consequences. Highly theatrical — treats violence as performance art. No known leverage or weakness. Containment is temporary at best.',
    lastSeen: 'Amusement Mile, Gotham City',
    knownAssociates: ['Harley Quinn', 'Punchline', 'Various Hired Guns'],
    warrants: 14,
  },
  {
    id: 'riddler',
    name: 'The Riddler',
    alias: 'Edward Nashton',
    image: riddlerImg,
    threat: 82,
    status: 'ARKHAM',
    bio: "A brilliant cryptographer turned serial killer. Obsessed with exposing Gotham's corrupt elite through elaborate puzzles and public executions broadcast online.",
    abilities: ['Genius IQ', 'Cryptography', 'Engineering', 'Cyber Warfare'],
    psych: 'Extreme narcissistic intellectual superiority complex. Compulsive need for recognition drives every act. Cannot resist leaving clues — this is both his signature and his weakness. Currently medicated at Arkham. Risk of relapse: HIGH.',
    lastSeen: 'Arkham Asylum, Cell Block D',
    knownAssociates: ['Online Followers (est. 40,000)', 'Dark Web Network'],
    warrants: 7,
  },
  {
    id: 'scarecrow',
    name: 'Scarecrow',
    alias: 'Dr. Jonathan Crane',
    image: scarecrowImg,
    threat: 75,
    status: 'AT LARGE',
    bio: "Former Arkham psychiatrist who weaponized fear itself. His toxin attacks the amygdala, manifesting a victim's deepest terrors into perceived reality.",
    abilities: ['Fear Toxin', 'Psychology', 'Chemical Engineering', 'Interrogation'],
    psych: 'Fascination with fear borders on obsession. Views terror as the purest human emotion and considers his work \"research.\" Physically frail but compensates with aerosolized compounds. Approach with full NBC gear. Do NOT engage in conversation — he will profile you.',
    lastSeen: 'The Narrows, Old Gotham',
    knownAssociates: ['Former Arkham Staff', 'Underground Chemists'],
    warrants: 9,
  },
  {
    id: 'catwoman',
    name: 'Catwoman',
    alias: 'Selina Kyle',
    image: null,
    threat: 72,
    status: 'AT LARGE',
    bio: "Gotham's most elusive thief. Operates in the moral grey zone between criminal and vigilante. Her agility rivals Batman's own — a fact she reminds him of constantly.",
    abilities: ['Agility & Stealth', 'Expert Martial Artist', 'Master Thief', 'Whip Proficiency'],
    psych: 'Complex moral framework — not classically criminal. Driven by survival instinct forged in Gotham\'s East End. Maintains a code: targets only the corrupt wealthy. Relationship with Batman complicates all psychological profiling. Not recommended for Arkham. Flight risk: EXTREME.',
    lastSeen: 'Diamond District, Upper Gotham',
    knownAssociates: ['Holly Robinson', 'The Sirens', 'Batman (unconfirmed)'],
    warrants: 23,
  },
  {
    id: 'harley',
    name: 'Harley Quinn',
    alias: 'Dr. Harleen Quinzel',
    image: null,
    threat: 78,
    status: 'ARKHAM',
    bio: "Former Arkham psychiatrist corrupted by the Joker. Has since broken free of his influence but retains the chaotic skillset. Unpredictable combatant with Olympic-level gymnastics.",
    abilities: ['Unpredictable Combat', 'Gymnastics', 'Psychology Expertise', 'Improvised Weaponry'],
    psych: 'Post-Joker recovery ongoing but volatile. Exhibits rapid cycling between lucidity and manic episodes. Combat skills heightened during manic states. Former doctorate in psychiatry makes her dangerously perceptive. Current cooperation with authorities is tentative — approach with caution.',
    lastSeen: 'Arkham Asylum, Minimum Security Wing',
    knownAssociates: ['Poison Ivy', 'The Joker (formerly)', 'Suicide Squad (Task Force X)'],
    warrants: 11,
  },
  {
    id: 'penguin',
    name: 'The Penguin',
    alias: 'Oswald Cobblepot',
    image: null,
    threat: 65,
    status: 'UNDER INVESTIGATION',
    bio: "Gotham's underworld kingpin disguised as legitimate businessman. Controls the Iceberg Lounge — a front for weapons trafficking, money laundering, and information brokering.",
    abilities: ['Criminal Network & Logistics', 'Political Influence', 'Arms Dealing', 'Intelligence Network'],
    psych: 'Narcissistic personality with deep-seated inferiority complex masked by displays of wealth. Physically non-threatening but commands vast criminal infrastructure. Extremely paranoid — security detail is military-grade. Considers himself Gotham\'s rightful ruler.',
    lastSeen: 'Iceberg Lounge, Burnley District',
    knownAssociates: ['Victor Zsasz', 'Sofia Falcone', 'Various GCPD Contacts (corrupt)'],
    warrants: 3,
  },
  {
    id: 'freeze',
    name: 'Mr. Freeze',
    alias: 'Dr. Victor Fries',
    image: null,
    threat: 88,
    status: 'ARKHAM',
    bio: "A cryogenics scientist driven to crime by desperation to save his terminally ill wife, Nora. His freeze suit maintains his body at sub-zero temperatures — remove it and he dies.",
    abilities: ['Cryogenic Technology', 'Genius Intellect', 'Freeze Gun', 'Sub-Zero Physiology'],
    psych: 'Not classically criminal — driven entirely by love for his wife. Emotional state is paradoxically the coldest and most passionate in Arkham. Will cooperate if Nora\'s treatment is discussed. Extremely dangerous when cornered. Suit provides superhuman durability.',
    lastSeen: 'Arkham Asylum, Cryogenic Containment Unit',
    knownAssociates: ['Nora Fries (wife, cryogenic stasis)', 'GothCorp (former employer)'],
    warrants: 6,
  },
  {
    id: 'bane',
    name: 'Bane',
    alias: 'Unknown (Born in Peña Dura)',
    image: null,
    threat: 92,
    status: 'PEÑA DURA',
    bio: "Born and raised in a Caribbean prison. Self-educated polymath who broke the Bat. Combines peak tactical genius with Venom-enhanced superhuman strength. The only villain to truly defeat Batman.",
    abilities: ['Peak Strength & Strategy', 'Venom Enhancement', 'Multilingual Genius', 'Military Tactics'],
    psych: 'Genius-level strategist with monk-like discipline. Unlike other rogues, Bane operates with patience and long-term planning. Venom dependency is his weakness — without it, strength returns to peak-human. Respects Batman as an equal. Most dangerous when calm.',
    lastSeen: 'Peña Dura Prison, Santa Prisca',
    knownAssociates: ['Bird', 'Trogg', 'Zombie', 'League of Assassins (former)'],
    warrants: 4,
  },
  {
    id: 'twoface',
    name: 'Two-Face',
    alias: 'Harvey Dent',
    image: null,
    threat: 70,
    status: 'ARKHAM',
    bio: "Former District Attorney — Gotham's White Knight — scarred by acid, splitting his psyche in two. Now makes life-or-death decisions with the flip of his scarred coin.",
    abilities: ['Psychological Volatility', 'Legal Expertise', 'Dual Personality', 'Organized Crime Leadership'],
    psych: 'Dissociative identity disorder — the Harvey persona is still present but suppressed. The scarred side operates on binary morality: the coin decides all. Dangerous because the \"good\" half makes him unpredictable. Potential for rehabilitation exists but previous attempts have failed catastrophically.',
    lastSeen: 'Arkham Asylum, Cell Block B',
    knownAssociates: ['Renee Montoya (former ally)', 'Gotham Mob Remnants', 'Gilda Dent (ex-wife)'],
    warrants: 8,
  },
  {
    id: 'ivy',
    name: 'Poison Ivy',
    alias: 'Dr. Pamela Isley',
    image: null,
    threat: 90,
    status: 'AT LARGE',
    bio: "Eco-terrorist with complete biochemical control over plant life. Her pheromones can override human willpower. Views humanity as a plague on Earth — plants are her true family.",
    abilities: ['Biochemical Warfare', 'Pheromone Mind Control', 'Chlorokinesis', 'Toxin Immunity'],
    psych: 'Post-human identification — no longer considers herself part of humanity. Pheromone abilities make all interrogation unreliable. Emotional connection to Harley Quinn is the only known leverage. Environmental extremist ideology is absolute — negotiation only possible through ecological concessions.',
    lastSeen: 'Robinson Park, Gotham (self-declared territory)',
    knownAssociates: ['Harley Quinn', 'Swamp Thing (ideological)', 'The Green (metahuman network)'],
    warrants: 12,
  },
  {
    id: 'redhood',
    name: 'Red Hood',
    alias: 'Jason Todd',
    image: null,
    threat: 95,
    status: 'UNKNOWN',
    bio: "Former Robin, killed by the Joker, resurrected via Lazarus Pit. Now wages a lethal war on crime that Batman refuses to endorse. The most dangerous person who knows all of Batman's secrets.",
    abilities: ['Lethal Vigilantism & Firepower', 'Batman-Level Training', 'Lazarus-Enhanced Physiology', 'Explosives Expert'],
    psych: 'Extreme trauma response manifesting as controlled rage. Possesses all of Batman\'s training with none of his restraint. Kill count: classified. Motivation is genuinely anti-crime but methodology is unacceptable. Knows Bat-family identities and protocols. Threat classification debated: vigilante or villain?',
    lastSeen: 'Crime Alley, Park Row (symbolic)',
    knownAssociates: ['The Outlaws', 'Talia al Ghul (former)', 'Bat-Family (estranged)'],
    warrants: 0,
  },
];

/* ─── Threat Bar ─── */
function ThreatBar({ level, animate = true }) {
  const color =
    level >= 90 ? 'from-red-600 to-red-400' :
    level >= 70 ? 'from-orange-600 to-yellow-400' :
    'from-yellow-600 to-green-400';

  return (
    <div>
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.4em] text-ink-200">
        <span>Threat Level</span>
        <span className="font-mono text-ink-50">{level}/100</span>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          initial={animate ? { width: 0 } : false}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          style={{
            boxShadow: level >= 90
              ? '0 0 14px rgba(239,68,68,0.7)'
              : '0 0 10px rgba(245,197,24,0.5)',
          }}
        />
      </div>
    </div>
  );
}

/* ─── Terminal Loading Effect ─── */
function TerminalLoader({ onComplete }) {
  const [lines, setLines] = useState([]);
  const terminalLines = [
    '> ESTABLISHING SECURE CONNECTION...',
    '> ACCESSING GCPD DATABASE...',
    '> DECRYPTING CLASSIFIED FILES...',
    '> BYPASSING ARKHAM FIREWALL...',
    '> FILE RETRIEVED. RENDERING DATA...',
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < terminalLines.length) {
        setLines((prev) => [...prev, terminalLines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 300);
      }
    }, 280);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-1.5 rounded-lg border border-green-500/20 bg-black/80 p-4 font-mono text-[11px]">
      {lines.map((line, idx) => (
        <motion.p
          key={idx}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.15 }}
          className="text-green-400"
        >
          {line}
        </motion.p>
      ))}
      {lines.length < terminalLines.length && (
        <span className="inline-block animate-pulse text-green-400">█</span>
      )}
    </div>
  );
}

/* ─── Villain Detail Modal ─── */
function VillainModal({ villain, onClose }) {
  const [loaded, setLoaded] = useState(false);

  // Close on Escape
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
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <motion.div
        className="relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/[0.08] p-0"
        style={{
          background: 'linear-gradient(145deg, rgba(20,25,40,0.98) 0%, rgba(5,7,13,0.99) 100%)',
          boxShadow: '0 0 80px rgba(0,0,0,0.6), 0 0 40px rgba(245,197,24,0.04)',
        }}
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* Header image */}
        <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
          {villain.image ? (
            <img
              src={villain.image}
              alt={villain.name}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gotham-700 to-gotham-950">
              <span className="font-display text-[80px] uppercase leading-none text-signal/10">{villain.name[0]}</span>
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 6px, rgba(245,197,24,0.02) 6px, rgba(245,197,24,0.02) 7px)' }} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14192890] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/50 text-ink-50 backdrop-blur-sm transition-all hover:border-signal/50 hover:text-signal"
            data-cursor="hover"
          >
            <X size={14} />
          </button>

          {/* Name overlay */}
          <div className="absolute bottom-4 left-6">
            <p className="text-[10px] uppercase tracking-[0.5em] text-signal/80">
              {villain.alias}
            </p>
            <h2 className="font-display text-3xl uppercase tracking-[0.12em] text-ink-50">
              {villain.name}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {!loaded ? (
            <TerminalLoader onComplete={() => setLoaded(true)} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Threat Level */}
              <ThreatBar level={villain.threat} animate={true} />

              {/* Status & Location */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-ink-300">Status</p>
                  <p className={`mt-1 font-mono text-sm font-bold ${
                    villain.status === 'AT LARGE' ? 'text-red-400'
                    : villain.status === 'UNKNOWN' ? 'text-purple-400'
                    : villain.status === 'UNDER INVESTIGATION' ? 'text-blue-400'
                    : villain.status === 'PEÑA DURA' ? 'text-orange-400'
                    : 'text-yellow-400'
                  }`}>
                    {villain.status}
                  </p>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-ink-300">Active Warrants</p>
                  <p className="mt-1 font-mono text-sm font-bold text-ink-50">{villain.warrants}</p>
                </div>
              </div>

              {/* Last Seen */}
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                <p className="text-[9px] uppercase tracking-[0.4em] text-ink-300">Last Known Location</p>
                <p className="mt-1 font-mono text-[12px] text-signal">{villain.lastSeen}</p>
              </div>

              {/* Psych Assessment */}
              <div>
                <p className="mb-2 text-[9px] uppercase tracking-[0.5em] text-signal/60">
                  Psychological Assessment
                </p>
                <p className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 text-[13px] leading-relaxed text-ink-200/80">
                  {villain.psych}
                </p>
              </div>

              {/* Known Associates */}
              <div>
                <p className="mb-2 text-[9px] uppercase tracking-[0.5em] text-signal/60">
                  Known Associates
                </p>
                <div className="flex flex-wrap gap-2">
                  {villain.knownAssociates.map((assoc) => (
                    <span
                      key={assoc}
                      className="rounded-full border border-red-500/20 bg-red-500/[0.06] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-red-300"
                    >
                      {assoc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Abilities */}
              <div>
                <p className="mb-2 text-[9px] uppercase tracking-[0.5em] text-signal/60">
                  Documented Capabilities
                </p>
                <div className="flex flex-wrap gap-2">
                  {villain.abilities.map((ability) => (
                    <span
                      key={ability}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-ink-100"
                    >
                      {ability}
                    </span>
                  ))}
                </div>
              </div>

              {/* File footer */}
              <div className="border-t border-white/[0.06] pt-4 text-center">
                <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-ink-300/60">
                  FILE CLASSIFICATION: LEVEL 5 — EYES ONLY — GCPD / BATMAN INC.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Villain Card (Clickable) ─── */
function VillainCard({ villain, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-signal/40 hover:bg-white/[0.04]"
      style={{
        boxShadow: hovered
          ? '0 0 40px rgba(245,197,24,0.08), inset 0 1px 0 rgba(255,255,255,0.06)'
          : 'inset 0 1px 0 rgba(255,255,255,0.04)',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
      }}
      data-cursor="hover"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {villain.image ? (
          <img
            src={villain.image}
            alt={villain.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gotham-800 to-gotham-950">
            <span className="font-display text-[100px] uppercase leading-none text-signal/[0.08] transition-all duration-700 group-hover:text-signal/[0.15] group-hover:scale-110">
              {villain.name[0]}
            </span>
            {/* Atmospheric lines */}
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(245,197,24,0.02) 8px, rgba(245,197,24,0.02) 9px)' }} />
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gotham-900 via-gotham-900/60 to-transparent" />
        {/* Scan line effect on hover */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(245,197,24,0.03) 2px, rgba(245,197,24,0.03) 4px)',
          }}
        />
        {/* Status badge */}
        <div className="absolute right-3 top-3">
          <span
            className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.3em] ${
              villain.status === 'AT LARGE'
                ? 'bg-red-500/20 text-red-400 ring-1 ring-red-500/40'
                : villain.status === 'UNKNOWN'
                ? 'bg-purple-500/20 text-purple-400 ring-1 ring-purple-500/40'
                : villain.status === 'UNDER INVESTIGATION'
                ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/40'
                : villain.status === 'PEÑA DURA'
                ? 'bg-orange-500/20 text-orange-400 ring-1 ring-orange-500/40'
                : 'bg-yellow-500/20 text-yellow-400 ring-1 ring-yellow-500/40'
            }`}
          >
            {villain.status}
          </span>
        </div>
        {/* Click hint */}
        <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="rounded-full border border-signal/40 bg-gotham-900/80 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.3em] text-signal">
            Access File →
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

        <p className="mt-4 line-clamp-2 text-[13px] leading-relaxed text-ink-200/80">
          {villain.bio}
        </p>

        {/* Abilities tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {villain.abilities.slice(0, 3).map((ability) => (
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

/* ─── Page ─── */
export default function RoguesGallery() {
  const [selected, setSelected] = useState(null);

  return (
    <PageScaffold
      eyebrow="Rogues Gallery"
      title="The Shadows of Gotham"
      lead="A catalog of the city's most dangerous minds. Click a profile to access classified GCPD files."
    >
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {villains.map((villain, i) => (
          <VillainCard
            key={villain.id}
            villain={villain}
            index={i}
            onClick={() => setSelected(villain)}
          />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <VillainModal
            villain={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </PageScaffold>
  );
}
