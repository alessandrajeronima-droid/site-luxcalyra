"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore, useCartTotals } from "@/lib/store/cart";
import { useFavoritesStore } from "@/lib/store/favorites";
import { formatBRL } from "@/lib/format";

export function CartDrawer() {
  useEffect(() => {
    useCartStore.persist.rehydrate();
    useFavoritesStore.persist.rehydrate();
  }, []);

  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const { subtotal } = useCartTotals();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-40 bg-lux-black/40"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-lux-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-lux-champagne/40 px-6 py-5">
              <h2 className="font-serif text-xl text-lux-deep">Sua Sacola</h2>
              <button onClick={close} aria-label="Fechar" className="text-lux-brown">
                Fechar
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <p className="text-sm text-lux-brown">Sua sacola está vazia.</p>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={item.product.id} className="flex gap-4">
                      <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-lux-champagne/20">
                        <Image
                          src={item.product.mainImage}
                          alt={item.product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p className="font-serif text-base text-lux-deep">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-lux-brown">
                            {formatBRL(item.product.salePrice ?? item.product.price)}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setQuantity(item.product.id, item.quantity - 1)}
                            className="h-6 w-6 rounded-full border border-lux-champagne text-xs text-lux-brown"
                          >
                            -
                          </button>
                          <span className="text-sm text-lux-deep">{item.quantity}</span>
                          <button
                            onClick={() => setQuantity(item.product.id, item.quantity + 1)}
                            className="h-6 w-6 rounded-full border border-lux-champagne text-xs text-lux-brown"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="ml-auto text-xs text-lux-brown underline underline-offset-4"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-lux-champagne/40 px-6 py-6">
                <div className="flex justify-between text-sm text-lux-deep">
                  <span>Subtotal</span>
                  <span>{formatBRL(subtotal)}</span>
                </div>
                <p className="mt-1 text-xs text-lux-brown">Frete calculado no checkout.</p>
                <Link
                  href="/checkout"
                  onClick={close}
                  className="mt-4 block rounded-full bg-lux-deep px-8 py-3 text-center text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown"
                >
                  Finalizar Compra
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
