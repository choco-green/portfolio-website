import { ExternalLink } from "lucide-react";
import type { ContactAction } from "../types";

type ContactActionCardProps = {
  action: ContactAction;
};

export default function ContactActionCard({ action }: ContactActionCardProps) {
  const Icon = action.icon;
  const external = action.href.startsWith("https://");

  return (
    <a
      href={action.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex min-h-24 items-center gap-4 rounded-md border border-white/20 bg-white/8 p-4 transition hover:border-contact-accent hover:bg-white/12"
      aria-label={`${action.label}: ${action.detail}`}
    >
      <span className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-md bg-white/12 text-contact-accent">
        <Icon aria-hidden="true" size={21} />
      </span>
      <span className="min-w-0">
        <span className="block font-black">{action.label}</span>
        <span className="mt-1 block break-words text-sm text-white/72">{action.detail}</span>
      </span>
      {external ? <ExternalLink aria-hidden="true" className="ml-auto shrink-0 text-white/55" size={16} /> : null}
    </a>
  );
}
