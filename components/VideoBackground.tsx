'use client'

import { useEffect, useRef } from 'react'

const SECTIONS = [
  { id: 'hero',         start: 0, end: 2 },
  { id: 'services-ai',  start: 2, end: 4 },
  { id: 'services-web', start: 4, end: 6 },
] as const

const VIDEO_MAX = 6.04

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

    // Mobile: lerp video.currentTime toward the target each frame — many tiny seeks
    // instead of occasional large seeks, which is what caused the jumpiness.
    // Desktop: direct seek every frame for immediate response.
    const LERP    = mobile ? 0.14 : 1.0
    const SEEK_MIN = 0.01  // skip imperceptibly small seeks (~0.6 frames at 60 fps)

    type CachedSection = { start: number; end: number; top: number; height: number }
    let cache: CachedSection[] = []
    let targetTime = 0

    const buildCache = () => {
      const y = window.scrollY
      cache = SECTIONS.map((s) => {
        const el = document.getElementById(s.id)
        if (!el) return { ...s, top: 0, height: 0 }
        const rect = el.getBoundingClientRect()
        return { start: s.start, end: s.end, top: rect.top + y, height: el.offsetHeight }
      })
    }

    const computeTarget = (): number => {
      const y = window.scrollY
      for (const s of cache) {
        if (s.height === 0) continue
        if (y >= s.top && y < s.top + s.height) {
          return s.start + Math.max(0, Math.min(1, (y - s.top) / s.height)) * (s.end - s.start)
        }
      }
      return VIDEO_MAX
    }

    const onScroll = () => {
      targetTime = computeTarget()
    }

    const onResize = () => {
      buildCache()
      targetTime = computeTarget()
    }

    const loop = () => {
      if (video.readyState >= 2) {
        const diff = targetTime - video.currentTime
        if (Math.abs(diff) > SEEK_MIN) {
          video.currentTime = mobile
            ? video.currentTime + diff * LERP
            : targetTime
        }
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    const onCanPlay = () => {
      buildCache()
      targetTime = computeTarget()
    }
    video.addEventListener('canplay', onCanPlay)

    // Rebuild cache after full page load — fonts/images can shift section heights
    const onLoad = () => { buildCache(); targetTime = computeTarget() }
    window.addEventListener('load', onLoad)

    buildCache()
    targetTime = computeTarget()
    loop()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('load', onLoad)
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
