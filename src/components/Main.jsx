import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitText from './SplitText'
import mainimage768Webp from '../assets/images/mainimage/mainimage-768.webp'
import mainimage1280Webp from '../assets/images/mainimage/mainimage-1280.webp'
import mainimage1920Webp from '../assets/images/mainimage/mainimage-1920.webp'
import mainimage2400Webp from '../assets/images/mainimage/mainimage-2400.webp'
import mobile768Webp from '../assets/images/mobileImage/mobileImage-768.webp'

const Main = ({headingRef, paraRef, mobileRef, lgparaRef, buttonsRef}) => {
  const scope = useRef(null)
  const bgRef = useRef(null)
  const badgeRef = useRef(null)
  const glowLeftRef = useRef(null)
  const glowRightRef = useRef(null)
  const [reducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useGSAP(() => {
    // Badge entrance
    gsap.from(badgeRef.current, {
      opacity: 0,
      y: 16,
      duration: 0.7,
      ease: 'power3.out',
      delay: 0.15,
    })

    // Slow Ken Burns on hero image
    if (!reducedMotion) {
      gsap.fromTo(
        bgRef.current,
        { scale: 1.08, xPercent: -1 },
        {
          scale: 1.16,
          xPercent: 1.5,
          duration: 18,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        }
      )

      gsap.to(glowLeftRef.current, {
        x: 40,
        y: -30,
        opacity: 0.55,
        duration: 6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      gsap.to(glowRightRef.current, {
        x: -50,
        y: 35,
        opacity: 0.45,
        duration: 7.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.8,
      })
    }

    // --- Headline char entrance + cursor-reactive ---
    if (reducedMotion) return

    const root = scope.current
    if (!root) return

    const chars = gsap.utils.toArray(root.querySelectorAll('h1 .char'))
    if (!chars.length) return

    gsap.set(chars, { transformOrigin: '50% 100%' })

    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    gsap.from(chars, {
      yPercent: isCoarse ? 40 : 120,
      rotateX: isCoarse ? 0 : -90,
      opacity: 0,
      filter: isCoarse ? 'none' : 'blur(12px)',
      duration: isCoarse ? 0.6 : 1,
      ease: isCoarse ? 'power2.out' : 'back.out(1.7)',
      stagger: isCoarse ? 0.02 : 0.04,
    })

    // Cursor magnetism: desktop only — touch gets entrance animation
    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (!finePointer) return

    let rafId = 0
    // Medium-low sensitivity — readable but reactive
    const RADIUS = 130
    const PUSH = 0.28
    const ROTATE = 11
    const SCALE_BOOST = 0.14

    const onMove = (e) => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        const { clientX, clientY } = e

        chars.forEach((char) => {
          const rect = char.getBoundingClientRect()
          const cx = rect.left + rect.width / 2
          const cy = rect.top + rect.height / 2
          const dx = cx - clientX
          const dy = cy - clientY
          const dist = Math.hypot(dx, dy)

          if (dist < RADIUS) {
            const force = (RADIUS - dist) / RADIUS
            gsap.to(char, {
              x: -dx * force * PUSH,
              y: -dy * force * PUSH,
              rotate: force * ROTATE,
              scale: 1 + SCALE_BOOST * force,
              duration: 0.45,
              ease: 'power3.out',
              overwrite: 'auto',
            })
          } else {
            gsap.to(char, {
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              duration: 0.45,
              ease: 'power3.out',
              overwrite: 'auto',
            })
          }
        })
      })
    }

    const onLeave = () => {
      gsap.to(chars, {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        duration: 1,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      })
    }

    window.addEventListener('mousemove', onMove)
    root.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      root.removeEventListener('mouseleave', onLeave)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, { scope, dependencies: [reducedMotion] })

  return (
    <div ref={scope} id="home" className="relative w-full max-w-[100vw] overflow-hidden bg-black">
      <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-black">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 overflow-hidden">
            <picture className="absolute inset-0 block h-full w-full">
              <source
                type="image/webp"
                media="(min-width: 1440px)"
                srcSet={mainimage2400Webp}
              />
              <source
                type="image/webp"
                media="(min-width: 1024px)"
                srcSet={mainimage1920Webp}
              />
              <source
                type="image/webp"
                media="(min-width: 768px)"
                srcSet={mainimage1280Webp}
              />
              <img
                ref={bgRef}
                src={mobile768Webp}
                alt=""
                aria-hidden="true"
                width={2400}
                height={1350}
                className="absolute inset-0 h-full w-full object-cover object-[60%_center] will-change-transform pointer-events-none sm:object-center"
                loading="eager"
              />
            </picture>
          </div>

          {/* Depth overlays */}
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-black/35 sm:via-black/70 sm:to-black/20" />
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/50" />
          <div
            ref={glowLeftRef}
            className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl will-change-transform"
          />
          <div
            ref={glowRightRef}
            className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-600/15 blur-3xl will-change-transform"
          />
        </div>

        {/* Hero content — one composition */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-16 pt-28 sm:px-10 sm:pb-20 sm:pt-32 lg:px-12">
          <span
            ref={badgeRef}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md sm:text-xs"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            </span>
            Full Stack · GenAI
          </span>

          <h1
            ref={headingRef}
            className="max-w-3xl font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
            style={{ perspective: 800 }}
          >
            {reducedMotion ? (
              <>
                Welcome to
                <br />
                <span className="bg-linear-to-r from-white via-white to-cyan-200/90 bg-clip-text text-transparent">
                  My Portfolio
                </span>
              </>
            ) : (
              <>
                <SplitText text="Welcome to" />
                <br />
                <SplitText
                  text="My Portfolio"
                  charClassName="portfolio-shimmer-char"
                />
              </>
            )}
          </h1>

          <p
            ref={paraRef}
            className="max-w-xl font-body text-base leading-relaxed text-white/85 sm:text-xl"
          >
            I build interfaces, and I build them faster with AI.
          </p>

          <p
            ref={mobileRef}
            className="max-w-lg font-logo text-sm leading-relaxed text-white/65 sm:text-base lg:hidden"
          >
            Full stack developer pairing hand-written code with AI tools like Claude and Copilot — for speed, not shortcuts.
          </p>

          <p
            ref={lgparaRef}
            className="hidden max-w-lg font-logo text-sm leading-relaxed text-white/65 lg:block lg:text-base"
          >
            Full stack developer pairing hand-written code with AI tools like Claude and Copilot — for speed, not shortcuts.
          </p>

          <div
            ref={buttonsRef}
            className="mt-2 flex flex-wrap items-center gap-3"
          >
            <a href="#contact">
              <button className="cursor-pointer rounded-full bg-white px-7 py-3.5 font-logo text-sm font-semibold text-black shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all hover:bg-cyan-50 hover:shadow-[0_0_40px_rgba(34,211,238,0.25)] active:scale-95 sm:text-base">
                Contact
              </button>
            </a>
            <a href="#work">
              <button className="rounded-full border border-white/25 bg-white/5 px-7 py-3.5 font-logo text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-cyan-300/40 hover:bg-white/10 active:scale-95 sm:text-base">
                View Work
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Main
