export function DatogatoCat({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 220"
      role="img"
      aria-label="Gato sonriente comiendo hamburguesa"
      className={className}
    >
      <defs>
        <linearGradient id="fur" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#b15a30" />
          <stop offset="100%" stopColor="#8c3f1f" />
        </linearGradient>
        <linearGradient id="burger" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f3c08a" />
          <stop offset="50%" stopColor="#d98345" />
          <stop offset="100%" stopColor="#b15a30" />
        </linearGradient>
      </defs>
      <circle cx="110" cy="110" r="108" fill="#f5e7d4" />
      <g transform="translate(25 20)" fill="none" stroke="none">
        <path
          d="M40 60 C30 35 45 15 70 25 C85 20 100 20 115 25 C140 15 155 35 145 60"
          fill="url(#fur)"
        />
        <path
          d="M30 120 C25 70 45 45 90 45 C135 45 155 70 150 120 C145 165 115 190 90 190 C65 190 35 165 30 120 Z"
          fill="url(#fur)"
        />
        <path
          d="M52 106 C55 96 65 89 78 89 C91 89 101 96 104 106"
          stroke="#f5e7d4"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="60" cy="85" r="10" fill="#f5e7d4" />
        <circle cx="100" cy="85" r="10" fill="#f5e7d4" />
        <circle cx="60" cy="85" r="4" fill="#5c2e1a" />
        <circle cx="100" cy="85" r="4" fill="#5c2e1a" />
        <path
          d="M78 105 C78 115 72 123 66 123"
          stroke="#5c2e1a"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <ellipse cx="78" cy="138" rx="42" ry="24" fill="url(#burger)" />
        <path
          d="M36 132 C50 120 110 120 124 132"
          stroke="#5c2e1a"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M38 145 C52 155 104 155 118 145"
          stroke="#5c2e1a"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M60 140 C65 145 70 148 78 148 C86 148 91 145 96 140"
          stroke="#5c2e1a"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M20 95 C35 100 45 100 60 95"
          stroke="#f5e7d4"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M136 95 C121 100 111 100 96 95"
          stroke="#f5e7d4"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
