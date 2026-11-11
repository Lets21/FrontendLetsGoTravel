'use client';

import React from 'react';
import {
  Plane,
  Car,
  Hotel,
  UtensilsCrossed,
  MapPin,
  Camera,
  Shield,
  MapPinned,
  Utensils,
  Sunrise,
  Sun,
  Sunset,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Mapeo de amenities a iconos y nombres
const amenitiesConfig: Record<
  string,
  {
    icon: LucideIcon;
    label: string;
    color: string;
  }
> = {
  flights: {
    icon: Plane,
    label: 'Boletos Aéreos',
    color: 'text-blue-500',
  },
  transfers: {
    icon: Car,
    label: 'Traslados',
    color: 'text-orange-500',
  },
  accommodation: {
    icon: Hotel,
    label: 'Hospedaje',
    color: 'text-red-500',
  },
  breakfast: {
    icon: Sunrise,
    label: 'Desayuno',
    color: 'text-yellow-500',
  },
  lunch: {
    icon: Sun,
    label: 'Almuerzo',
    color: 'text-amber-500',
  },
  dinner: {
    icon: Sunset,
    label: 'Cena',
    color: 'text-purple-500',
  },
  all_inclusive: {
    icon: Sparkles,
    label: 'Todo Incluido',
    color: 'text-gold-500',
  },
  excursions: {
    icon: MapPin,
    label: 'Excursiones',
    color: 'text-green-500',
  },
  tours: {
    icon: Camera,
    label: 'Tours',
    color: 'text-cyan-500',
  },
  insurance: {
    icon: Shield,
    label: 'Seguro de Viaje',
    color: 'text-indigo-500',
  },
  guide: {
    icon: MapPinned,
    label: 'Guía Turístico',
    color: 'text-teal-500',
  },
  activities: {
    icon: Utensils,
    label: 'Actividades',
    color: 'text-pink-500',
  },
};

interface AmenitiesDisplayProps {
  amenities?: string[];
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
  maxDisplay?: number;
}

export function AmenitiesDisplay({
  amenities = [],
  showLabels = false,
  size = 'md',
  maxDisplay = 6,
}: AmenitiesDisplayProps) {
  if (!amenities || amenities.length === 0) {
    return null;
  }

  // Limitar el número de amenities mostrados
  const displayedAmenities = amenities.slice(0, maxDisplay);
  const hiddenCount = amenities.length - maxDisplay;

  const iconSizeMap = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const iconSize = iconSizeMap[size];

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        {displayedAmenities.map((amenity) => {
          const config = amenitiesConfig[amenity];
          if (!config) return null;

          const IconComponent = config.icon;

          return (
            <Tooltip key={amenity} delayDuration={200}>
              <TooltipTrigger asChild>
                <div
                  className={`flex items-center justify-center p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-help`}
                >
                  <IconComponent size={iconSize} className={config.color} />
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-gray-900 text-white text-xs px-2 py-1"
              >
                {config.label}
              </TooltipContent>
            </Tooltip>
          );
        })}

        {hiddenCount > 0 && (
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center px-2 py-1 rounded-full bg-gold-100 text-gold-600 font-medium text-xs hover:bg-gold-200 transition-colors cursor-help">
                +{hiddenCount}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-gray-900 text-white text-xs">
              Y {hiddenCount} servicio{hiddenCount > 1 ? 's' : ''} más
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}
