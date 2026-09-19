import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { colors, fontSerif, fontSans, PrimaryButton } from './Layout';
import { servicesData } from './data';
import { useBooking } from './BookingModal';

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('Hair');
  const categories = Object.keys(servicesData);
  const { openBooking } = useBooking();

  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  const catImages = {
    'Hair': '/assets/velora_banner_hair_1789809682505.jpg',
    'Color': '/assets/velora_banner_color_1789809704168.jpg',
    'Skin': '/assets/velora_banner_skin_1789809728756.jpg',
    'Bridal': '/assets/velora_banner_bridal_1789809753829.jpg',
    'Men': '/assets/velora_banner_men_1789809777600.jpg'
  };

  return (
    <div style={{ backgroundColor: colors.ivory }}>
      <style>{`
        @media (max-width: 899px) {
          .vs-services-layout { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .vs-services-sidebar { position: static !important; }
          .vs-services-sidebar-cats { display: flex !important; flex-wrap: wrap !important; gap: 1rem !important; }
          .vs-services-sidebar-cats button { font-size: 1.2rem !important; transform: none !important; margin-right: 1rem; }
          .vs-service-item { grid-template-columns: 1fr !important; gap: 1rem !important; }
          .vs-service-item-price { justify-content: space-between !important; margin-top: 1rem !important; }
        }
      `}</style>
      {/* Header */}
      <section style={{ padding: '12rem 5vw 6rem', backgroundColor: colors.darkBg, color: colors.ivory }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: colors.champagne, textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: 600 }}>OUR SERVICES</div>
            <h1 style={{ fontFamily: fontSerif, fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', color: colors.ivory, lineHeight: 1.1, fontWeight: 400, maxWidth: '600px' }}>
              Designed For<br/>Your Confidence.
            </h1>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '400px' }}>
            We offer a comprehensive menu of high-end salon and spa services. Each treatment is tailored to your unique features and personal style.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '8rem 5vw' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <div className="vs-services-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '5rem' }}>
            
            {/* Sidebar Navigation */}
            <div className="vs-services-sidebar" style={{ position: 'sticky', top: '150px', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignSelf: 'start' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: colors.taupe, marginBottom: '1rem' }}>Categories</div>
              <div className="vs-services-sidebar-cats" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                  background: 'none', border: 'none', fontFamily: fontSerif, fontSize: '1.8rem', textAlign: 'left',
                  color: activeCategory === cat ? colors.espresso : colors.taupe,
                  cursor: 'pointer', transition: 'all 0.3s', fontStyle: activeCategory === cat ? 'italic' : 'normal',
                  transform: activeCategory === cat ? 'translateX(10px)' : 'none'
                }}>
                  {cat}
                </button>
              ))}
              </div>
              
              <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: colors.lightGray, borderRadius: '16px' }}>
                <Star fill={colors.accent} color={colors.accent} size={24} style={{ marginBottom: '1rem' }} />
                <div style={{ fontSize: '1.1rem', fontFamily: fontSerif, color: colors.espresso, marginBottom: '1rem', lineHeight: 1.4 }}>Not sure what you need?</div>
                <div style={{ fontSize: '0.85rem', color: colors.taupe, marginBottom: '1.5rem', lineHeight: 1.6 }}>Book a free consultation with our master stylists.</div>
                <button onClick={openBooking} style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `1px solid ${colors.espresso}`, paddingBottom: '4px', cursor: 'pointer', background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>Book Consultation</button>
              </div>
            </div>

            {/* Services List */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div key={activeCategory} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                  
                  {/* Category Image Header */}
                  <div style={{ width: '100%', height: '300px', borderRadius: '16px', overflow: 'hidden', marginBottom: '3rem' }}>
                    <img src={catImages[activeCategory]} alt={activeCategory} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%' }} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {servicesData[activeCategory].map((service, idx) => (
                      <div key={idx} className="vs-service-item" style={{ 
                        display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'center',
                        padding: '2.5rem 0', borderBottom: `1px solid ${colors.champagne}`
                      }}>
                        
                        <div>
                          <h3 style={{ fontFamily: fontSans, fontSize: '1.3rem', color: colors.espresso, fontWeight: 500, marginBottom: '0.75rem' }}>{service.name}</h3>
                          <p style={{ color: colors.taupe, fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '500px' }}>{service.desc}</p>
                        </div>

                        <div className="vs-service-item-price" style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                          <div style={{ fontFamily: fontSans, fontSize: '1.2rem', color: colors.espresso, fontWeight: 600 }}>₹{service.price}</div>
                          <button onClick={openBooking} style={{
                            width: '44px', height: '44px', borderRadius: '50%', backgroundColor: colors.ivory, border: `1px solid ${colors.espresso}`,
                            display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'all 0.3s'
                          }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = colors.espresso; e.currentTarget.querySelector('svg').style.color = colors.ivory; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = colors.ivory; e.currentTarget.querySelector('svg').style.color = colors.espresso; }}>
                            <ArrowRight size={16} color={colors.espresso} style={{ transition: 'all 0.3s' }} />
                          </button>
                        </div>
                        
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
}
