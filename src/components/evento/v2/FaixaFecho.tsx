/** Faixa laranja que fecha a galeria e separa as seções escuras. */
export function FaixaFecho({ linhas }: { linhas: string[] }) {
  return (
    <section className="bg-orange-gradient px-6 py-10 text-center md:px-10 md:py-14 lg:px-12">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-2 md:gap-2.5">
        {linhas.map((linha, i) => (
          <p
            key={linha}
            className={`font-display text-[12px] font-extrabold uppercase leading-tight tracking-[0.16em] md:text-[16px] md:tracking-[0.2em] ${i === 0 ? "text-[hsl(0_0%_4%)]" : "text-black/75"}`}
          >
            {linha}
          </p>
        ))}
      </div>
    </section>
  );
}
