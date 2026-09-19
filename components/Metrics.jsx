"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { metrics } from "@/data/content";

const format = (n) => Math.round(n).toLocaleString("en-IN");

function MetricValue({ metric }) {
  if (metric.value == null) {
    // No verified number yet — show an honest placeholder, never a made-up figure.
    return (
      <div className="flex h-[3.5rem] items-end gap-1.5 sm:h-16" role="img" aria-label="Figure to be published">
        {[0.35, 0.55, 0.45, 0.75, 1].map((h, i) => (
          <span
            key={i}
            data-metric-bar
            className={`w-2.5 origin-bottom rounded-sm ${i === 4 ? "bg-crimson-500" : "bg-white/15"}`}
            style={{ height: `${h * 100}%` }}
          />
        ))}
      </div>
    );
  }
  return (
    <p className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl">
      {metric.prefix}
      <span data-count={metric.value}>{format(metric.value)}</span>
      {metric.suffix}
    </p>
  );
}

export default function Metrics() {
  const ref = useRef(null);
  const hasNumbers = metrics.some((m) => m.value != null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.utils.toArray("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => (el.textContent = format(obj.v)),
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });
        gsap.from("[data-metric-bar]", {
          scaleY: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      aria-labelledby="metrics-title"
      className="relative isolate overflow-hidden bg-navy-950 py-24 text-white sm:py-32"
    >
      <div className="absolute inset-0 -z-10 bg-grid-dark [mask-image:linear-gradient(to_bottom,transparent,#000_30%,#000_70%,transparent)]" />
      {/* Abstract growth line */}
      <svg
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 w-full"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 380 C 200 360, 300 320, 450 300 S 700 220, 820 180 S 1050 60, 1200 30"
          fill="none"
          stroke="#a71935"
          strokeOpacity="0.5"
          strokeWidth="2"
        />
        <path
          d="M0 380 C 200 360, 300 320, 450 300 S 700 220, 820 180 S 1050 60, 1200 30 L1200 400 L0 400 Z"
          fill="#163b63"
          fillOpacity="0.18"
        />
      </svg>

      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p data-reveal className="eyebrow text-silver-300">
              (06) Results
            </p>
            <h2
              id="metrics-title"
              data-split
              className="mt-6 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl"
            >
              Growth Is Measurable.
            </h2>
          </div>
          <p data-reveal className="max-w-lg text-lg leading-relaxed text-silver-300 lg:justify-self-end">
            We track the numbers that show real progress — and report them clearly.
            {!hasNumbers && " Verified campaign results will be published here as they become available."}
          </p>
        </div>

        <ul data-reveal-group className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {metrics.map((m, i) => (
            <li key={m.label} className="flex flex-col justify-between gap-10 bg-navy-950 p-7 sm:p-8 sm:odd:last:col-span-2 lg:odd:last:col-span-1">
              <span className="text-xs font-semibold tracking-widest text-muted-dark">0{i + 1}</span>
              <div>
                <MetricValue metric={m} />
                <h3 className="mt-5 font-display text-lg font-semibold">{m.label}</h3>
                {m.value == null && <p className="mt-1 text-sm text-muted-dark">Results coming soon</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
