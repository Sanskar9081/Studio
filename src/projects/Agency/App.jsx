import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Clients from './components/Clients';
import Services from './components/Services';
import Work from './components/Work';
import About from './components/About';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function AgencyApp() {
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
    window.lenis = lenis;
    lenis.scrollTo(0, { immediate: true });

    lenis.on('scroll', ScrollTrigger.update);

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
    <div className="bg-[#0c1128] text-white min-h-screen font-outfit selection:bg-blue-500/30">
      <Navbar />
      <Hero />
      <Clients />
      <Services />
      <Work />
      <About />
      <Footer />

      <Link 
        to="/" 
        className="fixed bottom-8 left-8 z-50 flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full font-outfit text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 shadow-lg shadow-black/20"
      >
        <ArrowLeft size={16} />
        Back to Studio
      </Link>
    </div>
  );
}
