"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderOpen, Mail } from "lucide-react";

const links = [
  { href: "/admin/destinations", label: "Paquetes", icon: <FolderOpen className="mr-1 inline" size={18}/> },
  { href: "/admin/contacts", label: "Contactos", icon: <Mail className="mr-1 inline" size={18}/> },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-2 mb-4 bg-black px-6 py-1 border-b border-gold-500">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`flex items-center px-4 py-1 rounded font-semibold transition-all ${
            pathname === link.href
              ? "bg-gold-500 text-black shadow"
              : "bg-black text-gold-400 hover:bg-gold-600 hover:text-black"
          }`}
        >
          {link.icon} {link.label}
        </Link>
      ))}
    </nav>
  );
}
