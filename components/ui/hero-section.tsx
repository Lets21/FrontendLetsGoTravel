"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Volume2, VolumeX } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { REGIONS } from "@/lib/destinations";
import { cn } from "@/lib/utils";

const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1920`;

// Se usan solo si no hay video cargado desde el panel de admin
const SLIDES = [
  { image: px(1450353), label: "Caribe" },
  { image: px(460672), label: "Europa" },
  { image: px(2739664), label: "Amazonía" },
];

const BUDGETS = [
  { label: "Cualquier presupuesto", value: "" },
  { label: "Hasta $1.000", value: "1000" },
  { label: "Hasta $2.500", value: "2500" },
  { label: "Hasta $5.000", value: "5000" },
  { label: "Más de $5.000", value: "5000+" },
];

const TRUST = [
  { big: "5", small: "continentes con paquetes armados" },
  { big: "24 meses", small: "plazo máximo para pagar tu viaje" },
  { big: "4 bancos", small: "aliados en Ecuador" },
  { big: "24/7", small: "asistencia durante tu viaje" },
];

export function HeroSection() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [muted, setMuted] = useState(true);
  const [region, setRegion] = useState("");
  const [budget, setBudget] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoUrl) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 7000);
    return () => clearInterval(id);
  }, [videoUrl]);

  useEffect(() => {
    apiFetch("/api/hero")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.videoUrl && setVideoUrl(d.videoUrl))
      .catch(() => {});
  }, []);

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    const q = new URLSearchParams();
    if (region) q.set("region", region);
    if (budget) q.set("budget", budget);
    router.push(`/destinations${q.toString() ? `?${q}` : ""}#paquetes`);
  };

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white">
      {/* Fondo */}
      {videoUrl ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={videoUrl}
          autoPlay
          muted={muted}
          loop
          playsInline
        />
      ) : (
        SLIDES.map((s, i) => (
          <div
            key={s.image}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1500ms]",
              i === current ? "opacity-100" : "opacity-0"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.image}
              alt=""
              aria-hidden="true"
              className="h-full w-full animate-ken-burns object-cover"
              fetchPriority={i === 0 ? "high" : "low"}
            />
          </div>
        ))
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/10 to-ink/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />

      {/* Contenido */}
      <div className="container relative z-10 mx-auto flex flex-1 flex-col justify-end px-4 pb-10 pt-32 md:pb-14">
        <p className="mb-5 inline-flex w-fit animate-fade-up items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#25D366]" />
          </span>
          Asesores en línea · respuesta en minutos
        </p>

        <h1 className="max-w-4xl animate-fade-up font-display text-5xl leading-[1.02] tracking-tight [animation-delay:150ms] sm:text-6xl md:text-7xl lg:text-8xl">
          El mundo te espera.{" "}
          <em className="block italic text-gold-300">Nosotros lo organizamos.</em>
        </h1>

        <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-white/85 [animation-delay:300ms] md:text-xl">
          Paquetes a tu medida con vuelos, hotel, visas, seguro y traslados. Viaja ahora y paga en
          cuotas con tu banco.
        </p>

        {/* Buscador */}
        <form
          onSubmit={search}
          className="mt-10 grid max-w-4xl animate-fade-up gap-2 rounded-3xl bg-white/95 p-2.5 text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,.7)] backdrop-blur [animation-delay:450ms] sm:grid-cols-[1fr_1fr_auto]"
        >
          <label className="flex flex-col rounded-2xl px-4 py-2.5 transition-colors hover:bg-stone-100">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-stone-500">¿A dónde?</span>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="cursor-pointer bg-transparent py-1 text-base font-semibold outline-none"
            >
              <option value="">Todos los destinos</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col rounded-2xl px-4 py-2.5 transition-colors hover:bg-stone-100">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-stone-500">Presupuesto por persona</span>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="cursor-pointer bg-transparent py-1 text-base font-semibold outline-none"
            >
              {BUDGETS.map((b) => (
                <option key={b.label} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="flex min-h-[56px] items-center justify-center gap-2 rounded-2xl bg-ink px-8 font-bold text-white transition-all hover:bg-gold-500 hover:text-ink"
          >
            <Search size={18} /> Buscar viajes
          </button>
        </form>
      </div>

      {/* Barra de confianza */}
      <div className="relative z-10 border-t border-white/15 bg-ink/40 backdrop-blur-sm">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-6 md:grid-cols-4">
          {TRUST.map((t, i) => (
            <div key={t.big} className="animate-fade-up" style={{ animationDelay: `${600 + i * 100}ms` }}>
              <p className="font-display text-3xl text-gold-300 md:text-4xl">{t.big}</p>
              <p className="text-sm text-white/75">{t.small}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Controles */}
      {videoUrl ? (
        <button
          onClick={() => setMuted((m) => !m)}
          className="absolute right-5 top-28 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/40 backdrop-blur transition hover:bg-black/60"
          aria-label={muted ? "Activar sonido" : "Silenciar"}
        >
          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      ) : (
        <div className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 md:flex">
          {SLIDES.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setCurrent(i)}
              aria-label={`Ver imagen: ${s.label}`}
              className={cn(
                "h-10 w-1.5 rounded-full transition-all duration-500",
                i === current ? "bg-gold-400" : "bg-white/40 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      )}

    </section>
  );
}
