import Card from "../atoms/Card";
import Tag from "../atoms/Tag";
import type { PreparedProject } from "../types";

type ProjectCardProps = {
  project: PreparedProject;
};

function GitHubMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="21" height="21" fill="currentColor">
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
    </svg>
  );
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card key={project.url} data-project-order={project.order}>
      {project.screenshot ? (
        <div className="-mx-5 -mt-5 mb-5 overflow-hidden rounded-t-md border-b border-line bg-raised">
          <img
            src={project.screenshot.previewImage.src}
            srcSet={project.screenshot.previewImage.srcSet}
            sizes={project.screenshot.previewImage.sizes}
            alt={project.screenshot.alt}
            width={project.screenshot.previewImage.width}
            height={project.screenshot.previewImage.height}
            className="aspect-[16/10] w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : null}
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-black leading-tight">{project.title}</h3>
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-line bg-raised text-accent-strong transition hover:border-accent hover:bg-accent-soft"
          aria-label={`Open ${project.title} GitHub repository`}
        >
          <GitHubMark />
        </a>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted">{project.summary}</p>
      <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} tags`}>
        {project.tags.map((tag) => (
          <li key={tag}>
            <Tag>{tag}</Tag>
          </li>
        ))}
      </ul>
    </Card>
  );
}
