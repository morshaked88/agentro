"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/context/i18n";

function BrainIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M9 2a5 5 0 0 0-4 8.06A5 5 0 0 0 9 18v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M15 2a5 5 0 0 1 4 8.06A5 5 0 0 1 15 18v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M9 9h6M9 13h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function AgentIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 20c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M19 8h2M3 8h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function AutoIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function LLMIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function WebIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function SaaSIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2 9h20" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="5.5" cy="6.5" r="1" fill="currentColor" />
      <circle cx="8.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function DesignIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 20h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
        stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function BackendIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 5v5c0 1.657 4.029 3 9 3s9-1.343 9-3V5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 10v4.5c0 1.657 4.029 3 9 3s9-1.343 9-3V10" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function Services() {
  const { t, dir } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const isRTL = dir === "rtl";

  const aiStats = [
    { val: t("services.ai.stat1_val") as string, lbl: t("services.ai.stat1_lbl") as string },
    { val: t("services.ai.stat2_val") as string, lbl: t("services.ai.stat2_lbl") as string },
    { val: t("services.ai.stat3_val") as string, lbl: t("services.ai.stat3_lbl") as string },
  ];

  const webStats = [
    { val: t("services.web.stat1_val") as string, lbl: t("services.web.stat1_lbl") as string },
    { val: t("services.web.stat2_val") as string, lbl: t("services.web.stat2_lbl") as string },
    { val: t("services.web.stat3_val") as string, lbl: t("services.web.stat3_lbl") as string },
  ];

  const aiCaps = [
    { icon: <AgentIcon className="text-indigo-400" />, title: t("services.ai.cap1_title") as string, desc: t("services.ai.cap1_desc") as string },
    { icon: <AutoIcon className="text-indigo-400" />, title: t("services.ai.cap2_title") as string, desc: t("services.ai.cap2_desc") as string },
    { icon: <LLMIcon className="text-indigo-400" />, title: t("services.ai.cap3_title") as string, desc: t("services.ai.cap3_desc") as string },
  ];

  const webCaps = [
    { icon: <SaaSIcon className="text-amber-400" />, title: t("services.web.cap1_title") as string, desc: t("services.web.cap1_desc") as string },
    { icon: <DesignIcon className="text-amber-400" />, title: t("services.web.cap2_title") as string, desc: t("services.web.cap2_desc") as string },
    { icon: <BackendIcon className="text-amber-400" />, title: t("services.web.cap3_title") as string, desc: t("services.web.cap3_desc") as string },
  ];

  return (
    <section
      id="services"
      className="relative py-28 overflow-hidden"
      style={{ background: "#06080f" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      {/* Indigo glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 55% 50% at 80% 20%, rgba(99,102,241,0.08), transparent)",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6" dir={dir}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-indigo-400/60 text-xs tracking-[0.22em]">/ 01</span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-indigo-500/40 to-transparent" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight">
            {t("services.title") as string}
          </h2>
        </motion.div>

        <div className="space-y-0">

          {/* ── AI Block ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-white/[0.07] py-16"
          >
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 lg:gap-20 items-start">

              {/* Left: label + icon + number */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/[0.08] border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <BrainIcon />
                  </div>
                  <span className="text-indigo-400 text-xs tracking-[0.18em] uppercase">
                    {isRTL ? "בינה מלאכותית" : "Artificial Intelligence"}
                  </span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                  {t("services.ai.title") as string}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-sm">
                  {t("services.ai.desc") as string}
                </p>

                {/* Stats strip */}
                <div className="border-t border-white/[0.06] pt-6 flex gap-8">
                  {aiStats.map((s, i) => (
                    <div key={i}>
                      <p className="font-display text-2xl font-bold text-indigo-400">{s.val}</p>
                      <p className="text-white/40 text-xs mt-0.5">{s.lbl}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: capability cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.05] rounded-2xl overflow-hidden">
                {aiCaps.map((cap, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-[#06080f] p-6 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="mb-4">{cap.icon}</div>
                    <h4 className="font-display text-sm font-semibold text-white mb-2">{cap.title}</h4>
                    <p className="text-white/50 text-xs leading-relaxed">{cap.desc}</p>
                  </motion.div>
                ))}
              </div>

            </div>
          </motion.div>

          {/* ── Web Block ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-white/[0.07] py-16"
          >
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 lg:gap-20 items-start">

              {/* Left: label + icon + number */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/[0.08] border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <WebIcon />
                  </div>
                  <span className="text-amber-400 text-xs tracking-[0.18em] uppercase">
                    {isRTL ? "פיתוח תוכנה" : "Software Development"}
                  </span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                  {t("services.web.title") as string}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-sm">
                  {t("services.web.desc") as string}
                </p>

                {/* Stats strip */}
                <div className="border-t border-white/[0.06] pt-6 flex gap-8">
                  {webStats.map((s, i) => (
                    <div key={i}>
                      <p className="font-display text-2xl font-bold text-amber-400">{s.val}</p>
                      <p className="text-white/40 text-xs mt-0.5">{s.lbl}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: capability cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.05] rounded-2xl overflow-hidden">
                {webCaps.map((cap, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-[#06080f] p-6 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="mb-4">{cap.icon}</div>
                    <h4 className="font-display text-sm font-semibold text-white mb-2">{cap.title}</h4>
                    <p className="text-white/50 text-xs leading-relaxed">{cap.desc}</p>
                  </motion.div>
                ))}
              </div>

            </div>
          </motion.div>

          {/* Bottom border */}
          <div className="border-t border-white/[0.07]" />

        </div>
      </div>
    </section>
  );
}
