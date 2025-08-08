"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    // ↑ Subimos la altura en móvil: h-24 (96px). Desktop igual: md:h-28 (112px)
    <header className="fixed top-0 w-full z-50 bg-black shadow-md h-24 md:h-28">
      {/* Usamos la altura del header con h-full para centrar verticalmente */}
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          {/* LOGO más grande en móvil; aún más grande en sm/md */}
          <div className="relative shrink-0 h-16 w-48 sm:h-24 sm:w-56 md:h-28 md:w-64">
            <Image
              src="/logo - Editado.png"
              alt={siteConfig.name}
              fill
              className="object-contain"
              priority
              // tamaños sugeridos para servir la imagen óptima
              sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white hover:text-gold-400 text-lg font-semibold transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Contact Button */}
        <Button
          asChild
          variant="default"
          className="hidden md:flex bg-gold-500 hover:bg-gold-600 text-black font-semibold transition-colors text-lg px-6 py-2"
        >
          <Link href="/contact">Reserva tu Viaje</Link>
        </Button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        // top-24 para que el panel empiece justo debajo del header más alto en móvil
        <div className="md:hidden fixed top-24 left-0 right-0 bottom-0 bg-black z-40 flex flex-col">
          <nav className="flex flex-col space-y-4 p-6">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-gold-400 text-lg font-medium py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <Button
              asChild
              variant="default"
              className="mt-4 bg-gold-500 hover:bg-gold-600 text-black font-semibold transition-colors text-lg"
            >
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                Reserva tu Viaje
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
