"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type MaletiMood = "happy" | "wave" | "wow" | "love" | "think" | "sleep";

interface MaletiProps {
  mood?: MaletiMood;
  /** Tamaño en px (ancho) */
  size?: number;
  /** Los ojos siguen al cursor */
  followCursor?: boolean;
  /** Flota suavemente arriba y abajo */
  bob?: boolean;
  className?: string;
  title?: string;
}

/**
 * Maleti: la mascota de Lets Go Travel. Una maleta dorada con ojos que siguen
 * el cursor, parpadeo, saludo con la mano y varias expresiones.
 */
export function Maleti({
  mood = "happy",
  size = 120,
  followCursor = true,
  bob = true,
  className,
  title = "Maleti, el guía de viajes de Lets Go Travel",
}: MaletiProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [look, setLook] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!followCursor) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height * 0.5);
        const d = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, d / 300);
        setLook({ x: (dx / d) * 4.5 * k, y: (dy / d) * 4 * k });
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [followCursor]);

  const eyesClosed = mood === "sleep";
  const pupil = mood === "wow" ? 6.5 : 5;

  return (
    <svg
      ref={ref}
      viewBox="0 0 140 160"
      width={size}
      height={(size * 160) / 140}
      role="img"
      aria-label={title}
      className={cn("maleti select-none overflow-visible", bob && "maleti-bob", `maleti-${mood}`, className)}
    >
      {/* Sombra */}
      <ellipse className="maleti-shadow" cx="70" cy="152" rx="40" ry="5" fill="#0E0E0C" opacity=".15" />

      <g className="maleti-body">
        {/* Asa */}
        <path d="M52 34 V22 a10 10 0 0 1 10 -10 h16 a10 10 0 0 1 10 10 V34" fill="none" stroke="#2B2618" strokeWidth="7" strokeLinecap="round" />

        {/* Cuerpo */}
        <rect x="18" y="32" width="104" height="108" rx="24" fill="#D4AF37" stroke="#2B2618" strokeWidth="4" />
        <rect x="26" y="40" width="88" height="10" rx="5" fill="#F1D97A" opacity=".7" />
        {/* Correas */}
        <rect x="38" y="32" width="10" height="108" fill="#B89B30" />
        <rect x="92" y="32" width="10" height="108" fill="#B89B30" />
        <rect x="18" y="32" width="104" height="108" rx="24" fill="none" stroke="#2B2618" strokeWidth="4" />

        {/* Sticker de avión */}
        <g transform="translate(96 108) rotate(-12)">
          <rect x="-13" y="-10" width="26" height="20" rx="5" fill="#FAF7F0" stroke="#2B2618" strokeWidth="2" />
          <path d="M-7 2 L7 -3 L4 0 L7 3 Z M-2 -1 L-5 -6 M-2 1 L-5 6" stroke="#2B2618" strokeWidth="1.8" fill="#2B2618" strokeLinejoin="round" />
        </g>
        {/* Sticker de estrella */}
        <g transform="translate(30 124) rotate(14)">
          <circle r="8" fill="#0E0E0C" />
          <path d="M0 -4.5 L1.3 -1.3 L4.5 -1.3 L2 0.8 L3 4 L0 2 L-3 4 L-2 0.8 L-4.5 -1.3 L-1.3 -1.3 Z" fill="#F1D97A" />
        </g>

        {/* Mejillas */}
        <ellipse cx="40" cy="96" rx="7" ry="4.5" fill="#E58A6B" opacity={mood === "love" ? 0.85 : 0.45} />
        <ellipse cx="100" cy="96" rx="7" ry="4.5" fill="#E58A6B" opacity={mood === "love" ? 0.85 : 0.45} />

        {/* Ojos */}
        {eyesClosed ? (
          <g stroke="#2B2618" strokeWidth="3.5" strokeLinecap="round" fill="none">
            <path d="M44 80 q8 6 16 0" />
            <path d="M80 80 q8 6 16 0" />
          </g>
        ) : mood === "love" ? (
          <g fill="#E04A4A" stroke="#2B2618" strokeWidth="2">
            <path d="M52 88 C40 80 42 70 48 70 C51 70 52 73 52 73 C52 73 53 70 56 70 C62 70 64 80 52 88 Z" />
            <path d="M88 88 C76 80 78 70 84 70 C87 70 88 73 88 73 C88 73 89 70 92 70 C98 70 100 80 88 88 Z" />
          </g>
        ) : (
          <g className="maleti-eyes">
            <ellipse cx="52" cy="78" rx="11" ry={mood === "wow" ? 13 : 12} fill="#FFFFFF" stroke="#2B2618" strokeWidth="3" />
            <ellipse cx="88" cy="78" rx="11" ry={mood === "wow" ? 13 : 12} fill="#FFFFFF" stroke="#2B2618" strokeWidth="3" />
            <g style={{ transform: `translate(${look.x}px, ${look.y}px)`, transition: "transform .15s ease-out" }}>
              <circle cx="52" cy="79" r={pupil} fill="#0E0E0C" />
              <circle cx="88" cy="79" r={pupil} fill="#0E0E0C" />
              <circle cx="54" cy="76.5" r="1.8" fill="#FFFFFF" />
              <circle cx="90" cy="76.5" r="1.8" fill="#FFFFFF" />
            </g>
            {mood === "think" && (
              <g stroke="#2B2618" strokeWidth="3" strokeLinecap="round">
                <path d="M42 62 l14 3" />
                <path d="M84 64 l14 -4" />
              </g>
            )}
          </g>
        )}

        {/* Boca */}
        {mood === "wow" ? (
          <ellipse cx="70" cy="104" rx="6" ry="7.5" fill="#5A1F1F" stroke="#2B2618" strokeWidth="3" />
        ) : mood === "think" ? (
          <path d="M62 106 q8 -4 16 0" fill="none" stroke="#2B2618" strokeWidth="3.5" strokeLinecap="round" />
        ) : mood === "sleep" ? (
          <ellipse cx="70" cy="104" rx="4" ry="3" fill="#5A1F1F" stroke="#2B2618" strokeWidth="2.5" />
        ) : (
          <g>
            <path d="M58 100 q12 14 24 0 Z" fill="#5A1F1F" stroke="#2B2618" strokeWidth="3" strokeLinejoin="round" />
            <path d="M64 106 q6 4 12 0" fill="#E58A6B" />
          </g>
        )}

        {/* Brazo izquierdo */}
        <path d="M20 92 q-18 4 -16 26" fill="none" stroke="#2B2618" strokeWidth="6" strokeLinecap="round" />
        <circle cx="4" cy="119" r="6.5" fill="#F6E6B4" stroke="#2B2618" strokeWidth="3" />

        {/* Brazo derecho (saluda) */}
        <g className="maleti-arm">
          <path d="M120 88 q20 -4 18 -32" fill="none" stroke="#2B2618" strokeWidth="6" strokeLinecap="round" />
          <circle cx="138" cy="54" r="7" fill="#F6E6B4" stroke="#2B2618" strokeWidth="3" />
        </g>

        {/* Ruedas */}
        <circle cx="38" cy="144" r="6" fill="#2B2618" />
        <circle cx="102" cy="144" r="6" fill="#2B2618" />
      </g>

      {mood === "sleep" && (
        <g className="maleti-zzz" fill="#2B2618" fontFamily="Georgia, serif" fontWeight="700">
          <text x="118" y="30" fontSize="14">z</text>
          <text x="128" y="16" fontSize="18">Z</text>
        </g>
      )}
    </svg>
  );
}
