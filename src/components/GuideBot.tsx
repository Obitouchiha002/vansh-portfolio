/* Vanshbot — the little neon guide that travels the journey with you. */
export default function GuideBot({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-label="guide">
      <defs>
        <linearGradient id="botgrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00ff9d" />
          <stop offset="100%" stopColor="#00e5ff" />
        </linearGradient>
      </defs>
      {/* antenna */}
      <line x1="32" y1="5" x2="32" y2="14" stroke="url(#botgrad)" strokeWidth="2.5" />
      <circle cx="32" cy="4.5" r="3" fill="url(#botgrad)" />
      {/* head */}
      <rect x="13" y="13" width="38" height="31" rx="11" fill="#0a0f0e" stroke="url(#botgrad)" strokeWidth="2.6" />
      {/* eyes */}
      <circle cx="24" cy="28" r="4.2" fill="#00ff9d" />
      <circle cx="40" cy="28" r="4.2" fill="#00e5ff" />
      {/* smile */}
      <path d="M24 37 Q32 42.5 40 37" stroke="url(#botgrad)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {/* body */}
      <rect x="20" y="46" width="24" height="11" rx="4.5" fill="#0a0f0e" stroke="url(#botgrad)" strokeWidth="2.2" />
      <line x1="27" y1="51.5" x2="37" y2="51.5" stroke="url(#botgrad)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
