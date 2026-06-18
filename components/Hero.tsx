"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/context/i18n";

export function Hero() {
  const { t, dir } = useI18n();
  const headline = t("hero.headline") as string;
  const spotRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Aceternity spotlight — direct DOM updates, zero React re-renders
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!spotRef.current || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    spotRef.current.style.left = `${e.clientX - rect.left - 400}px`;
    spotRef.current.style.top = `${e.clientY - rect.top - 400}px`;
  }, []);

  useEffect(() => {
    const s = sectionRef.current;
    if (!s) return;
    s.addEventListener("mousemove", onMouseMove as EventListener);
    return () =>
      s.removeEventListener("mousemove", onMouseMove as EventListener);
  }, [onMouseMove]);

  const parts = headline
    .split(".")
    .map((s) => s.trim())
    .filter(Boolean);

  const stats = [
    { val: "10×", lbl: dir === "rtl" ? "מהירות תפוקה" : "Faster Output" },
    { val: "24/7", lbl: dir === "rtl" ? "תמיד זמין" : "Always On" },
    { val: "100%", lbl: dir === "rtl" ? "מותאם אישית" : "Custom-Built" },
  ];

  return (
    <section
      ref={sectionRef}
      className="absolute inset-0 flex flex-col items-center justify-center pt-16"
    >
      {/* Video vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/85 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(0,0,0,0.60),transparent)] pointer-events-none" />

      {/* Aceternity spotlight */}
      <div
        ref={spotRef}
        className="absolute w-[800px] h-[800px] pointer-events-none rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(59,130,246,0.04) 40%, transparent 70%)",
        }}
      />

      <div
        className="relative z-10 max-w-5xl mx-auto px-6 w-full text-center"
        dir={dir}
      >
        {/* Overline badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center mb-8"
        ></motion.div>

        {/* Headline — split on "." for two-line gradient effect */}
        <div className="mb-7">
          {parts.map((part, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 52 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.85,
                delay: 0.1 + i * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span
                className={`block font-display font-extrabold leading-[0.92] tracking-tight
                  text-[2.4rem] sm:text-5xl md:text-[3.75rem] lg:text-7xl xl:text-8xl
                  ${
                    i === parts.length - 1
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-200"
                      : "text-white"
                  }`}
              >
                {part}
                {i < parts.length - 1 ? "." : ""}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.65 }}
          className="text-white/75 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
        >
          {t("hero.sub") as string}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#services-ai"
            className="group relative w-full sm:w-auto overflow-hidden px-8 py-3.5
              bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm tracking-wide
              rounded-lg cursor-pointer transition-all duration-200
              shadow-[0_0_40px_rgba(59,130,246,0.35)] hover:shadow-[0_0_60px_rgba(59,130,246,0.5)]"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              {t("hero.cta_services") as string}
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            </span>
            <div
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full
              transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 border border-white/[0.18] hover:border-white/35
              text-white/65 hover:text-white font-semibold text-sm tracking-wide
              rounded-lg cursor-pointer transition-all duration-200"
          >
            {t("hero.cta_contact") as string}
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="flex items-center justify-center"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className={`text-center px-6 md:px-10 ${
                i > 0 ? "border-l border-white/[0.10]" : ""
              }`}
            >
              <p className="font-display text-2xl md:text-3xl font-bold text-white">
                {s.val}
              </p>
              <p className="text-white/55 text-[11px] mt-0.5 font-mono tracking-wider uppercase">
                {s.lbl}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
