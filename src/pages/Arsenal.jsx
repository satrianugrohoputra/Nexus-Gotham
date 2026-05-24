import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    status: 'FIELD READY',
    tabs: {
      overview: {
        description: 'Precision-engineered throwing weapon with programmable return trajectory. The MK-V variant includes micro-explosive tips and EMP disruption payloads. Carbon-titanium composite ensures structural integrity at extreme velocities.',
        specs: { Weight: '312g', Material: 'Carbon-Titanium Alloy', Range: '45m effective', 'Return Mode': 'Gyroscopic autopilot' },
      },
      schematics: {
        description: 'Tri-blade configuration with folding wing geometry. Internal micro-processor handles in-flight trajectory correction. Magnetic recoupling mechanism enables mid-air redirection. Edge sharpness maintained via self-honing nanocoating.',
        specs: { 'Blade Angle': '32° attack angle', Processor: 'ARM Cortex M7', Coating: 'Tungsten Carbide Nano', Battery: '48hr standby / 200 throws' },
      },
      deployment: {
        description: 'Wrist-mounted launcher holds 6 units in rotary magazine. Quick-draw time: 0.3s. Can be deployed in fan pattern (3-spread) or sequential rapid-fire. Silent launch — no propellant signature.',
        specs: { Launcher: 'Wrist-mounted rotary', Capacity: '6 units', 'Draw Time': '0.3s', Mode: 'Fan / Sequential / Single' },
      },
    },
  },
  {
    id: 'cowl',
    name: 'Tactical Cowl v8.2',
    category: 'RECON',
    image: techImg1,
    status: 'ACTIVE DEPLOYMENT',
    tabs: {
      overview: {
        description: 'Multi-spectrum heads-up display with real-time threat analysis. Integrated bone-conduction comms and 40dB directional microphone array. The v8.2 introduces predictive threat modeling via onboard neural engine.',
        specs: { Weight: '1.8kg', Material: 'Nomex / Graphene Mesh', Vision: 'IR, UV, Sonar, AR-HUD', Comms: 'Encrypted 256-bit' },
      },
      schematics: {
        description: 'Layered composite shell: outer Nomex fire-resistant skin, graphene impact mesh, copper-weave Faraday cage (EMP protection), and inner biometric sensor array monitoring vitals in real-time.',
        specs: { Layers: '4 composite', 'EMP Shield': 'Copper Faraday mesh', 'Display Res': '4K per eye / 120Hz', 'Neural Engine': 'WayneTech Cortex v3' },
      },
      deployment: {
        description: 'Magnetic neck-seal auto-locks in 0.8s. Emergency jettison via jaw trigger. Oxygen reserve: 4 minutes. Integrated rebreather filters NBC contaminants. Detective Mode activates via blink-pattern.',
        specs: { 'Seal Time': '0.8s magnetic lock', 'O2 Reserve': '4 min', Filter: 'NBC Level 4', Activation: 'Blink-pattern interface' },
      },
    },
  },
  {
    id: 'grapple',
    name: 'Grapple Gun X-7',
    category: 'MOBILITY',
    image: techImg2,
    status: 'FIELD READY',
    tabs: {
      overview: {
        description: 'Magnetic-anchor grapple system with variable-speed retraction. Pneumatic launcher achieves 80m/s muzzle velocity for rapid vertical extraction. The X-7 introduces smart-anchor technology — the hook calculates optimal attachment point.',
        specs: { Weight: '2.4kg', Material: 'Aircraft-grade Aluminum', Cable: '150m Dyneema', Load: '320kg max' },
      },
      schematics: {
        description: 'Dual-chamber pneumatic system: primary launch chamber and secondary boost for extended range. Cable is 2.5mm Dyneema with 8-ton breaking strength. Anchor head contains 3 articulating claws with piezoelectric grip sensors.',
        specs: { Chambers: 'Dual pneumatic', 'Cable Dia': '2.5mm Dyneema', 'Break Strength': '8 ton', 'Anchor Claws': '3x piezo-articulating' },
      },
      deployment: {
        description: 'Hip-mounted holster with quick-draw mechanism. Point-and-shoot targeting via integrated laser guide. Retraction speed: adjustable 1-15 m/s. Emergency cut function severs cable instantly if anchor fails.',
        specs: { Holster: 'Hip-mount quick-draw', Targeting: 'Laser guide', 'Retract Speed': '1–15 m/s variable', Safety: 'Emergency cable cut' },
      },
    },
  },
  {
    id: 'batsuit',
    name: 'Batsuit Mk.IV',
    category: 'DEFENSE',
    image: batmanGearImg,
    status: 'PROTOTYPE',
    tabs: {
      overview: {
        description: 'Next-generation tactical armor with electrochromic camouflage. Integrated muscle-amplification servos provide 40% strength enhancement without sacrificing agility. Full environmental seal with 6-hour life support.',
        specs: { Weight: '11.3kg full kit', Material: 'Tri-weave Titanium', Protection: 'Class IIIA Ballistic', Mobility: '92% range of motion' },
      },
      schematics: {
        description: 'Outer layer: memory-polymer plates that redistribute impact force across surface area. Mid layer: electroactive polymer artificial muscles. Inner layer: temperature-regulating gel matrix with biometric monitoring mesh.',
        specs: { 'Outer Shell': 'Memory-polymer plates', 'Mid Layer': 'Electroactive polymer', 'Inner Layer': 'Thermo-gel matrix', 'Servo Count': '47 micro-actuators' },
      },
      deployment: {
        description: 'Modular suit-up via automated gauntlet system in the Batcave (total dress time: 90s). Field repairs possible with onboard nano-repair gel packets. Cape converts to rigid glider surface at 200km/h+ velocities.',
        specs: { 'Suit-Up': '90s automated', Repair: 'Nano-gel packets', Cape: 'Rigid glider mode', 'Life Support': '6hr sealed environment' },
      },
    },
  },
];

const tabLabels = ['overview', 'schematics', 'deployment'];
const tabIcons = {
  overview: (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
  ),
  schematics: (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
  ),
  deployment: (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
};

/* ─── Specs Grid ─── */
function SpecsGrid({ specs }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
      {Object.entries(specs).map(([key, value]) => (
        <div key={key} className="border-l-2 border-signal/30 pl-3">
          <p className="text-[9px] uppercase tracking-[0.4em] text-ink-300">{key}</p>
          <p className="mt-0.5 font-mono text-[12px] text-ink-50">{value}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── Gadget Card with Tab Switcher ─── */
function GadgetCard({ gadget, index }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [hovered, setHovered] = useState(false);
  const tabData = gadget.tabs[activeTab];

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
        {/* Blueprint grid overlay */}
        <div
          className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(245,197,24,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(245,197,24,0.08) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gotham-900 via-transparent to-transparent" />
        {/* Category */}
        <div className="absolute left-4 top-4">
          <span className="rounded border border-signal/40 bg-gotham-900/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.3em] text-signal">
            {gadget.category}
          </span>
        </div>
        {/* Status */}
        <div className="absolute right-4 top-4">
          <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] ${
            gadget.status === 'PROTOTYPE'
              ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30'
              : gadget.status === 'ACTIVE DEPLOYMENT'
              ? 'bg-green-500/20 text-green-400 ring-1 ring-green-500/30'
              : 'bg-signal/20 text-signal ring-1 ring-signal/30'
          }`}>
            {gadget.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6">
        <h3 className="font-display text-xl uppercase tracking-[0.15em] text-ink-50">
          {gadget.name}
        </h3>

        {/* ═══ Tab Switcher ═══ */}
        <div className="mt-5 flex gap-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-1">
          {tabLabels.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-2 text-[10px] uppercase tracking-[0.25em] transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-signal/10 text-signal shadow-sm'
                  : 'text-ink-300 hover:text-ink-100'
              }`}
              data-cursor="hover"
            >
              {tabIcons[tab]}
              <span className="hidden sm:inline">{tab}</span>
              {activeTab === tab && (
                <motion.div
                  layoutId={`tab-indicator-${gadget.id}`}
                  className="absolute inset-0 rounded-md border border-signal/30 bg-signal/[0.06]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ═══ Tab Content (Animated) ═══ */}
        <div className="mt-4 min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <p className="text-[13px] leading-relaxed text-ink-200/80">
                {tabData.description}
              </p>
              <div className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="mb-2 text-[9px] uppercase tracking-[0.5em] text-signal/60">
                  {activeTab === 'overview' && 'Core Specifications'}
                  {activeTab === 'schematics' && 'Technical Details'}
                  {activeTab === 'deployment' && 'Field Parameters'}
                </p>
                <SpecsGrid specs={tabData.specs} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Page ─── */
export default function Arsenal() {
  return (
    <PageScaffold
      eyebrow="Arsenal"
      title="WayneTech & Field Gear"
      lead="Classified hardware from the Applied Sciences division. Click the tabs on each item to cycle through Overview, Schematics, and Deployment parameters."
    >
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {gadgets.map((gadget, i) => (
          <GadgetCard key={gadget.id} gadget={gadget} index={i} />
        ))}
      </div>
    </PageScaffold>
  );
}
