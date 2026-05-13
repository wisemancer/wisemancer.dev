"use client";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "#home",      label: "QUEST LOG"  },
  { href: "#spellbook", label: "SPELLBOOK"  },
  { href: "#legends",   label: "LEGENDS"    },
  { href: "#workshop",  label: "TOMES"      },
  { href: "#realm",     label: "REALM"      },
  { href: "#contact",   label: "RAVEN"      },
];

const STAT_CARDS = [
  { lbl: "COMBAT",  grade: "A−", val: "HP 84/100",  color: "var(--danger)"    },
  { lbl: "ARCANA",  grade: "B+", val: "MP 12/30",   color: "#4FA37D"          },
  { lbl: "WISDOM",  grade: "S",  val: "LVL 14",     color: "var(--gold)"      },
  { lbl: "HONOR",   grade: "A+", val: "+2,310 XP",  color: "var(--primary-l)" },
];

export default function Nav() {
  const navRef   = useRef<HTMLElement>(null);
  const [active, setActive]   = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Publish nav height as CSS variable so hero + anchors can react
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const update = () =>
      document.documentElement.style.setProperty("--nav-h", `${el.offsetHeight}px`);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [menuOpen]); // re-measure when menu opens/closes

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header ref={navRef} className="hud">

      {/* ── desktop: top row ─────────────────────────────────────── */}
      <div className="hud-top">
        <div className="hud-brand" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setMenuOpen(false); }}>
          ⚔ WISEMANCER
        </div>

        {/* desktop nav — hidden on mobile */}
        <nav className="hud-nav hud-nav-desktop">
          {links.map(({ href, label }) => (
            <a key={href} href={href} className={active === href.slice(1) ? "active" : ""}>
              {label}
            </a>
          ))}
        </nav>

        {/* hamburger — visible only on mobile */}
        <button
          className="hud-burger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* ── mobile dropdown nav ───────────────────────────────────── */}
      {menuOpen && (
        <nav className="hud-mobile-nav">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={active === href.slice(1) ? "active" : ""}
              onClick={handleNavClick}
            >
              {label}
            </a>
          ))}
        </nav>
      )}

      {/* ── grade cards — desktop only ────────────────────────────── */}
      <div className="hud-cards">
        {STAT_CARDS.map((s) => (
          <div key={s.lbl} className="hud-card">
            <div className="card-lbl">{s.lbl}</div>
            <div className="card-grade">{s.grade}</div>
            <div className="card-val" style={{ color: s.color }}>{s.val}</div>
          </div>
        ))}
      </div>

      <div className="hud-quip">▸ FLAVOR PROFILE &nbsp;·&nbsp; BACKEND SAGE / SYSTEM ARCHITECT</div>
    </header>
  );
}
