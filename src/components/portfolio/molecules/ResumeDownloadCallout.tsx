import { Download } from "lucide-react";
import type { ContactAction } from "../types";

type ResumeDownloadCalloutProps = {
  action: ContactAction;
};

export default function ResumeDownloadCallout({ action }: ResumeDownloadCalloutProps) {
  const Icon = action.icon;

  return (
    <a
      href={action.href}
      className="group flex min-h-36 flex-col justify-between gap-5 rounded-md border border-contact-accent/70 bg-contact-accent px-5 py-5 text-contact shadow-crisp transition hover:bg-white focus-visible:bg-white sm:min-h-32 sm:flex-row sm:items-center sm:px-6"
      aria-label={`${action.label}: ${action.detail}`}
      data-testid="contact-resume-callout"
    >
      <span className="flex min-w-0 items-start gap-4">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-contact text-contact-accent">
          <Icon aria-hidden="true" size={22} />
        </span>
        <span className="min-w-0">
          <span className="block text-xl font-black leading-tight text-contact sm:text-2xl">Download resume</span>
          <span className="mt-2 block text-sm font-bold text-contact/75">{action.detail}</span>
        </span>
      </span>
      <span className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-contact px-4 py-2 text-sm font-black text-contact-accent transition group-hover:bg-contact/90">
        <Download aria-hidden="true" size={17} />
        PDF
      </span>
    </a>
  );
}
