import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

/**
 * Geometric falcon mark + AXON GROWTH wordmark.
 * Cream on dark, sharp angular wings.
 */
const Logo = ({ className, showText = true }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 48 36"
        className="h-8 w-auto text-cream"
        fill="none"
        aria-hidden="true"
      >
        {/* Angular falcon: sharp swept wings, body, beak */}
        <path
          d="M2 22 L14 4 L20 14 L24 8 L28 14 L34 4 L46 22 L36 18 L30 26 L24 20 L18 26 L12 18 L2 22 Z"
          fill="currentColor"
        />
        <path
          d="M22 20 L24 30 L26 20 Z"
          fill="currentColor"
        />
      </svg>
      {showText && (
        <span className="font-display text-cream text-2xl tracking-[0.18em] leading-none pt-1">
          AXON GROWTH
        </span>
      )}
    </div>
  );
};

export default Logo;
