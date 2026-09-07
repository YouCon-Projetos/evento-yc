import type { EventoConfig } from "@/eventos/tipos";
import { Titulo } from "../Titulo";

/** Pilares em linhas numeradas, ao lado de um texto que fica parado no desktop. */
export function BenefitsSection({ beneficios }: { beneficios: EventoConfig["beneficios"] }) {
  const paragrafos = beneficios.subtitulo
    ? Array.isArray(beneficios.subtitulo)
      ? beneficios.subtitulo
      : [beneficios.subtitulo]
    : [];

  return (
    <section className="relative px-6 py-16 md:px-12 md:py-24 lg:px-16 lg:py-28">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,420px)_minmax(0,1fr)] md:gap-16 lg:gap-24">
        <div className="flex flex-col gap-5 md:sticky md:top-28 md:self-start">
          {beneficios.tituloItens && (
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-primary md:text-[11px]">{beneficios.tituloItens}</span>
          )}
          <h2 className="font-display text-[24px] font-extrabold leading-[1.12] tracking-[-0.025em] text-foreground text-pretty md:text-[32px] lg:text-[38px]">
            <Titulo t={beneficios.titulo} />
          </h2>
          {paragrafos.map((p) => (
            <p key={p} className="text-[14px] leading-relaxed text-muted-foreground md:text-[15px] lg:text-base">{p}</p>
          ))}
        </div>

        <div className="flex flex-col border-t border-border">
          {beneficios.itens.map((b, i) => (
            <div key={b.titulo} className="grid grid-cols-[48px_minmax(0,1fr)] items-start gap-4 border-b border-border py-6 md:grid-cols-[88px_minmax(0,1fr)] md:gap-6 md:py-9">
              <span className="font-display text-[30px] font-extrabold leading-[0.9] tracking-[-0.02em] text-primary md:text-[52px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-[17px] font-bold tracking-[-0.01em] text-foreground md:text-[22px]">{b.titulo}</h3>
                <p className="text-[14px] leading-relaxed text-muted-foreground md:text-[15px]">{b.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
