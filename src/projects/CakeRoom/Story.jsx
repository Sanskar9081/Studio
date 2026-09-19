import React from 'react';
import { motion } from 'framer-motion';

const colors = {
  brown: '#1F1512', text: '#2A1A18', textLight: '#8C736D', cream: '#F8F6F0', border: 'rgba(45, 36, 34, 0.1)', accent: '#D99B29'
};
const fontSerif = '"Playfair Display", "Georgia", "Times New Roman", serif';
const fontCursive = '"Brush Script MT", cursive';

export default function Story() {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ minHeight: '100vh', backgroundColor: colors.cream, paddingTop: '73px' }}>
      
      {/* Hero Section */}
      <section style={{ height: '70vh', position: 'relative', overflow: 'hidden', backgroundColor: colors.brown }}>
        <img src="/assets/story_baker_1789585171405.jpg" alt="Baker dusting flour" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(31,21,18,0.9) 0%, transparent 100%)' }} />
        
        <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '5vw', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontWeight: 600, marginBottom: '1rem' }}>
            OUR STORY
          </div>
          <h1 style={{ fontFamily: fontSerif, fontSize: 'clamp(2.5rem, 7vw, 6rem)', color: '#fff', fontWeight: 400, margin: 0, lineHeight: 1.1 }}>
            Baking memories<br/><span style={{ fontStyle: 'italic' }}>since 2020.</span>
          </h1>
          <div className="hidden md:block" style={{ position: 'absolute', right: '10%', bottom: '20%', fontFamily: fontCursive, fontSize: '3rem', color: colors.accent, transform: 'rotate(-5deg)', opacity: 0.9 }}>
            Made with love ♡
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 480px) {
          .cr-story-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      {/* Content Section */}
      <section style={{ padding: '8rem 5vw' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{ fontSize: '1.5rem', lineHeight: 1.8, color: colors.text, marginBottom: '4rem', fontWeight: 500, textAlign: 'center', fontFamily: fontSerif }}>
            "The Cake Room was born out of a desire to bring people closer through the joy of good food. We believe that every cake, pastry, and bread has the power to turn an ordinary day into a special one."
          </p>

          <div className="cr-story-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontFamily: fontSerif, fontSize: '2.5rem', color: colors.brown, fontWeight: 400, marginBottom: '1.5rem' }}>It started in a small kitchen.</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: colors.textLight, marginBottom: '1.5rem' }}>
                What began as a weekend passion project for our founder quickly turned into a neighborhood favorite. We spent months perfecting our sourdough starter, sourcing the finest local organic flour, and finding the perfect balance of sweetness for our signature chocolate truffle cake.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: colors.textLight }}>
                Today, we operate with the exact same philosophy. No shortcuts, no artificial preservatives, just honest, handcrafted baking done fresh every single morning.
              </p>
            </div>
            
            <div style={{ position: 'relative' }}>
              <img src="/assets/bakery_interior_1789584826791.jpg" alt="Bakery interior" style={{ width: '100%', borderRadius: '8px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
              <div className="hidden md:block" style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '150px', height: '150px', backgroundColor: colors.brown, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: fontCursive, fontSize: '2rem', transform: 'rotate(-10deg)' }}>
                100%<br/>Local
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </motion.div>
  );
}
