import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const panelsData = [
  {
    id: 'upper-left',
    type: 'image',
    src: '/assets/hero-projects/nova-9.png',
    initialX: -160,
    initialY: -180,
    initialZ: -60,
    initialRotateX: 6,
    initialRotateY: 8,
    initialRotateZ: -3,
    width: 270,
    height: 180,
    parallaxFactor: 0.4,
    zIndex: 2,
    mobile: { x: -140, y: -230, s: 0.75 },
  },
  {
    id: 'upper-right',
    type: 'image',
    src: '/assets/hero-projects/exo-history-museum.png',
    initialX: 240,
    initialY: -170,
    initialZ: -120,
    initialRotateX: 8,
    initialRotateY: -8,
    initialRotateZ: 4,
    width: 280,
    height: 180,
    parallaxFactor: 0.3,
    zIndex: 1,
    mobile: { x: 150, y: -250, s: 0.75 },
  },
  {
    id: 'far-right',
    type: 'image',
    src: '/assets/hero-projects/eternis.png',
    initialX: 300,
    initialY: 40,
    initialZ: -80,
    initialRotateX: -2,
    initialRotateY: -12,
    initialRotateZ: 2,
    width: 260,
    height: 170,
    parallaxFactor: 0.5,
    zIndex: 3,
    mobile: { x: 190, y: 50, s: 0.7 },
  },
  {
    id: 'lower-left',
    type: 'image',
    src: '/assets/hero-projects/velora-salon.png',
    initialX: -180,
    initialY: 140,
    initialZ: 20,
    initialRotateX: -6,
    initialRotateY: 10,
    initialRotateZ: -4,
    width: 280,
    height: 190,
    parallaxFactor: 0.7,
    zIndex: 4,
    mobile: { x: -140, y: 190, s: 0.8 },
  },
  {
    id: 'lower-right',
    type: 'image',
    src: '/assets/hero-projects/cake-room.png',
    initialX: 160,
    initialY: 180,
    initialZ: -20,
    initialRotateX: -8,
    initialRotateY: -6,
    initialRotateZ: 5,
    width: 280,
    height: 170,
    parallaxFactor: 0.6,
    zIndex: 5,
    mobile: { x: 150, y: 200, s: 0.75 },
  },
  {
    id: 'primary',
    type: 'image',
    src: '/assets/hero-projects/middle.png',
    title: 'Creative Studio',
    initialX: 20,
    initialY: -10,
    initialZ: 60,
    initialRotateX: -3,
    initialRotateY: -6,
    initialRotateZ: -1,
    width: 480,
    height: 300,
    parallaxFactor: 1.1,
    zIndex: 10,
    mobile: { x: 0, y: -20, s: 1.0 },
  }
];

function WebsitePanel({ panel, mouseX, mouseY, isHovered, isDimmed, onHoverStart, onHoverEnd }) {
  const isHoveredSpring = useSpring(0, { stiffness: 350, damping: 40 });
  const [isMobile, setIsMobile] = useState(false);
  const [viewportRatio, setViewportRatio] = useState(1);
  
  useEffect(() => {
    isHoveredSpring.set(isHovered ? 1 : 0);
  }, [isHovered, isHoveredSpring]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setViewportRatio(Math.min(window.innerWidth / 390, 1.15));
      } else {
        setViewportRatio(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scaleFactor = isMobile && panel.mobile ? panel.mobile.s * viewportRatio : 1;
  const pX = isMobile && panel.mobile ? panel.mobile.x * viewportRatio : panel.initialX;
  const pY = isMobile && panel.mobile ? panel.mobile.y * viewportRatio : panel.initialY;
  
  const dynamicScale = useMotionValue(scaleFactor);
  const dynamicX = useMotionValue(pX);
  const dynamicY = useMotionValue(pY);
  
  useEffect(() => {
    dynamicScale.set(scaleFactor);
    dynamicX.set(pX);
    dynamicY.set(pY);
  }, [scaleFactor, pX, pY, dynamicScale, dynamicX, dynamicY]);
  
  const baseMove = 30 * scaleFactor;
  const baseRot = 4;
  
  const xOffset = useTransform(mouseX, [-1, 1], [-baseMove * panel.parallaxFactor, baseMove * panel.parallaxFactor]);
  const yOffset = useTransform(mouseY, [-1, 1], [-baseMove * panel.parallaxFactor, baseMove * panel.parallaxFactor]);
  const rotXOffset = useTransform(mouseY, [-1, 1], [baseRot * panel.parallaxFactor, -baseRot * panel.parallaxFactor]);
  const rotYOffset = useTransform(mouseX, [-1, 1], [-baseRot * panel.parallaxFactor, baseRot * panel.parallaxFactor]);

  // Keep w and h at original dimensions, we will scale via transform
  const w = panel.width;
  const h = panel.height;

  const x = useTransform([dynamicX, xOffset, isHoveredSpring], ([dX, off, hov]) => dX + off - (hov * 10));
  const y = useTransform([dynamicY, yOffset, isHoveredSpring], ([dY, off, hov]) => dY + off - (hov * 10));
  const z = useTransform(isHoveredSpring, hov => panel.initialZ + hov * 40);
  
  const rotateX = useTransform([rotXOffset, isHoveredSpring], ([off, hov]) => panel.initialRotateX + off - (hov * 2));
  const rotateY = useTransform([rotYOffset, isHoveredSpring], ([off, hov]) => panel.initialRotateY + off - (hov * 2));
  const rotateZ = panel.initialRotateZ;
  
  const scale = useTransform([dynamicScale, isHoveredSpring], ([s, hov]) => s * (1 + hov * 0.03));
  const filter = useTransform(isHoveredSpring, hov => `brightness(${1 + hov * 0.05})`);

  const duration = 6 + panel.zIndex * 0.5;
  const delay = panel.zIndex * -1.5;

  return (
    <motion.div
      className={`website-panel-wrapper ${panel.id}`}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        x, y, z,
        rotateX, rotateY, rotateZ,
        scale,
        marginLeft: -w / 2,
        marginTop: -h / 2,
        width: w,
        height: h,
        zIndex: isHovered ? 100 : panel.zIndex,
      }}
      animate={{
        opacity: isDimmed ? 0.4 : 1
      }}
      transition={{ opacity: { duration: 0.5 } }}
    >
       <motion.div 
         className="website-panel"
         style={{ 
           filter,
           borderRadius: '12px',
           border: '1px solid rgba(59, 130, 246, 0.4)',
           boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 30px rgba(59, 130, 246, 0.2)',
           overflow: 'hidden',
           background: 'var(--bg-surface)'
         }}
         animate={{ y: [-5, 5, -5] }}
         transition={{ 
           repeat: Infinity, 
           duration: duration, 
           ease: "easeInOut",
           delay: delay
         }}
       >
         <div style={{ height: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', padding: '0 12px', gap: '6px', background: 'rgba(255,255,255,0.05)' }}>
           <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }}></span>
           <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#eab308' }}></span>
           <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }}></span>
         </div>
         <div className="panel-content" style={{ height: 'calc(100% - 24px)', position: 'relative' }}>
           {panel.type === 'image' ? (
             <img src={panel.src} alt={panel.id} className="panel-image" style={{ width: '100%', height: '100%', objectFit: 'fill', objectPosition: 'top' }} />
           ) : (
             panel.content
           )}
         </div>
         <div className="panel-gloss"></div>
       </motion.div>
    </motion.div>
  );
}

function HeroWebsiteShowcase() {
  const containerRef = useRef(null);
  
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  
  const springConfig = { damping: 50, stiffness: 120, mass: 1.5 };
  const mouseX = useSpring(rawMouseX, springConfig);
  const mouseY = useSpring(rawMouseY, springConfig);

  const [hoveredPanel, setHoveredPanel] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      rawMouseX.set(x);
      rawMouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rawMouseX, rawMouseY]);

  return (
    <div className="hero-website-showcase" ref={containerRef}>
      <div className="showcase-perspective">
        <div className="blue-bloom"></div>
        <div className="orbit-ring"></div>
        <div className="particle p1"></div>
        <div className="particle p2"></div>
        <div className="particle p3"></div>
        {panelsData.map(panel => (
          <WebsitePanel
            key={panel.id}
            panel={panel}
            mouseX={mouseX}
            mouseY={mouseY}
            isHovered={hoveredPanel === panel.id}
            isDimmed={hoveredPanel !== null && hoveredPanel !== panel.id}
            onHoverStart={() => setHoveredPanel(panel.id)}
            onHoverEnd={() => setHoveredPanel(null)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="section hero-section" style={{ paddingBottom: '4rem' }}>
      <div className="hero-content">
        <motion.div style={{ y, opacity }} className="hero-text-container">
          <h1 className="hero-title" style={{ fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', lineHeight: 1.1, margin: '0 0 1.5rem 0', whiteSpace: 'pre-line' }}>
            {`Websites\nthat make\n`}
            <span style={{ color: '#3b82f6', textShadow: '0 0 25px rgba(59, 130, 246, 0.6)' }}>people stop.</span>
          </h1>
          <p className="hero-description" style={{ fontSize: '1.25rem', maxWidth: '450px', marginBottom: '2.5rem' }}>
            We design and build modern websites for real businesses — focused on clarity, performance and growth.
          </p>
          <div className="hero-actions">
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-concierge')); }}
              style={{ 
                pointerEvents: 'auto',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 24px',
                borderRadius: '30px',
                background: '#fff',
                color: '#000',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '1rem',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(255,255,255,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Let's build <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>

      <div className="hero-3d-container">
        <HeroWebsiteShowcase />
      </div>
    </section>
  );
}
