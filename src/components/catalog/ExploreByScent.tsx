import Link from "next/link";
import { getProducts } from "@/lib/data/products";

const CANDIDATE_NOTES = [
  "Doce",
  "Floral",
  "Amadeirado",
  "Âmbar",
  "Cítrico",
  "Frutado",
  "Oud",
  "Almiscarado",
];

function normalize(v: string) {
  return v.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export async function ExploreByScent() {
  const products = await getProducts();
  const notes = CANDIDATE_NOTES.filter((note) =>
    products.some((p) =>
      (p.mainAccords ?? []).some((a) => normalize(a).includes(normalize(note)))
    )
  );

  if (notes.length === 0) return null;

  return (
    <section className="bg-lux-champagne/10 px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="font-serif text-3xl font-light text-lux-deep sm:text-4xl">
          Explore by Scent
        </h2>
        <p className="mt-3 text-sm text-lux-brown">
          Deixe uma nota olfativa guiar sua descoberta.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {notes.map((note) => (
            <Link
              key={note}
              href={`/perfumes?nota=${encodeURIComponent(note)}#explorar-perfumes`}
              className="rounded-full border border-lux-brown/30 bg-lux-white px-6 py-3 text-sm text-lux-deep transition-colors hover:border-lux-deep hover:bg-lux-deep hover:text-lux-white"
            >
              {note}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
