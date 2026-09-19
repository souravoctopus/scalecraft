import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { portfolio } from "@/data/portfolio";

const sizeClasses = {
  tall: "sm:row-span-2",
  wide: "lg:col-span-2",
  regular: "",
};

function Placeholder({ item, index }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-navy-950">
      <div className="absolute inset-0 bg-grid-dark opacity-70" />
      <div
        className="absolute size-[140%] rounded-full border border-silver-300/10"
        style={{ left: index % 2 ? "-60%" : "20%", top: "30%" }}
      />
      <div
        className="absolute size-[90%] rounded-full border border-dashed border-crimson-400/25"
        style={{ left: index % 2 ? "-25%" : "45%", top: "45%" }}
      />
      <div className="absolute left-6 top-6 flex items-center gap-2 text-xs text-muted-dark sm:left-7 sm:top-7">
        <ImagePlus className="size-4" aria-hidden="true" />
        Project image coming soon
      </div>
      <span className="sr-only">Placeholder for {item.title}</span>
    </div>
  );
}

function PortfolioCard({ item, index }) {
  return (
    <li
      data-clip-reveal
      className={`group relative min-h-[20rem] overflow-hidden rounded-[1.75rem] ${sizeClasses[item.size] || ""}`}
    >
      <article className="h-full">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.alt || item.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1.2s] ease-premium group-hover:scale-105"
          />
        ) : (
          <Placeholder item={item} index={index} />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-navy-950/95 via-navy-950/30 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
          <span className="inline-block rounded-full bg-crimson-600 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider">
            {item.category}
          </span>
          <h3 className="mt-4 font-display text-xl font-semibold sm:text-2xl">{item.title}</h3>
          <span className="mt-3 block h-px w-10 bg-crimson-400 transition-[width] duration-700 ease-premium group-hover:w-24" />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-silver-300 transition-all duration-500 ease-premium sm:max-h-0 sm:translate-y-2 sm:opacity-0 sm:group-hover:max-h-24 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
            {item.description}
          </p>
        </div>
      </article>
    </li>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="relative bg-white py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p data-reveal className="eyebrow text-crimson-600">
              (05) Portfolio
            </p>
            <h2
              id="portfolio-title"
              data-split
              className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-navy-950 sm:text-5xl lg:text-6xl"
            >
              Selected Work
            </h2>
          </div>
          <p data-reveal className="max-w-md text-lg leading-relaxed text-muted">
            A growing showcase of campaigns, creatives and brand work. New projects are being added.
          </p>
        </div>

        <ul className="mt-14 grid auto-rows-[20rem] gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {portfolio.map((item, i) => (
            <PortfolioCard key={item.id} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
