"use client";

import type { EventoConfig } from "@/eventos/tipos";
import { CircularGallery } from "@/components/ui/circular-gallery";
import { Titulo } from "./Titulo";

/** Projetos reais da YouCon num anel 3D: gira sozinho enquanto está na tela, segue a rolagem e aceita arrastar. */
export function GaleriaSection({ galeria }: { galeria: NonNullable<EventoConfig["galeria"]> }) {
  return (
    <section className="relative overflow-hidden border-y border-border bg-section-alt py-20 md:py-28 lg:py-32">
      <div className="px-6 md:px-10 lg:px-12">
        <div className="mx-auto flex max-w-[560px] flex-col items-center gap-5 text-center">
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Galeria de projetos YouCon</span>
          <h2 className="font-display text-[22px] font-extrabold leading-[1.15] tracking-[-0.025em] text-foreground text-pretty md:text-[26px] lg:text-[30px]">
            <Titulo t={galeria.titulo} />
          </h2>
          <div className="space-y-3 text-[14px] leading-[1.7] text-muted-foreground md:text-[15px]">
            {galeria.paragrafos.map((p) => <p key={p}>{p}</p>)}
          </div>
          <p className="text-[14px] font-semibold text-foreground md:text-[15px]">{galeria.chamada}</p>
        </div>
      </div>

      {/* O anel sai da margem: as fotos das laterais passam da borda da tela de propósito */}
      <CircularGallery items={galeria.itens} className="mt-12 h-[360px] sm:h-[480px] md:mt-16 lg:h-[520px]" />

      <div className="px-6 md:px-10 lg:px-12">
        <p className="text-center text-[11px] text-muted-foreground">Arraste ou role a página para girar a galeria</p>
        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-2 text-center md:mt-14">
          {galeria.fecho.map((linha, i) => (
            <p key={linha} className={`font-display text-[11px] font-bold uppercase tracking-[0.18em] md:text-[13px] md:tracking-[0.2em] ${i === 0 ? "text-foreground" : "text-muted-foreground"}`}>{linha}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
