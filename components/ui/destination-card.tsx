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
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl h-full border border-gray-100">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={imgSrc}
          alt={`Imagen del destino: ${name}`}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
      </div>

      <div className="relative p-6 flex flex-col h-[280px]">
        <div className="mb-2 flex items-center gap-2">
          <MapPin size={16} className="text-gold-500" />
          <span className="text-sm font-medium text-gray-500 truncate">
            {country || "País no especificado"}
          </span>
        </div>
        <h3 className="mb-2 text-xl font-bold truncate">{name}</h3>
        <p className="mb-4 text-sm text-gray-600 line-clamp-2">{description || "Sin descripción."}</p>

        <div className="flex items-center justify-between mt-auto mb-2">
          <div>
            <p className="text-sm text-gray-500">Desde</p>
            <p className="text-gold-600 font-bold text-xl">
              {price ? `$${price}` : "Consultar"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Duración</p>
            <p className="text-sm font-medium">{duration || "A consultar"}</p>
          </div>
        </div>

        <Link
          href={`/contact?destination=${encodeURIComponent(name)}`}
          className="mt-2 block w-full rounded bg-gold-500 py-2 text-center font-medium text-black transition-colors hover:bg-gold-600"
          aria-label={`Solicitar información sobre ${name}`}
        >
          Solicitar información
        </Link>
      </div>
    </div>
  );
}
