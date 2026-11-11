"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "lgt-favoritos";
const EVENT = "lgt-favoritos-change";

function read(): string[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Favoritos guardados en el navegador del visitante. */
export function useFavorites() {
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    setFavs(read());
    const sync = () => setFavs(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    const cur = read();
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* almacenamiento no disponible: se mantiene solo en memoria */
    }
    setFavs(next);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { favs, isFav: (id: string) => favs.includes(id), toggle };
}
