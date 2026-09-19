import React from 'react';
import { motion } from 'framer-motion';
import { Layout, PenTool, TrendingUp, Briefcase } from 'lucide-react';

const services = [
  {
    title: 'UI/UX Design',
    desc: 'Crafting intuitive and engaging digital experiences that put the user first.',
    icon: Layout,
    color: 'text-blue-400'
  },
  {
    title: 'Visual & Graphic',
    desc: 'Bold, memorable visual identities and striking graphic assets.',
    icon: PenTool,
    color: 'text-purple-400'
  },
  {
    title: 'Digital Strategy',
    desc: 'Data-driven roadmaps to position your brand for sustainable success.',
    icon: TrendingUp,
    color: 'text-pink-400'
  },
  {
    title: 'Business Growth',
    desc: 'Scaling operations and expanding reach through targeted marketing.',
    icon: Briefcase,
    color: 'text-emerald-400'
  }
];

export default function Services() {
  return (
    <section className="py-32 bg-[#0c1128]" id="services">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          duration={0.8}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest text-white/70 mb-6">
            Expertise
          </div>
          <h2 className="font-outfit font-black text-5xl md:text-6xl tracking-tighter text-white max-w-3xl mx-auto leading-[1.1]">
            Services Built Specifically for your Business
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 lg:p-12 hover:bg-white/10 transition-colors duration-500 group"
            >
              <div className="relative z-10">
                <h3 className="font-outfit font-bold text-3xl text-white mb-4">{service.title}</h3>
                <p className="font-outfit font-light text-lg text-white/60 leading-relaxed max-w-sm">
                  {service.desc}
                </p>
              </div>

              {/* Decorative Corner Icon Background */}
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                <service.icon size={64} className={`opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ${service.color}`} />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
