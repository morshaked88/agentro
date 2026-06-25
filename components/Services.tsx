"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/context/i18n";

/* ── Icons ─────────────────────────────────────────────── */

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

/* ── Neural viz ─────────────────────────────────────────── */

function NeuralViz() {
  const nodes: [number, number][] = [
    [20, 30], [70, 10], [70, 30], [70, 50],
    [130, 10], [130, 30], [130, 50], [180, 30],
  ];
  const edges: [number, number, number, number][] = [
    [20, 30, 70, 10], [20, 30, 70, 30], [20, 30, 70, 50],
    [70, 10, 130, 10], [70, 10, 130, 30], [70, 30, 130, 30],
    [70, 50, 130, 30], [70, 50, 130, 50], [130, 10, 180, 30],
    [130, 30, 180, 30], [130, 50, 180, 30],
  ];
  return (
    <svg viewBox="0 0 200 60" className="w-full max-w-[200px] mx-auto opacity-25" fill="none">
      {edges.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6366f1" strokeWidth="0.8" opacity="0.6" />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="#6366f1" opacity="0.9" />
      ))}
    </svg>
  );
}

/* ── Card components ───────────────────────────────────── */

interface FeatureCardProps {
  accent: "indigo" | "amber";
  eyebrow: string;
  title: string;
  description: string;
  stats: { val: string; lbl: string }[];
  icon: React.ReactNode;
  inView: boolean;
  delay?: number;
  className?: string;
}

function FeatureCard({
  accent, eyebrow, title, description, stats, icon, inView, delay = 0, className = "",
}: FeatureCardProps) {
  const isIndigo = accent === "indigo";
  const accentText = isIndigo ? "text-indigo-400" : "text-amber-400";
  const border = isIndigo ? "border-indigo-500/[0.18]" : "border-amber-500/[0.18]";
  const bg = isIndigo ? "bg-indigo-500/[0.04]" : "bg-amber-500/[0.04]";
  const glow = isIndigo
    ? "radial-gradient(ellipse 65% 55% at 0% 0%, rgba(99,102,241,0.12), transparent)"
    : "radial-gradient(ellipse 65% 55% at 0% 0%, rgba(245,158,11,0.10), transparent)";
  const divider = isIndigo ? "from-indigo-500/30" : "from-amber-500/30";
  const statBorder = isIndigo ? "border-indigo-500/[0.14]" : "border-amber-500/[0.14]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-2xl border ${border} ${bg} p-7 flex flex-col justify-between min-h-[240px] ${className}`}
    >
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: glow }} />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-5">
          <div className={accentText}>{icon}</div>
          <span className={`text-[10px] tracking-[0.2em] uppercase ${accentText} opacity-65`}>
            {eyebrow}
          </span>
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
          {title}
        </h3>
        <p className="text-white/65 text-sm leading-relaxed max-w-md">{description}</p>
      </div>

      <div className="relative z-10 mt-6">
        <div className={`h-px bg-gradient-to-r ${divider} to-transparent mb-5`} />
        <div className="flex items-center">
          {stats.map((s, i) => (
            <div key={i} className={`flex-1 text-center ${i > 0 ? `border-l ${statBorder}` : ""}`}>
              <p className={`font-display text-xl font-bold ${accentText}`}>{s.val}</p>
              <p className="text-white text-[10px] uppercase tracking-wider mt-0.5">{s.lbl}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface BentoCardProps {
  accent: "indigo" | "amber";
  icon: React.ReactNode;
  title: string;
  description: string;
  inView: boolean;
  delay?: number;
  className?: string;
}

function BentoCard({ accent, icon, title, description, inView, delay = 0, className = "" }: BentoCardProps) {
  const isIndigo = accent === "indigo";
  const accentText = isIndigo ? "text-indigo-400" : "text-amber-400";
  const border = isIndigo ? "border-indigo-500/[0.10]" : "border-amber-500/[0.10]";
  const hoverBorder = isIndigo ? "hover:border-indigo-500/[0.25]" : "hover:border-amber-500/[0.25]";
  const hoverBg = isIndigo ? "hover:bg-indigo-500/[0.06]" : "hover:bg-amber-500/[0.06]";
  const iconBg = isIndigo ? "bg-indigo-500/[0.10]" : "bg-amber-500/[0.08]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-2xl border ${border} bg-white/[0.02] ${hoverBorder} ${hoverBg}
        p-6 flex flex-col gap-4 transition-all duration-200 cursor-default ${className}`}
    >
      <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0 ${accentText}`}>
        {icon}
      </div>
      <div>
        <h4 className="font-display text-base font-semibold text-white mb-1.5">{title}</h4>
        <p className="text-white/65 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

/* ── Main export ───────────────────────────────────────── */

export function Services() {
  const { t, dir } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  const isRTL = dir === "rtl";

  const TECH = ["Next.js", "React", "TypeScript", "Node.js", "Tailwind", "PostgreSQL"];

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

  return (
    <section
      id="services"
      className="relative py-28 overflow-hidden"
      style={{ background: "#06080f" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 70% 20%, rgba(99,102,241,0.09), transparent)",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6" dir={dir}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="text-indigo-400/60 text-xs tracking-[0.22em]">/ 01</span>
            <div className="h-px w-10 bg-gradient-to-r from-indigo-500/40 to-transparent" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {isRTL ? "מה אנחנו בונים" : "What We Build"}
          </h2>
          <p className="text-white/60 text-base max-w-md mx-auto leading-relaxed">
            {isRTL
              ? "שני תחומי מומחיות. יכולות אמיתיות. שותף אחד."
              : "Two areas of expertise. Real capabilities. One partner."}
          </p>
        </motion.div>

        <div className="space-y-3">

          {/* AI ROW 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <FeatureCard
              className="md:col-span-2"
              accent="indigo"
              eyebrow={isRTL ? "בינה מלאכותית" : "Artificial Intelligence"}
              title={t("services.ai.title") as string}
              description={t("services.ai.desc") as string}
              stats={aiStats}
              icon={<BrainIcon />}
              inView={inView}
              delay={0}
            />
            <BentoCard
              accent="indigo"
              icon={<AgentIcon />}
              title={t("services.ai.cap1_title") as string}
              description={t("services.ai.cap1_desc") as string}
              inView={inView}
              delay={0.1}
            />
          </div>

          {/* AI ROW 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <BentoCard
              accent="indigo"
              icon={<AutoIcon />}
              title={t("services.ai.cap2_title") as string}
              description={t("services.ai.cap2_desc") as string}
              inView={inView}
              delay={0.15}
            />
            <BentoCard
              accent="indigo"
              icon={<LLMIcon />}
              title={t("services.ai.cap3_title") as string}
              description={t("services.ai.cap3_desc") as string}
              inView={inView}
              delay={0.2}
            />
            {/* Neural decoration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="rounded-2xl border border-indigo-500/[0.10] bg-indigo-500/[0.03] p-6
                flex flex-col items-center justify-center gap-4 min-h-[160px]"
            >
              <NeuralViz />
              <p className="text-white text-[9px] uppercase tracking-[0.24em] text-center">
                {isRTL ? "עיבוד נוירוני" : "Neural Processing"}
              </p>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent my-1" />

          {/* WEB ROW 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <FeatureCard
              className="md:col-span-2"
              accent="amber"
              eyebrow={isRTL ? "פיתוח תוכנה" : "Software Development"}
              title={t("services.web.title") as string}
              description={t("services.web.desc") as string}
              stats={webStats}
              icon={<WebIcon />}
              inView={inView}
              delay={0.05}
            />
            <BentoCard
              accent="amber"
              icon={<SaaSIcon />}
              title={t("services.web.cap1_title") as string}
              description={t("services.web.cap1_desc") as string}
              inView={inView}
              delay={0.15}
            />
          </div>

          {/* WEB ROW 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <BentoCard
              accent="amber"
              icon={<DesignIcon />}
              title={t("services.web.cap2_title") as string}
              description={t("services.web.cap2_desc") as string}
              inView={inView}
              delay={0.2}
            />
            <BentoCard
              accent="amber"
              icon={<BackendIcon />}
              title={t("services.web.cap3_title") as string}
              description={t("services.web.cap3_desc") as string}
              inView={inView}
              delay={0.25}
            />
            {/* Tech stack decoration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-2xl border border-amber-500/[0.10] bg-amber-500/[0.03] p-5
                flex flex-col justify-center gap-3"
            >
              <p className="text-amber-400/65 text-[9px] uppercase tracking-[0.24em] text-center mb-1">
                {isRTL ? "טכנולוגיות" : "Tech Stack"}
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {TECH.map((tech) => (
                  <div
                    key={tech}
                    className="border border-amber-500/[0.08] bg-amber-500/[0.03] rounded-lg
                      py-1.5 px-1 text-center text-white/65 text-[11px]"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
