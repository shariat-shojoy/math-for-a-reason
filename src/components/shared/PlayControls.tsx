import "./PlayControls.css";

interface PlayControlsProps {
  step: number;
  maxStep: number;
  playing: boolean;
  speed: number;
  atStart: boolean;
  atEnd: boolean;
  onBack: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onScrub: (step: number) => void;
  stepLabel?: string;
}

export function PlayControls({
  step,
  maxStep,
  playing,
  speed,
  atStart,
  atEnd,
  onBack,
  onNext,
  onTogglePlay,
  onReset,
  onSpeedChange,
  onScrub,
  stepLabel,
}: PlayControlsProps) {
  return (
    <div className="play-controls">
      <div className="play-controls-row">
        <button type="button" className="pc-btn" onClick={onReset} aria-label="Restart">
          ⟲
        </button>
        <button
          type="button"
          className="pc-btn"
          onClick={onBack}
          disabled={atStart}
          aria-label="Step back"
        >
          ‹
        </button>
        <button
          type="button"
          className="pc-btn pc-btn-primary"
          onClick={onTogglePlay}
          disabled={atEnd && !playing}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <button
          type="button"
          className="pc-btn"
          onClick={onNext}
          disabled={atEnd}
          aria-label="Step forward"
        >
          ›
        </button>

        <input
          className="pc-scrub"
          type="range"
          min={0}
          max={maxStep}
          value={step}
          onChange={(e) => onScrub(Number(e.target.value))}
          aria-label="Scrub through steps"
        />

        <span className="pc-step mono">
          {stepLabel ?? `step ${step} / ${maxStep}`}
        </span>

        <label className="pc-speed">
          <span className="mono">speed</span>
          <input
            type="range"
            min={0.5}
            max={6}
            step={0.5}
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            aria-label="Playback speed"
          />
        </label>
      </div>
    </div>
  );
}
