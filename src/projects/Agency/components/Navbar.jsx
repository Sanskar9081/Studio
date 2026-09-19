import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    if (window.lenis) {
      window.lenis.scrollTo(target, { offset: 0 });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-6 left-1/2 w-[90%] max-w-5xl z-50 transition-all duration-500 overflow-hidden ${
        scrolled 
          ? 'bg-white/[0.08] backdrop-blur-[24px] border border-white/10 shadow-2xl' 
          : 'bg-white/[0.02] backdrop-blur-[8px] border border-white/5'
      } ${mobileMenuOpen ? 'rounded-3xl' : 'rounded-full'}`}
    >
      <div className="px-6 py-4 grid grid-cols-2 md:grid-cols-3 items-center">
        {/* Left: Logo */}
        <div className="flex justify-start">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, 0)}
            className="font-outfit text-xl font-bold tracking-tighter text-white"
          >
            LUMINA.
          </a>
        </div>

        {/* Center: Desktop Menu */}
        <div className="hidden md:flex justify-center items-center space-x-8 font-outfit text-sm font-medium text-white/70">
          {['Services', 'Work', 'Agency', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
              className="group relative hover:text-white transition-colors whitespace-nowrap"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Right: CTA & Mobile Toggle */}
        <div className="flex justify-end items-center">
          <button className="hidden md:flex bg-white text-black px-6 py-2 rounded-full font-outfit text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Start Project
          </button>
          
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: mobileMenuOpen ? 'auto' : 0 }}
        className="md:hidden overflow-hidden"
      >
        <div className="px-6 pb-6 flex flex-col space-y-4">
          {['Services', 'Work', 'Agency', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                handleNavClick(e, `#${item.toLowerCase()}`);
                setMobileMenuOpen(false);
              }}
              className="font-outfit text-lg font-medium text-white/70 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
          <button className="bg-white text-black px-6 py-3 rounded-full font-outfit text-sm font-bold w-full mt-4">
            Start Project
          </button>
        </div>
      </motion.div>
    </motion.nav>
  );
}
