import { Compass, MessagesSquare, PlaneTakeoff } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const STEPS = [
  {
    icon: Compass,
    title: "Elige o sueña",
    text: "Escoge uno de nuestros paquetes o cuéntanos tu viaje ideal: destino, fechas y presupuesto.",
  },
  {
    icon: MessagesSquare,
    title: "Te lo armamos",
    text: "Un asesor arma tu itinerario con vuelos, hotel, visas, seguro y traslados, y te lo envía por WhatsApp.",
  },
  {
    icon: PlaneTakeoff,
    title: "Viaja y paga en cuotas",
    text: "Financia con tu banco y viaja tranquilo: te acompañamos 24/7 hasta que regreses a casa.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="container relative mx-auto px-4">
        <Reveal>
          <SectionHeading eyebrow="Así de fácil" title="De la idea al aeropuerto en" accent="tres pasos." dark />
        </Reveal>
        <div className="relative grid gap-6 md:grid-cols-3">
          {/* Línea que une los pasos */}
          <div className="absolute left-0 right-0 top-[52px] hidden h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent md:block" />
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 150}>
              <div className="group relative h-full rounded-3xl border border-white/10 bg-white/[0.04] p-8 transition-all duration-500 hover:border-gold-500/50 hover:bg-white/[0.07]">
                <div className="mb-6 flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500 text-ink transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <s.icon size={26} />
                  </span>
                  <span className="font-display text-6xl text-white/10 transition-colors duration-500 group-hover:text-gold-500/40">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mb-2 text-2xl font-bold">{s.title}</h3>
                <p className="leading-relaxed text-white/70">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
