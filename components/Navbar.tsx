'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useI18n } from '@/context/i18n'
import { Logo } from '@/components/Logo'

function LangToggle() {
  const { lang, setLang } = useI18n()
  return (
    <div
      className="flex items-center gap-0.5 p-0.5 rounded-full"
      style={{ background: 'var(--color-paper-3)', border: '1px solid var(--color-rule)' }}
    >
      {(['en', 'he'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="px-2.5 py-1 text-[11px] font-semibold rounded-full cursor-pointer transition-all duration-150 focus-visible:outline-none focus-visible:ring-2"
          style={{
            background: lang === l ? 'var(--color-accent)' : 'transparent',
            color: lang === l ? 'var(--color-accent-ink)' : 'var(--color-ink-2)',
          }}
          onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-focus)' }}
          onBlur={e => { e.currentTarget.style.boxShadow = '' }}
        >
          {l === 'en' ? 'EN' : 'עב'}
        </button>
      ))}
    </div>
  )
}

export function Navbar() {
  const { t, dir } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { key: 'nav.services', id: 'capabilities' },
    { key: 'nav.about',    id: 'about' },
    { key: 'nav.contact',  id: 'contact' },
  ]

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-3 px-4" style={{ pointerEvents: 'none' }}>
      <div className="w-full max-w-5xl" style={{ pointerEvents: 'auto' }}>
        <motion.div
          className="rounded-full transition-all duration-300"
          style={{
            background: scrolled
              ? 'oklch(10% 0.008 262 / 0.92)'
              : 'oklch(10% 0.008 262 / 0.75)',
            border: `1px solid ${scrolled ? 'var(--color-rule)' : 'oklch(22% 0.007 262 / 0.4)'}`,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <nav
            className="flex items-center justify-between px-5 gap-4"
            style={{ height: '52px' }}
            dir={dir}
          >
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); scrollTo('hero') }}
              className="flex-shrink-0 focus-visible:outline-none"
              onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-focus)'}
              onBlur={e => e.currentTarget.style.boxShadow = ''}
              style={{ borderRadius: 'var(--radius-sm)' }}
            >
              <Logo size="md" />
            </a>

            {/* Desktop links */}
            <div className={`hidden md:flex items-center gap-6 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              {links.map(({ key, id }) => (
                <button
                  key={key}
                  onClick={() => scrollTo(id)}
                  className="text-sm font-medium cursor-pointer transition-colors duration-150 focus-visible:outline-none"
                  style={{ color: 'var(--color-ink-2)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-ink)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-ink-2)'}
                  onFocus={e => { e.currentTarget.style.color = 'var(--color-ink)'; e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-focus)' }}
                  onBlur={e => { e.currentTarget.style.color = 'var(--color-ink-2)'; e.currentTarget.style.boxShadow = '' }}
                >
                  {t(key) as string}
                </button>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <LangToggle />
              <button
                onClick={() => scrollTo('contact')}
                className="hidden md:block text-sm font-semibold px-4 py-1.5 rounded-full cursor-pointer transition-opacity duration-150 hover:opacity-90 focus-visible:outline-none"
                style={{
                  background: 'var(--color-accent)',
                  color: 'var(--color-accent-ink)',
                }}
                onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-focus)'}
                onBlur={e => e.currentTarget.style.boxShadow = ''}
              >
                {t('hero.cta_contact') as string}
              </button>
              {/* Mobile hamburger */}
              <button
                className="md:hidden cursor-pointer transition-colors focus-visible:outline-none"
                style={{ color: 'var(--color-ink-2)' }}
                onClick={() => setMobileOpen(v => !v)}
                aria-label="Toggle menu"
                onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-focus)'}
                onBlur={e => e.currentTarget.style.boxShadow = ''}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  {mobileOpen
                    ? <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                    : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
                </svg>
              </button>
            </div>
          </nav>

          {/* Mobile drawer */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: 'hidden', borderTop: '1px solid var(--color-rule)' }}
                className="rounded-b-3xl"
              >
                <div
                  className={`flex flex-col gap-4 px-5 py-4 ${dir === 'rtl' ? 'items-end' : 'items-start'}`}
                >
                  {links.map(({ key, id }) => (
                    <button
                      key={key}
                      onClick={() => scrollTo(id)}
                      className="text-sm font-medium cursor-pointer"
                      style={{ color: 'var(--color-ink-2)' }}
                    >
                      {t(key) as string}
                    </button>
                  ))}
                  <button
                    onClick={() => scrollTo('contact')}
                    className="text-sm font-semibold px-4 py-1.5 rounded-full cursor-pointer"
                    style={{ background: 'var(--color-accent)', color: 'var(--color-accent-ink)' }}
                  >
                    {t('hero.cta_contact') as string}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  )
}
