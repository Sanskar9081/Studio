import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Contact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });

  return (
    <section id="contact" className="section contact-section" ref={containerRef} style={{ position: 'relative', overflow: 'hidden', padding: '6rem 0', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      
      {/* Background Ambient Glows */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '1000px',
          height: '1000px',
          marginLeft: '-500px',
          marginTop: '-500px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(255,255,255,0.01) 25%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '0%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      
      {/* Bottom distinct glow under the button */}
      <motion.div 
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          bottom: '0%',
          left: '50%',
          width: '800px',
          height: '400px',
          marginLeft: '-400px',
          marginBottom: '-200px',
          background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Orbit Lines */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <motion.div 
          style={{ width: '100%', height: '100%', position: 'absolute', left: 0, top: 0, perspective: '1000px' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 2, delay: 0.2 }}
        >
          {/* Huge 3D Angled Orbit Line */}
          <motion.div 
            initial={{ rotateX: 70, rotateY: -15, rotateZ: 0 }}
            animate={{ rotateZ: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '120vw',
              height: '120vw',
              marginLeft: '-60vw',
              marginTop: '-60vw',
              borderRadius: '50%',
              border: '1px solid rgba(59, 130, 246, 0.15)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Particles on the orbit */}
            <div style={{ position: 'absolute', top: '0', left: '50%', width: '6px', height: '6px', backgroundColor: '#3b82f6', borderRadius: '50%', boxShadow: '0 0 15px #3b82f6', transform: 'translate(-50%, -50%) rotateX(-70deg) rotateY(15deg)' }} />
            <div style={{ position: 'absolute', bottom: '20%', left: '10%', width: '3px', height: '3px', backgroundColor: '#3b82f6', borderRadius: '50%', boxShadow: '0 0 10px #3b82f6', opacity: 0.6, transform: 'rotateX(-70deg) rotateY(15deg)' }} />
          </motion.div>
        </motion.div>
      </div>

      <div className="contact-content" style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '800px', padding: '0 2rem' }}>
        <motion.h2 
          className="contact-title" 
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1, marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '-0.02em', fontWeight: 600 }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          LET'S MAKE YOUR<br />
          BUSINESS<br />
          <span style={{ color: '#3b82f6', fontStyle: 'italic', fontFamily: 'var(--font-body)', textShadow: '0 0 25px rgba(59, 130, 246, 0.6)', fontWeight: 500 }}>IMPOSSIBLE TO IGNORE.</span>
        </motion.h2>
        
        <motion.p 
          className="contact-desc" 
          style={{ margin: '0 auto 3rem auto', maxWidth: '450px', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Ready to build something that actually drives results? Let's talk about your next project.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <a 
            href="#contact" 
            onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-concierge')); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#fff',
              color: '#000',
              padding: '6px 6px 6px 24px',
              borderRadius: '100px',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '0.95rem',
              boxShadow: '0 0 40px rgba(59, 130, 246, 0.4)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              gap: '16px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 0 60px rgba(59, 130, 246, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(59, 130, 246, 0.4)';
            }}
          >
            Let's talk about your project
            <span style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              backgroundColor: '#121212',
              borderRadius: '50%',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
