'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/context/i18n'

export function Contact() {
  const { t, dir } = useI18n()
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 900))
    setSubmitting(false)
    setSubmitted(true)
  }

  const inputClass = `w-full bg-white/[0.09] border border-white/[0.18] rounded-xl px-5 py-3.5 text-white
    text-sm placeholder-white/40 outline-none focus:border-blue-500/70
    focus:bg-white/[0.12] focus:shadow-[0_0_22px_rgba(59,130,246,0.2)]
    transition-all duration-200 backdrop-blur-sm`

  return (
    <section id="contact" className="relative py-32 bg-black">
      {/* Solid black — video stops being visible from here onwards */}

      <div ref={ref} className="relative z-10 max-w-lg mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            {dir === 'rtl' ? 'צור קשר' : 'Contact'}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-white inline-block relative"
          >
            {t('contact.title') as string}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="absolute -bottom-2 inset-x-0 h-0.5 bg-gradient-to-r from-blue-500 to-transparent origin-left block"
            />
          </motion.h2>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-green-500/10 border border-green-500/25 rounded-2xl p-14 text-center backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 15, delay: 0.1 }}
                className="w-16 h-16 bg-green-500/15 rounded-full flex items-center justify-center mx-auto mb-5"
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#22c55e" strokeWidth="2.5">
                  <path d="M5 14l7 7 11-14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
              <p className="text-green-400 text-base font-medium">{t('contact.success') as string}</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              onSubmit={handleSubmit}
              dir={dir}
              className="space-y-4"
            >
              <input
                type="text" required
                placeholder={t('contact.name') as string}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className={inputClass}
              />
              <input
                type="email" required
                placeholder={t('contact.email') as string}
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={inputClass}
              />
              <textarea
                required rows={5}
                placeholder={t('contact.message') as string}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className={`${inputClass} resize-none`}
              />
              <button
                type="submit" disabled={submitting}
                className="w-full relative group overflow-hidden bg-blue-600/90 hover:bg-blue-500
                  text-white font-semibold py-3.5 rounded-xl transition-colors duration-200
                  cursor-pointer disabled:opacity-60 shadow-[0_0_25px_rgba(59,130,246,0.2)]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {submitting ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full block"
                    />
                  ) : (
                    t('contact.submit') as string
                  )}
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                  transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Email + socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-10 flex flex-col items-center gap-5"
        >
          <a
            href="mailto:info@agento.co.il"
            className="text-white/40 hover:text-blue-400 text-sm transition-colors duration-200 cursor-pointer"
          >
            info@agento.co.il
          </a>
          <div className="flex gap-3">
            <a href="#" aria-label="LinkedIn"
              className="w-9 h-9 bg-white/[0.09] border border-white/20 rounded-full flex items-center justify-center
                text-white/50 hover:text-white hover:border-blue-500/50 transition-all duration-200 cursor-pointer backdrop-blur-sm">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="#" aria-label="GitHub"
              className="w-9 h-9 bg-white/[0.09] border border-white/20 rounded-full flex items-center justify-center
                text-white/50 hover:text-white hover:border-white/40 transition-all duration-200 cursor-pointer backdrop-blur-sm">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
                  0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
                  -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
                  .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688
                  -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115
                  2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595
                  1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012
                  2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
