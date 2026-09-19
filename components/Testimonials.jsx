"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { testimonials } from "@/data/testimonials";

function EmptyState() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-navy-950/10 bg-white p-8 sm:p-12 lg:p-16">
      <div className="absolute -right-16 -top-16 size-64 rounded-full border border-dashed border-crimson-600/25" />
      <Quote className="size-12 text-crimson-600" aria-hidden="true" />
      <p className="mt-8 max-w-3xl font-display text-2xl font-medium leading-snug text-navy-950 sm:text-3xl lg:text-4xl">
        Client stories are on their way.
      </p>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
        We&apos;re collecting feedback from the businesses we work with. Verified testimonials will be shared
        here soon.
      </p>
      <a href="#contact" className="btn btn-dark mt-10">
        Work with us <ArrowUpRight className="btn-arrow size-4" aria-hidden="true" />
      </a>
    </div>
  );
}

function Carousel() {
  const [index, setIndex] = useState(0);
  const ref = useRef(null);
  const t = testimonials[index];
  const count = testimonials.length;
  const go = (d) => setIndex((i) => (i + d + count) % count);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo("[data-quote]", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08 });
      });
    },
    { scope: ref, dependencies: [index] }
  );

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[2rem] border border-navy-950/10 bg-white p-8 sm:p-12 lg:p-16"
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <Quote className="size-12 text-crimson-600" aria-hidden="true" />
      <figure aria-live="polite" aria-atomic="true">
        <blockquote data-quote className="mt-8 max-w-4xl font-display text-2xl font-medium leading-snug text-navy-950 sm:text-3xl">
          “{t.quote}”
        </blockquote>
        <figcaption data-quote className="mt-10 flex items-center gap-4">
          {t.image && <Image src={t.image} alt="" width={56} height={56} className="size-14 rounded-full object-cover" />}
          <span>
            <span className="block font-semibold text-navy-950">{t.name}</span>
            <span className="block text-sm text-muted">{[t.role, t.company].filter(Boolean).join(", ")}</span>
          </span>
        </figcaption>
      </figure>

      {count > 1 && (
        <div className="mt-10 flex items-center justify-between gap-6">
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                className="grid h-11 place-items-center"
              >
                <span className={`block h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-8 bg-crimson-600" : "w-3 bg-navy-950/20"}`} />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="grid size-12 place-items-center rounded-full border border-navy-950/15 transition-colors hover:bg-navy-950 hover:text-white">
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="grid size-12 place-items-center rounded-full border border-navy-950/15 transition-colors hover:bg-navy-950 hover:text-white">
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="relative bg-mist py-24 sm:py-32">
      <div className="container-x">
        <div className="max-w-3xl">
          <p data-reveal className="eyebrow text-crimson-600">
            (07) Testimonials
          </p>
          <h2
            id="testimonials-title"
            data-split
            className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-navy-950 sm:text-5xl lg:text-6xl"
          >
            What Our Clients Say
          </h2>
        </div>
        <div data-reveal className="mt-14">
          {testimonials.length ? <Carousel /> : <EmptyState />}
        </div>
      </div>
    </section>
  );
}
