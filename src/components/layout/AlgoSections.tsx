import type { ReactNode } from "react";
import type { Application, Category } from "../../lib/types";
import { categoryColorVar } from "../../lib/types";
import "./AlgoSections.css";

export function Hook({
  question,
  children,
}: {
  question: string;
  children: ReactNode;
}) {
  return (
    <section className="section hook">
      <p className="eyebrow">The hook</p>
      <h2 className="hook-question">{question}</h2>
      <div className="hook-body">{children}</div>
    </section>
  );
}

export function Idea({ children }: { children: ReactNode }) {
  return (
    <section className="section idea">
      <p className="eyebrow">The idea</p>
      <div className="idea-body">{children}</div>
    </section>
  );
}

export function WatchItThink({
  children,
  category,
}: {
  children: ReactNode;
  category: Category;
}) {
  return (
    <section
      className="section watch"
      style={{ ["--lane" as string]: `var(${categoryColorVar[category]})` }}
    >
      <p className="eyebrow eyebrow-inverse">Watch it think</p>
      <div className="watch-body">{children}</div>
    </section>
  );
}

export function WhereItLives({ applications }: { applications: Application[] }) {
  return (
    <section className="section lives">
      <p className="eyebrow">Where it lives</p>
      <ul className="lives-list">
        {applications.map((a) => (
          <li key={a.system}>
            <span className="lives-system">{a.system}</span>
            <span className="lives-detail">{a.detail}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function NowYouTry({ children }: { children: ReactNode }) {
  return (
    <section className="section try">
      <p className="eyebrow eyebrow-signal">Now you try</p>
      <div className="try-body">{children}</div>
    </section>
  );
}
