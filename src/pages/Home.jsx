import Navbar from '@/components/Navbar';
import SectionTransition from '@/components/SectionTransition';
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

      <SectionTransition>
        <AboutSection />
      </SectionTransition>

      <GallerySection />

      <SectionTransition>
        <PricingPackagesSection />
      </SectionTransition>

      <SectionTransition>
        <ClientPerspectivesSection />
      </SectionTransition>

      <SectionTransition>
        <SecureYourSessionSection />
      </SectionTransition>

      <SectionTransition>
        <ConnectSection />
      </SectionTransition>

      <SectionTransition amount={0.1}>
        <FooterSection />
      </SectionTransition>
    </div>
  );
}
