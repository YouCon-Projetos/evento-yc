"use client";

import { useEffect } from "react";
import { aceitouMarketing, initPixel } from "@/lib/pixel";

/**
 * Meta Pixel só com "Marketing" aceito no banner de cookies. Escuta o banner
 * para ligar na hora do "Aceitar", sem recarregar a página.
 */
export function PixelInit() {
  useEffect(() => {
    const conferir = () => { if (aceitouMarketing()) initPixel(); };
    conferir();
    window.addEventListener("yc:consentimento", conferir);
    return () => window.removeEventListener("yc:consentimento", conferir);
  }, []);
  return null;
}
