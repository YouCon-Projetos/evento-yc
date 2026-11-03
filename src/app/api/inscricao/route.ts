import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { enviarLeadMeta } from "@/lib/meta-capi";

/**
 * POST /api/inscricao: a inscrição vai do navegador para cá e daqui para o
 * webhook do n8n, com a senha (Basic auth) só no servidor. Até 08/10/2026 o
 * navegador mandava direto ao n8n e a senha ficava visível no código da página.
 * O n8n grava no card o navegador e o IP da pessoa, então repassamos os dela.
 *
 * Os campos de medição (anuncios, eventoMeta, url) não vão ao n8n: ele recebe a
 * inscrição do mesmo jeito de antes. Com "Marketing" aceito, o Lead também vai à
 * Meta pela API de Conversões, com o mesmo id que o pixel do navegador manda.
 */
const URL_N8N = process.env.INSCRICAO_WEBHOOK ?? "https://webhook.lp-youconprojetos.com.br/webhook/eventos-youcon";
const LIMITE_BYTES = 20 * 1024;
const CAMPOS_MEDICAO = ["anuncios", "eventoMeta", "url"];

const MEDICAO = z.object({
  anuncios: z.literal(true),
  eventoMeta: z.string().uuid(),
  url: z.string().url().max(500),
});

const CONTATO = z.object({
  nome: z.string().min(1).max(120),
  email: z.string().email().max(254),
  telefone: z.string().min(8).max(20),
  cidade: z.string().max(120).optional(),
  estado: z.string().max(2).optional(),
  evento: z.string().min(1).max(80),
});

/** Lead para a Meta. Nunca lança erro: a inscrição segue mesmo sem ele. */
async function enviarMedicao(dados: Record<string, unknown>, req: Request): Promise<void> {
  const medicao = MEDICAO.safeParse(dados);
  const contato = CONTATO.safeParse(dados);
  if (!medicao.success || !contato.success) return;
  const biscoitos = await cookies();
  await enviarLeadMeta({
    ...contato.data,
    fbp: biscoitos.get("_fbp")?.value,
    fbc: biscoitos.get("_fbc")?.value,
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined,
    userAgent: req.headers.get("user-agent") ?? undefined,
    url: medicao.data.url,
    eventId: medicao.data.eventoMeta,
  });
}

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

  // Meta e n8n correm juntos: a Meta não atrasa a ida ao grupo
  const envioMeta = enviarMedicao(dados as Record<string, unknown>, req).catch((e) =>
    console.error("[inscricao] Meta:", e),
  );
  const inscricao = Object.fromEntries(Object.entries(dados).filter(([k]) => !CAMPOS_MEDICAO.includes(k)));

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  let ok = false;
  try {
    const r = await fetch(URL_N8N, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(auth).toString("base64")}`,
        "User-Agent": req.headers.get("user-agent") ?? "evento-yc",
        ...(ip ? { "X-Forwarded-For": ip } : {}),
      },
      body: JSON.stringify(inscricao),
      // Webhook travado não pode prender a pessoa antes da ida ao grupo
      signal: AbortSignal.timeout(10_000),
    });
    if (!r.ok) console.error("[inscricao] n8n respondeu", r.status);
    ok = r.ok;
  } catch (e) {
    console.error("[inscricao] falha ao mandar ao n8n:", e);
  }
  await envioMeta;
  return NextResponse.json({ ok }, { status: ok ? 200 : 502 });
}
