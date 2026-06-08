import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../classNames";

type CardTone = "panel" | "raised";

type CardProps = ComponentPropsWithoutRef<"article"> & {
  tone?: CardTone;
};

const tones: Record<CardTone, string> = {
  panel: "bg-panel shadow-xs",
  raised: "bg-raised"
};

export default function Card({ className, tone = "panel", ...props }: CardProps) {
  return <article className={cn("rounded-md border border-line p-5", tones[tone], className)} {...props} />;
}
