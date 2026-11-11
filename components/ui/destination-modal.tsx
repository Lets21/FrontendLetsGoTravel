"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { X, MapPin, Clock, Check, MessageCircle, Mail, Heart } from "lucide-react";
import {
  type Destino,
  cleanCountry,
  money,
  monthly,
  optimizedImage,
  includesFrom,
  whatsappLink,
  packageMessage,
} from "@/lib/destinations";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";

interface DestinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination?: Destino;
}

export function DestinationModal({ isOpen, onClose, destination: d }: DestinationModalProps) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const { isFav, toggle } = useFavorites();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const raf = requestAnimationFrame(() => setShow(true));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      setShow(false);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen || !d) return null;

  const country = cleanCountry(d.country);
  const includes = includesFrom(d);
  const flyer = optimizedImage(d.imageUrl, 1100);
  const cover = d.coverUrl ? optimizedImage(d.coverUrl, 1400) : null;

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={d.name}
    >
      <div
        className={cn("absolute inset-0 bg-ink/70 backdrop-blur-sm transition-opacity duration-300", show ? "opacity-100" : "opacity-0")}
        onClick={onClose}
      />

      <div
        className={cn(
          "relative grid max-h-[94vh] w-full max-w-5xl overflow-hidden rounded-t-3xl bg-cream shadow-2xl transition-all duration-500 sm:rounded-3xl md:grid-cols-[1fr_1.1fr]",
          show ? "translate-y-0 opacity-100 sm:scale-100" : "translate-y-10 opacity-0 sm:scale-95"
        )}
      >
        {/* Flyer completo */}
        <div className="relative flex max-h-[42vh] items-center justify-center overflow-hidden bg-ink md:max-h-none">
          {flyer && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cover || flyer} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={flyer} alt={`Flyer del paquete ${d.name}`} className="relative max-h-[42vh] w-auto object-contain md:max-h-[94vh]" />
            </>
          )}
        </div>

        {/* Información */}
        <div className="flex max-h-[52vh] flex-col overflow-hidden md:max-h-[94vh]">
          <div className="flex-1 overflow-y-auto p-6 sm:p-8">
            <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-stone-500">
              <MapPin size={15} className="text-gold-600" /> {country}
            </p>
            <h2 className="mb-5 pr-10 font-display text-4xl leading-tight text-ink">{d.name}</h2>

            <div className="mb-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-ink p-4 text-white">
                <p className="text-xs text-white/60">Desde, por persona</p>
                <p className="font-display text-3xl text-gold-300">{money(d.price)}</p>
                <p className="text-xs font-semibold text-white/70">o {monthly(d.price)}/mes en 12 cuotas*</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4">
                <p className="flex items-center gap-1 text-xs text-stone-500">
                  <Clock size={13} /> Duración
                </p>
                <p className="mt-1 text-lg font-bold leading-tight text-ink">{d.duration || "A consultar"}</p>
              </div>
            </div>

            {includes.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-extrabold uppercase tracking-widest text-stone-500">Incluye</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {includes.map((inc) => (
                    <li key={inc} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-sm font-semibold text-ink">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                        <Check size={14} />
                      </span>
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {d.description && (
              <div>
                <h3 className="mb-2 text-sm font-extrabold uppercase tracking-widest text-stone-500">El viaje</h3>
                <p className="leading-relaxed text-stone-700">{d.description}</p>
              </div>
            )}
            <p className="mt-6 text-xs text-stone-500">
              *Cuota referencial sin intereses. Sujeto a aprobación de crédito y disponibilidad.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-stone-200 bg-white p-4 sm:p-5">
            <a
              href={whatsappLink(packageMessage(d))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill flex-1 bg-[#25D366] text-[#0B2E17] hover:bg-[#20bd5a]"
            >
              <MessageCircle size={18} /> Cotizar por WhatsApp
            </a>
            <Link
              href={`/contact?destination=${encodeURIComponent(d.name)}`}
              onClick={onClose}
              className="btn-pill border border-ink text-ink hover:bg-ink hover:text-white"
            >
              <Mail size={18} /> Formulario
            </Link>
            <button
              type="button"
              onClick={() => toggle(d._id)}
              aria-pressed={isFav(d._id)}
              aria-label={isFav(d._id) ? "Quitar de favoritos" : "Guardar en favoritos"}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-stone-300 transition hover:border-red-400"
            >
              <Heart size={20} className={cn(isFav(d._id) && "fill-red-500 text-red-500")} />
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg transition hover:rotate-90 hover:bg-white"
        >
          <X size={22} />
        </button>
      </div>
    </div>,
    document.body
  );
}
