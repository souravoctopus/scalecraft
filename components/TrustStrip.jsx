import { trustKeywords } from "@/data/content";

function Row({ hidden = false }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {trustKeywords.map((word, i) => (
        <li key={word} className="flex items-center">
          <span
            className={`px-6 font-display text-2xl font-semibold uppercase tracking-tight sm:px-9 sm:text-4xl ${
              i % 2 ? "text-transparent [-webkit-text-stroke:1px_var(--color-navy-800)]" : "text-navy-950"
            }`}
          >
            {word}
          </span>
          <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-crimson-600 sm:size-5" aria-hidden="true">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="4" fill="currentColor" />
          </svg>
        </li>
      ))}
    </ul>
  );
}

export default function TrustStrip() {
  return (
    <section aria-label="What we do" className="relative border-b border-navy-950/5 bg-white py-7 sm:py-9">
      <div className="marquee-mask group flex overflow-hidden">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
