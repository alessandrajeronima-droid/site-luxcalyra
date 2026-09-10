"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { SensationOption } from "@/lib/bodyCare";

interface BodyCareFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  basePath: string;
  sensations: SensationOption[];
}

export function BodyCareFilterDrawer({ open, onClose, basePath, sensations }: BodyCareFilterDrawerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sensacao, setSensacao] = useState(searchParams.get("sensacao") ?? "");
  const [precoMin, setPrecoMin] = useState(searchParams.get("precoMin") ?? "");
  const [precoMax, setPrecoMax] = useState(searchParams.get("precoMax") ?? "");

  function apply() {
    const params = new URLSearchParams(searchParams.toString());
    const set = (key: string, value: string) => (value ? params.set(key, value) : params.delete(key));
    set("sensacao", sensacao);
    set("precoMin", precoMin);
    set("precoMax", precoMax);
    router.push(`${basePath}?${params.toString()}#explorar`);
    onClose();
  }

  function clear() {
    setSensacao("");
    setPrecoMin("");
    setPrecoMax("");
    const params = new URLSearchParams(searchParams.toString());
    ["sensacao", "precoMin", "precoMax"].forEach((k) => params.delete(k));
    router.push(`${basePath}?${params.toString()}#explorar`);
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
              {sensations.length > 0 && (
                <div>
                  <h3 className="text-xs tracking-widest text-lux-brown uppercase">Sensação</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {sensations.map((s) => (
                      <button
                        key={s.label}
                        onClick={() => setSensacao(sensacao === s.label ? "" : s.label)}
                        className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                          sensacao === s.label
                            ? "border-lux-deep bg-lux-deep text-lux-white"
                            : "border-lux-champagne/60 text-lux-brown"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

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
