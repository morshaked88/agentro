'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/context/i18n'

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const { t, dir } = useI18n()

  const stats = [
    { val: '10×',  lbl: dir === 'rtl' ? 'מהירות תפוקה' : 'Faster Output' },
    { val: '24/7', lbl: dir === 'rtl' ? 'תמיד זמין'     : 'Always On'    },
    { val: '100%', lbl: dir === 'rtl' ? 'מותאם אישית'   : 'Custom-Built' },
  ]

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      style={{ background: 'var(--color-paper)', overflow: 'hidden' }}
      className="relative"
    >
      {/* Ambient glow — restrained, single accent */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: dir === 'rtl'
            ? 'radial-gradient(ellipse 55% 40% at 20% 30%, oklch(64% 0.22 262 / 0.07), transparent)'
            : 'radial-gradient(ellipse 55% 40% at 80% 30%, oklch(64% 0.22 262 / 0.07), transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Split diptych */}
        <div
          className={`grid md:grid-cols-2 gap-10 lg:gap-16 items-center pt-28 pb-12
            ${dir === 'rtl' ? 'md:[&>*:first-child]:order-2' : ''}`}
          dir={dir}
        >
          {/* Left — content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-5"
              style={{ color: 'var(--color-accent)' }}
            >
              {dir === 'rtl' ? 'מערכות AI · פיתוח תוכנה מותאם' : 'Custom AI Systems · Software Development'}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.07, ease }}
              className="font-display font-bold leading-[1.05] tracking-tight mb-5"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-display)',
                color: 'var(--color-ink)',
                overflowWrap: 'anywhere',
                minWidth: 0,
              }}
            >
              {t('hero.headline') as string}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15, ease }}
              className="text-base leading-relaxed mb-8 max-w-md"
              style={{ color: 'var(--color-ink-2)' }}
            >
              {t('hero.sub') as string}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.24 }}
              className={`flex flex-wrap gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
            >
              {/* Primary CTA */}
              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold cursor-pointer
                  transition-opacity duration-150 hover:opacity-88 focus-visible:outline-none"
                style={{ background: 'var(--color-accent)', color: 'var(--color-accent-ink)' }}
                onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-focus)'}
                onBlur={e => e.currentTarget.style.boxShadow = ''}
              >
                {t('hero.cta_contact') as string}
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path
                    d={dir === 'rtl' ? 'M9 7H5M5 7l3-3M5 7l3 3' : 'M5 7h4M9 7L6 4M9 7L6 10'}
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </button>
              {/* Secondary CTA */}
              <button
                onClick={() => scrollTo('capabilities')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold cursor-pointer
                  transition-all duration-150 focus-visible:outline-none"
                style={{ border: '1px solid var(--color-rule)', color: 'var(--color-ink-2)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-ink)'; e.currentTarget.style.borderColor = 'oklch(32% 0.008 262)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-ink-2)'; e.currentTarget.style.borderColor = 'var(--color-rule)' }}
                onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-focus)'}
                onBlur={e => e.currentTarget.style.boxShadow = ''}
              >
                {t('hero.cta_services') as string}
              </button>
            </motion.div>
          </div>

          {/* Right — video panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.12, ease }}
            className="relative hidden md:block"
            style={{
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-rule)',
              overflow: 'hidden',
              aspectRatio: '16 / 10',
            }}
          >
            <video
              autoPlay muted loop playsInline
              className="w-full h-full object-cover"
              style={{ opacity: 0.8 }}
            >
              <source src="/video/hero.mp4" type="video/mp4" />
            </video>
            {/* Subtle vignette inside the frame */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom right, oklch(10% 0.008 262 / 0.35), transparent 60%)' }}
            />
          </motion.div>
        </div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.38 }}
          className="flex items-stretch"
          style={{ borderTop: '1px solid var(--color-rule)' }}
          dir={dir}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex-1 py-5 text-center"
              style={{ borderRight: i < stats.length - 1 ? '1px solid var(--color-rule)' : 'none' }}
            >
              <p
                className="font-display font-bold text-2xl mb-0.5 tabular-nums"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
              >
                {s.val}
              </p>
              <p
                className="text-[11px] uppercase tracking-wider font-medium"
                style={{ color: 'var(--color-ink-3)' }}
              >
                {s.lbl}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
