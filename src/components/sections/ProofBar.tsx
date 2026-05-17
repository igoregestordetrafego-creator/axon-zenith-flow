import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

interface Metric {
  value: string;
  prefix?: string;
  suffix?: string;
  label: string;
  // for numeric count-up: pass numeric target; otherwise show static
  numeric?: number;
  format?: (n: number) => string;
}

const METRICS: Metric[] = [
  { value: "+R$ 5M", label: "Em mídia gerenciada com retorno documentado", numeric: 5, format: (n) => `+R$ ${n}M` },
  { value: "+R$ 10M", label: "Faturados para os nossos clientes", numeric: 10, format: (n) => `+R$ ${n}M` },
  { value: "11x – 27x", label: "Retorno sobre investimento médio nas contas ativas" },
  { value: "+120%", label: "Crescimento médio dos e-commerces após entrada da Axon", numeric: 120, format: (n) => `+${n}%` },
  { value: "+73%", label: "Aumento na taxa de conversão com o sistema comercial", numeric: 73, format: (n) => `+${n}%` },
  { value: "+30%", label: "Aumento no ticket médio após reestruturação de oferta e CRM", numeric: 30, format: (n) => `+${n}%` },
  { value: "+R$ 2M", label: "Economizados em folha salarial via automações", numeric: 2, format: (n) => `+R$ ${n}M` },
  { value: "+350 mil h", label: "Devolvidas às equipes por processos automatizados", numeric: 350, format: (n) => `+${n} mil h` },
  { value: "+R$ 3M", label: "Faturamento gerado por novos canais de venda implementados", numeric: 3, format: (n) => `+R$ ${n}M` },
  { value: "+20x", label: "Conversão dos scripts e estrutura comercial vs. atendimento convencional", numeric: 20, format: (n) => `+${n}x` },
];

const CountUp = ({ target, format, active }: { target: number; format: (n: number) => string; active: boolean }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const step = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return <>{format(val)}</>;
};

const MetricCard = ({ metric, active, delay }: { metric: Metric; active: boolean; delay: number }) => {
  return (
    <div
      data-cursor-hover
      className="metric-card group relative shrink-0 w-[300px] md:w-[340px] flex flex-col justify-start"
      style={{
        height: "220px",
        padding: "28px 32px",
        background: "#111111",
        border: "1px solid #1E1E1E",
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(-80px)",
        transition: `opacity 700ms ease-out ${delay}ms, transform 700ms ease-out ${delay}ms, border-color 300ms ease, box-shadow 300ms ease, background 300ms ease`,
      }}
    >
      <div
        className="font-display leading-none mb-4 transition-transform duration-300 group-hover:scale-105"
        style={{
          fontSize: "clamp(48px, 6vw, 72px)",
          fontWeight: 700,
          color: "hsl(var(--accent-gold))",
        }}
      >
        {metric.numeric !== undefined && metric.format ? (
          <CountUp target={metric.numeric} format={metric.format} active={active} />
        ) : (
          metric.value
        )}
      </div>
      <p
        className="leading-relaxed"
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: "14px",
          fontWeight: 400,
          color: "hsl(var(--cream-dim))",
        }}
      >
        {metric.label}
      </p>
    </div>
  );
};

const ProofBar = () => {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="resultados" className="relative py-28 md:py-36 overflow-hidden">
      <div className="container">
        <div ref={ref} className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <div
            className="transition-all duration-700"
            style={{
              width: visible ? 48 : 0,
              height: 2,
              background: "#00C2D4",
              marginBottom: 20,
            }}
          />
          <h2
            className="font-sora font-semibold leading-tight transition-all duration-700"
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              color: "#F5F0E8",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <span style={{ color: "#00C2D4" }}>Números</span> que mostram o valor dos nossos resultados.
          </h2>
        </div>
      </div>

      {/* Cards rail */}
      <div className="mt-16 md:mt-20 relative">
        {/* Mobile: native horizontal scroll with snap */}
        <div className="md:hidden overflow-x-auto scrollbar-none snap-x snap-mandatory">
          <div className="flex gap-5 pb-4" style={{ paddingLeft: 48, paddingRight: 48 }}>
            {METRICS.map((m, i) => (
              <div key={i} className="snap-start">
                <MetricCard metric={m} active={visible} delay={i * 100} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: infinite auto-scroll marquee (pause on hover) */}
        <div className="hidden md:block overflow-hidden" style={{ paddingLeft: 48, paddingRight: 48 }}>
          <div className="metrics-marquee flex gap-5 w-max pb-4">
            {[...METRICS, ...METRICS].map((m, i) => (
              <MetricCard
                key={i}
                metric={m}
                active={visible}
                delay={i < METRICS.length ? i * 100 : 0}
              />
            ))}
          </div>
        </div>

        {/* fade edges */}
        <div className="hidden md:block absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="hidden md:block absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

export default ProofBar;
