"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/context/i18n";
import { Logo } from "@/components/Logo";

function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1">
      {(["en", "he"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
            lang === l
              ? "bg-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]"
              : "text-gray-400 hover:text-white"
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
      setScrolled(y > 30);
      setVisible(y < lastScrollY.current || y < 80);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { key: "nav.services", id: "services-ai" },
    { key: "nav.about", id: "about" },
    { key: "nav.contact", id: "contact" },
  ];

  const handleDesktopClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToId(id);
  };

  const handleMobileClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    // Delay scroll until after menu close animation starts
    setTimeout(() => scrollToId(id), 150);
  };

  return (
    <motion.header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#111318]/95 backdrop-blur-2xl border-b border-white/[0.15]"
          : "bg-transparent"
      }`}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("hero");
          }}
          className="flex items-center cursor-pointer group"
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.2 }}
          >
            <Logo size="lg" />
          </motion.div>
        </a>

        <div
          className={`hidden md:flex items-center gap-8 ${dir === "rtl" ? "flex-row-reverse" : ""}`}
        >
          {links.map(({ key, id }) => (
            <a
              key={key}
              href={`#${id}`}
              onClick={(e) => handleDesktopClick(e, id)}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer tracking-widest uppercase"
            >
              {t(key) as string}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <LangToggle />
          <button
            className="md:hidden text-gray-400 hover:text-white cursor-pointer transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {mobileOpen ? (
                <path
                  d="M18 6L6 18M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <>
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
            className="md:hidden bg-black/90 backdrop-blur-2xl border-b border-white/[0.06]"
          >
            <div
              className={`px-6 py-5 flex flex-col gap-5 ${dir === "rtl" ? "items-end" : "items-start"}`}
            >
              {links.map(({ key, id }) => (
                <a
                  key={key}
                  href={`#${id}`}
                  onClick={(e) => handleMobileClick(e, id)}
                  className="text-sm text-gray-300 hover:text-white tracking-widest uppercase cursor-pointer transition-colors"
                >
                  {t(key) as string}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
