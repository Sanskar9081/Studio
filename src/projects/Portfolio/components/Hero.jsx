import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Hero() {
  const containerRef = useRef(null);
  const titlesRef = useRef([]);

  useEffect(() => {
    // Title reveal animation
    gsap.fromTo(
      titlesRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power4.out", delay: 0.5 }
    );

    // Scroll parallax scale effect
    gsap.to(containerRef.current, {
      scale: 0.85,
      opacity: 0,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        pinSpacing: false
      }
    });
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black z-0">
      
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="object-cover w-full h-full opacity-60"
        >
          <source src="https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/hero_bg_watch.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center flex flex-col items-center px-4 w-full">
        <div 
          ref={el => titlesRef.current[0] = el}
          className="font-inter text-xs md:text-base tracking-[0.2em] md:tracking-[0.4em] text-white/60 uppercase mb-8"
        >
          The Pinnacle of Swiss Watchmaking
        </div>
        <div className="flex flex-col items-center w-full">
          <h1 
            ref={el => titlesRef.current[1] = el}
            className="font-bodoni text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white font-bold leading-[0.9] w-full break-words"
          >
            Time Is
          </h1>
          <h1 
            ref={el => titlesRef.current[2] = el}
            className="font-bodoni text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white font-bold leading-[0.9] italic w-full break-words"
          >
            An Art
          </h1>
        </div>
      </div>

    </section>
  );
}
