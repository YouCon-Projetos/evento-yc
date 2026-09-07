"use client";

import { useRef } from "react";
import { Images } from "lucide-react";
import type { EventoConfig } from "@/eventos/tipos";
import { CircularGallery } from "@/components/ui/circular-gallery";
import { Titulo } from "./Titulo";

/**
 * Projetos reais da YouCon num anel 3D. Como na referência, a galeria fica
 * presa na tela (sticky) enquanto o visitante rola um trilho de 300vh, e essa
 * rolagem dá uma volta completa no anel; parado, ele gira sozinho e aceita arrastar.
 */
export function GaleriaSection({ galeria }: { galeria: NonNullable<EventoConfig["galeria"]> }) {
  const trilhoRef = useRef<HTMLDivElement>(null);
  return (
    <section className="relative bg-section-alt pt-10 md:pt-16 lg:pt-20">
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-2.5 text-base font-bold text-foreground sm:text-lg md:mb-5 md:text-2xl lg:text-[1.75rem]"><Titulo t={galeria.titulo} /></h2>
          <div className="space-y-3 text-[13px] leading-relaxed text-muted-foreground md:space-y-4 md:text-[15px] lg:text-base">
            {galeria.paragrafos.map((p) => <p key={p}>{p}</p>)}
          </div>
          <p className="mt-4 text-[13px] font-semibold text-foreground md:mt-6 md:text-[15px]">{galeria.chamada}</p>
        </div>
      </div>

      {/* Trilho alto: a cena fica fixa na tela enquanto ele passa */}
      <div ref={trilhoRef} className="relative h-[260vh] md:h-[300vh]">
        <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
          <div className="absolute top-20 z-10 text-center md:top-24">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary md:px-4 md:text-xs">
              <Images className="h-3.5 w-3.5" />
              Galeria de projetos YouCon
            </span>
            <p className="mt-2 text-[11px] text-muted-foreground md:text-xs">Role a página para girar a galeria</p>
          </div>
          <CircularGallery items={galeria.itens} trilhoRef={trilhoRef} className="h-full" />
        </div>
      </div>

      <div className="container relative mx-auto px-4 pb-10 md:px-6 md:pb-16 lg:pb-20">
        <div className="mx-auto max-w-2xl text-center">
          {galeria.fecho.map((linha) => (
            <p key={linha} className="text-[11px] font-bold uppercase tracking-[0.12em] text-foreground md:text-base md:tracking-[0.18em]">{linha}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
