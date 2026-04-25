import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

interface Service {
  num: string;
  title: string;
  subtitle: string;
  items: string[];
  closing: string;
}

const SERVICES: Service[] = [
  {
    num: "01",
    title: "Estrutura digital que converte. Não só encanta.",
    subtitle:
      "Página bonita sem estratégia é catálogo. A gente constrói com CRO, copy e identidade visual trabalhando juntos desde o zero.",
    items: [
      "Identidade visual alinhada ao posicionamento",
      "Copy estratégica em cada seção",
      "Análise de CRO e direcionamento à conversão",
      "Estrutura técnica para máxima performance",
      "E-commerces, landing pages, sistemas e portais",
    ],
    closing: "O objetivo não é impressionar. É vender.",
  },
  {
    num: "02",
    title: "Não gerenciamos anúncios. Construímos máquinas de aquisição.",
    subtitle:
      "Qualquer agência coloca dinheiro no Meta e chama de estratégia. A gente constrói o sistema inteiro — criativo, audiência, oferta, funil e dado.",
    items: [
      "Diagnóstico completo antes de investir R$ 1 em mídia",
      "Arquitetura de funil por temperatura de audiência",
      "Criativo com intenção — não só arte bonita",
      "Gestão ativa de Meta, Google, TikTok e YouTube Ads",
      "Teste estruturado de ângulos, ofertas e formatos",
      "Leitura de dado real — não o que o gerenciador quer que tu veja",
      "Escala com controle — sem queimar verba em audiência saturada",
    ],
    closing: "Objetivo de campanha não é 'alcance'. É venda. Sempre foi.",
  },
  {
    num: "03",
    title: "Enquanto o teu concorrente pensa no mês, a gente já está no próximo trimestre.",
    subtitle:
      "Calendário estratégico não é planilha de data comemorativa. É inteligência comercial aplicada — quando atacar, qual oferta, em qual canal, com qual margem.",
    items: [
      "Mapeamento de janelas de oportunidade comercial",
      "Planejamento de ofertas e lançamentos por período",
      "Alinhamento entre mídia paga, CRM e operação",
      "Antecipação de sazonalidade com estratégia de margem",
      "Decisões baseadas em dado — não em intuição",
    ],
    closing: "Improvisar em data quente é o erro mais caro que uma marca pode cometer.",
  },
  {
    num: "04",
    title: "Relatório bonito não paga boleto. Dado real, sim.",
    subtitle:
      "A maioria das agências te mostra o que quer que tu veja. A gente mostra o que precisa ser resolvido — mesmo que doa.",
    items: [
      "Auditoria completa de métricas e atribuição",
      "Análise de CRO e comportamento do usuário",
      "Dashboards que mostram problema, não só número",
      "ROI real por canal, campanha e produto",
      "Decisões baseadas em dado — não em achismo",
    ],
    closing: "Se tu não sabe onde tá perdendo dinheiro, alguém sabe. E não é tu.",
  },
  {
    num: "05",
    title: "Tua loja não se gerencia sozinha. E gestor júnior não resolve.",
    subtitle:
      "Vitrine, oferta, ficha, banner, precificação — cada detalhe impacta conversão. A gente cuida de tudo como se fosse a nossa loja.",
    items: [
      "Gestão de ofertas e precificação estratégica",
      "Fichas de produto com copy orientada à conversão",
      "Banners e vitrines alinhados à campanha ativa",
      "Monitoramento de estoque, margem e giro",
      "Operação diária com visão estratégica",
    ],
    closing: "Loja bagunçada com tráfego caro é dinheiro indo embora pela porta da frente.",
  },
  {
    num: "06",
    title: "Quem já comprou de ti é teu ativo mais barato. Para de ignorar.",
    subtitle:
      "Conquistar cliente novo custa 7x mais do que vender pra quem já conhece a marca. A gente constrói o sistema que faz essa base comprar de novo — e de novo.",
    items: [
      "Fluxos de e-mail, WhatsApp e SMS estratégicos",
      "Segmentação de base por comportamento e LTV",
      "Recuperação de carrinho e reativação de inativos",
      "Régua de relacionamento pós-compra",
      "Aumento de frequência e ticket médio por canal",
    ],
    closing: "Retenção não é pós-venda. É receita previsível.",
  },
  {
    num: "07",
    title: "Processo manual é custo disfarçado de rotina.",
    subtitle:
      "Cada hora gasta em tarefa repetitiva é uma hora que não foi gasta em crescimento. A gente mapeia, automatiza e implementa.",
    items: [
      "Mapeamento de gargalos operacionais",
      "Automação de processos comerciais e administrativos",
      "Agentes de IA para atendimento, qualificação e follow-up",
      "Integração entre plataformas e sistemas",
      "Redução real de custo operacional com dado comprovado",
    ],
    closing: "R$ 2M+ economizados em folha. 350 mil horas devolvidas. Isso é resultado.",
  },
  {
    num: "08",
    title: "Estratégia que fica no papel não fatura nada.",
    subtitle:
      "A maioria das consultorias entrega 40 páginas e some. A gente fica até funcionar — script, processo, time, funil e resultado.",
    items: [
      "Diagnóstico completo da operação comercial atual",
      "Criação e implementação de scripts de vendas",
      "Estruturação de funil do primeiro contato ao fechamento",
      "Treinamento e alinhamento do time comercial",
      "Definição de metas, métricas e cadência de acompanhamento",
      "Integração entre marketing, tráfego e comercial",
    ],
    closing: "Script bem feito converte 20x mais que atendimento aleatório. Nossos números provam.",
  },
];

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.2 });
  return (
    <article
      ref={ref}
      data-service-card
      data-index={index}
      className="service-card group relative bg-[#111111] p-8 md:p-12 overflow-hidden hover:bg-[#0F1A1A]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(120px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 150}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 150}ms, background-color 0.3s ease`,
      }}
    >
      {/* Animated left border (top → bottom on hover) */}
      <span
        aria-hidden
        className="service-card__border absolute left-0 top-0 w-[3px] bg-[#00C2D4] h-0 group-hover:h-full"
        style={{ transition: "height 400ms cubic-bezier(0.22,1,0.36,1)" }}
      />

      <div
        className="service-card__num font-display absolute top-4 right-6 text-cream leading-none select-none pointer-events-none origin-top-right opacity-[0.06] scale-100 group-hover:opacity-[0.15] group-hover:scale-105"
        style={{
          fontSize: "clamp(80px, 10vw, 140px)",
          transition: "opacity 300ms ease, transform 300ms ease",
        }}
        aria-hidden
      >
        {service.num}
      </div>

      <h3
        className="font-display relative normal-case pr-28 md:pr-36"
        style={{
          fontSize: "clamp(26px, 2.6vw, 36px)",
          fontWeight: 700,
          lineHeight: 1.15,
          color: "#F5F0E8",
        }}
      >
        {service.title}
      </h3>

      <p
        className="mt-4 max-w-2xl"
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 15,
          color: "#A89F91",
          lineHeight: 1.6,
        }}
      >
        {service.subtitle}
      </p>

      <ul className="mt-8 space-y-3">
        {service.items.map((item, i) => (
          <li
            key={i}
            className="flex gap-3"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 14,
              color: "#C8C0B4",
              lineHeight: 1.6,
            }}
          >
            <span
              className="service-card__arrow flex-shrink-0 mt-0.5 inline-block group-hover:translate-x-1"
              style={{ transition: "transform 300ms ease", color: "#00C2D4" }}
            >
              →
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-6">
        <p
          className="service-card__closing italic"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 15,
            color: "#00C2D4",
            transition: "text-shadow 300ms ease, filter 300ms ease",
          }}
        >
          {service.closing}
        </p>
      </div>
    </article>
  );
};

const Services = () => {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.2 });
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container) return;
    const cards = Array.from(
      container.querySelectorAll<HTMLElement>("[data-service-card]")
    );
    if (cards.length === 0) return;

    const visibleSet = new Set<number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const i = Number((entry.target as HTMLElement).dataset.index);
          if (entry.isIntersecting) visibleSet.add(i);
          else visibleSet.delete(i);
        });
        if (visibleSet.size > 0) {
          setActiveIndex(Math.min(...visibleSet));
        }
      },
      { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  const total = SERVICES.length;
  const counter = `${String(activeIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <section id="servicos" className="relative bg-background py-28 md:py-40">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Sticky left title — vertically centered in viewport */}
          <div className="lg:col-span-5">
            <div
              className="lg:sticky lg:flex lg:items-center lg:min-h-screen"
              style={{ top: 0 }}
              ref={ref}
            >
            <div className="w-full">
              <div
                className="h-px bg-gold mb-6 transition-all duration-700"
                style={{ width: visible ? 60 : 0 }}
              />
              <h2
                className="font-display leading-[0.9] transition-all duration-700"
                style={{
                  fontSize: "clamp(48px, 6vw, 80px)",
                  color: "#F5F0E8",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(40px)",
                }}
              >
                MAS COMO<br />ENTREGAMOS<br /><span style={{ color: "#00C2D4" }}>TUDO ISSO?</span>
              </h2>
              <p
                className="mt-8 max-w-md transition-all duration-700 delay-200"
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 16,
                  color: "#6B6B6B",
                  lineHeight: 1.6,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                }}
              >
                Cada resultado que tu viu acima tem um sistema por trás.
                Aqui estão as peças.
              </p>

              {/* Dynamic counter */}
              <div
                className="mt-8 font-display tabular-nums transition-all duration-700 delay-300"
                style={{
                  fontSize: "clamp(28px, 2.5vw, 36px)",
                  letterSpacing: "0.05em",
                  color: "#00C2D4",
                  opacity: visible ? 1 : 0,
                }}
                aria-live="polite"
              >
                {counter}
              </div>
            </div>
            </div>
          </div>

          {/* Right scrolling cards */}
          <div ref={cardsContainerRef} className="lg:col-span-7 flex flex-col gap-[2px] bg-[#0F0F0F]">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.num} service={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
