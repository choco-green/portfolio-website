import type { ReactNode } from "react";
import Eyebrow from "../atoms/Eyebrow";
import { cn } from "../classNames";

type SectionIntroTone = "default" | "inverse" | "timeline";

type SectionIntroProps = {
  children?: ReactNode;
  className?: string;
  eyebrow: string;
  headingId: string;
  title: string;
  tone?: SectionIntroTone;
};

export default function SectionIntro({ children, className, eyebrow, headingId, title, tone = "default" }: SectionIntroProps) {
  const inverse = tone === "inverse";
  const timeline = tone === "timeline";

  return (
    <div className={cn("max-w-3xl", className)}>
      <Eyebrow tone={timeline ? "timeline" : inverse ? "inverse" : "default"}>{eyebrow}</Eyebrow>
      <h2
        id={headingId}
        className={cn(
          "mt-3 text-3xl font-black leading-tight sm:text-4xl",
          timeline ? "text-[var(--timeline-ink)]" : inverse && "text-white"
        )}
      >
        {title}
      </h2>
      {children ? (
        <div
          className={cn(
            "mt-4 text-base leading-7",
            timeline ? "text-[var(--timeline-muted)]" : inverse ? "text-white/75" : "text-muted"
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
