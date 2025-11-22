import { Star, User } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  location: string;
  testimonial: string;
  rating: number;
}

export function TestimonialCard({
  name,
  location,
  testimonial,
  rating,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
          <User className="text-gray-500" size={28} />
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "text-gold-500 fill-gold-500" : "text-gray-300"}
          />
        ))}
      </div>
      
      <p className="text-gray-700 italic">"{testimonial}"</p>
    </div>
  );
}