import React from 'react';
import { motion } from 'framer-motion';

const services = [
  { id: '01', title: 'CUSTOM DESIGN', desc: 'No copy-paste layouts. Your brand gets its own visual language.' },
  { id: '02', title: 'INTERACTIVE EXPERIENCES', desc: 'Motion and 3D where it actually improves the experience.' },
  { id: '03', title: 'WEB DEVELOPMENT', desc: 'Built to be fast, responsive, and accessible from day one.' },
  { id: '04', title: 'DOMAIN & DEPLOYMENT', desc: 'We handle the hosting, domain, forms, and technical setup.' },
  { id: '05', title: 'SEO FOUNDATION', desc: 'Get found by the right people with clean, search-friendly structure.' },
  { id: '06', title: 'ONGOING SUPPORT', desc: 'Updates when your business changes.' }
];

const GlassPanels = () => (
  <div className="expertise-anim-container" style={{ position: 'absolute', right: '2rem', bottom: '2rem', width: '120px', height: '100px', perspective: '1000px' }}>
    <motion.div
      animate={{ rotateY: [-20, -15, -20], rotateX: [10, 15, 10] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'absolute', width: '90px', height: '70px', background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)', left: 0, top: 0, transformStyle: 'preserve-3d', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
    />
    <motion.div
      animate={{ rotateY: [-20, -15, -20], rotateX: [10, 15, 10] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      style={{ position: 'absolute', width: '90px', height: '70px', background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(59,130,246,0.3)', borderLeft: '2px solid #3b82f6', backdropFilter: 'blur(8px)', right: 0, bottom: 0, transformStyle: 'preserve-3d', boxShadow: '0 10px 30px rgba(0,0,0,0.8)' }}
    />
  </div>
);

const AtomSphere = () => (
  <div className="expertise-anim-container" style={{ position: 'absolute', right: '2rem', bottom: '1.5rem', width: '120px', height: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ position: 'absolute', width: '40px', height: '40px', borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #60a5fa 0%, #1d4ed8 50%, #000 100%)', boxShadow: '0 0 20px rgba(59,130,246,0.4)' }} />
    <motion.div animate={{ rotateZ: 360, rotateX: 60, rotateY: 20 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '1px solid rgba(59,130,246,0.3)', borderTop: '2px solid #3b82f6' }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', width: '4px', height: '4px', background: '#3b82f6', borderRadius: '50%', boxShadow: '0 0 10px #3b82f6' }} />
    </motion.div>
    <motion.div animate={{ rotateZ: -360, rotateX: 60, rotateY: -20 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', borderBottom: '2px solid rgba(255,255,255,0.4)' }} />
  </div>
);

const CodeWindow = () => (
  <div className="expertise-anim-container" style={{ position: 'absolute', right: '1.5rem', bottom: '1.5rem', width: '140px', height: '95px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.8)', transform: 'perspective(1000px) rotateY(-10deg) rotateX(5deg)' }}>
    <div style={{ height: '16px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', padding: '0 6px', gap: '4px' }}>
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }} />
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#eab308' }} />
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
    </div>
    <div style={{ padding: '10px 8px', fontFamily: 'monospace', fontSize: '0.45rem', color: '#a3a3a3', lineHeight: 1.6 }}>
      <span style={{ color: '#3b82f6' }}>const</span> website = () =&gt; {'{'}<br/>
      &nbsp;&nbsp;<span style={{ color: '#3b82f6' }}>return</span> &lt;BetterExperience /&gt;;<br/>
      {'}'}<br/>
      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} style={{ display: 'inline-block', width: '4px', height: '8px', background: '#3b82f6', marginTop: '2px' }} />
    </div>
  </div>
);

const ServerStack = () => (
  <div className="expertise-anim-container" style={{ position: 'absolute', right: '3rem', bottom: '1rem', height: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
    <div style={{ color: '#3b82f6' }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
    </div>
    <div style={{ width: '2px', height: '15px', background: 'rgba(59,130,246,0.3)', position: 'relative' }}>
      <motion.div animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', width: '4px', height: '6px', background: '#3b82f6', left: '-1px', borderRadius: '2px', boxShadow: '0 0 10px #3b82f6' }} />
    </div>
    <div style={{ width: '40px', height: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', display: 'flex', alignItems: 'center', padding: '0 4px', gap: '4px' }}>
      <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 5px #22c55e' }} />
      <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
    </div>
    <div style={{ width: '2px', height: '15px', background: 'rgba(59,130,246,0.3)', position: 'relative' }}>
      <motion.div animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1, ease: 'linear' }} style={{ position: 'absolute', width: '4px', height: '6px', background: '#3b82f6', left: '-1px', borderRadius: '2px', boxShadow: '0 0 10px #3b82f6' }} />
    </div>
    <div style={{ color: 'rgba(255,255,255,0.3)' }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
    </div>
  </div>
);

const ChartGrowth = () => (
  <div className="expertise-anim-container" style={{ position: 'absolute', right: '2rem', bottom: '1.5rem', width: '100px', height: '80px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible', zIndex: 10 }}>
      <motion.path 
        d="M 0 70 Q 50 70 100 10" 
        fill="none" 
        stroke="#3b82f6" 
        strokeWidth="2" 
        initial={{ pathLength: 0 }} 
        animate={{ pathLength: 1 }} 
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }} 
        style={{ filter: 'drop-shadow(0 0 4px #3b82f6)' }}
      />
      <circle cx="100" cy="10" r="3" fill="#fff" filter="drop-shadow(0 0 6px #3b82f6)" />
    </svg>
    <div style={{ width: '12px', height: '20px', background: 'rgba(255,255,255,0.05)', borderTop: '1px solid rgba(255,255,255,0.2)' }} />
    <div style={{ width: '12px', height: '35px', background: 'rgba(255,255,255,0.05)', borderTop: '1px solid rgba(255,255,255,0.2)' }} />
    <div style={{ width: '12px', height: '55px', background: 'rgba(255,255,255,0.05)', borderTop: '1px solid rgba(255,255,255,0.2)' }} />
    <div style={{ width: '12px', height: '70px', background: 'linear-gradient(to top, rgba(59,130,246,0.1), rgba(59,130,246,0.4))', borderTop: '1px solid #3b82f6', boxShadow: '0 -5px 15px rgba(59,130,246,0.2)' }} />
  </div>
);

const RadarPulse = () => (
  <div className="expertise-anim-container" style={{ position: 'absolute', right: '2rem', bottom: '1.5rem', width: '100px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'radial-gradient(circle, #3b82f6 0%, transparent 80%)' }} />
    <motion.div animate={{ scale: [1, 2.5], opacity: [0.8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }} style={{ position: 'absolute', width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #3b82f6' }} />
    <div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)' }}>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', top: '50%', left: '50%', width: '50%', height: '1px', background: 'linear-gradient(90deg, #3b82f6, transparent)', transformOrigin: '0% 0%' }} />
      <div style={{ position: 'absolute', top: '20%', left: '80%', width: '4px', height: '4px', background: '#3b82f6', borderRadius: '50%', boxShadow: '0 0 10px #3b82f6' }} />
    </div>
  </div>
);

const serviceVisuals = {
  '01': GlassPanels,
  '02': AtomSphere,
  '03': CodeWindow,
  '04': ServerStack,
  '05': ChartGrowth,
  '06': RadarPulse
};

export default function Expertise() {
  return (
    <section id="expertise" className="section" style={{ position: 'relative', overflow: 'hidden', paddingBottom: '6rem' }}>
      {/* Ambient Background Curve */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <motion.div
          animate={{ x: ['120%', '-20%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', top: '50px', left: 0, width: '100vw', height: '400px', borderTop: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '50%', transform: 'scaleX(1.5)', boxShadow: '0 -20px 50px rgba(59, 130, 246, 0.05)' }}
        >
          <div style={{ position: 'absolute', top: '-4px', left: '60%', width: '8px', height: '8px', background: '#3b82f6', borderRadius: '50%', boxShadow: '0 0 20px 4px rgba(59, 130, 246, 0.8)' }} />
        </motion.div>
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1600px', margin: '0 auto' }}>
        <div className="eyebrow" style={{ color: 'var(--text-secondary)', justifyContent: 'flex-start', width: '100%' }}>WHAT WE DO</div>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, textAlign: 'left', margin: '1rem 0 6rem 0' }}>
          Beautiful on the outside.<br />
          <span style={{ color: 'var(--text-secondary)' }}>Serious underneath.</span>
        </h2>

        <div className="expertise-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderLeft: '1px solid rgba(255,255,255,0.05)'
        }}>
          {services.map((service) => {
            const VisualComponent = serviceVisuals[service.id];
            return (
              <div 
                key={service.id}
                style={{
                  position: 'relative',
                  padding: '3rem 2rem',
                  borderRight: '1px solid rgba(255,255,255,0.05)',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  minHeight: '280px',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'transparent',
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'radial-gradient(circle at 85% 85%, rgba(59, 130, 246, 0.05) 0%, transparent 60%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <div style={{ color: '#3b82f6', fontSize: '1.25rem', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem' }}>
                  {service.id}
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', letterSpacing: '0.02em', textTransform: 'uppercase', color: '#fff', fontWeight: 600 }}>
                  {service.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '55%', margin: 0 }}>
                  {service.desc}
                </p>
                
                <VisualComponent />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
