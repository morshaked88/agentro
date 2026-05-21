'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useI18n } from '@/context/i18n'

function AIIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-blue-400">
      <rect x="3" y="3" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <rect x="16" y="3" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <rect x="3" y="16" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <rect x="16" y="16" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="14" cy="14" r="2.5" fill="currentColor" />
      <line x1="12" y1="7.5" x2="16" y2="7.5" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
      <line x1="7.5" y1="12" x2="7.5" y2="16" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
      <line x1="20.5" y1="12" x2="20.5" y2="16" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
      <line x1="12" y1="20.5" x2="16" y2="20.5" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
    </svg>
  )
}

function WebIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-amber-400">
      <rect x="2.5" y="5" width="23" height="18" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <line x1="2.5" y1="11" x2="25.5" y2="11" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="7" cy="8" r="1.2" fill="currentColor" />
      <circle cx="11" cy="8" r="1.2" fill="currentColor" />
      <rect x="6" y="14.5" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.2" />
      <line x1="17" y1="15.5" x2="22" y2="15.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="17" y1="18.5" x2="20" y2="18.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

type Accent = 'blue' | 'amber'

function ServiceCard({
  icon,
  title,
  desc,
  bullets,
  accent,
  delay,
}: {
  icon: React.ReactNode
  title: string
  desc: string
  bullets: string[]
  accent: Accent
  delay: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const glowClass =
    accent === 'blue'
      ? 'hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.12)]'
      : 'hover:border-amber-500/40 hover:shadow-[0_0_50px_rgba(245,158,11,0.12)]'
  const iconBg = accent === 'blue' ? 'bg-blue-500/10 border-blue-500/20' : 'bg-amber-500/10 border-amber-500/20'
  const bulletColor = accent === 'blue' ? 'text-blue-400' : 'text-amber-400'
  const bulletGlow = accent === 'blue' ? 'bg-blue-400' : 'bg-amber-400'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 55 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.22 } }}
      className={`group relative bg-white/[0.07] border border-white/[0.15] rounded-2xl p-8 cursor-default
        transition-all duration-300 ${glowClass}`}
    >
      {/* Subtle inner glow */}
      <div
        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400
          ${accent === 'blue' ? 'bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(59,130,246,0.06),transparent)]' : 'bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(245,158,11,0.06),transparent)]'}`}
      />

      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 4 }}
        transition={{ duration: 0.2 }}
        className={`relative w-14 h-14 rounded-xl border flex items-center justify-center mb-6 ${iconBg}`}
      >
        {icon}
      </motion.div>

      <h3 className="relative font-display text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="relative text-gray-200 text-sm leading-relaxed mb-6">{desc}</p>

      <ul className="relative space-y-3">
        {bullets.map((bullet, i) => (
          <li key={i} className={`flex items-start gap-3 text-sm text-gray-300`}>
            <span className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${bulletGlow}`} />
            {bullet}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export function Services() {
  const { t, dir } = useI18n()
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  const aiService = {
    title: t('services.ai.title') as string,
    desc: t('services.ai.desc') as string,
    bullets: t('services.ai.bullets') as string[],
  }
  const webService = {
    title: t('services.web.title') as string,
    desc: t('services.web.desc') as string,
    bullets: t('services.web.bullets') as string[],
  }

  return (
    <section id="services" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-blue-500 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            {dir === 'rtl' ? 'שירותים' : 'Services'}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-white inline-block relative"
          >
            {t('services.title') as string}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={titleInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-2 inset-x-0 h-0.5 bg-gradient-to-r from-blue-500 via-blue-400 to-amber-500 origin-left block"
            />
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <ServiceCard
            icon={<AIIcon />}
            title={aiService.title}
            desc={aiService.desc}
            bullets={aiService.bullets}
            accent="blue"
            delay={0.05}
          />
          <ServiceCard
            icon={<WebIcon />}
            title={webService.title}
            desc={webService.desc}
            bullets={webService.bullets}
            accent="amber"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  )
}
