import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

const steps = [
  { num: '01', title: 'Understand', desc: 'Your business, goals and customers.' },
  { num: '02', title: 'Design', desc: 'A direction that feels like you.' },
  { num: '03', title: 'Build', desc: 'Real code. Real interactions.' },
  { num: '04', title: 'Launch', desc: 'Domain connected. Website live.' },
  { num: '05', title: 'Support', desc: 'We\'re here when your business grows.' }
];

// Removed StepMicroAnimation component based on user request

const ProcessStep = ({ step, index, scrollYProgress }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Active window for step i
  const start = (index - 0.5) / 4;
  const center = index / 4;
  const end = (index + 0.5) / 4;
  
  const isActiveTransform = useTransform(scrollYProgress, [start, center, end], [0, 1, 0]);
  const isPastTransform = useTransform(scrollYProgress, [center, end], [0, 1]);
  const isFutureTransform = useTransform(scrollYProgress, [start, center], [1, 0]);
  
  const hoverSpring = useSpring(0, { stiffness: 300, damping: 25 });
  React.useEffect(() => {
    hoverSpring.set(isHovered ? 1 : 0);
  }, [isHovered, hoverSpring]);

  const activeValue = useTransform([isActiveTransform, hoverSpring], ([active, hover]) => Math.max(active, hover));
  const pastValue = useTransform([isPastTransform, hoverSpring], ([past, hover]) => Math.max(0, past - hover));
  
  // Use a custom transform function for node background color based on active & past states
  const nodeBgColor = useTransform([activeValue, pastValue], ([active, past]) => {
    if (active > 0.1) return `rgba(59, 130, 246, ${0.2 + active * 0.8})`;
    if (past > 0.5) return 'rgba(59, 130, 246, 0.4)'; // completed state
    return 'var(--bg-dark)'; // future state
  });

  const nodeBorderColor = useTransform([activeValue, pastValue], ([active, past]) => {
    if (active > 0.1) return `rgba(59, 130, 246, ${0.5 + active * 0.5})`;
    if (past > 0.5) return 'rgba(59, 130, 246, 0.5)';
    return 'var(--border-light)';
  });

  const nodeScale = useTransform(activeValue, [0, 1], [1, 1.3]);
  const nodeGlow = useTransform(activeValue, [0, 1], ['0px 0px 0px rgba(59,130,246,0)', '0px 0px 15px rgba(59,130,246,0.5)']);

  const headingColor = useTransform(activeValue, [0, 1], ['var(--text-primary)', '#fff']);
  const numColor = useTransform([activeValue, pastValue], ([active, past]) => {
    if (active > 0.1) return '#3b82f6';
    if (past > 0.5) return 'var(--text-secondary)';
    return 'var(--text-muted)';
  });

  const descOpacity = useTransform(activeValue, [0, 1], [0.4, 1]);
  const descY = useTransform(activeValue, [0, 1], [4, 0]);

  return (
    <div 
      className="step-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative', cursor: 'default' }}
    >
      <div className="process-node-wrapper">
         <motion.div 
           style={{
             width: '100%',
             height: '100%',
             borderRadius: '50%',
             backgroundColor: nodeBgColor,
             border: '1px solid',
             borderColor: nodeBorderColor,
             scale: nodeScale,
             boxShadow: nodeGlow,
             position: 'relative',
             zIndex: 2
           }}
         />
         <motion.div 
           style={{ 
             position: 'absolute', top: '-10px', left: '-10px', right: '-10px', bottom: '-10px', 
             borderRadius: '50%', border: '1px solid rgba(59,130,246,0.3)',
             opacity: activeValue, scale: useTransform(activeValue, [0, 1], [0.8, 1.5]),
             zIndex: 1
           }}
         />
      </div>

      <motion.div className="step-num" style={{ color: numColor, transition: 'color 0.3s ease' }}>
        {step.num}
      </motion.div>
      <motion.h3 style={{ color: headingColor, transition: 'color 0.3s ease' }}>
        {step.title}
      </motion.h3>
      <motion.p style={{ opacity: descOpacity, y: descY }}>
        {step.desc}
      </motion.p>
      
    </div>
  );
};

export default function Process() {
  const containerRef = useRef(null);
  
  // Section entrance animation observer
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });

  // Scroll progress for the timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 60%"]
  });

  // Expand lines from 0 to 100%
  const lineProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="section process-section" ref={containerRef} style={{ position: 'relative', overflow: 'hidden', paddingBottom: '4rem' }}>
      
      {/* Ambient background glow tracking scroll */}
      <motion.div 
        style={{
          position: 'absolute',
          top: '50%',
          left: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
          width: '600px',
          height: '600px',
          marginLeft: '-300px',
          marginTop: '-300px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      
      {/* Optional: tiny drifting particles */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '30%', left: '20%', width: '3px', height: '3px', background: '#3b82f6', borderRadius: '50%', boxShadow: '0 0 10px #3b82f6', pointerEvents: 'none', zIndex: 0 }}
      />
      <motion.div
        animate={{ y: [0, 30, 0], opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{ position: 'absolute', top: '70%', right: '25%', width: '4px', height: '4px', background: '#3b82f6', borderRadius: '50%', boxShadow: '0 0 10px #3b82f6', pointerEvents: 'none', zIndex: 0 }}
      />

      <div style={{ position: 'relative', zIndex: 10 }}>
        <motion.div 
          className="eyebrow"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ color: 'var(--text-secondary)', justifyContent: 'flex-start', width: '100%' }}
        >
          THE JOURNEY
        </motion.div>
        
        <div className="process-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From "we need a website"<br />
            <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}>to "look at this."</span>
          </motion.h2>
          <motion.p 
            className="process-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A simple, clear process designed to keep things smooth.
          </motion.p>
        </div>

        <div className="process-steps">
          {/* Desktop/Tablet Horizontal Line */}
          <div className="process-line-horizontal">
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
              style={{ width: '100%', height: '100%', background: 'var(--border-light)', originX: 0 }}
            >
              <motion.div style={{ height: '100%', background: '#3b82f6', width: lineProgress, originX: 0 }} />
            </motion.div>
          </div>

          {/* Mobile Vertical Line */}
          <div className="process-line-vertical">
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
              style={{ width: '100%', height: '100%', background: 'var(--border-light)', originY: 0 }}
            >
              <motion.div style={{ width: '100%', background: '#3b82f6', height: lineProgress, originY: 0 }} />
            </motion.div>
          </div>

          {steps.map((step, index) => (
            <motion.div 
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            >
              <ProcessStep step={step} index={index} scrollYProgress={scrollYProgress} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
