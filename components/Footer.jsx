import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { contact, footerServices, navLinks, site, socials } from "@/data/site";
import Logo from "@/components/ui/Logo";
import SocialIcon from "@/components/ui/SocialIcon";

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-navy-950 text-silver-300">
      <div className="absolute inset-0 -z-10 bg-grid-dark [mask-image:linear-gradient(to_bottom,#000,transparent_80%)]" />

      <div className="container-x pb-10 pt-20 sm:pt-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_0.8fr_1.2fr] lg:gap-10">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-xs leading-relaxed">
              Digital marketing that helps businesses build stronger brands, reach the right audience and grow.
            </p>
            <ul className="mt-8 flex gap-3" aria-label="Social media">
              {socials.map((s) => (
                <li key={s.name}>
                  {s.url ? (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} on ${s.name}`}
                      className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-crimson-400 hover:bg-crimson-600"
                    >
                      <SocialIcon name={s.name} />
                    </a>
                  ) : (
                    <span
                      title={`${s.name} — coming soon`}
                      className="grid size-11 place-items-center rounded-full border border-white/10 text-white/35"
                    >
                      <SocialIcon name={s.name} />
                      <span className="sr-only">{s.name} profile coming soon</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Services">
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-white">Services</h2>
            <ul className="mt-6 space-y-3">
              {footerServices.map((s) => (
                <li key={s}>
                  <a href="#services" className="transition-colors hover:text-white">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Quick links">
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-white">Quick Links</h2>
            <ul className="mt-6 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-white">Contact</h2>
            <address className="mt-6 space-y-4 not-italic">
              <a href={contact.phoneHref} className="flex items-center gap-3 transition-colors hover:text-white">
                <Phone className="size-4 shrink-0 text-crimson-300" aria-hidden="true" />
                {contact.phoneDisplay}
              </a>
              <a href={contact.emailHref} className="flex items-center gap-3 break-all transition-colors hover:text-white">
                <Mail className="size-4 shrink-0 text-crimson-300" aria-hidden="true" />
                {contact.email}
              </a>
              <p className="flex gap-3 leading-relaxed">
                <MapPin className="mt-1 size-4 shrink-0 text-crimson-300" aria-hidden="true" />
                <span>
                  {contact.address.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </span>
              </p>
            </address>
          </div>
        </div>

        {/* Oversized wordmark */}
        <p
          aria-hidden="true"
          className="mt-20 select-none whitespace-nowrap text-center font-display text-[13vw] font-bold leading-none tracking-tighter text-white/[0.04] xl:text-[11rem]"
        >
          SCALE CRAFT
        </p>

        <div className="mt-6 flex flex-col-reverse items-start justify-between gap-6 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center">
          <p>© 2026 SKD Scale Craft Media. All Rights Reserved.</p>
          <a href="#top" className="inline-flex items-center gap-2 transition-colors hover:text-white">
            Back to top <ArrowUp className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
