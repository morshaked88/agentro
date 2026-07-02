'use client'

import { useState } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import { useI18n } from '@/context/i18n'
import { Logo } from '@/components/Logo'

function LangToggle() {
  const { lang, setLang } = useI18n()
  return (
    <div dir="ltr" className="flex items-center border border-base-line rounded-full p-0.5">
      {(['en', 'he'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 cursor-pointer ${
            lang === l
              ? 'bg-zinc-100 text-zinc-950'
              : 'text-zinc-400 hover:text-zinc-100'
          }`}
        >
          {l === 'en' ? 'EN' : 'עב'}
        </button>
      ))}
    </div>
  )
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Navbar() {
  const { t, dir } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setVisible(y < prev || y < 80)
  })

  const links = [
    { key: 'nav.services', id: 'services' },
    { key: 'nav.about', id: 'about' },
    { key: 'nav.contact', id: 'contact' },
  ]

  const isRTL = dir === 'rtl'

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50"
      animate={{ y: visible ? 0 : -80 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      dir={dir}
    >
      <div
        className={`h-16 border-b transition-colors duration-300 ${
          scrolled
            ? 'bg-base/90 backdrop-blur-xl border-base-line'
            : 'bg-transparent border-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); scrollToId('hero') }}
            className="cursor-pointer flex-shrink-0"
          >
            <Logo size="md" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map(({ key, id }) => (
              <button
                key={key}
                onClick={() => scrollToId(id)}
                className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-200 cursor-pointer"
              >
                {t(key) as string}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <LangToggle />
            <button
              onClick={() => scrollToId('contact')}
              className="hidden md:inline-flex items-center px-5 py-2 bg-accent hover:bg-accent-dim
                text-zinc-950 text-sm font-semibold rounded-full cursor-pointer
                transition-colors duration-200 active:scale-[0.98]"
            >
              {t('hero.cta_contact') as string}
            </button>
            <button
              className="md:hidden text-zinc-400 hover:text-zinc-100 cursor-pointer transition-colors p-1"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <List size={22} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden mx-4 mt-2 bg-base-raised/95 backdrop-blur-xl border border-base-line rounded-2xl p-4"
            dir={dir}
          >
            <div className="flex flex-col gap-1">
              {links.map(({ key, id }) => (
                <button
                  key={key}
                  onClick={() => { setMobileOpen(false); setTimeout(() => scrollToId(id), 150) }}
                  className={`text-sm text-zinc-400 hover:text-zinc-100 py-3 px-3 rounded-xl
                    hover:bg-white/[0.04] transition-colors duration-150 cursor-pointer ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  {t(key) as string}
                </button>
              ))}
              <div className="h-px bg-base-line my-2" />
              <button
                onClick={() => { setMobileOpen(false); setTimeout(() => scrollToId('contact'), 150) }}
                className="w-full py-3 bg-accent hover:bg-accent-dim text-zinc-950 text-sm font-semibold
                  rounded-full cursor-pointer transition-colors duration-200"
              >
                {t('hero.cta_contact') as string}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
