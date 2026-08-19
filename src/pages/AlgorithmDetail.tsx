import { Link, Navigate, useParams } from "react-router-dom";
import { getAlgorithm } from "../algorithms/registry";
import { categoryColorVar, categoryLabel } from "../lib/types";
import "./AlgorithmDetail.css";

export function AlgorithmDetail() {
  const { slug } = useParams<{ slug: string }>();
  const entry = slug ? getAlgorithm(slug) : undefined;

  if (!entry) return <Navigate to="/" replace />;

  const { meta, Content } = entry;

  return (
    <article>
      <div
        className="algo-hero"
        style={{ ["--lane" as string]: `var(${categoryColorVar[meta.category]})` }}
      >
        <Link to="/" className="algo-back mono">
          ← all algorithms
        </Link>
        <span className="algo-category mono">{categoryLabel[meta.category]}</span>
        <h1>{meta.title}</h1>
        <p>{meta.oneLiner}</p>
      </div>
      <Content />
    </article>
  );
}
