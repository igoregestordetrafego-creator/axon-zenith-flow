import { useEffect, useRef, useState } from "react";
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

const TestimonialCard = ({ t, index }: { t: Testimonial; index: number }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
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
        <img
          src={t.image}
          alt={`Print de WhatsApp — ${t.name}`}
          className="w-full h-auto block"
          loading="lazy"
        />
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
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
            }}
          />
        </div>
      </div>
    );
  }

  return null;
};

const Testimonials = () => {
  const { ref: headRef, visible } = useReveal<HTMLDivElement>({ threshold: 0.2 });

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

        {/* Masonry via CSS columns */}
        <div
          className="testimonials-masonry"
          style={{
            columnGap: 16,
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </div>

        <style>{`
          .testimonials-masonry {
            column-count: 1;
          }
          @media (min-width: 768px) {
            .testimonials-masonry { column-count: 2; }
          }
          @media (min-width: 1024px) {
            .testimonials-masonry { column-count: 3; }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Testimonials;
