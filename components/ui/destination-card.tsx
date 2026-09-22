import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

interface DestinationCardProps {
  id: string;
  name: string;
  country?: string;
  description?: string;
  price?: number;
  image?: string;
  duration?: string;
}

const placeholderImg =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80";

export function DestinationCard({
  id,
  name,
  country,
  description,
  price,
  image,
  duration,
}: DestinationCardProps) {
  // Si no hay imagen, usa un placeholder bonito
  const imgSrc = image && image.length > 5 ? image : placeholderImg;

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg h-full border border-gray-100">
      {/* Imagen mediana: aspect-[3/2] para mejor visualización */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={imgSrc}
          alt={`Imagen del destino: ${name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
      </div>

      {/* Contenido más compacto */}
      <div className="relative p-4 flex flex-col h-[220px]">
        <div className="mb-1 flex items-center gap-2">
          <MapPin size={14} className="text-gold-500 flex-shrink-0" />
          <span className="text-xs font-medium text-gray-500 truncate">
            {country || "País no especificado"}
          </span>
        </div>
        <h3 className="mb-1 text-lg font-bold truncate">{name}</h3>
        <p className="mb-2 text-xs text-gray-600 line-clamp-1">{description || "Sin descripción."}</p>

        <div className="flex items-center justify-between mt-auto mb-2 gap-2">
          <div>
            <p className="text-xs text-gray-500">Desde</p>
            <p className="text-gold-600 font-bold text-lg">
              {price ? `$${price}` : "Consultar"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Duración</p>
            <p className="text-xs font-medium">{duration || "A consultar"}</p>
          </div>
        </div>

        <Link
          href={`/contact?destination=${encodeURIComponent(name)}`}
          className="mt-2 block w-full rounded-md bg-gold-500 py-1.5 text-center font-medium text-xs text-black transition-colors hover:bg-gold-600"
          aria-label={`Solicitar información sobre ${name}`}
        >
          Solicitar información
        </Link>
      </div>
    </div>
  );
}
