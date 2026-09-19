import { ArrowUpRight, ArrowDown, MapPin } from "lucide-react";
import HeroVisual from "@/components/HeroVisual";
import { heroKeywords } from "@/data/content";

// Positions for the floating keyword badges around the engine (desktop).
const badgePositions = [
  "left-[2%] top-[14%]",
  "right-[0%] top-[26%]",
  "left-[-4%] bottom-[26%]",
  "right-[6%] bottom-[10%]",
];

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-navy-950 text-white"
    >
      {/* Background: grid + restrained glows */}
      <div className="absolute inset-0 -z-10 bg-grid-dark [mask-image:radial-gradient(ellipse_at_60%_40%,#000_20%,transparent_75%)]" />
      <div className="absolute -right-40 top-10 -z-10 size-[42rem] rounded-full bg-navy-700/40 blur-[120px]" />
      <div className="absolute -left-40 bottom-0 -z-10 size-[28rem] rounded-full bg-crimson-600/15 blur-[120px]" />

      <div className="container-x grid min-h-[100svh] items-center gap-10 pb-16 pt-32 lg:grid-cols-[1.2fr_0.8fr] lg:gap-6 lg:pb-24 lg:pt-36">
        <div className="relative z-10 max-w-3xl">
          <p className="hero-in eyebrow text-silver-300" style={{ "--d": "0.05s" }}>
            SKD Growth Engine
          </p>

          <h1
            id="hero-title"
            className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.02] sm:text-6xl lg:text-[4.1rem] xl:text-[4.6rem]"
          >
            <span className="hero-in block" style={{ "--d": "0.15s" }}>
              Scale Your Brand.
            </span>
            <span className="hero-in block" style={{ "--d": "0.3s" }}>
              Amplify Your <span className="text-metal">Digital</span>{" "}
              <span className="relative inline-block">
                Growth.
                <svg
                  viewBox="0 0 220 16"
                  className="absolute -bottom-2 left-0 w-full text-crimson-500"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2 12 C 60 2, 150 2, 218 8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </span>
          </h1>

          <p
            className="hero-in mt-8 max-w-xl text-base leading-relaxed text-silver-300 sm:text-lg"
            style={{ "--d": "0.45s" }}
          >
            SKD Scale Craft Media helps businesses build stronger brands, reach the right audience and
            generate measurable growth through digital marketing.
          </p>

          <div className="hero-in mt-10 flex flex-col gap-3 sm:flex-row" style={{ "--d": "0.6s" }}>
            <a href="#contact" className="btn btn-primary">
              Let&apos;s Grow <ArrowUpRight className="btn-arrow size-4" aria-hidden="true" />
            </a>
            <a href="#services" className="btn btn-ghost-light">
              Explore Services
            </a>
          </div>

          {/* Keyword badges — inline on small screens */}
          <ul className="hero-in mt-10 flex flex-wrap gap-2 md:hidden" style={{ "--d": "0.75s" }}>
            {heroKeywords.map((k) => (
              <li
                key={k}
                className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-silver-200"
              >
                {k}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-in relative mx-auto w-full max-w-[22rem] sm:max-w-md lg:max-w-none" style={{ "--d": "0.35s" }}>
          <HeroVisual />
          <ul className="hidden md:block" aria-label="What we focus on">
            {heroKeywords.map((k, i) => (
              <li
                key={k}
                className={`absolute ${badgePositions[i]} animate-float`}
                style={{ animationDelay: `${i * -1.5}s` }}
              >
                <span className="flex items-center gap-2 rounded-full border border-white/15 bg-navy-900/70 px-4 py-2 text-xs font-semibold tracking-wide text-white shadow-[0_10px_30px_-10px_rgb(0_0_0/0.6)] backdrop-blur-md">
                  <span className={`size-1.5 rounded-full ${i % 2 ? "bg-silver-300" : "bg-crimson-400"}`} />
                  {k}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-x absolute inset-x-0 bottom-6 hidden items-center justify-between text-xs text-muted-dark lg:flex">
        <span className="inline-flex items-center gap-2">
          <MapPin className="size-3.5 text-crimson-300" aria-hidden="true" />
          North 24 Parganas, West Bengal
        </span>
        <a href="#about" className="inline-flex items-center gap-2 transition-colors hover:text-white">
          Scroll to explore <ArrowDown className="size-3.5 animate-bounce" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
