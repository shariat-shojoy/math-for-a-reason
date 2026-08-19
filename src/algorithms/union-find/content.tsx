import {
  Hook,
  Idea,
  WatchItThink,
  WhereItLives,
  NowYouTry,
} from "../../components/layout/AlgoSections";
import { UnionFindVisualization } from "./Visualization";
import { meta } from "./meta";

export function Content() {
  return (
    <>
      <Hook question={meta.hookQuestion}>
        <p>
          Every time you save a file, tools like Bazel or webpack need to answer:
          "is this file already part of a group I've already resolved?" Checking
          that the slow way — walking every dependency edge — would make large
          builds crawl. Union-Find answers it in almost constant time, no matter
          how big the graph gets.
        </p>
      </Hook>

      <Idea>
        <p>
          Union-Find (a.k.a. <strong>disjoint-set union</strong>) keeps track of
          which items belong to the same group, and supports exactly two
          operations: <strong>find(x)</strong> — which group is x in? — and{" "}
          <strong>union(a, b)</strong> — merge the groups containing a and b.
        </p>
        <p>
          The trick is the data structure never draws the whole picture. Each
          node just points at a "parent." To find a group, follow parent
          pointers until you hit a node that points at itself — the root. Two
          cheap optimizations make this almost free: <strong>union by
          rank</strong> (always attach the smaller tree under the bigger one)
          and <strong>path compression</strong> (while you're walking up to
          find the root, re-point every node you pass directly at that root,
          so the next lookup is instant).
        </p>
      </Idea>

      <WatchItThink category={meta.category}>
        <p style={{ color: "var(--slate-text)", opacity: 0.85, maxWidth: "60ch" }}>
          Step through a sequence of <code>union()</code> calls on 10 nodes.
          Solid lines are edges that merged two components; dashed red lines
          are edges that were <em>skipped</em> because both endpoints were
          already connected — exactly the check Kruskal's algorithm uses to
          avoid creating a cycle.
        </p>
        <UnionFindVisualization />
      </WatchItThink>

      <WhereItLives applications={meta.applications} />

      <NowYouTry>
        <p>
          Scroll back up to the widget and reset it. Try to union all 10 nodes
          into one component using only <strong>9 clicks-pairs</strong> — any
          10th union you attempt should report "already connected," because a
          tree connecting 10 nodes needs exactly 9 edges. This is the same
          constraint Kruskal's algorithm relies on to know when a spanning
          tree is complete.
        </p>
      </NowYouTry>
    </>
  );
}
