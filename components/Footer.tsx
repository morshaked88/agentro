'use client'

import { useI18n } from '@/context/i18n'
import { Logo } from '@/components/Logo'

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function LangToggle() {
  const { lang, setLang } = useI18n()
  return (
    <div dir="ltr" className="flex items-center border border-white/[0.08] rounded-xl overflow-hidden">
      {(['en', 'he'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-4 py-1.5 text-xs tracking-wider transition-all duration-200 cursor-pointer ${
            lang === l ? 'bg-indigo-600 text-white' : 'text-white/50 hover:text-white/80'
          }`}
        >
          {l === 'en' ? 'EN' : 'עב'}
        </button>
      ))}
    </div>
  )
}

export function Footer() {
  const { t, dir } = useI18n()
  const isRTL = dir === 'rtl'

  const links = [
    { key: 'nav.services', id: 'services' },
    { key: 'nav.about', id: 'about' },
    { key: 'nav.contact', id: 'contact' },
  ]

  return (
    <footer
      className="relative border-t border-white/[0.06] overflow-hidden"
      style={{ background: '#06080f' }}
    >
      {/* Top rule gradient */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <div
          className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6"
          dir={dir}
        >
          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <button
              onClick={() => scrollToId('hero')}
              className="cursor-pointer"
            >
              <Logo size="md" className="opacity-70 hover:opacity-100 transition-opacity duration-200" />
            </button>
            <p className={`text-white/55 text-xs tracking-wide max-w-[220px] ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('footer.tagline') as string}
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-6">
            {links.map(({ key, id }) => (
              <button
                key={key}
                onClick={() => scrollToId(id)}
                className="text-white/55 hover:text-white/85 text-xs tracking-wider uppercase
                  transition-colors duration-200 cursor-pointer"
              >
                {t(key) as string}
              </button>
            ))}
          </nav>

          {/* Lang toggle */}
          <LangToggle />
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 mt-8 pt-6 border-t border-white/[0.05]">
          <p className="text-white/45 text-xs">{t('footer.copy') as string}</p>
        </div>
      </div>
    </footer>
  )
}
