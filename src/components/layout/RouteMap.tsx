import { Link } from "react-router-dom";
import type { AlgorithmEntry } from "../../algorithms/registry";
import { categoryColorVar, categoryLabel } from "../../lib/types";
import "./RouteMap.css";

// Hand-placed station coordinates along a winding line — room for up to 8
// algorithms before the route needs a second track. Adding algorithm #9+
// just means extending this path.
const STATIONS = [
  { x: 60, y: 90 },
  { x: 160, y: 60 },
  { x: 260, y: 110 },
  { x: 340, y: 70 },
  { x: 420, y: 130 },
  { x: 520, y: 100 },
  { x: 610, y: 150 },
  { x: 700, y: 110 },
];

function pathD(count: number) {
  return STATIONS.slice(0, count)
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");
}

export function RouteMap({ entries }: { entries: AlgorithmEntry[] }) {
  const stations = entries.map((e, i) => ({
    entry: e,
    pos: STATIONS[i % STATIONS.length],
  }));
  // Extend the drawn line one station past the last real algorithm so the
  // route visibly continues — but never past the template's station list.
  const drawCount = Math.min(STATIONS.length, Math.max(2, entries.length + 1));
  const d = pathD(drawCount);

  return (
    <div className="route-map">
      <svg
        viewBox="0 0 760 220"
        className="route-map-svg"
        role="img"
        aria-label="Map of algorithms, laid out as stations on a route"
      >
        <path d={d} className="route-line" />
        <path d={d} className="route-line-pulse" pathLength={100} />

        {entries.length < STATIONS.length && (
          <g className="route-station-next" style={{ animationDelay: `${entries.length * 0.15 + 0.4}s` }}>
            <circle
              cx={STATIONS[drawCount - 1].x}
              cy={STATIONS[drawCount - 1].y}
              r={7}
              className="route-station-next-circle"
            />
          </g>
        )}

        {stations.map(({ entry, pos }, i) => (
          <g key={entry.meta.slug} className="route-station" style={{ animationDelay: `${i * 0.15 + 0.4}s` }}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r={9}
              style={{ fill: `var(${categoryColorVar[entry.meta.category]})` }}
            />
            <circle cx={pos.x} cy={pos.y} r={3.5} fill="var(--paper)" />
          </g>
        ))}
      </svg>

      <div className="route-cards">
        {stations.map(({ entry }, i) => (
          <Link
            to={`/algo/${entry.meta.slug}`}
            key={entry.meta.slug}
            className="route-card"
            style={{
              ["--lane" as string]: `var(${categoryColorVar[entry.meta.category]})`,
              animationDelay: `${i * 0.15 + 0.5}s`,
            }}
          >
            <span className="route-card-category mono">
              {categoryLabel[entry.meta.category]}
            </span>
            <h3>{entry.meta.title}</h3>
            <p>{entry.meta.oneLiner}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
