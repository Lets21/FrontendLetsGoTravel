"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Mail, Video, Package } from "lucide-react";

const links = [
  { href: "/admin/destinations", label: "Destinos", icon: <MapPin size={18}/> },
  { href: "/admin/contacts", label: "Contactos", icon: <Mail size={18}/> },
  { href: "/admin/hero-video", label: "Video Principal", icon: <Video size={18}/> },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="border-t border-amber-500/20 pt-2">
      <div className="max-w-7xl mx-auto px-6 flex gap-4 justify-center items-center">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative flex items-center gap-3 px-6 py-2 font-medium transition-all duration-200 rounded-lg ${
                isActive 
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-lg shadow-amber-500/50' 
                  : 'text-amber-100 hover:text-white hover:bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/40'
              }`}
            >
              <div className={`transition-colors ${
                isActive 
                  ? "text-black" 
                  : "text-amber-400 group-hover:text-amber-300"
              }`}>
                {link.icon}
              </div>
              <span className="font-semibold">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
