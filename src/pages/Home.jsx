import Navbar from '@/components/Navbar';
import {
  HomeSection,
  AboutSection,
  GallerySection,
  PricingPackagesSection,
  ClientPerspectivesSection,
  SecureYourSessionSection,
  ConnectSection,
  FooterSection,
} from '@/sections';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navbar />
      <HomeSection />
      <AboutSection />
      <GallerySection />
      <PricingPackagesSection />
      <ClientPerspectivesSection />
      <SecureYourSessionSection />
      <ConnectSection />
      <FooterSection />
    </div>
  );
}
