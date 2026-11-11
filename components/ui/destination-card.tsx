"use client";

import { useState } from "react";
import { Heart, MapPin, ArrowRight, MessageCircle, Check } from "lucide-react";
import {
  type Destino,
  cleanCountry,
  shortDuration,
  money,
  monthly,
  optimizedImage,
  includesFrom,
  whatsappLink,
  packageMessage,
} from "@/lib/destinations";
import { useFavorites } from "@/hooks/use-favorites";
import { DestinationModal } from "./destination-modal";
import { cn } from "@/lib/utils";

const FALLBACK =
  "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=900";

const BURST: [number, number][] = [
  [0, -34], [26, -22], [32, 6], [18, 28], [-18, 28], [-32, 6], [-26, -22],
];

interface DestinationCardProps {
  destination: Destino;
}

export function DestinationCard({ destination: d }: DestinationCardProps) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [burst, setBurst] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const { isFav, toggle } = useFavorites();
  const fav = isFav(d._id);
  const country = cleanCountry(d.country);
  const hasCover = !!d.coverUrl;
  const img = optimizedImage(d.coverUrl || d.imageUrl, 700) || FALLBACK;
  const includes = includesFrom(d).slice(0, 4);

  return (
    <>
      <article
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -6, y: ((e.clientX - r.left) / r.width - 0.5) * 8 });
        }}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
        className="tilt group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_10px_30px_-18px_rgba(14,14,12,.35)] transition-shadow duration-500 hover:shadow-[0_35px_60px_-25px_rgba(14,14,12,.45)]"
      >
        {/* Imagen / flyer */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn("relative block w-full overflow-hidden bg-stone-200 text-left", hasCover ? "aspect-[4/5]" : "aspect-[5/4]")}
          aria-label={`Ver detalles de ${d.name}`}
        >
          {!loaded && <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-stone-200 to-stone-300" />}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img}
            alt={`${d.name}${country ? `, ${country}` : ""}`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={cn(
              "h-full w-full object-cover transition-all duration-1000 ease-out group-hover:scale-[1.06]",
              !hasCover && "object-top",
              loaded ? "opacity-100" : "opacity-0"
            )}
          />
          {/* Brillo al pasar el mouse */}
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          {hasCover && (
            <>
              <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0" />
              <span className="absolute inset-x-5 bottom-5 text-white">
                <span className="block text-sm font-semibold opacity-90">{country}</span>
                <span className="block font-display text-3xl leading-tight">{d.name}</span>
              </span>
            </>
          )}
          <span className="absolute bottom-4 right-4 flex translate-y-3 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold text-ink opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            Ver detalles <ArrowRight size={15} />
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (!fav) setBurst((b) => b + 1);
            toggle(d._id);
          }}
          aria-pressed={fav}
          aria-label={fav ? "Quitar de favoritos" : "Guardar en favoritos"}
          className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-transform duration-300 hover:scale-110 active:scale-90"
        >
          <Heart size={20} className={cn("transition-all duration-300", fav && "scale-110 fill-red-500 text-red-500")} />
          {burst > 0 && (
            <span key={burst} className="heart-burst pointer-events-none absolute inset-0" aria-hidden="true">
              {BURST.map(([tx, ty], i) => (
                <span key={i} style={{ ["--tx" as string]: `${tx}px`, ["--ty" as string]: `${ty}px` }}>
                  <Heart size={12} className="fill-red-500 text-red-500" />
                </span>
              ))}
            </span>
          )}
        </button>

        {/* Contenido */}
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-stone-500">
            <MapPin size={14} className="text-gold-600" />
            <span className="truncate">{country || "Destino internacional"}</span>
            {d.duration && (
              <span className="ml-auto shrink-0 rounded-full bg-sand px-2.5 py-0.5 text-xs font-bold text-ink">
                {shortDuration(d.duration)}
              </span>
            )}
          </div>
          <h3 className="mb-3 line-clamp-2 font-display text-2xl leading-tight text-ink">{d.name}</h3>

          {includes.length > 0 && (
            <ul className="mb-4 flex flex-wrap gap-1.5">
              {includes.map((inc) => (
                <li key={inc} className="flex items-center gap-1 rounded-full border border-stone-200 px-2.5 py-1 text-xs font-semibold text-stone-600">
                  <Check size={12} className="text-gold-600" /> {inc}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto flex items-end justify-between gap-3 border-t border-stone-100 pt-4">
            <div>
              <p className="text-xs text-stone-500">Desde</p>
              <p className="text-2xl font-extrabold text-ink">{money(d.price)}</p>
              <p className="text-xs font-bold text-gold-800">o {monthly(d.price)}/mes · 12 cuotas</p>
            </div>
            <a
              href={whatsappLink(packageMessage(d))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Cotizar ${d.name} por WhatsApp`}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-all duration-300 hover:scale-105 hover:bg-[#25D366] hover:text-[#0B2E17]"
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
      </article>

      <DestinationModal isOpen={open} onClose={() => setOpen(false)} destination={d} />
    </>
  );
}
