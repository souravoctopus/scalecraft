import Image from "next/image";
import badge from "@/public/logo/skd-badge.png";

/** The supplied SKD badge (cropped to its circle, otherwise unaltered) plus the company name. */
export default function Logo({ tone = "light", compact = false, priority = false, className = "" }) {
  const size = compact ? 40 : 46;
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src={badge}
        alt="SKD Scale Craft Media logo"
        width={size}
        height={size}
        sizes={`${size}px`}
        preload={priority}
        className="shrink-0 rounded-full shadow-[0_6px_18px_-6px_rgb(7_26_43/0.5)] transition-[width,height] duration-500"
        style={{ width: size, height: size }}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[0.95rem] font-bold tracking-[0.02em] ${
            tone === "light" ? "text-white" : "text-navy-950"
          }`}
        >
          SKD SCALE CRAFT
        </span>
        <span
          className={`mt-1 text-[0.62rem] font-semibold tracking-[0.34em] ${
            tone === "light" ? "text-silver-300" : "text-crimson-600"
          }`}
        >
          MEDIA
        </span>
      </span>
    </span>
  );
}
