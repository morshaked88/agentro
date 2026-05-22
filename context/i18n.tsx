'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

export type Lang = 'en' | 'he'

const translations = {
  en: {
    nav: { services: 'Services', about: 'About', contact: 'Contact' },
    hero: {
      headline: 'Intelligence That Works. Software That Scales.',
      sub: 'Agentmy builds custom AI systems and high-performance software that transform how your business operates — so you can compete on a different level.',
      cta_services: 'See What We Build',
      cta_contact: 'Start a Project',
      tag1: 'AI Agents & Automation',
      tag2: 'Custom Software',
      tag3: 'Built for Business',
    },
    services: {
      title: 'What We Build',
      ai: {
        title: 'AI Solutions',
        desc: 'We build intelligent agents and automation systems that work inside your business — reading, deciding, and acting without constant human intervention. The result: fewer bottlenecks, faster output, and lower operational costs.',
        bullets: ['Autonomous AI agents & multi-step workflows', 'LLM integrations (GPT-4, Claude, Gemini)', 'Intelligent data processing & business automation'],
        cap1_title: 'AI Agents',
        cap1_desc: 'Purpose-built agents that handle complex, multi-step tasks across your systems — 24/7, no manual work required.',
        cap2_title: 'Process Automation',
        cap2_desc: 'Eliminate repetitive operations with AI pipelines that scale without adding headcount or slowing down.',
        cap3_title: 'Custom LLM Solutions',
        cap3_desc: 'Language models fine-tuned on your data and business logic — accurate, consistent, and genuinely useful.',
        stat1_val: '10×',
        stat1_lbl: 'Faster Output',
        stat2_val: '24/7',
        stat2_lbl: 'Always On',
        stat3_val: '∞',
        stat3_lbl: 'Scalable',
      },
      web: {
        title: 'Software Development',
        desc: 'From SaaS platforms to high-converting landing pages — we build fast, reliable software that your users love and your business can grow on. Clean code, modern architecture, and zero shortcuts.',
        bullets: ['SaaS platforms & web applications', 'High-converting landing pages', 'APIs, integrations & backend systems'],
        cap1_title: 'SaaS Platforms',
        cap1_desc: 'End-to-end platforms with auth, billing, real-time data, and architecture that scales from 10 to 100,000 users.',
        cap2_title: 'Conversion-Focused Design',
        cap2_desc: 'Every element earns its place. Interfaces engineered to turn visitors into leads and leads into customers.',
        cap3_title: 'Backend & Integrations',
        cap3_desc: 'Robust APIs, database design, and third-party integrations built for reliability, speed, and long-term maintainability.',
        stat1_val: 'A+',
        stat1_lbl: 'Performance',
        stat2_val: '100%',
        stat2_lbl: 'Custom-Built',
        stat3_val: 'SEO',
        stat3_lbl: 'Optimized',
      },
    },
    about: {
      title: 'Who We Are',
      text: 'Agentmy is a technology company focused on one thing: building AI systems and software that genuinely move the needle for the businesses we work with. We don\'t sell templates or generic solutions — every project is designed from scratch around your specific goals, constraints, and growth targets.',
      vision: 'Our vision is to be the AI and software partner that ambitious businesses trust when the stakes are high — delivering technology that\'s not just modern, but mission-critical.',
      badges: ['AI-First', 'Fast Delivery', 'Modern Stack'],
      val1_title: 'AI-First Thinking',
      val1_desc: 'We approach every business problem by asking how AI can make the solution smarter, faster, and more autonomous.',
      val2_title: 'Modern Architecture',
      val2_desc: 'React, Next.js, TypeScript, Node.js — proven tools built for performance, reliability, and the long term.',
      val3_title: 'Rapid Delivery',
      val3_desc: 'From kickoff to production in weeks, not months — without cutting corners on quality or security.',
      val4_title: 'Zero Surprises',
      val4_desc: 'Clear milestones, honest timelines, and constant communication. You always know exactly where your project stands.',
    },
    contact: {
      title: "Let's Build Together",
      name: 'Your Name',
      email: 'Your Email',
      message: 'Tell us about your project',
      submit: 'Send Message',
      success: "Message received. We'll be in touch within 24 hours.",
    },
    footer: {
      tagline: 'Building the intelligence layer of your business.',
      copy: '© 2025 Agentmy. All rights reserved.',
    },
  },
  he: {
    nav: { services: 'שירותים', about: 'אודות', contact: 'צור קשר' },
    hero: {
      headline: 'בינה מלאכותית שעובדת. תוכנה שצומחת.',
      sub: 'Agentmy בונה מערכות AI מותאמות ותוכנה עסקית שמשנות את האופן שבו הארגון שלכם פועל — כדי שתעבדו חכם יותר, מהיר יותר, ובעלות נמוכה יותר.',
      cta_services: 'ראו מה אנחנו בונים',
      cta_contact: 'התחילו פרויקט',
      tag1: 'סוכני AI ואוטומציה',
      tag2: 'פיתוח תוכנה מותאם',
      tag3: 'פתרונות לעסקים',
    },
    services: {
      title: 'מה אנחנו בונים',
      ai: {
        title: 'פתרונות AI',
        desc: 'אנחנו בונים סוכנים חכמים ומערכות אוטומציה שפועלים בתוך הארגון שלכם — קוראים מידע, מקבלים החלטות ומבצעים פעולות בלי שתצטרכו להתעסק בכל שלב. התוצאה: פחות צווארי בקבוק, תפוקה גבוהה יותר ועלויות תפעול נמוכות יותר.',
        bullets: ['סוכני AI אוטונומיים לתהליכים מורכבים', 'חיבור למודלי שפה מתקדמים — GPT-4, Claude, Gemini', 'עיבוד נתונים חכם ואוטומציה של תהליכים עסקיים'],
        cap1_title: 'סוכני AI',
        cap1_desc: 'סוכנים ייעודיים שמטפלים במשימות מורכבות ורב-שלביות בכל מערכות הארגון — 24/7, ללא תלות בהתערבות אנושית.',
        cap2_title: 'אוטומציה של תהליכים',
        cap2_desc: 'מחליפים עבודה ידנית חוזרת במערכות AI שגדלות יחד עם העסק — ללא צורך בגיוס כוח אדם נוסף.',
        cap3_title: 'מודלי שפה מותאמים',
        cap3_desc: 'מודלי AI שמאומנים על הנתונים והלוגיקה של הארגון שלכם — מדויקים, עקביים ושימושיים בפועל.',
        stat1_val: '×10',
        stat1_lbl: 'מהירות תפוקה',
        stat2_val: '24/7',
        stat2_lbl: 'תמיד זמין',
        stat3_val: '∞',
        stat3_lbl: 'ניתן להרחבה',
      },
      web: {
        title: 'פיתוח תוכנה',
        desc: 'מפלטפורמות SaaS ועד דפי נחיתה שמייצרים לקוחות — אנחנו בונים תוכנה מהירה ואמינה שהמשתמשים שלכם יאהבו להשתמש בה, ושהעסק שלכם יוכל לצמוח עליה. קוד נקי, ארכיטקטורה נכונה, ללא קיצורי דרך.',
        bullets: ['פלטפורמות SaaS ואפליקציות ווב', 'דפי נחיתה עם שיעורי המרה גבוהים', 'ממשקי API, אינטגרציות ותשתית שרתים'],
        cap1_title: 'פלטפורמות SaaS',
        cap1_desc: 'מערכות מקצה לקצה עם ניהול משתמשים, חיוב ונתונים בזמן אמת — ארכיטקטורה שעומדת בעומס של עשרות אלפי משתמשים.',
        cap2_title: 'ממשקים שממירים',
        cap2_desc: 'כל רכיב בממשק תורם למטרה אחת: להפוך מבקרים ללידים ולידים ללקוחות משלמים.',
        cap3_title: 'שרתים ואינטגרציות',
        cap3_desc: 'ממשקי API יציבים, עיצוב מסדי נתונים וחיבור לכלים חיצוניים — בנויים לאמינות גבוהה ולתחזוקה נוחה לאורך זמן.',
        stat1_val: 'A+',
        stat1_lbl: 'ביצועים',
        stat2_val: '100%',
        stat2_lbl: 'מותאם אישית',
        stat3_val: 'SEO',
        stat3_lbl: 'אופטימיזציה',
      },
    },
    about: {
      title: 'מי אנחנו',
      text: 'Agentmy היא חברת טכנולוגיה שמתמקדת בדבר אחד: לבנות מערכות AI ותוכנה שמייצרות תוצאות עסקיות אמיתיות. אנחנו לא מוכרים תבניות מוכנות — כל פרויקט מתוכנן מאפס בהתאם למטרות, לאילוצים וליעדי הצמיחה הספציפיים של הלקוח.',
      vision: 'אנחנו שואפים להיות שותף ה-AI והתוכנה שעסקים שאפתניים בוחרים כשיש משמעות אמיתית לתוצאה — ולספק טכנולוגיה שהיא לא רק מתקדמת, אלא הכרחית להצלחת הארגון.',
      badges: ['AI בלב הפתרון', 'משלוח מהיר', 'ארכיטקטורה מודרנית'],
      val1_title: 'AI בלב הפתרון',
      val1_desc: 'בכל פרויקט אנחנו שואלים: איך AI יכול לעשות את הפתרון הזה חכם יותר, מהיר יותר ופחות תלוי בהתערבות אנושית?',
      val2_title: 'ארכיטקטורה מודרנית',
      val2_desc: 'React, Next.js, TypeScript, Node.js — טכנולוגיות מוכחות שמספקות ביצועים גבוהים, אמינות ויכולת תחזוקה לאורך שנים.',
      val3_title: 'משלוח מהיר',
      val3_desc: 'מפגישת הפתיחה ועד השקה בשבועות — לא חודשים. בלי לפשר על איכות הקוד ועל אבטחת המידע.',
      val4_title: 'שקיפות מלאה',
      val4_desc: 'אבני דרך ברורות, לוחות זמנים ריאליים ועדכונים שוטפים. תמיד תדעו בדיוק מה קורה עם הפרויקט שלכם.',
    },
    contact: {
      title: 'בואו נבנה יחד',
      name: 'שם מלא',
      email: 'כתובת אימייל',
      message: 'ספרו לנו על הפרויקט שלכם',
      submit: 'שלחו הודעה',
      success: 'ההודעה התקבלה. ניצור קשר תוך 24 שעות.',
    },
    footer: {
      tagline: 'בונים את המנוע החכם של העסק שלך.',
      copy: '© 2025 Agentmy. כל הזכויות שמורות.',
    },
  },
}

interface I18nContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: string) => string | string[]
  dir: 'ltr' | 'rtl'
}

const I18nContext = createContext<I18nContextType>({
  lang: 'he', setLang: () => {}, t: (k) => k, dir: 'rtl',
})

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('he')

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang)
    document.documentElement.lang = newLang
    document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr'
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr'
  }, [lang])

  const t = useCallback(
    (key: string): string | string[] => {
      const keys = key.split('.')
      let value: unknown = translations[lang]
      for (const k of keys) value = (value as Record<string, unknown>)?.[k]
      return (value as string | string[]) ?? key
    },
    [lang]
  )

  return (
    <I18nContext.Provider value={{ lang, setLang, t, dir: lang === 'he' ? 'rtl' : 'ltr' }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() { return useContext(I18nContext) }
