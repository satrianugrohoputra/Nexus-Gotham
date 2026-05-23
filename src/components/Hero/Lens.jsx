import BatSymbol from '../svg/BatSymbol.jsx';

/**
 * The glowing oval lens with the bat silhouette inside.
 * Built from layered SVG ellipses (metal frame, inner glass, hot core)
 * plus a glass highlight that drifts slightly with the cursor.
 */
export default function Lens() {
  return (
    <div
      className="relative z-[5] aspect-[2/1] w-[clamp(280px,42vmin,540px)]"
      style={{
        filter:
          'drop-shadow(0 0 40px rgba(245,197,24,0.55)) drop-shadow(0 0 90px rgba(245,197,24,0.25))',
      }}
    >
      <svg
        viewBox="0 0 400 200"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          {/* Outer metal ring */}
          <radialGradient id="metal" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#3a4252" />
            <stop offset="60%" stopColor="#1c2230" />
            <stop offset="100%" stopColor="#070a12" />
          </radialGradient>
          {/* Inner glass — hot yellow */}
          <radialGradient id="glass" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#fff5c2" stopOpacity="1" />
            <stop offset="35%" stopColor="#ffd966" stopOpacity="1" />
            <stop offset="75%" stopColor="#f5c518" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#a47700" stopOpacity="0.85" />
          </radialGradient>
          <radialGradient id="hotspot" cx="48%" cy="42%" r="35%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          {/* Glass reflection */}
          <linearGradient id="reflection" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer metal frame */}
        <ellipse cx="200" cy="100" rx="194" ry="94" fill="url(#metal)" />
        {/* Inner bevel ring */}
        <ellipse
          cx="200"
          cy="100"
          rx="178"
          ry="82"
          fill="none"
          stroke="#0a0d14"
          strokeWidth="2"
        />
        {/* Hot glass */}
        <ellipse cx="200" cy="100" rx="172" ry="78" fill="url(#glass)" />
        {/* Hotspot */}
        <ellipse cx="200" cy="100" rx="172" ry="78" fill="url(#hotspot)" />
        {/* Glass reflection sweep — drifts via parent CSS var */}
        <ellipse
          cx="200"
          cy="100"
          rx="172"
          ry="78"
          fill="url(#reflection)"
          style={{
            transform:
              'translate(calc((var(--cursor-x, 50%) - 50%) * 0.04), calc((var(--cursor-y, 50%) - 50%) * 0.04))',
            transformOrigin: 'center',
            transition: 'transform 400ms ease-out',
          }}
        />
        {/* Top rim highlight */}
        <ellipse
          cx="200"
          cy="36"
          rx="120"
          ry="10"
          fill="rgba(255,255,255,0.18)"
        />
        {/* Bottom rim shadow */}
        <ellipse
          cx="200"
          cy="170"
          rx="140"
          ry="8"
          fill="rgba(0,0,0,0.4)"
        />
      </svg>

      {/* Bat symbol overlaid in HTML so we can micro-parallax it */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform:
            'translate(calc((var(--cursor-x, 50%) - 50%) * -0.02), calc((var(--cursor-y, 50%) - 50%) * -0.02))',
          transition: 'transform 400ms ease-out',
        }}
      >
        <BatSymbol
          className="h-[55%] w-[78%] text-[#0a0d14]"
          style={{
            filter: 'drop-shadow(0 2px 1px rgba(0,0,0,0.6))',
          }}
        />
      </div>
    </div>
  );
}
