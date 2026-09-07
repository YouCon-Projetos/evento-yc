import Image from "next/image";
import type { EventoConfig } from "@/eventos/tipos";
import { Titulo } from "../Titulo";

type Props = { hosts: EventoConfig["hosts"]; participacao?: EventoConfig["participacao"] };

/** "Mais do que assistir" e quem conduz, lado a lado. */
export function HostsSection({ hosts, participacao }: Props) {
  return (
    <section className="relative px-6 py-16 md:px-12 md:py-24 lg:px-16 lg:py-28">
      <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
        {!participacao && (
          <h2 className="font-display text-[24px] font-extrabold leading-[1.12] tracking-[-0.025em] text-foreground text-pretty md:text-[32px] lg:text-[38px]">
            <Titulo t={hosts.titulo} />
          </h2>
        )}
        {participacao && (
          <div className="flex flex-col justify-center gap-5">
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-primary md:text-[11px]">Mais do que assistir</span>
            <h2 className="font-display text-[24px] font-extrabold leading-[1.12] tracking-[-0.025em] text-foreground text-pretty md:text-[32px] lg:text-[38px]">
              <Titulo t={participacao.titulo} />
            </h2>
            {participacao.paragrafos.map((p) => (
              <p key={p} className="text-[14px] leading-relaxed text-muted-foreground md:text-[15px] lg:text-base">{p}</p>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-6">
          {hosts.itens.map((h) => (
            <div key={h.nome} className="grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card sm:grid-cols-[200px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]">
              <div className="relative h-64 bg-[hsl(0_0%_10%)] sm:h-auto">
                <Image src={h.foto} alt={h.nome} fill sizes="(max-width: 640px) 100vw, 240px" className="object-cover object-top" />
              </div>
              <div className="flex flex-col justify-center gap-3 p-6 md:p-8">
                <span className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Conduzido por</span>
                <h3 className="font-display text-[22px] font-extrabold tracking-[-0.02em] text-foreground md:text-[26px]">{h.nome}</h3>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground md:text-xs">
                  {h.cargo}{h.titulo ? ` · ${h.titulo}` : ""}
                </span>
                <p className="text-[14px] leading-relaxed text-muted-foreground md:text-[15px]">{h.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
