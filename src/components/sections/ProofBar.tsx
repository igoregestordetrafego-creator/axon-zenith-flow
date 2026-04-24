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
  { value: "R$ 25M+", label: "Em mídia gerenciada com retorno documentado", numeric: 25, format: (n) => `R$ ${n}M+` },
  { value: "+R$ 10M", label: "Faturados para os nossos clientes", numeric: 10, format: (n) => `+R$ ${n}M` },
  { value: "11x – 27x", label: "Retorno sobre investimento médio nas contas ativas" },
  { value: "+120%", label: "Crescimento médio dos e-commerces após entrada da Axon", numeric: 120, format: (n) => `+${n}%` },
  { value: "+73%", label: "Aumento na taxa de conversão com o sistema comercial", numeric: 73, format: (n) => `+${n}%` },
  { value: "+30%", label: "Aumento no ticket médio após reestruturação de oferta e CRM", numeric: 30, format: (n) => `+${n}%` },
  { value: "R$ 2M+", label: "Economizados em folha salarial via automações", numeric: 2, format: (n) => `R$ ${n}M+` },
  { value: "350 mil h", label: "Devolvidas às equipes por processos automatizados", numeric: 350, format: (n) => `${n} mil h` },
  { value: "R$ 3M+", label: "Faturamento gerado por novos canais de venda implementados", numeric: 3, format: (n) => `R$ ${n}M+` },
  { value: "20x +", label: "Conversão dos scripts e estrutura comercial vs. atendimento convencional", numeric: 20, format: (n) => `${n}x +` },
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
      className="group relative shrink-0 w-[300px] md:w-[340px] bg-background-alt border border-border transition-all duration-500 hover:border-gold hover:shadow-gold flex flex-col justify-end"
      style={{
        height: "220px",
        padding: "32px",
        opacity: active ? 1 : 0,
        transform: active ? "scale(1)" : "scale(0.7)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms, border-color 0.3s, box-shadow 0.3s`,
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
    </div>
  );
};

const ProofBar = () => {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="resultados" className="relative bg-background-alt py-28 md:py-36 overflow-hidden">
      <div className="container">
        <div ref={ref} className="max-w-3xl">
          <div
            className="h-px bg-gold mb-6 transition-all duration-700"
            style={{ width: visible ? 60 : 0 }}
          />
          <h2
            className="font-sora font-semibold text-cream-dim text-2xl md:text-3xl leading-tight transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-40px)",
            }}
          >
            <span className="text-cream">Números</span> que a maioria das agências
            não tem coragem de mostrar.
          </h2>
        </div>
      </div>

      {/* Cards rail */}
      <div className="mt-16 md:mt-20 relative">
        <div className="overflow-x-auto md:overflow-hidden scrollbar-none snap-x snap-mandatory">
          <div className="flex gap-5 px-6 md:px-12 pb-4">
            {METRICS.map((m, i) => (
              <div key={i} className="snap-start">
                <MetricCard metric={m} active={visible} delay={i * 100} />
              </div>
            ))}
          </div>
        </div>
        {/* fade edges */}
        <div className="hidden md:block absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-background-alt to-transparent pointer-events-none" />
        <div className="hidden md:block absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-background-alt to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default ProofBar;
