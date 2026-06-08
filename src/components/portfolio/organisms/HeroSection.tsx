import ActionLink from "../atoms/ActionLink";
import Eyebrow from "../atoms/Eyebrow";
import { localizedResumeDownloadHref } from "../resume";
import type { ResponsiveImage } from "../types";

type HeroSectionProps = {
  portrait: ResponsiveImage;
};

export default function HeroSection({ portrait }: HeroSectionProps) {
  return (
    <section id="home" aria-labelledby="hero-heading" className="surface-grid scroll-mt-24 px-4 py-10 sm:px-6 sm:py-12 md:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-4 sm:gap-5 md:gap-6 lg:min-h-[82svh] lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.7fr)] lg:gap-8">
        <div data-testid="hero-copy" className="max-w-3xl">
          <Eyebrow className="mb-4 inline-flex rounded-md border border-line bg-raised px-3 py-1.5">Full-stack engineer</Eyebrow>
          <h1 id="hero-heading" className="text-balance text-5xl font-black leading-[0.96] text-ink sm:text-6xl lg:text-7xl">
            Justin Fung
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-muted sm:text-2xl sm:leading-9">
            I build polished web products with robust backend systems, with a keen eye for UI/UX.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ActionLink
              href={localizedResumeDownloadHref}
              variant="primary"
              className="min-h-12 px-5 py-3"
            >
              Download Resume
            </ActionLink>
          </div>
        </div>
        <figure
          data-testid="hero-portrait-frame"
          className="order-first mx-auto size-44 overflow-hidden rounded-[9999px] border border-line shadow-crisp sm:size-60 md:size-72 lg:order-none lg:aspect-[2/3] lg:h-auto lg:w-full lg:max-w-[28rem] lg:rounded-md"
        >
          <img
            src={portrait.src}
            srcSet={portrait.srcSet}
            sizes={portrait.sizes}
            alt="Portrait of Justin Fung"
            width={portrait.width}
            height={portrait.height}
            className="h-full w-full object-cover object-[center_68%] [transform:scale(1.5)] lg:object-top lg:[transform:scale(1)]"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </figure>
      </div>
    </section>
  );
}
