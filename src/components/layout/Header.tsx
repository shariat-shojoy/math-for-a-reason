import { Link } from "react-router-dom";
import "./Header.css";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="site-logo">
          <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true">
            <line x1="8" y1="22" x2="16" y2="9" stroke="var(--signal)" strokeWidth="1.8" />
            <line x1="16" y1="9" x2="24" y2="22" stroke="var(--signal)" strokeWidth="1.8" />
            <line x1="8" y1="22" x2="24" y2="22" stroke="var(--ink-faint)" strokeWidth="1.8" />
            <circle cx="16" cy="9" r="3.2" fill="var(--signal)" />
            <circle cx="8" cy="22" r="3.2" fill="var(--ink)" />
            <circle cx="24" cy="22" r="3.2" fill="var(--ink)" />
          </svg>
          <span>
            math <em>for a reason</em>
          </span>
        </Link>
        <a
          className="site-header-link"
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
        >
          source ↗
        </a>
      </div>
    </header>
  );
}
