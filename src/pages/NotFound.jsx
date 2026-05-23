import { Link } from 'react-router-dom';
import PageScaffold from '../components/PageScaffold.jsx';

export default function NotFound() {
  return (
    <PageScaffold
      eyebrow="404"
      title="Signal lost"
      lead="That route never reached the watchtower. The bat hasn’t heard of it."
    >
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.4em] text-signal hover:underline"
        data-cursor="hover"
      >
        ← Return to the signal
      </Link>
    </PageScaffold>
  );
}
