import { useEffect, useRef } from "react";

/**
 * Global animated background flow lines.
 * Fixed canvas covering the viewport, behind all content but above the background.
 * Renders 8–12 cyan curved particles travelling along organic bezier paths.
 */

interface Particle {
  // bezier control points (start, c1, c2, end) — defines the curved trajectory
  x0: number; y0: number;
  cx1: number; cy1: number;
  cx2: number; cy2: number;
  x1: number; y1: number;
  // travel
  progress: number;     // 0..1 along the bezier
  speed: number;        // increment per frame (mapped from px/frame via length)
  width: number;        // 0.5–1.5
  alphaPeak: number;    // 0.12
  trail: number;        // visible trail portion (0..1 of curve)
  life: number;         // ms total
  born: number;         // performance.now()
}

const MIN_PARTICLES = 8;
const MAX_PARTICLES = 12;

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

function spawnParticle(w: number, h: number, now: number): Particle {
  const length = rand(80, 220);
  // direction: -30..+30 degrees from horizontal, randomly flipped left/right
  const deg = rand(-30, 30);
  const rad = (deg * Math.PI) / 180;
  const dirSign = Math.random() > 0.5 ? 1 : -1;
  const dx = Math.cos(rad) * dirSign;
  const dy = Math.sin(rad);

  const x0 = rand(0, w);
  const y0 = rand(0, h);
  const x1 = x0 + dx * length;
  const y1 = y0 + dy * length;

  // organic curve — perpendicular bow on control points
  const px = -dy;
  const py = dx;
  const bow1 = rand(20, 60) * (Math.random() > 0.5 ? 1 : -1);
  const bow2 = rand(20, 60) * (Math.random() > 0.5 ? 1 : -1);

  const cx1 = x0 + dx * length * 0.33 + px * bow1;
  const cy1 = y0 + dy * length * 0.33 + py * bow1;
  const cx2 = x0 + dx * length * 0.66 + px * bow2;
  const cy2 = y0 + dy * length * 0.66 + py * bow2;

  // speed: 0.3–0.8 px/frame → progress increment
  const pxPerFrame = rand(0.3, 0.8);
  const speed = pxPerFrame / length;

  return {
    x0, y0, cx1, cy1, cx2, cy2, x1, y1,
    progress: 0,
    speed,
    width: rand(0.5, 1.5),
    alphaPeak: 0.12,
    trail: rand(0.25, 0.4),
    life: rand(4000, 9000),
    born: now,
  };
}

// cubic bezier point at t
function bezierPoint(
  t: number,
  x0: number, y0: number,
  cx1: number, cy1: number,
  cx2: number, cy2: number,
  x1: number, y1: number,
) {
  const it = 1 - t;
  const b0 = it * it * it;
  const b1 = 3 * it * it * t;
  const b2 = 3 * it * t * t;
  const b3 = t * t * t;
  return {
    x: b0 * x0 + b1 * cx1 + b2 * cx2 + b3 * x1,
    y: b0 * y0 + b1 * cy1 + b2 * cy2 + b3 * y1,
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

    const particles: Particle[] = [];
    const target = Math.floor(rand(MIN_PARTICLES, MAX_PARTICLES + 1));
    const now0 = performance.now();
    for (let i = 0; i < target; i++) {
      const p = spawnParticle(w, h, now0);
      // stagger initial progress so they don't all start together
      p.progress = Math.random();
      particles.push(p);
    }

    let raf = 0;
    const draw = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, w, h);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.progress += p.speed;

        const ageRatio = (now - p.born) / p.life;
        const offscreen =
          p.x1 < -50 || p.x1 > w + 50 || p.y1 < -50 || p.y1 > h + 50;

        if (p.progress >= 1 || ageRatio >= 1 || offscreen) {
          // respawn immediately, keeping count within target window
          const desired = Math.floor(rand(MIN_PARTICLES, MAX_PARTICLES + 1));
          if (particles.length > desired) {
            particles.splice(i, 1);
          } else {
            particles[i] = spawnParticle(w, h, now);
          }
          continue;
        }

        // opacity envelope: 0 → peak at mid → 0 at end (sine-shaped)
        const env = Math.sin(p.progress * Math.PI);
        const alpha = p.alphaPeak * env;

        ctx.strokeStyle = `rgba(0, 194, 212, ${alpha})`;
        ctx.lineWidth = p.width;
        ctx.lineCap = "round";
        ctx.beginPath();

        const samples = 20;
        const head = p.progress;
        const tailStart = Math.max(0, head - p.trail);
        let started = false;
        for (let s = 0; s <= samples; s++) {
          const u = tailStart + ((head - tailStart) * s) / samples;
          const pt = bezierPoint(
            u,
            p.x0, p.y0, p.cx1, p.cy1, p.cx2, p.cy2, p.x1, p.y1,
          );
          if (!started) {
            ctx.moveTo(pt.x, pt.y);
            started = true;
          } else {
            ctx.lineTo(pt.x, pt.y);
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
      style={{ zIndex: 1, width: "100vw", height: "100vh" }}
    />
  );
};

export default FlowLines;
