import React, { useRef, useState, forwardRef, Fragment } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SplitText from './SplitText'

gsap.registerPlugin(ScrollTrigger)

/** Medium-low cursor magnetic letters */
const SENSITIVITY = {
  radius: 130,
  push: 0.28,
  rotate: 11,
  scaleBoost: 0.14,
}

const AnimatedHeading = forwardRef(function AnimatedHeading(
  {
    as: Tag = 'h2',
    lines,
    text,
    className = '',
    charClassName = '',
    animateOnScroll = true,
  },
  forwardedRef
) {
  const localRef = useRef(null)
  const setRefs = (node) => {
    localRef.current = node
    if (typeof forwardedRef === 'function') forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }

  const [reducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  const lineList =
    lines ??
    (typeof text === 'string' ? [text] : [])

  useGSAP(
    () => {
      const root = localRef.current
      if (!root || reducedMotion) return

      const chars = gsap.utils.toArray(root.querySelectorAll('.char'))
      if (!chars.length) return

      gsap.set(chars, { transformOrigin: '50% 100%' })

      const isCoarse = window.matchMedia('(pointer: coarse)').matches
      const fromVars = {
        yPercent: isCoarse ? 40 : 110,
        rotateX: isCoarse ? 0 : -80,
        opacity: 0,
        filter: isCoarse ? 'none' : 'blur(8px)',
        duration: isCoarse ? 0.55 : 0.85,
        ease: isCoarse ? 'power2.out' : 'back.out(1.4)',
        stagger: isCoarse ? 0.015 : 0.025,
      }

      if (animateOnScroll) {
        gsap.from(chars, {
          ...fromVars,
          scrollTrigger: {
            trigger: root,
            start: 'top 88%',
            once: true,
          },
        })
      } else {
        gsap.from(chars, fromVars)
      }

      // Cursor magnetism: desktop / fine pointer only (touch gets entrance only)
      const finePointer = window.matchMedia('(pointer: fine)').matches
      if (!finePointer) return

      let rafId = 0
      const { radius, push, rotate, scaleBoost } = SENSITIVITY

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

            if (dist < radius) {
              const force = (radius - dist) / radius
              gsap.to(char, {
                x: -dx * force * push,
                y: -dy * force * push,
                rotate: force * rotate,
                scale: 1 + scaleBoost * force,
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
          ease: 'elastic.out(1, 0.45)',
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
    },
    { dependencies: [reducedMotion, animateOnScroll, lineList.join('|')] }
  )

  return (
    <Tag
      ref={setRefs}
      className={className}
      style={{ perspective: 800 }}
    >
      {reducedMotion
        ? lineList.map((line, i) => (
            <Fragment key={`${line}-${i}`}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))
        : lineList.map((line, i) => (
            <Fragment key={`${line}-${i}`}>
              {i > 0 && <br />}
              <SplitText text={line} charClassName={charClassName} />
            </Fragment>
          ))}
    </Tag>
  )
})

export default AnimatedHeading
