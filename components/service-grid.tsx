import { ServiceCard } from "@/components/ui/service-card";
import { siteConfig } from "@/lib/constants";
import { Reveal } from "@/components/reveal";

export function ServiceGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {siteConfig.services.map((service, i) => (
        <Reveal key={service.id} delay={(i % 3) * 120} className="h-full">
          <ServiceCard
            title={service.title}
            description={service.description}
            icon={service.icon}
            index={i}
          />
        </Reveal>
      ))}
    </div>
  );
}