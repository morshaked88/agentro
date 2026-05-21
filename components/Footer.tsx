'use client'

import { useI18n } from '@/context/i18n'
import { Logo } from '@/components/Logo'

function LangToggle() {
  const { lang, setLang } = useI18n()
  return (
    <div className="flex items-center border border-white/[0.10] rounded-lg overflow-hidden">
      {(['en', 'he'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-4 py-1.5 text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer ${
            lang === l
              ? 'bg-blue-600 text-white'
              : 'text-white/35 hover:text-white'
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

  return (
    <footer className="relative bg-[#030507] border-t border-white/[0.08]">
      {/* Top dot grid strip */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        {/* Horizontal rule */}
        <div className="h-px bg-gradient-to-r from-blue-500/30 via-white/[0.08] to-amber-500/20 mb-8" />

        {/* Main footer row */}
        <div
          className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6"
          dir={dir}
        >
          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Logo size="md" className="opacity-80" />
            <p className="text-white/40 text-xs font-mono tracking-wider max-w-xs text-center md:text-start">
              {t('footer.tagline') as string}
            </p>
          </div>

          {/* Lang toggle */}
          <LangToggle />
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 mt-8 pt-6 border-t border-white/[0.06]">
          <p className="text-white/25 text-xs font-mono">{t('footer.copy') as string}</p>
          <p className="text-white/15 text-xs font-mono">
            {dir === 'rtl' ? 'בנוי עם ♥ בישראל' : 'Built with ♥ in Israel'}
          </p>
        </div>
      </div>
    </footer>
  )
}
