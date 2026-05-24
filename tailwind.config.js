/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gotham: {
          950: '#05070d',
          900: '#0a0d14',
          800: '#0d1424',
          700: '#121a2e',
          600: '#1a2440',
          fog: '#1c2336',
        },
        signal: {
          DEFAULT: '#f5c518',
          warm: '#ffd966',
          deep: '#c79b00',
          glow: 'rgba(245, 197, 24, 0.55)',
        },
        ink: {
          50: '#e8eaef',
          100: '#c6cad3',
          200: '#9aa3b2',
          300: '#6f7889',
          400: '#4b5366',
        },
        nexusBlue: {
          base: '#0d1b3d',
          accent: '#5ac8fa',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        glitch: ['"Special Elite"', 'monospace'],
      },
      keyframes: {
        cloudDrift: {
          '0%': { transform: 'translate3d(-5%, 0, 0)' },
          '100%': { transform: 'translate3d(5%, 0, 0)' },
        },
        cloudDriftReverse: {
          '0%': { transform: 'translate3d(5%, 0, 0)' },
          '100%': { transform: 'translate3d(-5%, 0, 0)' },
        },
        fogRise: {
          '0%, 100%': { transform: 'translateY(0) scaleX(1)', opacity: '0.55' },
          '50%': { transform: 'translateY(-12px) scaleX(1.03)', opacity: '0.7' },
        },
        fogWisp1: {
          '0%': { transform: 'translateX(-30px) translateY(0)', opacity: '0.4' },
          '50%': { transform: 'translateX(30px) translateY(-8px)', opacity: '0.7' },
          '100%': { transform: 'translateX(-30px) translateY(0)', opacity: '0.4' },
        },
        fogWisp2: {
          '0%': { transform: 'translateX(25px) translateY(5px)', opacity: '0.3' },
          '50%': { transform: 'translateX(-25px) translateY(-10px)', opacity: '0.6' },
          '100%': { transform: 'translateX(25px) translateY(5px)', opacity: '0.3' },
        },
        fogWisp3: {
          '0%': { transform: 'translateX(-15px) translateY(-5px)', opacity: '0.35' },
          '50%': { transform: 'translateX(20px) translateY(8px)', opacity: '0.55' },
          '100%': { transform: 'translateX(-15px) translateY(-5px)', opacity: '0.35' },
        },
        beamBreath: {
          '0%, 100%': { opacity: '0.92', filter: 'brightness(1)' },
          '50%': { opacity: '1', filter: 'brightness(1.08)' },
        },
        signalShimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(120%)' },
        },
        ctaPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(245,197,24,0)' },
          '50%': { boxShadow: '0 0 22px 6px rgba(245,197,24,0.25)' },
        },
        flickerSub: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        flickerHard: {
          '0%, 18%, 22%, 25%, 53%, 57%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.15' },
        },
        scanlines: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(4px)' },
        },
        breathMobile: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        beamGrow: {
          '0%': { transform: 'scaleY(0)', opacity: '0' },
          '40%': { opacity: '0.6' },
          '100%': { transform: 'scaleY(1)', opacity: '1' },
        },
      },
      animation: {
        'cloud-drift-slow': 'cloudDrift 90s linear infinite alternate',
        'cloud-drift-fast': 'cloudDriftReverse 55s linear infinite alternate',
        'fog-rise': 'fogRise 8s ease-in-out infinite',
        'fog-wisp-1': 'fogWisp1 12s ease-in-out infinite',
        'fog-wisp-2': 'fogWisp2 15s ease-in-out infinite',
        'fog-wisp-3': 'fogWisp3 10s ease-in-out infinite',
        'beam-breath': 'beamBreath 4.5s ease-in-out infinite',
        'cta-pulse': 'ctaPulse 2.6s ease-in-out infinite',
        scanlines: 'scanlines 0.18s steps(2) infinite',
      },
      backgroundImage: {
        'gotham-sky':
          'radial-gradient(ellipse at 50% 35%, #1a2440 0%, #0d1424 35%, #0a0d14 65%, #05070d 100%)',
        'grain':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.45 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
      },
    },
  },
  plugins: [],
};
