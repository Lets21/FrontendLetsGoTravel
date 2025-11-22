"use client";
import { useState, useEffect } from "react";
import { DestinationCard } from "@/components/ui/destination-card";
import { apiFetch } from "@/lib/api";

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
  const [destinationsData, setDestinationsData] = useState<Destination[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const filteredDestinations =
    selectedCategory === ALL_CATEGORY
      ? destinationsData
      : destinationsData.filter(
          dest =>
            dest.country &&
            dest.country.toLowerCase().replace(/\s+/g, "-") === selectedCategory
        );

  return (
    <div>
      {/* Filtros */}
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full font-semibold transition-all shadow ${
              selectedCategory === category.id
                ? "bg-gold-500 text-black scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gold-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Loading/error/empty */}
      {loading ? (
        <div className="text-center py-20 text-xl text-gray-500">Cargando destinos...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : filteredDestinations.length === 0 ? (
        <div className="text-center py-16 text-gray-500">No hay destinos en esta categoría todavía.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
