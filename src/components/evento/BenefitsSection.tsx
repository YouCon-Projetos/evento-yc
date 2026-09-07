import type { EventoConfig } from "@/eventos/tipos";
import { Icone } from "./Icone";
import { Titulo } from "./Titulo";
import { VideoPlayer } from "./VideoPlayer";
import { ComparisonChart } from "./ComparisonChart";

type Props = { beneficios: EventoConfig["beneficios"]; video?: EventoConfig["video"]; grafico?: boolean };

export function BenefitsSection({ beneficios, video, grafico }: Props) {
  return (
    <section className="relative py-10 md:py-16 lg:py-20">
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto mb-6 max-w-3xl text-center md:mb-16">
          <h2 className="mb-2.5 text-base font-bold text-foreground sm:text-lg md:mb-5 md:text-2xl lg:text-[1.75rem]"><Titulo t={beneficios.titulo} /></h2>
          {beneficios.subtitulo && (
            <div className="space-y-3 text-[13px] leading-relaxed text-muted-foreground md:space-y-4 md:text-[15px] lg:text-base">
              {(Array.isArray(beneficios.subtitulo) ? beneficios.subtitulo : [beneficios.subtitulo]).map((p) => <p key={p}>{p}</p>)}
            </div>
          )}
        </div>

        {video && (
          <div className={`mb-10 md:mb-16 ${grafico ? "grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-start lg:gap-8" : ""}`}>
            <VideoPlayer {...video} />
            {grafico && <ComparisonChart />}
          </div>
        )}

        {beneficios.tituloItens && (
          <h3 className="mb-6 text-center text-[15px] font-bold uppercase tracking-wider text-foreground md:mb-10 md:text-lg">{beneficios.tituloItens}</h3>
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 lg:gap-8">
          {beneficios.itens.map((b) => (
            <div key={b.titulo} className="group rounded-xl border border-border bg-card p-5 transition-all duration-500 hover:border-primary/50 md:rounded-2xl md:p-6">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20 md:mb-4 md:h-12 md:w-12 md:rounded-xl">
                <Icone nome={b.icone} className="h-4 w-4 text-primary md:h-6 md:w-6" strokeWidth={1.75} />
              </div>
              <h3 className="mb-2 text-[15px] font-bold text-foreground md:mb-2.5 md:text-base">{b.titulo}</h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground md:text-sm">{b.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
