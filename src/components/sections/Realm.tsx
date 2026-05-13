"use client";
import { motion } from "framer-motion";
import { interests } from "@/data/profile";
import StatBar from "@/components/ui/StatBar";

export default function Realm() {
  return (
    <section id="realm" className="screen" style={{
      paddingTop: 40, paddingBottom: 56,
      background: "linear-gradient(rgba(26,26,46,0.88), rgba(13,13,26,0.96)), url('/assets/wisemancer-workshop-bg.png') center/cover fixed",
    }}>
      <div className="h-chapter">▸ THE REALM</div>
      <h2 className="h-quest">BEYOND THE FORGE</h2>
      <p className="flavor">"The wizard is more than his spells."</p>

      <div className="section layout-2col">
        <div>
          <div className="panel" style={{ marginBottom: 18 }}>
            <span className="label" style={{ color: "var(--gold)" }}>▸ PARTY STATS</span>
            <div style={{ height: 8 }} />
            <StatBar kind="hp" label="COFFEE INTAKE"   value={84} max={100} />
            <StatBar kind="mp" label="MANA (FILTRADO V60)" value={12} max={30} />
            <StatBar kind="xp" label="YEARS OF SERVICE" value={14} max={40} />
          </div>

          <div className="panel">
            <span className="label" style={{ color: "var(--gold)" }}>▸ KNOWN TERRITORIES</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 10 }}>
              {interests.map((item, i) => (
                <motion.div key={item.name}
                  initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  style={{ borderBottom: "2px dotted var(--primary-d)", padding: "10px 0" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 10, color: "var(--primary)", letterSpacing: 1 }}>
                    ◆ {item.name}
                  </span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 20, color: "var(--text-dim)", margin: "4px 0 0", fontStyle: "italic" }}>
                    {item.lore}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <aside>
          <div className="companion">
            <img src="/assets/magia-companion-portrait.png" alt="Magia" />
            <div className="plate">MAGIA</div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "var(--text-dim)", fontStyle: "italic", lineHeight: 1.15, margin: "6px 0 0" }}>
              "Bites bugs. Sniffs out null pointers. Good familiar."
            </p>
          </div>
          <div className="panel" style={{ marginTop: 14 }}>
            <StatBar kind="purple" label="LOYALTY" value={10} max={10} total={10} />
            <StatBar kind="hp"     label="FLUFFINESS" value={9} max={10} total={10} />
          </div>
        </aside>
      </div>
    </section>
  );
}
