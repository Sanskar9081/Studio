import React from 'react';
import { motion } from 'framer-motion';
import { colors, fontSerif, PrimaryButton } from './Layout';
import { teamData } from './data';
import { useBooking } from './BookingModal';

export default function About() {
  const { openBooking } = useBooking();
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ backgroundColor: colors.ivory, overflow: 'hidden' }}>
      <style>{`
        @media (max-width: 480px) {
          .vs-about-split { grid-template-columns: 1fr !important; }
        }
      `}</style>
      {/* Editorial Hero */}
      <section style={{ height: '90vh', position: 'relative', overflow: 'hidden' }}>
        <img src="/assets/velora_salon_interior.jpg" alt="Velora Interior" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,21,19,0.3)' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '5vw', color: colors.ivory }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: 600 }}>OUR STORY</div>
          <h1 style={{ fontFamily: fontSerif, fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', lineHeight: 1.05, fontWeight: 400 }}>
            More Than<br/>A Salon.
          </h1>
        </div>
      </section>

      {/* Philosophy Section */}
      <section style={{ padding: '10rem 5vw', backgroundColor: colors.ivory }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: fontSerif, fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: colors.espresso, lineHeight: 1.3, fontWeight: 400, marginBottom: '3rem' }}>
            "We believe beauty is deeply personal. It's not about changing who you are, but revealing the most confident version of yourself."
          </h2>
          <p style={{ color: colors.taupe, fontSize: '1.1rem', lineHeight: 1.8, maxWidth: '700px', margin: '0 auto' }}>
            Founded in 2026, Velora Salon was built on a simple premise: a salon visit shouldn't feel like an errand. It should be a sanctuary. A moment of pause where expert craftsmanship meets genuine care. From our carefully curated product lines to our thoughtfully designed interior, every detail exists to make you feel completely at ease.
          </p>
        </div>
      </section>

      {/* Image Split */}
      <section className="vs-about-split" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', height: '70vh' }}>
         <img src="/assets/velora_hair_styling_new_1789809180209.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
         <img src="/assets/velora_hair_color_new_1789809157239.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
      </section>

      {/* Team Section */}
      <section style={{ padding: '10rem 5vw', backgroundColor: colors.darkBg, color: colors.ivory }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '5rem' }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: colors.champagne, textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: 600 }}>THE ARTISTS</div>
            <h2 style={{ fontFamily: fontSerif, fontSize: 'clamp(2rem, 5vw, 4.5rem)', lineHeight: 1.1, fontWeight: 400 }}>
              Meet The Team
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            {teamData.map((member, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: '16px', overflow: 'hidden' }}>
                  <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)', transition: 'filter 0.4s' }} onMouseEnter={e => e.currentTarget.style.filter = 'grayscale(0%)'} onMouseLeave={e => e.currentTarget.style.filter = 'grayscale(100%)'} />
                </div>
                <div>
                  <h3 style={{ fontFamily: fontSerif, fontSize: '1.5rem', color: colors.ivory, fontWeight: 400, marginBottom: '0.25rem' }}>{member.name}</h3>
                  <div style={{ color: colors.champagne, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>{member.role}</div>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.6 }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
