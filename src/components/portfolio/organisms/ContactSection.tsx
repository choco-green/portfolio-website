import { contactActions } from "../content";
import ContactActionCard from "../molecules/ContactActionCard";

export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 bg-contact px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <h2 id="contact-heading" className="text-3xl font-black leading-tight text-white sm:text-4xl">
            Contact me
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {contactActions.map((action) => (
              <ContactActionCard key={action.href} action={action} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
