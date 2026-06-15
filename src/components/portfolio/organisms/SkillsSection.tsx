import { languages, skillGroups, softSkills } from "../content";
import LanguageCard from "../molecules/LanguageCard";
import SectionIntro from "../molecules/SectionIntro";
import SkillGroupCard from "../molecules/SkillGroupCard";

export default function SkillsSection() {
  return (
    <div className="bg-panel">
      <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow="Skills" headingId="skills-heading" title="Technical range for full-stack product work." />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {skillGroups.map((group) => (
              <SkillGroupCard key={group.title} group={group} />
            ))}
          </div>
        </div>
      </section>

      <section id="languages" aria-labelledby="languages-heading" className="scroll-mt-24 px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl border-t border-line pt-12">
          <h2 id="languages-heading" className="text-2xl font-black">
            Languages
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {languages.map((language) => (
              <LanguageCard key={language.name} language={language} />
            ))}
          </div>
        </div>
      </section>

      <section id="soft-skills" aria-labelledby="soft-skills-heading" className="scroll-mt-24 px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl border-t border-line pt-12">
          <h2 id="soft-skills-heading" className="text-2xl font-black">
            Soft Skills
          </h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {softSkills.map((skill) => (
              <li key={skill} className="rounded-md border border-line bg-raised p-5 text-sm font-semibold leading-6 text-muted">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
