"use client";

import { useI18n } from "@/context/i18n";

function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div className="flex items-center bg-white/[0.06] border border-white/10 rounded-full p-1">
      {(["en", "he"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
            lang === l
              ? "bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.35)]"
              : "text-white/40 hover:text-white"
          }`}
        >
          {l === "en" ? "EN" : "עב"}
        </button>
      ))}
    </div>
  );
}

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative border-t border-white/[0.15] py-12 bg-[#111318]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center">
            <img
              src="/agento-logo.png"
              alt="Agentro"
              className="h-10 w-auto object-contain opacity-80"
            />
          </div>
          <p className="text-white/60 text-sm">
            {t("footer.tagline") as string}
          </p>
          <LangToggle />
          <p className="text-white/40 text-xs">{t("footer.copy") as string}</p>
        </div>
      </div>
    </footer>
  );
}
