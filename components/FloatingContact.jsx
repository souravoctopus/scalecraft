"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { contact } from "@/data/site";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default function FloatingContact() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const base =
    "group relative grid size-12 place-items-center rounded-full text-white shadow-[0_12px_30px_-8px_rgb(7_26_43/0.55)] transition-transform duration-300 hover:-translate-y-0.5 sm:size-14";
  const tip =
    "pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-navy-950 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:block";

  return (
    <div
      className={`fixed bottom-4 right-4 z-40 flex flex-col gap-3 transition-all duration-500 ease-premium sm:bottom-6 sm:right-6 ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
      aria-hidden={!shown}
      inert={!shown}
    >
      <a
        href={contact.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp us on ${contact.phoneDisplay} (opens in a new tab)`}
        className={`${base} bg-[#1FA855]`}
      >
        <span className={tip}>WhatsApp</span>
        <WhatsAppIcon className="size-6" />
      </a>
      <a href={contact.phoneHref} aria-label={`Call ${contact.phoneDisplay}`} className={`${base} bg-navy-950 ring-1 ring-white/10`}>
        <span className={tip}>Call {contact.phoneDisplay}</span>
        <Phone className="size-5" aria-hidden="true" />
      </a>
    </div>
  );
}
