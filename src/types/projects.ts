import type { IconType } from "react-icons";

export type MaterialKind =
  | "paper"
  | "preprint"
  | "slides"
  | "poster"
  | "supplement"
  | "code"
  | "data"
  | "video"
  | "link"
  | "document";

export interface ProjectLink {
  label: string;
  url: string;
  type?: MaterialKind;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  category?: string | null;
  hue?: number | null;
  icon?: IconType | null;
  image?: string | null;
  tags?: string[] | null;
  featured?: boolean;
  publications?: string[] | null;
  links?: ProjectLink[] | null;
  description?: string | null;
}

export interface ProjectsType {
  items: Project[];
}

/** A file found in public/projects/<id>/ (see scripts/build-project-files.js). */
export interface ProjectFile {
  name: string;
  label: string;
  kind: MaterialKind;
  ext: string;
  size: number;
  url: string;
}

export interface ProjectAssets {
  cover: string | null;
  files: ProjectFile[];
}
