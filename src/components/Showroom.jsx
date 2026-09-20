import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  { 
    id: 'the-cake-room',
    name: 'THE CAKE ROOM', 
    type: 'Bakery', 
    line: 'A warm, delicious digital experience for a modern bakery.', 
    theme: '#bb675b',
    visual: '/assets/hero-projects/cake-room.png',
    video: '/assets/projects/cake-room-demo.mp4'
  },
  { 
    id: 'velora-salon',
    name: 'VELORA SALON', 
    type: 'Salon', 
    line: 'A refined digital experience for a modern salon and beauty studio.', 
    theme: '#d9a3a9',
    visual: '/assets/hero-projects/velora-salon.png',
    video: '/assets/projects/velora-salon-demo.mp4'
  },
  { 
    id: 'smilecare',
    name: 'ETERNIS', 
    type: 'Luxury Watch Maison', 
    line: 'A mesmerizing digital experience for an avant-garde luxury watch maison.', 
    theme: '#51748c',
    visual: '/assets/hero-projects/eternis.png',
    video: '/assets/projects/eternis-demo.mp4'
  },
  { 
    id: 'nexal-digital',
    name: 'LUMINA DIGITAL', 
    type: 'Digital Agency', 
    line: 'A premium, highly interactive portfolio for a modern digital agency.', 
    theme: '#0c1128',
    visual: 'https://strvid.nyc3.cdn.digitaloceanspaces.com/cloudinary/hero_city_iglhwn.jpg',
    video: '/assets/projects/lumina-digital-demo.mp4'
  },
  { 
    id: 'museum',
    name: 'EXO HISTORY MUSEUM', 
    type: 'Interactive Experience', 
    line: 'A timeless, immersive digital experience exploring the story of life on Earth.', 
    theme: '#0a0a0a',
    visual: 'https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624236/03_hcp3jc.png',
    video: '/assets/projects/exo-history-museum-demo.mp4'
  },
  { 
    id: 'halo',
    name: 'NOVA-9', 
    type: 'Audio Hardware', 
    line: 'A highly technical, poster-scale showcase for absolute audio fidelity.', 
    theme: '#E4E4E2',
    visual: '/assets/aura_audio.jpg',
    video: '/assets/projects/nova-9-demo.mp4'
  },
  { 
    id: 'neo',
    name: 'Z-SYNC', 
    type: 'Gen-Z Social', 
    line: 'Expressive, playful, and high-contrast neo-brutalist UI for the next generation.', 
    theme: '#ccff00',
    visual: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    video: '/assets/projects/z-sync-demo.mp4'
  }
];

export default function Showroom() {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const activeIndex = projects.findIndex(p => p.id === activeProject.id);

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % projects.length;
    setActiveProject(projects[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + projects.length) % projects.length;
    setActiveProject(projects[prevIndex]);
  };

  return (
    <section id="work" className="section showroom-section" style={{ position: 'relative', paddingBottom: '6rem', overflow: 'hidden' }}>
      
      {/* Ambient Background Curve */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <motion.div
          animate={{ x: ['120%', '-20%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', top: '10%', left: 0, width: '100vw', height: '600px', borderTop: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '50%', transform: 'scaleX(1.5) rotate(-5deg)', boxShadow: '0 -20px 50px rgba(59, 130, 246, 0.05)' }}
        >
          <div style={{ position: 'absolute', top: '-4px', left: '50%', width: '8px', height: '8px', background: '#3b82f6', borderRadius: '50%', boxShadow: '0 0 20px 4px rgba(59, 130, 246, 0.8)' }} />
        </motion.div>
      </div>

      <div className="section-header" style={{ marginBottom: '6rem', position: 'relative', zIndex: 10 }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--text-secondary)' }}>FEATURED WORK</div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}>
            Real businesses.<br /><span style={{ color: 'var(--text-secondary)' }}>Not imaginary projects.</span>
          </h2>
        </div>
      </div>

      <div className="showroom-content" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'center', position: 'relative', zIndex: 10 }}>
        {/* Left: Project List */}
        <div className="project-list desktop-only" style={{ borderTop: 'none' }}>
          {projects.map((project, index) => {
            const isActive = activeProject.id === project.id;
            return (
              <div 
                key={project.id}
                onMouseEnter={() => setActiveProject(project)}
                style={{
                  padding: '2rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  cursor: 'pointer',
                  opacity: isActive ? 1 : 0.4,
                  transition: 'opacity 0.4s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--accent-blue)' }}>0{index + 1}</span>
                  <span style={{ fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>— {project.type}</span>
                </div>
                <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontFamily: 'var(--font-heading)', margin: 0, textTransform: 'uppercase' }}>
                  {project.name}
                </h3>
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', marginTop: '1rem', marginBottom: '1.5rem' }}>
                        {project.line}
                      </p>
                      <Link 
                        to={`/work/${project.id}`}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#fff', textDecoration: 'none', fontSize: '0.875rem', borderBottom: '1px solid #fff', paddingBottom: '4px' }}
                      >
                        View project <ArrowRight size={14} />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        
        {/* Right: 3D Carousel Preview */}
        <div className="showroom-carousel-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="showroom-carousel" style={{ position: 'relative', width: '100%', height: '600px', perspective: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          {projects.map((project, i) => {
            // Calculate circular offset
            const offset = (i - activeIndex + projects.length) % projects.length;
            
            // Determine styles based on offset
            let x = 0;
            let z = 0;
            let rotateY = 0;
            let opacity = 0;
            let scale = 1;
            let zIndex = 0;

            if (offset === 0) { // Active
              x = '0%';
              z = 0;
              rotateY = -12;
              opacity = 1;
              scale = 1;
              zIndex = 30;
            } else if (offset === 1) { // Right (Next)
              x = '35%';
              z = -100;
              rotateY = -20;
              opacity = 0.5;
              scale = 0.85;
              zIndex = 20;
            } else if (offset === projects.length - 1) { // Left (Prev)
              x = '-45%';
              z = -150;
              rotateY = -5;
              opacity = 0.3;
              scale = 0.8;
              zIndex = 10;
            } else { // Hidden others
              x = '0%';
              z = -300;
              rotateY = 0;
              opacity = 0;
              scale = 0.5;
              zIndex = 0;
            }

            return (
              <motion.div
                key={project.id}
                animate={{
                  x,
                  z,
                  rotateY,
                  opacity,
                  scale,
                  zIndex
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  width: '90%',
                  aspectRatio: '16/10',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'var(--bg-surface)',
                  overflow: 'hidden',
                  boxShadow: offset === 0 ? '-20px 40px 80px rgba(0,0,0,0.8)' : '0 20px 40px rgba(0,0,0,0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  transformOrigin: 'center center'
                }}
              >
                <div style={{ height: '32px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '8px', background: 'rgba(255,255,255,0.05)' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }}></span>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#eab308' }}></span>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }}></span>
                </div>
                <div style={{ flex: 1, backgroundImage: `url(${project.visual})`, backgroundSize: 'cover', backgroundPosition: 'top center', overflow: 'hidden' }}>
                  {(offset === 0 || offset === 1 || offset === projects.length - 1) && project.video && (
                    <video
                      src={project.video}
                      muted
                      loop
                      playsInline
                      disablePictureInPicture
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      ref={(el) => { 
                        if (el) { 
                          el.playbackRate = 1.5; 
                          if (offset === 0) {
                            el.play().catch(() => {});
                          } else {
                            el.pause();
                          }
                        } 
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'fill', display: 'block' }}
                    />
                  )}
                  {/* Overlay for inactive items */}
                  {offset !== 0 && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />}
                </div>
              </motion.div>
            );
          })}

          {/* Handwriting Text */}
          <div style={{ position: 'absolute', bottom: '0rem', left: '-5%', fontFamily: '"Brush Script MT", cursive', color: 'rgba(255,255,255,0.3)', fontSize: '1.5rem', transform: 'rotate(-10deg)', zIndex: 10 }}>
            Real Businesses.<br/>Real Impact.
          </div>

          {/* Circular Badge */}
          <div style={{ position: 'absolute', bottom: '-2rem', right: '0rem', width: '120px', height: '120px', zIndex: 40 }}>
            <motion.svg animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
              <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent" />
              <text style={{ fontSize: '10px', fill: 'var(--text-secondary)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                <textPath href="#circlePath">BUILD DIGITAL EXPERIENCES · BUILD DIGITAL EXPERIENCES · </textPath>
              </text>
            </motion.svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', boxShadow: '0 0 15px #3b82f6' }} />
          </div>

          {/* Carousel Controls UI */}
          <div className="showroom-controls" style={{ position: 'absolute', bottom: '-3rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', zIndex: 40, width: 'max-content' }}>
            <p className="desktop-only" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0, textAlign: 'center' }}>
              Scroll, click or use arrows to explore real projects.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <button 
                onClick={handlePrev} 
                style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.02)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease' }} 
                onMouseEnter={(e) => {e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.color = '#3b82f6';}} 
                onMouseLeave={(e) => {e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#fff';}}
              >
                <ArrowLeft size={16} />
              </button>
              
              <span style={{ fontSize: '0.9rem', letterSpacing: '2px', color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace' }}>
                {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
              
              <button 
                onClick={handleNext} 
                style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #3b82f6', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)' }} 
                onMouseEnter={(e) => {e.currentTarget.style.boxShadow = '0 0 25px rgba(59, 130, 246, 0.6)';}} 
                onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.3)';}}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
        </div>

        {/* Mobile Info Block */}
        <div className="mobile-only" style={{ textAlign: 'center', marginTop: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)' }}>0{activeIndex + 1}</span>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>— {activeProject.type}</span>
          </div>
          <h3 style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', fontFamily: 'var(--font-heading)', margin: '0 0 1rem 0', textTransform: 'uppercase' }}>
            {activeProject.name}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '1.5rem', padding: '0 1rem' }}>
            {activeProject.line}
          </p>
          <Link 
            to={`/work/${activeProject.id}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#fff', textDecoration: 'none', fontSize: '0.875rem', borderBottom: '1px solid #fff', paddingBottom: '4px' }}
          >
            View project <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
