'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Lightning, TreeStructure, Rocket, Handshake } from '@phosphor-icons/react'
import { useI18n } from '@/context/i18n'

const EASE = [0.16, 1, 0.3, 1] as const
const VALUE_ICONS = [Lightning, TreeStructure, Rocket, Handshake]

export function About() {
  const { t, dir } = useI18n()
  const reduce = useReducedMotion()

  const values = [
    { title: t('about.val1_title') as string, desc: t('about.val1_desc') as string },
    { title: t('about.val2_title') as string, desc: t('about.val2_desc') as string },
    { title: t('about.val3_title') as string, desc: t('about.val3_desc') as string },
    { title: t('about.val4_title') as string, desc: t('about.val4_desc') as string },
  ]

  return (
    <section id="about" className="relative py-28 bg-base border-t border-base-line">
      <div className="max-w-7xl mx-auto px-6" dir={dir}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="mb-20 max-w-3xl"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-zinc-100 tracking-tight mb-6">
            {t('about.title') as string}
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-6">
            {t('about.text') as string}
          </p>
          <p className="text-zinc-100 font-display">
            <span className="text-accent text-2xl font-bold">{t('about.exp_val') as string}</span>{' '}
            <span className="text-zinc-400 text-sm">{t('about.exp_lbl') as string}</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
          {values.map((v, i) => {
            const Icon = VALUE_ICONS[i]
            return (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: 0.06 * i, ease: EASE }}
                className="flex items-start gap-5"
              >
                <Icon size={24} className="text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-display font-semibold text-zinc-100 mb-2">{v.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-md">{v.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
