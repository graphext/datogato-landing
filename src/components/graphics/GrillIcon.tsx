export function GrillIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      role="img"
      aria-label="Parrilla con humo"
      className={className}
    >
      <defs>
        <linearGradient id="grill-body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d06b3a" />
          <stop offset="100%" stopColor="#8c3f1f" />
        </linearGradient>
      </defs>
      <circle cx="80" cy="80" r="78" fill="#f5e7d4" />
      <g transform="translate(20 20)">
        <ellipse cx="60" cy="45" rx="56" ry="28" fill="url(#grill-body)" />
        <ellipse cx="60" cy="47" rx="50" ry="22" fill="#f8d7b3" />
        <path
          d="M10 60 L110 60"
          stroke="#5c2e1a"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M25 60 L35 110 M95 60 L85 110"
          stroke="#5c2e1a"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <ellipse cx="44" cy="50" rx="10" ry="6" fill="#b15a30" />
        <ellipse cx="76" cy="50" rx="10" ry="6" fill="#b15a30" />
        <path
          d="M40 20 C35 10 45 0 52 10"
          stroke="#a04c2d"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M70 15 C65 5 75 -3 82 7"
          stroke="#a04c2d"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M55 100 L45 120 M70 100 L80 120"
          stroke="#5c2e1a"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
