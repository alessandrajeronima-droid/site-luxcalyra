"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore, useCartTotals } from "@/lib/store/cart";
import { formatBRL } from "@/lib/format";
import { checkoutWhatsappLink } from "@/lib/whatsapp";

const FIELDS = [
  { name: "nome", label: "Nome completo", span: 2 },
  { name: "cpf", label: "CPF", span: 1 },
  { name: "telefone", label: "Telefone / WhatsApp", span: 1 },
  { name: "email", label: "E-mail", span: 2 },
  { name: "cep", label: "CEP", span: 1 },
  { name: "endereco", label: "Endereço", span: 2 },
  { name: "numero", label: "Número", span: 1 },
  { name: "complemento", label: "Complemento", span: 1 },
  { name: "bairro", label: "Bairro", span: 1 },
  { name: "cidade", label: "Cidade", span: 1 },
  { name: "estado", label: "Estado", span: 1 },
];

const PAYMENT_METHODS = [
  { id: "pix", label: "PIX" },
  { id: "credito", label: "Cartão de Crédito" },
  { id: "debito", label: "Cartão de Débito" },
];

export function CheckoutForm() {
  const items = useCartStore((s) => s.items);
  const { subtotal } = useCartTotals();
  const [payment, setPayment] = useState("pix");
  const [installments, setInstallments] = useState(1);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <p className="text-sm text-lux-brown">Sua sacola está vazia.</p>
        <Link
          href="/perfumes"
          className="mt-6 inline-block rounded-full bg-lux-deep px-8 py-3 text-sm text-lux-white"
        >
          Explorar Perfumes
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-12 px-6 py-16 md:grid-cols-[1.3fr_1fr] md:px-12">
      <form className="flex flex-col gap-8">
        <div>
          <h2 className="font-serif text-2xl text-lux-deep">Dados de Entrega</h2>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {FIELDS.map((field) => (
              <div key={field.name} className={field.span === 2 ? "col-span-2" : undefined}>
                <label className="text-xs tracking-wide text-lux-brown" htmlFor={field.name}>
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  className="mt-1 w-full rounded-lg border border-lux-champagne/60 bg-transparent px-3 py-2 text-sm text-lux-deep outline-none focus:border-lux-brown"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-lux-deep">Pagamento</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {PAYMENT_METHODS.map((method) => (
              <button
                type="button"
                key={method.id}
                onClick={() => setPayment(method.id)}
                className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                  payment === method.id
                    ? "border-lux-deep bg-lux-deep text-lux-white"
                    : "border-lux-champagne/60 text-lux-brown"
                }`}
              >
                {method.label}
              </button>
            ))}
          </div>

          {payment === "credito" && (
            <div className="mt-4">
              <label className="text-xs tracking-wide text-lux-brown" htmlFor="installments">
                Parcelamento
              </label>
              <select
                id="installments"
                value={installments}
                onChange={(e) => setInstallments(Number(e.target.value))}
                className="mt-1 block w-full max-w-[200px] rounded-lg border border-lux-champagne/60 bg-transparent px-3 py-2 text-sm text-lux-deep"
              >
                {[1, 2, 3].map((n) => (
                  <option key={n} value={n}>
                    {n}x de {formatBRL(subtotal / n)} sem juros
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </form>

      <aside className="h-fit rounded-2xl border border-lux-champagne/40 p-6">
        <h2 className="font-serif text-xl text-lux-deep">Resumo do Pedido</h2>
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li key={item.product.id} className="flex items-center gap-3">
              <div className="relative h-14 w-12 flex-shrink-0 overflow-hidden bg-lux-champagne/20">
                <Image
                  src={item.product.mainImage}
                  alt={item.product.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 text-xs text-lux-deep">
                <p className="font-serif text-sm">{item.product.name}</p>
                <p className="text-lux-brown">Qtd: {item.quantity}</p>
              </div>
              <span className="text-xs text-lux-deep">
                {formatBRL((item.product.salePrice ?? item.product.price) * item.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-lux-champagne/40 pt-4 text-sm">
          <div className="flex justify-between text-lux-deep">
            <span>Subtotal</span>
            <span>{formatBRL(subtotal)}</span>
          </div>
          <p className="mt-1 text-xs text-lux-brown">Frete a calcular.</p>
        </div>

        <a
          href={checkoutWhatsappLink(items, subtotal)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block rounded-full bg-lux-deep px-8 py-3 text-center text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown"
        >
          Finalizar Pedido no WhatsApp
        </a>
        <p className="mt-3 text-center text-[11px] text-lux-brown">
          O pagamento online ainda não está conectado. Um consultor confirma o pedido e o
          pagamento diretamente com você.
        </p>
      </aside>
    </div>
  );
}
