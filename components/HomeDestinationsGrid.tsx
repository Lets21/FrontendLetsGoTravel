'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

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
    fetch("https://backendletsgotravel.onrender.com/api/destinations")
      .then(res => res.json())
      .then(data => setDestinos(data.slice(0, 3)))
      .catch(() => setError("No se pudieron cargar los destinos."));
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!destinos.length) return <div className="text-gray-500">Cargando destinos...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {destinos.map((dest) => (
        <div key={dest._id} className="group relative overflow-hidden rounded-lg bg-white shadow-md">
          <div className="relative h-64 w-full overflow-hidden">
            {dest.imageUrl ?
              <Image src={dest.imageUrl} alt={dest.name} fill className="object-cover" /> :
              <div className="bg-gray-200 w-full h-full flex items-center justify-center">Sin imagen</div>
            }
          </div>
          <div className="absolute bottom-0 w-full p-6 text-white">
            <h3 className="text-xl font-bold mb-1">{dest.name}</h3>
            <p className="text-sm text-white/80 mb-3">{dest.country}</p>
            <p className="text-gold-400 font-semibold">Desde ${dest.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
