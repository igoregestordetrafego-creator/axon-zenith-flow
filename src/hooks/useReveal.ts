import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll hook using IntersectionObserver.
 * Returns ref + a boolean once visible.
 */
export const useReveal = <T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.15 }
) => {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      options
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
};
