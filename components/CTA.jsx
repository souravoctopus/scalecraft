import { ArrowUpRight } from "lucide-react";
import { contact } from "@/data/site";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default function CTA() {
  return (
    <section aria-labelledby="cta-title" className="bg-mist pb-24 sm:pb-32">
      <div className="container-x">
        <div
          data-reveal
          className="relative isolate overflow-hidden rounded-[2rem] bg-navy-950 px-6 py-20 text-center text-white sm:rounded-[2.5rem] sm:px-12 sm:py-28"
        >
          <div className="absolute inset-0 -z-10 bg-grid-dark [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]" />
          {/* Concentric orbit rings from the SKD badge */}
          <div className="absolute left-1/2 top-1/2 -z-10 size-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-silver-300/10" />
          <div className="absolute left-1/2 top-1/2 -z-10 size-[34rem] -translate-x-1/2 -translate-y-1/2 animate-spin-slower rounded-full border border-dashed border-crimson-400/30" />
          <div className="absolute left-1/2 top-1/2 -z-10 size-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-silver-300/10 bg-navy-800/30 blur-[1px]" />
          <div className="absolute -bottom-40 left-1/2 -z-10 size-[30rem] -translate-x-1/2 rounded-full bg-crimson-600/20 blur-[120px]" />

          <p className="eyebrow justify-center text-silver-300">Let&apos;s work together</p>
          <h2
            id="cta-title"
            className="mx-auto mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            Ready to Scale Your <span className="text-metal">Digital Presence?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-silver-300">
            Let&apos;s build a stronger digital presence for your business.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#contact" className="btn btn-primary">
              Start a Conversation <ArrowUpRight className="btn-arrow size-4" aria-hidden="true" />
            </a>
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-white/20 bg-white text-navy-950 hover:bg-silver-100"
            >
              <WhatsAppIcon className="size-5 text-[#1FA855]" /> WhatsApp Us
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
