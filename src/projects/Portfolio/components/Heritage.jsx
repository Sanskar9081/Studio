import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Heritage() {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef([]);

  useEffect(() => {
    // Image mask reveal
    gsap.fromTo(
      imageContainerRef.current,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.5,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      }
    );

    // Image Parallax
    gsap.fromTo(
      imageRef.current,
      { y: "-10%" },
      {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );

    // Text reveal
    gsap.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        }
      }
    );

  }, []);

  return (
    <section ref={sectionRef} id="heritage" className="py-20 lg:py-32 px-6 bg-[#050505] min-h-screen flex items-center">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
        
        {/* Left: Image with Mask Reveal */}
        <div 
          ref={imageContainerRef}
          className="relative h-[60vh] w-full overflow-hidden"
          style={{ clipPath: 'inset(100% 0% 0% 0%)' }} // Initial state for JS-less flash prevention
        >
          <img 
            ref={imageRef}
            src="/images/heritage.jpg" 
            alt="Watchmaking Heritage" 
            className="absolute top-0 left-0 w-full h-[120%] object-cover grayscale mix-blend-luminosity opacity-80"
          />
        </div>

        {/* Right: Text */}
        <div className="flex flex-col justify-center">
          <div 
            ref={el => textRef.current[0] = el}
            className="text-amber-500 font-inter uppercase tracking-[0.3em] text-sm font-semibold mb-6"
          >
            Since 1884
          </div>
          <h2 
            ref={el => textRef.current[1] = el}
            className="font-bodoni text-5xl md:text-7xl font-bold text-white leading-tight mb-8"
          >
            A Legacy of<br/>Perfection
          </h2>
          <p 
            ref={el => textRef.current[2] = el}
            className="font-inter text-white/60 text-lg leading-relaxed max-w-lg mb-8"
          >
            For over a century, Eternis has stood at the vanguard of horological innovation. Born in the Swiss valleys, our ateliers preserve the sacred traditions of hand-finishing, blending ancestral techniques with absolute precision.
          </p>
          <p 
            ref={el => textRef.current[3] = el}
            className="font-inter text-white/60 text-lg leading-relaxed max-w-lg"
          >
            Every timepiece is a testament to the master artisans who pour their lives into the pursuit of exactitude, crafting not just a watch, but a fragment of eternity.
          </p>
        </div>

      </div>
    </section>
  );
}
