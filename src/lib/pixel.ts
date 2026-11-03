"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

const PIXEL_ID = "825619885244890";

/** "Marketing" aceito no banner de cookies (CookieBanner grava yc_consent). */
export function aceitouMarketing(): boolean {
  try {
    return JSON.parse(localStorage.getItem("yc_consent") ?? "{}").ad_user_data === "granted";
  } catch {
    return false;
  }
}

/** Carrega o Meta Pixel uma única vez, no cliente. Só se chama com Marketing aceito. */
export function initPixel() {
  if (typeof window === "undefined" || window.fbq) return;

  type Fbq = ((...args: unknown[]) => void) & {
    callMethod?: (...args: unknown[]) => void;
    queue: unknown[][];
    push: unknown;
    loaded: boolean;
    version: string;
  };

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;

  fbq.queue = [];
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  window._fbq = window._fbq ?? fbq;
  window.fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
}

/**
 * Lead no pixel do navegador, se ele carregou (só com Marketing aceito). O
 * eventID é o mesmo id que o servidor manda pela API de Conversões: a Meta conta um lead só.
 */
export function trackLead(eventId: string, conteudo: string) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead", { content_name: conteudo }, { eventID: eventId });
  }
}

/** Id do Lead, gerado no envio. Navegador antigo ou sem contexto seguro: UUID v4 com Math.random. */
export function novoIdEvento(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}
