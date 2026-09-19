import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CollectionsShowcase from './components/CollectionsShowcase';
import Heritage from './components/Heritage';
import Craftsmanship from './components/Craftsmanship';
import Gallery from './components/Gallery';
import Contact from './components/Contact';

import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioApp() {
  const lenisRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    window.lenis = lenis; // Expose for Navbar scroll
    lenis.scrollTo(0, { immediate: true });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add lenis.raf to GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-inter selection:bg-amber-500/30">
      <Navbar />
      <Hero />
      <CollectionsShowcase />
      <Heritage />
      <Craftsmanship />
      <Gallery />
      <Contact />
      
      {/* Back to Studio Button */}
      <Link 
        to="/" 
        className="fixed bottom-8 left-8 z-50 flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full font-inter text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
      >
        <ArrowLeft size={16} />
        Back to Studio
      </Link>
    </div>
  );
}
