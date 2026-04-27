import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import FlowLines from "@/components/FlowLines";
import Hero from "@/components/sections/Hero";
import ProofBar from "@/components/sections/ProofBar";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <LoadingScreen />
      <CustomCursor />
      <FlowLines />
      <Navbar />
      <main className="relative z-[2]">
        <Hero />
        <ProofBar />
        <Services />
        <Testimonials />
        <FinalCTA />
      </main>
      <div className="relative z-[2]">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
