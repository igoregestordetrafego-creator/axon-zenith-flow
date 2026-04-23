import { useEffect, useState } from "react";
import Logo from "./Logo";

const LoadingScreen = () => {
  const [hidden, setHidden] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHidden(true), 1100);
    const t2 = setTimeout(() => setGone(true), 1700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-[10001] flex items-center justify-center bg-background transition-opacity duration-500"
      style={{ opacity: hidden ? 0 : 1, pointerEvents: hidden ? "none" : "auto" }}
      aria-hidden
    >
      <div className="animate-logo-grow">
        <Logo />
      </div>
    </div>
  );
};

export default LoadingScreen;
