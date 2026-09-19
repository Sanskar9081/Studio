import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { products } from './data';
import { useCart } from './CartContext';
import { motion } from 'framer-motion';

const colors = {
  brown: '#1F1512', text: '#2A1A18', textLight: '#8C736D', cream: '#F8F6F0', border: 'rgba(45, 36, 34, 0.1)', accent: '#D99B29'
};

const fontSerif = '"Playfair Display", "Georgia", "Times New Roman", serif';
const fontCursive = '"Brush Script MT", cursive';

export default function Menu({ category, title, subtitle }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const menuItems = products.filter(p => p.category === category || category === 'all');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="cr-menu-container" style={{ padding: '8rem 5vw', minHeight: '80vh', backgroundColor: colors.cream }}>
      <style>{`
        @media (max-width: 480px) {
          .cr-menu-container { padding-top: 6rem !important; }
          .cr-menu-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '6rem', position: 'relative' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.textLight, fontWeight: 600, marginBottom: '1.5rem' }}>
            FRESHLY BAKED
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
            <h1 style={{ fontFamily: fontSerif, fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', color: colors.text, fontWeight: 400, margin: 0, lineHeight: 1.1 }}>
              {title} <span style={{ color: colors.textLight, opacity: 0.5 }}>〰</span>
            </h1>
            <div className="hidden md:block" style={{ fontFamily: fontCursive, fontSize: '3rem', color: colors.textLight, transform: 'rotate(-5deg)', textAlign: 'center', marginTop: '1rem' }}>
              Handcrafted<br/>with love ♡
            </div>
          </div>
          <p style={{ color: colors.textLight, fontSize: '1.1rem', marginTop: '1rem', maxWidth: '500px', lineHeight: 1.6 }}>{subtitle}</p>
        </div>

        <div className="cr-menu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '4rem 2rem' }}>
          {menuItems.map((p, idx) => (
            <div key={p.id} style={{ cursor: 'pointer', group: true }} onClick={() => navigate(`/work/the-cake-room/product/${p.id}`)}>
              <div style={{ overflow: 'hidden', borderRadius: '4px', position: 'relative', aspectRatio: '4/3', marginBottom: '1.5rem', backgroundColor: '#fff' }}>
                {idx === 0 && category === 'all' && (
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem', backgroundColor: colors.cream, color: colors.text, fontSize: '0.7rem', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '2px', zIndex: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    BESTSELLER
                  </div>
                )}
                <motion.img 
                  whileHover={{ scale: 1.05 }} 
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: colors.text, marginBottom: '0.5rem' }}>{p.name}</h3>
                  <p style={{ fontSize: '0.9rem', color: colors.textLight, margin: 0, maxWidth: '250px', lineHeight: 1.5 }}>
                    {p.desc}
                  </p>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: colors.text, marginTop: '1rem' }}>₹{p.price}</div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); addToCart(p); }} style={{ 
                    width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'transparent', border: `1px solid ${colors.border}`, color: colors.text, 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease'
                }} onMouseOver={e => { e.currentTarget.style.backgroundColor = colors.brown; e.currentTarget.style.color = '#fff'; }} onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = colors.text; }}>
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
