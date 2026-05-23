/**
 * Volumetric upward beam emitted from the batsignal. Three stacked layers
 * (core / mid / outer) plus four faint god-ray streaks. Uses additive screen
 * blend with the sky so it actually feels like light, not a yellow shape.
 */
export default function Beam() {
  return (
    <svg
      className="absolute left-1/2 top-1/2 z-[3] -translate-x-1/2"
      width="900"
      height="900"
      viewBox="-450 -900 900 900"
      style={{
        // anchor the beam's pivot at the lens center (bottom-center of beam SVG)
        transformOrigin: '50% 100%',
        transform: 'translate(-50%, -100%) translateY(-2vmin)',
        mixBlendMode: 'screen',
        filter: 'drop-shadow(0 0 60px rgba(245,197,24,0.35))',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="beam-core" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#ffd966" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#f5c518" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f5c518" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="beam-mid" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#ffe9a8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f5c518" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="beam-outer" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#fff7d6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#fff7d6" stopOpacity="0" />
        </linearGradient>
        <filter id="beam-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Outer cone */}
      <polygon
        points="-260,0 260,0 90,-880 -90,-880"
        fill="url(#beam-outer)"
        filter="url(#beam-blur)"
      />
      {/* Mid cone */}
      <polygon
        points="-160,0 160,0 60,-880 -60,-880"
        fill="url(#beam-mid)"
        filter="url(#beam-blur)"
      />
      {/* Core */}
      <polygon
        points="-78,0 78,0 28,-880 -28,-880"
        fill="url(#beam-core)"
      />

      {/* God-ray streaks */}
      <g opacity="0.6">
        <polygon points="-180,0 -90,0 -150,-880 -260,-880" fill="url(#beam-outer)" />
        <polygon points="180,0 90,0 150,-880 260,-880" fill="url(#beam-outer)" />
        <polygon points="-40,0 40,0 18,-880 -18,-880" fill="url(#beam-mid)" />
      </g>
    </svg>
  );
}
