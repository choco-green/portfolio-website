import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "../classNames";

type ActionLinkVariant = "primary" | "neutral";

type ActionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: ActionLinkVariant;
};

const variants: Record<ActionLinkVariant, string> = {
  primary: "bg-accent text-[rgb(var(--rgb-accent-contrast))] shadow-xs hover:bg-accent-strong",
  neutral: "border border-line bg-raised text-ink hover:border-accent hover:text-accent-strong"
};

export default function ActionLink({ children, className, variant = "neutral", ...props }: ActionLinkProps) {
  return (
    <a
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-black transition",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
