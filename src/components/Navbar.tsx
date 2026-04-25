import { useEffect, useState } from "react";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

const WHATSAPP_URL = "https://wa.me/message/RHHL5HTXCEZWJ1";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
        scrolled
          ? "h-[80px] bg-background/85 backdrop-blur-md"
          : "h-[100px] bg-transparent"
      )}
    >
      <div className="container h-full flex items-center justify-between">
        <a href="#hero" aria-label="Axon Growth — início">
          <Logo />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-cream-dim text-sm font-medium">
          <a href="#servicos" className="story-link hover:text-cream transition-colors">Serviços</a>
          <a href="#resultados" className="story-link hover:text-cream transition-colors">Resultados</a>
          <a href="#depoimentos" className="story-link hover:text-cream transition-colors">Depoimentos</a>
          <a href="#contato" className="story-link hover:text-cream transition-colors">Contato</a>
        </nav>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="btn-metallic hidden sm:inline-flex items-center gap-2 px-5 py-2.5 border border-cream/40 text-cream text-xs font-semibold tracking-[0.2em] uppercase rounded-full transition-all duration-300"
        >
          Falar com a Axon
        </a>
      </div>
    </header>
  );
};

export default Navbar;
