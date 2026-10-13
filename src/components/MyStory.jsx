import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import profile480Avif from '../assets/images/profile/profile-480.avif'
import profile480Webp from '../assets/images/profile/profile-480.webp'
import profile768Avif from '../assets/images/profile/profile-768.avif'
import profile768Webp from '../assets/images/profile/profile-768.webp'
import profile792Avif from '../assets/images/profile/profile-792.avif'
import profile792Webp from '../assets/images/profile/profile-792.webp'

gsap.registerPlugin(ScrollTrigger)

const journeySteps = [
  "My journey in software development has been driven by a passion for building practical solutions. I've grown into a full-stack developer, turning ideas into real-world web applications.",
  "Working with the MERN stack, TypeScript, and Next.js, I've built applications, developed APIs, and worked with deployments using AWS, Docker, and Vercel.",
  "I'm now expanding into Generative AI, exploring RAG, vector embeddings, and AI-powered applications while continuing to build scalable, impactful products.",
]

const Journey = () => {
  const scope = useRef(null)
  const imageRef = useRef(null)
  const stepsRef = useRef([])
  stepsRef.current = []

  const addStepRef = (el) => {
    if (el && !stepsRef.current.includes(el)) stepsRef.current.push(el)
  }

  useGSAP(() => {
    const mm = gsap.matchMedia()

    // Desktop — pinned, scroll-scrubbed story
    mm.add('(min-width: 1024px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: true,
          anticipatePin: 1,
        },
      })

      tl.fromTo(
        imageRef.current,
        { clipPath: 'inset(15% 15% 15% 15% round 24px)', scale: 1.15 },
        { clipPath: 'inset(0% 0% 0% 0% round 24px)', scale: 1, duration: 1 }
      )

      stepsRef.current.forEach((step, i) => {
        tl.fromTo(
          step,
          { opacity: 0, y: 30, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 },
          i === 0 ? '>' : '+=0.3'
        )
      })
    })

    // Tablet + Mobile — no pin, side-by-side (or stacked) layout, lighter reveal-on-enter
    mm.add('(max-width: 1023px)', () => {
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(15% 15% 15% 15% round 24px)', scale: 1.1 },
        {
          clipPath: 'inset(0% 0% 0% 0% round 24px)',
          scale: 1,
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
            end: 'top 45%',
            scrub: true,
          },
        }
      )

      stepsRef.current.forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 30, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    })
  }, { scope })

  return (
    <section id="about"
      ref={scope}
      className="flex w-full flex-col items-center gap-10  px-6 py-16 text-white
                 sm:px-10 sm:py-20 md:flex-row md:gap-8 lg:h-screen lg:gap-0 lg:px-20 lg:py-0"
    >
      <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-10 md:mx-auto md:grid-cols-2">
        <div
          ref={imageRef}
          className="mx-auto w-full max-w-sm overflow-hidden rounded-3xl md:max-w-none"
        >
          <picture className="block h-full w-full">
            <source
              type="image/avif"
              srcSet={`${profile480Avif} 480w, ${profile768Avif} 768w, ${profile792Avif} 792w`}
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <source
              type="image/webp"
              srcSet={`${profile480Webp} 480w, ${profile768Webp} 768w, ${profile792Webp} 792w`}
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <img
              src={profile792Webp}
              alt="Profile portrait"
              className="aspect-4/5 w-full max-h-[45vh] object-contain object-center bg-zinc-900
                         sm:max-h-[50vh] md:aspect-3/4 md:max-h-[55vh] lg:h-125 lg:max-h-none lg:aspect-auto"
              loading="lazy"
            />
          </picture>
        </div>

        <div className="flex flex-col gap-5 sm:gap-6">
          <span className="text-xl font-semibold tracking-[0.2em] text-white-400 font-logo">
            MY JOURNEY
          </span>
          {journeySteps.map((text, i) => (
            <p
              key={i}
              ref={addStepRef}
              className="text-base leading-relaxed text-white-700 font-body sm:text-lg lg:text-xl"
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Journey