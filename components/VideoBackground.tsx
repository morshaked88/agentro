'use client'

import { useEffect, useRef } from 'react'

const VIDEO_MAX = 6.0

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

    const LERP     = mobile ? 0.10 : 1.0
    const SEEK_MIN = 0.008

    let rangeTop    = 0  // scrollY where time = 0  (top of hero)
    let rangeBottom = 1  // scrollY where time = 6s (bottom of contact)
    let targetTime  = 0

    const buildCache = () => {
      const y = window.scrollY
      const heroEl    = document.getElementById('hero')
      const contactEl = document.getElementById('contact')
      if (!heroEl || !contactEl) return
      rangeTop    = heroEl.getBoundingClientRect().top + y
      rangeBottom = contactEl.getBoundingClientRect().bottom + y
    }

    const computeTarget = (): number => {
      const span = rangeBottom - rangeTop
      if (span <= 0) return 0
      const progress = Math.max(0, Math.min(1, (window.scrollY - rangeTop) / span))
      return progress * VIDEO_MAX
    }

    const onScroll = () => { targetTime = computeTarget() }

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
