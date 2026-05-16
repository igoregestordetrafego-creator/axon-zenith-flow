import { cn } from "@/lib/utils";
import logoImg from "@/assets/axon-logo.png";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("flex items-center", className)}>
      <img
        src={logoImg}
        alt="Axon Growth"
        className="h-10 md:h-12 w-auto select-none"
        draggable={false}
      />
    </div>
  );
};

export default Logo;
