"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mapMarkers, chapters, hiddenShrineMarker } from "@/data/profile";

const WHEEL_DEBOUNCE_MS = 900;

function dist(
  a: { top: number; left: number },
  b: { top: number; left: number },
) {
  return Math.sqrt((a.top - b.top) ** 2 + (a.left - b.left) ** 2);
}

export default function Hero() {
  const [activeChapter, setActive] = useState(0);
  const [spritePos, setSpritePos] = useState({
    top: parseFloat(mapMarkers[0].top),
    left: parseFloat(mapMarkers[0].left),
  });
  const [facing, setFacing] = useState<1 | -1>(1);
  const [moving, setMoving] = useState(false);
  const [showMtg, setShowMtg] = useState(false);
  const [atSummit, setAtSummit] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const moveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mtgClicks = useRef(0);
  const mtgTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartY = useRef<number | null>(null);

  const walkTo = useCallback(
    (targetTop: number, targetLeft: number, onArrival?: () => void) => {
      const d = dist(spritePos, { top: targetTop, left: targetLeft });
      const duration = Math.max(0.6, d * 0.028);
      setFacing(targetLeft >= spritePos.left ? 1 : -1);
      setMoving(true);
      setSpritePos({ top: targetTop, left: targetLeft });
      if (moveTimer.current) clearTimeout(moveTimer.current);
      moveTimer.current = setTimeout(() => {
        setMoving(false);
        onArrival?.();
      }, duration * 1000);
    },
    [spritePos],
  );

  const goToChapter = useCallback(
    (index: number) => {
      if (index < 0 || index >= chapters.length || moving) return;
      const marker = mapMarkers.find((m) => m.chapter === index)!;
      setActive(index);
      setAtSummit(false);
      walkTo(parseFloat(marker.top), parseFloat(marker.left), () => {
        if (index === chapters.length - 1) setAtSummit(true);
      });
    },
    [moving, walkTo],
  );

  // Scroll interception — forward only (1→N), never backward
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      if (rect.top > 50 || rect.bottom < window.innerHeight * 0.4) return;

      // Never intercept scroll-up — page scrolls freely at all times
      if (e.deltaY <= 0) return;

      // At last chapter: clear any lingering debounce and release scroll immediately
      if (activeChapter >= chapters.length - 1) {
        if (wheelTimer.current) {
          clearTimeout(wheelTimer.current);
          wheelTimer.current = null;
        }
        return;
      }

      // During debounce window, hold position
      if (wheelTimer.current) { e.preventDefault(); return; }

      // Advance to next chapter
      e.preventDefault();
      goToChapter(activeChapter + 1);
      wheelTimer.current = setTimeout(() => { wheelTimer.current = null; }, WHEEL_DEBOUNCE_MS);
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeChapter, goToChapter]);

  // Arrow key navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown")
        goToChapter(activeChapter + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp")
        goToChapter(activeChapter - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeChapter, goToChapter]);

  // Touch swipe — forward only, same rule as wheel
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const dy = touchStartY.current - e.changedTouches[0].clientY;
      if (dy > 40) goToChapter(activeChapter + 1); // swipe up → next
      touchStartY.current = null;
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => { el.removeEventListener("touchstart", onTouchStart); el.removeEventListener("touchend", onTouchEnd); };
  }, [activeChapter, goToChapter]);

  const handleShrineClick = () => {
    mtgClicks.current += 1;
    if (mtgClicks.current >= 3) {
      setShowMtg(true);
      mtgClicks.current = 0;
      return;
    }
    if (mtgTimer.current) clearTimeout(mtgTimer.current);
    mtgTimer.current = setTimeout(() => {
      mtgClicks.current = 0;
    }, 1000);
  };

  const ch = chapters[activeChapter];

  return (
    <section
      id="home"
      ref={heroRef}
      className="hero-section relative flex overflow-hidden"
    >
      {/* ── LEFT / TOP (mobile): map ─────────────────────────────── */}
      <div className="hero-map relative flex-shrink-0">
        <img
          src="/assets/wisemancer-world-map.png"
          alt="Quest Map"
          className="absolute inset-0 w-full h-full object-fill"
        />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent to-robe" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-robe/80 to-transparent" />

        {mapMarkers.map((m) => (
          <button
            key={m.id}
            onClick={() => {
              if (m.chapter !== activeChapter) goToChapter(m.chapter);
            }}
            className={`marker-pulse absolute z-10 flex h-7 w-7 items-center justify-center rounded-full font-pixel text-[9px] text-white transition-all ${
              activeChapter === m.chapter
                ? "bg-gold text-robe scale-125 shadow-[0_0_12px_#F4D03F]"
                : "bg-arcane hover:scale-110"
            }`}
            style={{
              top: m.top,
              left: m.left,
              transform: "translate(-50%, -50%)",
            }}
            aria-label={chapters[m.chapter].questTitle}
          >
            {m.id}
          </button>
        ))}

        <button
          onClick={handleShrineClick}
          className="absolute z-10 h-8 w-8 rounded-full opacity-0 hover:opacity-20 transition-opacity duration-500 bg-gold"
          style={{
            top: hiddenShrineMarker.top,
            left: hiddenShrineMarker.left,
            transform: "translate(-50%, -50%)",
          }}
          aria-label="???"
          title=""
        />

        <motion.div
          className="sprite-walk absolute z-10"
          animate={{ top: `${spritePos.top}%`, left: `${spritePos.left}%` }}
          transition={{ duration: Math.max(0.6, 0.028 * 20), ease: "linear" }}
          style={{ translateX: "-50%", translateY: "-50%", scaleX: facing }}
        />
      </div>

      {/* ── RIGHT / BOTTOM (mobile): chapter content ─────────────── */}
      <div className="hero-content flex flex-1 flex-col items-center justify-center min-w-0 overflow-y-auto">
        <div style={{ width: "100%", maxWidth: 560 }}>
          {/* Progress bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 8,
                color: "var(--primary-d)",
                letterSpacing: 2,
              }}
            >
              THE CHRONICLES
            </span>
            <div style={{ flex: 1, height: 2, background: "var(--surface2)" }}>
              <div
                style={{
                  height: "100%",
                  background: "var(--gold)",
                  width: `${((activeChapter + 1) / chapters.length) * 100}%`,
                  transition: "width 0.6s ease",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 8,
                color: "var(--gold)",
                letterSpacing: 1,
              }}
            >
              {activeChapter + 1} / {chapters.length}
            </span>
          </div>

          {/* Chapter content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChapter}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 8,
                }}
              >
                <span
                  className="chip gold"
                  style={{ flexShrink: 0, fontSize: 8 }}
                >
                  CH.{ch.number}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 9,
                    color: "var(--text)",
                    letterSpacing: 1,
                    lineHeight: 1.7,
                  }}
                >
                  {ch.questTitle}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 22,
                  color: "var(--primary-l)",
                  lineHeight: 1.2,
                }}
              >
                {ch.role} · {ch.company}
                {ch.teamSize ? ` · Team of ${ch.teamSize}` : ""}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 18,
                  color: "var(--text-dim)",
                  marginBottom: 12,
                }}
              >
                {ch.period} · {ch.location}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {ch.bullets.map((b, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 20,
                      color: "var(--text)",
                      display: "flex",
                      gap: 8,
                      lineHeight: 1.25,
                    }}
                  >
                    <span style={{ color: "var(--primary)", flexShrink: 0 }}>
                      ▸
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="row" style={{ marginBottom: 8 }}>
                {ch.tags.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
              {atSummit && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 8,
                    color: "var(--gold)",
                    letterSpacing: 2,
                    lineHeight: 2,
                    marginTop: 8,
                  }}
                >
                  ★ THE SUMMIT HAS BEEN REACHED
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
              paddingTop: 12,
              borderTop: "1px solid var(--surface2)",
            }}
          >
            <button
              onClick={() => goToChapter(activeChapter - 1)}
              disabled={activeChapter === 0 || moving}
              className="btn ghost"
              style={{
                fontSize: 9,
                padding: "8px 14px",
                opacity: activeChapter === 0 ? 0.2 : 1,
              }}
            >
              ← PREV
            </button>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 7,
                color: "var(--text-dim)",
                letterSpacing: 1,
                textAlign: "center",
                opacity: 0.5,
              }}
            >
              {atSummit ? "scroll ↓ to continue" : "scroll or arrows"}
            </p>
            <button
              onClick={() => goToChapter(activeChapter + 1)}
              disabled={activeChapter === chapters.length - 1 || moving}
              className="btn"
              style={{
                fontSize: 9,
                padding: "8px 14px",
                opacity: activeChapter === chapters.length - 1 ? 0.2 : 1,
              }}
            >
              NEXT →
            </button>
          </div>
        </div>
      </div>

      {/* MTG easter egg */}
      {showMtg && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80"
          onClick={() => setShowMtg(false)}
        >
          <img
            src="/assets/wisemancer-mtg-card.png"
            alt="WISEMANCER"
            className="max-h-[80vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </section>
  );
}
