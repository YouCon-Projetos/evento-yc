"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type GalleryItem = {
  nome: string;
  legenda: string;
  foto: string;
  alt: string;
  /** object-position da foto, ex.: "50% 30%" */
  posicao?: string;
};

type Props = HTMLAttributes<HTMLDivElement> & {
  items: GalleryItem[];
  /** Graus por quadro quando ninguém interage. */
  velocidade?: number;
  /**
   * Bloco alto que envolve a galeria fixa (sticky). O progresso da rolagem
   * dentro dele vira uma volta completa do anel, como na referência.
   */
  trilhoRef?: React.RefObject<HTMLElement | null>;
};

/** Cartão e raio por largura de tela: no celular o anel encolhe para caber. */
function medidas(largura: number, n: number) {
  const estreito = largura < 640;
  const cardW = estreito ? 200 : 300;
  const cardH = estreito ? 280 : 400;
  // Raio mínimo para os cartões não se sobreporem no anel, com folga de 25%
  const raio = Math.max(estreito ? 300 : 520, (n * cardW * 1.25) / (2 * Math.PI));
  return { cardW, cardH, raio };
}

/**
 * Galeria 3D em anel: os cartões ficam num cilindro que gira sozinho, acompanha a
 * rolagem da página e pode ser arrastado. Tudo é escrito direto no DOM a cada
 * quadro (sem re-render): um transform no anel e a opacidade de cada cartão.
 */
export function CircularGallery({ items, velocidade = 0.06, trilhoRef, className, ...props }: Props) {
  const anelRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  // rot = base (rolagem) + deriva (giro automático e arrasto)
  const estado = useRef({ base: 0, deriva: 0, inercia: 0, pausado: false, arrastando: false, rolando: false, ultimoX: 0, ultimoScroll: 0, timer: 0 });

  useEffect(() => {
    const anel = anelRef.current;
    if (!anel) return;
    const e = estado.current;
    const n = items.length;
    const passo = 360 / n;
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const aplicarMedidas = () => {
      const { cardW, cardH, raio } = medidas(window.innerWidth, n);
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        card.style.width = `${cardW}px`;
        card.style.height = `${cardH}px`;
        card.style.marginLeft = `${-cardW / 2}px`;
        card.style.marginTop = `${-cardH / 2}px`;
        card.style.transform = `rotateY(${i * passo}deg) translateZ(${raio}px)`;
      });
    };

    const desenhar = () => {
      const rot = e.base + e.deriva;
      anel.style.transform = `rotateY(${rot}deg)`;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        // Ângulo do cartão em relação à frente (0 = de frente, 180 = atrás)
        const rel = (((i * passo + rot) % 360) + 360) % 360;
        const frente = rel > 180 ? 360 - rel : rel;
        card.style.opacity = String(Math.max(0.35, 1 - frente / 200));
      });
    };

    let raf = 0;
    const loop = () => {
      if (!e.arrastando) {
        if (Math.abs(e.inercia) > 0.01) {
          e.deriva += e.inercia;
          e.inercia *= 0.94;
        } else if (!e.pausado && !e.rolando && !reduz) {
          e.deriva += velocidade;
        }
      }
      desenhar();
      raf = requestAnimationFrame(loop);
    };

    // Rolagem: com trilho, o progresso dentro dele vira uma volta inteira (360°);
    // sem trilho, cada pixel rolado dá um empurrão. Enquanto rola, o giro
    // automático pausa (como na referência) e volta 150 ms depois.
    e.ultimoScroll = window.scrollY;
    const onScroll = () => {
      const trilho = trilhoRef?.current;
      if (trilho) {
        const r = trilho.getBoundingClientRect();
        const curso = r.height - window.innerHeight;
        const progresso = curso > 0 ? Math.min(1, Math.max(0, -r.top / curso)) : 0;
        e.base = progresso * 360;
      } else {
        e.base += (window.scrollY - e.ultimoScroll) * 0.06;
      }
      e.ultimoScroll = window.scrollY;
      e.rolando = true;
      window.clearTimeout(e.timer);
      e.timer = window.setTimeout(() => { e.rolando = false; }, 150);
    };

    aplicarMedidas();
    onScroll();
    e.rolando = false;
    desenhar();
    raf = requestAnimationFrame(loop);
    window.addEventListener("resize", aplicarMedidas);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(e.timer);
      window.removeEventListener("resize", aplicarMedidas);
      window.removeEventListener("scroll", onScroll);
    };
  }, [items.length, velocidade, trilhoRef]);

  const e = estado.current;
  const onPointerDown = (ev: React.PointerEvent<HTMLDivElement>) => {
    e.arrastando = true;
    e.inercia = 0;
    e.ultimoX = ev.clientX;
    ev.currentTarget.setPointerCapture(ev.pointerId);
  };
  const onPointerMove = (ev: React.PointerEvent<HTMLDivElement>) => {
    if (!e.arrastando) return;
    const dx = ev.clientX - e.ultimoX;
    e.ultimoX = ev.clientX;
    e.deriva += dx * 0.25;
    e.inercia = dx * 0.25;
  };
  const soltar = () => {
    e.arrastando = false;
  };

  return (
    <div
      role="region"
      aria-label="Galeria de projetos"
      className={cn("relative w-full cursor-grab select-none active:cursor-grabbing", className)}
      style={{ perspective: "1800px", touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={soltar}
      onPointerCancel={soltar}
      onPointerLeave={() => { soltar(); e.pausado = false; }}
      onPointerEnter={() => { e.pausado = true; }}
      {...props}
    >
      <div ref={anelRef} className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
        {items.map((item, i) => (
          <div
            key={item.foto + i}
            ref={(el) => { cardRefs.current[i] = el; }}
            role="group"
            aria-label={item.nome}
            className="absolute left-1/2 top-1/2 w-[300px] h-[400px] -ml-[150px] -mt-[200px]"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-card shadow-2xl shadow-black/60 md:rounded-2xl">
              <Image
                src={item.foto}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 200px, 300px"
                draggable={false}
                className="object-cover"
                style={{ objectPosition: item.posicao ?? "center" }}
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 text-white md:p-4">
                <h3 className="text-sm font-bold leading-tight md:text-base">{item.nome}</h3>
                <p className="mt-1 text-[11px] text-white/75 md:text-xs">{item.legenda}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
