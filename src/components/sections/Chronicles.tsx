"use client";
import { motion } from "framer-motion";
import { chapters } from "@/data/profile";

interface Props {
  activeChapter?: number;
  chapterRefs: React.RefObject<(HTMLDivElement | null)[]>;
}

export default function Chronicles({ activeChapter, chapterRefs }: Props) {
  return (
    <section id="chronicles" className="relative py-24 px-4 max-w-3xl mx-auto">
      <h2 className="font-pixel text-gold text-lg mb-16 text-center">THE CHRONICLES</h2>

      <div className="relative border-l-2 border-arcane/30 pl-8 flex flex-col gap-16">
        {chapters.map((ch, i) => (
          <motion.div
            key={ch.number}
            ref={(el) => { if (chapterRefs.current) chapterRefs.current[i] = el; }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: 0.05 * i }}
            className="relative"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[2.65rem] top-1 h-4 w-4 rounded-full bg-arcane border-2 border-robe" />

            {/* Chapter badge */}
            <div className="inline-block font-pixel text-[10px] text-robe bg-gold px-2 py-1 mb-3">
              CH. {ch.number}
            </div>

            <h3 className="font-pixel text-sm text-mist mb-1">{ch.questTitle}</h3>
            <p className="font-vt text-xl text-mist/70 mb-1">
              {ch.role} · {ch.company}
              {ch.teamSize ? ` · Team of ${ch.teamSize}` : ""}
            </p>
            <p className="font-vt text-lg text-mist/40 mb-4">{ch.period} · {ch.location}</p>

            <ul className="space-y-2 mb-4">
              {ch.bullets.map((b, j) => (
                <li key={j} className="font-vt text-xl text-mist/80 flex gap-2">
                  <span className="text-arcane shrink-0">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {ch.tags.map((t) => (
                <span key={t} className="font-pixel text-[9px] text-arcane border border-arcane/40 px-2 py-1">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
