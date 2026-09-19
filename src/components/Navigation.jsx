import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    if (isHome) {
      e.preventDefault();
      if (targetId === 'contact') {
        window.dispatchEvent(new CustomEvent('open-concierge'));
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `/#${targetId}`);
        }
      }
      setMenuOpen(false);
    }
  };

  const handleLogoClick = (e) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
      setMenuOpen(false);
    }
  };

  return (
    <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="logo" onClick={handleLogoClick}>studio<span>°</span></Link>
      
      <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        <div className="nav-links desktop-only">
          <Link to="/#work" onClick={(e) => handleNavClick(e, 'work')}>Work</Link>
          <Link to="/#expertise" onClick={(e) => handleNavClick(e, 'expertise')}>Expertise</Link>
          <Link to="/#process" onClick={(e) => handleNavClick(e, 'process')}>Process</Link>
          <Link to="/#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</Link>
        </div>

        <a 
          className="nav-cta desktop-only" 
          href="#contact" 
          onClick={(e) => handleNavClick(e, 'contact')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            borderRadius: '30px',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff',
            textDecoration: 'none',
            fontSize: '0.875rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
          }}
        >
          Let's build <ArrowRight size={14} />
        </a>

        <button className="menu-btn mobile-only" style={{ zIndex: 101, position: 'relative' }} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(12, 10, 9, 0.98)',
              backdropFilter: 'blur(20px)',
              zIndex: 99,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2.5rem'
            }}
          >
            {['Work', 'Expertise', 'Process', 'Contact'].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.1, duration: 0.4 }}
              >
                <Link 
                  to={`/#${item.toLowerCase()}`} 
                  onClick={(e) => handleNavClick(e, item.toLowerCase())}
                  style={{
                    fontSize: '3rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    color: '#fff',
                    textDecoration: 'none'
                  }}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
