import { cn } from "../classNames";
import type { PreparedExperienceEntry } from "../types";

type TimelineProgressProps = {
  activeId: string;
  entries: PreparedExperienceEntry[];
  onSelect: (entry: PreparedExperienceEntry) => void;
};

export default function TimelineProgress({ activeId, entries, onSelect }: TimelineProgressProps) {
  return (
    <div className="mt-6 flex gap-2 lg:flex-col" aria-label="Experience Timeline progress">
      {entries.map((entry, index) => {
        const active = activeId === entry.id;
        return (
          <button
            key={entry.id}
            type="button"
            aria-label={`View ${entry.title} Experience Timeline entry`}
            aria-current={active ? "step" : undefined}
            onClick={() => onSelect(entry)}
            className={cn(
              "timeline-progress-button group flex min-h-11 min-w-11 items-center gap-3 rounded-md border px-3 py-2 text-left transition",
              active && "timeline-progress-button-active"
            )}
          >
            <span aria-hidden="true" className="font-mono text-xs font-black">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="hidden text-sm font-bold lg:inline">{entry.title}</span>
          </button>
        );
      })}
    </div>
  );
}
