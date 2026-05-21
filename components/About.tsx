'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useI18n } from '@/context/i18n'

function AIFirstIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-blue-400 flex-shrink-0">
      <circle cx="10" cy="10" r="3" fill="currentColor" opacity=".8" />
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4"
        stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function StackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-amber-400 flex-shrink-0">
      <path d="M10 2L2 6l8 4 8-4-8-4zM2 10l8 4 8-4M2 14l8 4 8-4"
        stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SpeedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-blue-400 flex-shrink-0">
      <path d="M10 3a7 7 0 1 0 4.95 11.95" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M10 10l3-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-amber-400 flex-shrink-0">
      <path d="M1 10s3-7 9-7 9 7 9 7-3 7-9 7-9-7-9-7z" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

const VALUE_ICONS = [<AIFirstIcon />, <StackIcon />, <SpeedIcon />, <EyeIcon />]

export function About() {
  const { t, dir } = useI18n()
  const headRef = useRef(null)
  const bodyRef = useRef(null)
  const headInView = useInView(headRef, { once: false, margin: '-80px' })
  const bodyInView = useInView(bodyRef, { once: false, margin: '-80px' })

  const values = [
    { title: t('about.val1_title') as string, desc: t('about.val1_desc') as string },
    { title: t('about.val2_title') as string, desc: t('about.val2_desc') as string },
    { title: t('about.val3_title') as string, desc: t('about.val3_desc') as string },
    { title: t('about.val4_title') as string, desc: t('about.val4_desc') as string },
  ]

  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center py-24">
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(59,130,246,0.05),transparent)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full" dir={dir}>

        {/* ── Header ─────────────────────────────────────────────── */}
        <div ref={headRef} className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            {dir === 'rtl' ? 'אודות' : 'About'}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 relative inline-block"
          >
            {t('about.title') as string}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={headInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.75, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-2 inset-x-0 h-0.5 bg-gradient-to-r from-amber-500 via-amber-400 to-blue-500 origin-left block"
            />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {t('about.text') as string}
          </motion.p>
        </div>

        {/* ── Values grid ─────────────────────────────────────────── */}
        <div ref={bodyRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }}
              animate={bodyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.18 } }}
              className="bg-white/[0.07] backdrop-blur-sm border border-white/[0.15]
                hover:border-white/25 hover:bg-white/[0.10] rounded-2xl p-6 cursor-default
                transition-all duration-200 group"
            >
              <div className="mb-4">{VALUE_ICONS[i]}</div>
              <h3 className="font-display text-base font-bold text-white mb-2 group-hover:text-white">
                {v.title}
              </h3>
              <p className="text-gray-300 text-xs leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Vision block ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={bodyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.45 }}
          className="relative bg-gradient-to-br from-blue-500/15 via-white/[0.06] to-amber-500/10
            border border-white/20 rounded-2xl p-8 md:p-10 overflow-hidden"
        >
          {/* Decorative corner sparks */}
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none"
            className={`absolute top-0 opacity-20 ${dir === 'rtl' ? 'left-0 scale-x-[-1]' : 'right-0'}`}
            aria-hidden>
            <path d="M40 0L44 36 80 40 44 44 40 80 36 44 0 40 36 36 40 0z"
              fill="url(#sg)" />
            <defs>
              <linearGradient id="sg" x1="0" y1="0" x2="80" y2="80">
                <stop stopColor="#3b82f6" /><stop offset="1" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
          </svg>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/30 to-amber-500/20
              border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="#f59e0b" strokeWidth="1.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                  strokeLinecap="round" strokeLinejoin="round" fill="#f59e0b" fillOpacity=".4" />
              </svg>
            </div>
            <div>
              <p className="text-white/60 text-[10px] uppercase tracking-widest font-semibold mb-2">
                {dir === 'rtl' ? 'החזון שלנו' : 'Our Vision'}
              </p>
              <p className="text-white/80 text-base md:text-lg leading-relaxed font-medium italic">
                "{t('about.vision') as string}"
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
