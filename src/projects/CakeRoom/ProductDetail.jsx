import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { products } from './data';
import { useCart } from './CartContext';

const colors = {
  brown: '#1F1512', text: '#2A1A18', textLight: '#8C736D', cream: '#F8F6F0', border: 'rgba(45, 36, 34, 0.1)', accent: '#D99B29'
};
const fontSerif = '"Playfair Display", "Georgia", "Times New Roman", serif';
const fontCursive = '"Brush Script MT", cursive';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const product = products.find(p => p.id === id);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return <div style={{ padding: '10rem', textAlign: 'center', backgroundColor: colors.cream, minHeight: '100vh' }}>Product not found</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ minHeight: '100vh', backgroundColor: colors.cream, paddingTop: '73px' }}>
      <style>{`
        @media (max-width: 480px) {
          .cr-prod-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div className="cr-prod-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', minHeight: 'calc(100vh - 73px)' }}>
        
        {/* Left Image Section */}
        <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={() => navigate(-1)} style={{ position: 'absolute', top: '2rem', left: '2rem', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: colors.text, fontSize: '0.9rem', fontWeight: 600, zIndex: 10 }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)' }}>
              <ArrowLeft size={16} />
            </div>
            Back
          </button>
          
          <motion.img 
            initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1, ease: 'easeOut' }}
            src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />

          <div className="hidden md:block" style={{ position: 'absolute', bottom: '3rem', right: '3rem', fontFamily: fontCursive, fontSize: '3rem', color: '#fff', transform: 'rotate(-5deg)', textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
            Baked fresh<br/>daily ♡
          </div>
        </div>

        {/* Right Details Section */}
        <div style={{ backgroundColor: colors.brown, color: '#fff', padding: '6rem 5vw', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ maxWidth: '500px' }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 600, marginBottom: '1.5rem' }}>
              {product.category}
            </div>
            
            <h1 style={{ fontFamily: fontSerif, fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 400, marginBottom: '1.5rem', lineHeight: 1.1 }}>
              {product.name}
            </h1>
            
            <div style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '2.5rem', color: colors.accent }}>
              ₹{product.price}
            </div>
            
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.8)', marginBottom: '3rem' }}>
              {product.desc}
            </p>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '2rem', padding: '0.25rem 0.5rem' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', cursor: 'pointer', color: '#fff' }}><Minus size={16} /></button>
                <div style={{ width: '40px', textAlign: 'center', fontWeight: 600, fontSize: '1rem', color: '#fff' }}>{qty}</div>
                <button onClick={() => setQty(qty + 1)} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', cursor: 'pointer', color: '#fff' }}><Plus size={16} /></button>
              </div>
              
              <button 
                onClick={() => addToCart(product, qty)} 
                style={{ 
                  flex: 1, backgroundColor: '#fff', color: colors.brown, padding: '1rem 2rem', 
                  borderRadius: '2rem', fontSize: '1rem', fontWeight: 600, border: 'none', cursor: 'pointer',
                  transition: 'transform 0.2s ease'
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                Add to Cart — ₹{product.price * qty}
              </button>
            </div>

            <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                <strong>Ingredients:</strong> Premium flour, organic sugar, farm-fresh eggs, butter, and natural flavorings. Allergy advice: Contains gluten, dairy, and may contain traces of nuts.
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
