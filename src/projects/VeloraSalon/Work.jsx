import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, fontSerif, fontSans } from './Layout';
import { portfolioData } from './data';
import { ArrowRight } from 'lucide-react';

export default function Work() {
  const [filter, setFilter] = useState('ALL');
  
  const categories = ['ALL', 'HAIR', 'COLOR', 'BRIDAL', 'SKIN', 'MEN'];
  const filteredData = filter === 'ALL' ? portfolioData : portfolioData.filter(item => item.category === filter);

  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ backgroundColor: colors.ivory }}>
      
      {/* Header */}
      <section style={{ padding: '12rem 5vw 4rem', backgroundColor: colors.darkBg, color: colors.ivory, textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: colors.champagne, textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: 600 }}>PORTFOLIO</div>
          <h1 style={{ fontFamily: fontSerif, fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', color: colors.ivory, lineHeight: 1.1, fontWeight: 400, marginBottom: '2rem' }}>
            The Art Of<br/>Transformation.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto' }}>
            A curated selection of our favorite client transformations. Real people, elevated by our master stylists.
          </p>
        </div>
      </section>

      {/* Filter Menu */}
      <section style={{ padding: '4rem 5vw 2rem', backgroundColor: colors.ivory, position: 'sticky', top: '100px', zIndex: 50 }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} style={{
              background: 'none', border: 'none', fontFamily: fontSans, fontSize: '0.85rem',
              fontWeight: 600, letterSpacing: '0.1em', cursor: 'pointer', paddingBottom: '0.5rem',
              color: filter === cat ? colors.espresso : colors.taupe,
              borderBottom: `2px solid ${filter === cat ? colors.espresso : 'transparent'}`,
              transition: 'all 0.3s'
            }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Portfolio Grid */}
      <section style={{ padding: '2rem 5vw 8rem', backgroundColor: colors.ivory }}>
        <style>{`
          @media (max-width: 480px) {
            .vs-work-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <motion.div layout className="vs-work-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '3rem' }}>
            <AnimatePresence>
              {filteredData.map((item, index) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={index} 
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', cursor: 'pointer' }}
                  onMouseEnter={e => {
                     e.currentTarget.querySelector('.work-img').style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={e => {
                     e.currentTarget.querySelector('.work-img').style.transform = 'scale(1)';
                  }}
                >
                  <div style={{ width: '100%', aspectRatio: '4/5', overflow: 'hidden', borderRadius: '16px', border: 'none' }}>
                     <img className="work-img" src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)', borderRadius: '16px' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontFamily: fontSerif, fontSize: '1.5rem', color: colors.espresso, fontWeight: 400, marginBottom: '0.5rem' }}>{item.title}</h3>
                      <p style={{ color: colors.taupe, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.category}</p>
                    </div>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: `1px solid ${colors.champagne}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <ArrowRight size={14} color={colors.espresso} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
