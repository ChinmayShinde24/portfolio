import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhiteRevealPanel = () => {
  const wrapperRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        boxRef.current,
        { opacity: 1, yPercent: 50 },
        {
          opacity: 1,
          yPercent: -100,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top bottom",
            end: "top center",
            scrub: true,
           
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    // wrapper holds the actual layout space — give it whatever color should
    // show once the white box has moved away (black, to match your other sections)
    <div ref={wrapperRef} className="relative h-[30vh] overflow-hidden bg-black">
      <div ref={boxRef} className="absolute inset-0 bg-white" />
    </div>
  );
};

export default WhiteRevealPanel;