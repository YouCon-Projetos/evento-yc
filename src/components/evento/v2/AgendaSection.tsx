"use client";

import { Button } from "@/components/ui/button";
import type { EventoConfig } from "@/eventos/tipos";
import { Titulo } from "../Titulo";

const irAoFormulario = () => document.getElementById("cta-section")?.scrollIntoView({ behavior: "smooth" });

/** Roteiro sobre a faixa laranja: chamada à esquerda, itens numerados à direita. */
export function AgendaSection({ agenda }: { agenda: EventoConfig["agenda"] }) {
  return (
    <section className="bg-orange-gradient relative px-6 py-16 text-[hsl(0_0%_4%)] md:px-12 md:py-24 lg:px-16 lg:py-28">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,400px)_minmax(0,1fr)] md:gap-16 lg:gap-24">
        <div className="flex flex-col items-start gap-5">
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-black/70 md:text-[11px]">Roteiro</span>
          <h2 className="font-display text-[24px] font-extrabold leading-[1.12] tracking-[-0.025em] text-pretty md:text-[32px] lg:text-[38px]">
            <Titulo t={agenda.titulo} destaqueClasse="text-white" />
          </h2>
          <p className="text-[14px] leading-relaxed text-black/80 md:text-[15px] lg:text-base">{agenda.subtitulo}</p>
          <Button variant="cta-green" size="xl" onClick={irAoFormulario} className="mt-2 h-12 w-full rounded-full text-[13px] shadow-[0_16px_40px_rgba(0,0,0,0.25)] sm:w-auto md:h-14 md:px-9 md:text-sm">
            {agenda.cta.toUpperCase()}
          </Button>
        </div>

        <div className="flex flex-col">
          {agenda.itens.map((item, i) => (
            <div key={item.titulo} className="grid grid-cols-[40px_minmax(0,1fr)] items-start gap-4 border-t border-black/25 py-5 last:border-b md:grid-cols-[56px_minmax(0,1fr)] md:gap-6 md:py-7">
              <span className="font-display text-[16px] font-extrabold text-black/70 md:text-[20px]">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-[16px] font-bold md:text-[20px]">{item.titulo}</h3>
                {item.descricao && <p className="text-[14px] leading-relaxed text-black/80 md:text-[15px]">{item.descricao}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
