import { cn } from "@/lib/utils";
import logoImg from "@/assets/axon-logo.png";

interface LogoProps {
  className?: string;
  /** Kept for API compatibility — the wordmark is part of the image. */
  showText?: boolean;
}

/**
 * Axon Growth official logo (bird mark + wordmark baked in).
 */
const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("flex items-center", className)}>
      <img
        src={logoImg}
        alt="Axon Growth"
        className="h-14 md:h-16 w-auto select-none"
        draggable={false}
      />
    </div>
  );
};

export default Logo;
