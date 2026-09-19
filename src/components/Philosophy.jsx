import React, { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function Philosophy() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });

  // Mouse parallax setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 50 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const glowX = useTransform(smoothX, [-0.5, 0.5], ['-30px', '30px']);
  const glowY = useTransform(smoothY, [-0.5, 0.5], ['-30px', '30px']);
  const orbitX = useTransform(smoothX, [-0.5, 0.5], ['-15px', '15px']);
  const orbitY = useTransform(smoothY, [-0.5, 0.5], ['-15px', '15px']);
  const textX = useTransform(smoothX, [-0.5, 0.5], ['-5px', '5px']);
  const textY = useTransform(smoothY, [-0.5, 0.5], ['-5px', '5px']);

  return (
    <section 
      ref={containerRef}
      className="section philosophy-section" 
      style={{ position: 'relative', overflow: 'hidden', padding: '6rem 0', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
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
          x: glowX,
          y: glowY,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{
          position: 'absolute',
          top: '30%',
          left: '10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Orbit Lines & Pulse */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <motion.div 
          style={{ width: '100%', height: '100%', position: 'absolute', left: 0, top: 0, x: orbitX, y: orbitY, perspective: '1000px' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          {/* Central Pulse Ripple */}
          <motion.div 
            animate={{ 
              scale: [0.8, 1.5, 2.5], 
              opacity: [0, 0.2, 0] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeOut" 
            }}
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '400px',
              height: '400px',
              marginLeft: '-200px',
              marginTop: '-200px',
              borderRadius: '50%',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
            }}
          />

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



      <motion.div 
        className="philosophy-content" 
        style={{ position: 'relative', zIndex: 10, x: textX, y: textY, width: '100%', maxWidth: '1200px', padding: '0 2rem' }}
      >
        <h2 className="philosophy-title" style={{ marginTop: '2rem' }}>
          <motion.span
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 20, filter: 'blur(8px)' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'inline-block' }}
          >
            Not another template.
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 35, filter: 'blur(12px)' }}
            animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 35, filter: 'blur(12px)' }}
            transition={{ duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: 'var(--text-secondary)', display: 'inline-block' }}
          >
            A website with a <span style={{ color: '#3b82f6', textShadow: '0 0 25px rgba(59, 130, 246, 0.6)', fontWeight: 'inherit' }}>pulse.</span>
          </motion.span>
        </h2>
        
        <motion.p 
          className="philosophy-desc"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          We combine thoughtful design, useful interaction and purposeful<br/>technology to make businesses memorable online.
        </motion.p>
      </motion.div>
    </section>
  );
}
