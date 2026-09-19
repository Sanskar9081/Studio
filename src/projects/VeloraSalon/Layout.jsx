import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, ArrowRight, ArrowLeft, Instagram, Facebook, Youtube, MessageCircle, Heart, Menu } from 'lucide-react';
import { useBooking } from './BookingModal';

export const colors = {
  ivory: '#F9F8F6',
  espresso: '#1A1513',
  taupe: '#8C837C',
  champagne: '#E3D7CE',
  darkBg: '#151110',
  lightGray: '#F1EFEA',
  accent: '#A68A77'
};

export const fontSerif = '"Playfair Display", "Georgia", serif';
export const fontSans = '"Inter", "Helvetica Neue", sans-serif';

export const PrimaryButton = ({ children, onClick, dark = false }) => (
  <button onClick={onClick} style={{
    backgroundColor: dark ? colors.ivory : colors.espresso,
    color: dark ? colors.espresso : colors.ivory,
    padding: '1rem 2.2rem',
    borderRadius: '4rem',
    fontSize: '0.85rem',
    fontWeight: 600,
    border: `1px solid ${dark ? 'transparent' : colors.espresso}`,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  }}
  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)'; }}
  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
  >
    {children} <ArrowRight size={14} />
  </button>
);

const Header = () => {
  const location = useLocation();
  const { openBooking } = useBooking();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const navItems = [
    { label: 'Home', path: '' },
    { label: 'Services', path: 'services' },
    { label: 'Our Work', path: 'work' },
    { label: 'About', path: 'about' },
    { label: 'Visit Us', path: 'visit-us' }
  ];

  const isDarkPage = location.pathname.includes('/work') || location.pathname.includes('/about'); // If we have dark themes
  // We'll keep header colors dynamic based on scroll or just keep it simple transparent dark text.
  // Wait, the 3D Hero will be full-bleed dark image. We need the header to be white text on the homepage.
  const isHome = location.pathname === '/work/velora-salon' || location.pathname === '/work/velora-salon/';
  const headerColor = '#fff';

  return (
    <header style={{
      position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 100,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '2.5rem 5vw',
    }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <Link to="/work/velora-salon" style={{ textDecoration: 'none', color: headerColor }}>
          <div style={{ fontFamily: fontSans, fontSize: '1.4rem', letterSpacing: '0.2em', fontWeight: 400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            VELORA
            <span style={{ fontSize: '0.55rem', letterSpacing: '0.4em', fontWeight: 600, marginTop: '2px', opacity: 0.7 }}>SALON</span>
          </div>
        </Link>
        
        <nav style={{ display: 'none', gap: '3rem', alignItems: 'center', marginLeft: 'auto', marginRight: '5vw' }} className="desktop-nav">
          {navItems.map(item => {
            const isActive = location.pathname === `/work/velora-salon${item.path ? `/${item.path}` : ''}` || (item.path === '' && location.pathname === '/work/velora-salon/');
            return (
              <div key={item.label} style={{ position: 'relative' }}>
                <Link to={`/work/velora-salon/${item.path}`} style={{ 
                  color: headerColor,
                  fontSize: '0.8rem', 
                  textDecoration: 'none', 
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  opacity: isActive ? 1 : 0.7,
                  transition: 'opacity 0.3s'
                }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = isActive ? 1 : 0.7}>
                  {item.label}
                </Link>
                {isActive && (
                  <div style={{ position: 'absolute', bottom: '-8px', left: 0, width: '100%', height: '1px', backgroundColor: headerColor }}></div>
                )}
              </div>
            );
          })}
        </nav>
        <style>{`@media (min-width: 900px) { .desktop-nav { display: flex !important; } }`}</style>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', color: headerColor }}>
        <Search size={20} color={headerColor} style={{ cursor: 'pointer', opacity: 0.8 }} strokeWidth={1.5} />
        <button onClick={openBooking} style={{
          backgroundColor: 'transparent',
          color: headerColor,
          padding: '0.8rem 1.8rem',
          borderRadius: '3rem',
          fontSize: '0.8rem',
          fontWeight: 500,
          border: `1px solid ${headerColor}`,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          transition: 'all 0.4s ease'
        }}
        className="desktop-nav"
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = headerColor; e.currentTarget.style.color = isHome ? colors.espresso : colors.ivory; }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = headerColor; }}
        >
          Book Appointment <ArrowRight size={14} />
        </button>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="mobile-menu-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '4px' }}>
           <div style={{ width: '24px', height: '2px', backgroundColor: headerColor }}></div>
           <div style={{ width: '24px', height: '2px', backgroundColor: headerColor }}></div>
           <div style={{ width: '24px', height: '2px', backgroundColor: headerColor }}></div>
        </button>
      </div>
      
      <style>{`
        @media (min-width: 900px) { .mobile-menu-btn { display: none !important; } }
        @media (max-width: 899px) {
          .vs-footer-grid { gap: 2.5rem !important; margin-bottom: 3rem !important; }
          .vs-footer-bottom { flex-direction: column !important; gap: 1rem !important; align-items: flex-start !important; }
          .vs-footer-bottom-links { flex-direction: column !important; gap: 0.5rem !important; align-items: flex-start !important; }
          .vs-footer-header h2 { font-size: clamp(2rem, 10vw, 3rem) !important; }
        }
      `}</style>
      
      {isMobileMenuOpen && (
        <div style={{ position: 'fixed', top: '90px', left: 0, width: '100%', height: 'calc(100vh - 90px)', backgroundColor: colors.ivory, padding: '2rem 5vw', display: 'flex', flexDirection: 'column', gap: '2rem', borderBottom: `1px solid ${colors.taupe}`, zIndex: 99, overflowY: 'auto' }}>
          {navItems.map(item => (
            <Link key={item.label} to={`/work/velora-salon/${item.path}`} onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 500, color: colors.espresso, textDecoration: 'none', borderBottom: `1px solid ${colors.taupe}`, paddingBottom: '1rem' }}>
              {item.label}
            </Link>
          ))}
          <Link to="#" onClick={(e) => { e.preventDefault(); openBooking(); setIsMobileMenuOpen(false); }} style={{ fontSize: '1.5rem', fontWeight: 600, color: colors.accent, textDecoration: 'none', borderBottom: `1px solid ${colors.taupe}`, paddingBottom: '1rem' }}>
            Book Appointment
          </Link>
        </div>
      )}
    </header>
  );
};

const Footer = () => (
  <footer style={{ backgroundColor: colors.darkBg, padding: '8rem 5vw 3rem', color: colors.ivory, position: 'relative', zIndex: 10 }}>
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      
      <div className="vs-footer-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '8rem' }}>
        <h2 style={{ fontFamily: fontSerif, fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontWeight: 400, color: colors.ivory, marginBottom: '2rem' }}>
          Confidence Looks<br/>Good On You.
        </h2>
        <PrimaryButton dark={true}>Book Your Appointment</PrimaryButton>
      </div>

      <div className="vs-footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '6rem' }}>
        
        <div style={{ flex: '2' }}>
          <div style={{ fontFamily: fontSans, fontSize: '1.4rem', letterSpacing: '0.2em', fontWeight: 400, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '2rem' }}>
            VELORA
            <span style={{ fontSize: '0.55rem', letterSpacing: '0.4em', fontWeight: 600, marginTop: '2px', color: colors.champagne }}>SALON</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '300px' }}>
            A sanctuary for self-care. We craft bespoke beauty experiences in an environment designed for ultimate relaxation.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', color: 'rgba(255,255,255,0.8)' }}>
            <Instagram size={20} style={{ cursor: 'pointer' }} />
            <Facebook size={20} style={{ cursor: 'pointer' }} />
            <MessageCircle size={20} style={{ cursor: 'pointer' }} />
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2rem', color: colors.champagne }}>Quick Links</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {['Home', 'Services', 'Our Work', 'About', 'Visit Us'].map(l => (
              <Link key={l} to={`/work/velora-salon/${l.toLowerCase().replace(' ', '-')}`} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>{l}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2rem', color: colors.champagne }}>Services</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {['Haircut & Styling', 'Hair Color', 'Skin Care', 'Bridal & Party', "Men's Grooming", 'View All'].map(l => (
              <Link key={l} to="/work/velora-salon/services" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>{l}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2rem', color: colors.champagne }}>Visit</h4>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            123 Beauty Lane,<br/>Jaipur, Rajasthan
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.8 }}>
            hello@velorasalon.com<br/>+91 98765 43210
          </p>
        </div>

      </div>
      
      <div className="vs-footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid rgba(255, 255, 255, 0.1)`, paddingTop: '3rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', flexWrap: 'wrap', gap: '2rem' }}>
        <div>© 2026 Velora Salon. All rights reserved.</div>
        <div className="vs-footer-bottom-links" style={{ display: 'flex', gap: '3rem' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Designed with <Heart size={14} color={colors.accent} /> for a confident you.</span>
        </div>
      </div>
    </div>
  </footer>
);

export default function Layout({ children }) {
  return (
    <div style={{ backgroundColor: colors.ivory, color: colors.espresso, fontFamily: fontSans, overflowX: 'hidden', minHeight: '100vh', position: 'relative', width: '100vw', maxWidth: '100%' }}>
      <Link to="/" style={{
        position: 'fixed', bottom: '2rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
        backgroundColor: colors.espresso, color: colors.ivory, padding: '0.75rem 1.25rem', borderRadius: '2rem',
        fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', zIndex: 100
      }}>
        <ArrowLeft size={16} /> BACK TO STUDIO
      </Link>
      <Header />
      <main style={{ width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
