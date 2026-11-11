// Utilidades compartidas para los paquetes que vienen del backend.
import { siteConfig } from "@/lib/constants";

export interface Destino {
  _id: string;
  name: string;
  country?: string;
  description?: string;
  price: number;
  duration?: string;
  imageUrl?: string;
  /** Opcional: foto limpia del destino (si el backend la envía, se usa en vez del flyer) */
  coverUrl?: string;
  videoUrl?: string;
  amenities?: string[];
  displayOrder?: number;
}

/** Corrige países escritos de forma inconsistente en el panel de admin. */
const COUNTRY_FIX: Record<string, string> = {
  "peru": "Perú",
  "peru magico": "Perú",
  "panama": "Panamá",
  "mexico": "México",
  "japon": "Japón",
  "turquia": "Turquía",
  "emiratos arabes": "Emiratos Árabes",
  "marraketch": "Marruecos",
  "curacao": "Curazao",
  "kenia + safari y playa": "Kenia",
  "uzbekistan": "Uzbekistán",
};

export function cleanCountry(raw?: string): string {
  if (!raw) return "";
  const t = raw.trim().replace(/\s+/g, " ");
  const key = t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
  return COUNTRY_FIX[key] ?? t;
}

export type Region =
  | "Caribe"
  | "Sudamérica"
  | "Norteamérica"
  | "Europa"
  | "Asia"
  | "África y Medio Oriente";

export const REGIONS: Region[] = [
  "Caribe",
  "Sudamérica",
  "Norteamérica",
  "Europa",
  "Asia",
  "África y Medio Oriente",
];

const REGION_KEYWORDS: [Region, string[]][] = [
  ["Caribe", ["republica dominicana", "punta cana", "cuba", "aruba", "curazao", "curacao", "jamaica", "bahamas", "san andres", "cancun", "mexico", "panama"]],
  ["Sudamérica", ["ecuador", "galapagos", "peru", "colombia", "cartagena", "argentina", "chile", "brasil", "bolivia", "uruguay"]],
  ["Norteamérica", ["estados unidos", "miami", "florida", "orlando", "nueva york", "canada"]],
  ["Europa", ["europa", "espana", "francia", "italia", "grecia", "atenas", "finlandia", "rovaniemi", "rusia", "portugal", "alemania", "suiza", "londres", "paris", "roma"]],
  ["Asia", ["japon", "tokio", "china", "beijing", "tailandia", "bangkok", "india", "uzbekistan", "turquia", "estambul", "corea", "vietnam"]],
  ["África y Medio Oriente", ["egipto", "cairo", "marruecos", "kenia", "emiratos", "dubai", "israel", "jordania", "sudafrica"]],
];

function plain(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function regionOf(d: Pick<Destino, "name" | "country">): Region | null {
  const hay = plain(`${d.country ?? ""} ${d.name}`);
  for (const [region, words] of REGION_KEYWORDS) {
    if (words.some((w) => hay.includes(w))) return region;
  }
  return null;
}

/** "4 Días y 3 Noches" -> "4D / 3N" */
export function shortDuration(raw?: string): string {
  if (!raw) return "";
  const m = plain(raw).match(/(\d+)\s*dias?\D+(\d+)\s*noches?/);
  return m ? `${m[1]}D / ${m[2]}N` : raw;
}

export function money(n: number): string {
  return "$" + Math.round(n).toLocaleString("es-EC");
}

/** Cuota referencial a 12 meses (sin intereses). */
export function monthly(price: number, months = 12): string {
  return money(price / months);
}

/** Pide a Cloudinary una versión liviana (webp/avif, ancho limitado). */
export function optimizedImage(url?: string, width = 800): string {
  if (!url) return "";
  if (url.includes("res.cloudinary.com") && url.includes("/upload/") && !url.includes("/upload/f_auto")) {
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
  }
  return url;
}

/** Detecta qué incluye el paquete leyendo la descripción. */
const INCLUDES: [string, RegExp][] = [
  ["Vuelos", /boleto|aereo|vuelo/],
  ["Traslados", /traslado|transfer/],
  ["Hotel", /alojamiento|hotel|hospedaje|resort/],
  ["Todo incluido", /todo incluido|all inclusive/],
  ["Desayunos", /desayuno/],
  ["Excursiones", /excursion|tour|visita/],
  ["Seguro", /seguro|asistencia/],
];

export function includesFrom(d: Pick<Destino, "description" | "amenities">): string[] {
  const txt = plain(d.description ?? "");
  const found = INCLUDES.filter(([, re]) => re.test(txt)).map(([label]) => label);
  return found;
}

export function whatsappLink(message: string): string {
  const num = siteConfig.contact.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

export function packageMessage(d: Pick<Destino, "name" | "price" | "duration">): string {
  return `¡Hola! Me interesa el paquete "${d.name}"${d.duration ? ` (${d.duration})` : ""} desde ${money(d.price)}. ¿Me pueden enviar más información?`;
}
