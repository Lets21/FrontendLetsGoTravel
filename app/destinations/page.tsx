import { SectionHeading } from "@/components/ui/section-heading";
import { DestinationGrid } from "@/components/destination-grid";
import { WhatsAppButton } from "@/components/whatsapp-button";

export const metadata = {
  title: "Destinos | Let's Go Travel",
  description: "Explora nuestra amplia gama de destinos de viaje incluyendo Sudamérica, Europa y el Caribe.",
};
export default function DestinationsPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] bg-black">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg')] bg-cover bg-center opacity-70"></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Explora Nuestros Destinos</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Descubre los lugares más increíbles del mundo con nuestras experiencias de viaje seleccionadas
        </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
             title="¿A Dónde Te Gustaría Ir?"
             subtitle="Explora nuestros destinos populares y encuentra tu escapada perfecta"
            center      // <-- CENTRA el título y subtítulo
            className="mb-12"
            />
          <DestinationGrid />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gold-500">
        <div className="container mx-auto px-4 text-center text-black">
          <h2 className="text-3xl font-bold mb-4">¿No encuentras lo que estás buscando?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
             Nuestros expertos en viajes pueden crear un itinerario personalizado para cualquier destino. 
  Contáctanos con tu destino soñado y lo haremos realidad.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
           Solicita un Itinerario Personalizado
          </a>
        </div>
      </section>

      <WhatsAppButton />
    </main>
  );
}