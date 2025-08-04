"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-black bg-opacity-95 shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative h-40 w-10 sm:h-12 sm:w-40">
            <Image
              src="/logo - Editado.png"
              alt={siteConfig.name}
              height={115}
              width={115}
              className="object-contain"
            />
          </div>
          
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white hover:text-gold-400 font-medium transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Contact Button */}
        <Button
          asChild
          variant="default"
          className="hidden md:flex bg-gold-500 hover:bg-gold-600 text-black font-medium transition-colors"
        >
          <Link href="/contact">Reserva tu Viaje</Link>
        </Button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bottom-0 bg-black bg-opacity-95 z-40 flex flex-col">
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
              className="mt-4 bg-gold-500 hover:bg-gold-600 text-black font-medium transition-colors"
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