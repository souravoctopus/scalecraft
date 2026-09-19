"use client";

import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * One place for declarative scroll animations, so section components can stay
 * server-rendered. Mark up elements with:
 *
 *   data-reveal            fade-up on enter
 *   data-reveal-group      stagger its direct children on enter
 *   data-split             line-by-line masked heading reveal
 *   data-parallax="0.15"   subtle vertical parallax (fraction of viewport)
 *   data-clip-reveal       clip-path image/card reveal
 *
 * Nothing is hidden unless motion is allowed and JS has run, so content is
 * always visible for reduced-motion users and before hydration.
 */
export default function ScrollAnimations() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const splits = [];
      const start = "top 86%";

      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 44,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start, once: true },
        });
      });

      gsap.utils.toArray("[data-reveal-group]").forEach((group) => {
        gsap.from(group.children, {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: group, start, once: true },
        });
      });

      gsap.utils.toArray("[data-clip-reveal]").forEach((el) => {
        gsap.from(el, {
          clipPath: "inset(18% 8% 18% 8% round 28px)",
          opacity: 0,
          duration: 1.3,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        const amount = parseFloat(el.dataset.parallax) || 0.1;
        gsap.fromTo(
          el,
          { yPercent: amount * 100 },
          {
            yPercent: -amount * 100,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });

      // Split headings once fonts are ready so line breaks are measured correctly.
      document.fonts.ready.then(() => {
        gsap.utils.toArray("[data-split]").forEach((el) => {
          const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
          splits.push(split);
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start, once: true },
          });
        });
        ScrollTrigger.refresh();
      });

      return () => splits.forEach((s) => s.revert());
    });

    return () => mm.revert();
  });

  return null;
}
