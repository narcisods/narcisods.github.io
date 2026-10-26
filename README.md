# narcisods.github.io

My portfolio site: [narcisosalvador.com](https://narcisosalvador.com)

## Tech

React 19, TypeScript, Vite, and Tailwind CSS v4, deployed to GitHub Pages with GitHub Actions.

## Run it locally

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build locally
```

## Editing content

All copy (bio, IBM highlights, projects, links) lives in `src/data.ts`. Edit it there; the components read from it.

## How it was built

See [BUILD_LOG.md](BUILD_LOG.md) for a step-by-step walkthrough of the rebuild from the old HTML template.
