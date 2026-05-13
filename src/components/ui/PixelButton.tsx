import { AnchorHTMLAttributes } from "react";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "arcane" | "gold";
}

export default function PixelButton({ variant = "arcane", className = "", children, ...props }: Props) {
  const colors =
    variant === "gold"
      ? "border-gold text-gold hover:bg-gold hover:text-robe"
      : "border-arcane text-arcane hover:bg-arcane hover:text-white";

  return (
    <a
      className={`inline-block border-2 px-4 py-2 font-pixel text-xs transition-colors duration-100 ${colors} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
