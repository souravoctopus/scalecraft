"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { processSteps } from "@/data/content";

const R = 150; // orbit radius in the 400x400 SVG
const CIRC = 2 * Math.PI * R;

export default function Process() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const total = processSteps.length;

  useGSAP(
    () => {
      const steps = gsap.utils.toArray("[data-step]");

      // Track the active step (all devices; also updates without animation for reduced motion).
      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });

      gsap.matchMedia().add(MOTION_OK, () => {
        // Mobile timeline fill follows scroll progress through the steps.
        const progress = {
          trigger: "[data-steps]",
          start: "top 60%",
          end: "bottom 60%",
          scrub: 0.6,
        };
        gsap.fromTo("[data-line-fill]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: progress });

        steps.forEach((step) => {
          gsap.from(step, {
            x: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 85%", once: true },
          });
        });
      });
    },
    { scope: sectionRef }
  );

  const nodePos = (i) => {
    const a = (i / total) * Math.PI * 2 - Math.PI / 2;
    return { x: 200 + Math.cos(a) * R, y: 200 + Math.sin(a) * R };
  };

  return (
    <section ref={sectionRef} aria-labelledby="process-title" className="relative overflow-x-clip bg-mist py-24 sm:py-32">
      <div className="container-x">
        <div className="max-w-3xl">
          <p data-reveal className="eyebrow text-crimson-600">
            (04) Process
          </p>
          <h2
            id="process-title"
            data-split
            className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-navy-950 sm:text-5xl lg:text-6xl"
          >
            Our Approach to Digital Growth
          </h2>
          <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            A clear, repeatable cycle — each step feeding the next, so your marketing keeps improving over
            time.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Orbit (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <svg viewBox="0 0 400 400" className="w-full max-w-[32rem]" aria-hidden="true">
                <circle cx="200" cy="200" r={R + 34} fill="none" stroke="#071a2b" strokeOpacity="0.06" />
                <circle cx="200" cy="200" r={R} fill="none" stroke="#163b63" strokeOpacity="0.15" strokeWidth="2" />
                <circle
                  style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.22, 1, 0.36, 1)" }}
                  cx="200"
                  cy="200"
                  r={R}
                  fill="none"
                  stroke="#a71935"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={CIRC * (1 - (active + 1) / total)}
                  transform="rotate(-90 200 200)"
                />
                <circle cx="200" cy="200" r="92" fill="#071a2b" />
                <circle cx="200" cy="200" r="92" fill="none" stroke="#c9cdd3" strokeOpacity="0.25" strokeDasharray="2 8" />
                <text x="200" y="192" textAnchor="middle" className="fill-crimson-300 font-display text-[13px] font-semibold tracking-[0.3em]">
                  STEP {processSteps[active].number}
                </text>
                <text x="200" y="224" textAnchor="middle" className="fill-white font-display text-[28px] font-semibold">
                  {processSteps[active].title}
                </text>
                {processSteps.map((s, i) => {
                  const { x, y } = nodePos(i);
                  const on = i <= active;
                  return (
                    <g key={s.number}>
                      <circle
                        cx={x}
                        cy={y}
                        r={i === active ? 20 : 16}
                        className="transition-all duration-500"
                        fill={on ? "#a71935" : "#ffffff"}
                        stroke={on ? "#a71935" : "#163b63"}
                        strokeOpacity={on ? 1 : 0.25}
                      />
                      <text
                        x={x}
                        y={y + 4}
                        textAnchor="middle"
                        className="font-display text-[11px] font-semibold"
                        fill={on ? "#ffffff" : "#163b63"}
                      >
                        {s.number}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Steps */}
          <ol data-steps className="relative">
            <span className="absolute bottom-6 left-[1.4rem] top-6 w-px bg-navy-950/10 lg:hidden" aria-hidden="true" />
            <span
              data-line-fill
              className="absolute bottom-6 left-[1.4rem] top-6 w-px origin-top bg-crimson-600 lg:hidden"
              aria-hidden="true"
            />
            {processSteps.map((s, i) => {
              const on = i === active;
              return (
                <li
                  key={s.number}
                  data-step
                  aria-current={on ? "step" : undefined}
                  className="relative flex gap-6 pb-10 last:pb-0 lg:pb-6"
                >
                  <span
                    className={`relative z-10 grid size-11 shrink-0 place-items-center rounded-full border font-display text-sm font-semibold transition-colors duration-500 lg:hidden ${
                      i <= active ? "border-crimson-600 bg-crimson-600 text-white" : "border-navy-950/15 bg-white text-navy-800"
                    }`}
                  >
                    {s.number}
                  </span>
                  <div
                    className={`flex-1 rounded-3xl border p-6 transition-all duration-500 ease-premium sm:p-8 lg:p-10 ${
                      on
                        ? "border-navy-950/10 bg-white shadow-[0_30px_60px_-35px_rgb(7_26_43/0.4)]"
                        : "border-transparent bg-transparent"
                    }`}
                  >
                    <span className="hidden font-display text-sm font-semibold text-crimson-600 lg:block">
                      {s.number}
                    </span>
                    <h3 className="font-display text-2xl font-semibold text-navy-950 sm:text-3xl lg:mt-3 lg:text-4xl">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-lg leading-relaxed text-muted">{s.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
