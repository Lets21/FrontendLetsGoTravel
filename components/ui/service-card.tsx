import { DivideIcon as LucideIcon } from "lucide-react";
import dynamic from "next/dynamic";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
}

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  // Dynamically import the icon from lucide-react
  const Icon = dynamic(
    async () => {
      const icons = await import("lucide-react");
      // @ts-ignore
      return icons[icon];
    },
    { ssr: false, loading: () => <div className="w-8 h-8" /> }
  ) as typeof LucideIcon;


  return (
    <div className="bg-white rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-xl group">
      <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center mb-4 text-gold-500 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-300">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}