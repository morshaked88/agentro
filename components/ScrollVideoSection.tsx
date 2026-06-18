'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useI18n } from '@/context/i18n'

const VIDEO_DURATION = 6.042 // seconds — matches the actual file

export function ScrollVideoSection() {
  const { dir } = useI18n()
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef = useRef<number>(0)
  const targetTimeRef = useRef(0)
  const [loaded, setLoaded] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Smooth video scrubbing via rAF — throttled on mobile to avoid decoder stalls
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Coarse-pointer = touchscreen. Mobile decoders stall when seeked >15×/sec.
    const isMobile = window.matchMedia('(pointer: coarse)').matches
    // ~15fps seek cadence on mobile (67ms), uncapped on desktop
    const SEEK_INTERVAL_MS = isMobile ? 67 : 0
    // Larger dead-zone on mobile so tiny drift doesn't trigger a decode
    const MIN_DIFF_S = isMobile ? 0.05 : 0.01

    video.pause()
    video.currentTime = 0

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      targetTimeRef.current = Math.max(
        0,
        Math.min(latest * VIDEO_DURATION, VIDEO_DURATION - 0.001)
      )
    })

    let lastSeekMs = 0

    const loop = () => {
      // readyState >= 2 (HAVE_CURRENT_DATA) required before seeking
      if (video.readyState >= 2) {
        const now = performance.now()
        const diff = targetTimeRef.current - video.currentTime

        if (Math.abs(diff) > MIN_DIFF_S && now - lastSeekMs >= SEEK_INTERVAL_MS) {
          // On mobile: jump directly to target within the throttle window.
          // On desktop: lerp for silky smoothness.
          video.currentTime = isMobile
            ? targetTimeRef.current
            : video.currentTime + diff * 0.25
          lastSeekMs = now
        }
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      unsubscribe()
      cancelAnimationFrame(rafRef.current)
    }
  }, [scrollYProgress])

  // Text phases keyed to scroll progress
  const phase1Opacity = useTransform(scrollYProgress, [0.03, 0.15, 0.28, 0.38], [0, 1, 1, 0])
  const phase1Y = useTransform(scrollYProgress, [0.03, 0.15, 0.28, 0.38], [40, 0, 0, -40])

  const phase2Opacity = useTransform(scrollYProgress, [0.38, 0.5, 0.62, 0.72], [0, 1, 1, 0])
  const phase2Y = useTransform(scrollYProgress, [0.38, 0.5, 0.62, 0.72], [40, 0, 0, -40])

  const phase3Opacity = useTransform(scrollYProgress, [0.72, 0.82, 0.95, 1], [0, 1, 1, 0])
  const phase3Y = useTransform(scrollYProgress, [0.72, 0.82, 0.95, 1], [40, 0, 0, -40])

  // Progress bar driven by scroll
  const barScaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    // Scroll container — 350vh gives ~58px of scroll per video frame
    <div ref={containerRef} className="relative" style={{ height: '350vh' }}>
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Video */}
        <video
          ref={videoRef}
          src="/video/hero.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          preload="auto"
          muted
          playsInline
          aria-hidden="true"
          onLoadedData={() => setLoaded(true)}
        />

        {/* Dark vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50 pointer-events-none" />

        {/* Loading spinner — visible until video data loads */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-10 h-10 border-2 border-white/20 border-t-blue-500 rounded-full"
            />
          </div>
        )}

        {/* ── Text overlays ── */}
        <div
          className="absolute inset-0 flex items-center justify-center z-10 px-6"
          dir={dir}
        >
          {/* Phase 1 */}
          <motion.div
            style={{ opacity: phase1Opacity, y: phase1Y }}
            className="absolute text-center pointer-events-none select-none"
          >
            <p className="font-display text-sm md:text-base font-semibold text-blue-400 uppercase tracking-widest mb-3">
              {dir === 'rtl' ? 'פתרונות AI' : 'AI Solutions'}
            </p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
              {dir === 'rtl' ? 'אוטומציה חכמה' : 'Intelligent'}
              <br />
              <span className="text-blue-400">
                {dir === 'rtl' ? 'שעובדת בשבילכם' : 'Automation'}
              </span>
            </h2>
          </motion.div>

          {/* Phase 2 */}
          <motion.div
            style={{ opacity: phase2Opacity, y: phase2Y }}
            className="absolute text-center pointer-events-none select-none"
          >
            <p className="font-display text-sm md:text-base font-semibold text-amber-400 uppercase tracking-widest mb-3">
              {dir === 'rtl' ? 'פיתוח תוכנה' : 'Software Development'}
            </p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
              {dir === 'rtl' ? 'תוכנה שבנויה' : 'Software Built'}
              <br />
              <span className="text-amber-400">
                {dir === 'rtl' ? 'לצמוח איתכם' : 'to Scale'}
              </span>
            </h2>
          </motion.div>

          {/* Phase 3 */}
          <motion.div
            style={{ opacity: phase3Opacity, y: phase3Y }}
            className="absolute text-center pointer-events-none select-none"
          >
            <p className="font-display text-sm md:text-base font-semibold text-white/50 uppercase tracking-widest mb-3">
              Agentmy
            </p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
              {dir === 'rtl' ? 'הטכנולוגיה שלכם' : 'Your Technology'}
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
                {dir === 'rtl' ? 'מתחילה כאן' : 'Starts Here'}
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Scroll progress bar — bottom of viewport */}
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/5 z-20">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-amber-400 origin-left"
            style={{ scaleX: barScaleX }}
          />
        </div>

        {/* Scroll hint — fades out after first scroll */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]),
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20 pointer-events-none"
        >
          <span className="text-white/40 text-xs tracking-widest uppercase">
            {dir === 'rtl' ? 'גלול למטה' : 'Scroll'}
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
