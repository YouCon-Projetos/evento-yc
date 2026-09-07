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
};

/** Profundidade da cena. O mesmo valor vai no `perspective` do container. */
const PERSPECTIVA = 2000;

/**
 * Medidas do anel para a altura disponível. A perspectiva amplia o cartão da
 * frente (escala = P / (P - raio)), então o cartão é dimensionado a partir da
 * altura JÁ ampliada — senão ele transborda a seção e cobre o que vem depois.
 */
function medidas(largura: number, altura: number, n: number) {
  const estreito = largura < 640;
  const raio = estreito ? 340 : 600;
  const escala = PERSPECTIVA / (PERSPECTIVA - raio);
  const cardH = Math.min(estreito ? 300 : 380, (altura * 0.9) / escala);
  const cardW = Math.round(cardH * 0.75);
  return { cardW, cardH: Math.round(cardH), raio };
}

/**
 * Galeria 3D em anel: os cartões ficam num cilindro que gira sozinho, acompanha a
 * rolagem da página e pode ser arrastado. Tudo é escrito direto no DOM a cada
 * quadro (sem re-render): um transform no anel e a opacidade de cada cartão.
 */
export function CircularGallery({ items, velocidade = 0.06, className, ...props }: Props) {
  const anelRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  // rot = base (rolagem) + deriva (giro automático e arrasto)
  const estado = useRef({ base: 0, deriva: 0, inercia: 0, pausado: false, arrastando: false, rolando: false, visivel: false, ultimoX: 0, ultimoScroll: 0, timer: 0 });

  useEffect(() => {
    const anel = anelRef.current;
    if (!anel) return;
    const e = estado.current;
    const n = items.length;
    const passo = 360 / n;
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const aplicarMedidas = () => {
      const { cardW, cardH, raio } = medidas(window.innerWidth, anel.clientHeight, n);
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
        // Os de trás continuam visíveis, só mais apagados (como na referência)
        card.style.opacity = String(Math.max(0.3, 1 - frente / 180));
        // Passado o perfil, o cartão está de costas: o conteúdo vira junto, senão
        // a foto e a legenda apareceriam espelhadas. A troca acontece quando ele
        // está de lado, com largura quase nula, então não se vê o corte.
        const conteudo = card.firstElementChild as HTMLElement | null;
        if (conteudo) conteudo.style.transform = frente > 90 ? "rotateY(180deg)" : "";
      });
    };

    let raf = 0;
    const loop = () => {
      if (!e.arrastando) {
        if (Math.abs(e.inercia) > 0.01) {
          e.deriva += e.inercia;
          e.inercia *= 0.94;
        } else if (e.visivel && !e.pausado && !e.rolando && !reduz) {
          e.deriva += velocidade;
        }
      }
      desenhar();
      raf = requestAnimationFrame(loop);
    };

    // Cada pixel rolado dá um empurrão no anel. Enquanto rola, o giro
    // automático pausa (como na referência) e volta 150 ms depois.
    e.ultimoScroll = window.scrollY;
    const onScroll = () => {
      e.base += (window.scrollY - e.ultimoScroll) * 0.06;
      e.ultimoScroll = window.scrollY;
      e.rolando = true;
      window.clearTimeout(e.timer);
      e.timer = window.setTimeout(() => { e.rolando = false; }, 150);
    };

    // Fora da tela o anel fica parado: girar sem ninguém ver só gasta bateria
    const obs = new IntersectionObserver(([entry]) => { e.visivel = entry.isIntersecting; }, { threshold: 0.2 });
    obs.observe(anel);

    aplicarMedidas();
    onScroll();
    e.rolando = false;
    desenhar();
    raf = requestAnimationFrame(loop);
    window.addEventListener("resize", aplicarMedidas);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
      window.clearTimeout(e.timer);
      window.removeEventListener("resize", aplicarMedidas);
      window.removeEventListener("scroll", onScroll);
    };
  }, [items.length, velocidade]);

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
  // Só o mouse pausa o giro: no toque o pointerleave costuma não chegar depois
  // do setPointerCapture, e a galeria ficaria parada para sempre.
  const entrou = (ev: React.PointerEvent<HTMLDivElement>) => {
    if (ev.pointerType === "mouse") e.pausado = true;
  };

  return (
    <div
      role="region"
      aria-label="Galeria de projetos"
      className={cn("relative w-full cursor-grab select-none active:cursor-grabbing", className)}
      style={{ perspective: `${PERSPECTIVA}px`, touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={soltar}
      onPointerCancel={() => { soltar(); e.pausado = false; }}
      onPointerLeave={() => { soltar(); e.pausado = false; }}
      onPointerEnter={entrou}
      {...props}
    >
      <div ref={anelRef} className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
        {items.map((item, i) => (
          <div
            key={item.foto + i}
            ref={(el) => { cardRefs.current[i] = el; }}
            role="group"
            aria-label={item.nome}
            className="absolute left-1/2 top-1/2 h-[380px] w-[285px]"
          >
            <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-card shadow-2xl shadow-black/60 md:rounded-2xl">
              <Image
                src={item.foto}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 220px, 290px"
                draggable={false}
                className="object-cover"
                style={{ objectPosition: item.posicao ?? "center" }}
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 text-white md:p-4">
                <h3 className="text-[13px] font-bold leading-tight md:text-[15px]">{item.nome}</h3>
                <p className="mt-1 text-[11px] text-white/75">{item.legenda}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
