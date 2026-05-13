"use client";
import { useState } from "react";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import TitleScreen from "@/components/sections/TitleScreen";
import Hero from "@/components/sections/Hero";
import Spellbook from "@/components/sections/Spellbook";
import HallOfLegends from "@/components/sections/HallOfLegends";
import Workshop from "@/components/sections/Workshop";
import Realm from "@/components/sections/Realm";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <>
        <Cursor />
        <TitleScreen onStart={() => setStarted(true)} />
      </>
    );
  }

  return (
    <>
      <Cursor />
      <Nav />
      <main className="app">
        <Hero />
        <Spellbook />
        <HallOfLegends />
        <Workshop />
        <Realm />
        <Contact />
      </main>
      <footer style={{ padding: "32px 20px", textAlign: "center", fontFamily: "var(--font-body)", fontSize: 18, color: "var(--text-rune)", borderTop: "2px solid var(--primary-d)" }}>
        © 2026 Xavier Rivas · wisemancer.dev · crafted with TypeScript & Claude Code
      </footer>
    </>
  );
}
