import type { NavItem } from "../types";

type SubmitEvent = {
  preventDefault: () => void;
};

type CommandNavigationInputProps = {
  active?: NavItem;
  query: string;
  suggestions: NavItem[];
  onQueryChange: (value: string) => void;
  onSubmit: (event: SubmitEvent) => void;
  onSelect: (item: NavItem) => void;
  setSuggestionsOpen: (open: boolean) => void;
  suggestionsOpen: boolean;
};

export default function CommandNavigationInput({
  active,
  query,
  suggestions,
  onQueryChange,
  onSubmit,
  onSelect,
  setSuggestionsOpen,
  suggestionsOpen
}: CommandNavigationInputProps) {
  return (
    <form
      onSubmit={onSubmit}
      onFocus={() => setSuggestionsOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setSuggestionsOpen(false);
        }
      }}
      className="relative hidden w-64 items-center md:flex lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
    >
      <label htmlFor="command-navigation" className="sr-only">
        Command navigation input
      </label>
      <div data-testid="command-control" className="site-nav-control flex min-h-11 w-full items-center rounded-md border px-3 shadow-sm">
        <span aria-hidden="true" className="site-nav-accent mr-2 font-mono text-sm">
          &gt;
        </span>
        <input
          id="command-navigation"
          data-testid="command-input"
          value={query}
          onChange={(event) => {
            onQueryChange(event.target.value);
            setSuggestionsOpen(true);
          }}
          placeholder="Type a command or search..."
          className="site-nav-input min-w-0 flex-1 bg-transparent text-sm text-[rgb(var(--color-nav-ink))] focus:outline-none"
          autoComplete="off"
        />
      </div>
      {suggestionsOpen ? (
        <ul
          className="site-nav-popover absolute left-0 right-0 top-[calc(100%+0.5rem)] grid grid-cols-1 gap-2 rounded-md border p-2 shadow-crisp"
          aria-label="Command Navigation suggestions"
        >
          {suggestions.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onPointerDown={(event) => event.preventDefault()}
                onClick={() => onSelect(item)}
                aria-current={active?.id === item.id ? "page" : undefined}
                className="site-nav-option flex min-h-10 w-full items-center rounded-md border border-transparent px-3 text-left text-sm font-semibold transition"
              >
                <span className="min-w-0 truncate">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </form>
  );
}
