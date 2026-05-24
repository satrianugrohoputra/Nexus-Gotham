import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../Navbar/Navbar.jsx';
import CustomCursor from '../effects/CustomCursor.jsx';
import FilmGrain from '../effects/FilmGrain.jsx';
import Vignette from '../effects/Vignette.jsx';
import { useScrollLock } from '../../context/ScrollLockContext.jsx';

const pageVariants = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -8, filter: 'blur(4px)' },
};

const pageTransition = {
  duration: 0.4,
  ease: [0.25, 0.46, 0.45, 0.94],
};

export default function Layout() {
  const location = useLocation();
  const { lock, unlock } = useScrollLock();

  // Re-lock scroll only on the gatekeeper route. Other routes always scrollable.
  useEffect(() => {
    if (location.pathname === '/') {
      // Home keeps default lock until user clicks Explore Gotham.
    } else {
      unlock();
    }
  }, [location.pathname, lock, unlock]);

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-gotham-900 text-ink-50">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      <Vignette />
      <FilmGrain />
      <CustomCursor />
    </div>
  );
}
