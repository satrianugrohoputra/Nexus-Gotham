/**
 * Foreground rolling fog at the bottom of the hero. Two animated SVG ellipses
 * with slight x/y phase difference for a "breathing" feel.
 */
export default function Fog() {
  return (
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
        </defs>

        <g className="animate-fog-rise" style={{ transformOrigin: 'center bottom' }}>
          <ellipse cx="400" cy="540" rx="520" ry="140" fill="url(#fog-base)" />
          <ellipse cx="1200" cy="540" rx="520" ry="140" fill="url(#fog-base)" />
          <ellipse cx="800" cy="580" rx="700" ry="120" fill="url(#fog-warm)" />
        </g>
        <g
          className="animate-fog-rise"
          style={{ transformOrigin: 'center bottom', animationDelay: '-2.5s' }}
        >
          <ellipse cx="200" cy="520" rx="380" ry="110" fill="url(#fog-base)" opacity="0.7" />
          <ellipse cx="1400" cy="500" rx="380" ry="100" fill="url(#fog-base)" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
}
