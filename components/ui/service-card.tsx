import { Sparkles, FileCheck, Shield, Users, Car, Headset, Plane, type LucideIcon } from "lucide-react";

// Importación directa de los íconos (antes se cargaba toda la librería en cada tarjeta)
const ICONS: Record<string, LucideIcon> = {
  Sparkles,
  FileCheck,
  Shield,
  Users,
  Car,
  HeadsetIcon: Headset,
  Headset,
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  index?: number;
}

export function ServiceCard({ title, description, icon, index }: ServiceCardProps) {
  const Icon = ICONS[icon] ?? Plane;
  return (
    <div className="group relative h-full overflow-hidden rounded-3xl border border-stone-200/70 bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-300 hover:shadow-[0_30px_60px_-30px_rgba(14,14,12,.35)]">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-100 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      {typeof index === "number" && (
        <span className="absolute right-7 top-6 font-display text-5xl text-stone-200 transition-colors duration-500 group-hover:text-gold-200">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-gold-400 transition-all duration-500 group-hover:rotate-[-6deg] group-hover:bg-gold-500 group-hover:text-ink">
        <Icon size={26} />
      </div>
      <h3 className="relative mb-2 text-xl font-bold text-ink">{title}</h3>
      <p className="relative leading-relaxed text-stone-600">{description}</p>
    </div>
  );
}
