import React, { forwardRef, useRef, useEffect, useImperativeHandle } from 'react'
import gsap from 'gsap'

const Sidebar = forwardRef((props, ref) => {
  const containerRef = useRef(null)
  const linksRef = useRef([])
 
  const tl = useRef(null)

  const addLinkRef = (el) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el)
    }
  }

  useEffect(() => {
    if (!containerRef.current) return

    gsap.set(containerRef.current, { xPercent: 100 })
    gsap.set(linksRef.current, { x: 120, opacity: 0 })

    tl.current = gsap.timeline({ paused: true })
      .to(containerRef.current, { xPercent: 0, duration: 0.7, ease: 'power3.out' })
      .to(linksRef.current, { x: 0, opacity: 1, duration: 0.45, stagger: 0.1, ease: 'power3.out' })
    

    return () => tl.current?.kill()
  }, [])

  useImperativeHandle(ref, () => ({
    open: () => tl.current?.play(),
    close: () => tl.current?.reverse(),
  }))

  return (
    <div
      ref={containerRef}
      className="fixed right-0 top-0 z-40 flex h-screen w-[85%] max-w-sm min-w-65
                 flex-col rounded-l-3xl border-l border-white/10 bg-black/40
                 px-6 py-8 text-white shadow-2xl backdrop-blur-xl
                 sm:w-[60%] sm:px-8 md:w-[45%] lg:w-[35%]"
    >
      {/* Close icon */}
      <div className="flex justify-end">
        <button
          onClick={() => tl.current.reverse()}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
        >
          <i className="ri-close-line text-xl"></i>
        </button>
      </div>

      {/* Nav links */}
      <nav className="mt-14 flex flex-col gap-5 font-body text-xl sm:mt-20 sm:gap-6 sm:text-3xl">
        <a ref={addLinkRef} href="#home" className="hover:text-gray-400 font-body">Home</a>
        <a ref={addLinkRef} href="#about" className="hover:text-gray-400 font-body">About</a>
        <a ref={addLinkRef} href="#demo" className="hover:text-gray-400 font-body">Demo</a>
        <a ref={addLinkRef} href="#work" className="hover:text-gray-400 font-body">Work</a>
        <a ref={addLinkRef} href="#contact" className="hover:text-gray-400 font-body">Contact</a>
      </nav>

      {/* Socials */}
      <div   className="mt-auto flex gap-4 border-t border-white/10 pt-8">
        <a href="https://github.com/ChinmayShinde24" target="_blank" rel="noreferrer"
           className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
          <i className="ri-github-fill text-lg"></i>
        </a>
        <a href="https://www.linkedin.com/in/chinmay-shinde-143157239" target="_blank" rel="noreferrer"
           className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
          <i className="ri-linkedin-fill text-lg"></i>
        </a>
      </div>
    </div>
  )
})

export default Sidebar