import type { EventoConfig } from "@/eventos/tipos";

/** Faixa logo abaixo do hero: os dados do evento em numerais grandes, sem ícones. */
export function DestaquesStrip({ destaques }: { destaques: NonNullable<EventoConfig["destaques"]> }) {
  return (
    <section className="relative px-6 md:px-10 lg:px-12">
      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {destaques.map((d) => (
          <div key={d.rotulo} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-5 sm:flex-col sm:gap-1.5 sm:px-7 sm:py-8 sm:first:pl-0">
            <span className="font-display text-[24px] font-extrabold leading-none tracking-[-0.02em] text-primary md:text-[26px]">{d.valor}</span>
            <span className="text-[13px] text-muted-foreground">{d.rotulo}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
