import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const FooterLink = ({ href, children, isActive = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <a 
      href={href} 
      className="footer-link-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        position: 'relative', 
        textDecoration: 'none', 
        color: 'var(--text-secondary)',
        fontSize: '0.9rem',
        padding: '0.5rem 0',
        transition: 'color 0.3s ease'
      }}
    >
      <span style={{ color: isHovered || isActive ? '#fff' : 'var(--text-secondary)' }}>
        {children}
      </span>
      
      {/* Blue underline effect */}
      <motion.div 
        initial={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        animate={{ scaleX: isHovered || isActive ? 1 : 0, opacity: isHovered || isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: '#3b82f6',
          transformOrigin: 'center',
          borderRadius: '2px',
          boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
        }}
      >
        {/* Center glowing dot for active links (like Instagram in screenshot) */}
        {(isHovered || isActive) && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 0 8px 2px #3b82f6'
          }} />
        )}
      </motion.div>
    </a>
  );
};

export default function Footer() {
  return (
    <footer style={{ 
      position: 'relative', 
      backgroundColor: '#050505', 
      color: '#fff', 
      padding: '4rem 5vw 4rem 5vw',
      overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.03)'
    }}>
      
      {/* Background Ambient Orbit Line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <motion.div
          animate={{ x: ['-20%', '120%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '40%',
            left: 0,
            width: '100vw',
            height: '300px',
            borderTop: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '50%',
            transform: 'scaleX(1.5) translateY(-50%)',
            boxShadow: 'inset 0 20px 50px rgba(59, 130, 246, 0.05)'
          }}
        >
          {/* Moving particles on the curve */}
          <div style={{
            position: 'absolute',
            top: '-3px',
            left: '20%',
            width: '5px',
            height: '5px',
            background: '#3b82f6',
            borderRadius: '50%',
            boxShadow: '0 0 15px 3px rgba(59, 130, 246, 0.8)'
          }} />
          <div style={{
            position: 'absolute',
            top: '-2px',
            left: '70%',
            width: '3px',
            height: '3px',
            background: '#3b82f6',
            borderRadius: '50%',
            boxShadow: '0 0 10px 2px rgba(59, 130, 246, 0.6)'
          }} />
        </motion.div>
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1600px', margin: '0 auto' }}>
        
        {/* Top Section */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '3rem',
          marginBottom: '6rem'
        }}>
          
          {/* Brand */}
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              studio<span style={{ color: '#3b82f6' }}>°</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Digital experiences for real businesses.
            </p>
          </div>
          
          {/* Main Links & Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
              <FooterLink href="#work">Work</FooterLink>
              <FooterLink href="#expertise">Expertise</FooterLink>
              <FooterLink href="#process">Process</FooterLink>
              <FooterLink href="#about">About</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </div>
            
          </div>
        </div>
        
        {/* Divider Line (Glowing Center) */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, rgba(59,130,246,0) 0%, rgba(59,130,246,0.3) 50%, rgba(59,130,246,0) 100%)',
          marginBottom: '2rem',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '20%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)',
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)'
          }} />
        </div>
        
        {/* Bottom Section */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
            © 2026 studio°. Built for businesses with ambition.
          </p>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#3b82f6', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              fontSize: '0.9rem',
              cursor: 'pointer',
              padding: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.querySelector('.arrow-circle').style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.6)';
              e.currentTarget.querySelector('.arrow-circle').style.background = 'rgba(59, 130, 246, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.querySelector('.arrow-circle').style.boxShadow = '0 0 0px rgba(59, 130, 246, 0)';
              e.currentTarget.querySelector('.arrow-circle').style.background = 'transparent';
            }}
          >
            Scroll to top
            <div 
              className="arrow-circle"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
        
      </div>
    </footer>
  );
}
