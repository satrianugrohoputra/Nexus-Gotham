import { Link, useParams } from 'react-router-dom';
import PageScaffold from '../components/PageScaffold.jsx';

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
  return (
    <PageScaffold
      eyebrow={`Archives / ${character}`}
      title={`Voices of ${label}`}
      lead="Quote cards in glassmorphism — coming with the next content injection. The structure of this page is locked in; only the data is pending."
    >
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
