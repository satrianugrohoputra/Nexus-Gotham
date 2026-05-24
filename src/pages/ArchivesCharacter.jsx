import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageScaffold from '../components/PageScaffold.jsx';

const characterQuotes = {
  batman: [
    { text: "It's not who I am underneath, but what I do that defines me.", source: 'Batman Begins' },
    { text: "I am vengeance. I am the night. I am Batman.", source: 'Batman: TAS' },
    { text: "A hero can be anyone.", source: 'The Dark Knight Rises' },
  ],
  joker: [
    { text: "Madness is like gravity. All it takes is a little push.", source: 'The Dark Knight' },
    { text: "Why so serious?", source: 'The Dark Knight' },
    { text: "Introduce a little anarchy. Upset the established order.", source: 'The Dark Knight' },
  ],
  alfred: [
    { text: "Why do we fall? So we can learn to pick ourselves back up.", source: 'Batman Begins' },
    { text: "Some men just want to watch the world burn.", source: 'The Dark Knight' },
  ],
  superman: [
    { text: "You're much stronger than you think you are. Trust me.", source: 'All-Star Superman' },
    { text: "There is a superhero in all of us.", source: 'Superman Returns' },
  ],
  flash: [
    { text: "Life doesn't give us purpose. We give life purpose.", source: 'The Flash' },
    { text: "Every second is a chance to turn it all around.", source: 'The Flash' },
  ],
};

const friendly = {
  batman: 'Batman',
  joker: 'The Joker',
  alfred: 'Alfred',
  superman: 'Superman',
  flash: 'The Flash',
};

export default function ArchivesCharacter() {
  const { character } = useParams();
  const label = friendly[character] || character;
  const quotes = characterQuotes[character] || [];

  return (
    <PageScaffold
      eyebrow={`Archives / ${label}`}
      title={`Voices of ${label}`}
      lead={`${quotes.length} archived transmissions from ${label}.`}
    >
      <div className="mt-12 space-y-6">
        {quotes.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="rounded-xl border border-white/[0.08] p-6 backdrop-blur-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(10,13,20,0.9) 100%)',
            }}
          >
            <p className="font-display text-lg leading-relaxed text-ink-50 md:text-xl" style={{ fontStyle: 'italic' }}>
              &ldquo;{q.text}&rdquo;
            </p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.4em] text-signal/60">
              — {q.source}
            </p>
          </motion.div>
        ))}
      </div>

      <Link
        to="/archives"
        className="mt-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.4em] text-signal hover:underline"
        data-cursor="hover"
      >
        ← Back to archives
      </Link>
    </PageScaffold>
  );
}
