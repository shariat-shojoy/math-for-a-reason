export type Category = "graph" | "hash" | "flow" | "geometry";

export interface Application {
  system: string;
  detail: string;
}

export interface AlgoMeta {
  slug: string;
  title: string;
  oneLiner: string;
  category: Category;
  difficulty: 1 | 2 | 3;
  hookQuestion: string;
  applications: Application[];
}

export const categoryLabel: Record<Category, string> = {
  graph: "Graph traversal",
  hash: "Hashing & sketching",
  flow: "Flow & matching",
  geometry: "Geometry",
};

export const categoryColorVar: Record<Category, string> = {
  graph: "--lane-graph",
  hash: "--lane-hash",
  flow: "--lane-flow",
  geometry: "--lane-geometry",
};
