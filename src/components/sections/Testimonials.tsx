import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useReveal } from "@/hooks/useReveal";
import whatsapp1 from "@/assets/whatsapp-1.jpeg";
import whatsapp2 from "@/assets/whatsapp-2.jpeg";
import whatsapp3 from "@/assets/whatsapp-3.jpeg";

interface Testimonial {
  type: "video" | "whatsapp";
  name: string;
  role: string;
  videoSrc?: string;
  videoFormat?: "short" | "horizontal";
  image?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    type: "video",
    name: "",
    role: "Depoimento em vídeo",
    videoSrc: "https://www.youtube.com/embed/m18xRjpWFDI?rel=0&modestbranding=1&showinfo=0",
    videoFormat: "short",
  },
  {
    type: "whatsapp",
    name: "Julia",
    role: "Cliente Axon • E-commerce",
    image: whatsapp1,
  },
  {
    type: "video",
    name: "",
    role: "Case em vídeo",
    videoSrc: "https://www.youtube.com/embed/hEDdVOrdfbA?rel=0&modestbranding=1&showinfo=0",
    videoFormat: "horizontal",
  },
  {
    type: "whatsapp",
    name: "Vinicius",
    role: "Cliente Axon • Kyron",
    image: whatsapp2,
  },
  {
    type: "whatsapp",
    name: "Equipe Clínica",
    role: "Cliente Axon • Estética",
    image: whatsapp3,
  },
];

/* ── Card usado no masonry desktop ── */
const TestimonialCard = ({ t, index }: { t: Testimonial; index: number }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { setVisible(true); obs.unobserve(entry.target); }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const baseStyle: React.CSSProperties = {
    background: "#0D0D0D",
    border: "1px solid #1E1E1E",
    borderRadius: 12,
    overflow: "hidden",
    width: "100%",
    breakInside: "avoid",
    pageBreakInside: "avoid",
    marginBottom: 16,
    display: "block",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(40px)",
    transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms, border-color 300ms, box-shadow 300ms`,
  };

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.borderColor = "#00C2D4";
    e.currentTarget.style.boxShadow = "0 0 24px rgba(0,194,212,0.08)";
  };
  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.borderColor = "#1E1E1E";
    e.currentTarget.style.boxShadow = "none";
  };

  if (t.type === "whatsapp") {
    return (
      <div ref={ref} style={baseStyle} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        <img src={t.image} alt={`Print de WhatsApp — ${t.name}`} className="w-full h-auto block" loading="lazy" />
      </div>
    );
  }

  if (t.type === "video" && t.videoSrc) {
    const ratio = t.videoFormat === "short" ? "9 / 16" : "16 / 9";
    return (
      <div ref={ref} style={baseStyle} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        <div style={{ width: "100%", aspectRatio: ratio, position: "relative" }}>
          <iframe
            src={t.videoSrc}
            title={t.role}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", display: "block" }}
          />
        </div>
      </div>
    );
  }

  return null;
};

/* ── Card simplificado para o carrossel mobile (sem reveal — já está visível) ── */
const CarouselCard = ({ t }: { t: Testimonial }) => {
  const cardStyle: React.CSSProperties = {
    background: "#0D0D0D",
    border: "1px solid #1E1E1E",
    borderRadius: 12,
    overflow: "hidden",
    width: "100%",
  };

  if (t.type === "whatsapp") {
    return (
      <div style={cardStyle}>
        <img src={t.image} alt={`Print de WhatsApp — ${t.name}`} className="w-full h-auto block" loading="lazy" />
      </div>
    );
  }

  if (t.type === "video" && t.videoSrc) {
    const ratio = t.videoFormat === "short" ? "9 / 16" : "16 / 9";
    return (
      <div style={cardStyle}>
        <div style={{ width: "100%", aspectRatio: ratio, position: "relative" }}>
          <iframe
            src={t.videoSrc}
            title={t.role}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", display: "block" }}
          />
        </div>
      </div>
    );
  }

  return null;
};

const AUTOPLAY_INTERVAL = 3000; // mesmo ritmo do marquee de métricas (30s ÷ 10 cards)

/* ── Carrossel mobile ── */
const MobileCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", dragFree: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAutoplay = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    timerRef.current = setInterval(() => {
      emblaApi?.scrollNext();
    }, AUTOPLAY_INTERVAL);
  }, [emblaApi, stopAutoplay]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    // pausa enquanto o usuário está arrastando, retoma ao soltar
    emblaApi.on("pointerDown", stopAutoplay);
    emblaApi.on("pointerUp", startAutoplay);
    startAutoplay();
    return () => {
      stopAutoplay();
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("pointerDown", stopAutoplay);
      emblaApi.off("pointerUp", startAutoplay);
    };
  }, [emblaApi, onSelect, startAutoplay, stopAutoplay]);

  return (
    <div className="relative">
      {/* Viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4" style={{ touchAction: "pan-y pinch-zoom" }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="shrink-0" style={{ flex: "0 0 85%", maxWidth: "85%" }}>
              <CarouselCard t={t} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            onClick={() => { emblaApi?.scrollTo(i); startAutoplay(); }}
            aria-label={`Ir para depoimento ${i + 1}`}
            style={{
              width: i === selectedIndex ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: i === selectedIndex ? "#00C2D4" : "#3A3A3A",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "width 0.3s ease, background 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Contagem */}
      <p
        className="text-center mt-3"
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, color: "#6B6B6B", letterSpacing: "0.1em" }}
      >
        {String(selectedIndex + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
      </p>
    </div>
  );
};

/* ── Seção principal ── */
const Testimonials = () => {
  const { ref: headRef, visible } = useReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section id="depoimentos" className="py-28 md:py-40">
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        {/* Título */}
        <div ref={headRef} className="max-w-3xl mx-auto mb-6 text-center">
          <h2
            className="font-display text-cream leading-[0.9]"
            style={{
              fontSize: visible ? "clamp(48px, 6vw, 88px)" : "32px",
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.7)",
              transformOrigin: "center center",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1), font-size 0.9s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            DEPOIMENTOS REAIS<br />DE QUEM DECIDIU<br />
            <span style={{ color: "#00C2D4" }}>CORRETAMENTE.</span>
          </h2>
        </div>

        {/* Linha animada */}
        <div
          className="mx-auto mb-16"
          style={{
            height: 2,
            backgroundColor: "#00C2D4",
            width: visible ? 80 : 0,
            transition: "width 0.6s cubic-bezier(0.16,1,0.3,1) 400ms",
          }}
        />

        {/* Mobile: carrossel */}
        <div className="md:hidden">
          <MobileCarousel />
        </div>

        {/* Desktop: masonry CSS columns */}
        <div
          className="hidden md:block testimonials-masonry"
          style={{ columnGap: 16 }}
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </div>

        <style>{`
          @media (min-width: 768px) { .testimonials-masonry { column-count: 2; } }
          @media (min-width: 1024px) { .testimonials-masonry { column-count: 3; } }
        `}</style>
      </div>
    </section>
  );
};

export default Testimonials;
