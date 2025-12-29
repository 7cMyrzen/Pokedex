import HomeHero from "@/components/Home/Hero";
import { Details } from "@/components/Home/Details";
import { FeaturesBlock } from "@/components/Home/FeaturesBlock";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <FeaturesBlock />
      <Details />
    </main>
  );
}
