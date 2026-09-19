import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Clock, ArrowRight, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { colors, fontSerif, fontSans, PrimaryButton } from './Layout';
import { useBooking } from './BookingModal';

export default function Home() {
  const { openBooking } = useBooking();
  const { scrollYProgress } = useScroll();
  
  // Parallax values
  const yHeroText = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const yHeroBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const scaleHeroBg = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const services = [
    { title: 'Haircut & Styling', desc: 'Trendy cuts. Timeless style.', img: '/assets/velora_hair_styling_new_1789809180209.jpg' },
    { title: 'Hair Color', desc: 'Vibrant. Unique. You.', img: '/assets/velora_hair_color_new_1789809157239.jpg' },
    { title: 'Skin Care', desc: 'Healthy skin. Happier you.', img: '/assets/velora_skincare_new_1789809223641.jpg' },
    { title: 'Bridal & Party', desc: 'For your special moments.', img: '/assets/velora_hero_new_1789809200926.jpg' }, 
    { title: "Men's Grooming", desc: 'Sharp looks. All day.', img: '/assets/velora_mens_grooming.jpg' } 
  ];

  // Before / After Slider state
  const sliderRef = useRef(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(pos);
  };

  const handleDown = () => setIsDragging(true);
  const handleUp = () => setIsDragging(false);

  useEffect(() => {
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, []);

  return (
    <div style={{ backgroundColor: colors.ivory, overflow: 'hidden' }}>
      <style>{`
        @media (max-width: 899px) {
          .vs-hero-content { padding-top: 15vh !important; }
          .vs-hero-cta { flex-direction: column !important; align-items: flex-start !important; gap: 1.5rem !important; }
          .vs-hero-stats { margin-top: 2rem !important; flex-direction: column !important; align-items: flex-start !important; gap: 1.5rem !important; }
          .vs-hero-stats > div { display: none !important; } /* Hide the vertical separator line */
          .vs-features { flex-direction: column !important; align-items: flex-start !important; gap: 2rem !important; }
          .vs-services-header { flex-direction: column !important; align-items: flex-start !important; margin-bottom: 3rem !important; }
          .vs-services-header > div:last-child { display: none !important; } /* Hide the '01' on mobile */
          .vs-transform-container { flex-direction: column !important; gap: 3rem !important; }
          .vs-transform-text { flex: 1 1 100% !important; width: 100% !important; }
          .vs-transform-slider { flex: 1 1 100% !important; width: 100% !important; }
          .vs-visit-container { flex-direction: column !important; gap: 3rem !important; }
          .vs-visit-text { flex: 1 1 100% !important; width: 100% !important; }
          .vs-visit-images { flex: 1 1 100% !important; width: 100% !important; height: 400px !important; }
        }
      `}</style>
      
      {/* 3D CAMPAIGN HERO */}
      <section style={{ height: '100vh', position: 'relative', overflow: 'hidden', backgroundColor: colors.darkBg }}>
        {/* Full Bleed 3D Background */}
        <motion.div style={{ position: 'absolute', inset: 0, y: yHeroBg, scale: scaleHeroBg }}>
          <img src="/assets/velora_3d_hero.jpg" alt="Luxury 3D Salon Composition" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {/* Subtle vignette/overlay for text readability */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(21,17,16,0.9) 0%, rgba(21,17,16,0.5) 40%, rgba(21,17,16,0.1) 100%)' }} />
        </motion.div>

        {/* Hero Content */}
        <motion.div className="vs-hero-content" style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: '28vh', paddingLeft: '5vw', paddingRight: '5vw', paddingBottom: '2rem', maxWidth: '1400px', margin: '0 auto', y: yHeroText }}>
          
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.25em', color: colors.ivory, textTransform: 'uppercase', marginBottom: '2rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>BEAUTY LIVES IN THE DETAILS</span>
            <div style={{ width: '40px', height: '1px', backgroundColor: colors.ivory }}></div>
          </div>
          
          <h1 style={{ fontFamily: fontSerif, fontSize: 'clamp(2.5rem, 7vw, 7rem)', color: colors.ivory, lineHeight: 1.05, fontWeight: 400, marginBottom: '2rem' }}>
            Confidence<br/>Looks Good<br/><span style={{ fontStyle: 'italic' }}>On You.</span>
          </h1>
          
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '3.5rem', maxWidth: '450px' }}>
            At Velora, we don't just style hair or treat skin. We create moments of pause in your busy life — where you can simply be you.
          </p>
          
          <div className="vs-hero-cta" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            <PrimaryButton onClick={openBooking} dark={true}>Book Your Appointment</PrimaryButton>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', color: colors.ivory, transition: 'opacity 0.3s' }} onMouseEnter={e => e.currentTarget.style.opacity = 0.8} onMouseLeave={e => e.currentTarget.style.opacity = 1}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: `1px solid rgba(255,255,255,0.4)`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Play size={16} fill={colors.ivory} style={{ marginLeft: '4px' }} />
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.05em' }}>Watch Our Story</span>
            </div>
          </div>

          <div className="vs-hero-stats" style={{ display: 'flex', alignItems: 'center', gap: '3rem', marginTop: '6rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                  {[1,2,3].map(i => <img key={i} src={`/assets/velora_hero_new_1789809200926.jpg`} style={{ width: '44px', height: '44px', borderRadius: '50%', border: `2px solid ${colors.darkBg}`, marginLeft: i > 1 ? '-15px' : '0', objectFit: 'cover' }} alt="client" />)}
              </div>
              <div style={{ color: colors.ivory, fontSize: '0.9rem', fontWeight: 600 }}>
                5K+ <br/><span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 400, fontSize: '0.75rem' }}>Happy Clients</span>
              </div>
            </div>
            <div style={{ width: '1px', height: '35px', backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: colors.ivory, fontWeight: 600 }}>
                4.8 <span style={{ fontSize: '1.4rem', color: colors.accent }}>★</span> <br/><span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 400, fontSize: '0.75rem' }}>Google Rating</span>
            </div>
          </div>
          
        </motion.div>

        <div className="hidden md:block" style={{ position: 'absolute', right: '5vw', top: '15vh', fontFamily: '"Dancing Script", cursive', fontSize: '4rem', color: '#fff', transform: 'rotate(-5deg)', opacity: 0.9, textShadow: '0 4px 20px rgba(0,0,0,0.5)', zIndex: 10, textAlign: 'right', pointerEvents: 'none' }}>
          Good<br/>Hair<br/>Brighter<br/>Days ♡
        </div>
      </section>

      {/* Features Strip */}
      <section style={{ backgroundColor: '#ECE9E4', padding: '3rem 5vw', display: 'flex', justifyContent: 'center' }}>
        <div className="vs-features" style={{ maxWidth: '1400px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          {[
            { title: 'Expert Stylists', desc: 'Trained. Trusted. Talented.' },
            { title: 'Premium Products', desc: 'Global brands. Real results.' },
            { title: 'Personalized Care', desc: 'Because you\'re unique.' },
            { title: 'Relaxing Experience', desc: 'A space to unwind.' }
          ].map((feat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
               <div style={{ width: '40px', height: '40px', border: `1px solid ${colors.taupe}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <div style={{ width: '8px', height: '8px', backgroundColor: colors.accent, borderRadius: '50%' }} />
               </div>
               <div>
                 <div style={{ fontSize: '0.9rem', fontWeight: 600, color: colors.espresso }}>{feat.title}</div>
                 <div style={{ fontSize: '0.75rem', color: colors.taupe }}>{feat.desc}</div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDITORIAL SERVICES SECTION */}
      <section style={{ padding: '10rem 5vw', backgroundColor: colors.ivory }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div className="vs-services-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5rem', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ maxWidth: '500px' }}>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: colors.taupe, textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: 600 }}>
                OUR SERVICES
              </div>
              <h2 style={{ fontFamily: fontSerif, fontSize: 'clamp(2rem, 5vw, 4.5rem)', color: colors.espresso, lineHeight: 1.1, fontWeight: 400, marginBottom: '2rem' }}>
                Beauty,<br/>Your Way.
              </h2>
              <p style={{ color: colors.taupe, fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                From effortless everyday styles to special occasion looks, we offer a complete range of hair, skin and beauty services tailored to you.
              </p>
              <button style={{
                backgroundColor: 'transparent', color: colors.espresso, padding: '0.8rem 0',
                fontSize: '0.9rem', fontWeight: 600, border: 'none', borderBottom: `2px solid ${colors.espresso}`,
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em'
              }}>
                Explore All Services <ArrowRight size={16} />
              </button>
            </div>
            <div style={{ fontSize: '5rem', fontFamily: fontSerif, color: colors.champagne, lineHeight: 1 }}>01</div>
          </div>

          {/* Custom Editorial Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {services.map((svc, i) => (
              <div key={i} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                onMouseEnter={e => {
                  e.currentTarget.querySelector('img').style.transform = 'scale(1.05)';
                  e.currentTarget.querySelector('.svc-arrow').style.transform = 'translateX(5px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                  e.currentTarget.querySelector('.svc-arrow').style.transform = 'translateX(0)';
                }}
              >
                <div style={{ width: '100%', aspectRatio: '2/3', overflow: 'hidden', borderRadius: '12px', marginBottom: '1.5rem' }}>
                  <img src={svc.img} alt={svc.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }} />
                </div>
                <h3 style={{ fontFamily: fontSans, fontSize: '1.1rem', fontWeight: 600, color: colors.espresso, marginBottom: '0.5rem' }}>{svc.title}</h3>
                <p style={{ fontSize: '0.85rem', color: colors.taupe, marginBottom: '1.5rem' }}>{svc.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', border: `1px solid ${colors.espresso}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowRight className="svc-arrow" size={14} style={{ transition: 'transform 0.3s' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSFORMATIONS SECTION */}
      <section style={{ padding: '8rem 5vw', backgroundColor: colors.darkBg, color: '#fff' }}>
        <div className="vs-transform-container" style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '5rem', flexWrap: 'wrap' }}>
          
          <div className="vs-transform-text" style={{ flex: '1 1 400px' }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: colors.accent, textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: 600 }}>
              TRANSFORMATIONS
            </div>
            <h2 style={{ fontFamily: fontSerif, fontSize: 'clamp(2rem, 5vw, 4.5rem)', lineHeight: 1.1, fontWeight: 400, marginBottom: '2rem' }}>
              Real People.<br/>Real Transformations.
            </h2>
            <div style={{ display: 'flex', gap: '1rem', color: 'rgba(255,255,255,0.4)', marginBottom: '3rem', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
              <span style={{ color: '#fff' }}>01</span> / <span>03</span>
            </div>
            <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', marginBottom: '3rem', maxWidth: '400px' }}>
              "Velora didn't just give me a new look, it gave me a new confidence. The color is exactly what I dreamed of."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img src="/assets/velora_hero_new_1789809200926.jpg" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '1rem' }}>Aarushi Mehta</div>
                <div style={{ color: colors.accent, fontSize: '0.8rem' }}>Regular Client</div>
              </div>
            </div>
          </div>

          <div className="vs-transform-slider" style={{ flex: '1 1 600px', position: 'relative' }}>
            {/* Draggable Before / After Slider */}
            <div 
              ref={sliderRef}
              style={{ width: '100%', aspectRatio: '4/5', position: 'relative', overflow: 'hidden', borderRadius: '16px', cursor: 'ew-resize', touchAction: 'none' }}
              onMouseMove={handleMove}
              onTouchMove={handleMove}
              onMouseDown={handleDown}
              onTouchStart={handleDown}
            >
              {/* After Image (Background) */}
              <img src="/assets/velora_hero_new_1789809200926.jpg" alt="After" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
              <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>After</div>

              {/* Before Image (Clipped) */}
              <div style={{ position: 'absolute', inset: 0, width: `${sliderPosition}%`, overflow: 'hidden' }}>
                <img src="/assets/velora_before_1789810049902.jpg" alt="Before" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Before</div>
              </div>

              {/* Slider Line */}
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${sliderPosition}%`, width: '2px', backgroundColor: '#fff', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <ChevronLeft size={16} color={colors.darkBg} />
                    <ChevronRight size={16} color={colors.darkBg} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block" style={{ position: 'absolute', top: '10%', right: '-10%', fontFamily: '"Dancing Script", cursive', fontSize: '4rem', color: colors.accent, transform: 'rotate(10deg)', opacity: 0.8, pointerEvents: 'none' }}>
              Same<br/>You<br/>Bolder
            </div>
          </div>

        </div>
      </section>

      {/* SALON EXPERIENCE / 3D SECTION */}
      <section style={{ height: '80vh', position: 'relative', overflow: 'hidden' }}>
        <img src="/assets/velora_salon_interior.jpg" alt="Velora Salon Interior" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26, 21, 19, 0.4)' }} />
        
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div>
            <div style={{ fontFamily: fontSans, fontSize: '2rem', letterSpacing: '0.3em', fontWeight: 400, color: '#fff', marginBottom: '2rem' }}>
              VELORA<br/><span style={{ fontSize: '0.8rem', letterSpacing: '0.5em', fontWeight: 600 }}>SALON</span>
            </div>
            <h2 style={{ fontFamily: fontSerif, fontSize: 'clamp(1.5rem, 4vw, 3rem)', color: colors.champagne, fontWeight: 400, letterSpacing: '0.1em', lineHeight: 1.4 }}>
              A SANCTUARY<br/>FOR YOUR<br/>SELF CARE
            </h2>
            <button style={{ marginTop: '3rem', backgroundColor: 'transparent', border: '1px solid #fff', color: '#fff', padding: '1rem 2rem', borderRadius: '3rem', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'background 0.3s' }} onMouseOver={e => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = colors.darkBg; }} onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#fff'; }}>
              <Play size={16} /> Take a Tour
            </button>
          </div>
        </div>
      </section>

      {/* VISIT US */}
      <section style={{ padding: '10rem 5vw', backgroundColor: colors.ivory }}>
        <div className="vs-visit-container" style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          
          <div className="vs-visit-text" style={{ flex: '1 1 400px' }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: colors.taupe, textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: 600 }}>
              VISIT US
            </div>
            <h2 style={{ fontFamily: fontSerif, fontSize: 'clamp(2rem, 5vw, 4.5rem)', color: colors.espresso, lineHeight: 1.1, fontWeight: 400, marginBottom: '4rem' }}>
              A Calmer,<br/>Happier You.
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '4rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <MapPin size={28} color={colors.espresso} strokeWidth={1.5} />
                <div>
                  <div style={{ fontSize: '1.1rem', color: colors.espresso, lineHeight: 1.6 }}>123 Beauty Lane,<br/>Jaipur, Rajasthan</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <Clock size={28} color={colors.espresso} strokeWidth={1.5} />
                <div>
                  <div style={{ fontSize: '1.1rem', color: colors.espresso, lineHeight: 1.6 }}>10:00 AM – 9:00 PM<br/>(Open Daily)</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <PrimaryButton dark={false}>Get Directions</PrimaryButton>
              <button onClick={openBooking} style={{ padding: '1rem 2.2rem', borderRadius: '4rem', fontSize: '0.85rem', fontWeight: 600, border: `1px solid ${colors.espresso}`, backgroundColor: 'transparent', color: colors.espresso, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Book Appointment
              </button>
            </div>
          </div>

          <div className="vs-visit-images" style={{ flex: '1 1 500px', display: 'flex', gap: '1.5rem', height: '600px' }}>
            <div style={{ flex: 2, height: '100%', borderRadius: '16px', overflow: 'hidden' }}>
              <img src="/assets/velora_salon_interior.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden' }}>
                 <img src="/assets/velora_skincare_new_1789809223641.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
              </div>
              <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', backgroundColor: colors.lightGray, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
                 <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', fontWeight: 600, lineHeight: 1.6, color: colors.taupe }}>
                   SELF CARE ISN'T A LUXURY.<br/>IT'S A NECESSITY.
                 </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
