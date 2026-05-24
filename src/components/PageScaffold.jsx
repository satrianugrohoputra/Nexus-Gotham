/**
 * Shared scaffold for non-home pages. Keeps consistent header, padding, and
 * an optional alt palette for /nexus.
 */
export default function PageScaffold({
  eyebrow,
  title,
  lead,
  children,
  palette = 'gotham',
}) {
  const isNexus = palette === 'nexus';
  return (
    <main
      className="relative min-h-[100dvh] w-full"
      style={{
        background: isNexus
          ? 'radial-gradient(ellipse at 50% 30%, #1a3270 0%, #0d1b3d 55%, #07112c 100%)'
          : undefined,
      }}
    >
      <section className="relative mx-auto max-w-5xl px-6 pb-24 pt-40">
        <p
          className={`text-[11px] uppercase tracking-[0.5em] ${
            isNexus ? 'text-nexusBlue-accent' : 'text-signal/80'
          }`}
        >
          {eyebrow}
        </p>
        <h1
          className="mt-4 font-display text-4xl uppercase tracking-[0.18em] text-ink-50 md:text-6xl"
          style={{
            textShadow: isNexus
              ? '0 0 30px rgba(90,200,250,0.18)'
              : '0 0 30px rgba(245,197,24,0.16)',
          }}
        >
          {title}
        </h1>
        {lead && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-100/90 md:text-lg">
            {lead}
          </p>
        )}
        {children}
      </section>
    </main>
  );
}
