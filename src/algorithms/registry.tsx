import type { ComponentType } from "react";
import type { AlgoMeta } from "../lib/types";
import { meta as unionFindMeta } from "./union-find/meta";
import { Content as UnionFindContent } from "./union-find/content";

export interface AlgorithmEntry {
  meta: AlgoMeta;
  Content: ComponentType;
}

/**
 * To add a new algorithm:
 *   1. Create src/algorithms/<slug>/meta.ts, Visualization.tsx, content.tsx
 *      (copy union-find/ as a template)
 *   2. Import and add one entry below.
 * The home page and routing pick it up automatically.
 */
export const algorithms: AlgorithmEntry[] = [
  { meta: unionFindMeta, Content: UnionFindContent },
];

export function getAlgorithm(slug: string): AlgorithmEntry | undefined {
  return algorithms.find((a) => a.meta.slug === slug);
}
