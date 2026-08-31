import React, { useId } from 'react';

/**
 * PostCover
 * Original, on-brand SVG cover art. Ten deterministic motifs keyed off each
 * post's `motif` field — no stock photography, no external requests, no
 * licensing exposure, and a few hundred bytes each instead of a JPEG.
 *
 * Swap for real photography or diagrams later by replacing this component;
 * the `motif` field is the only contract.
 */

const G = 'rgb(var(--color-primary-500))';
const G_DIM = 'rgb(var(--color-primary-600))';
const V = 'rgb(var(--color-accent-500))';
const LINE = 'rgb(var(--color-primary-500) / 0.16)';

const range = (n) => Array.from({ length: n }, (_, i) => i);

const MOTIFS = {
  // Compliance / structured control set
  grid: () => (
    <g>
      {range(6).map((r) => range(10).map((c) => {
        const on = (r * 10 + c) % 7 === 0;
        return <rect key={`${r}-${c}`} x={60 + c * 70} y={70 + r * 52} width="44" height="30"
          fill={on ? 'rgb(var(--color-primary-500) / 0.22)' : 'rgb(var(--color-white) / 0.03)'}
          stroke={on ? G : 'rgb(var(--color-white) / 0.07)'} strokeWidth="1" />;
      }))}
    </g>
  ),
  // Identity / lateral movement between people
  nodes: () => {
    const pts = [[180,140],[330,95],[470,170],[300,250],[600,120],[560,290],[420,330],[200,300]];
    return (
      <g>
        {pts.map((a, i) => pts.slice(i + 1).map((b, j) => {
          const d = Math.hypot(a[0]-b[0], a[1]-b[1]);
          return d < 200 ? <line key={`${i}-${j}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]}
            stroke={LINE} strokeWidth="1" /> : null;
        }))}
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === 3 ? 13 : 7}
            fill={i === 3 ? V : G} opacity={i === 3 ? 0.95 : 0.75} />
        ))}
      </g>
    );
  },
  // Timeline / observation window
  bars: () => (
    <g>
      {range(14).map((i) => {
        const h = 24 + ((i * 37) % 130);
        const late = i > 9;
        return <rect key={i} x={72 + i * 48} y={330 - h} width="26" height={h}
          fill={late ? 'rgb(var(--color-accent-500) / 0.5)' : 'rgb(var(--color-primary-500) / 0.45)'}
          stroke={late ? V : G} strokeWidth="1" />;
      })}
      <line x1="60" y1="336" x2="740" y2="336" stroke="rgb(var(--color-white) / 0.15)" strokeWidth="1" />
    </g>
  ),
  // Supply chain / linked trust
  chain: () => (
    <g fill="none" strokeWidth="3">
      {range(5).map((i) => (
        <rect key={i} x={120 + i * 122} y={175} width="96" height="58" rx="4"
          stroke={i === 2 ? V : G} opacity={i === 2 ? 1 : 0.6} />
      ))}
      {range(4).map((i) => (
        <line key={i} x1={216 + i * 122} y1={204} x2={242 + i * 122} y2={204}
          stroke={i === 1 || i === 2 ? V : G_DIM} strokeDasharray={i === 1 ? '4 3' : '0'} opacity="0.8" />
      ))}
    </g>
  ),
  // Canadian regulation
  maple: () => (
    <g>
      <path d="M400 108 l16 40 42-12 -16 38 44 22 -40 20 24 40 -46-8 -6 44 -18-34 -18 34 -6-44 -46 8 24-40 -40-20 44-22 -16-38 42 12z"
        fill="rgb(var(--color-primary-500) / 0.16)" stroke={G} strokeWidth="2" />
      {range(3).map((i) => (
        <circle key={i} cx={400} cy={225} r={110 + i * 46} fill="none"
          stroke={LINE} strokeWidth="1" strokeDasharray="3 7" />
      ))}
    </g>
  ),
  // Volume trend with a raised floor
  wave: () => {
    const pts = range(40).map((i) => {
      const x = 50 + i * 17.5;
      const y = 250 - Math.sin(i / 3.4) * 52 - (i * 1.6);
      return `${x},${y}`;
    });
    return (
      <g>
        <polyline points={pts.join(' ')} fill="none" stroke={G} strokeWidth="2.5" />
        <polygon points={`50,340 ${pts.join(' ')} 732,340`} fill="rgb(var(--color-primary-500) / 0.12)" />
        <line x1="50" y1="288" x2="740" y2="288" stroke={V} strokeWidth="1.5" strokeDasharray="6 5" opacity="0.75" />
      </g>
    );
  },
  // Agentic / tool wiring
  circuit: () => (
    <g fill="none" strokeWidth="2">
      <path d="M90 225 h120 v-80 h150 v160 h150 v-80 h120" stroke={G} opacity="0.8" />
      <path d="M90 300 h200 v-40 h120" stroke={V} opacity="0.7" strokeDasharray="5 4" />
      {[[210,145],[360,145],[360,305],[510,305],[510,225],[290,260]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="6" fill={i === 5 ? V : G} stroke="none" />
      ))}
      <rect x="600" y="185" width="80" height="80" stroke={G} opacity="0.5" />
    </g>
  ),
  // Data exfiltration / fragmentation
  shards: () => (
    <g>
      {range(11).map((i) => {
        const x = 90 + i * 58, y = 150 + ((i * 53) % 110), s = 24 + ((i * 17) % 30);
        return <rect key={i} x={x} y={y} width={s} height={s}
          transform={`rotate(${(i * 27) % 45} ${x + s/2} ${y + s/2})`}
          fill={i % 4 === 0 ? 'rgb(var(--color-accent-500) / 0.3)' : 'rgb(var(--color-primary-500) / 0.18)'}
          stroke={i % 4 === 0 ? V : G} strokeWidth="1" />;
      })}
    </g>
  ),
  // Session tokens / credentials
  keys: () => (
    <g>
      {range(4).map((i) => (
        <g key={i} opacity={i === 1 ? 1 : 0.45}>
          <circle cx={200 + i * 135} cy="200" r="26" fill="none"
            stroke={i === 1 ? V : G} strokeWidth="3" />
          <path d={`M${222 + i * 135} 200 h58 v16 h-14 v-16 m-16 0 v20`}
            stroke={i === 1 ? V : G} strokeWidth="3" fill="none" />
        </g>
      ))}
      <line x1="60" y1="290" x2="740" y2="290" stroke={LINE} strokeWidth="1" />
      <text x="60" y="322" fill="rgb(var(--color-gray-400) / 0.55)" fontSize="15" fontFamily="ui-monospace, monospace">session_token: valid</text>
    </g>
  ),
  // Perimeter breach
  perimeter: () => (
    <g fill="none">
      <rect x="120" y="105" width="560" height="240" stroke={G} strokeWidth="2" opacity="0.85" />
      <rect x="150" y="130" width="500" height="190" stroke={G_DIM} strokeWidth="1" strokeDasharray="6 5" opacity="0.6" />
      <path d="M120 225 h58 m22 0 h44" stroke="rgb(var(--color-dark-900))" strokeWidth="6" />
      <path d="M96 225 h120" stroke={V} strokeWidth="3" />
      <circle cx="216" cy="225" r="9" fill={V} stroke="none" />
      {range(3).map((i) => (
        <circle key={i} cx="216" cy="225" r={22 + i * 20} stroke={V} strokeWidth="1" opacity={0.4 - i * 0.11} />
      ))}
    </g>
  ),
};

const PostCover = ({ motif = 'grid', className = '', title = '' }) => {
  const id = useId();
  const draw = MOTIFS[motif] || MOTIFS.grid;

  return (
    <svg
      viewBox="0 0 800 450"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={title ? `Cover illustration for ${title}` : 'Article cover illustration'}
    >
      <defs>
        <pattern id={`${id}-g`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0 H0 V40" fill="none" stroke="rgb(var(--color-primary-500) / 0.07)" strokeWidth="1" />
        </pattern>
        <radialGradient id={`${id}-glow`} cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="rgb(var(--color-primary-500) / 0.16)" />
          <stop offset="100%" stopColor="rgb(var(--color-primary-500) / 0)" />
        </radialGradient>
      </defs>
      <rect width="800" height="450" fill="rgb(var(--color-dark-900))" />
      <rect width="800" height="450" fill={`url(#${id}-g)`} />
      <rect width="800" height="450" fill={`url(#${id}-glow)`} />
      {draw()}
    </svg>
  );
};

export default PostCover;
