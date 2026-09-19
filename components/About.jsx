import Image from "next/image";
import badge from "@/public/logo/skd-badge.png";
import { capabilities, aboutPillars } from "@/data/content";

export default function About() {
  const count = capabilities.length;

  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-mist py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid-light [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <p data-reveal className="eyebrow text-crimson-600">
            (01) About SKD
          </p>
          <h2
            id="about-title"
            data-split
            className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-navy-950 sm:text-5xl lg:text-6xl"
          >
            Marketing That Moves Your Business Forward.
          </h2>
          <div data-reveal className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
            <p>
              SKD Scale Craft Media is a digital marketing company focused on helping businesses strengthen
              their online presence, connect with the right audience and turn digital attention into
              meaningful business growth.
            </p>
            <p>
              We bring strategy, creativity and performance together — across digital marketing, social
              media, paid advertising, SEO, content, branding and lead generation — so every part of your
              marketing works toward the same goal.
            </p>
          </div>

          <ul data-reveal-group className="mt-12 grid gap-6 sm:grid-cols-3">
            {aboutPillars.map((p, i) => (
              <li key={p.title} className="border-t border-navy-950/15 pt-5">
                <span className="text-xs font-semibold text-crimson-600">0{i + 1}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-navy-950">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Capability orbit around the SKD badge */}
        <div data-reveal className="relative mx-auto w-full max-w-[34rem]">
          <div className="relative hidden aspect-square sm:block">
            <div className="absolute inset-[6%] rounded-full border border-navy-950/10" />
            <div className="absolute inset-[6%] animate-spin-slower rounded-full border border-dashed border-crimson-600/40" />
            <div className="absolute inset-[24%] rounded-full border border-navy-950/10 bg-white shadow-[0_40px_80px_-40px_rgb(7_26_43/0.45)]" />
            <div className="absolute inset-[33%]">
              <Image
                src={badge}
                alt="SKD Scale Craft Media badge"
                fill
                sizes="(min-width: 1024px) 180px, 30vw"
                className="rounded-full object-contain"
              />
            </div>
            <ul aria-label="Our capabilities">
              {capabilities.map((c, i) => {
                const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
                const x = 50 + Math.cos(angle) * 44;
                const y = 50 + Math.sin(angle) * 44;
                return (
                  <li
                    key={c}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <span className="block whitespace-nowrap rounded-full border border-navy-950/10 bg-white px-4 py-2 text-sm font-semibold text-navy-950 shadow-[0_12px_30px_-14px_rgb(7_26_43/0.35)] transition-colors hover:border-crimson-600 hover:text-crimson-600">
                      {c}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Mobile: simple capability list */}
          <div className="rounded-3xl border border-navy-950/10 bg-white p-6 sm:hidden">
            <div className="flex items-center gap-4">
              <Image src={badge} alt="" width={56} height={56} className="rounded-full" />
              <p className="font-display text-lg font-semibold text-navy-950">What we do</p>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {capabilities.map((c) => (
                <li key={c} className="rounded-full bg-mist px-3.5 py-1.5 text-sm font-medium text-navy-950">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
