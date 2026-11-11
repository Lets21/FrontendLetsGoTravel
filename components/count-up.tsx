"use client";

import { useEffect, useRef, useState } from "react";

/** Anima el número inicial de un texto ("24 meses") desde 0 cuando entra en pantalla. */
export function CountUp({ value, duration = 1600, delay = 0 }: { value: string; duration?: number; delay?: number }) {
  const m = value.match(/^(\d+)(.*)$/);
  const target = m ? Number(m[1]) : 0;
  const rest = m ? m[2] : "";
  const isPlain = !m || /^\/\d/.test(rest); // p. ej. "24/7" se deja tal cual
  const [n, setN] = useState(isPlain ? target : 0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isPlain) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let start = 0;
    const run = () => {
      const step = (t: number) => {
        if (!start) start = t;
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(eased * target));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(run, delay);
        io.disconnect();
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [isPlain, target, duration, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      {isPlain ? value : `${n}${rest}`}
    </span>
  );
}
