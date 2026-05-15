import Logo from "../Logo";
import { WHATSAPP_URL } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="pt-20 pb-10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <Logo />
            <p className="mt-6 text-cream-dim text-sm leading-relaxed max-w-xs">Performance real.</p>
            <p className="text-cream-dim text-sm leading-relaxed max-w-xs">Sem intermediários.</p>
          </div>

          <div>
            <h4 className="text-cream font-sora font-semibold text-sm tracking-[0.2em] uppercase mb-5">
              Navegação
            </h4>
            <ul className="space-y-3 text-cream-dim text-sm">
              <li><a href="#hero" className="hover:text-gold transition-colors story-link">Início</a></li>
              <li><a href="#sobre" className="hover:text-gold transition-colors story-link">Sobre</a></li>
              <li><a href="#servicos" className="hover:text-gold transition-colors story-link">Serviços</a></li>
              <li><a href="#resultados" className="hover:text-gold transition-colors story-link">Resultados</a></li>
              <li><a href="#depoimentos" className="hover:text-gold transition-colors story-link">Depoimentos</a></li>
              <li><a href="#faq" className="hover:text-gold transition-colors story-link">FAQ</a></li>
              <li><a href="#contato" className="hover:text-gold transition-colors story-link">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-cream font-sora font-semibold text-sm tracking-[0.2em] uppercase mb-5">
              Contato
            </h4>
            <ul className="space-y-3 text-cream-dim text-sm">
              <li><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="hover:text-gold transition-colors story-link">WhatsApp</a></li>
              <li><a href="mailto:contato@axongrowth.com.br" className="hover:text-gold transition-colors story-link">contato@axongrowth.com.br</a></li>
              <li><a href="https://instagram.com/axongrowth" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors story-link">@axongrowth</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-3 text-cream-dim text-xs">
          <p>© 2025 Axon Growth. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
