import { useEffect, useRef, useState } from "react";
import { WHATSAPP_URL } from "@/lib/constants";

const Hero = () => {
  const dotsRef = useRef<HTMLCanvasElement>(null);
  const [showArrow, setShowArrow] = useState(true);

  // Magnetic dot grid background
  useEffect(() => {
    const canvas = dotsRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    let dpr = window.devicePixelRatio || 1;
    let mouse = { x: -9999, y: -9999 };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const gap = 28;
      for (let x = gap; x < w; x += gap) {
        for (let y = gap; y < h; y += gap) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const inField = dist < 160;
          const alpha = inField ? 0.04 + (1 - dist / 160) * 0.35 : 0.04;
          ctx.fillStyle = `hsla(36, 35%, 93%, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, inField ? 1.5 : 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    canvas.addEventListener("mouseleave", onLeave);

    const onScroll = () => setShowArrow(window.scrollY < 200);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-background"
    >
      {/* Dot-grid magnetic background */}
      <canvas
        ref={dotsRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden
      />

      {/* Soft vignette */}
      <div className="absolute inset-0 bg-fade-bottom pointer-events-none" />

      <div className="container relative z-10 pt-24 pb-32">
        <div className="max-w-[1100px] mx-auto text-center flex flex-col items-center">
          {/* Eyebrow */}
          <div
            className="flex items-center justify-center gap-3 mb-8 opacity-0"
            style={{ animation: "word-rise 0.7s ease-out 0.1s forwards" }}
          >
            <span className="h-px w-10 bg-gold" />
            <span className="text-cream-dim text-xs tracking-[0.3em] uppercase font-medium">
              Agência de performance digital
            </span>
            <span className="h-px w-10 bg-gold" />
          </div>

          <h1 className="font-display leading-[0.95] text-cream" style={{ fontWeight: 700, letterSpacing: "0.03em" }}>
            <span
              className="block opacity-0"
              style={{
                fontSize: "clamp(56px, 9vw, 120px)",
                animation: "word-rise 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s forwards",
              }}
            >
              Tráfego pago
            </span>
            <span
              className="block opacity-0"
              style={{
                fontSize: "clamp(56px, 9vw, 120px)",
                color: "hsl(var(--accent-gold))",
                animation: "word-rise 0.9s cubic-bezier(0.22,1,0.36,1) 0.25s forwards",
              }}
            >
              É só o começo.
            </span>
          </h1>

          <div className="mt-10 max-w-3xl space-y-4 mx-auto">
            <p
              className="text-cream/90 text-lg md:text-xl leading-relaxed font-medium opacity-0"
              style={{ animation: "word-rise 0.7s ease-out 0.45s forwards" }}
            >
              Mapeamos, ajustamos e escalamos completamente todos os seus processos
              com foco em resolver gargalos que nunca te mostraram.
            </p>
            <p
              className="text-cream/90 text-lg md:text-xl leading-relaxed font-medium opacity-0"
              style={{ animation: "word-rise 0.7s ease-out 0.55s forwards" }}
            >
              Tráfego pago é apenas um nó de uma estrutura altamente complexa.
            </p>
            <p
              className="font-sora italic text-gold/90 text-base md:text-lg opacity-0"
              style={{ animation: "word-rise 0.7s ease-out 0.7s forwards" }}
            >
              Conte com a Axon para escalar a sua operação, seja ela qual for.
            </p>
          </div>

          <div
            className="mt-12 opacity-0"
            style={{ animation: "word-rise 0.7s cubic-bezier(0.22,1,0.36,1) 0.8s forwards" }}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-metallic group inline-flex items-center gap-4 border border-cream text-cream px-8 py-5 text-sm md:text-base tracking-[0.2em] uppercase font-semibold rounded-full transition-all duration-300"
            >
              Quero escalar minha operação
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-500"
        style={{ opacity: showArrow ? 1 : 0 }}
        aria-hidden
      >
        <div className="flex flex-col items-center gap-2 text-cream-dim">
          <span className="text-[10px] tracking-[0.3em] uppercase">Role</span>
          <svg className="animate-scroll-bounce" width="16" height="24" viewBox="0 0 16 24" fill="none">
            <path d="M8 2 L8 22 M2 16 L8 22 L14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
