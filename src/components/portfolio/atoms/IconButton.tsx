import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../classNames";

type IconButtonVariant = "default" | "inverse";

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  ariaLabel: string;
  children: ReactNode;
  testId?: string;
  variant?: IconButtonVariant;
};

const variants: Record<IconButtonVariant, string> = {
  default: "border-line bg-raised text-ink shadow-sm hover:border-accent hover:text-accent-strong",
  inverse: "border-white/25 bg-white/10 text-white hover:border-contact-accent hover:text-contact-accent"
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { ariaLabel, children, className, testId, variant = "default", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      data-testid={testId}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border transition",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

export default IconButton;
