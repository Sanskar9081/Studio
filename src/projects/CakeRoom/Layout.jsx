import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ArrowRight, X, ArrowLeft, Instagram, Facebook, Twitter, Youtube, MapPin, Clock, ShoppingBag } from 'lucide-react';
import { useCart } from './CartContext';
import { products } from './data';
import { motion, AnimatePresence } from 'framer-motion';

const colors = {
  brown: '#1F1512',
  text: '#1F1512',
  textLight: '#8C736D',
  beige: '#F8F6F0',
  border: 'rgba(45, 36, 34, 0.1)',
  cream: '#F8F6F0',
  accent: '#D99B29',
  bg: '#F8F6F0'
};

const fontSerif = '"Playfair Display", "Georgia", "Times New Roman", serif';

const SearchOverlay = () => {
  const { isSearchOpen, setIsSearchOpen } = useCart();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const results = query.trim() ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase())) : [];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            backgroundColor: 'rgba(248, 246, 243, 0.98)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '15vh'
          }}
        >
          <button onClick={() => setIsSearchOpen(false)} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', cursor: 'pointer', color: colors.text }}>
            <X size={32} />
          </button>

          <div style={{ width: '90%', maxWidth: '800px' }}>
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: `2px solid ${colors.brown}`, paddingBottom: '1rem', marginBottom: '3rem' }}>
              <Search size={32} color={colors.brown} style={{ marginRight: '1rem' }} />
              <input 
                autoFocus
                type="text" 
                placeholder="Search for cakes, breads..." 
                value={query}
                onChange={e => setQuery(e.target.value)}
                style={{
                  border: 'none', outline: 'none', background: 'transparent',
                  fontSize: '2rem', color: colors.text, width: '100%',
                  fontFamily: fontSerif
                }}
              />
            </div>

            {query.trim() && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2rem' }}>
                {results.length > 0 ? results.map(p => (
                  <div key={p.id} style={{ cursor: 'pointer' }} onClick={() => { setIsSearchOpen(false); navigate(`/work/the-cake-room/product/${p.id}`); }}>
                    <div style={{ aspectRatio: '4/3', borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem' }}>
                      <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '1.05rem', color: colors.text }}>{p.name}</div>
                    <div style={{ color: colors.brown, fontWeight: 500 }}>₹{p.price}</div>
                  </div>
                )) : (
                  <div style={{ color: colors.textLight, fontSize: '1.25rem' }}>No results found for "{query}".</div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CakeNav = () => {
  const { cartCount, setIsSearchOpen } = useCart();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { label: 'Home', path: '' },
    { label: 'Breads', path: 'breads' },
    { label: 'Cakes', path: 'cakes' },
    { label: 'Pastries', path: 'pastries' },
    { label: 'Our Story', path: 'story' },
    { label: 'Visit Us', path: 'visit-us' }
  ];
  
  return (
    <nav style={{
      position: 'absolute', top: 0, width: '100%', backgroundColor: colors.bg,
      zIndex: 100, padding: '1rem 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      borderBottom: `1px solid ${colors.border}`
    }}>
      <Link to="/work/the-cake-room" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textDecoration: 'none' }}>
        <div style={{ fontFamily: fontSerif, fontSize: '1.5rem', fontWeight: 700, color: colors.text, lineHeight: 1, display: 'flex', alignItems: 'center', gap: '4px' }}>
          THE <br/>CAKE ROOM
        </div>
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: colors.textLight, textTransform: 'uppercase', marginTop: '4px' }}>
          BAKES · MOMENTS · MEMORIES
        </div>
      </Link>

      <div style={{ display: 'none', gap: '2.5rem', alignItems: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} className="desktop-nav">
        {navLinks.map(item => {
          const isActive = location.pathname === `/work/the-cake-room${item.path ? `/${item.path}` : ''}`;
          return (
            <Link key={item.label} to={`/work/the-cake-room/${item.path}`} style={{ 
              fontSize: '0.8rem', fontWeight: 500, color: colors.text, textDecoration: 'none',
              transition: 'color 0.3s ease', borderBottom: isActive ? `1px solid ${colors.brown}` : 'none', paddingBottom: '4px'
            }}>
              {item.label}
            </Link>
          )
        })}
      </div>
      
      <style>{`
        @media (min-width: 900px) { 
          .desktop-nav { display: flex !important; } 
          .mobile-menu-btn { display: none !important; } 
        }
        @media (max-width: 899px) {
          .cr-footer-grid { gap: 2.5rem !important; margin-bottom: 3rem !important; }
          .cr-footer-bottom { flex-direction: column !important; gap: 1rem !important; align-items: flex-start !important; }
          .cr-footer-bottom-links { flex-direction: column !important; gap: 0.5rem !important; }
        }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button onClick={() => setIsSearchOpen(true)} style={{ background: 'none', border: 'none', color: colors.text, cursor: 'pointer', display: 'flex' }}>
          <Search size={20} />
        </button>
        <Link to="/work/the-cake-room/cart" style={{ position: 'relative', color: colors.text, textDecoration: 'none', display: 'flex' }}>
          <ShoppingBag size={24} strokeWidth={1.5} />
          <div style={{ position: 'absolute', top: '-4px', right: '-8px', backgroundColor: colors.brown, color: '#fff', fontSize: '0.65rem', fontWeight: 'bold', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {cartCount}
          </div>
        </Link>
        <Link to="/work/the-cake-room/cart" style={{
          backgroundColor: '#fff', color: colors.text, padding: '0.6rem 1.25rem',
          borderRadius: '2rem', fontSize: '0.8rem', fontWeight: 600, border: `1px solid ${colors.border}`,
          display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', textDecoration: 'none',
          transition: 'all 0.3s ease', marginLeft: '0.5rem'
        }} className="desktop-nav">
          Order Now <ArrowRight size={14} />
        </Link>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="mobile-menu-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '4px' }}>
           <div style={{ width: '24px', height: '2px', backgroundColor: colors.text }}></div>
           <div style={{ width: '24px', height: '2px', backgroundColor: colors.text }}></div>
           <div style={{ width: '24px', height: '2px', backgroundColor: colors.text }}></div>
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ 
              position: 'fixed', top: '73px', left: 0, width: '100%', height: 'calc(100vh - 73px)', 
              backgroundColor: colors.bg, padding: '2rem 5vw', display: 'flex', flexDirection: 'column', 
              gap: '2rem', zIndex: 99, overflowY: 'auto'
            }}
          >
            {navLinks.map(item => (
              <Link key={item.label} to={`/work/the-cake-room/${item.path}`} onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 500, color: colors.text, textDecoration: 'none', borderBottom: `1px solid ${colors.border}`, paddingBottom: '1rem' }}>
                {item.label}
              </Link>
            ))}
            <Link to="/work/the-cake-room/cart" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 600, color: colors.accent, textDecoration: 'none', borderBottom: `1px solid ${colors.border}`, paddingBottom: '1rem' }}>
              Order Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const CakeFooter = () => (
  <footer style={{ backgroundColor: '#2A1A18', color: '#fff', padding: '5rem 5vw 2rem' }}>
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div className="cr-footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '6rem' }}>
        
        <div style={{ flex: '1 1 300px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div style={{ fontFamily: fontSerif, fontSize: '1.75rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
              THE <br/>CAKE ROOM
            </div>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginTop: '8px' }}>
              BAKES · MOMENTS · MEMORIES
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Artisan bakes for brighter days. Visit us, order<br/>online, or just follow along for a little daily happiness.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" style={{ color: '#fff' }}><Instagram size={18} /></a>
            <a href="#" style={{ color: '#fff' }}><Facebook size={18} /></a>
            <a href="#" style={{ color: '#fff' }}><Twitter size={18} /></a>
            <a href="#" style={{ color: '#fff' }}><Youtube size={18} /></a>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '1.5rem' }}>Quick Links</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/work/the-cake-room" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.85rem' }}>Home</Link>
            <Link to="/work/the-cake-room/breads" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.85rem' }}>Breads</Link>
            <Link to="/work/the-cake-room/cakes" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.85rem' }}>Cakes</Link>
            <Link to="/work/the-cake-room/pastries" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.85rem' }}>Pastries</Link>
            <Link to="/work/the-cake-room/story" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.85rem' }}>Our Story</Link>
            <Link to="/work/the-cake-room/visit-us" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.85rem' }}>Visit Us</Link>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '1.5rem' }}>Visit Our Bakery</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ marginTop: '2px' }}><MapPin size={16} /></div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                123 Baker's Lane<br/>Jaipur, Rajasthan
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ marginTop: '2px' }}><Clock size={16} /></div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                8:00 AM – 9:00 PM<br/>(Open Daily)
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '1.5rem' }}>Let's Stay in Touch</h4>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Get updates on new bakes, seasonal<br/>specials and more.
          </p>
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '0.5rem' }}>
            <input type="email" placeholder="Your email address" style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', flex: 1, fontSize: '0.85rem' }} />
            <button style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><ArrowRight size={16}/></button>
          </div>
        </div>
      </div>

      <div className="cr-footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
        <div>© 2026 The Cake Room. All rights reserved.</div>
        <div className="cr-footer-bottom-links" style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
          <span>Made with ♡ for sweeter days.</span>
        </div>
      </div>
    </div>
  </footer>
);

export default function Layout({ children }) {
  return (
    <div style={{ backgroundColor: colors.bg, color: colors.text, fontFamily: 'var(--font-body)', overflowX: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Link to="/" style={{
        position: 'fixed', bottom: '2rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
        backgroundColor: colors.brown, color: '#fff', padding: '0.75rem 1.25rem', borderRadius: '2rem',
        fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', zIndex: 100
      }}>
        <ArrowLeft size={16} /> BACK TO STUDIO
      </Link>
      
      <CakeNav />
      <SearchOverlay />
      
      <main style={{ flex: 1, paddingTop: '73px' }}>
        {children}
      </main>
      
      <CakeFooter />
    </div>
  );
}
