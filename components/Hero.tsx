"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/context/i18n";
import FlowWave from "@/components/ui/flow-wave";

export function Hero() {
  const { t, dir } = useI18n();
  const headline = t("hero.headline") as string;
  const isRTL = dir === "rtl";

  const parts = headline
    .split(".")
    .map((s) => s.trim())
    .filter(Boolean);

  const stats = [
    { val: "10×", lbl: isRTL ? "מהירות תפוקה" : "Faster Output" },
    { val: "24/7", lbl: isRTL ? "תמיד זמין" : "Always On" },
    { val: "100%", lbl: isRTL ? "מותאם אישית" : "Custom-Built" },
  ];

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#06080f" }}
    >
      {/* Flow Wave background */}
      <FlowWave className="absolute inset-0 z-0 pointer-events-none" />

      {/* Indigo top-center brand overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% -15%, rgba(99,102,241,0.20), transparent)",
        }}
      />

      {/* Amber bottom-left accent */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at -5% 105%, rgba(245,158,11,0.07), transparent)",
        }}
      />

      {/* Side & top vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 100% 75% at 50% 50%, transparent 35%, #06080f 90%)",
        }}
      />

      {/* Bottom blend — fades animation into next section */}
      <div
        className="absolute bottom-0 inset-x-0 h-52 pointer-events-none z-[2]"
        style={{
          background: "linear-gradient(to bottom, transparent, #06080f 85%)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 max-w-5xl mx-auto px-6 w-full text-center pt-20 pb-16"
        dir={dir}
      >
        {/* Headline */}
        <div className="mb-7">
          {parts.map((part, i) => (
            <div
              key={i}
              className="hero-in-tall"
              style={{ animationDelay: `${80 + i * 150}ms` }}
            >
              <span
                className={`block font-display font-bold leading-[1.04] tracking-tight
                  text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]
                  ${
                    i === parts.length - 1
                      ? "bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400 bg-clip-text text-transparent"
                      : "text-white"
                  }`}
              >
                {part}
                {i < parts.length - 1 ? "." : ""}
              </span>
            </div>
          ))}
        </div>

        {/* Subtext */}
        <p
          className="hero-in text-white text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ animationDelay: "480ms", animationDuration: "0.65s" }}
        >
          {t("hero.sub") as string}
        </p>

        {/* CTAs */}
        <div
          className="hero-in flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
          style={{ animationDelay: "620ms", animationDuration: "0.55s" }}
        >
          <button
            onClick={() => scrollTo("services")}
            className="group relative w-full sm:w-auto overflow-hidden px-8 py-3.5
              bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm
              rounded-xl cursor-pointer transition-all duration-200
              shadow-[0_0_35px_rgba(99,102,241,0.30)]
              hover:shadow-[0_0_55px_rgba(99,102,241,0.50)]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {t("hero.cta_services") as string}
              <motion.span
                animate={{ x: isRTL ? [0, -3, 0] : [0, 3, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {isRTL ? "←" : "→"}
              </motion.span>
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </button>

          <button
            onClick={() => scrollTo("contact")}
            className="w-full sm:w-auto px-8 py-3.5 border border-white/30 hover:border-white/50
              bg-white/[0.06] hover:bg-white/[0.10]
              text-white font-medium text-sm
              rounded-xl cursor-pointer transition-all duration-200"
          >
            {t("hero.cta_contact") as string}
          </button>
        </div>

        {/* Stats row */}
        <div
          className="hero-in flex justify-center"
          style={{ animationDelay: "820ms", animationDuration: "0.65s" }}
        >
        <div className="flex items-center rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm overflow-hidden">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`text-center px-4 py-3 sm:px-8 sm:py-4 ${i > 0 ? "border-l border-white/[0.07]" : ""}`}
            >
              <p className="font-display text-2xl font-bold text-white">
                {s.val}
              </p>
              <p className="text-white text-[10px] mt-0.5 tracking-[0.18em] uppercase font">
                {s.lbl}
              </p>
            </div>
          ))}
        </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-fade absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
        style={{ animationDelay: "1200ms" }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="w-1 h-1 rounded-full bg-white/25" />
      </div>
    </section>
  );
}
