"use client";
import { useState, useEffect, useRef } from "react";
import { DestinationCard } from "@/components/ui/destination-card";
import { apiFetch } from "@/lib/api";
import { Search, X, Filter, Check } from "lucide-react";

type Destination = {
  _id: string;
  name: string;
  country?: string;
  description: string;
  price: number;
  imageUrl: string;
  duration: string;
};

const ALL_CATEGORY = "all";

export function DestinationGrid() {
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
  const [searchTerm, setSearchTerm] = useState("");
  const [destinationsData, setDestinationsData] = useState<Destination[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    apiFetch("/api/destinations")
      .then(res => res.json())
      .then((data: Destination[]) => {
        setDestinationsData(data);

        // Limpiar y deduplicar países
  const allCountries = data
    .map((dest: any) => dest.country?.trim())
    .filter((c: string | undefined): c is string => !!c && c.length > 0);

  const uniqueCountries = Array.from(new Set(allCountries));
  setCategories([
    { id: ALL_CATEGORY, name: "Todos los Destinos" },
    ...uniqueCountries.map((country: string) => ({
      id: country.toLowerCase().replace(/\s+/g, "-"),
      name: country,
    })),
  ]);
})
      .catch(err => {
        setError("No se pudieron cargar los destinos.");
        console.error("Error cargando destinos:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Cerrar dropdown cuando se hace click afuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }

    if (isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isFilterOpen]);

  const filteredDestinations = destinationsData.filter(dest => {
    // Filtro por categoría
    const matchCategory =
      selectedCategory === ALL_CATEGORY ||
      (dest.country &&
        dest.country.toLowerCase().replace(/\s+/g, "-") === selectedCategory);

    // Filtro por búsqueda (nombre o país)
    const matchSearch =
      searchTerm === "" ||
      dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (dest.country && dest.country.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchCategory && matchSearch;
  });

  return (
    <div>
      {/* Barra de Búsqueda y Filtro */}
      <div className="mb-8">
        <div className="flex gap-3 max-w-3xl mx-auto">
          {/* Input de Búsqueda */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Busca destinos por nombre o país..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-lg border-2 border-gray-300 focus:border-gold-500 focus:outline-none text-gray-900 placeholder-gray-500 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>

          {/* Botón de Filtro */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-black font-semibold rounded-lg transition-colors flex items-center gap-2 shadow"
            >
              <Filter className="w-5 h-5" />
              <span>Filtro</span>
            </button>

            {/* Dropdown de Filtros */}
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border-2 border-gold-500 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Destinos</h3>
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setIsFilterOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-gold-100 transition-colors mb-2 flex items-center justify-between text-gray-900"
                    >
                      <span>{category.name}</span>
                      {selectedCategory === category.id && (
                        <Check className="w-5 h-5 text-gold-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading/error/empty */}
      {loading ? (
        <div className="text-center py-20 text-xl text-gray-500">Cargando destinos...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : filteredDestinations.length === 0 ? (
        <div className="text-center py-16 text-gray-500">No hay destinos en esta categoría todavía.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredDestinations.map(destination => (
            <DestinationCard
              key={destination._id}
              id={destination._id}
              name={destination.name}
              country={destination.country || "Sin país"}
              description={destination.description}
              price={destination.price}
              image={destination.imageUrl}
              duration={destination.duration}
            />
          ))}
        </div>
      )}
    </div>
  );
}
