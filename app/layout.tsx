import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import { I18nProvider } from '@/context/i18n'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Agentro — AI Solutions & Software Development',
  description:
    'Agentro builds custom AI agents, automation systems, and high-performance software that help businesses operate faster and compete smarter.',
  openGraph: {
    title: 'Agentro — AI Solutions & Software Development',
    description: 'Custom AI systems and software built for ambitious businesses.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${dmSans.variable} font-sans bg-[#0a0a0a] text-white antialiased`}
      >
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  )
}
