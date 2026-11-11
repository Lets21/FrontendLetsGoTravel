"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Compass, Calculator, MessageCircle, Heart } from "lucide-react";
import { Maleti, type MaletiMood } from "./maleti";
import { whatsappLink } from "@/lib/destinations";
import { cn } from "@/lib/utils";

interface Tip {
  text: string;
  mood: MaletiMood;
}

const WELCOME: Record<string, Tip> = {
  "/": { text: "¡Hola! Soy Maleti. Te acompaño a encontrar tu próximo viaje.", mood: "wave" },
  "/destinations": { text: "Toca el corazón de un paquete para guardar tus paquetes favoritos.", mood: "love" },
  "/financing": { text: "¿Sabías que puedes pagar tu viaje hasta en 24 meses?", mood: "wow" },
  "/services": { text: "Visas, seguro, traslados… ¡nosotros nos encargamos!", mood: "happy" },
  "/about": { text: "Somos un equipo apasionado por viajar. ¡Encantado!", mood: "wave" },
  "/contact": { text: "Escríbenos y te respondemos en minutos.", mood: "happy" },
};

const KEY = "lgt-maleti-oculto";

/**
 * Guía flotante: Maleti aparece en la esquina, comenta la sección que estás
 * viendo (atributo data-guide en las secciones) y abre un menú rápido.
 */
export function TravelGuide() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(true);
  const [tip, setTip] = useState<Tip | null>(null);
  const [bubble, setBubble] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mood, setMood] = useState<MaletiMood>("happy");
  const [entered, setEntered] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const idle = useRef<ReturnType<typeof setTimeout>>();
  const lastGuide = useRef<string>("");

  const say = (t: Tip, ms = 6500) => {
    setTip(t);
    setMood(t.mood);
    setBubble(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setBubble(false);
      setMood("happy");
    }, ms);
  };

  // Mostrar (salvo que el visitante lo haya cerrado en esta sesión)
  useEffect(() => {
    let off = false;
    try {
      off = window.sessionStorage.getItem(KEY) === "1";
    } catch {
      /* sin almacenamiento */
    }
    if (off) return;
    setHidden(false);
  }, []);

  // En el inicio aparece al bajar del hero (para no tapar las cifras); en el resto, enseguida
  useEffect(() => {
    if (hidden) return;
    if (pathname !== "/") {
      const t = setTimeout(() => setEntered(true), 600);
      return () => clearTimeout(t);
    }
    const check = () => setEntered(window.scrollY > window.innerHeight * 0.6);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [pathname, hidden]);

  // Saludo por página
  useEffect(() => {
    if (hidden) return;
    lastGuide.current = "";
    setMenu(false);
    const welcome = WELCOME[pathname];
    if (!welcome || !entered) return;
    const t = setTimeout(() => say(welcome), 900);
    return () => clearTimeout(t);
  }, [pathname, hidden, entered]);

  // Comentarios según la sección visible
  useEffect(() => {
    if (hidden || typeof IntersectionObserver === "undefined") return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-guide]"));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const text = el.dataset.guide!;
          if (text === lastGuide.current) return;
          lastGuide.current = text;
          say({ text, mood: (el.dataset.guideMood as MaletiMood) || "happy" });
        });
      },
      { threshold: 0.45 }
    );
    // Esperar al saludo inicial antes de comentar secciones
    const t = setTimeout(() => els.forEach((el) => io.observe(el)), 4000);
    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, [pathname, hidden]);

  // Se duerme si no hay actividad
  useEffect(() => {
    if (hidden) return;
    const wake = () => {
      setMood((m) => (m === "sleep" ? "happy" : m));
      clearTimeout(idle.current);
      idle.current = setTimeout(() => {
        setBubble(false);
        setMood("sleep");
      }, 25000);
    };
    wake();
    window.addEventListener("pointermove", wake, { passive: true });
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("keydown", wake);
    return () => {
      clearTimeout(idle.current);
      window.removeEventListener("pointermove", wake);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("keydown", wake);
    };
  }, [hidden]);

  useEffect(() => () => clearTimeout(timer.current), []);

  if (hidden || pathname.startsWith("/admin")) return null;

  const close = () => {
    setHidden(true);
    try {
      window.sessionStorage.setItem(KEY, "1");
    } catch {
      /* sin almacenamiento */
    }
  };

  const actions = [
    { href: "/destinations", label: "Ver destinos", icon: Compass, internal: true },
    { href: "/#financiamiento", label: "Calcular mi cuota", icon: Calculator, internal: true },
    { href: "/destinations?fav=1", label: "Mis favoritos", icon: Heart, internal: true },
    { href: whatsappLink("¡Hola! Maleti me envió por aquí 😄 Quiero cotizar un viaje."), label: "Hablar con un asesor", icon: MessageCircle, internal: false },
  ];

  return (
    <div
      className={cn(
        "fixed bottom-4 left-3 z-40 flex items-end gap-2 transition-all duration-700 md:bottom-6 md:left-6",
        entered ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      )}
    >
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setMenu((m) => !m);
            setBubble(false);
            setMood("wow");
            setTimeout(() => setMood("happy"), 900);
          }}
          aria-expanded={menu}
          aria-label="Abrir el menú de Maleti, tu guía de viajes"
          className="group block rounded-full transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        >
          <span className="block md:hidden">
            <Maleti size={58} mood={mood} />
          </span>
          <span className="hidden md:block">
            <Maleti size={84} mood={mood} />
          </span>
        </button>
        <button
          type="button"
          onClick={close}
          aria-label="Ocultar a Maleti"
          className="absolute -left-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-stone-500 opacity-80 shadow ring-1 ring-stone-200 transition hover:text-ink hover:opacity-100"
        >
          <X size={13} />
        </button>
      </div>

      {/* Burbuja */}
      {bubble && tip && !menu && (
        <div
          key={tip.text}
          role="status"
          className="bubble-in absolute bottom-full left-1 mb-2 w-[min(240px,calc(100vw-40px))] rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-sm font-semibold leading-snug text-ink shadow-[0_15px_40px_-15px_rgba(0,0,0,.4)] ring-1 ring-stone-200 md:static md:mb-14 md:w-auto md:max-w-[260px] md:text-[15px]"
        >
          {tip.text}
        </div>
      )}

      {/* Menú rápido */}
      {menu && (
        <div className="bubble-in absolute bottom-full left-1 mb-2 w-60 overflow-hidden rounded-2xl md:static md:mb-6 bg-white text-ink shadow-[0_25px_60px_-20px_rgba(0,0,0,.5)] ring-1 ring-stone-200">
          <p className="bg-ink px-4 py-3 text-sm font-bold text-white">
            ¿En qué te ayudo? <span className="text-gold-300">✦</span>
          </p>
          <ul className="p-1.5">
            {actions.map((a) => {
              const inner = (
                <>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sand text-gold-800">
                    <a.icon size={16} />
                  </span>
                  {a.label}
                </>
              );
              const cls = "flex min-h-[44px] items-center gap-3 rounded-xl px-2.5 text-sm font-bold transition hover:bg-sand";
              return (
                <li key={a.label}>
                  {a.internal ? (
                    <Link href={a.href} className={cls} onClick={() => setMenu(false)}>
                      {inner}
                    </Link>
                  ) : (
                    <a href={a.href} target="_blank" rel="noopener noreferrer" className={cls} onClick={() => setMenu(false)}>
                      {inner}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
