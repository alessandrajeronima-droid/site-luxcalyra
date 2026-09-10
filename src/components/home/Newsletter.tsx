export function Newsletter() {
  return (
    <section className="bg-lux-deep px-6 py-20 text-center md:px-12 md:py-24">
      <span className="text-xs tracking-[0.35em] text-lux-champagne uppercase">
        Join the Calyra World
      </span>
      <p className="mx-auto mt-4 max-w-md text-sm text-lux-white/70">
        Receba novidades, lançamentos, descobertas e condições especiais da Lux
        Calyra.
      </p>
      <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
        <input
          type="email"
          placeholder="Seu melhor e-mail"
          className="flex-1 rounded-full border border-lux-white/20 bg-transparent px-5 py-3 text-sm text-lux-white placeholder:text-lux-white/40 outline-none focus:border-lux-champagne"
        />
        <button
          type="submit"
          className="rounded-full bg-lux-champagne px-7 py-3 text-sm tracking-wide text-lux-deep transition-colors hover:bg-lux-white"
        >
          Quero Fazer Parte
        </button>
      </form>
    </section>
  );
}
