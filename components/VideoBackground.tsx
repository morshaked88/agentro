'use client'

import { useEffect, useRef } from 'react'

const SECTIONS = [
  { id: 'hero',         start: 0, end: 2 },
  { id: 'services-ai',  start: 2, end: 4 },
  { id: 'services-web', start: 4, end: 6 },
] as const

const VIDEO_MAX = 6.04

// On mobile, browsers are slow to decode seeks — throttle to 1 seek per N frames
// and raise the minimum diff threshold so trivial micro-scrolls don't trigger a seek.
const isMobile = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.pause()
    video.currentTime = 0

    const mobile = isMobile()
    // Mobile: seek at most every 3rd frame and only for diffs > 2 frames worth.
    // Desktop: original behaviour (every frame, 1-frame threshold).
    const FRAME_SKIP  = mobile ? 3  : 1
    const SEEK_THRESH = mobile ? 0.05 : 0.016

    let dirty = true
    let frameCount = 0

    // Cache absolute section positions so we never trigger a reflow inside rAF.
    // Invalidated on resize.
    type CachedSection = { start: number; end: number; top: number; height: number }
    let cache: CachedSection[] = []

    const buildCache = () => {
      const y = window.scrollY
      cache = SECTIONS.map((s) => {
        const el = document.getElementById(s.id)
        if (!el) return { ...s, top: 0, height: 0 }
        const rect = el.getBoundingClientRect()
        return { start: s.start, end: s.end, top: rect.top + y, height: el.offsetHeight }
      })
    }

    const getTargetTime = (): number => {
      const y = window.scrollY
      for (const s of cache) {
        if (s.height === 0) continue
        if (y >= s.top && y < s.top + s.height) {
          const progress = Math.max(0, Math.min(1, (y - s.top) / s.height))
          return s.start + progress * (s.end - s.start)
        }
      }
      return VIDEO_MAX
    }

    const onScroll = () => { dirty = true }

    const onResize = () => {
      buildCache()
      dirty = true
    }

    const loop = () => {
      frameCount++
      if (dirty && video.readyState >= 2 && frameCount % FRAME_SKIP === 0) {
        const target = getTargetTime()
        if (Math.abs(target - video.currentTime) > SEEK_THRESH) {
          video.currentTime = target
        }
        dirty = false
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    const onCanPlay = () => {
      buildCache()
      dirty = true
    }
    video.addEventListener('canplay', onCanPlay)

    // Build cache immediately if the DOM is already laid out
    buildCache()
    loop()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      video.removeEventListener('canplay', onCanPlay)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      src="/video/hero.mp4"
      className="fixed inset-0 w-full h-full object-cover pointer-events-none"
      style={{
        zIndex: -1,
        // Force the video onto its own GPU compositor layer so repaints
        // from seeking never block the main thread's rendering pipeline.
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
      preload="auto"
      muted
      playsInline
      aria-hidden="true"
    />
  )
}
