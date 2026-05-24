/**
 * Single short-lived ripple ring drawn at a tap coordinate. Used as the
 * mobile interaction fallback: gives users feedback that the cinematic
 * scene is alive without requiring a cursor.
 */
export default function TapRipple({ x, y }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 block h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/70"
      style={{
        transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
        animation: 'ringExpand 800ms ease-out 1 forwards',
        boxShadow: '0 0 24px rgba(245,197,24,0.35)',
        zIndex: 90,
      }}
    />
  );
}
