import { useEffect } from 'react';
import Hero from '../components/Hero/Hero.jsx';
import { useScrollLock } from '../context/ScrollLockContext.jsx';

/**
 * The cinematic gatekeeper. Locks scroll until the user explicitly
 * presses "Explore Gotham" inside the hero. Once unlocked, secondary
 * teaser sections appear below; navigation to other routes is then
 * always available.
 */
export default function Home() {
  const { lock, locked } = useScrollLock();

  // Re-lock every time the user navigates back to "/"
  useEffect(() => {
    lock();
    return () => {
      // leave whatever state is when navigating away
    };
  }, [lock]);

  return (
    <main className="relative">
      <Hero />

      {/* Sections below only become reachable after scroll unlock. */}
      <PostHero locked={locked} />
    </main>
  );
}

function PostHero({ locked }) {
  return (
    <section
      className="relative z-[2] mx-auto max-w-6xl px-6 py-32"
      aria-hidden={locked}
      style={{
        opacity: locked ? 0 : 1,
        transition: 'opacity 1.2s ease 0.6s',
      }}
    >
      <header className="mb-12 text-center">
        <p className="text-[11px] uppercase tracking-[0.5em] text-signal/80">
          The signal carries you further
        </p>
        <h2 className="mt-4 font-display text-3xl uppercase tracking-[0.2em] text-ink-50 md:text-5xl">
          What lives inside the Nexus
        </h2>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            label: 'Rogues',
            to: '/rogues-gallery',
            text: 'Catalog the threats that haunt Gotham — bios, threat levels, status.',
          },
          {
            label: 'Arsenal',
            to: '/arsenal',
            text: 'WayneTech gadgets, gear and prototypes — with the specs to match.',
          },
          {
            label: 'Archives',
            to: '/archives',
            text: 'Words from the dark and the light — quotes from heroes and villains alike.',
          },
        ].map((card) => (
          <a
            key={card.to}
            href={card.to}
            data-cursor="hover"
            className="group rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-signal/40 hover:bg-signal/[0.04]"
          >
            <p className="text-[11px] uppercase tracking-[0.4em] text-signal">{card.label}</p>
            <p className="mt-3 text-ink-100">{card.text}</p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.4em] text-ink-200 transition-colors group-hover:text-signal">
              Open →
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
