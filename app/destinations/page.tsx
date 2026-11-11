import { Suspense } from "react";
import { MessageCircle } from "lucide-react";
import { DestinationGrid } from "@/components/destination-grid";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/reveal";
import { whatsappLink } from "@/lib/destinations";

export const metadata = {
  title: "Destinos y paquetes | Lets Go Travel SS",
  description:
    "Paquetes de viaje desde Ecuador al Caribe, Sudamérica, Europa, Asia y más. Precios por persona y financiamiento en cuotas.",
};

export default function DestinationsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Paquetes desde Ecuador"
        title="¿A dónde te"
        accent="llevamos?"
        subtitle="Filtra por región, presupuesto o duración y guarda tus favoritos. Todos los precios son por persona."
        image="https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section id="paquetes" className="scroll-mt-20 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Suspense fallback={<div className="h-96" />}>
            <DestinationGrid />
          </Suspense>
        </div>
      </section>

      <section className="bg-ink py-20 text-white md:py-28">
        <div className="container mx-auto px-4 text-center">
          <Reveal>
            <p className="eyebrow-dark mb-4">Viajes a medida</p>
            <h2 className="mx-auto max-w-3xl font-display text-4xl leading-tight md:text-6xl">
              ¿No ves tu destino soñado? <em className="italic text-gold-300">Lo armamos.</em>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">
              Cuéntanos a dónde quieres ir, con quién y cuándo. Te enviamos un itinerario personalizado sin costo.
            </p>
            <a
              href={whatsappLink("¡Hola! Quiero un itinerario personalizado.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill mt-10 h-14 bg-gold-500 px-8 text-lg text-ink hover:bg-gold-400"
            >
              <MessageCircle size={20} /> Solicitar itinerario personalizado
            </a>
          </Reveal>
        </div>
      </section>

      <WhatsAppButton />
    </main>
  );
}
