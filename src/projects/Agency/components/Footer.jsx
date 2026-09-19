import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="pt-32 pb-12 bg-[#0c1128] border-t border-white/10" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Massive CTA */}
        <div className="flex flex-col items-center text-center mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-outfit font-black text-5xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tighter text-white mb-10 w-full break-words"
          >
            Let's create<br/>something epic.
          </motion.h2>
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white text-black px-10 py-5 rounded-full font-outfit text-lg font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            Start a Project
          </motion.button>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 border-b border-white/10 pb-20">
          <div className="lg:col-span-1">
            <a href="#home" className="font-outfit text-3xl font-black tracking-tighter text-white block mb-6">LUMINA.</a>
            <p className="font-outfit font-light text-white/50 mb-6 max-w-xs">
              Elevating brands through strategic design and robust engineering.
            </p>
          </div>
          
          <div>
            <h4 className="font-outfit font-bold text-white mb-6 uppercase tracking-widest text-sm">Navigation</h4>
            <ul className="space-y-4 font-outfit text-white/60">
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#work" className="hover:text-white transition-colors">Work</a></li>
              <li><a href="#agency" className="hover:text-white transition-colors">Agency</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-outfit font-bold text-white mb-6 uppercase tracking-widest text-sm">Socials</h4>
            <ul className="space-y-4 font-outfit text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter (X)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dribbble</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-outfit font-bold text-white mb-6 uppercase tracking-widest text-sm">Locations</h4>
            <ul className="space-y-4 font-outfit text-white/60">
              <li>New York, NY</li>
              <li>London, UK</li>
              <li>Tokyo, JP</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center font-outfit text-sm text-white/40">
          <div>&copy; {new Date().getFullYear()} Lumina Digital. All rights reserved.</div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
