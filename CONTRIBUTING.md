# Adding a new algorithm

Every algorithm on the site follows the same four-part shape: **Hook → Idea →
Watch it think → Where it lives**, plus a **Now you try** prompt. Use
`src/algorithms/union-find/` as the template — copy the folder and work
through it file by file.

## 1. Create the folder

```
src/algorithms/<your-slug>/
├── meta.ts            metadata: title, category, hook question, real-world applications
├── <logic>.ts          the algorithm itself, instrumented to record step-by-step snapshots
├── Visualization.tsx    the interactive SVG/canvas component, driven by useStepPlayer
├── Visualization.css
└── content.tsx          assembles Hook / Idea / WatchItThink / WhereItLives / NowYouTry
```

## 2. Write `meta.ts`

```ts
import type { AlgoMeta } from "../../lib/types";

export const meta: AlgoMeta = {
  slug: "your-slug",
  title: "Algorithm Name",
  oneLiner: "One sentence, plain language, no jargon.",
  category: "graph" | "hash" | "flow" | "geometry",
  difficulty: 1 | 2 | 3,
  hookQuestion: "A concrete question a real system had to solve.",
  applications: [
    { system: "Specific real system", detail: "One sentence on how it's used there." },
    // aim for 3–5 — specific beats generic. "Git's diff algorithm", not "used in software."
  ],
};
```

## 3. Instrument the algorithm

The whole site's interactivity rests on one pattern: **run the real
algorithm once, recording a snapshot of its state after every meaningful
step**, then let `useStepPlayer` scrub through those snapshots. Look at
`union-find/unionFind.ts` — `buildUnionFindHistory()` returns an array of
`{ parent, edge, outcome, note }`. Your algorithm's history array is whatever
state matters for that algorithm (an array being sorted, a visited-set for a
graph search, a partial hash table, etc).

Don't fake the visualization with hardcoded animation frames — actually run
the algorithm and record what it did. That's what makes "watch it think"
true to its name, and it's what lets the free-play widget reuse the same
logic.

## 4. Build `Visualization.tsx`

- Use `useStepPlayer(maxStep)` for step/play/speed state.
- Render with `<PlayControls />` (shared component — don't build new buttons).
- SVG is preferred over Canvas unless you need to draw thousands of
  elements; SVG keeps hover/click targets simple.
- Include **one free-play interactive element** the visitor can drive with
  their own input (their own text to search, their own points to hull,
  their own graph to route through). This is required, not optional — it's
  the difference between "I watched this" and "I could use this."
- Colors come from CSS variables in `src/styles/tokens.css` — use
  `var(--signal)`, `var(--visited)`, `var(--current)`, or the `--lane-*`
  category colors. Don't hardcode hex values in components.

## 5. Write `content.tsx`

Assemble the five pieces from `src/components/layout/AlgoSections.tsx`:

```tsx
<Hook question={meta.hookQuestion}>...</Hook>
<Idea>...</Idea>
<WatchItThink category={meta.category}><YourVisualization /></WatchItThink>
<WhereItLives applications={meta.applications} />
<NowYouTry>...</NowYouTry>
```

Writing guidelines:
- **Hook**: state the practical problem before any theory. No "in this
  article we will discuss."
- **Idea**: plain language first, one core insight, no code block unless it
  genuinely clarifies. Assume a curious programmer, not a CS sophomore.
- **Now you try**: a concrete, checkable task using the same widget above —
  "get X into state Y" — not "explore the visualization."

## 6. Register it

Add one entry to `src/algorithms/registry.tsx`:

```ts
import { meta as yourMeta } from "./your-slug/meta";
import { Content as YourContent } from "./your-slug/content";

export const algorithms: AlgorithmEntry[] = [
  { meta: unionFindMeta, Content: UnionFindContent },
  { meta: yourMeta, Content: YourContent },
];
```

The home page's route map and the `/algo/:slug` route pick it up
automatically — no other file needs to change.

## 7. Check it

```
npm run dev      # local dev server
npm run build    # must pass before opening a PR
```

Test keyboard navigation (all interactive SVG elements should be
tab-reachable) and that the page holds up with `prefers-reduced-motion`
enabled.
