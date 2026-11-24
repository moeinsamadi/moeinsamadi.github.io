# Moein E. Samadi – personal website

Built with the [Showlit](https://github.com/pm25/showlit) template (MIT licence, see `LICENSE`) and extended with project pages.
Live at **https://moeinsamadi.github.io/**.

All content lives in the `config/` folder. Edit a file on GitHub (pencil icon), commit, and the site rebuilds
and publishes itself in about a minute (Actions tab → "Build and deploy to GitHub Pages").

## One-time setup

1. Put the contents of this folder in the repository `moeinsamadi.github.io` (branch `main`).
2. In the repository go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. Open the **Actions** tab and check that the workflow finished (green tick).

Notes for uploading through the GitHub web page: a single upload accepts at most 100 files, so this folder is
kept below that. If the hidden `.github` folder is missing after the upload, create the file
`.github/workflows/deploy.yaml` with **Add file → Create new file** and paste the contents of
`.github/workflows/deploy.yaml` from the zip. Delete the old `index.html`, `style.css`, `script.js` and
`assets/` of the previous version of the site, because the new site replaces them.

## Add a paper, slides or poster to a project

Open `public/projects/<project-id>/` on GitHub → **Add file → Upload files**, then commit:

| File name                    | Shown as                          |
| ---------------------------- | --------------------------------- |
| `paper.pdf`                  | Paper (with embedded PDF viewer)  |
| `slides.pdf` / `slides.pptx` | Slides (PDF is viewable)          |
| `poster.pdf`                 | Poster                            |
| `supplement.pdf`             | Supplement                        |
| `cover.png` (or `.jpg`)      | Figure on the project card/page   |
| anything else                | Listed under its own file name    |

Project ids: `hybrid-modeling`, `icu-mortality`, `nivpredict`, `glucose-insulin`, `noisecut`, `kan-swarm`.
A `cover.png`/`cover.jpg` replaces the placeholder `cover.svg`; delete the SVG if you prefer.
External links (DOI, arXiv, GitHub ...) go into `links:` of the project in `config/projects.yaml`.

## Add a new project

1. Add a block to `config/projects.yaml` (copy an existing one; the header of the file explains every field).
2. Create the folder `public/projects/<new-id>/` and upload a `cover.png` and any papers or slides.

## Other content

| What                                                 | File                        |
| ---------------------------------------------------- | --------------------------- |
| Name, photo, bio, links, education, talks, skills    | `config/profile.yaml`       |
| Publications (and which ones appear on the home page)| `config/publications.yaml`  |
| Order / visibility of home-page sections             | `config/homepage.yaml`      |
| Sidebar entries                                      | `config/sidebar.yaml`       |
| CV file                                              | `public/pdf/CV_Samadi.pdf`  |
| Profile photo                                        | `public/images/profile.jpg` |

## Run locally (optional)

```bash
npm ci
npm run build      # generates the data files and builds into dist/
npm run preview    # serves dist/
```
