import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TechSpecsSection from "@/components/TechSpecsSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Index = () => (
  <>
    <Header />
    <main>
      <HeroSection />
      <GallerySection />
      <ServicesSection />
      <TechSpecsSection />
      <AboutSection />
      <ContactSection />
    </main>
    <Footer />
    <WhatsAppFloat />
  </>
);

export default Index;
