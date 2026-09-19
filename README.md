# SKD Scale Craft Media — Website

Static marketing website for SKD Scale Craft Media, built with Next.js (App Router), Tailwind CSS v4, GSAP and React Three Fiber.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (the page is prerendered as static HTML)
npm start       # serve the production build
```

Optional settings live in `.env.local` — copy `.env.example` and fill in what you need
(site URL, contact form endpoint, custom map embed, social profile URLs).

## Updating content

| What | Where |
| --- | --- |
| Phone, email, address, WhatsApp, nav links, social URLs | `data/site.js` |
| Services (title, icon, description, tags) | `data/services.js` |
| Portfolio / gallery items | `data/portfolio.js` |
| Testimonials | `data/testimonials.js` |
| Hero keywords, about, features, process steps, metrics | `data/content.js` |

**Portfolio images** — put files in `public/images/portfolio/`, then set `image` and `alt` on the item in
`data/portfolio.js`. Items without an image show a branded "coming soon" placeholder.

**Testimonials** — add real, approved entries to `data/testimonials.js`. While the list is empty, the section
shows a placeholder; with entries it becomes a carousel.

**Metrics** — set `value` (and optional `suffix`, e.g. `"+"` or `"%"`) on items in `data/content.js`.
Values animate as counters; items left as `null` show a "results coming soon" placeholder.

**Contact form** — set `NEXT_PUBLIC_FORM_ENDPOINT` to a form service endpoint (e.g. Formspree) and
submissions are POSTed there as JSON. Without it, the form opens the visitor's email app with the enquiry
pre-filled to `info@skdscalecraftmedia.com`.

**Logo** — `public/logo/skd-badge.png` is the supplied logo cropped to its circular badge. Favicons and the
Open Graph image are in `app/` (`icon.png`, `apple-icon.png`, `opengraph-image.png`).

## Structure

```
app/          layout (metadata, fonts, JSON-LD), page, global styles, icons, OG image
components/   one component per section, plus ui/ helpers
data/         all editable content
lib/gsap.js   GSAP + plugin registration
```

Scroll reveals are declared with data attributes (`data-reveal`, `data-reveal-group`, `data-split`,
`data-parallax`, `data-clip-reveal`) and handled in `components/ScrollAnimations.jsx`, so most sections stay
server components. All motion respects `prefers-reduced-motion`.

The 3D hero (`components/GrowthEngine.jsx`) loads only on screens ≥ 768px with WebGL and motion enabled,
after the page is idle, and pauses when scrolled out of view. Other devices get the SVG version
(`components/EngineFallback.jsx`).
