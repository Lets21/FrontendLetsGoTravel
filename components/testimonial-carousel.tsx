"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { siteConfig } from "@/lib/constants";
import { TestimonialCard } from "@/components/ui/testimonial-card";

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check initially
    checkMobile();
    
    // Listen for window resize
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? siteConfig.testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === siteConfig.testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const visibleTestimonials = isMobile 
    ? [siteConfig.testimonials[currentIndex]] 
    : [
        siteConfig.testimonials[currentIndex],
        siteConfig.testimonials[(currentIndex + 1) % siteConfig.testimonials.length],
        siteConfig.testimonials[(currentIndex + 2) % siteConfig.testimonials.length],
      ];

  return (
    <div className="relative">
      <div className="flex space-x-6 overflow-hidden">
        {visibleTestimonials.map((testimonial, index) => (
          <div
            key={`testimonial-${testimonial.id}-${index}`}
            className="w-full md:w-1/3 flex-shrink-0"
          >
            <TestimonialCard {...testimonial} />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        <button
          onClick={handlePrevious}
          className="p-2 rounded-full bg-gold-500 text-black hover:bg-gold-600 transition-colors"
        >
          <ChevronLeft size={20} />
          <span className="sr-only">Anterior</span>
        </button>
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-gold-500 text-black hover:bg-gold-600 transition-colors"
        >
          <ChevronRight size={20} />
          <span className="sr-only">Siguiente</span>
        </button>
      </div>
    </div>
  );
}