'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

const CONFIG = {
  easeFactor:       0.1,
  seekSkipS:        1 / 60,
  // Mobile decoder stalls when seeked at 60fps — cap at ~15fps wall-clock
  mobileSeekMs:     67,
} as const

interface Props {
  videoSrc:          string
  fallbackImageSrc?: string
  children?:         React.ReactNode
}

export function ScrollVideoHero({ videoSrc, fallbackImageSrc, children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef     = useRef<HTMLVideoElement>(null)
  const contentRef   = useRef<HTMLDivElement>(null)
  const fillRef      = useRef<HTMLDivElement>(null)
  const hintRef      = useRef<HTMLDivElement>(null)
  const targetRef    = useRef(0)
  const currentRef   = useRef(0)
  const rafIdRef     = useRef(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const container = containerRef.current
    const video     = videoRef.current
    if (!container || !video) return

    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

    const onLoadedMetadata = () => {
      video.currentTime = 0.001
      if (isIOS) {
        video.play().then(() => video.pause()).catch(() => {})
      }
    }
    video.addEventListener('loadedmetadata', onLoadedMetadata)
    if (isIOS) video.load()

    if (prefersReducedMotion) {
      video.loop = true
      video.play().catch(() => {})
      return () => { video.removeEventListener('loadedmetadata', onLoadedMetadata) }
    }

    const isMobile = window.matchMedia('(pointer: coarse)').matches
    let lastSeekMs = 0

    // rAF smoothing loop — owns all DOM mutations
    const loop = () => {
      const diff = targetRef.current - currentRef.current

      if (Math.abs(diff) > 0.0001) {
        currentRef.current += diff * CONFIG.easeFactor
        const p = currentRef.current

        if (video.readyState >= 3 && video.duration) {
          const t = p * video.duration
          const now = performance.now()
          const pastThrottle = !isMobile || now - lastSeekMs >= CONFIG.mobileSeekMs
          if (pastThrottle && Math.abs(t - video.currentTime) >= CONFIG.seekSkipS) {
            video.currentTime = t
            if (isMobile) lastSeekMs = now
          }
        }

        if (contentRef.current) {
          contentRef.current.style.opacity   = String(Math.max(0, 1 - p * 2.5))
          contentRef.current.style.transform = `translateY(${p * -50}px)`
        }

        if (fillRef.current) {
          fillRef.current.style.transform = `scaleX(${p})`
        }

        if (hintRef.current) {
          hintRef.current.style.opacity = String(Math.max(0, 1 - p * 6))
        }
      }

      rafIdRef.current = requestAnimationFrame(loop)
    }

    // pin for 2× viewport height — full video passthrough
    const st = ScrollTrigger.create({
      trigger: container,
      start:   'top top',
      end:     () => `+=${window.innerHeight * 2}`,
      pin:     true,
      scrub:   false,
      onUpdate: (self) => { targetRef.current = self.progress },
    })

    rafIdRef.current = requestAnimationFrame(loop)

    // Let Next.js finish layout before GSAP measures positions
    ScrollTrigger.refresh()

    return () => {
      cancelAnimationFrame(rafIdRef.current)
      st.kill()
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
    }
  }, [])

  return (
    <div
      id="hero"
      ref={containerRef}
      // h-screen-dvh: height:100vh fallback + height:100dvh — defined in globals.css
      // No overflow-hidden: GSAP pin needs to manipulate the element freely
      className="relative w-full h-screen-dvh"
    >
      {/* Video — translateZ(0) prevents black screen in iOS Safari fixed containers */}
      <video
        ref={videoRef}
        src={videoSrc}
        poster={fallbackImageSrc}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: 1,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          zIndex: 0,
        }}
        preload="auto"
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Content overlay — absolute inset-0 so height never depends on children */}
      <div
        ref={contentRef}
        className="absolute inset-0"
        style={{ zIndex: 1, willChange: 'opacity, transform' }}
      >
        {children}
      </div>

      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10"
        style={{ zIndex: 3 }}
      >
        <div
          ref={fillRef}
          className="h-full bg-blue-500 origin-left"
          style={{ transform: 'scaleX(0)', willChange: 'transform' }}
        />
      </div>

      {/* Scroll hint */}
      <div
        ref={hintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ zIndex: 3 }}
        aria-hidden="true"
      >
        <div className="w-6 h-9 border border-white/20 rounded-full flex items-start justify-center pt-1.5">
          <div
            className="w-1 h-2 bg-white/40 rounded-full"
            style={{ animation: 'scrollBounce 2s ease-in-out infinite' }}
          />
        </div>
      </div>
    </div>
  )
}
