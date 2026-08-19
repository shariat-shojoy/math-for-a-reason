import type { AlgoMeta } from "../../lib/types";

export const meta: AlgoMeta = {
  slug: "union-find",
  title: "Union-Find",
  oneLiner: "Track which things are connected, without ever redrawing the whole map.",
  category: "graph",
  difficulty: 1,
  hookQuestion:
    "How does your build system know two files are already in the same dependency group — instantly, even in a codebase with 40,000 files?",
  applications: [
    {
      system: "Kruskal's minimum spanning tree",
      detail:
        "The classic use: process edges cheapest-first, use union-find to skip any edge that would close a cycle.",
    },
    {
      system: "Image segmentation",
      detail:
        "Union adjacent pixels with similar color into the same component to find regions — the basis of connected-component labeling.",
    },
    {
      system: "Build system cycle detection",
      detail:
        "Tools like Bazel and Make use disjoint-set structures to detect circular dependencies before a build even starts.",
    },
    {
      system: "Kidney-exchange & network connectivity",
      detail:
        "Percolation and network-reachability checks ('can node A reach node B at all?') reduce to a single find() call.",
    },
    {
      system: "Least Common Ancestor (offline)",
      detail:
        "Tarjan's offline LCA algorithm uses union-find to answer batches of ancestor queries in a single tree traversal.",
    },
  ],
};
