"use client";

/**
 * Envio da inscrição ao CRM: o navegador manda para /api/inscricao, e o
 * servidor repassa ao webhook do n8n com a senha (que não fica mais no código
 * da página, desde 08/10/2026).
 */

const YOUHUB =
  process.env.NEXT_PUBLIC_YOUHUB_INSCRICAO ??
  "https://youhub-dun.vercel.app/api/eventos/inscricao";

/**
 * Cópia da inscrição para o YouHub (é de lá que sai o número de inscritos do
 * painel). Vai ao lado do envio ao n8n, que não muda: não espera resposta, o
 * keepalive termina o envio mesmo com a ida ao grupo, e qualquer erro é
 * ignorado. Leva a página e as UTMs, que o n8n não recebe.
 */
export function copiarParaOYouHub(dados: Record<string, unknown>) {
  try {
    const utm = Object.fromEntries(
      [...new URLSearchParams(window.location.search)].filter(([k]) => /^utm_|^(fbclid|gclid)$/.test(k)),
    );
    void fetch(YOUHUB, {
      method: "POST",
      mode: "no-cors",
      keepalive: true,
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ ...dados, url: window.location.href, utm }),
    }).catch(() => {});
  } catch {
    // Nunca atrapalha a inscrição.
  }
}

export async function enviarInscricao(dados: Record<string, unknown>) {
  const resp = await fetch("/api/inscricao", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!resp.ok) throw new Error(`Webhook ${resp.status}`);
}
