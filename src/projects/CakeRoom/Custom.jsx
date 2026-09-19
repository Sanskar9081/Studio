import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const colors = {
  brown: '#1F1512', text: '#2A1A18', textLight: '#8C736D', cream: '#F8F6F0', border: 'rgba(45, 36, 34, 0.1)', accent: '#D99B29'
};
const fontSerif = '"Playfair Display", "Georgia", "Times New Roman", serif';
const fontCursive = '"Brush Script MT", cursive';

export default function Custom() {
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '12rem 5vw', minHeight: '100vh', textAlign: 'center', backgroundColor: colors.brown, paddingTop: '20vh', color: '#fff' }}>
        <h1 style={{ fontFamily: fontSerif, fontSize: 'clamp(2rem, 5vw, 4.5rem)', marginBottom: '1.5rem', fontWeight: 400 }}>Request Sent.</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginBottom: '3rem', maxWidth: '400px', margin: '0 auto 3rem auto' }}>
          Our team will contact you shortly to discuss your custom cake vision!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ minHeight: '100vh', backgroundColor: colors.brown, paddingTop: '73px', display: 'flex' }}>
      
      {/* Left Form Section */}
      <div style={{ flex: '1 1 600px', padding: '6rem 5vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#fff' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 600, marginBottom: '1rem' }}>
            CUSTOM CAKES
          </div>
          <h1 style={{ fontFamily: fontSerif, fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontWeight: 400, marginBottom: '1rem', lineHeight: 1.1 }}>
            Let's bake your<br/>dream cake.
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: 1.6 }}>
            Fill out the details below, and our master bakers will get in touch to bring your vision to life.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="cr-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <input type="text" placeholder="First Name" required style={{ width: '100%', padding: '1rem', backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: '1rem', outline: 'none' }} />
              <input type="text" placeholder="Last Name" required style={{ width: '100%', padding: '1rem', backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: '1rem', outline: 'none' }} />
            </div>
            <div className="cr-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <input type="email" placeholder="Email Address" required style={{ width: '100%', padding: '1rem', backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: '1rem', outline: 'none' }} />
              <input type="tel" placeholder="Phone Number" required style={{ width: '100%', padding: '1rem', backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: '1rem', outline: 'none' }} />
            </div>
            
            <input type="text" placeholder="Event Date" required style={{ width: '100%', padding: '1rem', backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: '1rem', outline: 'none' }} />
            
            <textarea placeholder="Tell us about your dream cake (theme, flavors, size, etc.)" required rows="4" style={{ width: '100%', padding: '1rem', backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: '1rem', outline: 'none', resize: 'vertical' }}></textarea>
            
            <button type="submit" style={{ 
              backgroundColor: colors.cream, color: colors.brown, padding: '1.25rem 2.5rem', 
              borderRadius: '2rem', fontSize: '1rem', fontWeight: 600, border: 'none', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              alignSelf: 'flex-start', marginTop: '1rem', transition: 'transform 0.2s ease'
            }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
              Send Request <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Right Image Section */}
      <div style={{ flex: '1 1 500px', position: 'relative', display: 'none', '@media(min-width: 900px)': { display: 'block' } }} className="desktop-img">
        <img src="/assets/custom_cake_1789585184968.jpg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} alt="Custom floral cake" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(31,21,18,1) 0%, transparent 50%)' }} />
        
        <div className="hidden md:block" style={{ position: 'absolute', top: '30%', right: '20%', fontFamily: fontCursive, fontSize: '4rem', color: '#fff', transform: 'rotate(10deg)', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          Your<br/>Story<br/>On Cake ♡
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) { .desktop-img { display: block !important; } }
        @media (max-width: 480px) {
          .cr-form-row { grid-template-columns: 1fr !important; gap: 0 !important; }
          .cr-form-row input { margin-bottom: 2rem !important; }
        }
      `}</style>
      
    </motion.div>
  );
}
