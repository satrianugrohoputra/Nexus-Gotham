/**
 * The bat silhouette that sits inside the batsignal lens.
 * Shape leans into the modern (The Batman 2022) angular silhouette:
 * tighter wings, sharper points, defined ears.
 *
 * Pure currentColor so we can re-tint via CSS in flicker / villain states.
 */
export default function BatSymbol({ className = '', ...rest }) {
  return (
    <svg
      viewBox="0 0 200 100"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Bat symbol"
      fill="currentColor"
      className={className}
      {...rest}
    >
      <path
        d="M100 14
           c-1.4 0 -2.6 .9 -3.6 2.4
           c-1.4 2 -2.6 4.4 -3.5 6.6
           c-1 -.4 -2.1 -.9 -3.4 -1.4
           c-3.6 -1.3 -7.6 -2 -11.6 -1.7
           c-5.7 .4 -11.4 2.5 -16.6 5.6
           c-4.5 2.7 -8.5 6 -12 9.6
           c2 .4 3.7 1.4 5 2.9
           c1.6 1.8 2.5 4.1 2.6 6.7
           c-3 .5 -5.6 1.7 -7.6 3.7
           c-2 1.9 -3.6 4.5 -5 7.7
           c5 -2 9.6 -2.4 13.7 -1.7
           c4.5 .8 8.7 2.6 12.6 5.4
           c3.4 2.4 6.6 5.4 9.6 8.6
           c1.4 1.5 2.7 3 4 4.4
           c1.4 -1.7 2.8 -3.4 4.4 -5
           c2.4 -2.5 4.6 -4.5 6.7 -5.7
           c.7 -.4 1.4 -.6 2.1 -.6
           c.7 0 1.4 .2 2.1 .6
           c2.1 1.2 4.3 3.2 6.7 5.7
           c1.6 1.6 3 3.3 4.4 5
           c1.3 -1.4 2.6 -2.9 4 -4.4
           c3 -3.2 6.2 -6.2 9.6 -8.6
           c3.9 -2.8 8.1 -4.6 12.6 -5.4
           c4.1 -.7 8.7 -.3 13.7 1.7
           c-1.4 -3.2 -3 -5.8 -5 -7.7
           c-2 -2 -4.6 -3.2 -7.6 -3.7
           c.1 -2.6 1 -4.9 2.6 -6.7
           c1.3 -1.5 3 -2.5 5 -2.9
           c-3.5 -3.6 -7.5 -6.9 -12 -9.6
           c-5.2 -3.1 -10.9 -5.2 -16.6 -5.6
           c-4 -.3 -8 .4 -11.6 1.7
           c-1.3 .5 -2.4 1 -3.4 1.4
           c-.9 -2.2 -2.1 -4.6 -3.5 -6.6
           c-1 -1.5 -2.2 -2.4 -3.6 -2.4z"
      />
    </svg>
  );
}
