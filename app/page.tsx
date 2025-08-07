import { HeroSection } from "@/components/ui/hero-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { HomeDestinationsGrid } from "@/components/HomeDestinationsGrid"; // Tu nuevo grid tipado
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ServiceGrid } from "@/components/service-grid";
import { FinancingSection } from "@/components/financing-section";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function Home() {
  return (
    <main>
      <HeroSection />

      {/* Destinos destacados */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Destinos Populares"
            subtitle="Descubre nuestras experiencias de viaje más solicitadas"
            center
          />
          {/* Aquí va tu grid */}
          <HomeDestinationsGrid />

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

      {/* Resto igual */}
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
