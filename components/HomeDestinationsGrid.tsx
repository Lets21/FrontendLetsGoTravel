"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { type Destino, type Region, REGIONS, regionOf } from "@/lib/destinations";
import { DestinationCard } from "@/components/ui/destination-card";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const MAX = 6;

export function HomeDestinationsGrid() {
  const [all, setAll] = useState<Destino[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [region, setRegion] = useState<Region | "Todos">("Todos");

  useEffect(() => {
    apiFetch("/api/destinations")
      .then((r) => r.json())
      .then((data: Destino[]) =>
        setAll(
          [...data].sort((a, b) => (a.displayOrder ?? 9999) - (b.displayOrder ?? 9999))
        )
      )
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const regions = useMemo(
    () => REGIONS.filter((r) => all.some((d) => regionOf(d) === r)),
    [all]
  );
  const shown = all.filter((d) => region === "Todos" || regionOf(d) === region).slice(0, MAX);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filtrar por región">
        {(["Todos", ...regions] as const).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRegion(r)}
            aria-pressed={region === r}
            className={cn(
              "min-h-[44px] rounded-full border px-5 text-sm font-bold transition-all duration-300",
              region === r
                ? "border-ink bg-ink text-white"
                : "border-stone-300 bg-white text-ink hover:border-ink"
            )}
          >
            {r}
          </button>
        ))}
      </div>

      {error ? (
        <p className="rounded-2xl bg-white p-8 text-center text-stone-600">
          No pudimos cargar los paquetes en este momento.{" "}
          <Link href="/contact" className="font-bold underline">Escríbenos</Link> y te enviamos las opciones.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-3xl bg-white">
                  <div className="aspect-[5/4] animate-pulse bg-stone-200" />
                  <div className="space-y-3 p-5">
                    <div className="h-4 w-1/3 animate-pulse rounded bg-stone-200" />
                    <div className="h-7 w-2/3 animate-pulse rounded bg-stone-200" />
                    <div className="h-10 w-1/2 animate-pulse rounded bg-stone-200" />
                  </div>
                </div>
              ))
            : shown.map((d, i) => (
                <Reveal key={`${region}-${d._id}`} delay={(i % 3) * 120} className="h-full">
                  <DestinationCard destination={d} />
                </Reveal>
              ))}
        </div>
      )}

      {!loading && !error && (
        <div className="mt-12 flex justify-center">
          <Link
            href={region === "Todos" ? "/destinations" : `/destinations?region=${encodeURIComponent(region)}`}
            className="btn-pill group border-2 border-ink px-8 text-ink hover:bg-ink hover:text-white"
          >
            Ver los {region === "Todos" ? all.length : all.filter((d) => regionOf(d) === region).length} paquetes
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </div>
  );
}
