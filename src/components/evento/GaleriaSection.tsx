"use client";

import { Images } from "lucide-react";
import type { EventoConfig } from "@/eventos/tipos";
import { CircularGallery } from "@/components/ui/circular-gallery";
import { Titulo } from "./Titulo";

/** Projetos reais da YouCon num anel 3D: gira sozinho enquanto está na tela, segue a rolagem e aceita arrastar. */
export function GaleriaSection({ galeria }: { galeria: NonNullable<EventoConfig["galeria"]> }) {
  return (
    <section className="relative overflow-hidden bg-section-alt py-10 md:py-16 lg:py-20">
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto mb-2 max-w-3xl text-center md:mb-4">
          <h2 className="mb-2.5 text-base font-bold text-foreground sm:text-lg md:mb-5 md:text-2xl lg:text-[1.75rem]"><Titulo t={galeria.titulo} /></h2>
          <div className="space-y-3 text-[13px] leading-relaxed text-muted-foreground md:space-y-4 md:text-[15px] lg:text-base">
            {galeria.paragrafos.map((p) => <p key={p}>{p}</p>)}
          </div>
          <p className="mt-4 text-[13px] font-semibold text-foreground md:mt-6 md:text-[15px]">{galeria.chamada}</p>
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary md:mt-5 md:px-4 md:text-xs">
            <Images className="h-3.5 w-3.5" />
            Galeria de projetos YouCon
          </span>
        </div>
      </div>

      {/* O anel sai do container: as fotos das laterais passam da borda da tela de propósito */}
      <CircularGallery items={galeria.itens} className="h-[400px] sm:h-[560px] lg:h-[600px]" />

      <div className="container relative mx-auto px-4 md:px-6">
        <p className="text-center text-[11px] text-muted-foreground md:text-xs">Arraste ou role a página para girar a galeria</p>
        <div className="mx-auto mt-6 max-w-2xl text-center md:mt-10">
          {galeria.fecho.map((linha) => (
            <p key={linha} className="text-[11px] font-bold uppercase tracking-[0.12em] text-foreground md:text-base md:tracking-[0.18em]">{linha}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
