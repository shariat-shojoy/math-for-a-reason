export interface UFSnapshot {
  parent: number[];
  edge: [number, number] | null;
  outcome: "merged" | "cycle" | "start";
  note: string;
}

/** Union-Find with union-by-rank and path compression, recording a snapshot after every operation. */
export class UnionFind {
  parent: number[];
  rank: number[];
  n: number;

  constructor(n: number) {
    this.n = n;
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // path compression
    }
    return this.parent[x];
  }

  union(a: number, b: number): "merged" | "cycle" {
    const ra = this.find(a);
    const rb = this.find(b);
    if (ra === rb) return "cycle";
    if (this.rank[ra] < this.rank[rb]) {
      this.parent[ra] = rb;
    } else if (this.rank[ra] > this.rank[rb]) {
      this.parent[rb] = ra;
    } else {
      this.parent[rb] = ra;
      this.rank[ra]++;
    }
    return "merged";
  }
}

/** Runs a fixed sequence of union operations and returns one snapshot per step, for the step player. */
export function buildUnionFindHistory(
  n: number,
  edges: [number, number][]
): UFSnapshot[] {
  const uf = new UnionFind(n);
  const history: UFSnapshot[] = [
    {
      parent: [...uf.parent],
      edge: null,
      outcome: "start",
      note: `${n} nodes, each its own component.`,
    },
  ];

  for (const [a, b] of edges) {
    const ra = uf.find(a);
    const rb = uf.find(b);
    const outcome = uf.union(a, b);
    const note =
      outcome === "merged"
        ? `union(${a}, ${b}) — different components (roots ${ra} and ${rb}) → merge.`
        : `union(${a}, ${b}) — already in the same component (root ${ra}) → skip, this edge would create a cycle.`;
    history.push({ parent: [...uf.parent], edge: [a, b], outcome, note });
  }

  return history;
}
