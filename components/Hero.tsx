"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/context/i18n";

const wordVariants = {
  hidden: { opacity: 0, y: 60, filter: "blur(12px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, delay: i * 0.13, ease: [0.16, 1, 0.3, 1] },
  }),
};

const TECH_TAGS = ["Next.js 14", "TypeScript", "OpenAI", "Tailwind CSS", "Node.js"];

export function Hero() {
  const { t, dir } = useI18n();
  const headline = t("hero.headline") as string;
  const words = headline.split(" ");
  const tags = [
    t("hero.tag1") as string,
    t("hero.tag2") as string,
    t("hero.tag3") as string,
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-16 overflow-hidden"
    >
      {/* Strong vignette — darker at top and bottom so headline always pops */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/75 pointer-events-none" />
      {/* Radial dark center-punch behind text */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,rgba(0,0,0,0.55),transparent)] pointer-events-none" />

      <div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center"
        dir={dir}
      >

        {/* Headline — glass backdrop makes it legible over any video frame */}
        <div
          className="rounded-2xl px-6 py-4 mb-6"
          style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}
        >
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]
                  font-extrabold text-white leading-tight tracking-tight"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: words.length * 0.13 + 0.3, duration: 0.65 }}
          className="text-white/75 text-base md:text-xl max-w-2xl mb-3 leading-relaxed px-2
            drop-shadow-[0_1px_12px_rgba(0,0,0,1)]"
        >
          {t("hero.sub") as string}
        </motion.p>

        {/* What-we-do tags */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: words.length * 0.13 + 0.5, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-white/8 border border-white/15 rounded-full
                text-white/60 text-xs font-medium tracking-wide backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: words.length * 0.13 + 0.65, duration: 0.55 }}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 mb-12 w-full sm:w-auto"
        >
          <a
            href="#services-ai"
            className="relative group overflow-hidden w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500
              text-white font-semibold rounded-xl cursor-pointer transition-colors duration-200
              shadow-[0_0_35px_rgba(59,130,246,0.4)]"
          >
            <span className="relative z-10">{t("hero.cta_services") as string}</span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full
              transition-transform duration-500 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 border border-white/25 hover:border-blue-500/70 bg-black/25
              text-white hover:text-blue-400 font-semibold rounded-xl cursor-pointer
              transition-all duration-200 backdrop-blur-sm"
          >
            {t("hero.cta_contact") as string}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
      >
        <span className="text-white/25 text-[10px] tracking-widest uppercase">
          {dir === "rtl" ? "גלול" : "Scroll"}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.25)" strokeWidth="1.5">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
