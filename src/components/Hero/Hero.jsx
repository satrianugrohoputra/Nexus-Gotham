import { useEffect, useRef, useState } from 'react';
import Sky from './Sky.jsx';
import Fog from './Fog.jsx';
import Beam from './Beam.jsx';
import Lens from './Lens.jsx';
import Particles from './Particles.jsx';
import Tagline from './Tagline.jsx';
import ExploreCTA from './ExploreCTA.jsx';
import IdleFlicker from './IdleFlicker.jsx';
import EasterEgg from './EasterEgg.jsx';
import TapRipple from './TapRipple.jsx';
import useCursorTilt from '../../hooks/useCursorTilt.js';
import useDeviceTilt from '../../hooks/useDeviceTilt.js';
import useIsTouchDevice from '../../hooks/useIsTouchDevice.js';
import useIdleTimer from '../../hooks/useIdleTimer.js';
import useReducedMotion from '../../hooks/useReducedMotion.js';
import { useScrollLock } from '../../context/ScrollLockContext.jsx';

const INTRO_DURATION_MS = 3500;

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  // Cursor parallax / tilt — desktop drives this; on touch we feed
  // the same CSS vars from device orientation.
  const tiltRef = useCursorTilt({
    maxTiltX: reduceMotion ? 0 : 12,
    maxTiltY: reduceMotion ? 0 : 8,
  });
  useDeviceTilt(tiltRef, { enabled: isTouch && !reduceMotion });

  // After the intro reveal completes, enable interactive systems.
  const [introDone, setIntroDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), INTRO_DURATION_MS);
    return () => clearTimeout(t);
  }, []);

  // Idle tracking — only active after intro and only on the gatekeeper.
  const { idleLevel } = useIdleTimer({
    softMs: 6500,
    deepMs: 60000,
    enabled: introDone && !reduceMotion,
  });

  const flickerActive = idleLevel === 1;
  const easterActive = idleLevel === 2;

  // Explore Gotham → cinematic transition + scroll unlock.
  const { unlock } = useScrollLock();
  const [zooming, setZooming] = useState(false);
  const [postIntroText, setPostIntroText] = useState(false);

  const handleExplore = () => {
    setZooming(true);
    setTimeout(() => setPostIntroText(true), 700);
    setTimeout(() => {
      unlock();
      // Smooth scroll a touch so user feels the unlock
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
    }, 1700);
    setTimeout(() => {
      setZooming(false);
      setPostIntroText(false);
    }, 2600);
  };

  // Set navbar reveal CSS variables when intro completes
  useEffect(() => {
    if (!introDone) return;
    document.documentElement.style.setProperty('--nav-opacity', '1');
    document.documentElement.style.setProperty('--nav-shift', '0px');
  }, [introDone]);

  // Tap ripple state for touch fallback
  const [taps, setTaps] = useState([]);
  const handleTap = (e) => {
    if (!isTouch) return;
    const t = e.changedTouches?.[0] ?? e;
    const id = Date.now() + Math.random();
    setTaps((prev) => [...prev, { id, x: t.clientX, y: t.clientY }]);
    setTimeout(() => {
      setTaps((prev) => prev.filter((tap) => tap.id !== id));
    }, 800);
  };

  return (
    <section
      ref={tiltRef}
      onTouchStart={handleTap}
      className="relative isolate flex min-h-[100dvh] w-full flex-col items-center overflow-hidden bg-gotham-sky"
    >
      {/* Background atmosphere */}
      <Sky />
      <Fog />

      {/* Beam shoots from bottom center upward — placed behind scene */}
      <div
        className="absolute inset-x-0 bottom-0 z-[3] flex justify-center"
        style={{
          height: '85%',
          transformOrigin: '50% 100%',
          animation: reduceMotion
            ? undefined
            : 'beamGrow 1100ms cubic-bezier(0.2,0.7,0.2,1) 0.45s 1 backwards',
        }}
      >
        <Beam />
      </div>

      {/* Interactive scene container — this is what tilts with cursor */}
      <div
        className="relative z-[5] flex h-full min-h-[100dvh] w-full max-w-7xl flex-col items-center px-5"
        style={{
          transform:
            'perspective(1400px) rotateY(var(--cursor-tilt-x, 0deg)) rotateX(calc(var(--cursor-tilt-y, 0deg) * -1))',
          transformStyle: 'preserve-3d',
          transition: reduceMotion ? 'none' : 'transform 220ms ease-out',
        }}
      >
        {/* Tagline — positioned near the top, below navbar */}
        <div className="relative z-[7] mt-[12vh] w-full">
          <Tagline revealStartDelayMs={1700} />
        </div>

        {/* Stage: lens + particles, vertically centered */}
        <div className="relative flex flex-1 flex-col items-center justify-center" style={{ marginTop: '-2vh' }}>
          {!reduceMotion && <Particles />}
          <div
            style={{
              opacity: 0,
              animation: reduceMotion
                ? 'letterIn 0.001ms ease 1 forwards'
                : 'letterIn 800ms ease 0.2s 1 forwards',
            }}
            className={!reduceMotion ? 'animate-beam-breath' : ''}
          >
            <Lens />
          </div>
        </div>

        {/* CTA — positioned below the bat signal with clear separation */}
        <div className="relative z-[7] mb-[10vh] flex justify-center">
          <ExploreCTA revealDelayMs={3300} onTrigger={handleExplore} />
        </div>

        {/* Tap ripples (touch only) */}
        {taps.map((t) => (
          <TapRipple key={t.id} x={t.x} y={t.y} />
        ))}
      </div>

      {/* Idle flicker overlay (only on gatekeeper) */}
      <IdleFlicker active={flickerActive && !zooming} />

      {/* 60s villain easter egg */}
      <EasterEgg active={easterActive && !zooming} />

      {/* Cinematic Explore transition — flash + zoom + text */}
      <div
        className="pointer-events-none absolute inset-0 z-[70]"
        aria-hidden="true"
      >
        {/* white flash */}
        <div
          className="absolute inset-0 bg-white"
          style={{
            opacity: zooming ? 0 : 0,
            animation: zooming ? 'flashOnce 700ms ease-out 1 forwards' : 'none',
          }}
        />
        {/* darken */}
        <div
          className="absolute inset-0 bg-black"
          style={{
            opacity: zooming ? 1 : 0,
            transition: 'opacity 1100ms ease 600ms',
          }}
        />
        {/* entering text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p
            className="font-display text-[clamp(14px,2vw,22px)] uppercase tracking-[0.5em] text-signal"
            style={{
              opacity: postIntroText ? 1 : 0,
              transition: 'opacity 600ms ease',
            }}
          >
            entering gotham
            <span className="ml-2 inline-block animate-pulse">_</span>
          </p>
        </div>
      </div>

      {/* Inline keyframe used above */}
      <style>{`
        @keyframes flashOnce {
          0% { opacity: 0; }
          15% { opacity: 0.85; }
          100% { opacity: 0; }
        }
      `}</style>

      {/* Scroll hint chevron — only after intro */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-4 z-[6] flex justify-center text-ink-200/70"
        style={{
          opacity: introDone && !zooming ? 1 : 0,
          transition: 'opacity 700ms ease',
        }}
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.4em]">click to enter</span>
      </div>
    </section>
  );
}
