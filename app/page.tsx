import HeroSection from '@/components/home/HeroSection';
import ProductSection from '@/components/home/ProductSection';
import MarqueeSection from "@/components/home/MarqueeSection";
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <ProductSection />
    </>
  );
}