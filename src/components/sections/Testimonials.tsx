import { useEffect, useRef, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

interface Testimonial {
  type: "video" | "text" | "image";
  name: string;
  role: string;
  quote?: string;
  thumbnail?: string;
  videoSrc?: string;
  videoFormat?: "short" | "horizontal";
}

const TESTIMONIALS: Testimonial[] = [
  {
    type: "video",
    name: "Em breve",
    role: "Depoimento em vídeo",
    videoSrc: "https://www.youtube.com/embed/m18xRjpWFDI?rel=0&modestbranding=1&showinfo=0",
    videoFormat: "short",
  },
  {
    type: "text",
    name: "Em breve",
    role: "CEO • Cliente Axon",
    quote:
      "Espaço reservado para depoimento real. A Axon trabalha com discrição — em breve aqui estarão palavras de quem cresceu com a gente.",
  },
  { type: "image", name: "Em breve", role: "Print de resultado" },
  {
    type: "text",
    name: "Em breve",
    role: "Founder • Cliente Axon",
    quote:
      "Outro espaço reservado. Os números falam, mas as palavras de quem viveu o processo falam mais alto. Em breve.",
  },
  {
    type: "video",
    name: "Em breve",
    role: "Case em vídeo",
    videoSrc: "https://www.youtube.com/embed/hEDdVOrdfbA?rel=0&modestbranding=1&showinfo=0",
    videoFormat: "horizontal",
  },
  { type: "image", name: "Em breve", role: "Resultado documentado" },
];

const TestimonialCard = ({ t, index, visible }: { t: Testimonial; index: number; visible: boolean }) => {
  return (
    <div
      className="relative bg-background border border-border p-8 transition-all duration-500 hover:border-[#00C2D4]/60 h-full overflow-hidden flex flex-col"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-100px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 180}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 180}ms, border-color 0.3s`,
      }}
    >
      {/* Decorative giant quote */}
      {t.type === "text" && (
        <span
          className="font-display absolute top-2 left-2 leading-none select-none pointer-events-none"
          style={{ fontSize: "180px", color: "rgba(0, 194, 212, 0.06)" }}
          aria-hidden
        >
          "
        </span>
      )}

      {/* Media area — uniform height across all cards so identifications align */}
      <div
        className="relative flex-1 flex flex-col mb-6"
        style={{ minHeight: t.type === "video" && t.videoFormat === "short" ? 480 : 260 }}
      >
        {t.type === "video" && t.videoSrc && t.videoFormat === "short" && (
          <div className="flex-1 flex items-center justify-center">
            <div
              className="relative w-full"
              style={{ maxWidth: 320, aspectRatio: "9 / 16" }}
            >
              <iframe
                src={t.videoSrc}
                title={t.role}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  borderRadius: 12,
                  display: "block",
                }}
              />
            </div>
          </div>
        )}

        {t.type === "video" && t.videoSrc && t.videoFormat === "horizontal" && (
          <div className="flex-1 flex items-center">
            <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
              <iframe
                src={t.videoSrc}
                title={t.role}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  borderRadius: 12,
                  display: "block",
                }}
              />
            </div>
          </div>
        )}

        {t.type === "text" && (
          <p className="relative font-sora text-cream/90 text-base leading-relaxed pt-8">
            {t.quote}
          </p>
        )}

        {t.type === "image" && (
          <div className="relative flex-1 bg-background-alt border border-[#1E1E1E] flex items-center justify-center transition-colors hover:border-[#00C2D4]">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-cream-dim/40">
              <rect x="6" y="10" width="36" height="28" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="16" cy="20" r="3" stroke="currentColor" strokeWidth="1.5" />
              <path d="M6 32 L18 22 L28 30 L42 18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        )}
      </div>

      {/* Footer pinned to bottom — same position across all cards */}
      <div className="relative flex items-center gap-3 pt-4 border-t border-border mt-auto">
        <div className="w-10 h-10 rounded-full bg-background-alt border border-border shrink-0" />
        <div>
          <div className="text-cream font-sora font-semibold text-sm">{t.name}</div>
          <div className="text-cream-dim text-xs">{t.role}</div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { ref: headRef, visible } = useReveal<HTMLDivElement>({ threshold: 0.2 });
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
    duration: 30,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const autoplayRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  // Autoplay
  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    autoplayRef.current = window.setInterval(() => {
      if (emblaApi && !isHovering) emblaApi.scrollNext();
    }, 5000);
  }, [emblaApi, isHovering]);

  useEffect(() => {
    if (!emblaApi) return;
    startAutoplay();
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
      if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    };
  }, [emblaApi, startAutoplay]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    if (autoplayRef.current) window.clearInterval(autoplayRef.current);
  };
  const handleMouseLeave = () => {
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = window.setTimeout(() => {
      setIsHovering(false);
      startAutoplay();
    }, 2000);
  };

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (i: number) => emblaApi?.scrollTo(i);

  return (
    <section id="depoimentos" className="py-28 md:py-40">
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        {/* Title block */}
        <div ref={headRef} className="max-w-3xl mx-auto mb-6 text-center">
          <h2
            className="font-display text-cream leading-[0.9]"
            style={{
              fontSize: visible ? "clamp(48px, 6vw, 88px)" : "32px",
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.7)",
              transformOrigin: "center center",
              transition:
                "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1), font-size 0.9s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            DEPOIMENTOS REAIS<br />DE QUEM DECIDIU<br />
            <span style={{ color: "#00C2D4" }}>CORRETAMENTE.</span>
          </h2>
        </div>

        {/* Animated underline — centered */}
        <div
          className="mx-auto mb-16"
          style={{
            height: 2,
            backgroundColor: "#00C2D4",
            width: visible ? 80 : 0,
            transition: "width 0.6s cubic-bezier(0.16,1,0.3,1) 400ms",
          }}
        />

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            ref={emblaRef}
          >
            <div className="flex gap-6">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  className="min-w-0 shrink-0 grow-0 basis-full md:basis-1/3"
                >
                  <TestimonialCard t={t} index={i} visible={visible} />
                </div>
              ))}
            </div>
          </div>

          {/* Nav arrows */}
          <button
            onClick={scrollPrev}
            aria-label="Anterior"
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
            style={{ background: "rgba(0,194,212,0.1)", color: "#00C2D4" }}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Próximo"
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
            style={{ background: "rgba(0,194,212,0.1)", color: "#00C2D4" }}
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Ir ao slide ${i + 1}`}
              className="h-[6px] rounded-full transition-all duration-300"
              style={{
                width: selectedIndex === i ? 24 : 6,
                backgroundColor: selectedIndex === i ? "#00C2D4" : "#1E1E1E",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
