"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/** Deslocamento total da foto entre entrar e sair da tela, em px. */
const AMPLITUDE = 140;

/**
 * Foto de fundo de uma seção, com parallax medido pela posição da própria
 * seção na tela (e não pelo scroll da página, que só serve no topo). A foto é
 * mais alta que o bloco para o deslocamento nunca mostrar a borda; quem pede
 * menos movimento recebe a imagem parada.
 */
export function FundoParallax({ src, veu = "bg-background/82" }: { src: string; veu?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const secao = el?.parentElement?.parentElement;
    if (!el || !secao) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Medida direta no evento, como no hero: é um rect e um transform por
    // quadro. Com requestAnimationFrame o valor congelaria enquanto a aba
    // estivesse em segundo plano.
    const medir = () => {
      const r = secao.getBoundingClientRect();
      const curso = window.innerHeight + r.height;
      const progresso = Math.min(1, Math.max(0, (window.innerHeight - r.top) / curso));
      el.style.transform = `translate3d(0, ${(progresso - 0.5) * AMPLITUDE}px, 0)`;
    };

    medir();
    window.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    return () => {
      window.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div ref={ref} className="absolute inset-x-0 -top-[70px] -bottom-[70px] will-change-transform">
        <Image src={src} alt="" fill sizes="100vw" className="object-cover object-center" />
      </div>
      <div className={`absolute inset-0 ${veu}`} />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
    </div>
  );
}
