import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa6";

import { Card } from "@/components/ui/card";
import {
  KIND_META,
  accentGradient,
  getCover,
  getMaterials,
  getYearRange,
} from "@/lib/projects";
import type { MaterialKind, Project } from "@/types/projects";

export function ProjectVisual({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  const cover = getCover(project);
  const Icon = project.icon;

  if (cover) {
    return (
      <img
        src={cover}
        alt={`Figure for ${project.title}`}
        className={`w-full h-full object-cover ${className}`}
        loading="lazy"
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center w-full h-full text-white/90 ${className}`}
      style={{ background: accentGradient(project.hue) }}
    >
      {Icon ? <Icon className="w-1/4 h-1/4" aria-hidden /> : null}
    </div>
  );
}

export function ProjectCard({
  project,
  onTagClick,
}: {
  project: Project;
  onTagClick?: (tag: string) => void;
}) {
  const years = getYearRange(project);
  const kinds = Array.from(
    new Set(getMaterials(project).map((material) => material.kind)),
  ) as MaterialKind[];

  return (
    <Card className="relative rounded-md overflow-hidden gap-0 py-0 w-full flex flex-col h-full transition-shadow hover:shadow-lg focus-within:shadow-lg">
      <div className="aspect-3/2 w-full overflow-hidden">
        <ProjectVisual project={project} />
      </div>

      <div className="w-full border-t" />

      <div className="flex flex-col flex-grow py-3 px-4 gap-y-2">
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span className="uppercase tracking-wide font-medium">
            {project.category}
          </span>
          {years && <span>{years}</span>}
        </div>

        <h3 className="text-base font-semibold leading-snug">
          <Link
            to={`/projects/${project.id}`}
            className="hover:underline underline-offset-4 after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </Link>
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {project.summary}
        </p>

        {project.tags?.length ? (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) =>
              onTagClick ? (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onTagClick(tag)}
                  className="relative z-10 cursor-pointer rounded-sm bg-secondary px-2 h-6 text-xs hover:bg-secondary/70"
                >
                  {tag}
                </button>
              ) : (
                <span
                  key={tag}
                  className="rounded-sm bg-secondary px-2 h-6 inline-flex items-center text-xs"
                >
                  {tag}
                </span>
              ),
            )}
          </div>
        ) : null}

        <div className="flex items-center justify-between mt-auto pt-2 text-muted-foreground">
          <div className="flex items-center gap-2.5">
            {kinds.map((kind) => {
              const { icon: Icon, label } = KIND_META[kind];
              return (
                <span key={kind} title={label} aria-label={label}>
                  <Icon className="w-4 h-4" />
                </span>
              );
            })}
          </div>
          <span className="flex items-center gap-1 text-sm">
            Details
            <FaArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Card>
  );
}
