import type { CSSProperties } from "react";
import { cn } from "../classNames";
import type { PreparedEvidenceItem, PreparedExperienceEntry } from "../types";
import EvidenceCard from "./EvidenceCard";

type TimelineEntryPanelProps = {
  active: boolean;
  entry: PreparedExperienceEntry;
  onEvidenceSelect: (item: PreparedEvidenceItem) => void;
};

export default function TimelineEntryPanel({ active, entry, onEvidenceSelect }: TimelineEntryPanelProps) {
  return (
    <article
      aria-labelledby={`${entry.id}-heading`}
      aria-current={active ? "true" : undefined}
      className={cn(
        "timeline-panel top-24 min-w-0 rounded-md border p-5 shadow-crisp transition sm:p-7 lg:sticky",
        active ? "timeline-panel-active" : "border-line"
      )}
      style={{ "--entry-soft": entry.accent } as CSSProperties}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-mono text-sm font-bold text-accent-strong">{entry.period}</p>
          <h3 id={`${entry.id}-heading`} className="mt-2 text-3xl font-black leading-tight">
            {entry.title}
          </h3>
          <p className="mt-2 text-lg font-bold text-muted">{entry.role}</p>
        </div>
        <img
          src={entry.logo}
          alt={entry.logoAlt}
          data-testid={`timeline-logo-${entry.id}`}
          className="timeline-logo-frame h-14 w-28 rounded-md border object-contain p-3"
          loading="lazy"
        />
      </div>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-ink">{entry.summary}</p>
      <ul className="mt-6 grid gap-3 text-sm leading-6 text-muted sm:grid-cols-3">
        {entry.outcomes.map((outcome) => (
          <li key={outcome} className="rounded-md border border-line bg-raised/72 p-3">
            {outcome}
          </li>
        ))}
      </ul>

      {entry.evidence.length > 0 && (
        <div className="mt-7">
          <h4 className="text-sm font-black uppercase text-muted">Evidence Gallery</h4>
          <div className="mt-3 flex max-w-full gap-4 overflow-x-auto pb-3" aria-label={`${entry.title} Evidence Gallery`}>
            {entry.evidence.map((item) => (
              <EvidenceCard key={item.label} item={item} onSelect={onEvidenceSelect} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
