import React, { useRef } from 'react'
import SmokeyCursor from './components/SmokeyCursor'
import gsap from 'gsap'
import Main from './components/Main'
import Navbar from './components/Navbar'
import { useGSAP } from '@gsap/react'
import Sidebar from './components/Sidebar'
import About from './components/About'
import Work from './components/Work'
import MyStory from './components/MyStory'
import ModernProduction from './components/ModernProduction'
import WhiteRevealPanel from './components/WhiteRevealPanel'
import Practice from './components/Practice'
import AboutIntro from './components/AboutIntro'
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import FloatingSocials from './components/FloatingSocials'



const App = () => {


  useEffect(() => {
  const refresh = () => {
    console.log('refreshed');
    ScrollTrigger.refresh();
  }
  window.addEventListener("load", refresh);
  return () => window.removeEventListener("load", refresh);
}, []);



 const containerRef = useRef(null);
 const navRef = useRef(null);
 const headingRef = useRef(null);
 const paraRef = useRef(null);
 const mobileRef = useRef(null);
 const lgparaRef = useRef(null);
 const buttonsRef = useRef(null);

 useGSAP(()=>{
  const tl = gsap.timeline({defaults:{ease:'power3.out'}})

tl.from(headingRef.current,{
  xPercent : -100,
  opacity:0,
  duration:1,
})
.from(navRef.current,{
  yPercent: -100,
  opacity:0,
duration:1,
}, '-=0.5')
.from(paraRef.current,{
  opacity:0,
  y:20, 
  duration:0.5,
}, '-=0.3')
.from([mobileRef.current, lgparaRef.current], {
        opacity: 0,
        y: 20,
        duration: 0.4,
      }, "-=0.2")
.from(buttonsRef.current.children,{
  opacity:0,
  y:20,
  duration:0.3,
  stagger: 0.15,
}, "-=0.2")




 },{scope:containerRef})


 

  return (
    <div ref={containerRef} className="relative min-h-screen ">
      <SmokeyCursor />
      <FloatingSocials />
      
      <Navbar navRef={navRef}/>
      
      <Main
      headingRef ={headingRef}
      paraRef={paraRef}
      mobileRef={mobileRef}
      lgparaRef={lgparaRef}
      buttonsRef={buttonsRef}
      />

      <About/>
      <Work/>
      <MyStory/>
      <ModernProduction/>
     <WhiteRevealPanel/>

  <Practice/>

  <AboutIntro/>
  <ContactSection/>
  <Footer/>
     
    </div>
  )
}

export default App