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

  const bigStats = [
    { val: t('about.exp_val') as string, lbl: t('about.exp_lbl') as string },
    { val: '100%', lbl: isRTL ? 'בניה מותאמת' : 'Custom-Built' },
    { val: '24/7', lbl: isRTL ? 'זמינות מלאה' : 'Availability' },
    { val: '∞', lbl: isRTL ? 'ניתן להרחבה' : 'Scalable' },
  ]

  return (
    <section
      id="about"
      className="relative py-28 overflow-hidden"
      style={{ background: '#06080f' }}
    >
      {/* Amber glow right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 60% at 100% 50%, rgba(245,158,11,0.05), transparent)',
        }}
      />
      {/* Indigo glow left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 40% 50% at 0% 60%, rgba(99,102,241,0.05), transparent)',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6" dir={dir}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-amber-400/60 text-xs tracking-[0.22em]">/ 02</span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-amber-500/40 to-transparent" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            {t('about.title') as string}
          </h2>
          <p className="text-lg leading-relaxed text-white/65 max-w-3xl">
            {t('about.text') as string}
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="border-t border-b border-white/[0.07] py-10 my-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4">
            {bigStats.map((s, i) => (
              <div
                key={i}
                className={`px-6 ${i === 0 ? 'ps-0' : ''} ${i === bigStats.length - 1 ? 'pe-0' : ''} ${i > 0 ? 'border-s border-white/[0.07]' : ''} py-4 md:py-0`}
              >
                <p className="font-display text-4xl md:text-5xl font-bold text-white mb-1">{s.val}</p>
                <p className="text-white/45 text-xs">{s.lbl}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Values grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.05] rounded-2xl overflow-hidden"
        >
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.25 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#06080f] p-8 group hover:bg-white/[0.02] cursor-default transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="mt-0.5">{VALUE_ICONS[i]}</div>
                <div>
                  <p className="text-white/20 text-xs mb-2">0{i + 1}</p>
                  <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors mb-2">
                    {v.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Vision quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-12 pt-10 border-t border-white/[0.06]"
        >
          <p className="text-white/35 text-xs tracking-[0.22em] uppercase mb-3">
            {isRTL ? 'החזון שלנו' : 'Our Vision'}
          </p>
          <p className="text-white/55 text-lg italic max-w-3xl leading-relaxed">
            "{t('about.vision') as string}"
          </p>
        </motion.div>

      </div>
    </section>
  )
}
