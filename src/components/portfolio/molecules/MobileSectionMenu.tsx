import type { ReactNode } from "react";
import type { NavItem } from "../types";

type MobileSectionMenuProps = {
  active?: NavItem;
  children: ReactNode;
  items: NavItem[];
  onSelect: (item: NavItem) => void;
};

export default function MobileSectionMenu({ active, children, items, onSelect }: MobileSectionMenuProps) {
  return (
    <div id="mobile-section-menu" className="site-nav-menu border-t px-4 py-3 md:hidden">
      <div className="mx-auto flex max-w-7xl flex-col gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item)}
            aria-current={active?.id === item.id ? "page" : undefined}
            className="site-nav-option flex min-h-12 min-w-0 items-center justify-between gap-3 rounded-md border px-3 text-left font-semibold"
          >
            <span className="min-w-0 truncate">{item.label}</span>
            <span aria-hidden="true" className="site-nav-muted max-w-[50%] shrink-0 truncate font-mono text-xs">
              {item.href}
            </span>
          </button>
        ))}
        {children}
      </div>
    </div>
  );
}
