import type { EventoConfig } from "@/eventos/tipos";

/** Faixa logo abaixo do hero: os dados do evento em numerais grandes, sem ícones. */
export function DestaquesStrip({ destaques }: { destaques: NonNullable<EventoConfig["destaques"]> }) {
  return (
    <section className="relative px-6 pt-2 md:px-12 lg:px-16">
      <div className="grid grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {destaques.map((d) => (
          <div key={d.rotulo} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-5 sm:flex-col sm:gap-1 sm:px-6 sm:py-7 lg:flex-row lg:items-baseline lg:gap-3">
            <span className="font-display text-[26px] font-extrabold leading-none tracking-[-0.02em] text-primary md:text-[32px] lg:text-[36px]">{d.valor}</span>
            <span className="text-[13px] text-muted-foreground md:text-sm">{d.rotulo}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
