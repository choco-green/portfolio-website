import { useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import IconButton from "../atoms/IconButton";
import { navItems } from "../content";
import CommandNavigationInput from "../molecules/CommandNavigationInput";
import MobileSectionMenu from "../molecules/MobileSectionMenu";
import ThemeToggle from "../molecules/ThemeToggle";
import type { NavItem } from "../types";
import { useActiveSection } from "../../../hooks/useActiveSection";

type SubmitEvent = {
  preventDefault: () => void;
};

function navigateTo(item: NavItem) {
  const element = document.getElementById(item.id);
  if (!element) {
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  element.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  history.pushState(null, "", item.href);
}

export default function Navigation() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const active = useActiveSection(navItems);

  const suggestions = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return navItems;
    }

    return navItems.filter((item) => {
      const terms = [item.label, item.id, ...item.aliases].join(" ").toLowerCase();
      return terms.includes(trimmed);
    });
  }, [query]);

  const submit = (event: SubmitEvent) => {
    event.preventDefault();
    const first = suggestions[0];
    if (first) {
      navigateTo(first);
      setQuery(first.label);
      setSuggestionsOpen(false);
    }
  };

  const selectItem = (item: NavItem) => {
    navigateTo(item);
    setQuery(item.label);
    setSuggestionsOpen(false);
    setMenuOpen(false);
  };

  return (
    <header className="site-nav sticky top-0 z-40 border-b">
      <nav aria-label="Primary Portfolio navigation" className="relative mx-auto flex min-w-0 max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div data-testid="desktop-nav-prompt" className="hidden shrink-0 items-center font-mono text-sm font-bold md:flex">
          <a href="#home" className="site-nav-accent">
            justin-fung<span className="site-nav-muted">@portfolio</span>
          </a>
          <span aria-hidden="true" className="site-nav-muted whitespace-pre">
            {" ~$ "}
          </span>
          <span className="text-[rgb(var(--color-nav-ink))]">{active?.label ?? "Home"}</span>
        </div>

        <CommandNavigationInput
          active={active}
          query={query}
          suggestions={suggestions}
          onQueryChange={setQuery}
          onSubmit={submit}
          onSelect={selectItem}
          setSuggestionsOpen={setSuggestionsOpen}
          suggestionsOpen={suggestionsOpen}
        />

        <div className="flex min-w-0 flex-1 items-center justify-between gap-2 md:hidden">
          <a href="#home" className="site-nav-accent min-w-0 truncate font-mono text-sm font-bold">
            justin-fung<span className="site-nav-muted">@portfolio</span>
          </a>
          <IconButton
            className="site-nav-icon-button"
            testId="mobile-menu-button"
            aria-expanded={menuOpen}
            aria-controls="mobile-section-menu"
            ariaLabel={menuOpen ? "Close section menu" : "Open section menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" size={19} /> : <Menu aria-hidden="true" size={19} />}
          </IconButton>
        </div>

        <ThemeToggle className="site-nav-icon-button ml-auto hidden md:inline-flex" testId="theme-toggle-desktop" />
      </nav>

      {menuOpen ? (
        <MobileSectionMenu active={active} items={navItems} onSelect={selectItem}>
          <ThemeToggle className="site-nav-icon-button mt-1 self-start" testId="theme-toggle-mobile" />
        </MobileSectionMenu>
      ) : null}
    </header>
  );
}
