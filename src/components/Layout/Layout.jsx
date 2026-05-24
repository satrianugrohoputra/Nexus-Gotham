import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import CustomCursor from '../effects/CustomCursor.jsx';
import FilmGrain from '../effects/FilmGrain.jsx';
import Vignette from '../effects/Vignette.jsx';
import { useScrollLock } from '../../context/ScrollLockContext.jsx';

export default function Layout() {
  const location = useLocation();
  const { lock, unlock } = useScrollLock();

  // Re-lock scroll only on the gatekeeper route. Other routes always scrollable.
  useEffect(() => {
    if (location.pathname === '/') {
      // Home keeps default lock until user clicks Explore Gotham.
      // We don't auto-lock again here so that returning visitors can scroll.
    } else {
      unlock();
    }
  }, [location.pathname, lock, unlock]);

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-gotham-900 text-ink-50">
      <Navbar />
      <Outlet />
      <Vignette />
      <FilmGrain />
      <CustomCursor />
    </div>
  );
}
