import { useState } from 'react';
import { motion } from 'framer-motion';
import PageScaffold from '../components/PageScaffold.jsx';

// Using existing assets
import batarangImg from '../assets/images/reference/logo batarang.jpg';
import techImg1 from '../assets/images/reference/image (7).png';
import techImg2 from '../assets/images/reference/image (8).png';
import batmanGearImg from '../assets/images/reference/imagebatman2.png';

const gadgets = [
  {
    id: 'batarang',
    name: 'Batarang MK-V',
    category: 'OFFENSIVE',
    image: batarangImg,
    specs: {
      weight: '312g',
      material: 'Carbon-Titanium Alloy',
      range: '45m effective',
      deployment: 'Wrist-mounted launcher',
    },
    description:
      'Precision-engineered throwing weapon with programmable return trajectory. The MK-V variant includes micro-explosive tips and EMP disruption payloads.',
    status: 'FIELD READY',
  },
  {
    id: 'cowl',
    name: 'Tactical Cowl v8.2',
    category: 'RECON',
    image: techImg1,
    specs: {
      weight: '1.8kg',
      material: 'Nomex / Graphene Mesh',
      vision: 'IR, UV, Sonar, AR-HUD',
      comms: 'Encrypted 256-bit',
    },
    description:
      'Multi-spectrum heads-up display with real-time threat analysis. Integrated bone-conduction comms and 40db directional microphone array.',
    status: 'ACTIVE DEPLOYMENT',
  },
  {
    id: 'grapple',
    name: 'Grapple Gun X-7',
    category: 'MOBILITY',
    image: techImg2,
    specs: {
      weight: '2.4kg',
      material: 'Aircraft-grade Aluminum',
      cable: '150m Dyneema',
      load: '320kg max',
    },
    description:
      'Magnetic-anchor grapple system with variable-speed retraction. Pneumatic launcher achieves 80m/s muzzle velocity for rapid vertical extraction.',
    status: 'FIELD READY',
  },
  {
    id: 'batsuit',
    name: 'Batsuit Mk.IV',
    category: 'DEFENSE',
    image: batmanGearImg,
    specs: {
      weight: '11.3kg full kit',
      material: 'Tri-weave Titanium',
      protection: 'Class IIIA Ballistic',
      mobility: '92% range of motion',
    },
    description:
      'Next-generation tactical armor with electrochromic camouflage. Integrated muscle-amplification servos provide 40% strength enhancement without sacrificing agility.',
    status: 'PROTOTYPE',
  },
];

function BlueprintGrid({ specs }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
      {Object.entries(specs).map(([key, value]) => (
        <div key={key} className="border-l border-signal/30 pl-3">
          <p className="text-[9px] uppercase tracking-[0.4em] text-ink-300">
            {key}
          </p>
          <p className="mt-0.5 font-mono text-[12px] text-ink-50">{value}</p>
        </div>
      ))}
    </div>
  );
}

function GadgetCard({ gadget, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] backdrop-blur-xl transition-all duration-500 hover:border-signal/30"
      style={{
        background: hovered
          ? 'linear-gradient(135deg, rgba(245,197,24,0.03) 0%, rgba(13,20,36,0.95) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(10,13,20,0.95) 100%)',
        boxShadow: hovered
          ? '0 0 60px rgba(245,197,24,0.06), inset 0 1px 0 rgba(255,255,255,0.06)'
          : 'inset 0 1px 0 rgba(255,255,255,0.03)',
      }}
      data-cursor="hover"
    >
      {/* Blueprint corner decorations */}
      <div className="absolute left-3 top-3 h-4 w-4 border-l border-t border-signal/30" />
      <div className="absolute right-3 top-3 h-4 w-4 border-r border-t border-signal/30" />
      <div className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-signal/30" />
      <div className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-signal/30" />

      {/* Image section */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img
          src={gadget.image}
          alt={gadget.name}
          className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
          loading="lazy"
        />
        {/* Blueprint overlay grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(245,197,24,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,197,24,0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gotham-900 via-transparent to-transparent" />
        {/* Category badge */}
        <div className="absolute left-4 top-4">
          <span className="rounded border border-signal/40 bg-gotham-900/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.3em] text-signal">
            {gadget.category}
          </span>
        </div>
        {/* Status */}
        <div className="absolute right-4 top-4">
          <span
            className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] ${
              gadget.status === 'PROTOTYPE'
                ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30'
                : 'bg-green-500/20 text-green-400 ring-1 ring-green-500/30'
            }`}
          >
            {gadget.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6">
        <h3 className="font-display text-xl uppercase tracking-[0.15em] text-ink-50">
          {gadget.name}
        </h3>

        <p className="mt-3 text-[13px] leading-relaxed text-ink-200/80">
          {gadget.description}
        </p>

        {/* Blueprint specs */}
        <div className="mt-5 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="mb-2 text-[9px] uppercase tracking-[0.5em] text-signal/60">
            Technical Specifications
          </p>
          <BlueprintGrid specs={gadget.specs} />
        </div>
      </div>
    </motion.div>
  );
}

export default function Arsenal() {
  return (
    <PageScaffold
      eyebrow="Arsenal"
      title="WayneTech & Field Gear"
      lead="Classified hardware from the Applied Sciences division. Each entry includes full material composition, deployment parameters, and field performance data."
    >
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {gadgets.map((gadget, i) => (
          <GadgetCard key={gadget.id} gadget={gadget} index={i} />
        ))}
      </div>
    </PageScaffold>
  );
}
