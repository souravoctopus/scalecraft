"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import EngineFallback from "@/components/EngineFallback";

// Three.js only loads on capable devices, after the page is interactive.
const GrowthEngine = dynamic(() => import("@/components/GrowthEngine"), { ssr: false });

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function HeroVisual() {
  const wrapRef = useRef(null);
  const [use3D, setUse3D] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower = navigator.connection?.saveData === true;
    if (!desktop || reduce || lowPower || !supportsWebGL()) return;

    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 600));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const id = idle(() => setUse3D(true), { timeout: 2000 });
    return () => cancel(id);
  }, []);

  // Pause rendering when the hero is off-screen.
  useEffect(() => {
    if (!use3D || !wrapRef.current) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, [use3D]);

  return (
    <div ref={wrapRef} className="relative aspect-square w-full">
      <EngineFallback
        className={`absolute inset-0 size-full transition-opacity duration-1000 ${ready ? "opacity-0" : "opacity-100"}`}
      />
      {use3D && (
        <div className={`absolute -inset-[12%] transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
          <GrowthEngine active={visible} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
