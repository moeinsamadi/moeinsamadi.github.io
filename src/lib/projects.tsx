import type { IconType } from "react-icons";
import {
  FaChalkboardUser,
  FaCode,
  FaDatabase,
  FaFileImage,
  FaFilePdf,
  FaLink,
  FaPaperclip,
  FaRegFileLines,
  FaVideo,
} from "react-icons/fa6";

import filesJson from "@/data/generated/project-files.json";
import { publications } from "@/data/publications";
import type {
  MaterialKind,
  Project,
  ProjectAssets,
} from "@/types/projects";

const assetsById = filesJson as unknown as Record<string, ProjectAssets>;

export function getAssets(id: string): ProjectAssets {
  return assetsById[id] ?? { cover: null, files: [] };
}

export function getCover(project: Project): string | null {
  return project.image || getAssets(project.id).cover;
}

export interface Material {
  kind: MaterialKind;
  label: string;
  url: string;
  /** true for links that leave the site (DOI, arXiv, GitHub ...) */
  external: boolean;
  /** true when the file can be shown in the embedded viewer */
  isPdf: boolean;
  ext?: string;
  size?: number;
}

export const KIND_META: Record<
  MaterialKind,
  { label: string; icon: IconType }
> = {
  paper: { label: "Paper", icon: FaFilePdf },
  preprint: { label: "Preprint", icon: FaFilePdf },
  slides: { label: "Slides", icon: FaChalkboardUser },
  poster: { label: "Poster", icon: FaFileImage },
  supplement: { label: "Supplement", icon: FaPaperclip },
  code: { label: "Code", icon: FaCode },
  data: { label: "Data", icon: FaDatabase },
  video: { label: "Video", icon: FaVideo },
  link: { label: "Link", icon: FaLink },
  document: { label: "Document", icon: FaRegFileLines },
};

/** Files uploaded to public/projects/<id>/ first, then the links from projects.yaml. */
export function getMaterials(project: Project): Material[] {
  const files: Material[] = getAssets(project.id).files.map((file) => ({
    kind: file.kind,
    label: file.label,
    url: file.url,
    external: false,
    isPdf: file.ext === "pdf",
    ext: file.ext,
    size: file.size,
  }));

  const links: Material[] = (project.links ?? []).map((link) => ({
    kind: link.type ?? "link",
    label: link.label,
    url: link.url,
    external: true,
    isPdf: false,
  }));

  return [...files, ...links];
}

export function getRelatedPublications(project: Project) {
  const ids = project.publications ?? [];
  return ids
    .map((id) => publications.items.find((pub) => pub.id === id))
    .filter((pub): pub is NonNullable<typeof pub> => Boolean(pub));
}

export function getYearRange(project: Project): string | null {
  const years = getRelatedPublications(project)
    .map((pub) => Number(pub.year))
    .filter((year) => Number.isFinite(year));
  if (!years.length) return null;
  const min = Math.min(...years);
  const max = Math.max(...years);
  return min === max ? `${min}` : `${min}–${max}`;
}

export function formatSize(bytes?: number): string | null {
  if (!bytes) return null;
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function accentGradient(hue?: number | null): string {
  const h = hue ?? 215;
  return `linear-gradient(135deg, hsl(${h} 55% 30%), hsl(${(h + 30) % 360} 60% 16%))`;
}
