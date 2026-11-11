"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { cn } from "@/lib/utils";

export function TestimonialCarousel() {
  const items = siteConfig.testimonials;
  const [visible, setVisible] = useState(1);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const calc = () => setVisible(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const pages = Math.max(1, items.length - visible + 1);
  const safe = Math.min(index, pages - 1);

  useEffect(() => {
    if (paused || pages <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % pages), 6000);
    return () => clearInterval(id);
  }, [paused, pages]);

  const go = (d: number) => setIndex((i) => (Math.min(i, pages - 1) + d + pages) % pages);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="-mx-3 overflow-hidden px-0 py-4">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${(safe * 100) / visible}%)` }}
        >
          {items.map((t) => (
            <div key={t.id} className="shrink-0 px-3" style={{ width: `${100 / visible}%` }}>
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Ir al grupo ${i + 1}`}
              className={cn("h-2.5 rounded-full transition-all duration-500", i === safe ? "w-10 bg-ink" : "w-2.5 bg-stone-300 hover:bg-stone-400")}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => go(-1)}
            aria-label="Anterior"
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink text-ink transition hover:bg-ink hover:text-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Siguiente"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white transition hover:bg-gold-500 hover:text-ink"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
