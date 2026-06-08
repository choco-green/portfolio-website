import { lazy, Suspense, useEffect, useMemo, useState, type CSSProperties } from "react";
import TimelineEntryPanel from "../molecules/TimelineEntryPanel";
import TimelineProgress from "../molecules/TimelineProgress";
import type { ExperienceTheme, PreparedEvidenceItem, PreparedExperienceEntry } from "../types";

const EvidenceViewer = lazy(() => import("./EvidenceViewer"));

type TimelineThemeVariable = "accent" | "background" | "background-soft" | "card-number" | "ink" | "line" | "muted";

type TimelineThemeStyle = CSSProperties & Record<`--timeline-${TimelineThemeVariable}`, string>;

function themeToStyle(theme: ExperienceTheme): TimelineThemeStyle {
  return {
    "--timeline-accent": theme.accent,
    "--timeline-background": theme.background,
    "--timeline-background-soft": theme.backgroundSoft,
    "--timeline-card-number": theme.cardNumber,
    "--timeline-ink": theme.ink,
    "--timeline-line": theme.line,
    "--timeline-muted": theme.muted
  };
}

function useActiveTimelineEntry(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-18% 0px -36% 0px",
        threshold: [0.2, 0.45, 0.7]
      }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

type ExperienceTimelineProps = {
  entries: PreparedExperienceEntry[];
};

export default function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  const ids = useMemo(() => entries.map((entry) => entry.id), [entries]);
  const activeId = useActiveTimelineEntry(ids);
  const activeEntry = entries.find((entry) => entry.id === activeId) ?? entries[0];
  const [viewerItem, setViewerItem] = useState<PreparedEvidenceItem | null>(null);
  const timelineThemeStyle = useMemo(() => themeToStyle(activeEntry.theme), [activeEntry]);

  const jumpToEntry = (entry: PreparedExperienceEntry) => {
    const element = document.getElementById(entry.id);
    if (!element) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    history.pushState(null, "", `#${entry.id}`);
  };

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="timeline-section scroll-mt-24 border-y px-4 py-16 sm:px-6 lg:px-8"
      style={timelineThemeStyle}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[0.32fr_1fr]">
          <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <h2 id="experience-heading" className="font-mono text-sm font-bold text-[var(--timeline-muted)]">
              Experience Timeline
            </h2>
            <p className="sr-only" aria-live="polite">
              {activeEntry?.title} is the current Experience Timeline entry.
            </p>
            <TimelineProgress activeId={activeId} entries={entries} onSelect={jumpToEntry} />
          </aside>

          <div className="min-w-0 space-y-10">
            {entries.map((entry) => (
              <div
                key={entry.id}
                id={entry.id}
                data-timeline-entry={entry.id}
                className="relative min-w-0 scroll-mt-24 py-6 lg:min-h-[112svh]"
              >
                <TimelineEntryPanel active={activeId === entry.id} entry={entry} onEvidenceSelect={setViewerItem} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {viewerItem ? (
        <Suspense fallback={null}>
          <EvidenceViewer item={viewerItem} onClose={() => setViewerItem(null)} />
        </Suspense>
      ) : null}
    </section>
  );
}
