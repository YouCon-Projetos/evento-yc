import type { EventoConfig } from "@/eventos/tipos";
import { Titulo } from "../Titulo";
import { FundoParallax } from "./FundoParallax";

/**
 * Para quem é: grade dividida por fios sobre uma foto de projeto que anda em
 * parallax. Os cartões são translúcidos para a imagem aparecer entre eles sem
 * atrapalhar a leitura.
 */
export function AudienceSection({ publico }: { publico: NonNullable<EventoConfig["publico"]> }) {
  const comFoto = Boolean(publico.imagemFundo);

  return (
    <section className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28 lg:px-12 lg:py-36">
      {publico.imagemFundo && <FundoParallax src={publico.imagemFundo} />}

      <div className="relative mx-auto w-full max-w-[1180px]">
        <div className="mb-10 grid grid-cols-1 gap-5 md:mb-16 md:grid-cols-2 md:items-end md:gap-20">
          <h2 className="font-display text-[22px] font-extrabold leading-[1.15] tracking-[-0.025em] text-foreground text-pretty md:text-[26px] lg:text-[30px]">
            <Titulo t={publico.titulo} />
          </h2>
          <p className="text-[14px] leading-[1.7] text-muted-foreground md:text-[15px]">{publico.subtitulo}</p>
        </div>

        <div className={`grid grid-cols-1 gap-px border sm:grid-cols-2 ${comFoto ? "border-white/12 bg-white/12" : "border-border bg-border"}`}>
          {publico.itens.map((p, i) => (
            <div
              key={p.titulo}
              className={`flex flex-col gap-3 p-6 md:p-10 ${comFoto ? "bg-background/70 backdrop-blur-md" : "bg-background"}`}
            >
              <span className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-[16px] font-bold text-foreground md:text-[18px]">{p.titulo}</h3>
              <p className="text-[14px] leading-[1.7] text-muted-foreground md:text-[15px]">{p.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
