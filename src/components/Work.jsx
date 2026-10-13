import React, { useEffect, useRef } from 'react'
import projects from '../assets/data/project'
import ProjectCard from './ProjectCard'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'


gsap.registerPlugin(ScrollTrigger)



const Work = () => {

  const scope = useRef(null)
  const cardsRef = useRef(null)
  const cardRefs= useRef(null)

  cardRefs.current = []

  const addCardRef = (el)=>{
    if(el && !cardRefs.current.includes(el)) cardRefs.current.push(el)
  }


  useGSAP(()=>{
    const tl = gsap.timeline({
        scrollTrigger:{
            trigger: scope.current,
            start: 'top bottom',
            end: 'top center',
            scrub: true,
            
        },
    })

     tl.fromTo(cardsRef.current, { filter: 'blur(20px)' }, { filter: 'blur(0px)' }, 0)
          // per-card settle: rises up, scales up, un-rotates, staggered slightly
          .fromTo(
              cardRefs.current,
              {
                  y: 80,
                  scale: 0.85,
                  opacity: 0.3,
                  
              },
              {
                  y: 0,
                  scale: 1,
                  opacity: 1,
                  rotate: 0,
                  stagger: 0.1,
              },
              0)

  }, {scope})

  // Smooth horizontal scroll for mouse wheel + drag; touchpad stays native-feel
  useEffect(() => {
    const track = cardsRef.current
    const section = scope.current
    if (!track || !section) return

    let targetScroll = track.scrollLeft
    let rafId = 0
    let wheelIdleTimer = 0

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

    const getMaxScroll = () =>
      Math.max(0, track.scrollWidth - track.clientWidth)

    const stopSmooth = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = 0
      }
    }

    const tick = () => {
      const current = track.scrollLeft
      const diff = targetScroll - current

      if (Math.abs(diff) < 0.4) {
        track.scrollLeft = targetScroll
        rafId = 0
        return
      }

      // Ease toward target — smooth for mouse notch scrolling
      track.scrollLeft = current + diff * 0.18
      rafId = requestAnimationFrame(tick)
    }

    const scrollTo = (next, { smooth = true } = {}) => {
      const maxScroll = getMaxScroll()
      targetScroll = clamp(next, 0, maxScroll)

      if (!smooth) {
        stopSmooth()
        track.scrollLeft = targetScroll
        return
      }

      if (!rafId) rafId = requestAnimationFrame(tick)
    }

    const normalizeDelta = (e) => {
      let delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY

      // DOM_DELTA_LINE / DOM_DELTA_PAGE → pixels
      if (e.deltaMode === 1) delta *= 40
      if (e.deltaMode === 2) delta *= track.clientWidth

      return delta
    }

    // Discrete mouse-wheel notches vs continuous touchpad gestures
    const isMouseWheel = (e) => {
      if (e.deltaMode === 1 || e.deltaMode === 2) return true
      // Typical mouse: only vertical, relatively large steps, no horizontal
      return e.deltaX === 0 && Math.abs(e.deltaY) >= 40
    }

    const onWheel = (e) => {
      const maxScroll = getMaxScroll()
      if (maxScroll <= 0) return

      const delta = normalizeDelta(e)
      if (delta === 0) return

      const mouse = isMouseWheel(e)
      const from = mouse ? targetScroll : track.scrollLeft
      const atStart = from <= 0
      const atEnd = from >= maxScroll - 1
      const scrollingLeft = delta < 0
      const scrollingRight = delta > 0

      if ((atStart && scrollingLeft) || (atEnd && scrollingRight)) {
        // Release to page scroll at edges
        targetScroll = clamp(track.scrollLeft, 0, maxScroll)
        return
      }

      e.preventDefault()

      if (mouse) {
        // One notch ≈ ~1/3 of a card — eased via rAF
        scrollTo(targetScroll + delta * 1.35, { smooth: true })
        clearTimeout(wheelIdleTimer)
        wheelIdleTimer = window.setTimeout(() => {
          targetScroll = track.scrollLeft
        }, 120)
      } else {
        // Touchpad: keep 1:1 tracking, light smoothing
        scrollTo(track.scrollLeft + delta, { smooth: true })
      }
    }

    // Click-drag with mouse (works with custom cursor)
    let isDragging = false
    let pointerId = null
    let startX = 0
    let startScrollLeft = 0
    let moved = false

    const onPointerDown = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return
      // Don't steal native touch panning
      if (e.pointerType === 'touch') return

      isDragging = true
      moved = false
      pointerId = e.pointerId
      startX = e.clientX
      startScrollLeft = track.scrollLeft
      targetScroll = track.scrollLeft
      stopSmooth()

      section.setPointerCapture?.(e.pointerId)
      section.classList.add('is-dragging')
    }

    const onPointerMove = (e) => {
      if (!isDragging || e.pointerId !== pointerId) return
      const dx = e.clientX - startX
      if (Math.abs(dx) > 3) moved = true
      scrollTo(startScrollLeft - dx, { smooth: false })
    }

    const endDrag = (e) => {
      if (!isDragging || (pointerId != null && e.pointerId !== pointerId)) return
      isDragging = false
      pointerId = null
      section.classList.remove('is-dragging')
      try {
        section.releasePointerCapture?.(e.pointerId)
      } catch {
        /* already released */
      }
    }

    const onClickCapture = (e) => {
      if (moved) {
        e.preventDefault()
        e.stopPropagation()
        moved = false
      }
    }

    // Listen on section so padding/gaps also receive wheel + drag
    section.addEventListener('wheel', onWheel, { passive: false })
    section.addEventListener('pointerdown', onPointerDown)
    section.addEventListener('pointermove', onPointerMove)
    section.addEventListener('pointerup', endDrag)
    section.addEventListener('pointercancel', endDrag)
    section.addEventListener('click', onClickCapture, true)

    return () => {
      stopSmooth()
      clearTimeout(wheelIdleTimer)
      section.removeEventListener('wheel', onWheel)
      section.removeEventListener('pointerdown', onPointerDown)
      section.removeEventListener('pointermove', onPointerMove)
      section.removeEventListener('pointerup', endDrag)
      section.removeEventListener('pointercancel', endDrag)
      section.removeEventListener('click', onClickCapture, true)
    }
  }, [])

  return (
    <section id="work"
    ref={scope}
    
    className="w-full bg-black px-6 text-white select-none">
      <div
      ref={cardsRef}
      
      className="flex cursor-grab gap-6 overflow-x-auto overscroll-x-contain pb-25 touch-pan-x scrollbar-none [&::-webkit-scrollbar]:hidden">
        {projects.map((project, index) => (
          <ProjectCard
           key={project.id}
            project={project}
             index={index} 
             total={projects.length}
             cardRef={addCardRef} />
        ))}
      </div>
    </section>
    
  )
}

export default Work
