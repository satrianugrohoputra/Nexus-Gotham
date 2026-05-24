import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import BatLogoMini from '../svg/BatLogoMini.jsx';

const links = [
  { to: '/rogues-gallery', label: 'Rogues' },
  { to: '/arsenal', label: 'Arsenal' },
  { to: '/nexus', label: 'Nexus' },
  { to: '/archives', label: 'Archives' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/5 bg-gotham-900/70 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
        style={{
          opacity: 'var(--nav-opacity, 0)',
          transform: 'translateY(var(--nav-shift, -16px))',
          transition:
            'opacity 700ms ease, transform 700ms ease, background-color 500ms ease, backdrop-filter 500ms ease',
        }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            to="/"
            className="group flex items-center gap-2.5"
            aria-label="Nexus Gotham home"
          >
            <BatLogoMini className="h-7 w-7 text-signal transition-transform group-hover:scale-110" />
            <span className="font-display text-[15px] uppercase tracking-[0.32em] text-ink-50">
              Nexus<span className="text-signal">.</span>Gotham
            </span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative text-[12px] uppercase tracking-[0.3em] transition-colors duration-300 hover:text-signal ${
                    isActive ? 'text-signal' : 'text-ink-100'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-signal transition-transform duration-500 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className="md:hidden text-ink-50"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile sliding sidebar */}
      <div
        className={`fixed inset-0 z-30 md:hidden ${
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-500 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-72 border-l border-white/10 bg-gotham-900/95 px-7 py-24 shadow-2xl transition-transform duration-500 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <ul className="flex flex-col gap-7">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `font-display text-lg uppercase tracking-[0.28em] ${
                      isActive ? 'text-signal' : 'text-ink-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
