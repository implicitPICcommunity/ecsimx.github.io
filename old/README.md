# ECsim-X website

A responsive static website for ECsim-X, a scientific application used to solve space plasma physics problems with an energy-conserving semi-implicit Particle-in-Cell method.

## Pages
- `index.html` — project overview
- `scientific-method.html` — PIC and semi-implicit method overview
- `parallelization.html` — MPI domain decomposition and communication
- `gpu-acceleration.html` — OpenACC GPU implementation
- `benchmarks.html` — published scaling, speedup, and energy results
- `documentation.html` — user documentation hub
- `developer-guide.html` — guidance for application developers
- `contribute.html` — contribution guidance
- `code-of-conduct.html` — proposed conduct policy, pending maintainer approval
- `applications.html` — scientific application areas
- `about.html` — project information placeholders
- `404.html` — error page (see deployment note)

## Run locally
No build step or package manager is required. Open `index.html` in a browser, or serve this directory with a static HTTP server, for example:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Project accuracy
ECsim-X is publicly available research software. This website does not describe it as open source and does not imply a particular license. Distribution, modification, and redistribution conditions should be checked against the official project terms.

The source distribution, build scripts, test suite, and benchmark datasets were not supplied when this website was prepared. Therefore:
- Repository-specific build commands, file paths, input parameters, and hardware requirements are not invented.
- Scientific content and all benchmark numbers are quoted from arXiv:1711.05051 (ECsim, MPI) and arXiv:2603.16624 (OpenACC); none were re-measured. Cite-check against the final journal versions.
- Diagrams follow the papers' algorithm descriptions; verify routine names against the source tree.
- The contribution page needs the official contribution channel added.
- The Code of Conduct is proposed text and should be reviewed and adopted by maintainers before being represented as an official policy.

## Branding and themes
The ECsim-X logo is a vector SVG traced from the supplied artwork (`assets/ecsimx-logo-dark.svg` / `-light.svg`, swapped with the theme; `assets/logo-mark.svg` is the favicon). Original raster files are kept in `assets/source/`. The site includes dark and light themes with a toggle that remembers the user's choice in the browser.

## Deployment note
Pages use relative asset paths. `404.html` is served by the host at the URL that failed, so on a host that serves it for nested paths or from a sub-path, add `<base href="/your-subpath/">` to its `<head>`. There is no footer link to the 404 page; the former "Missing page?" link pointed at it and was removed.

## Design system
Palette: indigo ink, solar orange (from the logo), plasma violet; light and dark themes via CSS variables in `assets/styles.css`. Type: Bricolage Grotesque (headings/UI), Source Serif 4 (reading text), JetBrains Mono (code), loaded from Google Fonts. The home hero is a canvas illustration of gyrating electrons and ions (`assets/site.js`); it is labelled as an illustration, is paused off-screen, and renders a still frame when reduced motion is requested.
