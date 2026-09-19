import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Bone, Dna, Gem, Leaf, BookOpen, Plus, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const chaptersData = [
  { name: "Age of Dinosaurs", image: "/museum/01.png" },
  { name: "Fossils of Ancient Life", image: "/museum/02.png" },
  { name: "Reptiles of the Mesozoic", image: "/museum/03.png" },
  { name: "Marine Fossil Gallery", image: "/museum/04.png" },
  { name: "Prehistoric Giants", image: "/museum/05.png" }
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const letterBlock = {
  initial: { y: 120, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
  }
};

function SandTransitionImage({ src, alt, className }) {
  const filterId = useRef(`sand-${Math.random().toString(36).substring(7)}`).current;
  const imageRef = useRef(null);
  
  useEffect(() => {
    let start = null;
    let animFrame = null;
    const filter = document.getElementById(filterId);
    if (!filter) return;
    
    const feDisplacement = filter.querySelector('feDisplacementMap');
    const feOffset = filter.querySelector('feOffset');
    const feBlur = filter.querySelector('feGaussianBlur');
    const feColor = filter.querySelector('feColorMatrix');

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / 900, 1);
      
      const ease = 1 - Math.pow(1 - progress, 4); // quartic out
      
      if (feDisplacement && feOffset && feBlur && feColor) {
        feDisplacement.setAttribute('scale', (progress * 150).toString());
        feOffset.setAttribute('dy', (progress * -80).toString());
        feOffset.setAttribute('dx', (Math.sin(progress * Math.PI) * 30).toString());
        feBlur.setAttribute('stdDeviation', (progress * 6).toString());
        feColor.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${1 - progress * 1.2} 0`);
      }
      
      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      }
    };
    
    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [filterId]);

  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="1.8" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feOffset in="displaced" dx="0" dy="0" result="offset" />
          <feGaussianBlur in="offset" stdDeviation="0" result="blurred" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
        </filter>
      </svg>
      <motion.img
        ref={imageRef}
        src={src}
        alt={alt}
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        initial={{ filter: `url(#${filterId})` }}
        animate={{ filter: 'none' }}
        exit={{ filter: `url(#${filterId})`, opacity: 0 }}
        transition={{ duration: 0.9 }}
        className="absolute inset-0 w-[80%] h-[80%] m-auto object-contain mix-blend-lighten"
      />
    </div>
  );
}

export default function MuseumApp() {
  const [showVideo, setShowVideo] = useState(true);
  const [activeChapter, setActiveChapter] = useState(2);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Force scroll to top when entering this project
    window.scrollTo(0, 0);

    // Override body styles to match Museum design
    document.body.style.backgroundColor = '#fcfcfc';
    document.body.style.color = '#111';
    
    const cTimer = setInterval(() => {
      setActiveChapter(prev => (prev + 1) % 5);
    }, 3500);

    return () => {
      clearInterval(cTimer);
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);

  return (
    <div className="text-[#111] overflow-x-hidden selection:bg-black selection:text-white" style={{ backgroundColor: '#fcfcfc', fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif' }}>
      
      {/* Fixed Back to Studio Button */}
      <Link 
        to="/"
        className="fixed bottom-6 left-6 md:bottom-10 md:left-[4rem] z-50 flex items-center gap-2 px-5 py-2.5 bg-black/80 backdrop-blur-md text-white rounded-full text-[10px] font-mono uppercase tracking-widest hover:bg-black hover:scale-105 transition-all shadow-lg"
      >
        <ArrowLeft size={14} />
        Back to Studio
      </Link>

      {/* SECTION 1: HERO */}
      <section className="relative w-full min-h-screen flex flex-col overflow-hidden z-10">
        {/* 1D. Background Video */}
        <AnimatePresence>
          {showVideo && (
            <motion.video
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none z-0"
              src="/museum/07.mp4"
            />
          )}
        </AnimatePresence>

        {/* 1A & 1B. Header & Sub-nav */}
        <div className="pt-6 px-6 md:px-16 z-20">
          <motion.header
            variants={{
              initial: { scale: 1.03 },
              animate: { scale: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } }
            }}
            initial="initial"
            animate="animate"
          >
            <svg viewBox="0 0 640 100" className="w-full fill-[#111]">
              {/* E */}
              <motion.g variants={letterBlock} className="origin-bottom">
                <polygon points="0,0 20,0 20,100 0,100" />
                <polygon points="20,0 160,0 160,20 20,20" />
                <polygon points="20,40 120,40 120,60 20,60" />
                <polygon points="20,80 160,80 160,100 20,100" />
              </motion.g>
              {/* X */}
              <g transform="translate(240,0)">
                <motion.g variants={letterBlock} className="origin-bottom">
                  <polygon points="0,0 25,0 160,100 135,100" />
                  <polygon points="135,0 160,0 25,100 0,100" />
                </motion.g>
              </g>
              {/* O */}
              <g transform="translate(480,0)">
                <motion.g variants={letterBlock} className="origin-bottom">
                  <polygon points="0,0 160,0 160,20 0,20" />
                  <polygon points="0,80 160,80 160,100 0,100" />
                  <polygon points="0,20 20,20 20,80 0,80" />
                  <polygon points="140,20 160,20 160,80 140,80" />
                </motion.g>
              </g>
            </svg>
          </motion.header>

          <motion.div 
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            className="flex justify-between items-start mt-8 text-[10px] md:text-[11px] font-mono tracking-[0.2em] uppercase"
          >
            <div className="w-[15%]">
              <div>Exo</div>
              <div>History</div>
              <div>Museum</div>
            </div>
            
            <div className="hidden md:block w-[5%] text-gray-400">
              <ArrowRight size={14} strokeWidth={1} />
            </div>

            <div className="flex-1 md:w-[30%] text-gray-800 leading-relaxed font-mono">
              <span className="hidden md:inline">Exploring the story of life on earth<br/>through science, discovery<br/>and wonder.</span>
              <span className="md:hidden">Exploring the story of<br/>life on earth through<br/>science, discovery<br/>and wonder.</span>
            </div>

            <div className="hidden md:block w-[5%] text-gray-400">
              <ArrowRight size={14} strokeWidth={1} />
            </div>

            <div className="hidden md:block w-[20%] text-gray-800">
              <ul className="space-y-1">
                {['Visit', 'Exhibitions', 'Discover', 'Learn', 'About'].map(link => (
                  <li key={link}><button onClick={() => document.getElementById('explore-section')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-black hover:underline">{link}</button></li>
                ))}
              </ul>
            </div>

            {/* Hamburger */}
            <button 
              className="md:hidden z-50 flex flex-col items-end gap-[6px] relative w-10 h-10 justify-center group"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className={`h-[1.5px] bg-black transition-all duration-300 ${isMobileMenuOpen ? 'w-8 rotate-45 translate-y-[3px]' : 'w-8 group-hover:w-6'}`}></div>
              <div className={`h-[1.5px] bg-black transition-all duration-300 ${isMobileMenuOpen ? 'w-8 -rotate-45 -translate-y-[4.5px]' : 'w-8 group-hover:w-10'}`}></div>
            </button>
          </motion.div>
        </div>

        {/* 1C. Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-[120px] left-0 w-full bg-[#fcfcfc] border-b border-gray-200 shadow-xl z-40 p-6"
            >
              <ul className="space-y-6 text-sm font-mono tracking-[0.2em] uppercase">
                {['Visit', 'Exhibitions', 'Discover', 'Learn', 'About'].map(link => (
                  <li key={link}><button onClick={() => { setIsMobileMenuOpen(false); document.getElementById('explore-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="block hover:text-black hover:underline">{link}</button></li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1E. Left Sidebar Content */}
        <motion.div 
          initial="initial"
          animate="animate"
          variants={{
            animate: { transition: { staggerChildren: 0.15, delayChildren: 0.6 } }
          }}
          className="px-10 md:px-16 mt-20 sm:mt-28 md:mt-32 w-[320px] z-10"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
            <span className="text-xs font-mono">01</span>
            <div className="w-16 h-[1.5px] bg-black/20"></div>
          </motion.div>
          
          <motion.h2 variants={fadeUp} className="text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] font-sans font-normal tracking-tight leading-[1] mb-6 w-full break-words">
            TIMELESS<br/>WONDERS
          </motion.h2>
          
          <motion.p variants={fadeUp} className="text-[13px] md:text-[14px] text-gray-700 font-sans w-[240px] leading-[1.6] mb-8">
            Step into the natural world and<br/>discover the stories written<br/>millions of years ago.
          </motion.p>
          
          <motion.button onClick={() => document.getElementById('explore-section')?.scrollIntoView({ behavior: 'smooth' })} variants={fadeUp} className="group relative overflow-hidden bg-[#1a1a1a] px-6 py-3.5 border border-[#1a1a1a] rounded-md shadow-sm transition-all duration-300 hover:-translate-y-[0.5px] hover:shadow-[3px_3px_0px_rgba(17,17,17,0.5)] active:translate-y-0 active:shadow-none mb-10">
            <div className="absolute inset-0 bg-[#fcfcfc] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
            <div className="relative z-10 flex items-center gap-3">
              <Leaf size={16} className="text-white group-hover:text-[#111] transition-colors duration-300 group-hover:scale-110 group-hover:-rotate-12 group-hover:-translate-y-1" />
              <span className="text-[15px] font-medium text-white group-hover:text-[#111] transition-colors duration-300">Explore Now</span>
            </div>
          </motion.button>
        </motion.div>

        {/* 1F. Right Sidebar */}
        <motion.div 
          initial="initial"
          animate="animate"
          variants={{
            animate: { transition: { staggerChildren: 0.15, delayChildren: 0.9 } }
          }}
          className="hidden md:flex flex-col absolute right-16 top-1/2 -translate-y-1/2 w-[200px] mt-12 md:mt-20 z-10"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <h3 className="text-[10px] font-bold font-mono tracking-widest uppercase mb-2">Tyrannosaurus Rex</h3>
            <p className="text-[12px] text-gray-600 leading-[1.6]">Late Cretaceous period<br/>68-66 million years ago</p>
          </motion.div>
          
          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 border-t border-black/10 pt-4 mb-6">
            <div>
              <div className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-1">Length</div>
              <div className="text-[13px] font-medium">12.3 m</div>
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-1">Height</div>
              <div className="text-[13px] font-medium">4.0 m</div>
            </div>
          </motion.div>
          
          <motion.button variants={fadeUp} className="group flex items-center gap-3 w-max">
            <div className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center transition-all duration-300 group-hover:bg-[#111] group-hover:border-black">
              <Plus size={16} strokeWidth={1.5} className="transition-colors duration-300 group-hover:text-white" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest font-bold">View Details</span>
          </motion.button>
        </motion.div>

      </section>

      {/* SECTION 2: EXPLORE OUR WORLD */}
      <section id="explore-section" className="relative w-full min-h-[75vh] md:min-h-screen bg-[#fcfcfc] flex flex-col items-center pt-24 md:pt-32 pb-0 z-20 px-6">
        <div className="text-[10px] md:text-[11px] font-mono tracking-[0.2em] mb-12">
          <span className="text-gray-500">[ 02 ] </span>
          <span className="text-gray-900 font-bold uppercase">Explore Our World</span>
        </div>

        <motion.h2 
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-[2.2rem] md:text-[3.5rem] lg:text-[4.2rem] leading-[1.1] font-sans font-medium tracking-tight text-[#111] max-w-[1000px] text-center mb-12"
        >
          Unearth the stories of our planet's past<br className="hidden md:block"/> through fossils, minerals, and ancient wonders.
        </motion.h2>

        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={{
            animate: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
          }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 md:mb-24 max-w-[800px]"
        >
          {[
            { name: "Dinosaurs", icon: Bone },
            { name: "Ancient Life", icon: Dna },
            { name: "Minerals", icon: Gem },
            { name: "Fossils", icon: Leaf },
            { name: "Learn More", icon: BookOpen }
          ].map((pill, idx) => (
            <motion.button 
              key={idx}
              variants={fadeUp}
              className="group flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2 text-[11px] font-medium uppercase tracking-wider bg-white/50 backdrop-blur-sm text-gray-800 transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
            >
              <pill.icon size={14} strokeWidth={2} className="group-hover:text-white" />
              {pill.name}
            </motion.button>
          ))}
        </motion.div>

        <div className="min-h-[220px] md:min-h-[450px] w-full relative">
          <div className="absolute bottom-8 md:bottom-12 left-0 w-full px-8 md:px-16 flex justify-between pointer-events-none hidden md:flex text-[10px] font-mono tracking-widest uppercase text-gray-500 font-medium">
            <span>WE DON'T JUST TELL STORIES.</span>
            <span>PALEONTOLOGY (C) 2026</span>
          </div>
        </div>
      </section>

      {/* SECTION 3: ANCIENT COLLECTION */}
      <section className="relative w-full bg-[#0a0a0a] text-white flex flex-col z-30">
        
        {/* Overlapping Pterodactyl */}
        <motion.img
          initial={{ y: "-65%", opacity: 0 }}
          whileInView={{ y: "-78%", opacity: 1 }}
          viewport={{ margin: "100px" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          src="/museum/06.png"
          alt="Pterodactyl"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[160vw] md:w-[1100px] pointer-events-none z-0"
        />

        <div className="px-8 md:px-16 pt-32 md:pt-48 mb-16 z-10 flex flex-col xl:flex-row justify-between relative mt-[10vw]">
          <div className="xl:w-[60%]">
            <h2 className="text-[1.8rem] md:text-[3rem] lg:text-[3.8rem] xl:text-[4rem] leading-[1.15] font-sans font-medium tracking-tight text-white mb-8">
              Curated from millions of years of wonder 
              <div className="inline-flex gap-2 md:gap-3 align-middle mx-2 md:mx-4 translate-y-[-4px]">
                {[Bone, Dna, Leaf].map((Icon, i) => (
                  <div key={i} className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-gray-600 bg-black text-gray-400 flex items-center justify-center transition-colors duration-300 hover:bg-white hover:text-black hover:border-white">
                    <Icon size={22} />
                  </div>
                ))}
              </div>
              & discovery.
            </h2>
          </div>
          
          <div className="xl:w-[35%] flex flex-col xl:items-end xl:text-right mt-8 xl:mt-0">
            <p className="text-[9px] md:text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-6 leading-relaxed">
              WE DON'T JUST DISPLAY FOSSILS<br/>WE SHARE EARTH'S STORY
            </p>
            <div className="flex flex-wrap gap-3 xl:justify-end">
              {['Educational', 'Authentic', 'Inspiring'].map(tag => (
                <div key={tag} className="px-5 py-2 rounded-full border border-gray-600 text-[9px] font-mono tracking-widest uppercase text-gray-300 hover:bg-white hover:text-black hover:border-white transition-colors duration-300 cursor-default">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-gray-800 relative z-10"></div>

        <div className="flex flex-col md:flex-row relative z-10">
          
          {/* Left Split: Image Display */}
          <div className="w-full md:w-[35%] border-b md:border-b-0 md:border-r border-gray-800 min-h-[400px] md:min-h-[500px] flex flex-col p-8 relative">
            <div className="text-gray-500 text-xl tracking-[0.3em]">***</div>
            
            <div className="flex-1 relative flex items-center justify-center py-12">
              <AnimatePresence mode="wait">
                <SandTransitionImage 
                  key={activeChapter} 
                  src={chaptersData[activeChapter].image} 
                  alt={chaptersData[activeChapter].name} 
                  className="w-full h-full absolute inset-0"
                />
              </AnimatePresence>
            </div>
            
            <div className="text-[10px] font-mono tracking-widest text-[#888] uppercase flex items-center gap-2 relative overflow-hidden h-[15px]">
              <AnimatePresence mode="popLayout">
                <motion.span 
                  key={activeChapter}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-block"
                >
                  0{activeChapter + 1}
                </motion.span>
              </AnimatePresence>
              <span className="text-[#333]">/</span> 05
            </div>
          </div>

          {/* Right Split: Chapters */}
          <div className="w-full md:w-[65%] flex flex-col">
            <div className="border-b border-gray-800 p-8 text-[10px] font-mono text-gray-400 tracking-widest flex justify-between items-center">
              <span>Explore the past. Understand the present.</span>
              <div className="relative w-[80px] h-[15px] flex justify-end">
                <AnimatePresence mode="popLayout">
                  <motion.span 
                    key={activeChapter}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                  >
                    Chapter 0{activeChapter + 1}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            
            <div className="flex flex-col px-8">
              {chaptersData.map((chap, i) => {
                const isActive = activeChapter === i;
                return (
                  <div 
                    key={i} 
                    onClick={() => setActiveChapter(i)}
                    className={`border-b border-gray-800/80 py-8 flex justify-between items-center cursor-pointer transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#444] hover:text-[#999]'}`}
                  >
                    <h3 className="text-2xl md:text-[2rem] font-medium tracking-tight">{chap.name}</h3>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                        >
                          <ArrowUpRight size={22} strokeWidth={1} className="text-gray-400" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer Bar */}
        <div className="w-full h-[1px] bg-gray-800 relative z-10"></div>
        <div className="px-8 py-8 text-[10px] font-mono tracking-widest text-gray-500 uppercase bg-[#0a0a0a] relative z-10">
          DIGGING INTO OUR PLANET'S PAST
        </div>

      </section>

    </div>
  );
}
