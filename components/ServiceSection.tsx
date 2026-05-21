'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useI18n } from '@/context/i18n'

/* ─── Icons ─────────────────────────────────────────────────────────── */

function BrainIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-blue-400">
      <path d="M14 4C10 4 7 7 7 11c0 1.5.5 3 1.3 4.1C7.1 15.7 7 16.3 7 17c0 2.2 1.8 4 4 4h6c2.2 0 4-1.8 4-4 0-.7-.1-1.3-.3-1.9.8-1.1 1.3-2.6 1.3-4.1 0-4-3-7-8-7z"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 15.5c0 0 1 1.5 4 1.5s4-1.5 4-1.5M10 11h.01M18 11h.01M14 4v3"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function CodeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-amber-400">
      <polyline points="9,8 4,14 9,20" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="19,8 24,14 19,20" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
      <line x1="16" y1="5" x2="12" y2="23" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" />
    </svg>
  )
}

/* Capability icons */
function LLMIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
      <circle cx="10" cy="10" r="3" fill="currentColor" opacity=".7" />
      <circle cx="3" cy="5" r="2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="17" cy="5" r="2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="3" cy="15" r="2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="17" cy="15" r="2" stroke="currentColor" strokeWidth="1.2" />
      <line x1="5" y1="5.5" x2="8" y2="8.5" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
      <line x1="15" y1="5.5" x2="12" y2="8.5" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
      <line x1="5" y1="14.5" x2="8" y2="11.5" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
      <line x1="15" y1="14.5" x2="12" y2="11.5" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
    </svg>
  )
}

function AutoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
      <path d="M10 2v4M10 14v4M2 10h4M14 10h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5.5 5.5l2.1 2.1M12.4 12.4l2.1 2.1M14.5 5.5l-2.1 2.1M7.6 12.4l-2.1 2.1"
        stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function ToolIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
      <path d="M13 3a4 4 0 0 1 0 8H7a4 4 0 0 0 0 8 4 4 0 0 0 4-4"
        stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SaaSIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
      <rect x="2" y="3" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <line x1="2" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="5.5" cy="5.5" r="1" fill="currentColor" />
      <circle cx="8.5" cy="5.5" r="1" fill="currentColor" />
    </svg>
  )
}

function LandingIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
      <path d="M10 3v10M6 9l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 15h14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function StoreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
      <path d="M3 3h2l2.4 7.59a1 1 0 0 0 .96.71h7.28a1 1 0 0 0 .96-.71L18 7H6"
        stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="17" r="1.2" fill="currentColor" />
      <circle cx="15" cy="17" r="1.2" fill="currentColor" />
    </svg>
  )
}

const capIcons: Record<string, React.ReactNode> = {
  ai1: <LLMIcon />,
  ai2: <AutoIcon />,
  ai3: <ToolIcon />,
  web1: <SaaSIcon />,
  web2: <LandingIcon />,
  web3: <StoreIcon />,
}

/* ─── Tech stack SVG badge ───────────────────────────────────────────── */

const TECH_STACK = ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Node.js', 'PostgreSQL']

function TechGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {TECH_STACK.map((tech) => (
        <div
          key={tech}
          className="bg-white/[0.09] border border-white/20 rounded-lg px-2 py-2.5
            flex items-center justify-center text-center"
        >
          <span className="text-white/85 text-xs font-mono font-medium leading-tight">{tech}</span>
        </div>
      ))}
    </div>
  )
}

/* ─── Browser frame illustration ─────────────────────────────────────── */

function BrowserMockup() {
  return (
    <div className="rounded-xl border border-white/20 bg-white/[0.06] backdrop-blur-sm overflow-hidden">
      {/* Browser chrome */}
      <div className="bg-white/[0.08] border-b border-white/15 px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 mx-3 bg-white/[0.06] rounded-md px-3 py-1">
          <span className="text-white/30 text-[10px] font-mono">agento.co.il</span>
        </div>
      </div>
      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="h-2.5 w-3/4 bg-white/10 rounded-full" />
        <div className="h-2 w-full bg-white/[0.06] rounded-full" />
        <div className="h-2 w-5/6 bg-white/[0.06] rounded-full" />
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="h-16 bg-amber-500/10 border border-amber-500/20 rounded-lg" />
          <div className="h-16 bg-blue-500/10 border border-blue-500/20 rounded-lg" />
        </div>
        <div className="h-2 w-2/3 bg-white/[0.06] rounded-full" />
        <div className="h-7 w-1/3 bg-amber-500/30 rounded-lg" />
      </div>
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────────────────── */

interface ServiceSectionProps {
  id: 'services-ai' | 'services-web'
  phase: '01' | '02'
  accent: 'blue' | 'amber'
  align?: 'left' | 'right'
}

export function ServiceSection({ id, phase, accent, align = 'left' }: ServiceSectionProps) {
  const { t, dir } = useI18n()
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-100px' })

  const isAI = id === 'services-ai'
  const isBlue = accent === 'blue'

  const accentText = isBlue ? 'text-blue-400' : 'text-amber-400'
  const accentBorder = isBlue ? 'border-blue-500/30' : 'border-amber-500/30'
  const accentBg = isBlue ? 'bg-blue-500/10' : 'bg-amber-500/10'
  const accentGlow = isBlue
    ? 'shadow-[0_0_40px_rgba(59,130,246,0.12)]'
    : 'shadow-[0_0_40px_rgba(245,158,11,0.12)]'
  const capIconColor = isBlue ? 'text-blue-400' : 'text-amber-400'
  const capBorderAccent = isBlue ? 'border-l-blue-500/50' : 'border-l-amber-500/50'

  const base = isAI ? 'services.ai' : 'services.web'
  const caps = [
    { icon: capIcons[isAI ? 'ai1' : 'web1'], title: t(`${base}.cap1_title`) as string, desc: t(`${base}.cap1_desc`) as string },
    { icon: capIcons[isAI ? 'ai2' : 'web2'], title: t(`${base}.cap2_title`) as string, desc: t(`${base}.cap2_desc`) as string },
    { icon: capIcons[isAI ? 'ai3' : 'web3'], title: t(`${base}.cap3_title`) as string, desc: t(`${base}.cap3_desc`) as string },
  ]
  const stats = [
    { val: t(`${base}.stat1_val`) as string, lbl: t(`${base}.stat1_lbl`) as string },
    { val: t(`${base}.stat2_val`) as string, lbl: t(`${base}.stat2_lbl`) as string },
    { val: t(`${base}.stat3_val`) as string, lbl: t(`${base}.stat3_lbl`) as string },
  ]

  /* Flip column order for align="right" */
  const isFlipped = align === 'right'

  const contentCol = (
    <motion.div
      initial={{ opacity: 0, x: isFlipped ? 40 : -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`bg-white/[0.08] backdrop-blur-md border ${accentBorder} ${accentGlow}
        rounded-2xl p-8 md:p-10 flex flex-col gap-6`}
    >
      {/* Phase + icon row */}
      <div className="flex items-center justify-between">
        <span className={`${accentText} text-xs font-bold uppercase tracking-widest`}>
          {phase} — {dir === 'rtl' ? 'שירותים' : 'Services'}
        </span>
        <div className={`w-12 h-12 rounded-xl ${accentBg} border ${accentBorder}
          flex items-center justify-center`}>
          {isAI ? <BrainIcon /> : <CodeIcon />}
        </div>
      </div>

      {/* Title */}
      <div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
          {t(`${base}.title`) as string}
        </h2>
        <p className="text-gray-200 text-sm md:text-base leading-relaxed">
          {t(`${base}.desc`) as string}
        </p>
      </div>

      {/* Divider */}
      <div className={`h-px bg-gradient-to-r ${isBlue ? 'from-blue-500/40' : 'from-amber-500/40'} to-transparent`} />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.45 }}
            className={`${accentBg} border ${accentBorder} rounded-xl p-3 text-center`}
          >
            <p className={`font-display text-xl font-bold ${accentText} leading-none mb-1`}>{s.val}</p>
            <p className="text-gray-300 text-[10px] uppercase tracking-wider">{s.lbl}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )

  const visualCol = (
    <div className="flex flex-col gap-4">
      {/* Web section gets browser mockup on top */}
      {!isAI && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <BrowserMockup />
          <div className="mt-4">
            <TechGrid />
          </div>
        </motion.div>
      )}

      {/* Capability cards */}
      {caps.map((cap, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: isFlipped ? -30 : 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          className={`bg-white/[0.07] backdrop-blur-sm border border-white/[0.15]
            border-l-2 ${capBorderAccent} rounded-xl p-5 flex items-start gap-4
            hover:bg-white/[0.11] transition-all duration-200 group cursor-default`}
        >
          <div className={`mt-0.5 ${capIconColor}`}>{cap.icon}</div>
          <div>
            <p className="text-white text-sm font-semibold mb-1 group-hover:text-white transition-colors">
              {cap.title}
            </p>
            <p className="text-gray-300 text-xs leading-relaxed">{cap.desc}</p>
          </div>
        </motion.div>
      ))}

      {/* AI section: neural net decoration below caps */}
      {isAI && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="rounded-xl border border-blue-500/30 bg-blue-500/[0.08] p-5"
        >
          <svg viewBox="0 0 240 80" className="w-full opacity-40" fill="none">
            {/* Network nodes */}
            {[[20,40],[80,15],[80,40],[80,65],[160,15],[160,40],[160,65],[220,40]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="5" fill="#3b82f6" opacity=".7" />
            ))}
            {/* Connections */}
            {[[20,40,80,15],[20,40,80,40],[20,40,80,65],
              [80,15,160,15],[80,15,160,40],[80,40,160,40],
              [80,65,160,40],[80,65,160,65],
              [160,15,220,40],[160,40,220,40],[160,65,220,40]
            ].map(([x1,y1,x2,y2],i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#3b82f6" strokeWidth=".8" opacity=".35" />
            ))}
          </svg>
          <p className="text-blue-400/60 text-[10px] text-center tracking-widest uppercase mt-1">
            Neural Processing Pipeline
          </p>
        </motion.div>
      )}
    </div>
  )

  return (
    <section
      id={id}
      className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden"
    >
      {/* Video overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 pointer-events-none" />
      <div
        className={`absolute inset-0 pointer-events-none ${
          isBlue
            ? 'bg-[radial-gradient(ellipse_50%_40%_at_70%_30%,rgba(59,130,246,0.07),transparent)]'
            : 'bg-[radial-gradient(ellipse_50%_40%_at_30%_60%,rgba(245,158,11,0.07),transparent)]'
        }`}
      />

      {/* Faded watermark number */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className={`font-display font-black text-[20rem] leading-none ${
            isBlue ? 'text-blue-500/[0.04]' : 'text-amber-500/[0.04]'
          }`}
        >
          {phase}
        </span>
      </div>

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6 w-full" dir={dir}>
        {/* Two-column grid — flip order based on align prop */}
        <div className={`grid md:grid-cols-2 gap-8 lg:gap-12 ${isFlipped ? 'md:[&>*:first-child]:order-2' : ''}`}>
          {contentCol}
          {visualCol}
        </div>
      </div>
    </section>
  )
}
