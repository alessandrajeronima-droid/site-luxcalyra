import { Header } from "@/components/navigation/Header";
import { HeroEditorial } from "@/components/hero/HeroEditorial";
import { BrandStatement } from "@/components/home/BrandStatement";
import { MostWanted } from "@/components/home/MostWanted";
import { CampaignBanner } from "@/components/home/CampaignBanner";
import { FindYourEssence } from "@/components/home/FindYourEssence";
import { BestSellersCarousel } from "@/components/home/BestSellersCarousel";
import { SpecialEdit } from "@/components/home/SpecialEdit";
import { DecantsTeaser } from "@/components/home/DecantsTeaser";
import { DiscoverySetTeaser } from "@/components/home/DiscoverySetTeaser";
import { FragranceFinderTeaser } from "@/components/home/FragranceFinderTeaser";
import { ExploreBrands } from "@/components/home/ExploreBrands";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/footer/Footer";
import { getContent } from "@/lib/data/content";

export default async function Home() {
  const [hero, brandStatement, campaign1, campaign2] = await Promise.all([
    getContent("home_hero"),
    getContent("home_brand_statement"),
    getContent("home_campaign_1"),
    getContent("home_campaign_2"),
  ]);

  return (
    <div className="flex flex-1 flex-col">
      <Header overLight />
      <HeroEditorial content={hero} />
      <BrandStatement title={brandStatement.title} marquee={brandStatement.marquee} />
      <MostWanted />
      <CampaignBanner {...campaign1} />
      <FindYourEssence />
      <BestSellersCarousel />
      <SpecialEdit />
      <DecantsTeaser />
      <DiscoverySetTeaser />
      <FragranceFinderTeaser />
      <ExploreBrands />
      <CampaignBanner {...campaign2} />
      <Newsletter />
      <Footer />
    </div>
  );
}
