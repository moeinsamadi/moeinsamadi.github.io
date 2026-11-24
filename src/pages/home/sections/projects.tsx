import { Link } from "react-router";
import { FaFlask, FaArrowRight } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { projectsFeatured } from "@/data/projects.featured";

export default function ProjectsSection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-center items-center gap-2 text-plus font-semibold">
        <FaFlask />
        Projects
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {projectsFeatured.items.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="relative w-full">
        <div className="absolute right-0">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="gap-1 text-muted-foreground"
          >
            <Link to="/projects">
              View all
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
