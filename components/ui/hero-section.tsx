"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";

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
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showVolumeButton, setShowVolumeButton] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Hide volume button after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVolumeButton(false);
    }, 10000); // 10 segundos

    return () => clearTimeout(timer);
  }, []);

  // try to fetch a video from backend (first destination that has videoUrl)
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await apiFetch("/api/hero");
        console.log("Hero API response status:", res.status);
        if (!res.ok) return;
        const data = await res.json();
        console.log("Hero API data:", data);
        if (data && data.videoUrl) {
          console.log("Setting video URL:", data.videoUrl);
          setVideoUrl(data.videoUrl);
        }
      } catch (e) {
        console.error("Error fetching hero video:", e);
        // ignore errors and keep image slides
      }
    };
    fetchVideo();
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background: prefer video if available, otherwise slides */}
      {videoUrl ? (
        <div className="absolute inset-0">
          <video 
            className="w-full h-full object-cover" 
            src={videoUrl} 
            autoPlay 
            muted={isMuted}
            loop 
            playsInline
            controls={false}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          
          {/* Volume Control Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`absolute bottom-32 right-8 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-500 ${
              showVolumeButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-label={isMuted ? "Activar sonido" : "Silenciar"}
          >
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            )}
          </button>
        </div>
      ) : (
        slides.map((slide, index) => (
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
        ))
      )}

      {/* Content */}
      <div className="relative z-10 flex h-full items-end justify-center text-center pb-24">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 opacity-0 animate-[fadeUp_1s_0.5s_forwards]">
              {slides[currentSlide].title}
            </h1>
            <p className="text-base md:text-lg text-white mb-5 opacity-0 animate-[fadeUp_1s_0.8s_forwards]">
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