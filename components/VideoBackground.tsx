'use client'

import { useEffect, useRef } from 'react'

const SECTIONS = [
  { id: 'hero',         start: 0, end: 2 },
  { id: 'services-ai',  start: 2, end: 4 },
  { id: 'services-web', start: 4, end: 6 },
] as const

const VIDEO_MAX = 6.04

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.pause()
    video.currentTime = 0

    // Flag set by scroll/resize — consumed once per rAF frame.
    // This batches rapid scroll events so we only do one DOM read + one seek per frame.
    let dirty = true

    // Positions are read FRESH from the DOM every time — no stale cache.
    // getBoundingClientRect() + scrollY gives the absolute document-top position.
    // This costs one reflow per scroll frame but guarantees accuracy regardless
    // of fonts loading, animations shifting layout, or dynamic content.
    const getTargetTime = (): number => {
      const y = window.scrollY

      for (const s of SECTIONS) {
        const el = document.getElementById(s.id)
        if (!el) continue

        const top = el.getBoundingClientRect().top + y
        const h = el.offsetHeight

        if (y >= top && y < top + h) {
          return s.start + Math.max(0, Math.min(1, (y - top) / h)) * (s.end - s.start)
        }
      }

      return VIDEO_MAX
    }

    const onScroll = () => { dirty = true }

    const loop = () => {
      // readyState >= 2 (HAVE_CURRENT_DATA) means the browser has at least one
      // decodable frame — seeking below this silently fails in some browsers.
      if (dirty && video.readyState >= 2) {
        const target = getTargetTime()
        // 0.016s threshold ≈ one frame at 60 fps — skips no-op seeks
        if (Math.abs(target - video.currentTime) > 0.016) {
          video.currentTime = target
        }
        dirty = false
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    // If the video isn't ready yet when the loop starts, wait for it
    const onCanPlay = () => { dirty = true }
    video.addEventListener('canplay', onCanPlay)

    loop()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      video.removeEventListener('canplay', onCanPlay)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      src="/video/hero.mp4"
      className="fixed inset-0 w-full h-full object-cover pointer-events-none"
      style={{ zIndex: -1 }}
      preload="auto"
      muted
      playsInline
      aria-hidden="true"
    />
  )
}
