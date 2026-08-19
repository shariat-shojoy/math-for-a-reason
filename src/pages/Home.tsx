import { algorithms } from "../algorithms/registry";
import { RouteMap } from "../components/layout/RouteMap";
import "./Home.css";

export function Home() {
  return (
    <div>
      <section className="hero">
        <p className="hero-eyebrow mono">an interactive field notebook</p>
        <h1>
          Algorithms are cool.
          <br />
          Here's what they're <em>actually for</em>.
        </h1>
        <p className="hero-sub">
          Most explanations stop at "here's how it works." This is a map of
          algorithms worth knowing — each one explained, visualized, and traced
          to the real systems that run on it, so you can spot where to use it
          next.
        </p>
      </section>

      <RouteMap entries={algorithms} />
    </div>
  );
}
