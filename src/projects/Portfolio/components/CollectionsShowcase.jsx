import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

const collections = [
  {
    id: 1,
    name: "ROYAL OCEAN",
    headline: "Precision Beyond The Horizon",
    desc: "Engineered for the depths, designed for the heights. A masterpiece of aquatic resilience.",
    colorClass: "bg-aura-dark",
    img: "https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/watch_blue.png",
    specs: {
      movement: "Automatic Calibre 400",
      reserve: "120 Hours",
      material: "Grade 5 Titanium",
      water: "300m / 1000ft"
    }
  },
  {
    id: 2,
    name: "SAHARA HERITAGE",
    headline: "Timeless As The Desert Winds",
    desc: "Warm tones meet cold precision. An homage to the early explorers of the golden sands.",
    colorClass: "bg-elixir-dark",
    img: "https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/watch_desert.png",
    specs: {
      movement: "Manual Wind Calibre 21",
      reserve: "72 Hours",
      material: "18k Rose Gold",
      water: "50m / 164ft"
    }
  },
  {
    id: 3,
    name: "ROSE ELEGANCE",
    headline: "Luxury Worn Like Jewelry",
    desc: "A delicate balance of haute horlogerie and fine jewelry making. Set with flawless diamonds.",
    colorClass: "bg-rose-dark",
    img: "https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/watch_rose.png",
    specs: {
      movement: "Ultra-thin Auto Cal 12",
      reserve: "48 Hours",
      material: "Platinum & Rose Gold",
      water: "30m / 100ft"
    }
  },
  {
    id: 4,
    name: "NOIR CRIMSON",
    headline: "Built For Passion And Power",
    desc: "A bold statement on the wrist. High-performance chronographs for the racetrack.",
    colorClass: "bg-red-950",
    img: "https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/watch_sensual.png",
    specs: {
      movement: "Flyback Chrono Cal 89",
      reserve: "65 Hours",
      material: "Carbon Composite",
      water: "100m / 330ft"
    }
  }
];

export default function CollectionsShowcase() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=2000",
      pin: true,
      onUpdate: (self) => {
        // Map progress (0-1) to our 4 items (0,1,2,3)
        const progress = self.progress;
        let newIndex = Math.floor(progress * collections.length);
        if (newIndex >= collections.length) newIndex = collections.length - 1;
        
        if (newIndex !== activeIndexRef.current) {
          activeIndexRef.current = newIndex;
          setActiveIndex(newIndex);
        }
      }
    });

    return () => trigger.kill();
  }, []);

  const activeData = collections[activeIndex];

  return (
    <div id="collections">
      <section ref={containerRef} className={`relative min-h-[120vh] lg:h-screen lg:min-h-0 w-full flex items-center overflow-hidden transition-colors duration-1000 ${activeData.colorClass} py-20 lg:py-0`}>
        
        {/* Particles Overlay (Pointer events none) */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="particles" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#FFFFFF" opacity="0.5"/>
                <circle cx="20" cy="30" r="1" fill="#FFFFFF" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#particles)" />
          </svg>
        </div>

        <div className="container mx-auto px-6 h-full flex flex-col lg:flex-row relative z-10 gap-10 lg:gap-0">
          
          {/* Left Column: Info */}
          <div className="w-full lg:w-1/3 h-auto lg:h-full flex flex-col justify-center relative z-20 mt-10 lg:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`left-${activeData.id}`}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="text-white/40 font-bodoni text-xl mb-4">0{activeData.id}</div>
                <h2 className="font-bodoni text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                  {activeData.name}
                </h2>
                <p className="font-inter text-lg text-white/80 font-medium mb-10">
                  {activeData.headline}
                </p>
                <button className="border border-white/20 rounded-full px-8 py-4 font-inter text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 hover:scale-105">
                  Discover Collection
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center Column: Massive Image */}
          <div className="w-full lg:w-1/3 h-[50vh] lg:h-full relative flex items-center justify-center z-10">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={`img-${activeData.id}`}
                src={activeData.img}
                alt={activeData.name}
                className="absolute w-[80%] lg:w-auto h-[120%] lg:h-[150%] max-w-none object-contain"
                initial={{ y: "100%", opacity: 0, scale: 0.8 }}
                animate={{ y: "0%", opacity: 1, scale: 1 }}
                exit={{ y: "-100%", opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
              />
            </AnimatePresence>
          </div>

          {/* Right Column: Specs */}
          <div className="w-full lg:w-1/3 h-auto lg:h-full flex flex-col justify-center relative z-20 lg:pl-32 mb-10 lg:mb-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`right-${activeData.id}`}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              >
                <p className="font-inter text-white/60 leading-relaxed mb-12">
                  {activeData.desc}
                </p>
                
                <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                  <div>
                    <div className="text-white/40 text-xs font-inter uppercase tracking-wider mb-2">Movement</div>
                    <div className="text-white font-inter text-sm">{activeData.specs.movement}</div>
                  </div>
                  <div>
                    <div className="text-white/40 text-xs font-inter uppercase tracking-wider mb-2">Power Reserve</div>
                    <div className="text-white font-inter text-sm">{activeData.specs.reserve}</div>
                  </div>
                  <div>
                    <div className="text-white/40 text-xs font-inter uppercase tracking-wider mb-2">Case Material</div>
                    <div className="text-white font-inter text-sm">{activeData.specs.material}</div>
                  </div>
                  <div>
                    <div className="text-white/40 text-xs font-inter uppercase tracking-wider mb-2">Water Resistance</div>
                    <div className="text-white font-inter text-sm">{activeData.specs.water}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>
    </div>
  );
}
