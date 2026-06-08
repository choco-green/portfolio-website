import { useEffect, useState } from "react";

export type SectionTarget = {
  id: string;
  label: string;
};

export function useActiveSection<T extends SectionTarget>(targets: T[]) {
  const [activeId, setActiveId] = useState(targets[0]?.id ?? "");

  useEffect(() => {
    const elements = targets
      .map((target) => document.getElementById(target.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const aTop = Math.abs(a.boundingClientRect.top);
            const bTop = Math.abs(b.boundingClientRect.top);
            return aTop - bTop;
          });

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-28% 0px -54% 0px",
        threshold: [0, 0.2, 0.5, 0.8]
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [targets]);

  return targets.find((target) => target.id === activeId) ?? targets[0];
}
