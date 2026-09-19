import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="py-32 bg-[#0c1128] relative overflow-hidden" id="agency">
      
      {/* Background Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Bold Statement */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest text-white/70 mb-8">
              The Agency
            </div>
            <h2 className="font-outfit font-black text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.1] text-white">
              Design is not just what it looks like. It's how it <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">feels.</span>
            </h2>
          </motion.div>

          {/* Right: Info & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col space-y-10"
          >
            <p className="font-outfit font-light text-xl md:text-2xl text-white/70 leading-relaxed">
              We are a collective of digital craftsmen. We blur the lines between design, engineering, and strategy to build digital products that drive growth and inspire emotion.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div>
                <div className="font-outfit font-black text-5xl md:text-6xl text-white mb-2">10+</div>
                <div className="font-outfit font-bold text-sm tracking-widest text-white/50 uppercase">Years Experience</div>
              </div>
              <div>
                <div className="font-outfit font-black text-5xl md:text-6xl text-white mb-2">150+</div>
                <div className="font-outfit font-bold text-sm tracking-widest text-white/50 uppercase">Global Clients</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
