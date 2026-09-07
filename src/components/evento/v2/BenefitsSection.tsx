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
    <section className="relative px-6 py-20 md:px-10 md:py-28 lg:px-12 lg:py-36">
      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-12 md:grid-cols-[minmax(0,380px)_minmax(0,1fr)] md:gap-20 lg:gap-28">
        <div className="flex flex-col gap-5 md:sticky md:top-28 md:self-start">
          {beneficios.tituloItens && (
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-primary">{beneficios.tituloItens}</span>
          )}
          <h2 className="font-display text-[22px] font-extrabold leading-[1.15] tracking-[-0.025em] text-foreground text-pretty md:text-[26px] lg:text-[30px]">
            <Titulo t={beneficios.titulo} />
          </h2>
          {paragrafos.map((p) => (
            <p key={p} className="text-[14px] leading-[1.7] text-muted-foreground md:text-[15px]">{p}</p>
          ))}
        </div>

        <div className="flex flex-col border-t border-border">
          {beneficios.itens.map((b, i) => (
            <div key={b.titulo} className="grid grid-cols-[44px_minmax(0,1fr)] items-start gap-5 border-b border-border py-7 md:grid-cols-[72px_minmax(0,1fr)] md:gap-8 md:py-11">
              <span className="font-display text-[26px] font-extrabold leading-[0.9] tracking-[-0.02em] text-primary md:text-[38px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2.5">
                <h3 className="font-display text-[16px] font-bold tracking-[-0.01em] text-foreground md:text-[19px]">{b.titulo}</h3>
                <p className="text-[14px] leading-[1.7] text-muted-foreground md:text-[15px]">{b.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
