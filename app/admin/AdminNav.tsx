"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderOpen, Mail, Video } from "lucide-react";

const links = [
  { href: "/admin/destinations", label: "Paquetes", icon: <FolderOpen size={18}/> },
  { href: "/admin/contacts", label: "Contactos", icon: <Mail size={18}/> },
  { href: "/admin/hero-video", label: "Video Principal", icon: <Video size={18}/> },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex space-x-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 px-6 py-3.5 font-medium transition-all relative ${
                pathname === link.href
                  ? "text-gray-900 bg-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
              {pathname === link.href && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-800 to-gray-900"></div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
