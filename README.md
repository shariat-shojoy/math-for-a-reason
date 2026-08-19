# math for a reason

Algorithms are cool. This is a map of the ones worth knowing — each explained
in plain language, made interactive so you can watch it think on your own
input, and traced back to the real systems that actually run on it.

**Live site:** `https://<your-username>.github.io/math-for-a-reason/`
_(update after your first deploy — see below)_

## Why this exists

Most algorithm explainers stop at "here's how it works." This project adds
the piece that's usually missing: **where does this actually get used?**
Every entry follows the same shape —

1. **The hook** — a concrete problem a real system had to solve
2. **The idea** — the core insight, in plain language
3. **Watch it think** — an interactive, step-through visualization, driven by
   your own input, not a canned example
4. **Where it lives** — specific real systems built on this algorithm
5. **Now you try** — a small, checkable problem to solve with what you just saw

## Stack

React + TypeScript + Vite, deployed to GitHub Pages via GitHub Actions.
Visualizations are hand-built SVG/Canvas driven by a shared step-player, not
a charting library — the point is to watch the algorithm move.

## Running locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Deploying to GitHub Pages

1. Push this repo to GitHub as `math-for-a-reason` (or update `base` in
   `vite.config.ts` to match your repo name).
2. In the repo settings → **Pages**, set **Source** to "GitHub Actions."
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and
   deploys automatically.

## Adding a new algorithm

See [CONTRIBUTING.md](./CONTRIBUTING.md) — the whole point of the project
structure is that adding algorithm #2 through #20 should be mechanical, not
a fight with the framework. `src/algorithms/union-find/` is the reference
implementation to copy.

## Project structure

```
src/
├── algorithms/
│   ├── registry.tsx          all algorithms, one line each
│   └── union-find/            reference implementation — copy this folder
├── components/
│   ├── layout/                Header, Footer, RouteMap, AlgoSections
│   └── shared/                PlayControls, useStepPlayer
├── lib/types.ts               AlgoMeta, Category
├── pages/                     Home, AlgorithmDetail
└── styles/tokens.css          design tokens — colors, type, grid
```

## Roadmap

- [x] Union-Find — connectivity, Kruskal's MST, build-system cycle detection
- [ ] Rabin-Karp / rolling hash — `diff`, plagiarism detection, rsync
- [ ] A* search — pathfinding on a grid you draw yourself
- [ ] Reservoir sampling — sampling an unbounded stream
- [ ] Bloom filters — Chrome's malicious-URL check
- [ ] Ford-Fulkerson / max flow — bipartite matching, kidney-donor chains
- [ ] Convex hull — collision bounding boxes, GIS boundaries
- [ ] Consistent hashing — why adding a cache server doesn't reshuffle everything

## License

MIT — see [LICENSE](./LICENSE).
