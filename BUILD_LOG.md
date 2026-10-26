# Portfolio rebuild: build log

This log walks through every step of rebuilding narcisods.github.io, from the old "Spectral" HTML template to a React + TypeScript + Vite + Tailwind site. Each step says what was done and why.

---

## 0. Starting point

- The old site was **"Spectral" by Pixelarity**, a premium jQuery/HTML template. The license comment at the top of `index.html` identified it.
- Leftover template pieces: `generic.html` and `elements.html` demo pages, commented-out placeholder sections, and jQuery plugins.
- Images were heavy. `headshot.jpg` was **15 MB**, and `Fishon.gif` was **45 MB**.

**Why rebuild:** for frontend roles, the portfolio is itself a work sample. A jQuery template doesn't match a resume that says React, TypeScript, and TanStack. A hand-built site gives you something to talk about in interviews: component structure, accessibility, performance, and deployment.

## 1. Work on a separate branch

```bash
git checkout -b react-rebuild
```

All changes live on `react-rebuild`. The current site on `main` stays live until you merge, so nothing breaks while you review.

## 2. Remove the template

```bash
git rm -r assets elements.html generic.html index.html images
```

- `assets/` held the template's CSS, jQuery, and plugin scripts, and none of it is needed now.
- The two demo pages were template filler.
- `images/` held the originals. The images the new site actually uses were optimized first and saved into `public/` (step 3).

The old files aren't lost. They're still in git history on `main`.

## 3. Optimize images

Done with Python's Pillow library:

| File | Before | After | What changed |
|---|---|---|---|
| Headshot | 15 MB JPG, 5504×8256 | 36 KB WebP, 640×960 | Resized to the largest size it displays at, converted to WebP |
| CastLine screenshot | 96 KB PNG | 68 KB WebP | Converted to WebP |
| Fish on! | 45 MB animated GIF | ~100 KB WebP | Took one frame from the GIF showing the actual feed, not the login screen |

**Why:** the old headshot alone took longer to download than the whole new site. WebP is supported in every modern browser and is much smaller than JPG, PNG, or GIF at the same quality.

Files in `public/` are copied as-is to the site root, so `public/headshot.webp` is served at `/headshot.webp`. The resume PDF moved there too.

## 4. Project setup files

These are the files `npm create vite@latest -- --template react-ts` would generate. I wrote them by hand, trimmed to what this site needs.

### `package.json`
- **dependencies:** `react`, `react-dom`. These run in the browser.
- **devDependencies:** `vite` (dev server and bundler), `@vitejs/plugin-react` (JSX and fast refresh), `typescript`, `@types/react` and `@types/react-dom` (type definitions), and `tailwindcss` with `@tailwindcss/vite` (Tailwind v4's Vite plugin).
- **scripts:**
  - `dev` starts a local server with hot reload.
  - `build` runs `tsc --noEmit` to type-check (it fails the build on type errors without outputting files), then `vite build` to produce an optimized `dist/` folder.
  - `preview` serves `dist/` locally so you can test the production build.

### `tsconfig.json`
- `strict: true` turns on all strict type checks.
- `jsx: "react-jsx"` uses React's modern JSX transform, so files don't need `import React`.
- `moduleResolution: "bundler"` matches how Vite resolves imports.
- `noEmit: true` makes TypeScript only check types. Vite (via esbuild) does the actual compiling.
- `noUnusedLocals` and `noUnusedParameters` catch dead code.
- `types: ["vite/client"]` adds types for Vite-specific imports, like importing a `.css` file.

### `vite.config.ts`
Registers two plugins: React and Tailwind. `base` stays `/` because `narcisods.github.io` is a *user site* served from the domain root. A project site at `username.github.io/repo-name` would need `base: '/repo-name/'`.

### `index.html`
Vite uses `index.html` as the entry point, not a file in `public/`. It includes:
- `lang="en"` so screen readers use the right pronunciation.
- A viewport tag *without* `user-scalable=no`, so pinch-zoom works. The old site blocked it.
- A real `<title>` and `<meta name="description">` for search results.
- **Open Graph tags** (`og:title`, `og:image`, and so on), so links to your site show a proper preview card on LinkedIn, Slack, and iMessage.
- `<div id="root">`, where React renders, and `<script type="module" src="/src/main.tsx">`.

### `public/favicon.svg`
A simple "NS" icon for the browser tab. SVG stays sharp at any size.

### `.gitignore`
Keeps `node_modules/` and `dist/` out of git. Both are generated, and `dist/` is built by GitHub Actions on deploy.

## 5. Tailwind setup (`src/index.css`)

```css
@import "tailwindcss";
```

That one line is all Tailwind v4 needs. There's no `tailwind.config.js` anymore, and v4 finds the classes you use automatically. Two small additions:
- **Smooth scrolling** for the nav links, wrapped in `prefers-reduced-motion: no-preference`, so people who turn off animations in their OS don't get it.
- **`scroll-margin-top`** on sections, so jumping to a section doesn't hide its heading under the sticky header.

**Dark mode:** classes like `dark:bg-neutral-950` switch on when `<html>` has a `dark` class. See step 7b for how the theme toggle sets it.

## 6. Content in one file (`src/data.ts`)

All text, links, IBM highlights, and project details live in `data.ts`. Components only handle layout.

**Why:** changing your bio or adding a project means editing one plain data file, not hunting through JSX. TypeScript types (`Project`, `Highlight`) catch mistakes like a missing `code` link. `satisfies Highlight[]` checks the shape without loosening the types.

## 7. Components (`src/components/`)

| File | What it does |
|---|---|
| `ui.tsx` | Shared pieces: `Section` (consistent spacing and a labeled `<section>`), `ButtonLink` (primary and secondary styles), `Tag` (tech pills), and one shared `focusRing` style |
| `Header.tsx` | Sticky top nav with section links and a Resume button. Links hide on very small screens. |
| `Hero.tsx` | Name, title, one-line pitch, headshot, and the Resume, LinkedIn, and GitHub buttons |
| `About.tsx` | Three short paragraphs from `data.ts` |
| `Experience.tsx` | IBM role, dates, and highlight cards in a 2-column grid on desktop and 1 column on mobile |
| `Projects.tsx` | Image-and-text rows for CastLine and Fish on!, with Live and Code buttons |
| `Contact.tsx` | Email and LinkedIn buttons |
| `Footer.tsx` | Copyright with an auto-updating year |
| `App.tsx` | Puts it all together, plus the "Skip to content" link |
| `main.tsx` | Mounts `<App />` into `#root` inside `<StrictMode>`, which flags common React mistakes during development |

## 7b. Light/dark theme toggle

A sun/moon button in the header switches themes. The first visit follows the OS setting, and after that the visitor's choice is remembered.

**How it works, in three pieces:**

1. **`src/index.css`**: `@custom-variant dark (&:where(.dark, .dark *));` tells Tailwind v4 that `dark:` utilities apply when an ancestor has the `dark` class. Out of the box, Tailwind ties `dark:` directly to the OS setting, which a button can't override. `color-scheme` is also set, so native parts like scrollbars match the theme.

2. **An inline script in `index.html`**: before the page draws anything, it checks `localStorage` for a saved choice. If there isn't one, it checks the OS setting, then adds or removes `dark` on `<html>`. It runs inline in `<head>`, not inside React, because React loads a moment later. If React decided the theme, dark-mode visitors would see a white flash first, often called FOUC (flash of unstyled content).

3. **`src/components/ThemeToggle.tsx`**:
   - Starts its state from the class the script already set, so React and the page agree.
   - A `useEffect` applies the class whenever the theme changes.
   - Clicking saves the choice to `localStorage`.
   - A second `useEffect` listens for OS theme changes, like automatic dark mode at sunset. It only follows them if the visitor never picked a theme.
   - Every `localStorage` call is wrapped in `try/catch`, because storage can be blocked in private browsing. The toggle still works, it just won't be remembered.

**Accessibility:**
- It's a real `<button>`, so it works with Tab, Enter, and Space for free.
- `aria-label` says what will happen ("Switch to dark mode"). An icon on its own means nothing to a screen reader.
- The SVG icons are `aria-hidden`, so they aren't announced twice.
- It uses the same visible focus ring as every other control.

**Checked in a headless browser:**
- Dark OS on first load gives the dark theme.
- Clicking switches to light and saves it.
- After a reload it stays light.
- Tab and Enter toggle it back.
- A fresh visitor on a light OS gets light.
- No console errors.

**Layout approach:** mobile-first. Base classes are for phones, and `sm:` and `md:` prefixes add the desktop layout. Content is capped at `max-w-5xl` so lines stay readable on wide screens.

## 8. Accessibility (what was built in, and why)

- **Skip link:** the first Tab press reveals "Skip to content," so keyboard users can jump past the nav.
- **Landmarks:** `<header>`, `<nav aria-label="Main">`, `<main>`, and `<footer>` let screen-reader users jump between regions. The footer sits *outside* `<main>` so it's announced as the page footer.
- **Heading order:** one `h1` (your name), then `h2` for each section, `h3` and `h4` below. There are no skipped levels.
- **Labeled sections:** each `<section>` uses `aria-labelledby`, pointing to its heading.
- **Alt text** on every image describes what's in it.
- **Focus rings:** every link and button shows a visible outline when focused by keyboard (`focus-visible`), but not on mouse click.
- **External links** open in a new tab and say so to screen readers with a hidden "(opens in a new tab)," plus `rel="noopener noreferrer"` for security.
- **Color contrast:** every text and background pair was checked against WCAG AA, which requires 4.5:1 for normal text:

| Pair | Ratio |
|---|---|
| Teal-700 accent on white | 5.47:1 |
| Neutral-500 dates on white | 4.74:1 |
| Teal-700 on light gray sections | 5.24:1 |
| Teal-300 on near-black background | 13.38:1 |
| Neutral-400 on near-black background | 7.85:1 |

**Color palette:** Tailwind's `neutral` grays (true grays, no tint) plus a `teal` accent. The first version used `slate`, whose blue tint read as dark navy in dark mode. Swapping was a find-and-replace of `slate-` with `neutral-` across `src/`, plus updating the `theme-color` meta tag and favicon to `#0a0a0a`. To try another accent later, replace `teal-` the same way (for example with `emerald-` or `amber-`) and recheck contrast.

## 9. Performance

- Images went from about 60 MB to about 200 KB total (step 3).
- The headshot has `width` and `height` set, so the page doesn't jump while it loads, and `fetchPriority="high"` because it's above the fold.
- Project images use `loading="lazy"`, so they only download when you scroll near them.
- No jQuery or plugins. The preview build was about 205 KB of JS, mostly React itself, and about 22 KB of CSS. Vite's production build will be smaller after compression.

## 10. Deployment (`.github/workflows/deploy.yml`)

GitHub Pages can't build a Vite site by itself. It needs the built `dist/` folder. The workflow does that on every push to `main`:

1. **checkout:** grabs the code.
2. **setup-node** (Node 22) with npm caching, for faster repeat builds.
3. **`npm ci`:** installs exact versions from `package-lock.json`.
4. **`npm run build`:** type-checks and builds `dist/`.
5. **upload-pages-artifact**, then **deploy-pages:** publishes `dist/` to narcisods.github.io.

`permissions` grants only what's needed (`pages: write` and `id-token: write`). `concurrency` cancels an older deploy if you push twice quickly.

## 11. How this was checked

npm's package registry wasn't reachable from the workspace where this was built, so `npm install` couldn't run there. Instead:
- The app was bundled with **esbuild**, the same compiler Vite uses under the hood, against preinstalled React 19, and the CSS was compiled with **Tailwind v4's own compiler**. That proves the JSX, imports, and Tailwind classes all work.
- A headless Chromium browser loaded the result and confirmed there were no console errors and no horizontal scrolling. It took screenshots at desktop (1280px), mobile (390px), and dark mode.
- Keyboard and structure checks: first Tab lands on the skip link, heading order is correct, no images are missing alt text, and the landmarks are present.

**Not yet run:** the real `tsc` type-check and `vite build`. Those run when you do step 12 on your machine, and again in GitHub Actions on every deploy.

## 12. Your steps to finish

1. **Get the branch:** the rebuild comes as a *git bundle*, a file that holds commits the way a remote does. A patch file would have been huge, because deleting the old 60 MB of images gets encoded in it. In your local repo, with `main` up to date:
   ```bash
   git fetch ~/Downloads/portfolio-rebuild.bundle react-rebuild:react-rebuild
   git checkout react-rebuild
   ```
   The commit keeps you as its author.
2. **Install and run:**
   ```bash
   npm install          # creates package-lock.json
   npm run dev          # check it at http://localhost:5173
   npm run build        # should finish with no errors
   ```
3. **Commit the lockfile.** The deploy workflow's `npm ci` needs it:
   ```bash
   git add package-lock.json
   git commit -m "Add package-lock.json"
   git push -u origin react-rebuild
   ```
4. **Switch Pages to Actions:** on GitHub, go to repo **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**. Do this *before* merging. Otherwise Pages would try to serve the raw source and the site would break.
5. **Merge to `main`** (a pull request or `git merge`), then push. The workflow builds and deploys. Watch it in the **Actions** tab, and the site updates in about a minute.

**To roll back:** revert the merge commit on `main` and set the Pages source back to "Deploy from a branch."
