'use client'

import { useI18n } from '@/context/i18n'
import { Logo } from '@/components/Logo'

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
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
    <footer className="relative border-t border-base-line bg-base">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          dir={dir}
        >
          <div className="flex flex-col items-center md:items-start gap-2">
            <button onClick={() => scrollToId('hero')} className="cursor-pointer">
              <Logo size="md" className="opacity-80 hover:opacity-100 transition-opacity duration-200" />
            </button>
            <p className={`text-zinc-500 text-xs max-w-[240px] ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('footer.tagline') as string}
            </p>
          </div>

          <nav className="flex items-center gap-7">
            {links.map(({ key, id }) => (
              <button
                key={key}
                onClick={() => scrollToId(id)}
                className="text-zinc-400 hover:text-zinc-100 text-sm transition-colors duration-200 cursor-pointer"
              >
                {t(key) as string}
              </button>
            ))}
          </nav>

          <p className="text-zinc-500 text-xs">{t('footer.copy') as string}</p>
        </div>
      </div>
    </footer>
  )
}
