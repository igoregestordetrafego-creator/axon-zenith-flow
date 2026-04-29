import { useEffect, useRef, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import whatsapp1 from "@/assets/whatsapp-1.jpeg";
import whatsapp2 from "@/assets/whatsapp-2.jpeg";
import whatsapp3 from "@/assets/whatsapp-3.jpeg";

interface Testimonial {
  type: "video" | "text" | "image" | "whatsapp";
  name: string;
  role: string;
  quote?: string;
  thumbnail?: string;
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

const TestimonialCard = ({ t, index, visible, isActive }: { t: Testimonial; index: number; visible: boolean; isActive: boolean }) => {
  const baseBorder = isActive ? "#00C2D4" : "#1E1E1E";

  if (t.type === "whatsapp") {
    return (
      <div
        className="group relative h-full flex flex-col justify-start transition-all duration-500"
        style={{
          background: "#0D0D0D",
          border: `1px solid ${baseBorder}`,
          borderRadius: 12,
          padding: 24,
          minHeight: 520,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-100px)",
          transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 180}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 180}ms, border-color 0.3s, box-shadow 0.3s`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#00C2D4";
          e.currentTarget.style.boxShadow = "0 0 24px rgba(0, 194, 212, 0.18)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = baseBorder;
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div className="overflow-hidden" style={{ borderRadius: 8 }}>
          <img
            src={t.image}
            alt={`Print de WhatsApp — ${t.name}`}
            className="w-full h-auto block"
            style={{ borderRadius: 8 }}
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative p-8 transition-all duration-500 h-full overflow-hidden flex flex-col justify-start"
      style={{
        background: "#0D0D0D",
        border: `1px solid ${baseBorder}`,
        borderRadius: 12,
        minHeight: 520,
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

      {/* Media area */}
      <div
        className="relative flex-1 flex flex-col"
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
          <div className="relative flex-1 flex items-center justify-center" style={{ background: "#0D0D0D" }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-cream-dim/40">
              <rect x="6" y="10" width="36" height="28" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="16" cy="20" r="3" stroke="currentColor" strokeWidth="1.5" />
              <path d="M6 32 L18 22 L28 30 L42 18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        )}
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
                  <TestimonialCard t={t} index={i} visible={visible} isActive={selectedIndex === i} />
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
