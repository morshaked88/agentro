'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useI18n } from '@/context/i18n'
import { MovingBorderCard } from '@/components/MovingBorderCard'

function AIFirstIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-blue-400 flex-shrink-0">
      <circle cx="10" cy="10" r="3" fill="currentColor" opacity=".8" />
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4"
        stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function StackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-amber-400 flex-shrink-0">
      <path d="M10 2L2 6l8 4 8-4-8-4zM2 10l8 4 8-4M2 14l8 4 8-4"
        stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SpeedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-blue-400 flex-shrink-0">
      <path d="M10 3a7 7 0 1 0 4.95 11.95" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M10 10l3-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-amber-400 flex-shrink-0">
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
  const headInView = useInView(headRef, { once: false, margin: '-60px' })
  const bodyInView = useInView(bodyRef, { once: false, margin: '-60px' })

  const values = [
    { title: t('about.val1_title') as string, desc: t('about.val1_desc') as string },
    { title: t('about.val2_title') as string, desc: t('about.val2_desc') as string },
    { title: t('about.val3_title') as string, desc: t('about.val3_desc') as string },
    { title: t('about.val4_title') as string, desc: t('about.val4_desc') as string },
  ]

  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center py-24 overflow-hidden">
      {/* Video overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/70 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(59,130,246,0.05),transparent)] pointer-events-none" />

      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full" dir={dir}>
        <div className="bg-black/50 backdrop-blur-md rounded-2xl px-8 py-10 lg:px-12 border border-white/[0.07]">

        {/* Section marker + title row */}
        <div ref={headRef}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="text-amber-400/80 text-xs font-mono tracking-widest">/ 03</span>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 to-transparent" />
          </motion.div>

          <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start mb-12">
            {/* Left: prose */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={headInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="font-display text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6"
              >
                {t('about.title') as string}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={headInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/80 text-base leading-relaxed mb-8"
              >
                {t('about.text') as string}
              </motion.p>

              {/* Vision quote — shift5.io pull-quote style */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={headInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.35 }}
                className={`flex gap-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
              >
                <div className="w-[2px] flex-shrink-0 rounded-full bg-gradient-to-b from-blue-500 to-amber-500" />
                <div>
                  <p className="text-white/60 text-[10px] uppercase tracking-[0.2em] font-mono mb-2">
                    {dir === 'rtl' ? 'החזון שלנו' : 'Our Vision'}
                  </p>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed italic">
                    "{t('about.vision') as string}"
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right: 2×2 Moving Border value cards */}
            <div ref={bodyRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 32 }}
                  animate={bodyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <MovingBorderCard
                    accent={i % 2 === 0 ? 'blue' : 'amber'}
                    duration={7 + i * 1.5}
                    innerClassName="p-5"
                  >
                    <div className="mb-3">{VALUE_ICONS[i]}</div>
                    <h3 className="font-display text-sm font-bold text-white mb-2">{v.title}</h3>
                    <p className="text-white/75 text-xs leading-relaxed">{v.desc}</p>
                  </MovingBorderCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        </div>{/* end dark panel */}

      </div>
    </section>
  )
}
