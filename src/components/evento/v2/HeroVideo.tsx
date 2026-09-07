"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

type Props = { src: string | null; poster: string | null; legenda?: string };

/**
 * VSL vertical do hero (v2). Sem autoplay: o convite é o botão grande sobre o
 * pôster, que some no primeiro play e dá lugar aos controles nativos.
 */
export function HeroVideo({ src, poster, legenda }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [tocou, setTocou] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-[260px] overflow-hidden rounded-[1.5rem] border border-white/15 shadow-[0_40px_80px_rgba(0,0,0,0.6)] sm:max-w-[280px] lg:max-w-[300px]">
      <div className="relative aspect-[9/16] bg-card">
        {src ? (
          <>
            <video
              ref={ref}
              controls
              playsInline
              preload="metadata"
              poster={poster ?? undefined}
              onPlay={() => setTocou(true)}
              className="h-full w-full object-cover"
            >
              <source src={src} type="video/mp4" />
              Seu navegador não suporta a reprodução de vídeo.
            </video>
            {!tocou && (
              <button
                type="button"
                aria-label="Reproduzir vídeo"
                onClick={() => ref.current?.play()}
                className="group absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/75 via-black/10 to-black/30"
              >
                <span className="relative flex h-16 w-16 items-center justify-center md:h-[72px] md:w-[72px]">
                  <span className="absolute inset-0 rounded-full bg-primary/40 motion-safe:animate-ping" aria-hidden="true" />
                  <span className="bg-orange-gradient glow-box relative flex h-full w-full items-center justify-center rounded-full ring-2 ring-white/25 transition-transform duration-300 group-hover:scale-105">
                    <Play className="ml-1 h-7 w-7 text-white md:h-8 md:w-8" fill="currentColor" strokeWidth={0} />
                  </span>
                </span>
                {legenda && (
                  <span className="absolute inset-x-4 bottom-4 flex flex-col gap-1 text-left">
                    <span className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Assista</span>
                    <span className="font-display text-sm font-bold leading-snug text-white drop-shadow md:text-[15px]">{legenda}</span>
                  </span>
                )}
              </button>
            )}
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-card to-background px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
              <Play className="ml-0.5 h-6 w-6 text-primary" fill="currentColor" />
            </div>
            <p className="text-[13px] font-semibold text-foreground">Vídeo em breve</p>
          </div>
        )}
      </div>
    </div>
  );
}
