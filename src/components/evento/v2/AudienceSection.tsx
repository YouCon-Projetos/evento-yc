import type { EventoConfig } from "@/eventos/tipos";
import { Titulo } from "../Titulo";

/** Para quem é: grade dividida por fios, sem cards nem ícones. */
export function AudienceSection({ publico }: { publico: NonNullable<EventoConfig["publico"]> }) {
  return (
    <section className="relative px-6 py-16 md:px-12 md:py-24 lg:px-16 lg:py-28">
      <div className="mb-8 grid grid-cols-1 gap-5 md:mb-14 md:grid-cols-2 md:items-end md:gap-16">
        <h2 className="font-display text-[24px] font-extrabold leading-[1.12] tracking-[-0.025em] text-foreground text-pretty md:text-[32px] lg:text-[38px]">
          <Titulo t={publico.titulo} />
        </h2>
        <p className="text-[14px] leading-relaxed text-muted-foreground md:text-[15px] lg:text-base">{publico.subtitulo}</p>
      </div>

      <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2">
        {publico.itens.map((p, i) => (
          <div key={p.titulo} className="flex flex-col gap-3 bg-background p-6 md:p-9">
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="font-display text-[17px] font-bold text-foreground md:text-[20px]">{p.titulo}</h3>
            <p className="text-[14px] leading-relaxed text-muted-foreground md:text-[15px]">{p.descricao}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
