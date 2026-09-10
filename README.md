# Timothy Poorman — Portfolio

Personal portfolio site for **Timothy Poorman**, Mechanical Engineer
(Mechanical Design · Engineering Analysis · Instrumentation · Testing).

🔗 **Live site:** https://tpoortexan.github.io

## About this repository

This is a static, single-page portfolio built with plain HTML, CSS, and
JavaScript — no build step required. It is served directly by GitHub Pages
(a `.nojekyll` file disables Jekyll processing).

```
.
├── index.html                 # Main single-page portfolio
├── .nojekyll                  # Serve files as-is (skip Jekyll build)
├── assets/
│   ├── css/style.css          # Dark-mode styling
│   └── js/main.js             # Nav, scroll-spy, and reveal animations
└── projects/                  # Individual project detail pages
    ├── fluid-lab-overhaul.html
    ├── thermal-weld-analysis.html
    ├── joyal-lug-fuser.html
    └── instrumentation-data-acquisition.html
```

## Editing the site

- **Content & structure:** edit `index.html`.
- **Look & feel:** edit `assets/css/style.css`. Colors live in the
  `:root` variables at the top of the file.
- **Interactions:** edit `assets/js/main.js`.
- **Project pages:** edit the files in `projects/`.

### Placeholders to fill in

A few spots use bracketed placeholders like `[YOUR EMAIL]` and
`[YOUR RESUME URL]`. Search the project for `[YOUR` and `[Company` to
find and replace them with your real details.

## Local preview

Open `index.html` directly in a browser, or run a simple local server:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```
