import { useState } from "react";
import { Link, useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
  FaArrowLeft,
  FaArrowRight,
  FaDownload,
  FaRegCalendar,
  FaUpRightFromSquare,
} from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProjectVisual } from "@/components/project-card";
import { PublicationEntry } from "@/components/publication-entry";
import { usePageTitle } from "@/hooks/use-pagetitle";
import {
  KIND_META,
  accentGradient,
  formatSize,
  getMaterials,
  getRelatedPublications,
  getYearRange,
  type Material,
} from "@/lib/projects";
import { projects } from "@/data/projects";
import NotFoundPage from "@/pages/notfound";

export default function ProjectPage() {
  const { id } = useParams();
  const index = projects.items.findIndex((project) => project.id === id);
  const project = projects.items[index];

  usePageTitle(project?.title ?? "Project not found");

  if (!project) return <NotFoundPage />;

  const Icon = project.icon;
  const years = getYearRange(project);
  const materials = getMaterials(project);
  const publicationsList = getRelatedPublications(project);
  const previous = index > 0 ? projects.items[index - 1] : null;
  const next = index < projects.items.length - 1 ? projects.items[index + 1] : null;

  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="w-full max-w-5xl px-2 sm:px-6 space-y-10">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="gap-2 -ml-3 text-muted-foreground"
        >
          <Link to="/projects">
            <FaArrowLeft className="w-4 h-4" />
            All projects
          </Link>
        </Button>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-2 aspect-3/2 rounded-md overflow-hidden border shadow-sm">
            <ProjectVisual project={project} />
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              {Icon && (
                <span
                  className="inline-flex items-center justify-center w-9 h-9 rounded-md text-white"
                  style={{ background: accentGradient(project.hue) }}
                >
                  <Icon className="w-5 h-5" aria-hidden />
                </span>
              )}
              <span className="uppercase tracking-wide font-medium">
                {project.category}
              </span>
              {years && (
                <span className="flex items-center gap-1">
                  <FaRegCalendar className="w-3.5 h-3.5" />
                  {years}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
              {project.title}
            </h1>

            <p className="text-base text-muted-foreground">{project.summary}</p>

            {project.tags?.length ? (
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Button
                    key={tag}
                    asChild
                    variant="secondary"
                    size="sm"
                    className="rounded-sm font-normal px-2 h-7 text-sm"
                  >
                    <Link to={`/projects?topic=${encodeURIComponent(tag)}`}>
                      {tag}
                    </Link>
                  </Button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <Separator />

        {/* Overview */}
        {project.description && (
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <div className="prose dark:prose-invert max-w-none text-base/7">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {project.description}
              </ReactMarkdown>
            </div>
          </section>
        )}

        {/* Materials */}
        {materials.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Papers, slides &amp; materials</h2>
            <Materials materials={materials} />
          </section>
        )}

        {/* Related publications */}
        {publicationsList.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Related publications</h2>
            <div className="divide-y">
              {publicationsList.map((pub) => (
                <div key={pub.id ?? pub.title} className="py-3 space-y-1">
                  <PublicationEntry pub={pub} />
                  <div className="text-sm text-muted-foreground">{pub.year}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        <Separator />

        {/* Previous / next */}
        <div className="flex flex-wrap justify-between gap-3">
          {previous ? (
            <Button asChild variant="outline" className="gap-2 max-w-full h-auto py-2">
              <Link to={`/projects/${previous.id}`}>
                <FaArrowLeft className="w-4 h-4 shrink-0" />
                <span className="truncate">{previous.title}</span>
              </Link>
            </Button>
          ) : (
            <span />
          )}
          {next && (
            <Button asChild variant="outline" className="gap-2 max-w-full h-auto py-2">
              <Link to={`/projects/${next.id}`}>
                <span className="truncate">{next.title}</span>
                <FaArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Materials({ materials }: { materials: Material[] }) {
  const viewable = materials.filter((material) => material.isPdf);
  const [activeUrl, setActiveUrl] = useState<string | null>(
    viewable[0]?.url ?? null,
  );
  const active = viewable.find((material) => material.url === activeUrl);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {materials.map((material) => {
          const { icon: Icon, label } = KIND_META[material.kind];
          const selected = material.isPdf && material.url === activeUrl;
          const size = formatSize(material.size);

          return (
            <Card
              key={material.url}
              className={`rounded-md py-3 px-4 flex-row items-center gap-3 ${
                selected ? "border-primary" : ""
              }`}
            >
              <Icon className="w-6 h-6 shrink-0 text-muted-foreground" aria-hidden />
              <div className="min-w-0 flex-1">
                <div className="font-medium truncate">{material.label}</div>
                <div className="text-xs text-muted-foreground">
                  {label}
                  {material.ext ? ` · ${material.ext.toUpperCase()}` : ""}
                  {size ? ` · ${size}` : ""}
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {material.isPdf && !selected && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => setActiveUrl(material.url)}
                  >
                    View
                  </Button>
                )}
                {material.external ? (
                  <Button asChild size="sm" variant="outline" className="gap-1">
                    <a href={material.url} target="_blank" rel="noopener noreferrer">
                      Open
                      <FaUpRightFromSquare className="w-3 h-3" />
                    </a>
                  </Button>
                ) : (
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="gap-1"
                    title="Download"
                  >
                    <a href={material.url} download>
                      <FaDownload className="w-3 h-3" />
                      <span className="sr-only sm:not-sr-only">Download</span>
                    </a>
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {active && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{active.label}</span>
            <a
              href={active.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline underline-offset-4"
            >
              Open in new tab
            </a>
          </div>
          <iframe
            key={active.url}
            src={active.url}
            title={active.label}
            className="w-full h-[75vh] min-h-[420px] rounded-md border bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            If the preview does not appear on your device, use “Open in new tab”
            or “Download”.
          </p>
        </div>
      )}
    </div>
  );
}
