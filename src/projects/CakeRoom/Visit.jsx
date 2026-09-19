import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';

const colors = {
  brown: '#1F1512', text: '#2A1A18', textLight: '#8C736D', cream: '#F8F6F0', border: 'rgba(45, 36, 34, 0.1)', accent: '#D99B29'
};
const fontSerif = '"Playfair Display", "Georgia", "Times New Roman", serif';
const fontCursive = '"Brush Script MT", cursive';

export default function Visit() {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ minHeight: '100vh', backgroundColor: colors.cream, paddingTop: '73px' }}>
      
      <style>{`
        @media (max-width: 480px) {
          .cr-visit-grid { grid-template-columns: 1fr !important; }
          .cr-visit-card { padding: 2rem !important; }
        }
      `}</style>
      {/* Hero Section */}
      <section style={{ height: '60vh', position: 'relative', overflow: 'hidden' }}>
        <img src="/assets/bakery_interior_1789584826791.jpg" alt="Bakery interior" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(248, 246, 240, 1) 0%, rgba(248, 246, 240, 0.4) 50%, rgba(31,21,18,0.4) 100%)' }} />
        
        <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '5vw', maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontFamily: fontSerif, fontSize: 'clamp(2.5rem, 7vw, 6rem)', color: colors.text, fontWeight: 400, margin: 0, lineHeight: 1.1 }}>
            Find Our Bakery.
          </h1>
          <div className="hidden md:block" style={{ fontFamily: fontCursive, fontSize: '2.5rem', color: colors.textLight, transform: 'rotate(-5deg) translateY(-20px)' }}>
            We'd love to see you ♡
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section style={{ padding: '4rem 5vw 8rem 5vw' }}>
        <div className="cr-visit-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          
          <div className="cr-visit-card" style={{ backgroundColor: '#fff', padding: '4rem', borderRadius: '12px', border: `1px solid ${colors.border}`, display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: colors.brown, marginBottom: '1rem' }}>
                <MapPin size={24} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Location</h3>
              </div>
              <p style={{ fontSize: '1.1rem', color: colors.textLight, lineHeight: 1.6, margin: 0 }}>
                123 Baker's Lane<br/>
                Jaipur, Rajasthan 302001<br/>
                India
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: colors.brown, marginBottom: '1rem' }}>
                <Clock size={24} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Hours</h3>
              </div>
              <p style={{ fontSize: '1.1rem', color: colors.textLight, lineHeight: 1.6, margin: 0 }}>
                Monday – Friday: 8:00 AM - 8:00 PM<br/>
                Saturday & Sunday: 9:00 AM - 9:00 PM
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: colors.brown, marginBottom: '1rem' }}>
                <Phone size={24} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Contact</h3>
              </div>
              <p style={{ fontSize: '1.1rem', color: colors.textLight, lineHeight: 1.6, margin: 0 }}>
                +91 98765 43210<br/>
                hello@thecakeroom.com
              </p>
            </div>

          </div>
          
          <div style={{ borderRadius: '12px', overflow: 'hidden', border: `1px solid ${colors.border}`, minHeight: '500px', position: 'relative', backgroundColor: '#e5e3df' }}>
            {/* Map Placeholder */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.5, backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%232A1A18\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
            
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '200px', height: '200px', borderRadius: '50%', backgroundColor: 'rgba(217, 155, 41, 0.1)', border: `2px solid ${colors.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: colors.accent, boxShadow: `0 0 20px ${colors.accent}` }} />
              </div>
              <button style={{ 
                marginTop: '-2rem', backgroundColor: colors.brown, color: '#fff', padding: '1rem 2rem', 
                borderRadius: '2rem', fontSize: '0.9rem', fontWeight: 600, border: 'none', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
              }}>
                Get Directions <Navigation size={16} />
              </button>
            </div>
          </div>

        </div>
      </section>
      
    </motion.div>
  );
}
