// Central business details. Update values here and they flow through the whole site.

export const site = {
  name: "SKD Scale Craft Media",
  shortName: "SKD",
  tagline: "Digital Marketing Company",
  // Set NEXT_PUBLIC_SITE_URL in production so canonical / Open Graph URLs are absolute.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://skdscalecraftmedia.com",
  description:
    "SKD Scale Craft Media provides digital marketing, social media marketing, paid advertising, SEO, branding, content creation, lead generation and Google Business Profile management services.",
};

export const contact = {
  phoneDisplay: "6291588757",
  phoneHref: "tel:+916291588757",
  email: "info@skdscalecraftmedia.com",
  emailHref: "mailto:info@skdscalecraftmedia.com",
  whatsappHref: "https://wa.me/916291588757",
  address: {
    lines: ["Netaji Pally, Paschim Para,", "North 24 Parganas,", "West Bengal – 700125, India"],
    locality: "North 24 Parganas",
    region: "West Bengal",
    postalCode: "700125",
    country: "IN",
    street: "Netaji Pally, Paschim Para",
  },
};

const mapQuery = encodeURIComponent(
  "Netaji Pally, Paschim Para, North 24 Parganas, West Bengal 700125, India"
);

export const map = {
  // Keyless Google Maps embed. Override with NEXT_PUBLIC_MAP_EMBED_URL
  // (e.g. the "Embed a map" URL from Google Maps for an exact pin).
  embedUrl:
    process.env.NEXT_PUBLIC_MAP_EMBED_URL ||
    `https://www.google.com/maps?q=${mapQuery}&output=embed`,
  linkUrl: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
};

export const navLinks = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

// Social profiles — leave url empty until the real profile exists.
// Empty entries render as muted "coming soon" icons instead of dead links.
export const socials = [
  { name: "Instagram", url: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "" },
  { name: "Facebook", url: process.env.NEXT_PUBLIC_FACEBOOK_URL || "" },
  { name: "LinkedIn", url: process.env.NEXT_PUBLIC_LINKEDIN_URL || "" },
  { name: "YouTube", url: process.env.NEXT_PUBLIC_YOUTUBE_URL || "" },
];

export const footerServices = [
  "Digital Marketing",
  "Social Media Marketing",
  "Paid Advertising",
  "SEO",
  "Branding",
  "Content Creation",
  "Lead Generation",
];
