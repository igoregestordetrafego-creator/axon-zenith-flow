import { useEffect, useRef } from "react";

/**
 * Custom cursor: dot + lagging ring + soft spotlight that follows the mouse.
 * Disabled on touch devices via CSS.
 */
const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let sx = mx, sy = my;
    let raf = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }
    };

    const tick = () => {
      // ring lags ~10%
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      sx += (mx - sx) * 0.08;
      sy += (my - sy) * 0.08;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      if (spotRef.current) {
        spotRef.current.style.transform = `translate(${sx}px, ${sy}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor-hover]")) {
        ringRef.current?.classList.add("hover-link");
      }
    };
    const out = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor-hover]")) {
        ringRef.current?.classList.remove("hover-link");
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={spotRef} className="cursor-spotlight" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
};

export default CustomCursor;
