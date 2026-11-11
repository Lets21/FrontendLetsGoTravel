"use client";

import { useState } from "react";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  name: string;
  location: string;
  testimonial: string;
  rating: number;
  trip?: string;
}

export function TestimonialCard({ name, location, testimonial, rating, trip }: TestimonialCardProps) {
  const [more, setMore] = useState(false);
  const parts = name.trim().split(/\s+/);
  const initials = (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
  const long = testimonial.length > 220;

  return (
    <figure className="relative flex h-full flex-col rounded-3xl bg-white p-7 shadow-[0_20px_50px_-30px_rgba(14,14,12,.3)] sm:p-8">
      <Quote className="absolute right-6 top-6 text-gold-200" size={44} aria-hidden="true" />
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex" role="img" aria-label={`${rating} de 5 estrellas`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={17} className={i < rating ? "fill-gold-500 text-gold-500" : "text-stone-300"} />
          ))}
        </div>
        {trip && (
          <span className="rounded-full bg-sand px-3 py-1 text-xs font-bold text-stone-700">{trip}</span>
        )}
      </div>
      <blockquote className={cn("relative text-[17px] leading-relaxed text-stone-700", !more && long && "line-clamp-5")}>
        “{testimonial}”
      </blockquote>
      {long && (
        <button
          type="button"
          onClick={() => setMore((m) => !m)}
          className="mt-2 self-start text-sm font-bold text-gold-800 hover:underline"
        >
          {more ? "Leer menos" : "Leer más"}
        </button>
      )}
      <figcaption className="mt-auto flex items-center gap-3 pt-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink font-bold text-gold-300" aria-hidden="true">
          {initials}
        </span>
        <span>
          <strong className="block text-ink">{name}</strong>
          <span className="text-sm text-stone-500">{location}</span>
        </span>
      </figcaption>
    </figure>
  );
}
