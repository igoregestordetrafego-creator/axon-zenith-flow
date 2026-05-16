import { useReveal } from "@/hooks/useReveal";

const PILLARS = [
  {
    title: "Poucos clientes.\nDe propósito.",
    body: [
      "Não somos fábrica.",
      "Cada conta tem atenção total de quem decide, sem analista júnior seguindo checklist.",
    ],
  },
  {
    title: "Dado real,\nnão relatório bonito.",
    body: [
      "Auditamos, questionamos e entregamos o que precisa ser resolvido.",
      "Mesmo que doa.",
      "Especialmente quando doa.",
    ],
  },
  {
    title: "Da estratégia\nà execução.",
    body: [
      "Consultoria que fica no papel não fatura nada.",
      "Ficamos até funcionar: script, processo, time e resultado.",
    ],
  },
];

const PillarCard = ({ pillar, index }: { pillar: (typeof PILLARS)[0]; index: number }) => {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      style={{
        background: "#0D0D0D",
        border: "1px solid #1E1E1E",
        borderRadius: 4,
        padding: 40,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 150}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 150}ms, border-color 300ms, box-shadow 300ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#00C2D4";
        e.currentTarget.style.boxShadow = "0 0 32px rgba(0,194,212,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#1E1E1E";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <h3
        className="font-display"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(26px, 2.5vw, 34px)",
          lineHeight: 1.1,
          color: "#F5F0E8",
          marginBottom: 16,
          whiteSpace: "pre-line",
        }}
      >
        {pillar.title}
      </h3>
      {pillar.body.map((line, i) => (
        <p
          key={i}
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 14,
            color: "#A89F91",
            lineHeight: 1.65,
            marginBottom: i < pillar.body.length - 1 ? 8 : 0,
          }}
        >
          {line}
        </p>
      ))}
    </div>
  );
};

const Sobre = () => {
  const { ref: headRef, visible } = useReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section id="sobre" className="relative py-28 md:py-40" style={{ background: "hsl(var(--background-alt))" }}>
      <div className="container">
        {/* Heading block */}
        <div ref={headRef} className="mb-16 md:mb-20">
          <div
            className="h-px bg-gold mb-6 transition-all duration-700"
            style={{ width: visible ? 60 : 0 }}
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <div className="lg:col-span-5">
              <h2
                className="font-display leading-[0.9]"
                style={{
                  fontSize: "clamp(52px, 6vw, 88px)",
                  color: "#F5F0E8",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(40px)",
                  transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                QUEM É<br />
                <span style={{ color: "#00C2D4" }}>A AXON</span>
              </h2>
            </div>

            <div
              className="lg:col-span-7"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 200ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) 200ms",
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "clamp(15px, 1.4vw, 18px)",
                  color: "#C8C0B4",
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                A Axon nasceu de uma constatação simples: a maioria das agências entrega
                relatório bonito, cobra por alcance e some quando o resultado não aparece.
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "clamp(15px, 1.4vw, 18px)",
                  color: "#C8C0B4",
                  lineHeight: 1.7,
                  marginBottom: 12,
                }}
              >
                Construímos diferente.
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "clamp(15px, 1.4vw, 18px)",
                  color: "#C8C0B4",
                  lineHeight: 1.7,
                  marginBottom: 12,
                }}
              >
                Cada cliente entra num processo de diagnóstico real, da estrutura digital ao time comercial.
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "clamp(15px, 1.4vw, 18px)",
                  color: "#C8C0B4",
                  lineHeight: 1.7,
                  marginBottom: 20,
                }}
              >
                Mapeamos o que está quebrando, ajustamos o que está fraco e escalamos o que está funcionando.
              </p>
              <p
                style={{
                  fontFamily: "'Sora', system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(14px, 1.3vw, 17px)",
                  color: "#00C2D4",
                  lineHeight: 1.5,
                  fontStyle: "italic",
                  marginBottom: 8,
                }}
              >
                Não somos uma agência de anúncios.
              </p>
              <p
                style={{
                  fontFamily: "'Sora', system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(14px, 1.3vw, 17px)",
                  color: "#00C2D4",
                  lineHeight: 1.5,
                  fontStyle: "italic",
                }}
              >
                Somos parceiros de operação.
              </p>
            </div>
          </div>
        </div>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PILLARS.map((pillar, i) => (
            <PillarCard key={i} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sobre;
