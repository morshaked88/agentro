'use client'

import { useI18n } from '@/context/i18n'
import { Logo } from '@/components/Logo'

function LangToggle() {
  const { lang, setLang } = useI18n()
  return (
    <div className="flex items-center gap-0.5 p-0.5 rounded-full"
      style={{ border: '1px solid var(--color-rule)', background: 'var(--color-paper-2)' }}>
      {(['en', 'he'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="px-2.5 py-1 text-[11px] font-semibold rounded-full cursor-pointer transition-all duration-150 focus-visible:outline-none"
          style={{
            background: lang === l ? 'var(--color-accent)' : 'transparent',
            color: lang === l ? 'var(--color-accent-ink)' : 'var(--color-ink-3)',
          }}
          onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-focus)'}
          onBlur={e => e.currentTarget.style.boxShadow = ''}
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
    <footer
      style={{
        background: 'var(--color-paper)',
        borderTop: '1px solid var(--color-rule)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20" dir={dir}>

        {/* Statement — Ft5 */}
        <p
          className="font-display font-bold leading-tight mb-12 max-w-2xl"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 3rem)',
            color: 'var(--color-ink)',
          }}
        >
          {t('footer.tagline') as string}
        </p>

        {/* Bottom row */}
        <div
          className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-5
            pt-6 ${dir === 'rtl' ? 'md:flex-row-reverse' : ''}`}
          style={{ borderTop: '1px solid var(--color-rule)' }}
        >
          <div className={`flex items-center gap-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <Logo size="sm" className="opacity-70" />
            <p className="text-xs font-mono" style={{ color: 'var(--color-ink-3)' }}>
              {t('footer.copy') as string}
            </p>
          </div>

          <div className={`flex items-center gap-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <LangToggle />
            <p className="text-xs font-mono" style={{ color: 'var(--color-ink-3)' }}>
              {dir === 'rtl' ? 'בנוי עם ♥ בישראל' : 'Built with ♥ in Israel'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
