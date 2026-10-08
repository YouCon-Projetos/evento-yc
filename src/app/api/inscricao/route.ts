import { NextResponse } from "next/server";

/**
 * POST /api/inscricao: a inscrição vai do navegador para cá e daqui para o
 * webhook do n8n, com a senha (Basic auth) só no servidor. Até 08/10/2026 o
 * navegador mandava direto ao n8n e a senha ficava visível no código da página.
 * O n8n grava no card o navegador e o IP da pessoa, então repassamos os dela.
 */
const URL_N8N = process.env.INSCRICAO_WEBHOOK ?? "https://webhook.lp-youconprojetos.com.br/webhook/eventos-youcon";
const LIMITE_BYTES = 20 * 1024;

export async function POST(req: Request) {
  const auth = process.env.INSCRICAO_WEBHOOK_AUTH;
  if (!auth) {
    console.error("[inscricao] INSCRICAO_WEBHOOK_AUTH ausente: inscrição não enviada ao n8n");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const texto = await req.text();
  if (texto.length > LIMITE_BYTES) return NextResponse.json({ ok: false }, { status: 413 });
  let dados: unknown;
  try {
    dados = JSON.parse(texto);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!dados || typeof dados !== "object" || Array.isArray(dados)) return NextResponse.json({ ok: false }, { status: 400 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  try {
    const r = await fetch(URL_N8N, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(auth).toString("base64")}`,
        "User-Agent": req.headers.get("user-agent") ?? "evento-yc",
        ...(ip ? { "X-Forwarded-For": ip } : {}),
      },
      body: JSON.stringify(dados),
      // Webhook travado não pode prender a pessoa antes da ida ao grupo
      signal: AbortSignal.timeout(10_000),
    });
    if (!r.ok) console.error("[inscricao] n8n respondeu", r.status);
    return NextResponse.json({ ok: r.ok }, { status: r.ok ? 200 : 502 });
  } catch (e) {
    console.error("[inscricao] falha ao mandar ao n8n:", e);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
