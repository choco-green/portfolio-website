import ProjectCard from "../molecules/ProjectCard";
import SectionIntro from "../molecules/SectionIntro";
import type { PreparedProject } from "../types";

type ProjectsSectionProps = {
  projects: PreparedProject[];
};

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-24 bg-canvas px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro eyebrow="Personal Projects" headingId="projects-heading" title="GitHub repositories" />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.url} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
