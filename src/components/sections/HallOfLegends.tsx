"use client";
import { motion } from "framer-motion";
import { achievements } from "@/data/profile";

export default function HallOfLegends() {
  return (
    <section id="legends" className="py-24 px-4 max-w-4xl mx-auto">
      <h2 className="font-pixel text-gold text-lg mb-16 text-center">THE HALL OF LEGENDS</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {achievements.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="border border-gold/40 bg-gold/5 p-8 flex flex-col items-center text-center gap-4 hover:shadow-[0_0_24px_#F4D03F40] transition-shadow"
          >
            <span className="text-5xl">{a.icon}</span>
            <h3 className="font-pixel text-xs text-gold">{a.title}</h3>
            <p className="font-pixel text-[9px] text-arcane">{a.questName}</p>
            <p className="font-vt text-xl text-mist/80">{a.description}</p>
            <div className="flex flex-col gap-1">
              {a.years.map((y) => (
                <span key={y} className="font-vt text-lg text-mist/50">{y}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
