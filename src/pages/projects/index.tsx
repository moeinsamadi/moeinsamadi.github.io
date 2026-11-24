import { useNavigate, useSearchParams } from "react-router";
import { FaFlask } from "react-icons/fa6";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProjectCard } from "@/components/project-card";
import { usePageTitle } from "@/hooks/use-pagetitle";
import { projects } from "@/data/projects";

const allTags = Array.from(
  new Set(projects.items.flatMap((project) => project.tags ?? [])),
).sort((a, b) => a.localeCompare(b));

export default function ProjectsPage() {
  usePageTitle("Projects");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const topic = searchParams.get("topic");
  const topicFilter = topic && allTags.includes(topic) ? topic : "all";

  const updateTopicFilter = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    if (tag === "all") params.delete("topic");
    else params.set("topic", tag);
    navigate({ search: params.toString() }, { replace: true });
  };

  const visible = projects.items.filter(
    (project) => topicFilter === "all" || project.tags?.includes(topicFilter),
  );

  return (
    <div className="flex flex-1 flex-col items-center gap-10">
      <div className="w-full max-w-6xl space-y-10">
        <div className="flex flex-row justify-center items-center gap-4 text-4xl font-semibold">
          <FaFlask />
          Projects
        </div>

        <div className="flex justify-between flex-wrap gap-2 items-center mx-2 sm:mx-6 my-1 relative -top-2">
          <div className="flex items-center gap-2">
            <label>Filter by topic:</label>
            <Select value={topicFilter} onValueChange={updateTopicFilter}>
              <SelectTrigger className="w-[220px] cursor-pointer">
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All topics</SelectItem>
                {allTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {topicFilter !== "all" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateTopicFilter("all")}
                className="px-2 text-sm cursor-pointer text-muted-foreground"
              >
                Clear filter ✕
              </Button>
            )}
          </div>

          <span className="text-sm text-muted-foreground">
            {visible.length} of {projects.items.length} projects
          </span>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 px-2 sm:px-6">
          {visible.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onTagClick={updateTopicFilter}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
