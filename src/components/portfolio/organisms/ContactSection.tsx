import { contactSocialActions, resumeAction } from "../content";
import ContactLinkTabs from "../molecules/ContactLinkTabs";
import ResumeDownloadCallout from "../molecules/ResumeDownloadCallout";

export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 bg-contact px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8">
        <h2 id="contact-heading" className="text-3xl font-black leading-tight text-white sm:text-4xl">
          Contact me
        </h2>
        <div className="grid gap-4">
          <ContactLinkTabs actions={contactSocialActions} />
          <ResumeDownloadCallout action={resumeAction} />
        </div>
      </div>
    </section>
  );
}
