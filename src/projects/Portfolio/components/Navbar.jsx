import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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
    setMobileMenuOpen(false);
    if (window.lenis) {
      window.lenis.scrollTo(target, { offset: 0 });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled || mobileMenuOpen ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link 
            to="/work/smilecare" 
            onClick={(e) => {
              if (window.location.pathname === '/work/smilecare') {
                e.preventDefault();
                setMobileMenuOpen(false);
                if (window.lenis) window.lenis.scrollTo(0, { offset: 0 });
              }
            }}
            className="font-bodoni text-2xl font-bold tracking-wider uppercase z-50 relative"
          >
            Eternis
          </Link>
          <div className="hidden md:flex items-center space-x-8 font-inter text-sm tracking-widest text-white/70">
            <a href="#collections" onClick={(e) => handleNavClick(e, '#collections')} className="hover:text-white transition-colors cursor-pointer">COLLECTIONS</a>
            <a href="#heritage" onClick={(e) => handleNavClick(e, '#heritage')} className="hover:text-white transition-colors cursor-pointer">HERITAGE</a>
            <a href="#craft" onClick={(e) => handleNavClick(e, '#craft')} className="hover:text-white transition-colors cursor-pointer">CRAFT</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-white transition-colors cursor-pointer">CONTACT</a>
          </div>
          <button 
            className="md:hidden z-50 relative text-white" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 font-inter text-lg tracking-widest text-white"
          >
            <a href="#collections" onClick={(e) => handleNavClick(e, '#collections')} className="hover:text-amber-500 transition-colors cursor-pointer">COLLECTIONS</a>
            <a href="#heritage" onClick={(e) => handleNavClick(e, '#heritage')} className="hover:text-amber-500 transition-colors cursor-pointer">HERITAGE</a>
            <a href="#craft" onClick={(e) => handleNavClick(e, '#craft')} className="hover:text-amber-500 transition-colors cursor-pointer">CRAFT</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-amber-500 transition-colors cursor-pointer">CONTACT</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
