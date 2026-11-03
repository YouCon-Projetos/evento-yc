import { createHash, randomUUID } from "node:crypto";

const VERSAO = "v26.0";

const hash = (valor: string) => createHash("sha256").update(valor).digest("hex");
const semAcento = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");

export type LeadMeta = {
  nome: string;
  email: string;
  /** Como o formulário manda: (35) 99999-9999 */
  telefone: string;
  cidade?: string;
  estado?: string;
  /** Evento de origem (webhookEvento), vai como content_name */
  evento: string;
  /** Cookies do pixel do navegador, quando ele carregou */
  fbp?: string;
  fbc?: string;
  ip?: string;
  userAgent?: string;
  url: string;
  /** Mesmo id do Lead do pixel no navegador (deduplicação) */
  eventId?: string;
};

/**
 * Lead para a API de Conversões da Meta. O pixel do navegador manda o mesmo
 * Lead com o mesmo id, quando carregou. Só se chama com o consentimento de
 * marketing do banner. Sem as envs, ou se a Meta falhar, o lead segue normal.
 */
export async function enviarLeadMeta(lead: LeadMeta): Promise<void> {
  const pixel = process.env.META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixel || !token) return;

  const partes = semAcento(lead.nome.toLowerCase()).replace(/[^a-z ]/g, "").split(/\s+/).filter(Boolean);
  const agora = Date.now();
  const userData: Record<string, unknown> = {
    em: [hash(lead.email.trim().toLowerCase())],
    ph: [hash(`55${lead.telefone.replace(/\D/g, "")}`)],
    country: [hash("br")],
    client_ip_address: lead.ip,
    client_user_agent: lead.userAgent,
  };
  if (partes.length) userData.fn = [hash(partes[0])];
  if (partes.length > 1) userData.ln = [hash(partes[partes.length - 1])];
  const cidade = semAcento((lead.cidade ?? "").toLowerCase()).replace(/[^a-z]/g, "");
  if (cidade) userData.ct = [hash(cidade)];
  if (lead.estado) userData.st = [hash(lead.estado.toLowerCase())];
  if (lead.fbc) userData.fbc = lead.fbc;
  if (lead.fbp) userData.fbp = lead.fbp;

  try {
    const res = await fetch(`https://graph.facebook.com/${VERSAO}/${pixel}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_token: token,
        data: [
          {
            event_name: "Lead",
            event_time: Math.floor(agora / 1000),
            event_id: lead.eventId ?? randomUUID(),
            action_source: "website",
            event_source_url: lead.url,
            user_data: userData,
            custom_data: { content_name: lead.evento },
          },
        ],
      }),
      signal: AbortSignal.timeout(5_000),
    });
    if (!res.ok) console.error("[meta-capi] respondeu", res.status, (await res.text()).slice(0, 300));
  } catch (e) {
    console.error("[meta-capi] falha no envio:", e);
  }
}
