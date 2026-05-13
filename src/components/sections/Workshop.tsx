"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/profile";

const TOME_ICONS: Record<string, string> = {
  "knowledge-mcp":   "spellbook-open",
  "amareto-kraken":  "graph-network",
  "amz-acg":         "shield",
};

export default function Workshop() {
  const [selected, setSelected] = useState<string | null>(null);
  const tome = projects.find((p) => p.name === selected);

  return (
    <section id="workshop" className="screen" style={{ paddingTop: 40, paddingBottom: 56 }}>
      <div className="h-chapter">▸ THE WORKSHOP</div>
      <h2 className="h-quest">TOMES OF CRAFT</h2>
      <p className="flavor">"Each tome a battle won. Open one — read the scroll."</p>

      <AnimatePresence mode="wait">
        {!tome ? (
          <motion.div key="grid" className="section tomes-grid"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {projects.map((p) => (
              <div key={p.name} className="tome" onClick={() => setSelected(p.name)}>
                <div className="tome-head">
                  <img src={`/assets/icons/${TOME_ICONS[p.name] ?? "spellbook-closed"}.png`} alt="" />
                  <span className="tome-tag">▸ {p.questName}</span>
                </div>
                <div className="tome-title">{p.name}</div>
                <div className="tome-body">"{p.description.slice(0, 90)}…"</div>
                <div className="tome-stats">
                  {p.tags.slice(0, 3).map((t) => <span key={t} className="chip">{t}</span>)}
                  <span className="chip gold">SHIPPED</span>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div key="detail" className="section"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <button className="back-link" onClick={() => setSelected(null)}>◄ BACK TO TOMES</button>
            <div className="h-chapter">▸ TOME DETAIL</div>
            <h2 className="h-quest">{tome.name.toUpperCase()}</h2>
            <p className="flavor">"{tome.questName}"</p>

            <div className="section layout-2col">
              <div className="panel thick">
                <div style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: 18, alignItems: "start" }}>
                  <img src={`/assets/icons/${TOME_ICONS[tome.name] ?? "spellbook-closed"}.png`} alt="" style={{ width: 64, height: 64 }} />
                  <div>
                    <span className="label" style={{ color: "var(--gold)" }}>▸ THE SCROLL</span>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 22, color: "var(--text)", lineHeight: 1.2, margin: "8px 0 14px" }}>
                      {tome.description}
                    </p>
                    <span className="label" style={{ color: "var(--primary)" }}>◆ INCANTATIONS WIELDED</span>
                    <div className="row" style={{ marginTop: 8 }}>
                      {tome.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                    </div>
                  </div>
                </div>
              </div>

              <aside>
                <div className="panel">
                  <span className="label" style={{ color: "var(--gold)" }}>▸ SIGILS</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
                    <a href={tome.github} target="_blank" rel="noopener noreferrer" className="btn">⚔ VIEW SOURCE</a>
                  </div>
                </div>
              </aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
