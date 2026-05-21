"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/context/i18n";
import { MovingBorderCard } from "@/components/MovingBorderCard";

/* ─── Icons ────────────────────────────────────────────── */

function LLMIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      className="flex-shrink-0"
    >
      <circle cx="10" cy="10" r="3" fill="currentColor" opacity=".8" />
      <circle cx="3" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="17" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="3" cy="15" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="17" cy="15" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <line
        x1="5"
        y1="5.5"
        x2="8"
        y2="8.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="1.5 1.5"
      />
      <line
        x1="15"
        y1="5.5"
        x2="12"
        y2="8.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="1.5 1.5"
      />
      <line
        x1="5"
        y1="14.5"
        x2="8"
        y2="11.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="1.5 1.5"
      />
      <line
        x1="15"
        y1="14.5"
        x2="12"
        y2="11.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="1.5 1.5"
      />
    </svg>
  );
}

function AutoIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      className="flex-shrink-0"
    >
      <path
        d="M10 2v3M10 15v3M2 10h3M15 10h3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function ToolIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      className="flex-shrink-0"
    >
      <path
        d="M13 3a4 4 0 0 1 0 8H7a4 4 0 0 0 0 8 4 4 0 0 0 4-4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SaaSIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      className="flex-shrink-0"
    >
      <rect
        x="2"
        y="3"
        width="16"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <line
        x1="2"
        y1="8"
        x2="18"
        y2="8"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <circle cx="5.5" cy="5.5" r="1" fill="currentColor" />
      <circle cx="8.5" cy="5.5" r="1" fill="currentColor" />
    </svg>
  );
}

function DesignIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      className="flex-shrink-0"
    >
      <rect
        x="2"
        y="2"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <rect
        x="11"
        y="2"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <rect
        x="2"
        y="11"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <circle
        cx="14.5"
        cy="14.5"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

function BackendIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      className="flex-shrink-0"
    >
      <path
        d="M3 5h14M3 10h14M3 15h14"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <rect
        x="1"
        y="2"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

const capIcons: Record<string, React.ReactNode> = {
  ai1: <LLMIcon />,
  ai2: <AutoIcon />,
  ai3: <ToolIcon />,
  web1: <SaaSIcon />,
  web2: <DesignIcon />,
  web3: <BackendIcon />,
};

/* ─── Tech stack ─────────────────────────────────────────── */
const TECH_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Tailwind",
  "PostgreSQL",
];

/* ─── Props ──────────────────────────────────────────────── */
interface Props {
  id: "services-ai" | "services-web";
  phase: "01" | "02";
  accent: "blue" | "amber";
  align?: "left" | "right";
}

export function ServiceSection({ id, phase, accent, align = "left" }: Props) {
  const { t, dir } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  const isAI = id === "services-ai";
  const isBlue = accent === "blue";
  const accentText = isBlue ? "text-blue-400" : "text-amber-400";
  const accentDivider = isBlue ? "from-blue-500/50" : "from-amber-500/50";

  const base = isAI ? "services.ai" : "services.web";

  const caps = [
    {
      icon: capIcons[isAI ? "ai1" : "web1"],
      title: t(`${base}.cap1_title`) as string,
      desc: t(`${base}.cap1_desc`) as string,
    },
    {
      icon: capIcons[isAI ? "ai2" : "web2"],
      title: t(`${base}.cap2_title`) as string,
      desc: t(`${base}.cap2_desc`) as string,
    },
    {
      icon: capIcons[isAI ? "ai3" : "web3"],
      title: t(`${base}.cap3_title`) as string,
      desc: t(`${base}.cap3_desc`) as string,
    },
  ];

  const stats = [
    {
      val: t(`${base}.stat1_val`) as string,
      lbl: t(`${base}.stat1_lbl`) as string,
    },
    {
      val: t(`${base}.stat2_val`) as string,
      lbl: t(`${base}.stat2_lbl`) as string,
    },
    {
      val: t(`${base}.stat3_val`) as string,
      lbl: t(`${base}.stat3_lbl`) as string,
    },
  ];

  /* ── Editorial content column ── */
  const contentCol = (
    <motion.div
      initial={{ opacity: 0, x: align === "right" ? 40 : -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      dir={dir}
    >
      {/* Section marker — shift5.io style */}
      <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
        <span className={`${accentText} text-xs font-mono tracking-widest`}>
          / {phase}
        </span>
        <div
          className={`flex-1 h-px bg-gradient-to-r ${accentDivider} to-transparent`}
        />
      </div>

      {/* Title */}
      <h2
        className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5
        drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)] text-center md:text-start"
      >
        {t(`${base}.title`) as string}
      </h2>

      {/* Text scrim — gives description + stats a reliable dark backing */}
      <div className="bg-black/45 backdrop-blur-sm rounded-xl p-5 border border-white/[0.07] mt-1 text-center md:text-start">
        {/* Description */}
        <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6 max-w-md mx-auto md:mx-0">
          {t(`${base}.desc`) as string}
        </p>

        {/* Thin divider */}
        <div
          className={`h-px bg-gradient-to-r ${accentDivider} to-transparent mb-6`}
        />

        {/* Stats — large editorial numbers */}
        <div className="flex items-start gap-0">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 + i * 0.1, duration: 0.5 }}
              className={`flex-1 text-center ${i > 0 ? `border-l ${isBlue ? "border-blue-500/20" : "border-amber-500/20"}` : ""}`}
            >
              <p
                className={`font-display text-lg md:text-3xl font-extrabold ${accentText} leading-none mb-1`}
              >
                {s.val}
              </p>
              <p className="text-white/85 text-[11px] uppercase tracking-wider font-mono">
                {s.lbl}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  /* ── Visual column: Moving Border capability cards ── */
  const visualCol = (
    <div className="flex flex-col gap-3">
      {/* Moving Border capability cards */}
      {caps.map((cap, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: align === "right" ? -30 : 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: 0.15 + i * 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <MovingBorderCard
            accent={isBlue ? "blue" : "amber"}
            duration={6 + i}
            innerClassName="p-5"
          >
            <div className="flex items-start gap-4">
              <div className={`mt-0.5 ${accentText} flex-shrink-0`}>
                {cap.icon}
              </div>
              <div>
                <p className="text-white text-sm font-semibold mb-1">
                  {cap.title}
                </p>
                <p className="text-white/75 text-xs leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            </div>
          </MovingBorderCard>
        </motion.div>
      ))}

      {/* Bottom decoration */}
      {isAI ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="rounded-xl border border-blue-500/20 bg-blue-500/[0.05] p-5 mt-1"
        >
          <svg viewBox="0 0 240 60" className="w-full opacity-35" fill="none">
            {(
              [
                [20, 30],
                [70, 10],
                [70, 30],
                [70, 50],
                [150, 10],
                [150, 30],
                [150, 50],
                [220, 30],
              ] as [number, number][]
            ).map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="4" fill="#3b82f6" opacity=".8" />
            ))}
            {(
              [
                [20, 30, 70, 10],
                [20, 30, 70, 30],
                [20, 30, 70, 50],
                [70, 10, 150, 10],
                [70, 10, 150, 30],
                [70, 30, 150, 30],
                [70, 50, 150, 30],
                [70, 50, 150, 50],
                [150, 10, 220, 30],
                [150, 30, 220, 30],
                [150, 50, 220, 30],
              ] as [number, number, number, number][]
            ).map(([x1, y1, x2, y2], i) => (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#3b82f6"
                strokeWidth=".8"
                opacity=".3"
              />
            ))}
          </svg>
          <p className="text-blue-400/50 text-[9px] text-center tracking-[0.2em] uppercase mt-2 font-mono">
            Neural Processing Pipeline
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="grid grid-cols-3 gap-2 mt-1"
        >
          {TECH_STACK.map((tech) => (
            <div
              key={tech}
              className="border border-amber-500/20 bg-amber-500/[0.04] rounded-lg py-2 px-1
                text-center text-white/80 text-[11px] font-mono"
            >
              {tech}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );

  return (
    <section
      id={id}
      className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden"
    >
      {/* Video overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/60 pointer-events-none" />
      <div
        className={`absolute inset-0 pointer-events-none ${
          isBlue
            ? "bg-[radial-gradient(ellipse_55%_45%_at_65%_40%,rgba(59,130,246,0.08),transparent)]"
            : "bg-[radial-gradient(ellipse_55%_45%_at_35%_60%,rgba(245,158,11,0.07),transparent)]"
        }`}
      />

      {/* Watermark phase number */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className={`font-display font-black text-[22rem] leading-none ${
            isBlue ? "text-blue-500/[0.03]" : "text-amber-500/[0.03]"
          }`}
        >
          {phase}
        </span>
      </div>

      <div
        ref={ref}
        className="relative z-10 max-w-6xl mx-auto px-6 w-full"
        dir={dir}
      >
        <div
          className={`grid md:grid-cols-2 gap-10 lg:gap-16 items-center
          bg-black/50 backdrop-blur-md rounded-2xl px-8 py-10 lg:px-12 border border-white/[0.07]
          ${align === "right" ? "md:[&>*:first-child]:order-2" : ""}`}
        >
          {contentCol}
          {visualCol}
        </div>
      </div>
    </section>
  );
}
