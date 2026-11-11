"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X, Heart, SlidersHorizontal, MessageCircle } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { type Destino, type Region, REGIONS, regionOf, cleanCountry, whatsappLink } from "@/lib/destinations";
import { DestinationCard } from "@/components/ui/destination-card";
import { Reveal } from "@/components/reveal";
import { useFavorites } from "@/hooks/use-favorites";
import { Maleti } from "@/components/mascot/maleti";
import { cn } from "@/lib/utils";

type Filter = Region | "Todos" | "Favoritos";
type Sort = "recomendados" | "precio-asc" | "precio-desc" | "duracion";

const BUDGETS = [
  { label: "Cualquier precio", value: "" },
  { label: "Hasta $1.000", value: "1000" },
  { label: "Hasta $2.500", value: "2500" },
  { label: "Hasta $5.000", value: "5000" },
  { label: "Más de $5.000", value: "5000+" },
];

const days = (d: Destino) => {
  const m = (d.duration ?? "").match(/(\d+)/);
  return m ? Number(m[1]) : 99;
};

const plain = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export function DestinationGrid() {
  const params = useSearchParams();
  const [data, setData] = useState<Destino[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<Filter>("Todos");
  const [budget, setBudget] = useState("");
  const [sort, setSort] = useState<Sort>("recomendados");
  const [term, setTerm] = useState("");
  const [showMore, setShowMore] = useState(false);
  const { favs } = useFavorites();

  // Filtros que llegan desde el buscador del inicio
  useEffect(() => {
    const r = params.get("region");
    if (r && (REGIONS as string[]).includes(r)) setFilter(r as Region);
    const b = params.get("budget");
    if (b) setBudget(b);
    if (params.get("fav") === "1") setFilter("Favoritos");
  }, [params]);

  useEffect(() => {
    apiFetch("/api/destinations")
      .then((r) => r.json())
      .then((d: Destino[]) => setData(d))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const regions = useMemo(() => REGIONS.filter((r) => data.some((d) => regionOf(d) === r)), [data]);

  const list = useMemo(() => {
    const q = plain(term.trim());
    const out = data.filter((d) => {
      if (filter === "Favoritos" && !favs.includes(d._id)) return false;
      if (filter !== "Todos" && filter !== "Favoritos" && regionOf(d) !== filter) return false;
      if (budget === "5000+" && d.price <= 5000) return false;
      if (budget && budget !== "5000+" && d.price > Number(budget)) return false;
      if (q && !plain(`${d.name} ${cleanCountry(d.country)} ${d.description ?? ""}`).includes(q)) return false;
      return true;
    });
    const sorted = [...out];
    if (sort === "precio-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "precio-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "duracion") sorted.sort((a, b) => days(a) - days(b));
    else sorted.sort((a, b) => (a.displayOrder ?? 9999) - (b.displayOrder ?? 9999));
    return sorted;
  }, [data, filter, budget, sort, term, favs]);

  const chip = (active: boolean) =>
    cn(
      "flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm font-bold transition-all duration-300 lg:min-h-[44px] lg:px-5",
      active ? "border-ink bg-ink text-white" : "border-stone-300 bg-white text-ink hover:border-ink"
    );

  const clear = () => {
    setFilter("Todos");
    setBudget("");
    setTerm("");
    setSort("recomendados");
  };

  return (
    <div>
      {/* Barra de búsqueda y filtros: fija solo en escritorio, compacta en móvil */}
      <div className="z-30 -mx-4 mb-8 border-b border-stone-200/70 bg-cream/95 px-4 py-4 backdrop-blur-md lg:sticky lg:top-20 lg:mb-10">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex gap-2 lg:flex-1">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
              <input
                type="search"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Destino o país…"
                aria-label="Buscar paquetes"
                className="h-12 w-full rounded-full border border-stone-300 bg-white pl-12 pr-11 text-ink outline-none transition focus:border-ink focus:ring-2 focus:ring-gold-300"
              />
              {term && (
                <button onClick={() => setTerm("")} aria-label="Borrar búsqueda" className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full hover:bg-stone-100">
                  <X size={18} />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowMore((v) => !v)}
              aria-expanded={showMore}
              aria-controls="filtros-extra"
              className={cn(
                "relative flex h-12 shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm font-bold transition lg:hidden",
                showMore ? "border-ink bg-ink text-white" : "border-stone-300 bg-white text-ink"
              )}
            >
              <SlidersHorizontal size={16} /> Filtros
              {(budget || sort !== "recomendados") && <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-cream bg-gold-500" />}
            </button>
          </div>
          <div id="filtros-extra" className={cn("gap-2", showMore ? "flex" : "hidden lg:flex")}>
            <label className="flex h-12 flex-1 items-center gap-2 rounded-full border border-stone-300 bg-white px-4 lg:flex-none">
              <SlidersHorizontal size={16} className="hidden text-stone-500 lg:block" />
              <span className="sr-only">Presupuesto</span>
              <select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full cursor-pointer bg-transparent text-sm font-semibold outline-none">
                {BUDGETS.map((b) => (
                  <option key={b.label} value={b.value}>{b.label}</option>
                ))}
              </select>
            </label>
            <label className="flex h-12 flex-1 items-center rounded-full border border-stone-300 bg-white px-4 lg:flex-none">
              <span className="sr-only">Ordenar por</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="w-full cursor-pointer bg-transparent text-sm font-semibold outline-none">
                <option value="recomendados">Recomendados</option>
                <option value="precio-asc">Menor precio</option>
                <option value="precio-desc">Mayor precio</option>
                <option value="duracion">Más cortos</option>
              </select>
            </label>
          </div>
        </div>

        <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]" role="group" aria-label="Filtrar por región">
          {(["Todos", ...regions] as Filter[]).map((r) => (
            <button key={r} type="button" onClick={() => setFilter(r)} aria-pressed={filter === r} className={chip(filter === r)}>
              {r}
            </button>
          ))}
          <button type="button" onClick={() => setFilter("Favoritos")} aria-pressed={filter === "Favoritos"} className={chip(filter === "Favoritos")}>
            <Heart size={15} className={cn(filter === "Favoritos" ? "fill-red-500 text-red-500" : "text-red-500")} />
            Favoritos{favs.length > 0 && ` (${favs.length})`}
          </button>
        </div>
      </div>

      {!loading && !error && (
        <p className="mb-6 text-sm font-semibold text-stone-500" aria-live="polite">
          {list.length} {list.length === 1 ? "paquete encontrado" : "paquetes encontrados"}
        </p>
      )}

      {error ? (
        <p className="rounded-3xl bg-white p-10 text-center text-stone-600">No pudimos cargar los paquetes. Intenta de nuevo en unos minutos.</p>
      ) : loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-3xl bg-white">
              <div className="aspect-[5/4] animate-pulse bg-stone-200" />
              <div className="space-y-3 p-5">
                <div className="h-4 w-1/3 animate-pulse rounded bg-stone-200" />
                <div className="h-7 w-2/3 animate-pulse rounded bg-stone-200" />
              </div>
            </div>
          ))}
        </div>
      ) : list.length === 0 ? (
        <div className="rounded-3xl bg-white p-10 text-center md:p-16">
          <Maleti size={110} mood={filter === "Favoritos" ? "love" : "think"} className="mx-auto mb-4" />
          <p className="mb-2 font-display text-3xl text-ink">
            {filter === "Favoritos" ? "Aún no tienes favoritos" : "No encontramos ese viaje… todavía"}
          </p>
          <p className="mx-auto mb-8 max-w-md text-stone-600">
            {filter === "Favoritos"
              ? "Toca el corazón de cualquier paquete para guardarlo aquí."
              : "Cuéntanos a dónde quieres ir y armamos un paquete a tu medida."}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={clear} className="btn-pill border-2 border-ink text-ink hover:bg-ink hover:text-white">Ver todos los paquetes</button>
            <a
              href={whatsappLink(`¡Hola! Busco un viaje${term ? ` a ${term}` : ""}. ¿Me pueden armar un paquete?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill bg-[#25D366] text-[#0B2E17]"
            >
              <MessageCircle size={18} /> Pedir paquete a medida
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((d, i) => (
            <Reveal key={d._id} delay={(i % 4) * 90} className="h-full">
              <DestinationCard destination={d} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
