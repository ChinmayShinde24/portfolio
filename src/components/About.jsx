import React, { useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import AnimatedHeading from './AnimatedHeading'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const scope = useRef(null)
  const eyebrowRef = useRef(null)
  const paraRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })
    tl.from(eyebrowRef.current, { y: 20, opacity: 0, duration: 0.5 }).from(
      paraRef.current,
      { y: 20, opacity: 0, duration: 0.6 },
      '-=0.1'
    )
  }, { scope })

  return (
    <section
      ref={scope}
      className="relative w-full bg-black px-6 py-15 text-white sm:px-10 sm:py-28 md:py-32 lg:px-20"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span
          ref={eyebrowRef}
          className="mb-4 text-xs font-semibold tracking-[0.2em] text-gray-400 sm:text-sm"
        >
          ABOUT ME
        </span>

        <AnimatedHeading
          as="h2"
          className="font-logo text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-6xl"
          lines={['Inspired by Great Design,', 'Fueled by Modern Tools']}
        />

        <p
          ref={paraRef}
          className="mt-6 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base md:text-lg"
        >
          As a website developer, I bridge the gap between how a site looks and how it
          performs — writing clean, maintainable code that brings a design to life
          without cutting corners.
        </p>
      </div>
    </section>
  )
}

export default About
