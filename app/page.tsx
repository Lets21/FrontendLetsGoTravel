import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { HeroSection } from "@/components/ui/hero-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { HomeDestinationsGrid } from "@/components/HomeDestinationsGrid";
import { ServiceGrid } from "@/components/service-grid";
import { HowItWorks } from "@/components/how-it-works";
import { FinancingSection } from "@/components/financing-section";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Reveal } from "@/components/reveal";
import { Maleti } from "@/components/mascot/maleti";
import { siteConfig } from "@/lib/constants";
import { whatsappLink } from "@/lib/destinations";

const CTA_IMAGE =
  "https://images.pexels.com/photos/2739664/pexels-photo-2739664.jpeg?auto=compress&cs=tinysrgb&w=1920";

const MARQUEE = ["Cancún", "Punta Cana", "Galápagos", "Cartagena", "Estambul", "Tokio", "Atenas", "El Cairo", "Buenos Aires", "Cusco", "Aruba", "Bangkok"];

export default function Home() {
  return (
    <main>
      <HeroSection />

      {/* Cinta de destinos en movimiento */}
      <div className="overflow-hidden border-b border-stone-200 bg-cream py-5" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-2xl text-stone-400 md:text-3xl">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="flex items-center gap-10">
              {m} <span className="text-gold-500">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Paquetes */}
      <section id="paquetes" data-guide="Estos son nuestros paquetes más pedidos. ¡Filtra por región!" data-guide-mood="wow" className="scroll-mt-20 py-24 md:py-32">
        <div className="container mx-auto px-4">
          <Reveal>
            <SectionHeading
              eyebrow="Paquetes destacados"
              title="¿Playa, cultura o aventura?"
              accent="Tú eliges."
              subtitle="Precios por persona con lo esencial incluido. Toca un paquete para ver todos los detalles."
            />
          </Reveal>
          <HomeDestinationsGrid />
        </div>
      </section>

      <HowItWorks />

      {/* Financiamiento */}
      <section id="financiamiento" data-guide="Mueve la barra y mira cuánto pagarías al mes." data-guide-mood="think" className="scroll-mt-20 py-24 md:py-32">
        <div className="container mx-auto px-4">
          <FinancingSection />
        </div>
      </section>

      {/* Servicios */}
      <section className="bg-sand py-24 md:py-32">
        <div className="container mx-auto px-4">
          <Reveal>
            <SectionHeading
              eyebrow="Todo en un solo lugar"
              title="Nos encargamos de cada"
              accent="detalle."
              subtitle="Para que tú solo pienses en disfrutar."
            />
          </Reveal>
          <ServiceGrid />
        </div>
      </section>

      {/* Testimonios */}
      <section data-guide="Estos viajeros ya volvieron felices. ¡Tú puedes ser el siguiente!" data-guide-mood="love" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <Reveal>
            <SectionHeading eyebrow="Opiniones reales" title="Viajeros que ya" accent="volvieron felices." />
          </Reveal>
          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden bg-ink text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={CTA_IMAGE} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full animate-ken-burns object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/10" />
        <div className="container relative mx-auto grid items-center gap-10 px-4 py-28 md:py-36 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <h2 className="max-w-3xl font-display text-5xl leading-[1.03] md:text-7xl">
              Tu próximo viaje empieza con <em className="italic text-gold-300">un mensaje.</em>
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/85">
              Escríbenos y recibe tu cotización personalizada sin costo. Te respondemos en minutos.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={whatsappLink("¡Hola! Quiero cotizar mi próximo viaje.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill h-14 bg-[#25D366] px-8 text-lg text-[#0B2E17] hover:bg-[#20bd5a]"
              >
                <MessageCircle size={22} /> Cotizar por WhatsApp
              </a>
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="btn-pill h-14 border border-white/60 px-8 text-lg text-white hover:bg-white hover:text-ink">
                <Phone size={20} /> {siteConfig.contact.phone}
              </a>
              <Link href="/about" className="btn-pill h-14 px-6 text-lg text-white/80 underline-offset-4 hover:text-white hover:underline">
                Conócenos
              </Link>
            </div>
          </Reveal>
          <Reveal delay={200} className="hidden justify-center lg:flex">
            <div className="relative">
              <div className="absolute -top-16 left-1/2 w-max -translate-x-1/2 rounded-2xl rounded-bl-sm bg-white px-5 py-3 text-base font-bold text-ink shadow-xl">
                ¡Yo ya hice la maleta!
              </div>
              <Maleti size={240} mood="wave" />
            </div>
          </Reveal>
        </div>
      </section>

      <WhatsAppButton />
    </main>
  );
}
