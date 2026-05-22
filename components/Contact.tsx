'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/context/i18n'

const ease = [0.16, 1, 0.3, 1] as const

export function Contact() {
  const { t, dir } = useI18n()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 900))
    setSubmitting(false)
    setSubmitted(true)
  }

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--color-rule)',
    color: 'var(--color-ink)',
    fontSize: 'var(--text-sm)',
    padding: '0.75rem 0',
    outline: 'none',
    transition: `border-color ${150}ms ease`,
  } as React.CSSProperties

  const labelStyle = {
    display: 'block',
    fontSize: '0.6875rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: 'var(--color-ink-3)',
    marginBottom: '0.5rem',
  }

  return (
    <section
      id="contact"
      className="py-20 md:py-28 px-4 md:px-6"
      style={{ borderTop: '1px solid var(--color-rule)', background: 'var(--color-paper)' }}
    >
      <div ref={ref} className="max-w-6xl mx-auto" dir={dir}>
        <div className={`grid md:grid-cols-2 gap-14 lg:gap-24 items-start ${dir === 'rtl' ? 'md:[&>*:first-child]:order-2' : ''}`}>

          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease }}
          >
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-4"
              style={{ color: 'var(--color-accent)' }}>
              {dir === 'rtl' ? 'צרו קשר' : 'Get in touch'}
            </p>
            <h2
              className="font-display font-bold leading-tight mb-5"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--color-ink)' }}
            >
              {t('contact.title') as string}
            </h2>
            <p className="text-base leading-relaxed mb-8 max-w-xs" style={{ color: 'var(--color-ink-2)' }}>
              {dir === 'rtl'
                ? 'שלחו לנו הודעה וניצור קשר תוך 24 שעות.'
                : "Send us a message and we'll get back to you within 24 hours."}
            </p>

            {/* Email */}
            <a
              href="mailto:info@agentmy.co.il"
              className="group inline-flex items-center gap-3 mb-8 cursor-pointer focus-visible:outline-none"
              style={{ color: 'var(--color-ink-2)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-ink-2)'}
              onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-focus)'; e.currentTarget.style.borderRadius = '4px' }}
              onBlur={e => e.currentTarget.style.boxShadow = ''}
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 transition-colors duration-150"
                style={{ border: '1px solid var(--color-rule)', background: 'var(--color-paper-2)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <span className="text-sm font-mono transition-colors duration-150">info@agentmy.co.il</span>
            </a>

            {/* Social icons */}
            <div className="flex gap-2">
              {[
                { label: 'LinkedIn', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z', extra: <circle cx="4" cy="4" r="2" fill="currentColor" /> },
                { label: 'GitHub', path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
              ].map(({ label, path, extra }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-150 focus-visible:outline-none"
                  style={{ border: '1px solid var(--color-rule)', color: 'var(--color-ink-2)', background: 'var(--color-paper-2)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'oklch(32% 0.008 262)'; e.currentTarget.style.color = 'var(--color-ink)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-rule)'; e.currentTarget.style.color = 'var(--color-ink-2)' }}
                  onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-focus)'}
                  onBlur={e => e.currentTarget.style.boxShadow = ''}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path fillRule="evenodd" clipRule="evenodd" d={path} />
                    {extra}
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease }}
                  className="py-16 text-center rounded-2xl"
                  style={{ border: '1px solid oklch(64% 0.22 262 / 0.2)', background: 'oklch(64% 0.22 262 / 0.04)' }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'oklch(64% 0.22 262 / 0.15)' }}
                  >
                    <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" aria-hidden>
                      <path d="M5 14l7 7 11-14" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-ink)' }}>
                    {t('contact.success') as string}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  dir={dir}
                  className="flex flex-col gap-8"
                >
                  {[
                    { key: 'contact.name', type: 'text', field: 'name' as const },
                    { key: 'contact.email', type: 'email', field: 'email' as const },
                  ].map(({ key, type, field }) => (
                    <div key={key}>
                      <label style={labelStyle}>{t(key) as string}</label>
                      <input
                        type={type}
                        required
                        value={form[field]}
                        onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => e.currentTarget.style.borderBottomColor = 'var(--color-accent)'}
                        onBlur={e => e.currentTarget.style.borderBottomColor = 'var(--color-rule)'}
                        placeholder=""
                      />
                    </div>
                  ))}
                  <div>
                    <label style={labelStyle}>{t('contact.message') as string}</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      style={{ ...inputStyle, resize: 'none' }}
                      onFocus={e => e.currentTarget.style.borderBottomColor = 'var(--color-accent)'}
                      onBlur={e => e.currentTarget.style.borderBottomColor = 'var(--color-rule)'}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-full text-sm font-semibold cursor-pointer transition-opacity duration-150
                      hover:opacity-88 disabled:opacity-50 focus-visible:outline-none"
                    style={{ background: 'var(--color-accent)', color: 'var(--color-accent-ink)' }}
                    onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-focus)'}
                    onBlur={e => e.currentTarget.style.boxShadow = ''}
                  >
                    {submitting ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                      />
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
