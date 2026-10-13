// AboutBanner.jsx
import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import halo480Avif from '../assets/images/halo/halo-480.avif'
import halo480Webp from '../assets/images/halo/halo-480.webp'
import halo768Avif from '../assets/images/halo/halo-768.avif'
import halo768Webp from '../assets/images/halo/halo-768.webp'
import halo1024Avif from '../assets/images/halo/halo-1024.avif'
import halo1024Webp from '../assets/images/halo/halo-1024.webp'

gsap.registerPlugin(ScrollTrigger)

const AboutBanner = () => {
  const sectionRef = useRef(null)
  const badgeRef = useRef(null)
  const lineRef = useRef(null)
  const ctaRef = useRef(null)
  const imageRef = useRef(null)
  const cardRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
        toggleActions: 'play none none none',
      
      },
    })

    tl.from(badgeRef.current, { y: 15, opacity: 0, duration: 0.5, ease: 'power2.out' })
      .from(lineRef.current, { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.2')
      .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
      .from(imageRef.current, { opacity: 0, scale: 0.96, duration: 0.8, ease: 'power2.out' }, '-=0.6')
      .from(cardRef.current, { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 sm:px-10 md:flex-row md:items-center md:gap-12 md:py-24 lg:px-20">
        {/* Left: text content */}
        <div className="flex w-full flex-col items-start gap-5 text-left md:w-1/2">
          {/* Availability pill — in-flow, not floating, so it's naturally responsive */}
          <div
            ref={badgeRef}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <p className="text-xs font-medium text-white/90">
              Available for freelance work
            </p>
          </div>

          <p
            ref={lineRef}
            className="max-w-xl font-logo text-2xl font-semibold leading-snug text-white sm:text-3xl md:text-4xl"
          >
            Self-taught. Client-tested. Still learning, on purpose.
          </p>

          <a
            ref={ctaRef}
            href="/Chinmay_Shinde_Full_Stack_Developer.pdf"
            download="Chinmay_Shinde_Full_Stack_Developer.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:bg-gray-200 active:scale-95 sm:text-base"
          >
            <i className="ri-download-2-line text-base" />
            Download CV
          </a>
        </div>

        {/* Right: photo + trust card */}
        <div className="mx-auto w-full max-w-[14rem] sm:max-w-[16rem] md:mx-0 md:max-w-[18rem] lg:max-w-[20rem]">
          <div className="relative">
            {/* Photo, clean, nothing overlaid on top of the image itself */}
            <div
              ref={imageRef}
              className="aspect-square w-full max-h-[280px] overflow-hidden rounded-3xl sm:max-h-[320px] md:max-h-[340px]"
            >
              <picture className="block h-full w-full">
                <source
                  type="image/avif"
                  srcSet={`${halo480Avif} 480w, ${halo768Avif} 768w, ${halo1024Avif} 1024w`}
                  sizes="(max-width: 768px) 100vw, 20rem"
                />
                <source
                  type="image/webp"
                  srcSet={`${halo480Webp} 480w, ${halo768Webp} 768w, ${halo1024Webp} 1024w`}
                  sizes="(max-width: 768px) 100vw, 20rem"
                />
                <img
                  src={halo1024Webp}
                  alt="Profile portrait"
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </picture>
            </div>

            {/* Trust card: floats over the corner on desktop, tucked in tight */}
            <div
              ref={cardRef}
              className="static mt-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md md:absolute md:-bottom-5 md:-right-5 md:mt-0 md:w-56"
            >
              <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400/15">
                <i className="ri-chat-check-line text-sm text-emerald-400" />
              </div>
              <p className="text-sm leading-snug text-white/90">
                Clear communication, honest timelines, code you can actually maintain later.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutBanner