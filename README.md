# ECsim-X website

A responsive static website for ECsim-X, a scientific application used to solve space plasma physics problems with an energy-conserving semi-implicit Particle-in-Cell method.

## Pages
- `index.html` — project overview
- `scientific-method.html` — PIC and semi-implicit method overview
- `gpu-acceleration.html` — conceptual GPU execution guide
- `benchmarks.html` — benchmark dashboard placeholders
- `documentation.html` — user documentation hub
- `developer-guide.html` — guidance for application developers
- `contribute.html` — contribution guidance
- `code-of-conduct.html` — proposed conduct policy, pending maintainer approval
- `applications.html` — scientific application areas
- `about.html` — project information placeholders
- `404.html` — missing-page page

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
- Benchmark charts contain placeholders rather than fabricated results.
- Scientific workflow diagrams are conceptual and should be checked against the actual implementation.
- The contribution page needs the official contribution channel added.
- The Code of Conduct is proposed text and should be reviewed and adopted by maintainers before being represented as an official policy.

## Branding and themes
The supplied orange ECsim-X logo is used in the header and footer. The site includes dark and light themes with a toggle that remembers the user's choice in the browser.
