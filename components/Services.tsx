"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Robot,
  ArrowsClockwise,
  Brain,
  Stack,
  CursorClick,
  Database,
} from "@phosphor-icons/react";
import { useI18n } from "@/context/i18n";

const EASE = [0.16, 1, 0.3, 1] as const;

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Services() {
  const { t, dir } = useI18n();
  const ref = useRef(null);

  const aiCaps = [
    {
      icon: Robot,
      title: t("services.ai.cap1_title") as string,
      desc: t("services.ai.cap1_desc") as string,
    },
    {
      icon: ArrowsClockwise,
      title: t("services.ai.cap2_title") as string,
      desc: t("services.ai.cap2_desc") as string,
    },
    {
      icon: Brain,
      title: t("services.ai.cap3_title") as string,
      desc: t("services.ai.cap3_desc") as string,
    },
  ];

  const webCaps = [
    {
      icon: Stack,
      title: t("services.web.cap1_title") as string,
      desc: t("services.web.cap1_desc") as string,
    },
    {
      icon: CursorClick,
      title: t("services.web.cap2_title") as string,
      desc: t("services.web.cap2_desc") as string,
    },
    {
      icon: Database,
      title: t("services.web.cap3_title") as string,
      desc: t("services.web.cap3_desc") as string,
    },
  ];

  return (
    <section id="services" className="relative py-28 bg-base">
      <div ref={ref} className="max-w-7xl mx-auto px-6" dir={dir}>
        <Reveal className="mb-20">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-zinc-100 tracking-tight">
            {t("services.title") as string}
          </h2>
        </Reveal>

        {/* AI block: copy + capability rows beside a treated image */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start mb-28">
          <Reveal>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-zinc-100 mb-4">
              {t("services.ai.title") as string}
            </h3>
            <p className="text-zinc-400 leading-relaxed max-w-lg mb-12">
              {t("services.ai.desc") as string}
            </p>

            <div className="space-y-10">
              {aiCaps.map((cap, i) => (
                <Reveal
                  key={i}
                  delay={0.08 * i}
                  className="flex items-start gap-5"
                >
                  <cap.icon
                    size={24}
                    weight="regular"
                    className="text-accent mt-1 flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-display font-semibold text-zinc-100 mb-1.5">
                      {cap.title}
                    </h4>
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                      {cap.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative lg:mt-16">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-base-line">
              <Image
                src="/img/ai-solutions.png"
                alt="Detail of industrial machinery"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-accent/15 mix-blend-color" />
              <div className="absolute inset-0 bg-gradient-to-t from-base/60 to-transparent" />
            </div>
          </Reveal>
        </div>

        {/* Software block: stacked intro over an asymmetric trio */}
        <div>
          <Reveal className="mb-12">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-zinc-100 mb-4">
              {t("services.web.title") as string}
            </h3>
            <p className="text-zinc-400 leading-relaxed max-w-lg">
              {t("services.web.desc") as string}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-4">
            {/* Image-backed lead cell */}
            <Reveal className="relative rounded-2xl overflow-hidden border border-base-line min-h-[320px]">
              <Image
                src="/img/software.png"
                alt="Modern workspace"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-accent/15 mix-blend-color" />
              <div className="absolute inset-0 bg-gradient-to-t from-base/90 via-base/30 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-7">
                <Stack size={24} className="text-accent mb-3" />
                <h4 className="font-display font-semibold text-zinc-100 mb-1.5">
                  {webCaps[0].title}
                </h4>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  {webCaps[0].desc}
                </p>
              </div>
            </Reveal>

            {webCaps.slice(1).map((cap, i) => (
              <Reveal
                key={i}
                delay={0.08 * (i + 1)}
                className="rounded-2xl border border-base-line bg-base-raised p-7 flex flex-col justify-end min-h-[320px]"
              >
                <cap.icon size={24} className="text-accent mb-3" />
                <h4 className="font-display font-semibold text-zinc-100 mb-1.5">
                  {cap.title}
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {cap.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
