'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { apiFetch } from "@/lib/api";

// Define el tipo:
interface Destino {
  _id: string;
  name: string;
  country: string;
  imageUrl?: string;
  price: number;
}

export function HomeDestinationsGrid() {
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch("/api/destinations")
      .then(res => res.json())
      .then(data => setDestinos(data.slice(0, 3)))
      .catch(() => setError("No se pudieron cargar los destinos."));
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!destinos.length) return <div className="text-gray-500">Cargando destinos...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {destinos.map((dest) => (
        <div key={dest._id} className="group overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            {dest.imageUrl ?
              <Image src={dest.imageUrl} alt={dest.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" /> :
              <div className="bg-gray-200 w-full h-full flex items-center justify-center">Sin imagen</div>
            }
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
          <div className="p-6 bg-white">
            <h3 className="text-xl font-bold mb-2 text-gray-900">{dest.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{dest.country}</p>
            <p className="text-gold-600 font-bold text-lg">Desde ${dest.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
