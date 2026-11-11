"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { money, whatsappLink } from "@/lib/destinations";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const TERMS = [3, 6, 12, 24];

export function FinancingSection() {
  const [price, setPrice] = useState(1500);
  const [months, setMonths] = useState(12);
  const cuota = price / months;
  const pct = ((price - 500) / (10000 - 500)) * 100;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <Reveal>
        <p className="eyebrow mb-3">Viaja ahora, paga después</p>
        <h2 className="mb-5 font-display text-4xl leading-[1.05] text-ink md:text-5xl">
          Calcula tu cuota <em className="italic text-gold-700">en segundos.</em>
        </h2>
        <p className="mb-8 max-w-lg text-lg leading-relaxed text-stone-600">
          Mueve el valor de tu viaje y elige el plazo, de 3 hasta 24 meses. Trabajamos con los
          principales bancos del país para que tus vacaciones no esperen.
        </p>
        <div className="mb-8 grid max-w-lg grid-cols-2 gap-3">
          {siteConfig.banks.map((b) => (
            <div
              key={b.name}
              className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-md"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.logo} alt="" aria-hidden="true" className="h-9 w-9 shrink-0 object-contain" loading="lazy" />
              <span className="text-sm font-bold text-ink">{b.name}</span>
            </div>
          ))}
        </div>
        <Link href="/financing" className="group inline-flex items-center gap-2 font-bold text-ink underline-offset-4 hover:underline">
          Cómo funciona el financiamiento
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>

      <Reveal delay={150}>
        <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_40px_80px_-40px_rgba(14,14,12,.4)] sm:p-9">
          <label htmlFor="valor-viaje" className="flex items-baseline justify-between gap-4 font-bold text-stone-600">
            Valor del viaje
            <span className="text-3xl font-extrabold text-ink">{money(price)}</span>
          </label>
          <input
            id="valor-viaje"
            type="range"
            min={500}
            max={10000}
            step={50}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="range-gold mt-5 w-full"
            style={{ background: `linear-gradient(90deg, #D4AF37 ${pct}%, #E7E1D3 ${pct}%)` }}
          />
          <div className="mt-2 flex justify-between text-xs text-stone-500">
            <span>$500</span>
            <span>$10.000</span>
          </div>

          <p className="mb-3 mt-7 font-bold text-stone-600">Plazo</p>
          <div className="grid grid-cols-4 gap-2" role="group" aria-label="Plazo en meses">
            {TERMS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMonths(m)}
                aria-pressed={months === m}
                className={cn(
                  "min-h-[48px] rounded-xl border text-sm font-bold transition-all duration-300",
                  months === m ? "border-ink bg-ink text-white" : "border-stone-300 text-ink hover:border-ink"
                )}
              >
                {m} meses
              </button>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-ink p-6 text-white">
            <div>
              <p className="text-sm text-white/60">Tu cuota mensual referencial</p>
              <p key={`${price}-${months}`} className="animate-fade-up font-display text-5xl text-gold-300 [animation-duration:.4s]">
                {money(cuota)}
              </p>
            </div>
            <a
              href={whatsappLink(
                `¡Hola! Quiero financiar un viaje de ${money(price)} a ${months} meses (cuota aprox. ${money(cuota)}). ¿Me ayudan?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill bg-gold-500 text-ink hover:bg-gold-400"
            >
              <MessageCircle size={18} /> Quiero este plan
            </a>
          </div>
          <p className="mt-4 text-xs text-stone-500">
            Valor referencial sin intereses. La cuota final depende del banco y está sujeta a aprobación crediticia.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
