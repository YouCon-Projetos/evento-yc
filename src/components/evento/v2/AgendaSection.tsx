"use client";

import { Button } from "@/components/ui/button";
import type { EventoConfig } from "@/eventos/tipos";
import { Titulo } from "../Titulo";

const irAoFormulario = () => document.getElementById("cta-section")?.scrollIntoView({ behavior: "smooth" });

/** Roteiro sobre a faixa laranja: chamada à esquerda, itens numerados à direita. */
export function AgendaSection({ agenda }: { agenda: EventoConfig["agenda"] }) {
  return (
    <section className="bg-orange-gradient relative px-6 py-20 text-[hsl(0_0%_4%)] md:px-10 md:py-28 lg:px-12 lg:py-36">
      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-12 md:grid-cols-[minmax(0,360px)_minmax(0,1fr)] md:gap-20 lg:gap-28">
        <div className="flex flex-col items-start gap-5 md:sticky md:top-28 md:self-start">
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-black/70">Roteiro</span>
          <h2 className="font-display text-[22px] font-extrabold leading-[1.15] tracking-[-0.025em] text-pretty md:text-[26px] lg:text-[30px]">
            <Titulo t={agenda.titulo} destaqueClasse="text-white" />
          </h2>
          <p className="text-[14px] leading-[1.7] text-black/80 md:text-[15px]">{agenda.subtitulo}</p>
          <Button variant="cta-green" size="xl" onClick={irAoFormulario} className="mt-3 h-12 w-full rounded-full text-[12px] shadow-[0_16px_40px_rgba(0,0,0,0.25)] sm:w-auto md:px-8 md:text-[13px]">
            {agenda.cta.toUpperCase()}
          </Button>
        </div>

        <div className="flex flex-col">
          {agenda.itens.map((item, i) => (
            <div key={item.titulo} className="grid grid-cols-[36px_minmax(0,1fr)] items-start gap-5 border-t border-black/25 py-6 last:border-b md:grid-cols-[52px_minmax(0,1fr)] md:gap-8 md:py-9">
              <span className="font-display text-[15px] font-extrabold text-black/70 md:text-[17px]">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-[16px] font-bold md:text-[18px]">{item.titulo}</h3>
                {item.descricao && <p className="text-[14px] leading-[1.7] text-black/80 md:text-[15px]">{item.descricao}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
