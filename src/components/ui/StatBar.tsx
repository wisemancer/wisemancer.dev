interface Props {
  kind?: "hp" | "mp" | "xp" | "purple";
  label: string;
  value: number;
  max: number;
  total?: number;
}

const kindColor = { hp: "var(--danger)", mp: "#4FA37D", xp: "var(--gold)", purple: "var(--primary)" };
const kindGlyph = { hp: "✦", mp: "✶", xp: "▸", purple: "◆" };

export default function StatBar({ kind = "xp", label, value, max, total = 12 }: Props) {
  const filled = Math.round((value / max) * total);
  return (
    <div className="statbar">
      <div className="statbar-row">
        <span className="statbar-lbl" style={{ color: kindColor[kind] }}>
          {kindGlyph[kind]} {label}
        </span>
        <span className="statbar-val">{value} / {max}</span>
      </div>
      <div className="statbar-track">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={`statbar-chunk ${i < filled ? `on ${kind}` : ""}`} />
        ))}
      </div>
    </div>
  );
}
