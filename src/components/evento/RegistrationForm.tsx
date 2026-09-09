"use client";

import { useMemo, useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { enviarInscricao } from "@/lib/inscricao";
import { trackLead } from "@/lib/pixel";
import type { EventoConfig, Pergunta } from "@/eventos/tipos";

const UFS = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

const sim_nao = [
  { valor: "sim", rotulo: "Sim" },
  { valor: "nao", rotulo: "Não" },
];

/** Etapa 2 dos eventos residenciais, usada por quem não define `perfil` nem `qualificacao`. */
const QUALIFICACAO_PADRAO: Pergunta[] = [
  { campo: "hasLot", rotulo: "Já possui terreno?", placeholder: "Selecione", opcoes: sim_nao },
  { campo: "hasProject", rotulo: "Você já possui projeto arquitetônico?", placeholder: "Selecione", opcoes: sim_nao },
  {
    campo: "investmentAmount",
    rotulo: "Quanto você planeja investir na sua obra?",
    placeholder: "Selecione uma faixa",
    opcoes: [
      "Entre R$ 100 mil e R$ 500 mil",
      "Entre R$ 600 mil e R$ 800 mil",
      "Entre R$ 800 mil e R$ 1,2 milhão",
      "Entre R$ 1,2 milhão e R$ 2 milhões ou mais",
    ].map((v) => ({ valor: v, rotulo: v })),
  },
];

const CAMPOS_ETAPA_1 = {
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(14, "Telefone incompleto"),
  city: z.string().min(2, "Informe a cidade"),
  state: z.string().min(2, "Selecione o estado"),
};

const umaDasOpcoes = (p: Pergunta) =>
  z.enum(p.opcoes.map((o) => o.valor) as [string, ...string[]], { required_error: "Selecione uma opção" });

type Dados = Record<string, string>;

const SELETOR =
  "flex h-11 w-full rounded-md border border-muted-foreground/20 bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

/** Pergunta de opção única como lista suspensa: cabe muito mais texto sem esticar o formulário. */
function ListaSuspensa({ p, registro, erro, aoTrocar }: {
  p: Pergunta;
  registro: UseFormRegisterReturn;
  erro?: string;
  aoTrocar: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={`f-${p.campo}`} className="text-sm text-foreground">{p.rotulo}</Label>
      <select id={`f-${p.campo}`} {...registro} defaultValue="" className={SELETOR} onChange={(e) => aoTrocar(e.target.value)}>
        <option value="" disabled>{p.placeholder ?? "Selecione uma opção"}</option>
        {p.opcoes.map((o) => (
          <option key={o.valor} value={o.valor} className="bg-background text-foreground">{o.rotulo}</option>
        ))}
      </select>
      {erro && <p className="text-xs text-destructive">{erro}</p>}
    </div>
  );
}

type Props = { evento: string; formulario: EventoConfig["formulario"]; tema: EventoConfig["tema"] };

/**
 * Inscrição em duas etapas: contato (e perfil, quando o evento ramifica),
 * depois qualificação. Envia ao webhook e leva ao grupo do WhatsApp.
 */
export function RegistrationForm({ evento, formulario, tema }: Props) {
  const [enviando, setEnviando] = useState(false);
  const [etapa, setEtapa] = useState<1 | 2>(1);
  const cta = tema === "verde" ? "cta-green" : "hero";
  const ctaSuave = tema === "verde" ? "cta-green-soft" : "hero-outline";

  const { perfil } = formulario;
  const [perfilEscolhido, setPerfilEscolhido] = useState("");

  const perguntas = useMemo(() => {
    if (!perfil) return formulario.qualificacao ?? QUALIFICACAO_PADRAO;
    return perfil.opcoes.find((o) => o.valor === perfilEscolhido)?.perguntas ?? [];
  }, [perfil, formulario.qualificacao, perfilEscolhido]);

  const camposEtapa1 = useMemo(
    () => ["name", "email", "phone", "city", "state", ...(perfil ? [perfil.campo] : [])],
    [perfil],
  );

  const schema = useMemo(
    () =>
      z.object({
        ...CAMPOS_ETAPA_1,
        ...(perfil
          ? { [perfil.campo]: z.enum(perfil.opcoes.map((o) => o.valor) as [string, ...string[]], { required_error: "Selecione uma opção" }) }
          : {}),
        ...Object.fromEntries(perguntas.map((p) => [p.campo, umaDasOpcoes(p)])),
      }),
    [perfil, perguntas],
  );

  const { register, handleSubmit, setValue, trigger, formState: { errors, isValid } } = useForm<Dados>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { name: "", email: "", phone: "", city: "", state: "" },
  });

  const mascaraTelefone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, "").slice(0, 11);
    let f = v;
    if (v.length > 2) f = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    if (v.length > 7) f = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    setValue("phone", f, { shouldValidate: true });
  };

  const avancar = async () => { if (await trigger(camposEtapa1)) setEtapa(2); };

  const onSubmit = async (dados: Dados) => {
    setEnviando(true);
    // Só os campos da etapa 1 e do perfil escolhido: trocar de perfil deixa
    // respostas antigas no formulário, e elas não podem ir para o CRM.
    const campos = [...camposEtapa1, ...perguntas.map((p) => p.campo)];
    const inscricao = Object.fromEntries(campos.map((c) => [c, dados[c]]));
    try {
      await enviarInscricao({ ...inscricao, evento });
    } catch (e) {
      // A inscrição segue para o grupo mesmo se o webhook falhar: perder o lead é pior
      console.error("Erro ao enviar inscrição:", e);
    }
    trackLead();
    await new Promise((r) => setTimeout(r, 300));
    window.location.href = formulario.redirect;
  };

  const campo = "h-11 border-muted-foreground/20 bg-background text-sm focus:border-primary";

  const lista = (p: Pergunta, aoTrocar?: (v: string) => void) => (
    <ListaSuspensa
      key={p.campo}
      p={p}
      registro={register(p.campo)}
      erro={errors[p.campo]?.message as string | undefined}
      aoTrocar={(v) => { setValue(p.campo, v, { shouldValidate: true }); aoTrocar?.(v); }}
    />
  );

  return (
    <div>
      <div className="mb-5 md:mb-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-base font-bold text-foreground md:text-xl">{formulario.titulo}</h3>
          <span className="shrink-0 text-xs font-semibold text-primary md:text-sm">Etapa {etapa} de 2</span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
          <div className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out" style={{ width: etapa === 1 ? "50%" : "100%" }} />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {etapa === 1 && (
          <>
            <div className="space-y-1.5">
              <Label htmlFor="f-name" className="text-sm text-foreground">Nome completo</Label>
              <Input id="f-name" {...register("name")} placeholder="Seu nome" className={campo} />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="f-email" className="text-sm text-foreground">E-mail</Label>
              <Input id="f-email" type="email" {...register("email")} placeholder="seu@email.com" className={campo} />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="f-phone" className="text-sm text-foreground">WhatsApp</Label>
              <Input id="f-phone" type="tel" {...register("phone")} onChange={mascaraTelefone} placeholder="(00) 00000-0000" maxLength={15} className={campo} />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
            </div>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
              <div className="col-span-2 space-y-1.5 sm:col-span-4">
                <Label htmlFor="f-city" className="text-sm text-foreground">Cidade</Label>
                <Input id="f-city" {...register("city")} placeholder="Ex: São Paulo" className={campo} />
                {errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
              </div>
              <div className="col-span-1 space-y-1.5">
                <Label htmlFor="f-state" className="text-sm text-foreground">Estado</Label>
                <select id="f-state" {...register("state")} defaultValue="" className={SELETOR}>
                  <option value="" disabled>UF</option>
                  {UFS.map((uf) => <option key={uf} value={uf} className="bg-background text-foreground">{uf}</option>)}
                </select>
                {errors.state && <p className="text-xs text-destructive">{errors.state.message}</p>}
              </div>
            </div>
            {perfil && lista(perfil, setPerfilEscolhido)}
            <Button type="button" variant={cta} size="lg" className="mt-6 h-11 w-full rounded-full text-sm" onClick={avancar}>CONTINUAR</Button>
          </>
        )}

        {etapa === 2 && (
          <>
            {perguntas.map((p) => lista(p))}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row-reverse">
              <Button type="submit" variant={cta} size="lg" className="h-11 w-full rounded-full text-sm" disabled={!isValid || enviando}>
                {enviando ? "Redirecionando..." : "CONFIRMAR INSCRIÇÃO"}
              </Button>
              <Button type="button" variant={ctaSuave} size="lg" className="h-11 w-full rounded-full text-sm sm:w-auto sm:px-6" onClick={() => setEtapa(1)} disabled={enviando}>Voltar</Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
