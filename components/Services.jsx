"use client";

import { useRef, useState } from "react";
import {
  ArrowUpRight,
  Camera,
  Clapperboard,
  Gem,
  Magnet,
  MapPin,
  MonitorSmartphone,
  MousePointerClick,
  Palette,
  Plus,
  Search,
  Share2,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { services } from "@/data/services";

const icons = {
  TrendingUp,
  Share2,
  MousePointerClick,
  Palette,
  Clapperboard,
  Magnet,
  Gem,
  Search,
  MapPin,
  MonitorSmartphone,
  Smartphone,
  Camera,
};

// Hover previews only where the side panel is shown (large screens with a pointer).
const hoverSelects = () => window.matchMedia("(min-width: 1024px) and (hover: hover)").matches;

export default function Services() {
  const [active, setActive] = useState(0);
  const panelRef = useRef(null);
  const current = services[active];
  const ActiveIcon = icons[current.icon];

  // Cross-fade the preview panel content when the active service changes.
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-panel-anim]",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.05 }
        );
        gsap.fromTo("[data-panel-ring]", { rotate: -40 }, { rotate: 0, duration: 1.2, ease: "power3.out" });
      });
    },
    { scope: panelRef, dependencies: [active] }
  );

  return (
    <section id="services" aria-labelledby="services-title" className="relative bg-white py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p data-reveal className="eyebrow text-crimson-600">
              (02) Services
            </p>
            <h2
              id="services-title"
              data-split
              className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-navy-950 sm:text-5xl lg:text-6xl"
            >
              Everything You Need to Scale Digitally.
            </h2>
          </div>
          <p data-reveal className="max-w-lg text-lg leading-relaxed text-muted lg:justify-self-end">
            Twelve connected services, one growth plan. Pick what you need today and add more as your business
            grows.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          {/* Sticky preview panel (desktop) */}
          <div className="hidden lg:block">
            <div
              ref={panelRef}
              className="sticky top-28 overflow-hidden rounded-[2rem] bg-navy-950 p-10 text-white"
            >
              <div className="absolute inset-0 bg-grid-dark opacity-60" />
              <div
                data-panel-ring
                className="absolute -right-24 -top-24 size-80 rounded-full border border-dashed border-crimson-400/40"
              />
              <div className="absolute -right-10 -top-10 size-52 rounded-full border border-silver-300/15" />

              <div className="relative">
                <div data-panel-anim className="flex items-center justify-between">
                  <span className="font-display text-7xl font-semibold text-metal">{current.number}</span>
                  <span className="grid size-16 place-items-center rounded-full bg-crimson-600 shadow-[0_0_0_10px_rgb(167_25_53/0.15)]">
                    <ActiveIcon className="size-7" aria-hidden="true" />
                  </span>
                </div>
                <h3 data-panel-anim className="mt-12 font-display text-3xl font-semibold leading-tight">
                  {current.title}
                </h3>
                <p data-panel-anim className="mt-4 leading-relaxed text-silver-300">
                  {current.details}
                </p>
                <ul data-panel-anim className="mt-8 flex flex-wrap gap-2">
                  {current.tags.map((t) => (
                    <li key={t} className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs text-silver-200">
                      {t}
                    </li>
                  ))}
                </ul>
                <a data-panel-anim href="#contact" className="btn btn-primary mt-10">
                  Discuss this service <ArrowUpRight className="btn-arrow size-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Editorial service list */}
          <ul data-reveal-group className="border-t border-navy-950/10">
            {services.map((s, i) => {
              const Icon = icons[s.icon];
              const isActive = i === active;
              return (
                <li key={s.number} className="border-b border-navy-950/10">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => hoverSelects() && setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-expanded={isActive}
                    aria-controls={`service-${s.number}`}
                    className={`group relative flex w-full items-center gap-4 rounded-2xl px-3 py-6 text-left transition-[background-color,padding] duration-500 ease-premium sm:gap-6 sm:px-5 ${
                      isActive ? "bg-mist sm:py-8" : "hover:bg-mist/60"
                    }`}
                  >
                    <span
                      className={`hidden w-8 shrink-0 font-display text-sm font-semibold transition-colors sm:block ${
                        isActive ? "text-crimson-600" : "text-muted"
                      }`}
                    >
                      {s.number}
                    </span>
                    <span
                      className={`grid size-11 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                        isActive
                          ? "border-crimson-600 bg-crimson-600 text-white"
                          : "border-navy-950/15 text-navy-800 group-hover:border-navy-950/40"
                      }`}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="mb-1 block font-display text-xs font-semibold text-crimson-600 sm:hidden">{s.number}</span>
                      <span
                        className={`block font-display font-semibold leading-tight text-navy-950 transition-all duration-500 ease-premium ${
                          isActive ? "text-xl sm:text-3xl" : "text-lg sm:text-2xl"
                        }`}
                      >
                        {s.title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-muted">{s.summary}</span>
                    </span>
                    <Plus
                      className={`size-5 shrink-0 transition-transform duration-500 ease-premium ${
                        isActive ? "rotate-45 text-crimson-600" : "text-navy-950"
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Expanded details — inline on mobile/tablet (desktop uses the panel) */}
                  <div
                    id={`service-${s.number}`}
                    className={`grid transition-[grid-template-rows] duration-500 ease-premium lg:hidden ${
                      isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-3 pb-7 pt-1 sm:pl-[6.75rem] sm:pr-5">
                        <p className="leading-relaxed text-ink/80">{s.details}</p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {s.tags.map((t) => (
                            <li key={t} className="rounded-full bg-navy-950 px-3 py-1 text-xs font-medium text-white">
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
