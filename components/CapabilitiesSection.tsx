'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useI18n } from '@/context/i18n'

const ease = [0.16, 1, 0.3, 1] as const

/* ── Small inline SVG icons ─────────────────────────── */
function IconAgents() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="3" fill="currentColor" opacity=".8" />
      <circle cx="3" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="17" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="3" cy="15" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="17" cy="15" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <line x1="5" y1="5.5" x2="8" y2="8.5" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
      <line x1="15" y1="5.5" x2="12" y2="8.5" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
      <line x1="5" y1="14.5" x2="8" y2="11.5" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
      <line x1="15" y1="14.5" x2="12" y2="11.5" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
    </svg>
  )
}

function IconAutomation() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M10 2v3M10 15v3M2 10h3M15 10h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

function IconLLM() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M13 3a4 4 0 0 1 0 8H7a4 4 0 0 0 0 8 4 4 0 0 0 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconSaaS() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="2" y="3" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <line x1="2" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="5.5" cy="5.5" r="1" fill="currentColor" />
      <circle cx="8.5" cy="5.5" r="1" fill="currentColor" />
    </svg>
  )
}

function IconDesign() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="14.5" cy="14.5" r="3.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

function IconBackend() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <rect x="1" y="2" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

/* ── Tile components ─────────────────────────────────── */

function BigTile({
  tag, title, desc, bullets, isAccent, delay,
}: {
  tag: string; title: string; desc: string; bullets: string[]
  isAccent?: boolean; delay: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease }}
      className="tile flex flex-col gap-4"
      style={isAccent ? {
        background: 'oklch(64% 0.22 262 / 0.06)',
        borderColor: 'oklch(64% 0.22 262 / 0.25)',
      } : {}}
    >
      <p className="text-[11px] font-semibold tracking-[0.12em] uppercase"
        style={{ color: 'var(--color-accent)' }}>
        {tag}
      </p>
      <h3 className="font-display font-bold leading-tight"
        style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: 'var(--color-ink)' }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-2)' }}>
        {desc}
      </p>
      <ul className="flex flex-col gap-2 mt-1">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--color-ink-2)' }}>
            <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--color-accent)' }} />
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function SmallTile({
  icon, title, desc, delay,
}: {
  icon: React.ReactNode; title: string; desc: string; delay: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay, ease }}
      className="tile flex flex-col gap-3"
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: 'oklch(64% 0.22 262 / 0.1)', color: 'var(--color-accent)' }}>
        {icon}
      </div>
      <h4 className="font-display font-semibold text-sm" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
        {title}
      </h4>
      <p className="text-xs leading-relaxed" style={{ color: 'var(--color-ink-2)' }}>
        {desc}
      </p>
    </motion.div>
  )
}

function StatsTile({ delay }: { delay: number }) {
  const { dir } = useI18n()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const items = [
    { val: '10×',  lbl: dir === 'rtl' ? 'מהירות תפוקה' : 'Faster Output' },
    { val: '24/7', lbl: dir === 'rtl' ? 'תמיד זמין'     : 'Always On'    },
    { val: '∞',    lbl: dir === 'rtl' ? 'ניתן להרחבה'   : 'Scalable'     },
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay, ease }}
      className="tile flex flex-col justify-between gap-4"
    >
      {items.map((s, i) => (
        <div key={i} className={i < items.length - 1 ? 'pb-4' : ''}
          style={i < items.length - 1 ? { borderBottom: '1px solid var(--color-rule)' } : {}}>
          <p className="font-display font-bold text-2xl tabular-nums mb-0.5"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>
            {s.val}
          </p>
          <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-ink-3)' }}>
            {s.lbl}
          </p>
        </div>
      ))}
    </motion.div>
  )
}

/* ── Section ─────────────────────────────────────────── */

export function CapabilitiesSection() {
  const { t, dir } = useI18n()

  const aiDesc    = t('services.ai.desc') as string
  const aiBullets = t('services.ai.bullets') as string[]
  const webDesc   = t('services.web.desc') as string
  const webBullets = t('services.web.bullets') as string[]

  return (
    <section
      id="capabilities"
      className="py-20 md:py-28 px-4 md:px-6"
      style={{ background: 'var(--color-paper)' }}
    >
      <div className="max-w-6xl mx-auto" dir={dir}>
        {/* Section head */}
        <div className="mb-8">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-3"
            style={{ color: 'var(--color-accent)' }}>
            {dir === 'rtl' ? 'יכולות' : 'Capabilities'}
          </p>
          <h2
            className="font-display font-bold leading-tight"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--color-ink)' }}
          >
            {t('services.title') as string}
          </h2>
        </div>

        {/* Bento grid */}
        <div className="bento-grid" style={{ gridTemplateRows: 'auto' }}>

          {/* Row 1: AI Solutions (2 col) | AI Agents (1 col) */}
          <div style={{ gridColumn: '1 / span 2' }}>
            <BigTile
              tag={dir === 'rtl' ? 'פתרונות AI' : 'AI Solutions'}
              title={t('services.ai.title') as string}
              desc={aiDesc}
              bullets={aiBullets}
              isAccent
              delay={0}
            />
          </div>
          <SmallTile icon={<IconAgents />} title={t('services.ai.cap1_title') as string} desc={t('services.ai.cap1_desc') as string} delay={0.06} />

          {/* Row 2: Process Auto | Custom LLM | Stats */}
          <SmallTile icon={<IconAutomation />} title={t('services.ai.cap2_title') as string} desc={t('services.ai.cap2_desc') as string} delay={0.1} />
          <SmallTile icon={<IconLLM />} title={t('services.ai.cap3_title') as string} desc={t('services.ai.cap3_desc') as string} delay={0.14} />
          <StatsTile delay={0.18} />

          {/* Row 3: SaaS (1 col) | Software Dev (2 col) */}
          <SmallTile icon={<IconSaaS />} title={t('services.web.cap1_title') as string} desc={t('services.web.cap1_desc') as string} delay={0.22} />
          <div style={{ gridColumn: 'span 2' }}>
            <BigTile
              tag={dir === 'rtl' ? 'פיתוח תוכנה' : 'Software Development'}
              title={t('services.web.title') as string}
              desc={webDesc}
              bullets={webBullets}
              delay={0.24}
            />
          </div>

          {/* Row 4: Design | Backend */}
          <SmallTile icon={<IconDesign />} title={t('services.web.cap2_title') as string} desc={t('services.web.cap2_desc') as string} delay={0.28} />
          <SmallTile icon={<IconBackend />} title={t('services.web.cap3_title') as string} desc={t('services.web.cap3_desc') as string} delay={0.32} />

          {/* Tech note tile */}
          <div
            className="tile flex flex-col justify-end gap-2"
            style={{ background: 'oklch(13.5% 0.008 262)', minHeight: '120px' }}
          >
            <p className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{ color: 'var(--color-ink-3)' }}>
              {dir === 'rtl' ? 'מחסנית טכנולוגית' : 'Tech stack'}
            </p>
            {['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'].map(tech => (
              <span key={tech} className="text-xs font-mono" style={{ color: 'var(--color-ink-2)' }}>{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
