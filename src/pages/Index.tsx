import CustomCursor from "@/components/CustomCursor";
import DotGrid from "@/components/DotGrid";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import ProofBar from "@/components/sections/ProofBar";
import Services from "@/components/sections/Services";
import Sobre from "@/components/sections/Sobre";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <DotGrid />
      <LoadingScreen />
      <CustomCursor />
      <Navbar />
      <main className="relative z-[2]">
        <Hero />
        <ProofBar />
        <Services />
        <Sobre />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <div className="relative z-[2]">
        <Footer />
      </div>
    </div>
  );
};

export default Index;

