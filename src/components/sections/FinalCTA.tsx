import { useReveal } from "@/hooks/useReveal";

const WHATSAPP_URL = "https://wa.me/message/RHHL5HTXCEZWJ1";

type Line = { text: string; accent?: boolean };
const TITLE_LINES: Line[][] = [
  [{ text: "A CONCORRÊNCIA" }],
  [{ text: "JÁ ESTÁ " }, { text: "CRESCENDO", accent: true }],
  [{ text: "COM A GENTE." }],
];

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
          className="font-display leading-[0.9] text-balance"
          style={{ fontSize: "clamp(56px, 8vw, 120px)", color: "#F5F0E8" }}
        >
          {TITLE_LINES.map((line, lineIdx) => (
            <span key={lineIdx} className="block">
              {line.map((part, partIdx) => {
                const globalIdx = TITLE_LINES.slice(0, lineIdx).reduce((a, l) => a + l.length, 0) + partIdx;
                return (
                  <span
                    key={partIdx}
                    className="inline-block opacity-0"
                    style={{
                      animation: visible
                        ? `word-rise 0.7s cubic-bezier(0.22,1,0.36,1) ${globalIdx * 100}ms forwards`
                        : "none",
                      color: part.accent ? "#00C2D4" : "#F5F0E8",
                    }}
                  >
                    {part.text}
                  </span>
                );
              })}
            </span>
          ))}
        </h2>

        <div
          className="mt-10 max-w-2xl mx-auto transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "700ms",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 18,
            color: "#A89F91",
            lineHeight: 1.6,
          }}
        >
          <p>Enquanto tu lê isso, alguém do seu mercado já tomou a decisão certa.</p>
          <p>A Axon trabalha com poucos clientes.</p>
          <p style={{ marginTop: 8 }}>De propósito.</p>
          <p className="text-cream font-medium" style={{ color: "#F5F0E8" }}>Se tem vaga, é agora.</p>
        </div>

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
            className="btn-metallic group inline-flex items-center gap-4 bg-gold text-background px-10 py-6 font-display tracking-[0.15em] text-xl md:text-2xl rounded-full hover:scale-[1.04] transition-transform duration-300 animate-pulse-glow"
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
