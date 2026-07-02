import type { Metadata } from 'next'
import { Rubik, Heebo } from 'next/font/google'
import { I18nProvider } from '@/context/i18n'
import Script from 'next/script'
import './globals.css'

// Both families ship a Hebrew subset, so the HE locale renders in the brand
// typeface instead of falling back to the system font.
const rubik = Rubik({
  subsets: ['latin', 'hebrew'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rubik',
  display: 'swap',
})

const heebo = Heebo({
  subsets: ['latin', 'hebrew'],
  weight: ['400', '500', '700'],
  variable: '--font-heebo',
  display: 'swap',
})

// TODO: replace with your production domain
const SITE_URL = 'https://agentmy.co.il'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Agentmy | פתרונות AI ופיתוח תוכנה',
    template: '%s | Agentmy',
  },
  description:
    'Agentmy בונה מערכות AI מותאמות אישית, סוכנים אוטונומיים ותוכנה עסקית שמשנות את אופן הפעולה של הארגון שלכם: לעבוד חכם יותר, מהיר יותר ובעלות תפעול נמוכה יותר.',
  keywords: [
    'פתרונות AI',
    'בינה מלאכותית לעסקים',
    'פיתוח תוכנה',
    'סוכני AI',
    'אוטומציה עסקית',
    'פיתוח אפליקציות',
    'SaaS',
    'דפי נחיתה',
    'LLM',
    'GPT',
    'Claude',
    'AI Israel',
    'פיתוח תוכנה ישראל',
    'Agentmy',
  ],
  authors: [{ name: 'Agentmy', url: SITE_URL }],
  creator: 'Agentmy',
  publisher: 'Agentmy',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'he_IL',
    alternateLocale: 'en_US',
    url: SITE_URL,
    siteName: 'Agentmy',
    title: 'Agentmy | פתרונות AI ופיתוח תוכנה',
    description:
      'Agentmy בונה מערכות AI מותאמות אישית, סוכנים אוטונומיים ותוכנה עסקית שמשנות את אופן הפעולה של הארגון שלכם.',
    images: [
      {
        url: '/agento-logo.png',
        width: 2816,
        height: 1536,
        alt: 'Agentmy | פתרונות AI ופיתוח תוכנה',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Agentmy | פתרונות AI ופיתוח תוכנה',
    description:
      'Agentmy בונה מערכות AI מותאמות אישית, סוכנים אוטונומיים ותוכנה עסקית.',
    images: ['/agento-logo.png'],
  },

  alternates: {
    canonical: SITE_URL,
    languages: {
      'he-IL': SITE_URL,
      'en-US': `${SITE_URL}/en`,
    },
  },

  category: 'technology',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Agentmy',
  url: SITE_URL,
  logo: `${SITE_URL}/agento-logo.png`,
  description:
    'Agentmy בונה מערכות AI מותאמות אישית, סוכנים אוטונומיים ותוכנה עסקית שמשנות את אופן הפעולה של ארגונים.',
  inLanguage: ['he', 'en'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['Hebrew', 'English'],
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'פתרונות AI',
      description: 'סוכני AI אוטונומיים ומערכות אוטומציה עסקית מותאמות אישית',
    },
    {
      '@type': 'Offer',
      name: 'פיתוח תוכנה',
      description: 'פלטפורמות SaaS, אפליקציות ווב ודפי נחיתה בעלי המרה גבוהה',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${rubik.variable} ${heebo.variable} font-sans antialiased`}>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  )
}
