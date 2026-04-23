import { useReveal } from "@/hooks/useReveal";

interface Testimonial {
  type: "video" | "text" | "image";
  name: string;
  role: string;
  quote?: string;
  thumbnail?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    type: "video",
    name: "Em breve",
    role: "Depoimento em vídeo",
  },
  {
    type: "text",
    name: "Em breve",
    role: "CEO • Cliente Axon",
    quote:
      "Espaço reservado para depoimento real. A Axon trabalha com discrição — em breve aqui estarão palavras de quem cresceu com a gente.",
  },
  {
    type: "image",
    name: "Em breve",
    role: "Print de resultado",
  },
];

const Card = ({ t, index }: { t: Testimonial; index: number }) => {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className="bg-background border border-border p-8 transition-all duration-500 hover:border-gold/60"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(60px)",
        transition: `opacity 0.7s ease ${index * 200}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${index * 200}ms, border-color 0.3s`,
      }}
    >
      {t.type === "video" && (
        <div className="aspect-video bg-background-alt border border-border flex items-center justify-center mb-6 group cursor-pointer hover:border-gold transition-colors">
          <div className="w-16 h-16 rounded-full border border-cream-dim flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-all">
            <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
              <path d="M2 2 L18 11 L2 20 Z" fill="hsl(var(--cream))" />
            </svg>
          </div>
        </div>
      )}

      {t.type === "text" && (
        <div className="relative mb-6 min-h-[200px]">
          <span
            className="font-display absolute -top-4 -left-2 text-gold/10 leading-none select-none pointer-events-none"
            style={{ fontSize: "120px" }}
            aria-hidden
          >
            "
          </span>
          <p className="relative font-sora text-cream/90 text-base leading-relaxed pt-8">
            {t.quote}
          </p>
        </div>
      )}

      {t.type === "image" && (
        <div className="aspect-[4/3] bg-background-alt border border-border flex items-center justify-center mb-6 hover:border-gold/60 transition-colors">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-cream-dim/40">
            <rect x="6" y="10" width="36" height="28" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="16" cy="20" r="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 32 L18 22 L28 30 L42 18" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      )}

      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <div className="w-10 h-10 rounded-full bg-background-alt border border-border" />
        <div>
          <div className="text-cream font-sora font-semibold text-sm">{t.name}</div>
          <div className="text-cream-dim text-xs">{t.role}</div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.2 });
  return (
    <section id="depoimentos" className="bg-background-alt py-28 md:py-40">
      <div className="container">
        <div ref={ref} className="max-w-3xl mb-16 md:mb-20">
          <div
            className="h-px bg-gold mb-6 transition-all duration-700"
            style={{ width: visible ? 60 : 0 }}
          />
          <h2
            className="font-display text-cream leading-[0.9] transition-all duration-700"
            style={{
              fontSize: "clamp(48px, 6vw, 88px)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
            }}
          >
            DEPOIMENTOS REAIS<br />DE QUEM DECIDIU<br /><span className="text-gold">CORRETAMENTE.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Card key={i} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
