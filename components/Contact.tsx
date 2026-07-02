'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { EnvelopeSimple, LinkedinLogo, GithubLogo, CheckCircle, CircleNotch } from '@phosphor-icons/react'
import { useI18n } from '@/context/i18n'

const EASE = [0.16, 1, 0.3, 1] as const

export function Contact() {
  const { t, dir } = useI18n()
  const reduce = useReducedMotion()
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

  const inputBase =
    'w-full bg-transparent border-b border-zinc-700 focus:border-accent px-0 py-3.5 text-zinc-100 text-sm outline-none transition-colors duration-200'

  return (
    <section id="contact" className="relative py-28 bg-base border-t border-base-line">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start" dir={dir}>
          {/* Info */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-zinc-100 tracking-tight mb-5">
              {t('contact.title') as string}
            </h2>

            <p className="text-zinc-400 leading-relaxed mb-10 max-w-sm">
              {t('contact.sub') as string}
            </p>

            <a
              href="mailto:info@agentmy.co.il"
              className="group inline-flex items-center gap-3 mb-10 cursor-pointer"
            >
              <EnvelopeSimple size={20} className="text-accent flex-shrink-0" />
              <span className="text-zinc-300 group-hover:text-accent text-sm transition-colors duration-200">
                info@agentmy.co.il
              </span>
            </a>

            <div className="flex gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 border border-base-line hover:border-zinc-600 rounded-full
                  flex items-center justify-center text-zinc-400 hover:text-zinc-100
                  transition-colors duration-200 cursor-pointer"
              >
                <LinkedinLogo size={18} />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="w-10 h-10 border border-base-line hover:border-zinc-600 rounded-full
                  flex items-center justify-center text-zinc-400 hover:text-zinc-100
                  transition-colors duration-200 cursor-pointer"
              >
                <GithubLogo size={18} />
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="border border-base-line rounded-2xl p-14 text-center bg-base-raised"
                >
                  <CheckCircle size={44} weight="light" className="text-accent mx-auto mb-4" />
                  <p className="text-zinc-100 text-base font-medium">
                    {t('contact.success') as string}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  dir={dir}
                  className="space-y-8"
                >
                  {[
                    { key: 'name', type: 'text', label: t('contact.name') as string },
                    { key: 'email', type: 'email', label: t('contact.email') as string },
                  ].map(({ key, type, label }) => (
                    <div key={key}>
                      <label htmlFor={`contact-${key}`} className="block text-zinc-400 text-xs font-medium mb-2">
                        {label}
                      </label>
                      <input
                        id={`contact-${key}`}
                        type={type}
                        required
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                        className={inputBase}
                      />
                    </div>
                  ))}
                  <div>
                    <label htmlFor="contact-message" className="block text-zinc-400 text-xs font-medium mb-2">
                      {t('contact.message') as string}
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className={`${inputBase} resize-none`}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-dim
                      text-zinc-950 font-semibold py-4 rounded-full transition-colors duration-200
                      cursor-pointer disabled:opacity-60 text-sm active:scale-[0.98]"
                  >
                    {submitting ? (
                      <CircleNotch size={18} className="animate-spin" />
                    ) : (
                      t('contact.submit') as string
                    )}
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
