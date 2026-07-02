'use client'

import { useI18n } from '@/context/i18n'
import FlowWave from '@/components/ui/flow-wave'

export function Hero() {
  const { t, dir } = useI18n()
  const headline = t('hero.headline') as string

  const parts = headline
    .split('.')
    .map((s) => s.trim())
    .filter(Boolean)

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center bg-base overflow-hidden"
    >
      {/* Flow Wave particle field */}
      <FlowWave className="absolute inset-0 z-0 pointer-events-none" />

      {/* Scrim behind the copy column so text stays readable over the particles */}
      <div className="absolute inset-0 z-[1] bg-base/50 sm:bg-transparent pointer-events-none" />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            dir === 'rtl'
              ? 'linear-gradient(to left, rgba(4,10,7,0.82) 0%, rgba(4,10,7,0.55) 35%, transparent 65%)'
              : 'linear-gradient(to right, rgba(4,10,7,0.82) 0%, rgba(4,10,7,0.55) 35%, transparent 65%)',
        }}
      />

      {/* Blend the scene into the page background below */}
      <div
        className="absolute bottom-0 inset-x-0 h-40 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0c0c0e)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24 pb-16" dir={dir}>
        <div className="max-w-2xl">
          <h1 className="mb-6">
            {parts.map((part, i) => (
              <span
                key={i}
                className="rise-in block font-display font-bold tracking-tight leading-[1.06]
                  text-4xl sm:text-5xl lg:text-6xl"
                style={{ animationDelay: `${80 + i * 140}ms` }}
              >
                <span className={i === parts.length - 1 ? 'text-accent' : 'text-zinc-100'}>
                  {part}.
                </span>
              </span>
            ))}
          </h1>

          <p
            className="rise-in text-zinc-200 text-base md:text-lg leading-relaxed max-w-md mb-10"
            style={{ animationDelay: '400ms' }}
          >
            {t('hero.sub') as string}
          </p>

          <div
            className="rise-in flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            style={{ animationDelay: '540ms' }}
          >
            <button
              onClick={() => scrollTo('services')}
              className="px-7 py-3.5 bg-accent hover:bg-accent-dim text-zinc-950
                font-semibold text-sm rounded-full cursor-pointer
                transition-colors duration-200 active:scale-[0.98] whitespace-nowrap"
            >
              {t('hero.cta_services') as string}
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="px-7 py-3.5 border border-zinc-600 hover:border-zinc-400
                bg-base/40 backdrop-blur-sm
                text-zinc-100 font-medium text-sm rounded-full cursor-pointer
                transition-colors duration-200 active:scale-[0.98] whitespace-nowrap"
            >
              {t('hero.cta_contact') as string}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
