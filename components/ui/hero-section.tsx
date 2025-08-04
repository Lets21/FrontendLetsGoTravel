"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
}

const slides: HeroSlide[] = [
  {
    image: "https://images.pexels.com/photos/2245436/pexels-photo-2245436.png",
    title: "Experimenta la magia de Sudamérica",
    subtitle: "Descubre paisajes impresionantes y culturas ricas.",
  },
  {
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg",
    title: "Te esperan aventuras europeas",
    subtitle: "Sumérgete en la historia, el arte y la gastronomía.",
  },
  {
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg",
    title: "Escapadas inolvidables al Caribe",
    subtitle: "Playas vírgenes y aguas cristalinas",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center text-center">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 opacity-0 animate-[fadeUp_1s_0.5s_forwards]">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 opacity-0 animate-[fadeUp_1s_0.8s_forwards]">
              {slides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-[fadeUp_1s_1.1s_forwards]">
              <Button
                asChild
                size="lg"
                className="bg-gold-500 hover:bg-gold-600 text-black font-semibold"
              >
                <Link href="/destinations">
                  Explorar destinos <ChevronRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="goldOutline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="/financing">
                  Viaja ahora, paga después <ChevronRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-gold-500" : "bg-white bg-opacity-50"
            }`}
          >
            <span className="sr-only">Slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}