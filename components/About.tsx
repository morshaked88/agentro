'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useI18n } from '@/context/i18n'

function AIFirstIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-indigo-400 flex-shrink-0">
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity=".7" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function StackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-amber-400 flex-shrink-0">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 12l10 5 10-5M2 17l10 5 10-5"
        stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SpeedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-indigo-400 flex-shrink-0">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-amber-400 flex-shrink-0">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

const VALUE_ICONS = [<AIFirstIcon key="ai" />, <StackIcon key="stack" />, <SpeedIcon key="speed" />, <EyeIcon key="eye" />]

export function About() {
  const { t, dir } = useI18n()
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-60px' })
  const isRTL = dir === 'rtl'

  const values = [
    { title: t('about.val1_title') as string, desc: t('about.val1_desc') as string },
    { title: t('about.val2_title') as string, desc: t('about.val2_desc') as string },
    { title: t('about.val3_title') as string, desc: t('about.val3_desc') as string },
    { title: t('about.val4_title') as string, desc: t('about.val4_desc') as string },
  ]

  return (
    <section
      id="about"
      className="relative py-28 overflow-hidden"
      style={{ background: '#06080f' }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Amber glow right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 100% 50%, rgba(245,158,11,0.06), transparent)',
        }}
      />
      {/* Indigo glow left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 45% 45% at 0% 50%, rgba(99,102,241,0.07), transparent)',
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
            <span className="text-amber-400/60 text-xs tracking-[0.22em]">/ 02</span>
            <div className="h-px w-10 bg-gradient-to-r from-amber-500/40 to-transparent" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {t('about.title') as string}
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">

          {/* Left: prose + vision */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/70 text-base leading-relaxed mb-8"
            >
              {t('about.text') as string}
            </motion.p>

            {/* Experience stat */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="inline-flex items-center gap-4 border border-indigo-500/[0.18] bg-indigo-500/[0.05] rounded-2xl px-6 py-4 mb-8"
            >
              <span className="font-display text-4xl font-bold text-indigo-400">
                {t('about.exp_val') as string}
              </span>
              <span className="text-white/65 text-sm leading-snug max-w-[140px]">
                {t('about.exp_lbl') as string}
              </span>
            </motion.div>

            {/* Vision pull-quote */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.25 }}
              className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <div className="w-[2px] flex-shrink-0 rounded-full bg-gradient-to-b from-indigo-500 to-amber-500" />
              <div>
                <p className="text-white/55 text-[10px] uppercase tracking-[0.22em] mb-2">
                  {isRTL ? 'החזון שלנו' : 'Our Vision'}
                </p>
                <p className="text-white/70 text-sm md:text-base leading-relaxed italic">
                  "{t('about.vision') as string}"
                </p>
              </div>
            </motion.div>

            {/* Decorative orbit rings */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="hidden md:block relative w-28 h-28 mt-12 opacity-25"
            >
              <motion.div
                className="absolute inset-0 rounded-full border border-indigo-500/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-400" />
              </motion.div>
              <motion.div
                className="absolute inset-5 rounded-full border border-amber-500/40"
                animate={{ rotate: -360 }}
                transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-400" />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-indigo-500/50 border border-indigo-500/60" />
              </div>
            </motion.div>
          </div>

          {/* Right: 2x2 value cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-2xl border p-6 transition-all duration-200 cursor-default
                  ${i % 2 === 0
                    ? 'border-indigo-500/[0.12] bg-indigo-500/[0.03] hover:border-indigo-500/[0.22] hover:bg-indigo-500/[0.06]'
                    : 'border-amber-500/[0.12] bg-amber-500/[0.03] hover:border-amber-500/[0.22] hover:bg-amber-500/[0.06]'
                  }`}
              >
                <div className="mb-3">{VALUE_ICONS[i]}</div>
                <h3 className="font-display text-sm font-bold text-white mb-2">{v.title}</h3>
                <p className="text-white/65 text-xs leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
