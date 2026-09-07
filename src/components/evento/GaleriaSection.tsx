"use client";

import type { EventoConfig } from "@/eventos/tipos";
import { CircularGallery } from "@/components/ui/circular-gallery";
import { Titulo } from "./Titulo";

/** Projetos reais da YouCon num anel 3D: gira sozinho enquanto está na tela, segue a rolagem e aceita arrastar. */
export function GaleriaSection({ galeria }: { galeria: NonNullable<EventoConfig["galeria"]> }) {
  return (
    <section className="relative overflow-hidden border-y border-border bg-section-alt py-16 md:py-24 lg:py-28">
      <div className="px-6 md:px-12 lg:px-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-primary md:text-[11px]">Galeria de projetos YouCon</span>
          <h2 className="font-display text-[24px] font-extrabold leading-[1.12] tracking-[-0.025em] text-foreground text-pretty md:text-[32px] lg:text-[38px]">
            <Titulo t={galeria.titulo} />
          </h2>
          <div className="space-y-3 text-[14px] leading-relaxed text-muted-foreground md:text-[15px] lg:text-base">
            {galeria.paragrafos.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </div>

      {/* O anel sai da margem: as fotos das laterais passam da borda da tela de propósito */}
      <CircularGallery items={galeria.itens} className="mt-10 h-[380px] sm:h-[520px] md:mt-14 lg:h-[560px]" />

      <div className="px-6 md:px-12 lg:px-16">
        <p className="text-center text-[11px] text-muted-foreground md:text-xs">Arraste ou role a página para girar a galeria</p>
        <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-1.5 text-center md:mt-12">
          {galeria.fecho.map((linha, i) => (
            <p key={linha} className={`font-display text-[11px] font-bold uppercase tracking-[0.18em] md:text-sm md:tracking-[0.2em] ${i === 0 ? "text-foreground" : "text-muted-foreground"}`}>{linha}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
