"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, SlidersHorizontal } from "lucide-react";

const STORAGE_KEY = "yc_consent";
const POLITICA = "https://www.youconprojetos.com.br/politica-de-privacidade";

/**
 * Grava a escolha no mesmo formato do site principal (yc_consent) e avisa o
 * pixel, que liga na hora sem recarregar a página.
 */
function gravarEscolha(marketing: boolean) {
  const estado = marketing ? "granted" : "denied";
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ad_storage: estado, ad_user_data: estado, ad_personalization: estado }),
    );
  } catch {}
  window.dispatchEvent(new Event("yc:consentimento"));
}

/**
 * Desenho de carimbo de prancha, igual ao do site principal. Aqui só muda o que
 * o site de eventos não tem: text-xs no lugar de tipo-legenda e text-primary no
 * lugar de text-brand-orange.
 */
const LINHA = "border-white/[0.14]";
const ROTULO = "text-[9px] font-semibold uppercase leading-3 tracking-[0.12em] text-foreground/60";
const VALOR = "mt-0.5 text-xs font-semibold leading-4 text-foreground/95";
const TEXTO = "mt-0.5 text-xs leading-relaxed text-foreground/80";
const BOTAO =
  "flex h-11 items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors md:h-9";
const NEUTRO = `${BOTAO} text-foreground/90 hover:bg-white/[0.06]`;
const PRINCIPAL = `${BOTAO} bg-gradient-brand text-white hover:brightness-110`;

function Simbolo() {
  return (
    <div className="flex items-center justify-center">
      <img src="/simbolo-youcon.svg" alt="" className="h-5 w-auto" />
    </div>
  );
}

function Chave({
  rotulo,
  ligada,
  onChange,
}: {
  rotulo: string;
  ligada: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={ligada}
      aria-label={rotulo}
      onClick={() => onChange(!ligada)}
      className={`flex h-7 w-[46px] items-center rounded-full p-[3px] transition-colors ${
        ligada ? "justify-end bg-gradient-brand" : "justify-start bg-white/[0.18]"
      }`}
    >
      <span className="h-[22px] w-[22px] rounded-full bg-white shadow" />
    </button>
  );
}

/**
 * Banner de cookies do site de eventos. Só existe uma categoria não essencial,
 * Marketing (o Meta Pixel), então não há linha de estatísticas: o site não usa
 * Google Analytics nem GTM. Marketing vem desmarcado: consentimento é um toque.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [ads, setAds] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const decide = (marketing: boolean) => {
    gravarEscolha(marketing);
    setVisible(false);
  };

  const categorias = [
    { nome: "Essenciais", texto: "Necessários para o site funcionar.", chave: null },
    {
      nome: "Marketing",
      texto: "Anúncios no Meta (Facebook e Instagram).",
      chave: { ligada: ads, onChange: setAds },
    },
  ];

  return (
    // Não bloqueia a página: cartão no canto (no celular, faixa com margem)
    <section
      aria-label={showPrefs ? "Personalizar cookies" : "Cookies"}
      className="fixed inset-x-3 bottom-3 z-[70] border border-white/[0.16] bg-black/50 text-foreground shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl md:inset-x-auto md:bottom-6 md:left-6 md:w-[380px]"
    >
      {!showPrefs ? (
        <>
          {/* No celular, compacto: o símbolo ao lado da nota. No computador, o carimbo inteiro. */}
          <div className="grid grid-cols-[44px_minmax(0,1fr)]">
            <Simbolo />
            <div className={`border-l ${LINHA} px-3 py-2 md:py-1.5`}>
              <p className={`hidden md:block ${ROTULO}`}>Projeto</p>
              <p className={`hidden md:block ${VALOR}`}>Cookies deste site</p>
              <p className={`${TEXTO} md:hidden`}>
                Usamos cookies para medir o uso do site e melhorar nossas campanhas.{" "}
                <a href={POLITICA} className="font-semibold text-primary hover:underline">
                  Política de Privacidade
                </a>
              </p>
            </div>
          </div>

          <div className={`hidden border-t ${LINHA} px-3 pb-2 pt-1.5 md:block`}>
            <p className={ROTULO}>Nota</p>
            <p className={TEXTO}>
              Usamos cookies para medir o uso do site e melhorar nossas campanhas.{" "}
              <a href={POLITICA} className="font-semibold text-primary hover:underline">
                Política de Privacidade
              </a>
            </p>
          </div>

          {/* No celular: ajustes | recusar | aceitar (aceitar sob o polegar);
              no computador: aceitar | recusar | personalizar */}
          <div
            className={`grid grid-cols-[44px_minmax(0,1fr)_minmax(0,1fr)] border-t ${LINHA} md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)]`}
          >
            <button type="button" onClick={() => decide(true)} className={`order-3 md:order-1 ${PRINCIPAL}`}>
              Aceitar
            </button>
            <button
              type="button"
              onClick={() => decide(false)}
              className={`order-2 border-l ${LINHA} ${NEUTRO}`}
            >
              Recusar
            </button>
            <button
              type="button"
              onClick={() => setShowPrefs(true)}
              aria-label="Personalizar cookies"
              className={`order-1 md:order-3 md:border-l ${LINHA} ${NEUTRO}`}
            >
              <SlidersHorizontal className="h-3 w-3 shrink-0" />
              <span className="hidden md:inline">Personalizar</span>
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-[44px_minmax(0,1fr)_44px]">
            <Simbolo />
            <div className={`border-l ${LINHA} px-3 py-1.5`}>
              <p className={ROTULO}>Projeto</p>
              <p className={VALOR}>Personalizar cookies</p>
            </div>
            <button
              type="button"
              onClick={() => setShowPrefs(false)}
              aria-label="Voltar"
              className={`flex items-center justify-center border-l ${LINHA} text-foreground/90 transition-colors hover:bg-white/[0.06]`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>

          {categorias.map((c) => (
            <div key={c.nome} className={`grid grid-cols-[minmax(0,1fr)_88px] border-t ${LINHA}`}>
              <div className="px-3 py-1.5">
                <p className={ROTULO}>{c.nome}</p>
                <p className={TEXTO}>{c.texto}</p>
              </div>
              <div className={`flex items-center justify-center border-l ${LINHA}`}>
                {c.chave ? (
                  <Chave rotulo={c.nome} ligada={c.chave.ligada} onChange={c.chave.onChange} />
                ) : (
                  <span className={ROTULO}>Sempre</span>
                )}
              </div>
            </div>
          ))}

          <div className={`grid grid-cols-2 border-t ${LINHA}`}>
            <button type="button" onClick={() => decide(ads)} className={PRINCIPAL}>
              Salvar escolhas
            </button>
            <button type="button" onClick={() => decide(false)} className={`border-l ${LINHA} ${NEUTRO}`}>
              Recusar todos
            </button>
          </div>
        </>
      )}
    </section>
  );
}
