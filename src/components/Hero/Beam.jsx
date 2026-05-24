/**
 * Volumetric upward beam emitted from the bottom-center of the screen,
 * shooting upward toward the batsignal. Three stacked layers
 * (core / mid / outer) with realistic color mixing: white hot center,
 * misty gray-fog diffusion, and warm yellow edges.
 * Uses additive screen blend with the sky so it actually feels like light.
 */
export default function Beam() {
  return (
    <svg
      className="absolute left-1/2 bottom-0 z-[3]"
      width="900"
      height="900"
      viewBox="-450 0 900 900"
      style={{
        transform: 'translateX(-50%)',
        mixBlendMode: 'screen',
        filter: 'drop-shadow(0 0 80px rgba(245,197,24,0.2))',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <defs>
        {/* Core: white-hot center fading to transparent upward */}
        <linearGradient id="beam-core" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="20%" stopColor="#fff8e1" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#ffeaa0" stopOpacity="0.4" />
          <stop offset="80%" stopColor="#d4c5a0" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#8a8a8a" stopOpacity="0" />
        </linearGradient>
        {/* Mid: warm yellow with gray-fog diffusion */}
        <linearGradient id="beam-mid" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#fff5d6" stopOpacity="0.7" />
          <stop offset="25%" stopColor="#ffd966" stopOpacity="0.5" />
          <stop offset="55%" stopColor="#b8b0a0" stopOpacity="0.25" />
          <stop offset="80%" stopColor="#6b6b6b" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#4a4a4a" stopOpacity="0" />
        </linearGradient>
        {/* Outer: misty gray-white atmospheric scatter */}
        <linearGradient id="beam-outer" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#e8e4d8" stopOpacity="0.35" />
          <stop offset="30%" stopColor="#9e9a90" stopOpacity="0.2" />
          <stop offset="60%" stopColor="#6a6a6a" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#3a3a3a" stopOpacity="0" />
        </linearGradient>
        {/* Fog-scatter layer: gray misty edges */}
        <linearGradient id="beam-fog" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#c8c0b0" stopOpacity="0.2" />
          <stop offset="40%" stopColor="#7a7a7a" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#4a4a4a" stopOpacity="0" />
        </linearGradient>
        <filter id="beam-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter id="beam-blur-soft" x="-30%" y="-10%" width="160%" height="120%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* Atmospheric fog scatter (widest, softest) */}
      <polygon
        points="-320,900 320,900 120,0 -120,0"
        fill="url(#beam-fog)"
        filter="url(#beam-blur-soft)"
      />

      {/* Outer cone - misty gray-white */}
      <polygon
        points="-240,900 240,900 85,0 -85,0"
        fill="url(#beam-outer)"
        filter="url(#beam-blur)"
      />

      {/* Mid cone - warm yellow with gray diffusion */}
      <polygon
        points="-150,900 150,900 55,0 -55,0"
        fill="url(#beam-mid)"
        filter="url(#beam-blur)"
      />

      {/* Core - white-hot center */}
      <polygon
        points="-70,900 70,900 22,0 -22,0"
        fill="url(#beam-core)"
      />

      {/* God-ray streaks with mixed colors */}
      <g opacity="0.4">
        <polygon points="-200,900 -110,900 -140,0 -220,0" fill="url(#beam-fog)" />
        <polygon points="200,900 110,900 140,0 220,0" fill="url(#beam-fog)" />
        <polygon points="-35,900 35,900 12,0 -12,0" fill="url(#beam-mid)" opacity="0.6" />
      </g>

      {/* Subtle side-scatter rays */}
      <g opacity="0.2" filter="url(#beam-blur-soft)">
        <polygon points="-280,900 -180,900 -200,200 -300,200" fill="url(#beam-outer)" />
        <polygon points="280,900 180,900 200,200 300,200" fill="url(#beam-outer)" />
      </g>
    </svg>
  );
}
