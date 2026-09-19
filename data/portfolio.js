// Portfolio / gallery items.
//
// To add real work:
//   1. Put the image in /public/images/portfolio/ (e.g. cafe-reels.jpg).
//   2. Set `image: "/images/portfolio/cafe-reels.jpg"` and a descriptive `alt`.
//   3. Replace the title / description with the real project details.
//
// Items with `image: null` render as a branded "coming soon" placeholder,
// so no unrelated stock photos are ever presented as SKD client work.
//
// `size` controls the masonry tile shape: "tall" | "wide" | "regular".
// The current order (tall, regular, tall, regular, wide, regular) fills the grid
// without gaps at both 2 and 3 columns — keep that in mind when reordering.

export const portfolio = [
  {
    id: "social-media",
    category: "Social Media Marketing",
    title: "Social Media Campaigns",
    description: "Social media creatives built to boost brand visibility and reach.",
    image: "/socialmediacompaign.jpeg",
    alt: "Social media campaign creatives for digital marketing services",
    size: "tall",
  },
  {
    id: "branding",
    category: "Branding",
    title: "Brand Identity Work",
    description: "Logo, brand colours, business cards and stationery for a consistent identity.",
    image: "/brandidentitywork.jpeg",
    alt: "SKD Scale Craft Media brand identity with logo, business cards and stationery",
    size: "regular",
  },
  {
    id: "reels",
    category: "Video & Reels",
    title: "Reels & Short-Form Video",
    description: "Vertical, mobile-first creatives made for reels and short-form video.",
    image: "/reel and shortvideo.jpeg",
    alt: "Short-form mobile creative for SKD Scale Craft Media",
    size: "tall",
  },
  {
    id: "graphic-design",
    category: "Graphic Design",
    title: "Design & Collateral",
    description: "Promotional graphics and marketing collateral with a strong visual identity.",
    image: "/designandcollaterals.jpeg",
    alt: "Graphic design promotional creative for SKD Scale Craft Media",
    size: "regular",
  },
  {
    id: "paid-ads",
    category: "Paid Advertising",
    title: "Ad Creatives",
    description: "Ad banners designed to grab attention and drive clicks.",
    image: "/adcreative.jpeg",
    alt: "Ad creative banner: Scaling Brands, Crafting Impact",
    size: "wide",
  },
  {
    id: "local-seo",
    category: "SEO & Local",
    title: "Search & Local Presence",
    description: "SEO creatives focused on rankings, visibility and local search.",
    image: "/searchandlocalpresence.jpeg",
    alt: "SEO services creative showing search rankings and organic traffic growth",
    size: "regular",
  },
];
