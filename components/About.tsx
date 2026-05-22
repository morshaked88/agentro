'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useI18n } from '@/context/i18n'

const ease = [0.16, 1, 0.3, 1] as const

const values = [
  {
    key_title: 'about.val1_title',
    key_desc:  'about.val1_desc',
  },
  {
    key_title: 'about.val2_title',
    key_desc:  'about.val2_desc',
  },
  {
    key_title: 'about.val3_title',
    key_desc:  'about.val3_desc',
  },
  {
    key_title: 'about.val4_title',
    key_desc:  'about.val4_desc',
  },
]

export function About() {
  const { t, dir } = useI18n()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      className="py-20 md:py-28 px-4 md:px-6"
      style={{ borderTop: '1px solid var(--color-rule)', background: 'var(--color-paper)' }}
    >
      <div ref={ref} className="max-w-6xl mx-auto" dir={dir}>
        {/* Section head */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease }}
          className="mb-12"
        >
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-3"
            style={{ color: 'var(--color-accent)' }}>
            {dir === 'rtl' ? 'על החברה' : 'Company'}
          </p>
          <h2
            className="font-display font-bold leading-tight max-w-xl"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--color-ink)' }}
          >
            {t('about.title') as string}
          </h2>
        </motion.div>

        <div className={`grid md:grid-cols-2 gap-12 lg:gap-20 items-start ${dir === 'rtl' ? 'md:[&>*:first-child]:order-2' : ''}`}>

          {/* Left: prose + vision */}
          <div className="flex flex-col gap-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.06, ease }}
              className="text-base leading-relaxed"
              style={{ color: 'var(--color-ink-2)' }}
            >
              {t('about.text') as string}
            </motion.p>

            {/* Vision pull-quote */}
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 12 : -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.14, ease }}
              className={`flex gap-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className="w-px flex-shrink-0 rounded-full"
                style={{ background: 'var(--color-accent)', minHeight: '100%' }}
              />
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] font-semibold mb-2"
                  style={{ color: 'var(--color-ink-3)' }}>
                  {dir === 'rtl' ? 'החזון שלנו' : 'Our Vision'}
                </p>
                <p className="text-sm leading-relaxed italic" style={{ color: 'var(--color-ink-2)' }}>
                  &ldquo;{t('about.vision') as string}&rdquo;
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: value cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.08 + i * 0.07, ease }}
                className="tile"
              >
                <h4
                  className="font-display font-semibold text-sm mb-2"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
                >
                  {t(v.key_title) as string}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-ink-2)' }}>
                  {t(v.key_desc) as string}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
