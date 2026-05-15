import { useEffect, useState } from "react";
import Logo from "./Logo";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { WHATSAPP_URL } from "@/lib/constants";

const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#resultados", label: "Resultados" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-cream-dim text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="story-link hover:text-cream transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="btn-metallic hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-cream/40 text-cream text-xs font-semibold tracking-[0.2em] uppercase rounded-full transition-all duration-300"
        >
          Falar com a Axon
        </a>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-sm"
            aria-label="Abrir menu"
          >
            <span
              className={cn(
                "block w-6 h-px bg-cream transition-all duration-300 origin-center",
                open && "translate-y-[6px] rotate-45"
              )}
            />
            <span
              className={cn(
                "block w-6 h-px bg-cream transition-all duration-300",
                open && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block w-6 h-px bg-cream transition-all duration-300 origin-center",
                open && "-translate-y-[6px] -rotate-45"
              )}
            />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[280px] bg-background border-border flex flex-col pt-20 px-8"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <SheetClose asChild key={link.href}>
                  <a
                    href={link.href}
                    className="font-display text-cream text-4xl leading-tight hover:text-gold transition-colors py-2"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
                  >
                    {link.label}
                  </a>
                </SheetClose>
              ))}
            </nav>

            <div className="mt-auto pb-10">
              <div className="h-px bg-border mb-8" />
              <SheetClose asChild>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-metallic flex items-center justify-center gap-3 border border-cream/40 text-cream text-xs font-semibold tracking-[0.2em] uppercase rounded-full px-6 py-4 transition-all duration-300"
                >
                  Falar com a Axon →
                </a>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
