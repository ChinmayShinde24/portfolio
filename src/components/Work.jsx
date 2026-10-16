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

  // Horizontal scroll: mouse wheel, touchpad, and click-drag (always accumulate)
  useEffect(() => {
    const track = cardsRef.current
    const section = scope.current
    if (!track || !section) return

    let targetScroll = track.scrollLeft
    let rafId = 0
    let isDragging = false
    let pointerId = null
    let startX = 0
    let startScrollLeft = 0
    let moved = false

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

      if (Math.abs(diff) < 0.5) {
        track.scrollLeft = targetScroll
        rafId = 0
        return
      }

      track.scrollLeft = current + diff * 0.22
      rafId = requestAnimationFrame(tick)
    }

    const scrollTo = (next, { smooth = true } = {}) => {
      targetScroll = clamp(next, 0, getMaxScroll())

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
      if (e.deltaMode === 1) delta *= 40
      if (e.deltaMode === 2) delta *= track.clientWidth
      return delta
    }

    const onWheel = (e) => {
      const maxScroll = getMaxScroll()
      if (maxScroll <= 0) return

      const delta = normalizeDelta(e)
      if (delta === 0) return

      // Use both live position + target so edge release stays reliable
      const pos = Math.min(track.scrollLeft, targetScroll)
      const posEnd = Math.max(track.scrollLeft, targetScroll)
      const atStart = pos <= 0.5
      const atEnd = posEnd >= maxScroll - 0.5

      if ((atStart && delta < 0) || (atEnd && delta > 0)) {
        targetScroll = clamp(track.scrollLeft, 0, maxScroll)
        return
      }

      e.preventDefault()
      e.stopPropagation()
      // Always accumulate on target — mouse notches + touchpad stay in sync
      scrollTo(targetScroll + delta, { smooth: true })
    }

    // Only treat as drag after a small threshold so plain clicks still open links
    const DRAG_THRESHOLD = 6
    let pressActive = false

    const onPointerDown = (e) => {
      if (e.pointerType === 'touch') return
      if (e.pointerType === 'mouse' && e.button !== 0) return

      pressActive = true
      isDragging = false
      moved = false
      pointerId = e.pointerId
      startX = e.clientX
      startScrollLeft = track.scrollLeft
      targetScroll = track.scrollLeft
    }

    const onPointerMove = (e) => {
      if (!pressActive || e.pointerId !== pointerId) return
      const dx = e.clientX - startX

      if (!isDragging) {
        if (Math.abs(dx) < DRAG_THRESHOLD) return
        isDragging = true
        moved = true
        stopSmooth()
        try {
          track.setPointerCapture(e.pointerId)
        } catch {
          /* ignore */
        }
        section.classList.add('is-dragging')
        track.style.cursor = 'grabbing'
      }

      e.preventDefault()
      scrollTo(startScrollLeft - dx, { smooth: false })
    }

    const endDrag = (e) => {
      if (!pressActive) return
      if (pointerId != null && e.pointerId !== pointerId) return

      pressActive = false
      const wasDragging = isDragging
      isDragging = false
      pointerId = null
      targetScroll = track.scrollLeft
      section.classList.remove('is-dragging')
      track.style.cursor = ''
      if (wasDragging) {
        try {
          track.releasePointerCapture(e.pointerId)
        } catch {
          /* already released */
        }
      }
    }

    const onClickCapture = (e) => {
      if (!moved) return
      e.preventDefault()
      e.stopPropagation()
      moved = false
    }

    // Sync target after native touch / programmatic scroll settles
    const onScroll = () => {
      if (!isDragging && !rafId) targetScroll = track.scrollLeft
    }

    const onDragStart = (e) => e.preventDefault()

    section.addEventListener('wheel', onWheel, { passive: false })
    track.addEventListener('pointerdown', onPointerDown)
    track.addEventListener('pointermove', onPointerMove)
    track.addEventListener('pointerup', endDrag)
    track.addEventListener('pointercancel', endDrag)
    track.addEventListener('lostpointercapture', endDrag)
    track.addEventListener('scroll', onScroll, { passive: true })
    track.addEventListener('dragstart', onDragStart)
    section.addEventListener('click', onClickCapture, true)

    return () => {
      stopSmooth()
      section.removeEventListener('wheel', onWheel)
      track.removeEventListener('pointerdown', onPointerDown)
      track.removeEventListener('pointermove', onPointerMove)
      track.removeEventListener('pointerup', endDrag)
      track.removeEventListener('pointercancel', endDrag)
      track.removeEventListener('lostpointercapture', endDrag)
      track.removeEventListener('scroll', onScroll)
      track.removeEventListener('dragstart', onDragStart)
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
