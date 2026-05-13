"use client";
import { useState } from "react";
import { skills } from "@/data/profile";
import StatBar from "@/components/ui/StatBar";

const ICON_MAP: Record<string, string> = {
  "TypeScript":        "rune-stone",
  "MySQL":             "spellbook-open",
  "PHP":               "scroll-lightning",
  "C# / .NET":         "shield",
  "PostgreSQL":        "gem-crystal",
  "Node.js / NestJS":  "tower-lightning",
  "MongoDB":           "crystal-ball",
  "CQRS + Lambda":     "shuffle",
  "Kubernetes":        "ships-wheel",
  "GraphQL":           "graph-network",
  "RabbitMQ / SQS":    "raven-mail",
  "MCP / Anthropic API": "spellbook-closed",
  "AWS":               "storm-cloud",
  "Apache TinkerPop":  "mesh-network",
  "Cursor IDE":        "cursor-spark",
};

const TIER_LVL: Record<string, number> = { EXPERT: 10, PROFICIENT: 7, FAMILIAR: 4 };

const GROUPS = [
  { title: "EXPERT ARTS",      filter: "EXPERT"     as const },
  { title: "PROFICIENT ARTS",  filter: "PROFICIENT" as const },
  { title: "FAMILIAR ARTS",    filter: "FAMILIAR"   as const },
];

export default function Spellbook() {
  const [selected, setSelected] = useState(skills[0]);

  return (
    <section id="spellbook" className="screen" style={{ paddingTop: 40, paddingBottom: 56 }}>
      <div className="h-chapter">▸ APPENDIX I</div>
      <h2 className="h-quest">SPELLBOOK</h2>
      <p className="flavor">"Incantations memorised. Mastery is measured in dragons banished, not years."</p>

      <div className="section layout-2col">
        <div>
          {GROUPS.map((g) => (
            <div key={g.title} className="panel" style={{ marginBottom: 16 }}>
              <span className="label" style={{ color: "var(--gold)" }}>▸ {g.title}</span>
              <div className="inv" style={{ marginTop: 10 }}>
                {skills.filter((s) => s.tier === g.filter).map((s) => (
                  <div key={s.name}>
                    <div
                      className={`slot${selected.name === s.name ? "" : ""}`}
                      style={selected.name === s.name
                        ? { boxShadow: "0 0 14px rgba(155,93,229,.9)", borderColor: "var(--primary-l)" }
                        : undefined}
                      onClick={() => setSelected(s)}
                    >
                      <img src={`/assets/icons/${ICON_MAP[s.name] ?? "spellbook-closed"}.png`} alt={s.name} />
                      <span className="qty">L{TIER_LVL[s.tier]}</span>
                    </div>
                    <div className="slot-lbl">{s.name}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <aside>
          <div className="panel thick" style={{ position: "sticky", top: 80 }}>
            <span className="label" style={{ color: "var(--gold)" }}>▸ SPELL DETAIL</span>
            <div style={{ textAlign: "center", margin: "14px 0" }}>
              <img
                src={`/assets/icons/${ICON_MAP[selected.name] ?? "spellbook-closed"}.png`}
                alt="" style={{ width: 88, height: 88 }}
              />
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 12, color: "var(--text)", textAlign: "center", letterSpacing: 1, marginBottom: 10 }}>
              {selected.name}
            </div>
            <StatBar kind="purple" label="MASTERY" value={TIER_LVL[selected.tier]} max={10} total={10} />
            <div style={{ fontFamily: "var(--font-display)", fontSize: 9, color: "var(--primary)", marginTop: 6, letterSpacing: 1 }}>
              {selected.tier}
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "var(--text-dim)", fontStyle: "italic", lineHeight: 1.15, marginTop: 8 }}>
              "{selected.spellName}"
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
