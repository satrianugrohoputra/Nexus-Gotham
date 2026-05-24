import { useEffect, useState } from 'react';

/**
 * Visual idle flicker layered ON TOP of the hero. When `active`, runs a short
 * randomized glitch sequence (sub-flicker → hard glitch → blackout → thunk)
 * and then waits a random interval before queuing the next pass.
 *
 * Returns its own absolutely-positioned overlays. The hero remains underneath.
 *
 * The "thunk" black overlay flashes white briefly to imply a relight surge.
 */
export default function IdleFlicker({ active }) {
  const [seq, setSeq] = useState({ key: 0, phase: 'idle' });

  useEffect(() => {
    if (!active) {
      setSeq((s) => ({ ...s, phase: 'idle' }));
      return undefined;
    }

    let timers = [];
    let stopped = false;

    const runOnce = () => {
      if (stopped) return;
      // Phase A — subtle flicker
      setSeq((s) => ({ key: s.key + 1, phase: 'sub' }));
      timers.push(
        setTimeout(() => {
          if (stopped) return;
          // Phase B — hard glitch
          setSeq((s) => ({ key: s.key + 1, phase: 'hard' }));
          timers.push(
            setTimeout(() => {
              if (stopped) return;
              // Phase C — blackout
              setSeq((s) => ({ key: s.key + 1, phase: 'black' }));
              timers.push(
                setTimeout(() => {
                  if (stopped) return;
                  // Phase D — thunk relight
                  setSeq((s) => ({ key: s.key + 1, phase: 'thunk' }));
                  timers.push(
                    setTimeout(() => {
                      if (stopped) return;
                      setSeq((s) => ({ key: s.key + 1, phase: 'idle' }));
                      // queue next flicker after random rest
                      timers.push(setTimeout(runOnce, 5500 + Math.random() * 7000));
                    }, 900)
                  );
                }, 380)
              );
            }, 720)
          );
        }, 350)
      );
    };

    // start after a tiny delay so it doesn't trigger the literal instant of going idle
    timers.push(setTimeout(runOnce, 600));

    return () => {
      stopped = true;
      timers.forEach(clearTimeout);
    };
  }, [active]);

  if (!active) return null;

  // Build per-phase overlays
  const phase = seq.phase;
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[20]"
      aria-hidden="true"
      key={seq.key}
    >
      {phase === 'sub' && (
        <div
          className="absolute inset-0 bg-black"
          style={{ animation: 'flickerSubtle 350ms steps(4) 1' }}
        />
      )}
      {phase === 'hard' && (
        <>
          <div
            className="absolute inset-0 bg-black"
            style={{ animation: 'glitchHard 700ms steps(8) 1' }}
          />
          {/* RGB chromatic split bursts */}
          <div
            className="absolute inset-0 mix-blend-screen"
            style={{
              background:
                'linear-gradient(90deg, rgba(255,0,80,0.18), transparent 40%, transparent 60%, rgba(0,180,255,0.18))',
              animation: 'flickerSubtle 720ms steps(6) 1',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)',
              animation: 'scanlines 0.18s steps(2) infinite, flickerSubtle 720ms steps(6) 1',
            }}
          />
        </>
      )}
      {phase === 'black' && (
        <div
          className="absolute inset-0 bg-black"
          style={{ animation: 'blackoutFade 380ms ease 1 forwards' }}
        />
      )}
      {phase === 'thunk' && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 55%, rgba(255,250,210,0.55), transparent 55%)',
            animation: 'thunkOn 900ms ease-out 1 forwards',
            mixBlendMode: 'screen',
          }}
        />
      )}
    </div>
  );
}
