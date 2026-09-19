import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { colors, fontSerif, fontSans, PrimaryButton } from './Layout';
import { useBooking } from './BookingModal';

export default function Visit() {
  const { openBooking } = useBooking();
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ backgroundColor: colors.ivory, overflow: 'hidden' }}>
      
      {/* Split Hero */}
      <style>{`
        @media (max-width: 480px) {
          .vs-visit-split { flex-direction: column !important; }
          .vs-visit-split > div { flex: 1 1 100% !important; width: 100% !important; min-height: 400px; }
        }
      `}</style>
      <section className="vs-visit-split" style={{ display: 'flex', minHeight: '100vh', flexWrap: 'wrap' }}>
        
        {/* Left Info */}
        <div style={{ flex: '1 1 500px', padding: '12rem 5vw 5rem', backgroundColor: colors.darkBg, color: colors.ivory, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: colors.champagne, textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: 600 }}>VISIT US</div>
            <h1 style={{ fontFamily: fontSerif, fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', color: colors.ivory, lineHeight: 1.1, fontWeight: 400, marginBottom: '3rem' }}>
              Your space<br/>to unwind.
            </h1>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '4rem' }}>
              
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <MapPin size={24} color={colors.champagne} strokeWidth={1.5} style={{ marginTop: '4px' }} />
                <div>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem', fontWeight: 600 }}>Location</div>
                  <div style={{ fontSize: '1.1rem', color: colors.ivory, lineHeight: 1.6 }}>123 Beauty Lane,<br/>Jaipur, Rajasthan 302001</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <Clock size={24} color={colors.champagne} strokeWidth={1.5} style={{ marginTop: '4px' }} />
                <div>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem', fontWeight: 600 }}>Hours</div>
                  <div style={{ fontSize: '1.1rem', color: colors.ivory, lineHeight: 1.6 }}>Monday - Sunday<br/>10:00 AM – 9:00 PM</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <Phone size={24} color={colors.champagne} strokeWidth={1.5} style={{ marginTop: '4px' }} />
                <div>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem', fontWeight: 600 }}>Contact</div>
                  <div style={{ fontSize: '1.1rem', color: colors.ivory, lineHeight: 1.6 }}>+91 98765 43210<br/>hello@velorasalon.com</div>
                </div>
              </div>

            </div>

            <PrimaryButton dark={true} onClick={openBooking}>Book Appointment</PrimaryButton>
          </div>
        </div>

        {/* Right Image */}
        <div style={{ flex: '1 1 500px', position: 'relative' }}>
          <img src="/assets/velora_salon_interior.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', bottom: '3rem', right: '3rem', display: 'flex', gap: '1rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: colors.darkBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.ivory, cursor: 'pointer' }}><Instagram size={20} /></div>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: colors.darkBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.ivory, cursor: 'pointer' }}><Facebook size={20} /></div>
          </div>
        </div>
        
      </section>

    </div>
  );
}
