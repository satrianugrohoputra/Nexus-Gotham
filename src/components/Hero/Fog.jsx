/**
 * Multi-layer fog system: bottom rolling fog + mid-level kabut wisps
 * that drift around the batsignal area for that "searchlight through
 * foggy night sky" feel. Clear enough to see the signal but atmospheric.
 */
export default function Fog() {
  return (
    <>
      {/* Mid-level fog wisps around the batsignal */}
      <div
        className="pointer-events-none absolute inset-0 z-[4]"
        aria-hidden="true"
        style={{ mixBlendMode: 'screen' }}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="fog-wisp" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#b8b4a8" stopOpacity="0.18" />
              <stop offset="40%" stopColor="#8a8680" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#4a4a4a" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="fog-wisp-warm" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#d4c8a0" stopOpacity="0.14" />
              <stop offset="50%" stopColor="#9a9080" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#3a3a3a" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Wisps drifting around center (batsignal area) */}
          <g className="animate-fog-wisp-1" style={{ transformOrigin: 'center center' }}>
            <ellipse cx="700" cy="380" rx="220" ry="60" fill="url(#fog-wisp)" />
            <ellipse cx="900" cy="420" rx="180" ry="50" fill="url(#fog-wisp-warm)" />
          </g>
          <g className="animate-fog-wisp-2" style={{ transformOrigin: 'center center' }}>
            <ellipse cx="850" cy="350" rx="260" ry="70" fill="url(#fog-wisp)" />
            <ellipse cx="650" cy="450" rx="200" ry="55" fill="url(#fog-wisp-warm)" />
          </g>
          <g className="animate-fog-wisp-3" style={{ transformOrigin: 'center center' }}>
            <ellipse cx="780" cy="500" rx="300" ry="80" fill="url(#fog-wisp)" />
            <ellipse cx="820" cy="300" rx="240" ry="65" fill="url(#fog-wisp-warm)" />
          </g>
        </svg>
      </div>

      {/* Bottom rolling fog */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]"
        aria-hidden="true"
      >
        <svg
          className="absolute inset-x-0 bottom-0 w-full"
          viewBox="0 0 1600 600"
          preserveAspectRatio="xMidYMax slice"
          style={{ height: '100%' }}
        >
          <defs>
            <radialGradient id="fog-base" cx="50%" cy="80%" r="60%">
              <stop offset="0%" stopColor="#1c2336" stopOpacity="0.85" />
              <stop offset="55%" stopColor="#11192b" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0a0d14" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="fog-warm" cx="50%" cy="80%" r="60%">
              <stop offset="0%" stopColor="#2c2818" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0a0d14" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="fog-light" cx="50%" cy="70%" r="50%">
              <stop offset="0%" stopColor="#9a9488" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#4a4840" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0a0d14" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g className="animate-fog-rise" style={{ transformOrigin: 'center bottom' }}>
            <ellipse cx="400" cy="540" rx="520" ry="140" fill="url(#fog-base)" />
            <ellipse cx="1200" cy="540" rx="520" ry="140" fill="url(#fog-base)" />
            <ellipse cx="800" cy="580" rx="700" ry="120" fill="url(#fog-warm)" />
            {/* Light-catching fog in beam area */}
            <ellipse cx="800" cy="500" rx="350" ry="90" fill="url(#fog-light)" />
          </g>
          <g
            className="animate-fog-rise"
            style={{ transformOrigin: 'center bottom', animationDelay: '-2.5s' }}
          >
            <ellipse cx="200" cy="520" rx="380" ry="110" fill="url(#fog-base)" opacity="0.7" />
            <ellipse cx="1400" cy="500" rx="380" ry="100" fill="url(#fog-base)" opacity="0.7" />
            <ellipse cx="800" cy="460" rx="280" ry="70" fill="url(#fog-light)" opacity="0.6" />
          </g>
          <g
            className="animate-fog-rise"
            style={{ transformOrigin: 'center bottom', animationDelay: '-5s' }}
          >
            <ellipse cx="600" cy="480" rx="300" ry="80" fill="url(#fog-base)" opacity="0.5" />
            <ellipse cx="1000" cy="520" rx="320" ry="90" fill="url(#fog-warm)" opacity="0.5" />
          </g>
        </svg>
      </div>
    </>
  );
}
