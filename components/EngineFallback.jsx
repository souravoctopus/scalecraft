/**
 * Lightweight SVG version of the SKD Growth Engine.
 * Shown on mobile, for reduced-motion users, without WebGL, and while the 3D scene loads.
 */
export default function EngineFallback({ className = "" }) {
  const bars = [0.34, 0.5, 0.64, 0.82, 1];
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ef-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#c9cdd3" />
          <stop offset="1" stopColor="#7d8591" />
        </linearGradient>
        <linearGradient id="ef-crimson" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#8c142c" />
          <stop offset="1" stopColor="#e0445f" />
        </linearGradient>
        <radialGradient id="ef-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#1f4c7c" stopOpacity="0.55" />
          <stop offset="1" stopColor="#071a2b" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="200" cy="200" r="190" fill="url(#ef-glow)" />

      <g className="origin-center animate-spin-slower" style={{ transformBox: "fill-box" }}>
        <circle cx="200" cy="200" r="182" fill="none" stroke="#c9cdd3" strokeOpacity="0.18" />
        <circle cx="200" cy="200" r="182" fill="none" stroke="#e0445f" strokeWidth="2" strokeDasharray="2 18" />
        <circle cx="382" cy="200" r="4" fill="#e0445f" />
        <circle cx="18" cy="200" r="3" fill="#c9cdd3" />
      </g>

      <g className="origin-center animate-spin-slow [animation-direction:reverse]" style={{ transformBox: "fill-box" }}>
        <circle cx="200" cy="200" r="148" fill="none" stroke="url(#ef-metal)" strokeWidth="10" />
        <circle cx="200" cy="200" r="148" fill="none" stroke="#071a2b" strokeWidth="1.5" strokeDasharray="1 11" />
        <path d="M200 52 A148 148 0 0 1 348 200" fill="none" stroke="#a71935" strokeWidth="10" strokeLinecap="round" />
      </g>

      <circle cx="200" cy="200" r="112" fill="none" stroke="#163b63" strokeWidth="14" />
      <circle cx="200" cy="200" r="104" fill="#0b2238" />

      {bars.map((h, i) => {
        const height = 100 * h;
        const x = 146 + i * 23;
        return (
          <rect
            key={i}
            x={x}
            y={250 - height}
            width="15"
            height={height}
            rx="3"
            fill={i === bars.length - 1 ? "url(#ef-crimson)" : "url(#ef-metal)"}
            opacity={i === bars.length - 1 ? 1 : 0.55 + i * 0.1}
          />
        );
      })}
      <polyline
        points="150,212 176,196 200,184 222,162 252,138"
        fill="none"
        stroke="#e0445f"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="252" cy="138" r="5" fill="#fff" stroke="#e0445f" strokeWidth="2.5" />
    </svg>
  );
}
