import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const ScrollLockContext = createContext(null);

export function ScrollLockProvider({ children }) {
  const [locked, setLocked] = useState(true);

  // Mirror lock state to <body> attribute so CSS can react.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.dataset.scrollLocked = locked ? 'true' : 'false';
  }, [locked]);

  const unlock = useCallback(() => setLocked(false), []);
  const lock = useCallback(() => setLocked(true), []);

  const value = useMemo(() => ({ locked, lock, unlock }), [locked, lock, unlock]);
  return <ScrollLockContext.Provider value={value}>{children}</ScrollLockContext.Provider>;
}

export function useScrollLock() {
  const ctx = useContext(ScrollLockContext);
  if (!ctx) throw new Error('useScrollLock must be used inside <ScrollLockProvider>');
  return ctx;
}
