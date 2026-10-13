import React from 'react'
import mainimage480Avif from '../assets/images/mainimage/mainimage-480.avif'
import mainimage480Webp from '../assets/images/mainimage/mainimage-480.webp'
import mainimage768Avif from '../assets/images/mainimage/mainimage-768.avif'
import mainimage768Webp from '../assets/images/mainimage/mainimage-768.webp'
import mainimage1446Avif from '../assets/images/mainimage/mainimage-1446.avif'
import mainimage1446Webp from '../assets/images/mainimage/mainimage-1446.webp'
import mobile480Avif from '../assets/images/mobileImage/mobileImage-480.avif'
import mobile480Webp from '../assets/images/mobileImage/mobileImage-480.webp'
import mobile768Avif from '../assets/images/mobileImage/mobileImage-768.avif'
import mobile768Webp from '../assets/images/mobileImage/mobileImage-768.webp'
import mobile853Avif from '../assets/images/mobileImage/mobileImage-853.avif'
import mobile853Webp from '../assets/images/mobileImage/mobileImage-853.webp'

import Sidebar from './Sidebar'

const Main = ({headingRef, paraRef, mobileRef, lgparaRef, buttonsRef}) => {
  return (
    <div id="home" className="p-3 mt-1.5 rounded-4xl">
      {/* side bar */}
      <div className='relative z-10 h-vh bg-white'></div>
      <section className="relative h-[94vh] w-full overflow-hidden rounded-4xl">
        <div className="absolute inset-0 h-full w-full">
          <picture className="absolute inset-0 z-0 h-full w-full block">
            {/* 1. Large Desktops & Laptops (min-width: 1024px) */}
            <source
              type="image/avif"
              media="(min-width: 1024px)"
              srcSet={mainimage1446Avif}
            />
            <source
              type="image/webp"
              media="(min-width: 1024px)"
              srcSet={mainimage1446Webp}
            />

            {/* 2. Tablets & Small Monitors (min-width: 768px) */}
            <source
              type="image/avif"
              media="(min-width: 768px)"
              srcSet={mainimage768Avif}
            />
            <source
              type="image/webp"
              media="(min-width: 768px)"
              srcSet={mainimage768Webp}
            />

            {/* 3. Phablets & Large Mobiles (min-width: 480px) */}
            <source
              type="image/avif"
              media="(min-width: 480px)"
              srcSet={mobile853Avif}
            />
            <source
              type="image/webp"
              media="(min-width: 480px)"
              srcSet={mobile853Webp}
            />

            {/* 4. Base Fallback Image for Small Mobiles - The <img> handles everything */}
            <img
              src={mobile480Webp}
              alt="Hero background"
              width={1446}
              height={1088}
              
              className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none"
              loading="eager"
            />
          </picture>
        </div>

        {/* Dark overlay — stronger on mobile so text stays readable over the image */}
        <div className="absolute inset-0 bg-black/60 sm:bg-black/30" />

        {/* Content */}
        <div className="relative z-10 flex top-[28%] flex-col items-center justify-center gap-4 px-4 text-center sm:items-start sm:px-9 sm:text-left lg:px-8">
          <h1 ref={headingRef} className="max-w-3xl font-heading text-4xl font-bold text-accent sm:text-6xl lg:text-6xl">
            Welcome to <br/> My Portfolio
          </h1>

          <p ref={paraRef} className="max-w-3xl font-body text-lg text-white sm:text-xl">
            I build interfaces, and <br className='lg:block sm:hidden'/>I build them faster with AI.
          </p>

          <p ref={mobileRef} className="max-w-3xl font-logo text-sm text-white sm:block lg:hidden md:block">
            Full stack developer who pairs hand-written code with AI tools <br />
            like Claude and Copilot — for speed, not shortcuts.
          </p>
        </div>

        {/* Content just for larger screen */}
        <div className="relative z-10 hidden gap-4 px-4 lg:block lg:absolute md:hidden lg:left-[63%] lg:top-[90%]">
          <p ref={lgparaRef} className="max-w-3xl font-logo text-sm text-white">
            Full stack developer who pairs hand-written code with AI tools <br />
            like Claude and Copilot — for speed, not shortcuts.
          </p>
        </div>
      
        {/* button */}
        <div ref={buttonsRef} className='relative z-10 top-[30%] flex justify-center gap-3 p-1 sm:justify-start lg:ml-4'>
          <a href="#contact">
            <button className='cursor-pointer rounded-4xl bg-white px-6 py-3 font-logo font-semibold text-black transition-colors hover:bg-gray-200 active:scale-95'>Contact</button>
          </a>
          <a href="#work">
            <button className='rounded-4xl border border-white/30 bg-white/10 px-6 py-3 font-logo font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 active:scale-95'>View Work</button>
          </a>
        </div>
      </section>
    </div>
  )
}

export default Main
