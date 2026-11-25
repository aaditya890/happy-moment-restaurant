/**
 * Happy Moments logo, redrawn as a sharp vector (looks crisp at any size).
 * Colours: logo green, gold, flame orange on black.
 */
const C = 200;
const pt = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [+(C + r * Math.cos(a)).toFixed(2), +(C + r * Math.sin(a)).toFixed(2)] as const;
};
/** Arc path from angle a1 to a2 (degrees, 0 = right, 90 = down) */
const arc = (r: number, a1: number, a2: number, clockwise = true) => {
  const [x1, y1] = pt(r, a1);
  const [x2, y2] = pt(r, a2);
  const span = Math.abs(a2 - a1);
  return `M ${x1} ${y1} A ${r} ${r} 0 ${span > 180 ? 1 : 0} ${clockwise ? 1 : 0} ${x2} ${y2}`;
};

export default function Logo({ className = "", title = "Happy Moments Café & Restaurant" }: { className?: string; title?: string }) {
  const [fx, fy] = pt(168, 208);
  const [sx, sy] = pt(168, 38);
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label={title}>
      <defs>
        <linearGradient id="hm-green" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#2f9e44" />
          <stop offset="0.55" stopColor="#5fbf3a" />
          <stop offset="1" stopColor="#a8d84a" />
        </linearGradient>
        <linearGradient id="hm-word" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#3fae4a" />
          <stop offset="0.5" stopColor="#8fcf45" />
          <stop offset="1" stopColor="#c9e06a" />
        </linearGradient>
        <linearGradient id="hm-gold" x1="0" x2="1">
          <stop offset="0" stopColor="#f0a030" />
          <stop offset="0.5" stopColor="#f6d24a" />
          <stop offset="1" stopColor="#f0a030" />
        </linearGradient>
        <linearGradient id="hm-flame" x1="0" x2="0" y1="1" y2="0">
          <stop offset="0" stopColor="#e2471f" />
          <stop offset="0.6" stopColor="#f3862a" />
          <stop offset="1" stopColor="#ffc93c" />
        </linearGradient>
        <path id="hm-top" d={arc(132, 222, 318)} />
        <path id="hm-bottom" d={arc(128, 160, 20, false)} />
      </defs>

      <circle cx={C} cy={C} r="199" fill="#000" />
      <circle cx={C} cy={C} r="196" fill="none" stroke="#d9b45a" strokeOpacity="0.35" strokeWidth="1.5" />

      {/* Top: green arc ending in a fork, gold arc inside */}
      <path d={arc(168, 208, 336)} fill="none" stroke="url(#hm-green)" strokeWidth="9" strokeLinecap="round" />
      <path d={arc(150, 228, 318)} fill="none" stroke="url(#hm-gold)" strokeWidth="4" strokeLinecap="round" />
      <g transform={`translate(${fx} ${fy}) rotate(28)`} fill="#3fae4a">
        <rect x="-4.5" y="-2" width="9" height="12" rx="3" />
        <path d="M -13 9 h 26 v 6 q 0 6 -6 6 h -14 q -6 0 -6 -6 z" />
        <rect x="-13" y="18" width="4.2" height="24" rx="2" />
        <rect x="-5.6" y="18" width="4.2" height="24" rx="2" />
        <rect x="1.4" y="18" width="4.2" height="24" rx="2" />
        <rect x="8.8" y="18" width="4.2" height="24" rx="2" />
      </g>

      <text fill="#f5eedc" fontFamily="Hind, system-ui, sans-serif" fontWeight="600" fontSize="19" letterSpacing="2.5">
        <textPath href="#hm-top" startOffset="50%" textAnchor="middle">
          KEEP SMILE
        </textPath>
      </text>

      {/* Monogram: Y, leaves with spoon and fork, P */}
      <g>
        <text x="146" y="158" fill="#f5eedc" fontFamily="'Fraunces Variable', Georgia, serif" fontWeight="600" fontSize="40" textAnchor="middle">
          Y
        </text>
        <text x="254" y="158" fill="#f5eedc" fontFamily="'Fraunces Variable', Georgia, serif" fontWeight="600" fontSize="40" textAnchor="middle">
          P
        </text>
        <path d="M 200 160 C 178 158 166 140 168 122 C 186 122 200 136 200 160 Z" fill="#2f9e44" />
        <path d="M 200 160 C 222 158 234 140 232 122 C 214 122 200 136 200 160 Z" fill="#7cc644" />
        <path d="M 200 158 L 180 128 M 200 158 L 220 128" stroke="#000" strokeOpacity="0.35" strokeWidth="1.5" />
        {/* spoon */}
        <ellipse cx="191" cy="98" rx="6" ry="8.5" fill="#f6d24a" transform="rotate(-12 191 98)" />
        <rect x="190" y="104" width="3" height="20" rx="1.5" fill="#f6d24a" transform="rotate(-12 191 104)" />
        {/* fork */}
        <g fill="#f08a24" transform="rotate(12 210 110)">
          <rect x="208.5" y="104" width="3" height="20" rx="1.5" />
          <path d="M 204 92 h 12 v 8 q 0 5 -5 5 h -2 q -5 0 -5 -5 z" />
          <rect x="204" y="86" width="2.2" height="8" rx="1" />
          <rect x="208.9" y="86" width="2.2" height="8" rx="1" />
          <rect x="213.8" y="86" width="2.2" height="8" rx="1" />
        </g>
      </g>

      {/* Wordmark */}
      <text
        x={C}
        y="236"
        fill="url(#hm-word)"
        fontFamily="'Fraunces Variable', Georgia, serif"
        fontWeight="560"
        fontSize="54"
        textAnchor="middle"
        textLength="330"
        lengthAdjust="spacingAndGlyphs"
      >
        happy moments
      </text>

      {/* Flame */}
      <g transform="translate(200 291) scale(0.82) translate(-200 -284)">
      <path
        d="M 200 300 C 180 300 172 284 178 270 C 182 260 190 256 188 244 C 198 250 202 258 200 268 C 206 262 208 254 206 246 C 220 258 228 272 222 286 C 218 296 210 300 200 300 Z"
        fill="url(#hm-flame)"
      />
      <path d="M 200 298 C 191 298 188 290 191 283 C 194 277 199 276 199 268 C 206 276 210 283 208 290 C 206 296 203 298 200 298 Z" fill="#ffd54a" />
      </g>

      {/* Bottom: script line, orange arc, green arc ending in a spoon */}
      <text fill="#f5eedc" fontFamily="'Fraunces Variable', Georgia, serif" fontStyle="italic" fontSize="21" letterSpacing="0.5">
        <textPath href="#hm-bottom" startOffset="50%" textAnchor="middle">
          Cafe &amp; restaurant
        </textPath>
      </text>
      <path d={arc(150, 152, 32, false)} fill="none" stroke="url(#hm-gold)" strokeWidth="4" strokeLinecap="round" />
      <path d={arc(168, 128, 40, false)} fill="none" stroke="url(#hm-green)" strokeWidth="9" strokeLinecap="round" />
      <g transform={`translate(${sx} ${sy}) rotate(-140)`} fill="#5fbf3a">
        <ellipse cx="0" cy="22" rx="12" ry="18" />
        <rect x="-4.5" y="-4" width="9" height="10" rx="3" />
      </g>
    </svg>
  );
}
