import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { contact, map, site } from "@/data/site";
import ContactForm from "@/components/ContactForm";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

const details = [
  { icon: Phone, label: "Phone", value: contact.phoneDisplay, href: contact.phoneHref, wide: true },
  { icon: Mail, label: "Email", value: contact.email, href: contact.emailHref, wide: true },
  { icon: WhatsAppIcon, label: "WhatsApp", value: `Chat with us on ${contact.phoneDisplay}`, href: contact.whatsappHref, external: true, wide: true },
];

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative bg-white py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p data-reveal className="eyebrow text-crimson-600">
              (08) Contact
            </p>
            <h2
              id="contact-title"
              data-split
              className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-navy-950 sm:text-5xl lg:text-6xl"
            >
              Let&apos;s Talk About Your Growth.
            </h2>
            <p data-reveal className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Tell us about your business and goals — we&apos;ll get back to you with the next steps.
            </p>

            <address data-reveal className="mt-10 not-italic">
              <p className="font-display text-xl font-semibold text-navy-950">{site.name}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {details.map(({ icon: Icon, label, value, href, external, wide }) => (
                  <li key={label} className={wide ? "sm:col-span-2" : ""}>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center gap-4 rounded-2xl border border-navy-950/10 p-4 transition-colors hover:border-navy-950/30 hover:bg-mist"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-navy-950 text-white transition-colors group-hover:bg-crimson-600">
                        <Icon className="size-[1.1rem]" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-medium uppercase tracking-wider text-muted">{label}</span>
                        <span className="block break-words font-semibold text-navy-950">{value}</span>
                      </span>
                      {external && <span className="sr-only">(opens in a new tab)</span>}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex items-start gap-4 rounded-2xl border border-navy-950/10 p-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-navy-950 text-white">
                  <MapPin className="size-[1.1rem]" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-medium uppercase tracking-wider text-muted">Address</span>
                  <span className="block font-semibold leading-relaxed text-navy-950">
                    {contact.address.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </span>
                </span>
              </div>
            </address>
          </div>

          <div data-reveal className="rounded-[2rem] border border-navy-950/10 bg-mist p-6 sm:p-10 lg:self-start">
            <h3 className="font-display text-2xl font-semibold text-navy-950">Send us an enquiry</h3>
            <p className="mt-2 text-muted">Fields marked optional can be left blank.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Map */}
        <div data-reveal className="relative mt-16 overflow-hidden rounded-[2rem] border border-navy-950/10 bg-mist">
          <iframe
            src={map.embedUrl}
            title="Map showing SKD Scale Craft Media location in Netaji Pally, Paschim Para, North 24 Parganas"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[22rem] w-full grayscale-[35%] sm:h-[26rem]"
          />
          <a
            href={map.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark absolute bottom-4 left-4 !min-h-11 !py-2.5 text-sm shadow-lg sm:bottom-6 sm:left-6"
          >
            Open in Google Maps <ArrowUpRight className="btn-arrow size-4" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
