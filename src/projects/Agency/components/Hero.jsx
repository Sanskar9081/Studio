import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef(null);

  // We track scroll progress over the 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Clip path circle expands from 10% to 150% radius
  const clipPathSize = useTransform(scrollYProgress, [0, 1], ["circle(10% at 50% 50%)", "circle(150% at 50% 50%)"]);
  
  // Subtle background zoom
  const scaleOutline = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const scaleRealistic = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#0c1128]" id="home">
      {/* Sticky container that stays in view while scrolling the 300vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Base Layer: Sketch Outline */}
        <motion.div 
          style={{ scale: scaleOutline }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img 
            src="https://strvid.nyc3.cdn.digitaloceanspaces.com/cloudinary/hero_city_outline_fzg37d.jpg" 
            alt="City Outline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
            <h1 className="font-outfit font-black text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] tracking-tighter leading-none text-white/90 uppercase break-words w-full">
              Imagine<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">The Future</span>
            </h1>
          </div>
        </motion.div>

        {/* Top Layer: Realistic City (Revealed via Clip Path) */}
        <motion.div 
          style={{ clipPath: clipPathSize, scale: scaleRealistic }}
          className="absolute inset-0 w-full h-full z-30"
        >
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img 
            src="https://strvid.nyc3.cdn.digitaloceanspaces.com/cloudinary/hero_city_iglhwn.jpg" 
            alt="Realistic City"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
            <h1 className="font-outfit font-black text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] tracking-tighter leading-none text-white uppercase drop-shadow-2xl break-words w-full">
              Build<br/>The Reality
            </h1>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

      </div>
    </section>
  );
}
