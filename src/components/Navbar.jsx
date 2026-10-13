import React, { useRef } from 'react'
import Sidebar from './Sidebar'



const EMAIL = 'chinmayshinde793@gmail.com'
const Navbar = ({ navRef }) => {


  const sidebarRef = useRef(null)
  return (
    <div className="relative z-30">
      <nav
        ref={navRef}
        className="fixed top-6 left-1/2 z-30 flex w-[92%] max-w-6xl -translate-x-1/2
                   items-center justify-between rounded-full border border-white/20
                   bg-black/30 px-4 py-3 text-white backdrop-blur-md
                   sm:top-8 sm:w-[90%] sm:px-6"
      >
        {/* Left - name/logo */}
        <span className="font-logo text-base font-semibold sm:text-lg">Chinmay Shinde</span>

        {/* Center - nav links */}
        <div className="hidden gap-8 font-body text-sm md:flex">
          <a href="#home" className="hover:text-gray-300">Home</a>
          <a href="#about" className="hover:text-gray-300">About</a>
          <a href="#demo" className="hover:text-gray-300">Demo</a>
          <a href="#work" className="hover:text-gray-300">Work</a>
          <a href="#contact" className="hover:text-gray-300">Contact</a>
        </div>

        {/* Right - icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">

            <a
          href={`mailto:${EMAIL}`}
        
        >
          <i className="ri-mail-line shrink-0 text-base" />
          
        </a>

          </button>
          <button 
          onClick={()=>{
          sidebarRef.current?.open()
          }}
          
          
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20  cursor-pointer active:scale-95">
            <i className="ri-menu-line"></i>
          </button>
        </div>
      </nav>

      <Sidebar ref={sidebarRef} />
    </div>
  )
}

export default Navbar