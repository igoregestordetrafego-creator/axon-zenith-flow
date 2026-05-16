import { useReveal } from "@/hooks/useReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS: { q: string; a: string[] }[] = [
  {
    q: "Vocês trabalham com qualquer tipo de negócio?",
    a: [
      "Não. Somos seletivos por princípio.",
      "Antes de fechar qualquer contrato, fazemos um diagnóstico da operação.",
      "Se não enxergarmos potencial real de resultado, não fechamos.",
      "Trabalhamos com e-commerces, prestadores de serviço, clínicas, infoprodutores e negócios locais com estrutura para escalar.",
    ],
  },
  {
    q: "Qual o investimento mínimo em mídia para trabalhar com vocês?",
    a: [
      "Não temos uma regra fixa, mas trabalhamos com clientes que investem a partir de R$ 3.000/mês em mídia.",
      "Abaixo disso, o volume de dado não sustenta uma gestão estratégica real.",
      "O que importa não é o quanto você investe hoje.",
      "É o quanto você está disposto a construir.",
    ],
  },
  {
    q: "Como funciona o processo de entrada?",
    a: [
      "Primeiro contato pelo WhatsApp.",
      "Se fizer sentido para ambos os lados, partimos para um diagnóstico da sua operação: tráfego, funil, dados, comercial.",
      "Com base nisso, montamos um plano e apresentamos o escopo.",
      "Sem apresentação genérica.",
      "Sem proposta de gaveta.",
    ],
  },
  {
    q: "Vocês garantem resultado?",
    a: [
      "Nenhuma agência séria garante resultado com número específico.",
      "Isso é promessa de charlatão.",
      "O que garantimos é processo: diagnóstico honesto, execução com dado real, ajuste constante e comunicação direta.",
      "Nossos números falam por si: 11x a 27x de retorno médio nas contas ativas.",
    ],
  },
  {
    q: "Qual o prazo para começar a ver resultado?",
    a: [
      "Depende do estado da tua operação.",
      "Contas que já têm estrutura tendem a ver movimento nas primeiras 2 a 4 semanas.",
      "Operações que precisam de reconstrução completa levam de 60 a 90 dias para mostrar resultado consistente.",
      "O que nunca fazemos é acelerar por pressão e queimar verba.",
    ],
  },
  {
    q: "Como é feito o acompanhamento?",
    a: [
      "Acesso direto ao time via WhatsApp.",
      "Reuniões estratégicas quinzenais ou mensais dependendo do escopo.",
      "Dashboard atualizado com dados reais, não relatório de vaidade.",
      "Você sempre sabe o que está acontecendo, por quê e o que vem a seguir.",
    ],
  },
  {
    q: "Trabalham com contrato de fidelidade?",
    a: [
      "Trabalhamos com contratos de 3 meses no mínimo, tempo necessário para qualquer estratégia mostrar resultado real.",
      "Não acreditamos em fidelidade por obrigação.",
      "Se estamos entregando, tu vai querer continuar.",
      "Se não estamos, tu não deveria ficar.",
    ],
  },
  {
    q: "O que diferencia a Axon das outras agências?",
    a: [
      "A maioria das agências vende serviço.",
      "A Axon constrói operação.",
      "A diferença está no diagnóstico antes de qualquer execução, na visão sistêmica do negócio inteiro e no fato de que quem atende a sua conta é quem decide, não um analista júnior seguindo checklist.",
    ],
  },
];

const answerStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: 15,
  color: "#A89F91",
  lineHeight: 1.7,
};

const FAQ = () => {
  const { ref: headRef, visible } = useReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section id="faq" className="relative py-28 md:py-40">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div ref={headRef} className="mb-14">
            <div
              className="h-px bg-gold mb-6 transition-all duration-700"
              style={{ width: visible ? 60 : 0 }}
            />
            <h2
              className="font-display leading-[0.9]"
              style={{
                fontSize: "clamp(48px, 5.5vw, 80px)",
                color: "#F5F0E8",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              PERGUNTAS<br />
              <span style={{ color: "#00C2D4" }}>FREQUENTES</span>
            </h2>
            <p
              className="mt-6 transition-all duration-700 delay-200"
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 15,
                color: "#6B6B6B",
                lineHeight: 1.6,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              As dúvidas mais comuns antes de tomar a decisão certa.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b-0"
                style={{ borderBottom: "1px solid #1E1E1E" }}
              >
                <AccordionTrigger
                  className="hover:no-underline py-6 text-left gap-6 group"
                  style={{
                    fontFamily: "'Sora', system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(14px, 1.3vw, 16px)",
                    color: "inherit",
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    className="group-data-[state=open]:text-gold transition-colors duration-200"
                    style={{ color: "#F5F0E8" }}
                  >
                    {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div style={{ paddingBottom: 16 }}>
                    {faq.a.map((line, j) => (
                      <p
                        key={j}
                        style={{
                          ...answerStyle,
                          marginBottom: j < faq.a.length - 1 ? 10 : 0,
                        }}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
