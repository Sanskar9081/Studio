import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Craftsmanship() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Parallax & Scale background image
    gsap.fromTo(
      bgRef.current,
      { scale: 1, y: "0%" },
      {
        scale: 1.15,
        y: "15%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );

    // Text fade in/out during the sticky scroll
    gsap.fromTo(
      textRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: "top -20%",
          scrub: true,
        }
      }
    );

    gsap.to(textRef.current, {
      opacity: 0,
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
      }
    });
  }, []);

  return (
    <section id="craft" ref={containerRef} className="relative h-[150vh] bg-black">
      
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Parallax Background */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            ref={bgRef}
            src="/images/craftsmanship.jpg" 
            alt="Watch Movement Craftsmanship" 
            className="w-full h-[120%] object-cover absolute top-[-10%] opacity-40"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Rotating Clockwork Element */}
        <div className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full border border-dashed border-white/20 animate-[spin_120s_linear_infinite] pointer-events-none" />
        <div className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full border border-dashed border-white/10 animate-[spin_90s_linear_infinite_reverse] pointer-events-none" />

        {/* Text Element */}
        <div ref={textRef} className="relative z-10 text-center px-4 w-full">
          <h2 className="font-bodoni text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight leading-none mb-6 w-full break-words">
            Unseen<br/>Precision
          </h2>
          <p className="font-inter text-white/70 text-lg max-w-md mx-auto">
            The beating heart of every Eternis timepiece consists of over 300 microscopic components, assembled perfectly by hand.
          </p>
        </div>

      </div>
      
    </section>
  );
}
