import { FaGraduationCap, FaBriefcase, FaBuildingColumns } from "react-icons/fa6";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { education } from "@/data/education";
import { workExperience } from "@/data/workExperience";

// `years` (and `logo`) may be left out of config/profile.yaml
type Entry = { years?: string | null };

export default function ExperienceSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="rounded-md md:px-2">
        <CardHeader>
          <CardTitle className="flex flex-row justify-center items-center gap-2 text-plus">
            <FaGraduationCap />
            Education
          </CardTitle>
        </CardHeader>
        <ScrollArea className="max-h-96">
          <CardContent className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="flex items-center gap-4">
                <LogoOrIcon
                  logo={(edu as { logo?: string | null }).logo}
                  alt={`${edu.school} logo`}
                  icon={<FaGraduationCap className="w-6 h-6" />}
                />
                <div>
                  <div className="font-semibold">{edu.school}</div>
                  {(edu as Entry).years && (
                    <div className="text-sm text-muted-foreground">
                      {(edu as Entry).years}
                    </div>
                  )}
                  <div className="text-sm">{edu.degree}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </ScrollArea>
      </Card>

      <Card className="rounded-md md:px-2">
        <CardHeader>
          <CardTitle className="flex flex-row justify-center items-center gap-2 text-plus">
            <FaBriefcase />
            Research Positions
          </CardTitle>
        </CardHeader>
        <ScrollArea className="max-h-96">
          <CardContent className="space-y-4">
            {workExperience.map((job, index) => (
              <div key={index} className="flex items-center gap-4">
                <LogoOrIcon
                  logo={(job as { logo?: string | null }).logo}
                  alt={`${job.company} logo`}
                  icon={<FaBuildingColumns className="w-6 h-6" />}
                />
                <div>
                  <div className="font-semibold">{job.company}</div>
                  {(job as Entry).years && (
                    <div className="text-sm text-muted-foreground">
                      {(job as Entry).years}
                    </div>
                  )}
                  <div className="text-sm">{job.title}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
}

function LogoOrIcon({
  logo,
  alt,
  icon,
}: {
  logo?: string | null;
  alt: string;
  icon: React.ReactNode;
}) {
  if (logo) {
    return (
      <img
        src={logo}
        alt={alt}
        className="w-12 h-12 object-contain rounded shrink-0"
        loading="lazy"
      />
    );
  }
  return (
    <div
      className="w-12 h-12 rounded bg-muted text-muted-foreground flex items-center justify-center shrink-0"
      aria-hidden
    >
      {icon}
    </div>
  );
}
