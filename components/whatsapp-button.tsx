"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/destinations";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  message?: string;
}

export function WhatsAppButton({
  message = "¡Hola! Me gustaría obtener información sobre paquetes de viaje.",
}: WhatsAppButtonProps) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 1500);
    // La etiqueta se recoge sola al hacer scroll para no tapar contenido
    const onScroll = () => setExpanded(window.scrollY < 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t1);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      onMouseEnter={() => setExpanded(true)}
      className={cn(
        "group fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 overflow-hidden rounded-full bg-[#25D366] pl-4 text-[#0B2E17] shadow-xl transition-all duration-500 hover:bg-[#20bd5a] md:bottom-6 md:right-6",
        visible ? "translate-y-0 opacity-100 animate-wa-pulse" : "pointer-events-none translate-y-16 opacity-0",
        expanded ? "pr-5" : "pr-4"
      )}
    >
      <MessageCircle size={24} className="shrink-0" />
      <span
        className={cn(
          "whitespace-nowrap font-bold transition-all duration-500",
          expanded ? "max-w-[160px] opacity-100" : "max-w-0 opacity-0"
        )}
      >
        ¿Te ayudamos?
      </span>
    </a>
  );
}
