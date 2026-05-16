import { cn } from "@/lib/utils";
import birdImg from "@/assets/axon-bird.png";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img
        src={birdImg}
        alt="Axon Growth"
        className="h-9 md:h-11 w-auto select-none"
        draggable={false}
      />
      <span
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(18px, 2vw, 22px)",
          letterSpacing: "0.12em",
          color: "#F5F0E8",
          lineHeight: 1,
        }}
      >
        AXON GROWTH
      </span>
    </div>
  );
};

export default Logo;
