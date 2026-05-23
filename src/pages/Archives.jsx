import { Link } from 'react-router-dom';
import PageScaffold from '../components/PageScaffold.jsx';

const characters = [
  { id: 'batman', label: 'Batman', tone: 'dark, brooding' },
  { id: 'joker', label: 'The Joker', tone: 'chaotic' },
  { id: 'alfred', label: 'Alfred', tone: 'wisdom' },
  { id: 'superman', label: 'Superman', tone: 'hopeful' },
  { id: 'flash', label: 'The Flash', tone: 'kinetic' },
];

export default function Archives() {
  return (
    <PageScaffold
      eyebrow="Archives"
      title="Words from the watchtower"
      lead="Iconic quotes preserved across the Bat-verse. Pick a voice."
    >
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {characters.map((c) => (
          <Link
            key={c.id}
            to={`/archives/${c.id}`}
            data-cursor="hover"
            className="group rounded-xl border border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-xl transition-all duration-500 hover:border-signal/40 hover:bg-signal/[0.05]"
          >
            <p className="text-[11px] uppercase tracking-[0.4em] text-signal/80">
              {c.tone}
            </p>
            <p className="mt-2 font-display text-2xl uppercase tracking-[0.2em] text-ink-50 group-hover:text-signal">
              {c.label}
            </p>
          </Link>
        ))}
      </div>
    </PageScaffold>
  );
}
