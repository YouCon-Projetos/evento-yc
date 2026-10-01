"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Volume2 } from "lucide-react";

type Props = { src: string | null; poster: string | null; legenda?: string };

/**
 * VSL vertical do hero. Toca sozinha, muda e em laço, que é o que os
 * navegadores permitem sem gesto do visitante. O convite visível é para
 * ligar o som: ao aceitar, o vídeo recomeça do zero, sai do laço e passa a
 * mostrar os controles nativos. Sem src, mostra o aviso de "em breve".
 */
export function HeroVideo({ src, poster, legenda }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [comSom, setComSom] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // O atributo precisa estar valendo antes do play, senão a política de
    // autoplay recusa e o vídeo fica parado no pôster.
    v.muted = true;
    v.play().catch(() => {
      /* bloqueado mesmo assim: fica o pôster, e o botão continua servindo */
    });
  }, []);

  const ligarSom = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    v.loop = false;
    v.currentTime = 0;
    v.play().catch(() => {});
    setComSom(true);
  };

  return (
    <div className="relative mx-auto w-full max-w-[240px] overflow-hidden rounded-[1.5rem] border border-white/15 shadow-[0_40px_80px_rgba(0,0,0,0.6)] sm:max-w-[260px] lg:max-w-[270px]">
      <div className="relative aspect-[9/16] bg-card">
        {src ? (
          <>
            <video
              ref={ref}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              controls={comSom}
              poster={poster ?? undefined}
              className="h-full w-full object-cover"
            >
              <source src={src} type="video/mp4" />
              Seu navegador não suporta a reprodução de vídeo.
            </video>

            {!comSom && (
              <button
                type="button"
                aria-label="Ouvir o vídeo com som, desde o começo"
                onClick={ligarSom}
                className="group absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/75 via-transparent to-black/25"
              >
                <span className="relative flex h-14 w-14 items-center justify-center md:h-16 md:w-16">
                  <span className="absolute inset-0 rounded-full bg-primary/40 motion-safe:animate-ping" aria-hidden="true" />
                  <span className="bg-orange-gradient glow-box relative flex h-full w-full items-center justify-center rounded-full ring-2 ring-white/25 transition-transform duration-300 group-hover:scale-105">
                    <Volume2 className="h-6 w-6 text-white md:h-7 md:w-7" strokeWidth={2.2} />
                  </span>
                </span>
                <span className="mt-3 rounded-full bg-black/55 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                  Ouvir com som
                </span>
                {legenda && (
                  <span className="absolute inset-x-4 bottom-4 text-left font-display text-sm font-bold leading-snug text-white drop-shadow">
                    {legenda}
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
