import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import localFont from "next/font/local";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchModal } from "@/components/search/SearchModal";
import { ProductsProvider } from "@/components/providers/ProductsProvider";
import { getProducts } from "@/lib/data/products";
import { getBrands } from "@/lib/data/brands";
import "./globals.css";

const idulFitri = localFont({
  src: "../fonts/IdulFitri.otf",
  variable: "--font-idul-fitri",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lux Calyra | Perfumes Árabes Selecionados",
  description:
    "Lux Calyra: perfumaria árabe selecionada, uma experiência digital premium para descobrir sua fragrância.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);

  return (
    <html
      lang="pt-BR"
      className={`${idulFitri.variable} ${cormorant.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ProductsProvider products={products} brands={brands}>
          {children}
          <CartDrawer />
          <SearchModal />
        </ProductsProvider>
      </body>
    </html>
  );
}
