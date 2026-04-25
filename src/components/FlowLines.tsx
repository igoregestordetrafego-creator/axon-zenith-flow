import { useEffect, useRef } from "react";

/**
 * Global animated background flow lines.
 * Fixed canvas covering the viewport. Independent of scroll/cursor.
 * Renders 6–12 cyan organic curves at any time, each living 4–8s with
 * fade-in / travel / fade-out lifecycle.
 */

interface Line {
  x: number;
  y: number;
  // direction unit vector
  dx: number;
  dy: number;
  length: number;       // total path length (200–400)
  duration: number;     // ms (4000–8000)
  born: number;         // performance.now()
  curve: number;        // bezier offset magnitude (organic curve)
  curveDir: number;     // perpendicular direction sign
  alphaPeak: number;    // 0.03–0.07
}

const MIN_LINES = 6;
const MAX_LINES = 12;

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

function spawnLine(w: number, h: number, now: number): Line {
  const angle = Math.random() * Math.PI * 2;
  return {
    x: rand(0, w),
    y: rand(0, h),
    dx: Math.cos(angle),
    dy: Math.sin(angle),
    length: rand(200, 400),
    duration: rand(4000, 8000),
    born: now,
    curve: rand(20, 60),
    curveDir: Math.random() > 0.5 ? 1 : -1,
    alphaPeak: rand(0.03, 0.07),
  };
}

const FlowLines = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const lines: Line[] = [];
    const target = Math.floor(rand(MIN_LINES, MAX_LINES + 1));
    const now0 = performance.now();
    for (let i = 0; i < target; i++) {
      // stagger initial births so they don't all fade together
      const l = spawnLine(w, h, now0 - rand(0, 4000));
      lines.push(l);
    }

    let raf = 0;
    const draw = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, w, h);

      for (let i = lines.length - 1; i >= 0; i--) {
        const l = lines[i];
        const t = (now - l.born) / l.duration; // 0..1
        if (t >= 1) {
          // respawn — keep within target window 6..12
          const desired = Math.floor(rand(MIN_LINES, MAX_LINES + 1));
          if (lines.length > desired) {
            lines.splice(i, 1);
          } else {
            lines[i] = spawnLine(w, h, now);
          }
          continue;
        }

        // fade envelope: in 0..0.2, hold 0.2..0.8, out 0.8..1
        let env: number;
        if (t < 0.2) env = t / 0.2;
        else if (t > 0.8) env = (1 - t) / 0.2;
        else env = 1;
        const alpha = l.alphaPeak * env;

        // travel progress — head moves along the path
        const head = t; // 0..1 of total length
        const tailLen = 0.35; // visible trailing portion

        // sample points along organic curve (slight perpendicular bow)
        const px = -l.dy * l.curveDir;
        const py = l.dx * l.curveDir;

        ctx.strokeStyle = `rgba(0, 194, 212, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.lineCap = "round";
        ctx.beginPath();

        const samples = 24;
        let started = false;
        for (let s = 0; s <= samples; s++) {
          const u = s / samples; // 0..1 along total path
          // only draw the visible trailing portion behind the head
          if (u > head) break;
          if (u < head - tailLen) continue;

          const dist = u * l.length;
          // organic curve: sine bow perpendicular to direction
          const bow = Math.sin(u * Math.PI) * l.curve;
          const x = l.x + l.dx * dist + px * bow;
          const y = l.y + l.dy * dist + py * bow;

          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 0, width: "100vw", height: "100vh" }}
    />
  );
};

export default FlowLines;
