export default function Nova({ pose = "neutral", quote, compact = false }) {
  return (
    <aside
      className={`nova-guide rendered-nova ${compact ? "compact" : ""} pose-${pose}`}
      aria-label="Nova, your guide"
    >
      <img
        className="nova-portrait"
        src="/art/nova.webp"
        alt="Nova, your expedition guide, holding her field journal"
      />
      <div className="nova-voice">
        <span className="eyebrow">
          NOVA <span className="voice-line" /> YOUR GUIDE
        </span>
        <p>{quote}</p>
      </div>
    </aside>
  );
}
