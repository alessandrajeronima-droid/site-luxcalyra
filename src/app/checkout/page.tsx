import type { Metadata } from "next";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout | Lux Calyra",
};

export default function CheckoutPage() {
  return (
    <div className="flex flex-1 flex-col bg-lux-white">
      <div className="relative bg-lux-deep py-16">
        <Header overLight={false} />
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h1 className="font-serif text-3xl font-light text-lux-white md:text-4xl">
            Finalizar Compra
          </h1>
        </div>
      </div>

      <CheckoutForm />
      <Footer />
    </div>
  );
}
