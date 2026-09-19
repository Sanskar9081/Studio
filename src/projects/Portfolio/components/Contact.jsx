import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section id="contact" className="bg-black pt-32 pb-10 px-6 border-t border-white/5 relative z-10">
      <div className="container mx-auto max-w-4xl">
        
        <motion.div 
          ref={ref}
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="font-bodoni text-5xl md:text-6xl text-white mb-4">Request a Consultation</h2>
          <p className="font-inter text-white/60">Reserve a private viewing at one of our global boutiques.</p>
        </motion.div>

        <motion.form 
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="space-y-12 mb-32"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative">
              <input 
                type="text" 
                id="name"
                required
                className="w-full bg-transparent border-b border-white/20 py-3 text-white font-inter focus:outline-none focus:border-amber-500 transition-colors peer placeholder-transparent"
                placeholder="Name"
              />
              <label htmlFor="name" className="absolute left-0 top-3 text-white/40 font-inter text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-amber-500 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-white/60">
                Full Name
              </label>
            </div>
            
            <div className="relative">
              <input 
                type="email" 
                id="email"
                required
                className="w-full bg-transparent border-b border-white/20 py-3 text-white font-inter focus:outline-none focus:border-amber-500 transition-colors peer placeholder-transparent"
                placeholder="Email"
              />
              <label htmlFor="email" className="absolute left-0 top-3 text-white/40 font-inter text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-amber-500 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-white/60">
                Email Address
              </label>
            </div>
          </div>

          <div className="relative">
            <select 
              id="boutique"
              required
              className="w-full bg-transparent border-b border-white/20 py-3 text-white/80 font-inter focus:outline-none focus:border-amber-500 transition-colors appearance-none cursor-pointer"
            >
              <option value="" disabled selected className="bg-black text-white/40">Select a Boutique</option>
              <option value="geneva" className="bg-black text-white">Geneva, Switzerland</option>
              <option value="paris" className="bg-black text-white">Paris, France</option>
              <option value="newyork" className="bg-black text-white">New York, USA</option>
              <option value="tokyo" className="bg-black text-white">Tokyo, Japan</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white/50">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <button type="submit" className="border border-white/20 rounded-full px-12 py-4 font-inter text-sm tracking-widest uppercase text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105">
              Submit Request
            </button>
          </div>
        </motion.form>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8"
        >
          <div className="font-bodoni text-xl font-bold tracking-widest mb-4 md:mb-0">
            ETERNIS
          </div>
          <div className="flex space-x-6 text-sm font-inter text-white/40">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Journal</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
          </div>
          <div className="text-white/20 text-xs font-inter mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} Eternis. All rights reserved.
          </div>
        </motion.footer>

      </div>
    </section>
  );
}
