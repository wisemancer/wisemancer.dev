"use client";
import { useState } from "react";

const SOCIAL = [
  { label: "LINKEDIN",      href: "https://linkedin.com/in/xavier-rivas-espinoza", glyph: "◆" },
  { label: "GITHUB",        href: "https://github.com/wisemancer",                 glyph: "◆" },
  { label: "EMAIL",         href: "mailto:xavier.rivase@gmail.com",                glyph: "◆" },
  { label: "INSTAGRAM",     href: "https://instagram.com/xavier.rivas.e",          glyph: "◆" },
  { label: "D.LIGHTMANCER", href: "https://instagram.com/d.lightmancer",           glyph: "✦" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", subject: "", body: "" });
  const [sent, setSent] = useState(false);

  const send = () => {
    if (!form.name || !form.body) return;
    setSent(true);
  };

  return (
    <section id="contact" className="screen" style={{ paddingTop: 40, paddingBottom: 64 }}>
      <div className="h-chapter">▸ APPENDIX II</div>
      <h2 className="h-quest">SEND A RAVEN</h2>
      <p className="flavor">"Tie the scroll to its leg. It flies through the mountain passes by dawn."</p>

      <div className="section layout-2col">
        {/* Contact form */}
        <div className="panel thick">
          {sent ? (
            <div style={{ textAlign: "center", padding: "32px 12px" }}>
              <img src="/assets/icons/raven-mail.png" style={{ width: 96, height: 96 }} alt="" />
              <div style={{ fontFamily: "var(--font-display)", fontSize: 14, color: "var(--gold)", letterSpacing: 2, marginTop: 16, marginBottom: 12 }}>
                THE RAVEN FLIES
              </div>
              <p className="flavor" style={{ maxWidth: 360, margin: "0 auto 20px" }}>
                "Your message is in flight, {form.name}. Expect a reply within three moons."
              </p>
              <button className="btn ghost" onClick={() => { setSent(false); setForm({ name: "", subject: "", body: "" }); }}>
                SEND ANOTHER
              </button>
            </div>
          ) : (
            <div>
              {[
                { key: "name",    label: "TRUE NAME",     placeholder: "Your name",        type: "text" },
                { key: "subject", label: "SUBJECT GLYPH", placeholder: "Quest proposal",   type: "text" },
                { key: "body",    label: "MESSAGE",        placeholder: "Hail Wisemancer…", type: "area" },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key} style={{ marginBottom: 14 }}>
                  <span className="label">▸ {label}</span>
                  {type === "area" ? (
                    <textarea className="field" value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} />
                  ) : (
                    <input className="field" type={type} value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} />
                  )}
                </div>
              ))}
              <div className="row" style={{ marginTop: 10 }}>
                <button className="btn gold" onClick={send}>► RELEASE THE RAVEN</button>
                <button className="btn ghost" onClick={() => setForm({ name: "", subject: "", body: "" })}>CLEAR</button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Download CV */}
          <div className="panel">
            <span className="label" style={{ color: "var(--gold)" }}>▸ THE GRIMOIRE</span>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 17, color: "var(--text-dim)", fontStyle: "italic", margin: "6px 0 12px", lineHeight: 1.2 }}>
              "The chronicles, bound in parchment."
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a href="/downloads/xavier-rivas-resume.pdf" download
                className="btn gold" style={{ textAlign: "center", textDecoration: "none", display: "block", whiteSpace: "nowrap" }}>
                [ LIGHT PDF ]
              </a>
              <a href="/downloads/xavier-rivas-resume-dark.pdf" download
                className="btn" style={{ textAlign: "center", textDecoration: "none", display: "block", whiteSpace: "nowrap" }}>
                [ DARK PDF ]
              </a>
            </div>
          </div>

          {/* Social sigils */}
          <div className="panel">
            <span className="label" style={{ color: "var(--gold)" }}>▸ SIGILS</span>
            <ul style={{ listStyle: "none", padding: 0, margin: "10px 0 0", display: "flex", flexDirection: "column", gap: 6 }}>
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: "var(--font-body)", fontSize: 20, color: "var(--primary-l)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8, transition: "color 80ms" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--primary-l)")}
                  >
                    <span style={{ color: "var(--primary)", fontFamily: "var(--font-display)", fontSize: 8 }}>{s.glyph}</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Availability */}
          <div className="panel">
            <span className="label">▸ AVAILABILITY</span>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 20, color: "var(--text)", lineHeight: 1.3, margin: "8px 0 0" }}>
              Open to <span style={{ color: "var(--gold)" }}>senior backend</span> and{" "}
              <span style={{ color: "#7DC4A3" }}>tech lead</span> opportunities.
            </p>
          </div>

        </aside>
      </div>
    </section>
  );
}
