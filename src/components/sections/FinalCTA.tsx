import { useReveal } from "@/hooks/useReveal";

const WHATSAPP_URL = "https://wa.me/5500000000000";
const WORDS = ["TUA", "CONCORRÊNCIA", "JÁ ESTÁ", "CRESCENDO", "COM", "A GENTE."];

const FinalCTA = () => {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section
      id="contato"
      className="relative min-h-[80vh] flex items-center justify-center bg-background py-28 overflow-hidden"
    >
      {/* radial glow */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute inset-0 bg-fade-bottom pointer-events-none" />

      <div ref={ref} className="container relative z-10 text-center max-w-5xl">
        <h2
          className="font-display text-cream leading-[0.9] text-balance"
          style={{ fontSize: "clamp(56px, 8vw, 120px)" }}
        >
          {WORDS.map((w, i) => (
            <span
              key={i}
              className="inline-block mr-[0.25em] opacity-0"
              style={{
                animation: visible
                  ? `word-rise 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 80}ms forwards`
                  : "none",
                color: w === "COM" || w === "A GENTE." ? "hsl(var(--accent-gold))" : undefined,
              }}
            >
              {w}
            </span>
          ))}
        </h2>

        <p
          className="mt-10 text-cream-dim text-base md:text-lg leading-relaxed max-w-2xl mx-auto transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "700ms",
          }}
        >
          Enquanto tu lê isso, alguém do teu mercado já tomou a decisão certa.
          A Axon trabalha com poucos clientes. De propósito.
          <br />
          <span className="text-cream font-medium">Se tem vaga, é agora.</span>
        </p>

        <div
          className="mt-12 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.9)",
            transitionDelay: "900ms",
          }}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-4 bg-gold text-background px-10 py-6 font-display tracking-[0.15em] text-xl md:text-2xl hover:scale-[1.04] transition-transform duration-300 animate-pulse-glow"
          >
            QUERO ENTRAR ANTES QUE FECHE
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
          </a>
        </div>

        <p
          className="mt-6 text-cream-dim text-xs md:text-sm leading-relaxed transition-opacity duration-700"
          style={{ opacity: visible ? 1 : 0, transitionDelay: "1100ms" }}
        >
          Sem enrolação. Sem apresentação genérica.
          <br />
          Uma conversa direta sobre o que tá travando o teu crescimento.
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
