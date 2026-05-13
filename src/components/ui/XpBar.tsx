"use client";
import { useEffect, useState } from "react";

export default function XpBar({ years = 14 }: { years?: number }) {
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setFilled(years), 300);
    return () => clearTimeout(t);
  }, [years]);

  const total = 16;
  const blocks = Math.round((filled / total) * 10);

  return (
    <div className="flex items-center gap-3 font-vt text-xl text-gold">
      <span className="text-mist/60 text-sm">EXP</span>
      <span>
        {"█".repeat(blocks)}
        {"░".repeat(10 - blocks)}
      </span>
      <span>{years} YRS</span>
    </div>
  );
}
