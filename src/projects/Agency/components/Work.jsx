import React, { useState } from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    name: 'Pixzen',
    category: 'Fintech App',
    image: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionitems/1781522720269-Pixzen.webp'
  },
  {
    id: 2,
    name: 'Wander',
    category: 'Travel Platform',
    image: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionitems/1781631791578-Wander_Hero.webp'
  },
  {
    id: 3,
    name: 'Agentify',
    category: 'AI Dashboard',
    image: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionitems/1781671943344-Agentify_Hero.webp'
  },
  {
    id: 4,
    name: 'Future',
    category: 'E-Commerce',
    image: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionitems/1781679053418-Future_Carousel.webp'
  },
  {
    id: 5,
    name: 'Genova',
    category: 'Real Estate',
    image: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionitems/1781670271708-Genova_Hero.webp'
  }
];

export default function Work() {
  const [activeId, setActiveId] = useState(3);

  return (
    <section className="py-32 bg-[#0c1128]" id="work">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            duration={0.8}
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest text-white/70 mb-6">
              Portfolio
            </div>
            <h2 className="font-outfit font-black text-5xl md:text-6xl tracking-tighter text-white">
              Our Works
            </h2>
          </motion.div>
          <a href="#" className="group hidden md:flex items-center gap-2 font-outfit text-sm font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors">
            View All Projects
            <span className="w-8 h-[1px] bg-white/30 group-hover:bg-white group-hover:w-12 transition-all duration-300"></span>
          </a>
        </div>

        <div className="flex flex-col lg:flex-row h-[600px] lg:h-[400px] gap-2 lg:gap-4">
          {projects.map((project) => {
            const isActive = activeId === project.id;
            
            return (
              <motion.div
                key={project.id}
                onHoverStart={() => setActiveId(project.id)}
                layout
                initial={{ flex: 1 }}
                animate={{ flex: isActive ? (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 4 : 2) : 0.8 }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className={`relative overflow-hidden rounded-3xl cursor-pointer group ${isActive ? 'bg-white/10' : 'bg-white/5'}`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 lg:p-8">
                  <div className="overflow-hidden">
                    <motion.div 
                      initial={false}
                      animate={{ 
                        y: isActive ? 0 : 20,
                        opacity: isActive ? 1 : 0.6
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <h3 className="font-outfit font-bold text-2xl lg:text-3xl text-white mb-2 whitespace-nowrap">
                        {project.name}
                      </h3>
                      
                      <motion.div 
                        initial={false}
                        animate={{ 
                          height: isActive ? 'auto' : 0,
                          opacity: isActive ? 1 : 0
                        }}
                        className="overflow-hidden"
                      >
                        <p className="font-outfit text-sm text-white/70 mb-6 uppercase tracking-widest">
                          {project.category}
                        </p>
                        <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full font-outfit text-xs font-bold hover:bg-white hover:text-black transition-all">
                          View Case Study
                        </button>
                      </motion.div>

                    </motion.div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
