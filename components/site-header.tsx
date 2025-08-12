"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-black text-white shadow-lg">
      {/* Main bar: alturas pedidas */}
      <div className="h-24 md:h-28">
        <div className="container mx-auto relative flex h-full items-center justify-between px-4">
          {/* Logo (izquierda) */}
          <Link href="/" className="flex items-center">
            <div className="relative h-16 w-40 xs:h-12 xs:w-36 md:h-28 md:w-72 shrink-0">
              <Image
                src="/logo - Editado.png"
                alt="LetsGoTravel SS"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 224px"
              />
            </div>
          </Link>

          {/* Título centrado SOLO en móvil (no afecta desktop) */}
          <div className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 leading-tight text-center">
            <span className="block text-sm font-semibold tracking-wide">
              LETS<span className="text-gold-500">GO</span>TRAVEL{" "}
              <span className="text-gold-500">SS</span>
            </span>
            <span className="block text-[11px] text-white/70">
              Tu Agencia de Viajes
            </span>
          </div>

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/90 hover:text-gold-400 transition-colors font-medium"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburguesa */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              className="hidden md:inline-flex bg-gold-500 hover:bg-gold-600 text-black font-semibold"
            >
              <Link href="/contact">Reserva tu Viaje</Link>
            </Button>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil: arranca justo bajo el header de 96px */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-24 left-0 right-0 bottom-0 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/80 z-40">
          <nav className="container mx-auto flex flex-col gap-1 p-4">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2 py-3 text-base text-white/90 hover:bg-white/5 hover:text-white transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <Button
              asChild
              className="mt-2 bg-gold-500 hover:bg-gold-600 text-black font-semibold"
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
