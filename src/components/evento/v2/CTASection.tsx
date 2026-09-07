import type { EventoConfig } from "@/eventos/tipos";
import { Titulo } from "../Titulo";
import { RegistrationForm } from "../RegistrationForm";

type Props = Pick<EventoConfig, "cta" | "formulario" | "webhookEvento" | "tema"> & { destaques?: EventoConfig["destaques"] };

/** Fechamento em duas colunas: o argumento à esquerda, o formulário à direita. */
export function CTASection({ cta, formulario, webhookEvento, tema, destaques }: Props) {
  return (
    <section id="cta-section" className="relative scroll-mt-20 px-6 pb-16 md:scroll-mt-16 md:px-12 md:pb-24 lg:px-16 lg:pb-28">
      <div className="glow-box grid grid-cols-1 gap-10 rounded-2xl border border-primary/40 bg-card/60 p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,440px)] md:gap-14 md:rounded-3xl md:p-10 lg:p-14">
        <div className="flex flex-col justify-center gap-5">
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-primary md:text-[11px]">Inscrição gratuita</span>
          <h2 className="font-display text-[24px] font-extrabold leading-[1.12] tracking-[-0.025em] text-foreground text-pretty md:text-[32px] lg:text-[38px]">
            <Titulo t={cta.titulo} />
          </h2>
          <p className="text-[14px] leading-relaxed text-muted-foreground md:text-[15px] lg:text-base">{cta.descricao}</p>

          <div className="mt-2 flex flex-wrap gap-x-10 gap-y-4">
            {(destaques ?? []).map((d) => (
              <div key={d.rotulo} className="flex flex-col gap-1">
                <span className="font-display text-[22px] font-extrabold leading-none tracking-[-0.02em] text-primary md:text-[28px]">{d.valor}</span>
                <span className="text-[12px] text-muted-foreground md:text-[13px]">{d.rotulo}</span>
              </div>
            ))}
          </div>
        </div>

        <div id="inscricao-form" className="border-t border-border pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-0">
          <RegistrationForm evento={webhookEvento} formulario={formulario} tema={tema} />
          <p className="mt-4 text-center text-xs text-muted-foreground">Link enviado após o cadastro</p>
        </div>
      </div>
    </section>
  );
}
