import type { Metadata } from "next";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";
import { HousesHero } from "@/components/brands/HousesHero";
import { HousesIntro } from "@/components/brands/HousesIntro";
import { DesiredHouses } from "@/components/brands/DesiredHouses";
import { MoreHouses } from "@/components/brands/MoreHouses";
import { ExploreByFamily } from "@/components/brands/ExploreByFamily";
import { FragranceFinderTeaser } from "@/components/home/FragranceFinderTeaser";

export const metadata: Metadata = {
  title: "Um Universo de Casas | Lux Calyra",
  description: "Descubra as casas de perfumaria árabe por trás da curadoria Lux Calyra.",
};

export default function BrandsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <HousesHero />
      <HousesIntro />
      <DesiredHouses />
      <MoreHouses />
      <ExploreByFamily />
      <FragranceFinderTeaser />
      <Footer />
    </div>
  );
}
