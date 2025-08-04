import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { HeroSection } from "@/components/ui/hero-section";
import { ServiceGrid } from "@/components/service-grid";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { FinancingSection } from "@/components/financing-section";

// Elimina la importación de siteConfig.destinations, ya no se usará para los destacados

export default async function Home() {
  // FETCH al backend para traer los destinos reales
  // Ajusta la URL a tu API real si la tienes diferente
  const res = await fetch("https://backendletsgotravel.onrender.com/api/destinations", {
    cache: 'no-store', // Así siempre muestra la data más reciente
  });
  const destinos = await res.json();

  // Selecciona solo 3 destinos destacados (puedes cambiarlos como gustes)
  const featuredDestinations = destinos.slice(0, 3);

  return (
    <main>
      <HeroSection />

      {/* Featured Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Destinos Populares"
            subtitle="Descubre nuestras experiencias de viaje más solicitadas"
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDestinations.map((destination) => (
              <div
                key={destination._id}
                className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={destination.imageUrl} // O el campo que tengas en tu modelo
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
                  <div className="absolute bottom-0 w-full p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                    <p className="text-sm text-white/80 mb-3">{destination.country}</p>
                    <p className="text-gold-400 font-semibold">Desde ${destination.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              className="bg-gold-500 hover:bg-gold-600 text-black font-medium"
            >
              <Link href="/destinations">
                Ver Todos los Destinos <ChevronRight size={16} className="ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ...el resto de tu código no cambia */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Nuestros Servicios"
            subtitle="Ofrecemos una amplia gama de servicios para que tu viaje sea perfecto"
            center
          />
          <ServiceGrid />
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Viaja Ahora, Paga Después"
            subtitle="Opciones de financiamiento flexibles para hacer realidad tus vacaciones soñadas"
            center
          />
          <FinancingSection />
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Lo Que Dicen Nuestros Clientes"
            subtitle="Descubre por qué los viajeros eligen Let's Go Travel para sus aventuras"
            center
          />
          <TestimonialCarousel />
        </div>
      </section>
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para Empezar Tu Próxima Aventura?</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Permítenos ayudarte a planear el viaje perfecto. Nuestros expertos están listos para crear una experiencia personalizada solo para ti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gold-500 hover:bg-gold-600 text-black font-semibold"
            >
              <Link href="/contact">
                Contáctanos Hoy
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-black hover:bg-gold-100 hover:text-black transition"
            >
              <Link href="/about">
                Conoce Más Sobre Nosotros
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <WhatsAppButton />
    </main>
  );
}
