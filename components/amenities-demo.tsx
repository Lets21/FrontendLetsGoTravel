'use client';

import React from 'react';
import { AmenitiesDisplay } from '@/components/ui/amenities-display';

/**
 * Componente de demostración para visualizar todos los amenities disponibles
 * Útil para ver cómo se ven los iconos en diferentes configuraciones
 * 
 * Ubicación: Puedes usarlo en una página de admin o de prueba
 */
export function AmenitiesDemo() {
  const allAmenities = [
    "flights",
    "transfers",
    "accommodation",
    "breakfast",
    "lunch",
    "dinner",
    "all_inclusive",
    "excursions",
    "tours",
    "insurance",
    "guide",
    "activities"
  ];

  const examplePackages = [
    {
      name: "Paquete Budget",
      amenities: ["flights", "accommodation", "breakfast"]
    },
    {
      name: "Paquete Estándar",
      amenities: ["flights", "transfers", "accommodation", "breakfast", "lunch", "tours"]
    },
    {
      name: "Paquete Premium",
      amenities: ["flights", "transfers", "accommodation", "breakfast", "lunch", "dinner", "excursions", "tours", "guide", "insurance"]
    },
    {
      name: "Todo Incluido",
      amenities: ["flights", "transfers", "accommodation", "all_inclusive", "excursions", "tours", "activities", "insurance"]
    }
  ];

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-lg">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🎯 Demo de Amenities
          </h1>
          <p className="text-lg text-gray-600">
            Visualiza cómo se ven los iconos de servicios en diferentes configuraciones
          </p>
        </div>

        {/* Todos los iconos disponibles */}
        <div className="bg-white rounded-lg p-8 mb-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Todos los Amenities Disponibles</h2>
          <div className="space-y-4">
            <AmenitiesDisplay amenities={allAmenities} size="md" maxDisplay={12} />
            <p className="text-sm text-gray-500 mt-4">
              Total: {allAmenities.length} servicios disponibles
            </p>
          </div>
        </div>

        {/* Ejemplos de paquetes */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Ejemplos de Paquetes</h2>
          
          {examplePackages.map((pkg, idx) => (
            <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{pkg.name}</h3>
              <AmenitiesDisplay amenities={pkg.amenities} size="md" maxDisplay={4} />
              <p className="text-sm text-gray-500 mt-3">
                Servicios incluidos: {pkg.amenities.length}
              </p>
            </div>
          ))}
        </div>

        {/* Tamaños diferentes */}
        <div className="bg-white rounded-lg p-8 mt-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tamaños de Iconos</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Pequeño (sm)</h3>
              <AmenitiesDisplay 
                amenities={["flights", "accommodation", "breakfast", "tours"]} 
                size="sm" 
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Mediano (md) - Default</h3>
              <AmenitiesDisplay 
                amenities={["flights", "accommodation", "breakfast", "tours"]} 
                size="md" 
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Grande (lg)</h3>
              <AmenitiesDisplay 
                amenities={["flights", "accommodation", "breakfast", "tours"]} 
                size="lg" 
              />
            </div>
          </div>
        </div>

        {/* Información técnica */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-bold text-blue-900 mb-2">💡 Información Técnica</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>✓ Los iconos se obtienen de la librería <code className="bg-blue-100 px-1 rounded">lucide-react</code></li>
            <li>✓ Cada icono tiene su propio color para diferenciación visual</li>
            <li>✓ Tooltip aparece al pasar el mouse para mostrar el nombre del servicio</li>
            <li>✓ Responsive: funciona en móvil, tablet y desktop</li>
            <li>✓ Límite de 4 iconos por defecto en las tarjetas de destino</li>
          </ul>
        </div>

        {/* Guía de uso */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-bold text-green-900 mb-3">📚 Cómo Usar</h3>
          <pre className="bg-white p-4 rounded border border-green-300 text-xs overflow-x-auto text-gray-800">
{`import { AmenitiesDisplay } from '@/components/ui/amenities-display';

<AmenitiesDisplay 
  amenities={["flights", "accommodation", "breakfast"]}
  size="md"
  maxDisplay={4}
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
}
