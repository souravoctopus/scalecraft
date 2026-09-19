"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X, Phone, Mail } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { navLinks, contact } from "@/data/site";
import Logo from "@/components/ui/Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overlayRef = useRef(null);
  const toggleRef = useRef(null);
  const tl = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: circular reveal from the toggle (echoes the badge shape), staggered links.
  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      tl.current = gsap
        .timeline({ paused: true })
        .set(overlayRef.current, { visibility: "visible" })
        .fromTo(
          overlayRef.current,
          { clipPath: "circle(0% at calc(100% - 2.75rem) 2.5rem)" },
          {
            clipPath: "circle(150% at calc(100% - 2.75rem) 2.5rem)",
            duration: reduce ? 0 : 0.8,
            ease: "power3.inOut",
          }
        )
        .from(
          "[data-menu-item]",
          { y: 40, opacity: 0, duration: reduce ? 0 : 0.6, stagger: reduce ? 0 : 0.06, ease: "power3.out" },
          reduce ? 0 : "-=0.35"
        );
    },
    { scope: overlayRef }
  );

  useEffect(() => {
    if (!tl.current) return;
    if (open) {
      tl.current.timeScale(1).play();
      document.documentElement.style.overflow = "hidden";
      // Focus once the timeline has made the overlay visible.
      gsap.delayedCall(0.05, () => overlayRef.current?.querySelector("a")?.focus({ preventScroll: true }));
    } else {
      tl.current.timeScale(1.6).reverse();
      document.documentElement.style.overflow = "";
    }
    const onKey = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const close = () => mq.matches && setOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  const elevated = scrolled && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ease-premium ${
          elevated
            ? "border-b border-navy-950/5 bg-white/85 py-2.5 shadow-[0_10px_40px_-20px_rgb(7_26_43/0.35)] backdrop-blur-xl"
            : "border-b border-transparent py-4 lg:py-5"
        }`}
      >
        <nav aria-label="Primary" className="container-x flex items-center justify-between gap-6">
          <a href="#top" className="relative z-[60] rounded-full" aria-label="SKD Scale Craft Media — home">
            <Logo tone={elevated ? "dark" : "light"} compact={scrolled} priority />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`group relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    elevated ? "text-ink/80 hover:text-navy-950" : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-crimson-500 transition-transform duration-500 ease-premium group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className={`btn hidden !min-h-11 !py-2.5 !pl-5 !pr-4 sm:inline-flex ${
                elevated ? "btn-dark" : "btn-primary"
              }`}
            >
              Let&apos;s Talk
              <ArrowUpRight className="btn-arrow size-4" aria-hidden="true" />
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={`relative z-[60] grid size-11 place-items-center rounded-full border transition-colors lg:hidden ${
                elevated
                  ? "border-navy-950/15 text-navy-950"
                  : "border-white/25 text-white"
              }`}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </div>

      <div
        id="mobile-menu"
        ref={overlayRef}
        className="invisible fixed inset-0 z-50 flex flex-col overflow-y-auto bg-navy-950 bg-grid-dark lg:hidden"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="pointer-events-none absolute -right-24 top-1/3 size-[26rem] rounded-full border border-silver-300/10" />
        <div className="pointer-events-none absolute -right-10 top-[42%] size-[18rem] rounded-full border border-crimson-500/25" />
        <div className="container-x flex flex-1 flex-col pb-10 pt-28">
          <ul className="flex flex-col">
            {navLinks.map((link, i) => (
              <li key={link.href} data-menu-item className="border-b border-white/10">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-4 font-display text-4xl font-semibold text-white sm:text-5xl"
                >
                  <span className="text-xs font-medium tracking-widest text-crimson-300">
                    0{i + 1}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div data-menu-item className="mt-auto flex flex-col gap-3 pt-10 text-silver-300">
            <a href={contact.phoneHref} className="inline-flex items-center gap-3 py-1">
              <Phone className="size-4 text-crimson-300" aria-hidden="true" /> {contact.phoneDisplay}
            </a>
            <a href={contact.emailHref} className="inline-flex items-center gap-3 break-all py-1">
              <Mail className="size-4 shrink-0 text-crimson-300" aria-hidden="true" /> {contact.email}
            </a>
            <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary mt-4 w-full">
              Let&apos;s Talk <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
