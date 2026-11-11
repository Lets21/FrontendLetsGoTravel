"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { whatsappLink } from "@/lib/destinations";
import { cn } from "@/lib/utils";

const NAV = [
  { title: "Destinos", href: "/destinations" },
  { title: "Servicios", href: "/services" },
  { title: "Financiamiento", href: "/financing" },
  { title: "Nosotros", href: "/about" },
  { title: "Contacto", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquear el scroll del fondo con el menú móvil abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const solid = !isHome || scrolled || open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-white transition-all duration-500",
          solid
            ? "bg-ink/90 shadow-[0_10px_30px_-15px_rgba(0,0,0,.6)] backdrop-blur-md"
            : "bg-gradient-to-b from-black/60 to-transparent"
        )}
      >
        <div
          className={cn(
            "container mx-auto flex items-center justify-between gap-6 px-4 transition-all duration-500",
            solid ? "h-20" : "h-24"
          )}
        >
          <Link href="/" className="flex shrink-0 items-center" aria-label={`${siteConfig.name} – inicio`}>
            <div className={cn("relative transition-all duration-500", solid ? "h-14 w-36 md:w-44" : "h-16 w-40 md:w-52")}>
              <Image
                src="/logo - Editado.png"
                alt={siteConfig.name}
                fill
                priority
                className="object-contain object-left"
                sizes="208px"
              />
            </div>
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative py-2 text-[15px] font-semibold transition-colors",
                    active ? "text-gold-300" : "text-white/85 hover:text-white"
                  )}
                >
                  {item.title}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-gold-500 transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink("¡Hola! Quiero cotizar un viaje.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill hidden bg-gold-500 text-ink hover:bg-gold-400 sm:inline-flex"
            >
              <MessageCircle size={18} />
              Cotiza gratis
            </a>
            <button
              className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-white/10 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        <div
          className={cn(
            "fixed inset-x-0 bottom-0 top-20 bg-ink/95 backdrop-blur-lg transition-all duration-500 lg:hidden",
            open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <nav className="container mx-auto flex flex-col px-6 pt-6">
            {[{ title: "Inicio", href: "/" }, ...NAV].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
                className={cn(
                  "border-b border-white/10 py-4 font-display text-3xl transition-all duration-500",
                  open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0",
                  pathname === item.href ? "text-gold-300" : "text-white"
                )}
              >
                {item.title}
              </Link>
            ))}
            <a
              href={whatsappLink("¡Hola! Quiero cotizar un viaje.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill mt-8 bg-[#25D366] text-[#0B2E17]"
            >
              <MessageCircle size={20} /> Cotizar por WhatsApp
            </a>
          </nav>
        </div>
      </header>

      {/* Separador para páginas internas (el inicio va debajo del header) */}
      {!isHome && <div className="h-20" aria-hidden="true" />}
    </>
  );
}
