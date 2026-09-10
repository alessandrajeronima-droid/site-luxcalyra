"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useAllBrands } from "@/components/providers/ProductsProvider";

const NOTES = ["Doce", "Floral", "Amadeirado", "Âmbar", "Cítrico", "Frutado", "Oud", "Almiscarado"];
const OCCASIONS = ["Dia", "Trabalho", "Encontro", "Noite", "Eventos", "Todos os dias"];

export function FilterDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const brands = useAllBrands();

  const [brand, setBrand] = useState(searchParams.get("brand") ?? "");
  const [nota, setNota] = useState(searchParams.get("nota") ?? "");
  const [ocasiao, setOcasiao] = useState(searchParams.get("ocasiao") ?? "");
  const [precoMin, setPrecoMin] = useState(searchParams.get("precoMin") ?? "");
  const [precoMax, setPrecoMax] = useState(searchParams.get("precoMax") ?? "");

  function apply() {
    const params = new URLSearchParams(searchParams.toString());
    const set = (key: string, value: string) => (value ? params.set(key, value) : params.delete(key));
    set("brand", brand);
    set("nota", nota);
    set("ocasiao", ocasiao);
    set("precoMin", precoMin);
    set("precoMax", precoMax);
    router.push(`/perfumes?${params.toString()}#explorar-perfumes`);
    onClose();
  }

  function clear() {
    setBrand("");
    setNota("");
    setOcasiao("");
    setPrecoMin("");
    setPrecoMax("");
    const params = new URLSearchParams(searchParams.toString());
    ["brand", "nota", "ocasiao", "precoMin", "precoMax"].forEach((k) => params.delete(k));
    router.push(`/perfumes?${params.toString()}#explorar-perfumes`);
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-lux-black/40"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed bottom-0 right-0 top-auto z-50 flex max-h-[85vh] w-full flex-col overflow-y-auto rounded-t-block bg-lux-white p-6 shadow-2xl sm:top-0 sm:h-full sm:max-h-none sm:w-full sm:max-w-sm sm:rounded-t-none sm:rounded-l-block"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl text-lux-deep">Filtrar</h2>
              <button onClick={onClose} className="text-sm text-lux-brown">
                Fechar
              </button>
            </div>

            <div className="mt-8 flex flex-col gap-8">
              <div>
                <h3 className="text-xs tracking-widest text-lux-brown uppercase">Marca</h3>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="mt-3 w-full rounded-lg border border-lux-champagne/60 bg-transparent px-3 py-2 text-sm text-lux-deep"
                >
                  <option value="">Todas as marcas</option>
                  {brands
                    .filter((b) => b.slug !== "bath-body-works" && b.slug !== "victorias-secret")
                    .map((b) => (
                      <option key={b.slug} value={b.slug}>
                        {b.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <h3 className="text-xs tracking-widest text-lux-brown uppercase">Família / Acorde</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {NOTES.map((n) => (
                    <button
                      key={n}
                      onClick={() => setNota(nota === n ? "" : n)}
                      className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                        nota === n
                          ? "border-lux-deep bg-lux-deep text-lux-white"
                          : "border-lux-champagne/60 text-lux-brown"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs tracking-widest text-lux-brown uppercase">Ocasião</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {OCCASIONS.map((o) => (
                    <button
                      key={o}
                      onClick={() => setOcasiao(ocasiao === o ? "" : o)}
                      className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                        ocasiao === o
                          ? "border-lux-deep bg-lux-deep text-lux-white"
                          : "border-lux-champagne/60 text-lux-brown"
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs tracking-widest text-lux-brown uppercase">Faixa de Preço</h3>
                <div className="mt-3 flex items-center gap-3">
                  <input
                    type="number"
                    placeholder="Mín."
                    value={precoMin}
                    onChange={(e) => setPrecoMin(e.target.value)}
                    className="w-full rounded-lg border border-lux-champagne/60 bg-transparent px-3 py-2 text-sm text-lux-deep"
                  />
                  <span className="text-lux-brown">–</span>
                  <input
                    type="number"
                    placeholder="Máx."
                    value={precoMax}
                    onChange={(e) => setPrecoMax(e.target.value)}
                    className="w-full rounded-lg border border-lux-champagne/60 bg-transparent px-3 py-2 text-sm text-lux-deep"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3">
              <button
                onClick={apply}
                className="rounded-full bg-lux-deep px-8 py-3.5 text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown"
              >
                Aplicar Filtros
              </button>
              <button onClick={clear} className="text-xs text-lux-brown underline underline-offset-4">
                Limpar filtros
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

