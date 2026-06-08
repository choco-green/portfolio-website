import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../classNames";

type EyebrowTone = "default" | "inverse" | "timeline";

type EyebrowProps = ComponentPropsWithoutRef<"p"> & {
  tone?: EyebrowTone;
};

export default function Eyebrow({ className, tone = "default", ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-mono text-sm font-bold",
        tone === "timeline" ? "text-[var(--timeline-muted)]" : tone === "inverse" ? "text-contact-accent" : "text-accent-strong",
        className
      )}
      {...props}
    />
  );
}
