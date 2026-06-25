"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/context/i18n";
import { Logo } from "@/components/Logo";

function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div dir="ltr" className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-full p-1">
      {(["en", "he"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${
            lang === l
              ? "bg-indigo-600 text-white shadow-[0_0_10px_rgba(99,102,241,0.4)]"
              : "text-white/60 hover:text-white/90"
          }`}
        >
          {l === "en" ? "EN" : "עב"}
        </button>
      ))}
    </div>
  );
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function Navbar() {
  const { t, dir } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setVisible(y < lastScrollY.current || y < 80);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { key: "nav.services", id: "services" },
    { key: "nav.about", id: "about" },
    { key: "nav.contact", id: "contact" },
  ];

  const isRTL = dir === "rtl";

  return (
    <motion.div
      className="fixed top-4 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-50 sm:min-w-[600px] lg:min-w-[780px]"
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.28, ease: "easeInOut" }}
      dir={dir}
    >
      <nav
        dir="ltr"
        className={`flex ${isRTL ? "flex-row-reverse" : "flex-row"} items-center justify-between h-14 px-4 sm:px-5 rounded-2xl transition-all duration-300 ${
          scrolled
            ? "bg-[#0c0f1a]/92 backdrop-blur-2xl border border-white/[0.09] shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.03)]"
            : "bg-[#0c0f1a]/70 backdrop-blur-xl border border-white/[0.07]"
        }`}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); scrollToId("hero"); }}
          className="flex items-center cursor-pointer flex-shrink-0"
        >
          <Logo size="md" />
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(({ key, id }) => (
            <button
              key={key}
              onClick={() => scrollToId(id)}
              className="text-sm text-white/65 hover:text-white transition-colors duration-200 cursor-pointer tracking-wide"
            >
              {t(key) as string}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2.5">
          <LangToggle />
          <button
            onClick={() => scrollToId("contact")}
            className="hidden md:flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500
              text-white text-sm font-medium rounded-xl cursor-pointer
              transition-all duration-200
              shadow-[0_0_20px_rgba(99,102,241,0.25)]
              hover:shadow-[0_0_35px_rgba(99,102,241,0.45)]"
          >
            {isRTL ? "התחילו פרויקט" : "Start a Project"}
          </button>
          <button
            className="md:hidden text-white/65 hover:text-white cursor-pointer transition-colors p-1"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="mt-2 bg-[#0c0f1a]/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-4"
            dir={dir}
          >
            <div className="flex flex-col gap-1">
              {links.map(({ key, id }) => (
                <button
                  key={key}
                  onClick={() => { setMobileOpen(false); setTimeout(() => scrollToId(id), 150); }}
                  className={`text-sm text-white/55 hover:text-white py-3 px-3 rounded-xl
                    hover:bg-white/[0.04] transition-all duration-150 cursor-pointer
                    tracking-wide ${isRTL ? "text-right" : "text-left"}`}
                >
                  {t(key) as string}
                </button>
              ))}
              <div className="h-px bg-white/[0.06] my-2" />
              <button
                onClick={() => { setMobileOpen(false); setTimeout(() => scrollToId("contact"), 150); }}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium
                  rounded-xl cursor-pointer transition-all duration-200"
              >
                {isRTL ? "התחילו פרויקט" : "Start a Project"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
