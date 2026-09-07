"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOGO_YOUCON } from "@/lib/midia";
import type { EventoConfig } from "@/eventos/tipos";
import { Titulo } from "../Titulo";
import { HeroVideo } from "./HeroVideo";

const irAoFormulario = () => document.getElementById("cta-section")?.scrollIntoView({ behavior: "smooth" });

type Props = { hero: EventoConfig["hero"]; tema: EventoConfig["tema"]; video?: EventoConfig["video"]; quando: string };

/**
 * Hero assimétrico: texto à esquerda, VSL vertical à direita e a foto sangrando
 * pela borda direita. No celular a foto volta a cobrir a tela inteira, porque
 * não há largura para o deslocamento.
 */
export function HeroSection({ hero, tema, video, quando }: Props) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)");
    const parallax = () => {
      if (!bgRef.current || reduz.matches) return;
      bgRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.25}px, 0)`;
    };
    parallax();
    window.addEventListener("scroll", parallax, { passive: true });
    return () => window.removeEventListener("scroll", parallax);
  }, []);

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col overflow-hidden pb-14 md:min-h-[calc(100vh-3.5rem)] md:pb-20">
      <div className="absolute inset-0 overflow-hidden">
        <div ref={bgRef} className="absolute inset-0 will-change-transform">
          <Image src={hero.imagemMobile} alt="" fill priority sizes="100vw" className="scale-110 object-cover md:hidden" />
          <Image src={hero.imagemDesktop} alt="" fill priority sizes="100vw" className="hidden object-cover object-[72%_45%] md:block" />
        </div>
        <div className="absolute inset-0 bg-black/55 md:hidden" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background md:hidden" />
        {/* O texto ocupa o terço esquerdo: preto sólido até lá, depois a foto aparece */}
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,hsl(0_0%_0%)_0%,hsl(0_0%_0%)_31%,hsl(0_0%_0%/0.7)_49%,hsl(0_0%_0%/0.22)_74%,hsl(0_0%_0%/0.4)_100%)] md:block" />
        <div className="absolute inset-0 hidden bg-gradient-to-b from-black/35 via-transparent to-background md:block" />
      </div>

      <header className="relative z-20 px-6 py-6 md:px-10 md:py-8 lg:px-12">
        <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between">
          <Image src={LOGO_YOUCON} alt="YouCon Arquitetura" width={192} height={48} priority className="h-6 w-auto md:h-8" />
          <div className="hidden items-center gap-2.5 rounded-full border border-white/15 bg-black/30 px-3.5 py-1.5 backdrop-blur-sm md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
            <span className="font-display text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground">{quando}</span>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex flex-1 items-center px-6 pt-8 md:px-10 md:pt-0 lg:px-12">
        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-12 md:grid-cols-[minmax(0,1fr)_270px] md:gap-14 lg:gap-20">
          <div className="flex flex-col items-start gap-6 md:gap-7">
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-primary">{hero.tag}</span>

            <h1 className="font-display max-w-[20rem] text-[28px] font-extrabold leading-[1.08] tracking-[-0.03em] text-foreground text-pretty sm:max-w-[28rem] sm:text-[34px] md:max-w-[26rem] md:text-[34px] lg:max-w-[32rem] lg:text-[40px] xl:max-w-[36rem] xl:text-[44px]">
              <Titulo t={hero.titulo} />
            </h1>

            <p className="max-w-[30rem] text-[14px] leading-[1.7] text-[#cfcfcf] md:text-[15px]">
              {hero.subtitulo.map((p, i) => (
                <span key={i} className={p.forte ? "font-semibold text-foreground" : p.destaque ? "font-semibold text-primary" : undefined}>
                  {p.texto}
                </span>
              ))}
            </p>

            {/* No celular o vídeo entra antes do botão: assistir vem antes de decidir */}
            {video && (
              <div className="w-full md:hidden">
                <HeroVideo {...video} />
              </div>
            )}

            <div className="mt-1 flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Button
                variant={tema === "verde" ? "cta-green" : "hero"}
                size="xl"
                onClick={irAoFormulario}
                className="h-12 w-full rounded-full text-[12px] sm:w-auto md:px-8 md:text-[13px]"
              >
                {hero.cta.toUpperCase()}
              </Button>

              <div className="flex flex-col gap-1">
                {hero.provaSocial && (
                  <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-primary">
                    <Users className="h-3.5 w-3.5" />
                    {hero.provaSocial}
                  </span>
                )}
                {hero.rodape && <span className="text-[12px] text-muted-foreground">{hero.rodape}</span>}
              </div>
            </div>
          </div>

          {video && (
            <div className="hidden md:block">
              <HeroVideo {...video} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
