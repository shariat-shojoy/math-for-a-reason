import { useMemo, useState } from "react";
import { PlayControls } from "../../components/shared/PlayControls";
import { useStepPlayer } from "../../components/shared/useStepPlayer";
import { buildUnionFindHistory, UnionFind } from "./unionFind";
import "./Visualization.css";

const N = 10;
const PRESET_EDGES: [number, number][] = [
  [0, 1],
  [2, 3],
  [4, 5],
  [1, 2],
  [6, 7],
  [3, 4], // merges the {0,1,2,3} group with {4,5}
  [0, 3], // cycle — 0 and 3 already connected
  [7, 8],
  [8, 9],
  [5, 9], // merges two large components
  [1, 9], // cycle
];

const RADIUS = 150;
const CENTER = 190;

function nodePos(i: number, n: number) {
  const angle = (2 * Math.PI * i) / n - Math.PI / 2;
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
}

const PALETTE = [
  "#F2A93C",
  "#2E8B57",
  "#D64545",
  "#5B7C9E",
  "#B9552C",
  "#6E4C9E",
  "#2E6F8E",
  "#C97A2B",
];

function rootColorMap(parent: number[]): Map<number, string> {
  const roots = new Map<number, string>();
  let i = 0;
  for (let node = 0; node < parent.length; node++) {
    let r = node;
    while (parent[r] !== r) r = parent[r];
    if (!roots.has(r)) {
      roots.set(r, PALETTE[i % PALETTE.length]);
      i++;
    }
  }
  return roots;
}

export function UnionFindVisualization() {
  const history = useMemo(() => buildUnionFindHistory(N, PRESET_EDGES), []);
  const player = useStepPlayer(history.length - 1);
  const snap = history[player.step];
  const colorOf = useMemo(() => rootColorMap(snap.parent), [snap]);

  const positions = useMemo(
    () => Array.from({ length: N }, (_, i) => nodePos(i, N)),
    []
  );

  // Which preset edges have been "resolved" (processed) by the current step,
  // and whether each was a merge or a cycle — used to draw the tree.
  const resolvedEdges = PRESET_EDGES.slice(0, player.step).map((e, idx) => ({
    edge: e,
    outcome: history[idx + 1].outcome,
  }));

  return (
    <div className="ufviz">
      <div className="ufviz-stage">
        <svg viewBox="0 0 380 380" className="ufviz-svg" role="img" aria-label="Union-Find network diagram">
          {resolvedEdges.map(({ edge: [a, b], outcome }, idx) => {
            const pa = positions[a];
            const pb = positions[b];
            const isCurrent = player.step > 0 && idx === player.step - 1;
            return (
              <line
                key={`${a}-${b}-${idx}`}
                x1={pa.x}
                y1={pa.y}
                x2={pb.x}
                y2={pb.y}
                className={
                  "uf-edge " +
                  (outcome === "cycle" ? "uf-edge-cycle" : "uf-edge-merged") +
                  (isCurrent ? " uf-edge-current" : "")
                }
                strokeDasharray={outcome === "cycle" ? "4 4" : undefined}
              />
            );
          })}

          {positions.map((p, i) => {
            let root = i;
            while (snap.parent[root] !== root) root = snap.parent[root];
            const color = colorOf.get(root) ?? "var(--edge-idle)";
            return (
              <g key={i} transform={`translate(${p.x}, ${p.y})`}>
                <circle r={16} fill={color} className="uf-node" />
                <text textAnchor="middle" dy="0.35em" className="uf-node-label">
                  {i}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <p className="uf-note mono">{snap.note}</p>

      <PlayControls
        step={player.step}
        maxStep={history.length - 1}
        playing={player.playing}
        speed={player.speed}
        atStart={player.atStart}
        atEnd={player.atEnd}
        onBack={player.back}
        onNext={player.next}
        onTogglePlay={() => player.setPlaying((p) => !p)}
        onReset={player.reset}
        onSpeedChange={player.setSpeed}
        onScrub={player.setStep}
        stepLabel={`edge ${player.step} / ${history.length - 1}`}
      />

      <FreePlayWidget />
    </div>
  );
}

/** Free-form "now you try" widget: click two nodes to union them and watch path compression happen. */
function FreePlayWidget() {
  const [uf, setUf] = useState(() => new UnionFind(N));
  const [version, setVersion] = useState(0); // forces re-render since UnionFind mutates in place
  const [selected, setSelected] = useState<number | null>(null);
  const [message, setMessage] = useState("Click two nodes to union them.");

  const positions = useMemo(
    () => Array.from({ length: N }, (_, i) => nodePos(i, N)),
    []
  );
  const colorOf = useMemo(() => rootColorMap(uf.parent), [version]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleClick(i: number) {
    if (selected === null) {
      setSelected(i);
      setMessage(`Selected node ${i}. Pick another node to union with it.`);
      return;
    }
    if (selected === i) {
      setSelected(null);
      setMessage("Click two nodes to union them.");
      return;
    }
    const ra = uf.find(selected);
    const rb = uf.find(i);
    const outcome = uf.union(selected, i);
    setMessage(
      outcome === "merged"
        ? `union(${selected}, ${i}) merged roots ${ra} and ${rb}.`
        : `union(${selected}, ${i}) — already connected (root ${ra}). No change.`
    );
    setSelected(null);
    setVersion((v) => v + 1);
  }

  function handleReset() {
    setUf(new UnionFind(N));
    setSelected(null);
    setVersion((v) => v + 1);
    setMessage("Click two nodes to union them.");
  }

  return (
    <div className="uf-freeplay">
      <div className="ufviz-stage ufviz-stage-small">
        <svg viewBox="0 0 380 380" className="ufviz-svg" role="img" aria-label="Free-play union-find widget">
          {positions.map((p, i) => {
            if (uf.parent[i] === i) return null;
            const parentPos = positions[uf.parent[i]];
            return (
              <line
                key={i}
                x1={p.x}
                y1={p.y}
                x2={parentPos.x}
                y2={parentPos.y}
                className="uf-edge uf-edge-merged"
              />
            );
          })}
          {positions.map((p, i) => {
            const root = uf.find(i);
            const color = colorOf.get(root) ?? "var(--edge-idle)";
            return (
              <g
                key={i}
                transform={`translate(${p.x}, ${p.y})`}
                onClick={() => handleClick(i)}
                className="uf-node-group"
                role="button"
                tabIndex={0}
                aria-label={`Node ${i}`}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleClick(i)}
              >
                <circle
                  r={16}
                  fill={color}
                  className={"uf-node uf-node-clickable" + (selected === i ? " uf-node-selected" : "")}
                />
                <text textAnchor="middle" dy="0.35em" className="uf-node-label">
                  {i}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="uf-note mono">{message}</p>
      <button type="button" className="uf-reset-btn" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
