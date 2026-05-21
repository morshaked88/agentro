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

  const inputClass = `w-full bg-transparent border-b border-white/[0.18] focus:border-blue-500/70
    px-0 py-3 text-white text-sm placeholder-white/30 outline-none
    transition-colors duration-200`

  return (
    <section id="contact" className="relative py-24 md:py-36 bg-[#030507] overflow-hidden">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Blue radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_25%_50%,rgba(59,130,246,0.07),transparent)] pointer-events-none" />
      {/* Amber accent glow right */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_50%,rgba(245,158,11,0.04),transparent)] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start" dir={dir}>

          {/* ── LEFT: Info column ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Section marker */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-blue-400/70 text-xs font-mono tracking-widest">/ 04</span>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-500/40 to-transparent" />
            </div>

            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
              {t('contact.title') as string}
            </h2>

            <p className="text-white/45 text-base leading-relaxed mb-10 max-w-xs">
              {dir === 'rtl'
                ? 'שלחו לנו הודעה וניצור איתכם קשר תוך 24 שעות. נשמח לשמוע על הפרויקט שלכם.'
                : 'Send us a message and we\'ll get back to you within 24 hours. We\'d love to hear about your project.'}
            </p>

            {/* Email link */}
            <motion.a
              href="mailto:info@agentro.co.il"
              className="group flex items-center gap-3 mb-8 cursor-pointer w-fit"
              whileHover={{ x: dir === 'rtl' ? -4 : 4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-8 h-8 rounded-lg border border-blue-500/30 bg-blue-500/[0.08]
                flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <span className="text-white/65 group-hover:text-blue-400 text-sm font-mono transition-colors duration-200">
                info@agentro.co.il
              </span>
              <span className="text-white/25 group-hover:text-blue-400 text-sm transition-colors duration-200">→</span>
            </motion.a>

            {/* Social links */}
            <div className="flex gap-3 mb-12">
              <a href="#" aria-label="LinkedIn"
                className="w-9 h-9 border border-white/[0.12] hover:border-blue-500/40 rounded-lg
                  flex items-center justify-center text-white/40 hover:text-white
                  transition-all duration-200 cursor-pointer bg-white/[0.03]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="#" aria-label="GitHub"
                className="w-9 h-9 border border-white/[0.12] hover:border-white/30 rounded-lg
                  flex items-center justify-center text-white/40 hover:text-white
                  transition-all duration-200 cursor-pointer bg-white/[0.03]">
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

            {/* Decorative orbit rings */}
            <div className="relative w-32 h-32 opacity-20">
              <motion.div
                className="absolute inset-0 rounded-full border border-blue-500/60"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-400" />
              </motion.div>
              <motion.div
                className="absolute inset-4 rounded-full border border-amber-500/40"
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-400" />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-blue-500/40 border border-blue-500/60" />
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border border-green-500/25 rounded-2xl p-14 text-center bg-green-500/[0.05]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 15, delay: 0.1 }}
                    className="w-14 h-14 bg-green-500/15 rounded-full flex items-center justify-center mx-auto mb-5"
                  >
                    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" stroke="#22c55e" strokeWidth="2.5">
                      <path d="M5 14l7 7 11-14" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                  <p className="text-green-400 text-base font-medium">{t('contact.success') as string}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  dir={dir}
                  className="space-y-8"
                >
                  <div>
                    <label className="block text-white/65 text-xs font-mono uppercase tracking-[0.12em] mb-2">
                      {t('contact.name') as string}
                    </label>
                    <input
                      type="text" required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-white/65 text-xs font-mono uppercase tracking-[0.12em] mb-2">
                      {t('contact.email') as string}
                    </label>
                    <input
                      type="email" required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-white/65 text-xs font-mono uppercase tracking-[0.12em] mb-2">
                      {t('contact.message') as string}
                    </label>
                    <textarea
                      required rows={5}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <button
                    type="submit" disabled={submitting}
                    className="w-full relative group overflow-hidden bg-blue-600 hover:bg-blue-500
                      text-white font-semibold py-4 rounded-lg transition-all duration-200
                      cursor-pointer disabled:opacity-60 text-sm tracking-wide
                      shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:shadow-[0_0_50px_rgba(59,130,246,0.4)]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {submitting ? (
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full block"
                        />
                      ) : (
                        <>
                          {t('contact.submit') as string}
                          <motion.span
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            →
                          </motion.span>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                      transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
