// ContactSection.jsx
import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import AnimatedHeading from './AnimatedHeading'

gsap.registerPlugin(ScrollTrigger)

const EMAIL = 'chinmayshinde793@gmail.com'
const PHONE = '+91 8369025524'

const ContactSection = () => {
  const sectionRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const infoRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
        toggleActions: 'play none none none',
      },
    })

    tl.from(subRef.current, { y: 20, opacity: 0, duration: 0.6 })
      .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
      .from(infoRef.current.children, {
        y: 15,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
      }, '-=0.2')
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-white text-black px-5 py-20 text-center sm:px-6 sm:py-32"
    >
      <AnimatedHeading
        as="h2"
        className="mx-auto max-w-3xl font-heading text-2xl font-semibold leading-snug text-black xs:text-3xl sm:text-4xl md:text-5xl"
        text="Ready to start building?"
      />

      <p
        ref={subRef}
        className="mx-auto mt-4 max-w-xs text-sm text-black/60 sm:mt-5 sm:max-w-md sm:text-base"
      >
        Let's talk about your project. No pressure, just a conversation about what's possible.
      </p>

      <a
        ref={ctaRef}
        href={`mailto:${EMAIL}`}
        className="mt-7 inline-flex items-center gap-2 rounded-full border border-black/20 px-6 py-3 text-xs font-semibold tracking-wide text-black transition-colors hover:bg-black hover:text-white sm:mt-8 sm:px-8 sm:py-3.5 sm:text-sm md:text-base"
      >
        SAY HELLO
      </a>

      <div
        ref={infoRef}
        className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-3 text-xs text-black/70 sm:mt-12 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-8 sm:text-sm"
      >
        <a
          href={`mailto:${EMAIL}`}
          className="flex items-center gap-2 break-all transition-colors hover:text-white"
        >
          <i className="ri-mail-line shrink-0 text-base" />
          {EMAIL}
        </a>

        <a
          href={`tel:${PHONE.replace(/\s+/g, '')}`}
          className="flex items-center gap-2 whitespace-nowrap transition-colors hover:text-white"
        >
          <i className="ri-phone-line shrink-0 text-base" />
          {PHONE}
        </a>

        <span className="flex items-center gap-2 text-center">
          <i className="ri-map-pin-line shrink-0 text-base" />
          Mumbai, Maharashtra
        </span>
      </div>
    </section>
  )
}

export default ContactSection