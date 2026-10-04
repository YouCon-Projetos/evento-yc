"use client";

/**
 * Envio da inscrição ao webhook (n8n) que repassa ao CRM.
 *
 * Os valores padrão são os que as LPs em Vite usavam. As variáveis
 * NEXT_PUBLIC_* permitem trocar sem redeploy de código, mas continuam
 * visíveis no bundle: isso é limitação do webhook, que só aceita Basic
 * auth no navegador, não deste código.
 */
const URL =
  process.env.NEXT_PUBLIC_INSCRICAO_WEBHOOK ??
  "https://webhook.lp-youconprojetos.com.br/webhook/eventos-youcon";
const AUTH = process.env.NEXT_PUBLIC_INSCRICAO_AUTH ?? "admin:123456";

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
  const resp = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(AUTH)}`,
    },
    body: JSON.stringify(dados),
  });
  if (!resp.ok) throw new Error(`Webhook ${resp.status}`);
}
