import { ChartNoAxesCombined, Compass, Layers, Lightbulb, Target, UsersRound } from "lucide-react";
import { features } from "@/data/content";

const icons = { Compass, Lightbulb, ChartNoAxesCombined, Target, Layers, UsersRound };

export default function WhyChooseUs() {
  return (
    <section
      aria-labelledby="why-title"
      className="relative isolate overflow-hidden bg-navy-950 py-24 text-white sm:py-32"
    >
      <div className="absolute inset-0 -z-10 bg-grid-dark [mask-image:radial-gradient(ellipse_at_top,#000_30%,transparent_75%)]" />
      <div
        data-parallax="0.2"
        className="absolute -right-48 top-24 -z-10 size-[36rem] rounded-full border border-silver-300/10"
      />
      <div
        data-parallax="0.35"
        className="absolute -right-24 top-48 -z-10 size-[22rem] rounded-full border border-dashed border-crimson-400/25"
      />

      <div className="container-x">
        <div className="max-w-3xl">
          <p data-reveal className="eyebrow text-silver-300">
            (03) Why SKD
          </p>
          <h2
            id="why-title"
            data-split
            className="mt-6 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            Built Around Your Growth.
          </h2>
          <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-silver-300">
            Our work is guided by a few simple principles that keep every campaign focused on what matters to
            your business.
          </p>
        </div>

        <ul data-reveal-group className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {features.map((f, i) => {
            const Icon = icons[f.icon];
            return (
              <li
                key={f.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-[border-color,background-color,transform] duration-500 ease-premium hover:-translate-y-1 hover:border-crimson-400/50 hover:bg-white/[0.06] sm:p-8"
              >
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-linear-to-r from-crimson-500 to-transparent transition-transform duration-700 ease-premium group-hover:scale-x-100" />
                <div className="flex items-start justify-between">
                  <span className="relative grid size-14 place-items-center">
                    <span className="absolute inset-0 rounded-full border border-dashed border-silver-300/30 transition-transform duration-1000 ease-premium group-hover:rotate-180 group-hover:border-crimson-400/60" />
                    <span className="grid size-10 place-items-center rounded-full bg-white/[0.06] text-silver-200 transition-colors duration-500 group-hover:bg-crimson-600 group-hover:text-white">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                  </span>
                  <span className="font-display text-sm text-muted-dark">0{i + 1}</span>
                </div>
                <h3 className="mt-10 font-display text-xl font-semibold">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-silver-300">{f.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
