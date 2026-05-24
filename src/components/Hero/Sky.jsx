/**
 * Multi-layer cloudy sky for the hero. Pure SVG so it scales infinitely
 * and stays crisp at any DPR. Cloud layers drift slowly in opposite
 * directions (parallax) and react subtly to the cursor.
 *
 * Reads --cursor-x / --cursor-y from the parent container if available so the
 * sky shifts a few pixels with the user's pointer.
 */
export default function Sky() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base radial sky already on parent. We just add atmosphere. */}

      {/* Distant glow behind batsignal */}
      <div
        className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle at center, rgba(255, 217, 102, 0.18) 0%, rgba(245, 197, 24, 0.08) 25%, transparent 60%)',
          mixBlendMode: 'screen',
          filter: 'blur(8px)',
          transform:
            'translate(calc(-50% + (var(--cursor-x, 50%) - 50%) * 0.05), calc(-55% + (var(--cursor-y, 50%) - 50%) * 0.05))',
          transition: 'transform 600ms ease-out',
        }}
      />

      {/* Far cloud layer — large, very slow */}
      <svg
        className="absolute inset-0 h-full w-full animate-cloud-drift-slow"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.45 }}
      >
        <defs>
          <radialGradient id="cloud-far" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2a3556" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#161e34" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0a0d14" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="280" cy="220" rx="380" ry="120" fill="url(#cloud-far)" />
        <ellipse cx="900" cy="160" rx="460" ry="140" fill="url(#cloud-far)" />
        <ellipse cx="1380" cy="280" rx="340" ry="110" fill="url(#cloud-far)" />
        <ellipse cx="200" cy="540" rx="420" ry="130" fill="url(#cloud-far)" />
        <ellipse cx="1200" cy="620" rx="500" ry="150" fill="url(#cloud-far)" />
      </svg>

      {/* Near cloud layer — denser, faster */}
      <svg
        className="absolute inset-0 h-full w-full animate-cloud-drift-fast"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.6 }}
      >
        <defs>
          <radialGradient id="cloud-near" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1d2845" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#11192b" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0a0d14" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cloud-near-warm" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3d3a2a" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0a0d14" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="450" cy="380" rx="340" ry="90" fill="url(#cloud-near)" />
        <ellipse cx="1100" cy="320" rx="380" ry="100" fill="url(#cloud-near)" />
        <ellipse cx="780" cy="460" rx="320" ry="80" fill="url(#cloud-near-warm)" />
        <ellipse cx="1440" cy="500" rx="280" ry="90" fill="url(#cloud-near)" />
        <ellipse cx="160" cy="700" rx="380" ry="100" fill="url(#cloud-near)" />
      </svg>

      {/* Top horizontal haze line for depth */}
      <div
        className="absolute inset-x-0 top-0 h-40"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 100%)',
        }}
      />
    </div>
  );
}
