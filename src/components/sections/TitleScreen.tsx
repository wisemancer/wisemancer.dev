"use client";

export default function TitleScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="title-wrap">
      <img className="title-portrait" src="/assets/wisemancer-portrait.png" alt="The Wisemancer" />
      <div className="title-name">WISEMANCER</div>
      <div className="title-quest">THE QUEST<br />OF THE CODE SAGE</div>
      <div className="title-sub">▸ A PORTFOLIO BY XAVIER RIVAS</div>
      <button className="press-start" onClick={onStart}>► PRESS START ◄</button>
      <div style={{ marginTop: 24, fontFamily: "var(--font-body)", fontSize: 20, color: "var(--text-dim)", fontStyle: "italic" }}>
        Andean highlands · Senior Backend Developer · LVL 14
      </div>
    </div>
  );
}
