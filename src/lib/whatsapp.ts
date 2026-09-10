import type { CartItem } from "@/lib/store/cart";
import { formatBRL } from "@/lib/format";

const WHATSAPP_NUMBER = "5541998732484";

export function buildWhatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function productWhatsappLink(productName: string): string {
  return buildWhatsappLink(`Olá! Tenho interesse no perfume ${productName} da Lux Calyra.`);
}

export function checkoutWhatsappLink(items: CartItem[], subtotal: number): string {
  const lines = items.map(
    (i) =>
      `${i.quantity}x ${i.product.name} (${formatBRL(i.product.salePrice ?? i.product.price)})`
  );
  const message = [
    "Olá! Quero finalizar meu pedido na Lux Calyra:",
    ...lines,
    `Subtotal: ${formatBRL(subtotal)}`,
  ].join("\n");
  return buildWhatsappLink(message);
}
