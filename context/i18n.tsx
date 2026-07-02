'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

export type Lang = 'en' | 'he'

const translations = {
  en: {
    nav: { services: 'Services', about: 'About', contact: 'Contact' },
    hero: {
      headline: 'Intelligence That Works. Software That Scales.',
      sub: 'Custom AI agents and business software, built from scratch around how your company actually works.',
      cta_services: 'See What We Build',
      cta_contact: 'Start a Project',
    },
    services: {
      title: 'What We Build',
      ai: {
        title: 'AI Solutions',
        desc: 'Intelligent agents and automation that read, decide, and act inside your business. Fewer bottlenecks, lower operating costs.',
        cap1_title: 'AI Agents',
        cap1_desc: 'Purpose-built agents that handle complex, multi-step tasks across your systems without manual work.',
        cap2_title: 'Process Automation',
        cap2_desc: 'Replace repetitive operations with AI pipelines that scale without adding headcount.',
        cap3_title: 'Custom LLM Solutions',
        cap3_desc: 'Language models tuned on your data and business logic. Accurate, consistent, genuinely useful.',
      },
      web: {
        title: 'Software Development',
        desc: 'From SaaS platforms to landing pages that generate customers. Fast, reliable software your business can grow on.',
        cap1_title: 'SaaS Platforms',
        cap1_desc: 'End-to-end platforms with auth, billing, and real-time data, on architecture that scales.',
        cap2_title: 'Conversion-Focused Design',
        cap2_desc: 'Every element earns its place. Interfaces engineered to turn visitors into customers.',
        cap3_title: 'Backend & Integrations',
        cap3_desc: 'Robust APIs, database design, and third-party integrations built for reliability and speed.',
      },
    },
    about: {
      title: 'Who We Are',
      text: 'Agentmy is a technology company focused on one thing: building AI systems and software that genuinely move the needle. No templates, no generic solutions. Every project is designed from scratch around your goals, constraints, and growth targets.',
      exp_val: '15+',
      exp_lbl: 'years of cumulative experience',
      val1_title: 'AI-First Thinking',
      val1_desc: 'Every business problem starts with one question: how can AI make the solution smarter and more autonomous?',
      val2_title: 'Modern Architecture',
      val2_desc: 'React, Next.js, TypeScript, Node.js. Proven tools built for performance and the long term.',
      val3_title: 'Rapid Delivery',
      val3_desc: 'From kickoff to production in weeks, not months, without cutting corners on quality or security.',
      val4_title: 'Zero Surprises',
      val4_desc: 'Clear milestones, honest timelines, constant communication. You always know where your project stands.',
    },
    contact: {
      title: "Let's Build Together",
      sub: "Send us a message and we'll get back to you within 24 hours.",
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
      sub: 'סוכני AI ותוכנה עסקית בהתאמה אישית, שנבנים מאפס סביב האופן שבו החברה שלכם באמת עובדת.',
      cta_services: 'ראו מה אנחנו בונים',
      cta_contact: 'התחילו פרויקט',
    },
    services: {
      title: 'מה אנחנו בונים',
      ai: {
        title: 'פתרונות AI',
        desc: 'סוכנים חכמים ומערכות אוטומציה שקוראים, מחליטים ופועלים בתוך העסק שלכם. פחות צווארי בקבוק, עלויות תפעול נמוכות יותר.',
        cap1_title: 'סוכני AI',
        cap1_desc: 'סוכנים ייעודיים שמטפלים במשימות מורכבות ורב-שלביות בכל מערכות הארגון, ללא עבודה ידנית.',
        cap2_title: 'אוטומציה של תהליכים',
        cap2_desc: 'מחליפים עבודה ידנית חוזרת במערכות AI שגדלות יחד עם העסק, בלי לגייס כוח אדם נוסף.',
        cap3_title: 'מודלי שפה מותאמים',
        cap3_desc: 'מודלים שמאומנים על הנתונים והלוגיקה של הארגון שלכם. מדויקים, עקביים ושימושיים בפועל.',
      },
      web: {
        title: 'פיתוח תוכנה',
        desc: 'מפלטפורמות SaaS ועד דפי נחיתה שמייצרים לקוחות. תוכנה מהירה ואמינה שהעסק שלכם יכול לצמוח עליה.',
        cap1_title: 'פלטפורמות SaaS',
        cap1_desc: 'מערכות מקצה לקצה עם ניהול משתמשים, חיוב ונתונים בזמן אמת, על ארכיטקטורה שגדלה עם העסק.',
        cap2_title: 'ממשקים שממירים',
        cap2_desc: 'כל רכיב בממשק תורם למטרה אחת: להפוך מבקרים ללקוחות משלמים.',
        cap3_title: 'שרתים ואינטגרציות',
        cap3_desc: 'ממשקי API יציבים, עיצוב מסדי נתונים וחיבורים לכלים חיצוניים, בנויים לאמינות ולמהירות.',
      },
    },
    about: {
      title: 'מי אנחנו',
      text: 'Agentmy היא חברת טכנולוגיה שמתמקדת בדבר אחד: לבנות מערכות AI ותוכנה שמייצרות תוצאות עסקיות אמיתיות. בלי תבניות מוכנות ובלי פתרונות גנריים. כל פרויקט מתוכנן מאפס סביב המטרות, האילוצים ויעדי הצמיחה שלכם.',
      exp_val: '+15',
      exp_lbl: 'שנות ניסיון מצטבר',
      val1_title: 'AI בלב הפתרון',
      val1_desc: 'כל בעיה עסקית מתחילה בשאלה אחת: איך AI יכול לעשות את הפתרון חכם יותר ועצמאי יותר?',
      val2_title: 'ארכיטקטורה מודרנית',
      val2_desc: 'React, Next.js, TypeScript, Node.js. כלים מוכחים שנבנו לביצועים ולטווח הארוך.',
      val3_title: 'אספקה מהירה',
      val3_desc: 'מפגישת הפתיחה ועד השקה בשבועות, לא בחודשים, בלי להתפשר על איכות ואבטחה.',
      val4_title: 'שקיפות מלאה',
      val4_desc: 'אבני דרך ברורות, לוחות זמנים ריאליים ועדכונים שוטפים. תמיד תדעו בדיוק איפה הפרויקט עומד.',
    },
    contact: {
      title: 'בואו נבנה יחד',
      sub: 'שלחו לנו הודעה וניצור איתכם קשר תוך 24 שעות.',
      name: 'שם מלא',
      email: 'כתובת אימייל',
      message: 'ספרו לנו על הפרויקט שלכם',
      submit: 'שלחו הודעה',
      success: 'ההודעה התקבלה. ניצור קשר תוך 24 שעות.',
    },
    footer: {
      tagline: 'בונים את שכבת הבינה של העסק שלכם.',
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
