import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ArrowRight } from 'lucide-react';
import { useCart } from './CartContext';

const colors = {
  brown: '#1F1512', text: '#2A1A18', textLight: '#8C736D', cream: '#F8F6F0', border: 'rgba(45, 36, 34, 0.1)', accent: '#D99B29'
};
const fontSerif = '"Playfair Display", "Georgia", "Times New Roman", serif';
const fontCursive = '"Brush Script MT", cursive';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);

  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  if (isOrdered) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '12rem 5vw', minHeight: '100vh', textAlign: 'center', backgroundColor: colors.cream, paddingTop: '20vh' }}>
        <div className="hidden md:block" style={{ fontFamily: fontCursive, fontSize: '4rem', color: colors.textLight, transform: 'rotate(-5deg)', marginBottom: '1rem' }}>
          Thank you ♡
        </div>
        <h1 style={{ fontFamily: fontSerif, fontSize: 'clamp(2rem, 5vw, 4.5rem)', color: colors.text, marginBottom: '1.5rem', fontWeight: 400 }}>Order received.</h1>
        <p style={{ color: colors.textLight, fontSize: '1.1rem', marginBottom: '3rem', maxWidth: '400px', margin: '0 auto 3rem auto' }}>
          We're preparing your treats with love. Our team will contact you shortly to confirm your order details.
        </p>
        <Link to="/work/the-cake-room" style={{ backgroundColor: colors.brown, color: '#fff', padding: '1rem 2.5rem', borderRadius: '2rem', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          Return Home <ArrowRight size={16} />
        </Link>
      </motion.div>
    );
  }

  if (cart.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '12rem 5vw', minHeight: '100vh', textAlign: 'center', backgroundColor: colors.cream, paddingTop: '20vh' }}>
        <h1 style={{ fontFamily: fontSerif, fontSize: 'clamp(2rem, 5vw, 4.5rem)', color: colors.text, marginBottom: '1.5rem', fontWeight: 400 }}>Your cart is empty.</h1>
        <p style={{ color: colors.textLight, fontSize: '1.1rem', marginBottom: '3rem', maxWidth: '400px', margin: '0 auto 3rem auto' }}>
          Looks like you haven't added any sweet treats yet. Let's fix that!
        </p>
        <Link to="/work/the-cake-room/cakes" style={{ backgroundColor: colors.brown, color: '#fff', padding: '1rem 2.5rem', borderRadius: '2rem', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          Explore Our Menu <ArrowRight size={16} />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ padding: '10rem 5vw', minHeight: '100vh', backgroundColor: colors.cream }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', borderBottom: `1px solid ${colors.border}`, paddingBottom: '2rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.textLight, fontWeight: 600, marginBottom: '1rem' }}>
              CHECKOUT
            </div>
            <h1 style={{ fontFamily: fontSerif, fontSize: 'clamp(2rem, 5vw, 4.5rem)', color: colors.text, fontWeight: 400, margin: 0, lineHeight: 1.1 }}>
              Your Order
            </h1>
          </div>
          <div className="hidden md:block" style={{ fontFamily: fontCursive, fontSize: '2.5rem', color: colors.textLight, transform: 'rotate(-5deg) translateY(-20px)' }}>
             Made fresh ♡
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '2rem', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', border: `1px solid ${colors.border}`, flexWrap: 'wrap' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '8px', overflow: 'hidden', backgroundColor: colors.cream, flexShrink: 0 }}>
                <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: '1 1 200px' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: colors.text, marginBottom: '0.25rem' }}>{item.name}</div>
                <div style={{ color: colors.textLight, fontSize: '0.9rem', marginBottom: '0.5rem' }}>{item.category}</div>
                <div style={{ color: colors.brown, fontWeight: 600, fontSize: '1.1rem' }}>₹{item.price}</div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: colors.cream, border: `1px solid ${colors.border}`, borderRadius: '2rem', padding: '0.25rem' }}>
                  <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', cursor: 'pointer', color: colors.text }}><Minus size={14} /></button>
                  <div style={{ width: '36px', textAlign: 'center', fontWeight: 600, fontSize: '1rem', color: colors.text }}>{item.quantity}</div>
                  <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', cursor: 'pointer', color: colors.text }}><Plus size={14} /></button>
                </div>
                
                <div style={{ fontWeight: 600, color: colors.brown, minWidth: '90px', textAlign: 'right', fontSize: '1.25rem' }}>
                  ₹{item.price * item.quantity}
                </div>

                <button onClick={() => removeFromCart(item.id)} style={{ width: '40px', height: '40px', borderRadius: '50%', background: colors.cream, border: 'none', cursor: 'pointer', color: colors.textLight, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#ffe5e5'} onMouseOut={e => e.currentTarget.style.backgroundColor = colors.cream}>
                  <X size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', padding: '3rem', backgroundColor: '#fff', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '400px', marginBottom: '1rem', fontSize: '1.1rem' }}>
            <span style={{ color: colors.textLight }}>Subtotal</span>
            <span style={{ fontWeight: 600, color: colors.text }}>₹{subtotal}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '400px', marginBottom: '1rem', fontSize: '1.1rem' }}>
            <span style={{ color: colors.textLight }}>Taxes</span>
            <span style={{ fontWeight: 600, color: colors.text }}>Calculated at checkout</span>
          </div>
          <div style={{ width: '100%', maxWidth: '400px', height: '1px', backgroundColor: colors.border, margin: '1rem 0' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '400px', marginBottom: '2.5rem', fontSize: '1.5rem' }}>
            <span style={{ fontWeight: 400, fontFamily: fontSerif, color: colors.text }}>Total</span>
            <span style={{ fontWeight: 600, color: colors.brown }}>₹{subtotal}</span>
          </div>

          <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '400px', flexWrap: 'wrap' }}>
            <Link to="/work/the-cake-room/cakes" style={{ flex: 1, textAlign: 'center', backgroundColor: 'transparent', color: colors.brown, padding: '1rem', borderRadius: '2rem', fontSize: '1rem', fontWeight: 600, border: `1px solid ${colors.border}`, textDecoration: 'none' }}>
              Keep Shopping
            </Link>
            <button onClick={() => { clearCart(); setIsOrdered(true); }} style={{ flex: 1, backgroundColor: colors.brown, color: '#fff', padding: '1rem', borderRadius: '2rem', fontSize: '1rem', fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              Order Now <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
