import { ExternalLink } from "lucide-react";
import type { ContactAction } from "../types";

type ContactLinkTabsProps = {
  actions: ContactAction[];
};

export default function ContactLinkTabs({ actions }: ContactLinkTabsProps) {
  return (
    <nav
      aria-label="Contact link tabs"
      className="grid overflow-hidden rounded-md border border-white/20 bg-white/8 divide-y divide-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
      data-testid="contact-social-tabs"
    >
      {actions.map((action) => {
        const Icon = action.icon;
        const external = action.href.startsWith("https://");

        return (
          <a
            key={action.href}
            href={action.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="group flex min-h-24 items-center gap-4 px-4 py-4 transition hover:bg-white/10 focus-visible:bg-white/10 sm:flex-col sm:items-start sm:justify-between"
            aria-label={`${action.label}: ${action.detail}`}
          >
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white/12 text-contact-accent">
              <Icon aria-hidden="true" size={20} />
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-2 font-black">
                {action.label}
                {external ? <ExternalLink aria-hidden="true" className="text-white/55 transition group-hover:text-contact-accent" size={15} /> : null}
              </span>
              <span className="mt-1 block break-words text-sm text-white/72">{action.detail}</span>
            </span>
          </a>
        );
      })}
    </nav>
  );
}
