// Scans public/projects/<project-id>/ and writes src/data/generated/project-files.json
//
// Anything you upload into a project's folder shows up on that project's page:
//   paper.pdf, slides.pdf / slides.pptx, poster.pdf, supplement.pdf, ...
//   cover.png / cover.jpg / cover.webp / cover.svg  -> figure on the project card
import fs from "fs";
import path from "path";
import { ensureDirExists } from "./utils.js";

const root = process.cwd();
const projectsDir = path.join(root, "public", "projects");
const site = JSON.parse(
  fs.readFileSync(path.join(root, "src", "data", "generated", "site.json"), "utf8"),
);
const base = (site.base || "/").replace(/\/$/, "");
const outputPath = path.join(root, "src", "data", "generated", "project-files.json");

const COVER_EXT_PRIORITY = ["png", "jpg", "jpeg", "webp", "gif", "svg"];

function kindOf(stem) {
  const s = stem.toLowerCase();
  if (/(slide|presentation|talk|deck)/.test(s)) return "slides";
  if (/poster/.test(s)) return "poster";
  if (/(supplement|appendix|suppl)/.test(s)) return "supplement";
  if (/(preprint|arxiv)/.test(s)) return "preprint";
  if (/(paper|article|manuscript|publication)/.test(s)) return "paper";
  return "document";
}

function prettify(stem) {
  const text = stem.replace(/[-_]+/g, " ").trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const ORDER = ["paper", "preprint", "slides", "poster", "supplement", "document"];
const result = {};

if (fs.existsSync(projectsDir)) {
  for (const entry of fs.readdirSync(projectsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const id = entry.name;
    const dir = path.join(projectsDir, id);
    const files = [];
    const covers = [];

    for (const file of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!file.isFile() || file.name.startsWith(".")) continue;
      const ext = path.extname(file.name).slice(1).toLowerCase();
      const stem = path.basename(file.name, path.extname(file.name));
      const url = `${base}/projects/${encodeURIComponent(id)}/${encodeURIComponent(file.name)}`;

      if (/^(cover|figure)$/i.test(stem) && COVER_EXT_PRIORITY.includes(ext)) {
        covers.push({ ext, url });
        continue;
      }

      const size = fs.statSync(path.join(dir, file.name)).size;
      files.push({ name: file.name, label: prettify(stem), kind: kindOf(stem), ext, size, url });
    }

    covers.sort(
      (a, b) => COVER_EXT_PRIORITY.indexOf(a.ext) - COVER_EXT_PRIORITY.indexOf(b.ext),
    );
    files.sort(
      (a, b) =>
        ORDER.indexOf(a.kind) - ORDER.indexOf(b.kind) || a.name.localeCompare(b.name),
    );

    result[id] = { cover: covers[0]?.url ?? null, files };
  }
}

ensureDirExists(outputPath);
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
console.log(`✅ project-files.json written for ${Object.keys(result).length} project folders`);
