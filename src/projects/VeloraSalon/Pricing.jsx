import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { colors, fontSerif, fontSans, PrimaryButton } from './Layout';
import { servicesData } from './data';
import { useBooking } from './BookingModal';

const AccordionItem = ({ category, services }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { openBooking } = useBooking();

  return (
    <div style={{ borderBottom: `1px solid ${colors.champagne}`, marginBottom: '1rem', paddingBottom: '1rem' }}>
      <button onClick={() => setIsOpen(!isOpen)} style={{
        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.5rem 0', background: 'none', border: 'none', cursor: 'pointer', color: colors.espresso
      }}>
        <span style={{ fontFamily: fontSerif, fontSize: '2rem', fontWeight: 400 }}>{category}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
          {isOpen ? <Minus size={24} color={colors.taupe} /> : <Plus size={24} color={colors.espresso} />}
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '1rem 0 3rem' }}>
              {services.map((svc, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 500, color: colors.espresso, marginBottom: '0.25rem' }}>{svc.name}</div>
                    <div style={{ fontSize: '0.85rem', color: colors.taupe }}>{svc.desc}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: colors.espresso }}>${svc.price}</div>
                    <button onClick={openBooking} style={{ background: 'none', border: 'none', color: colors.taupe, cursor: 'pointer', display: 'flex', alignItems: 'center' }} onMouseEnter={e => e.currentTarget.style.color = colors.espresso} onMouseLeave={e => e.currentTarget.style.color = colors.taupe}>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Pricing() {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  const { openBooking } = useBooking();

  return (
    <div style={{ backgroundColor: colors.ivory }}>
      
      <section style={{ padding: '12rem 5vw 8rem', backgroundColor: colors.darkBg, color: colors.ivory, textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: colors.champagne, textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: 600 }}>INVEST IN YOURSELF</div>
          <h1 style={{ fontFamily: fontSerif, fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', color: colors.ivory, lineHeight: 1.1, fontWeight: 400, marginBottom: '2rem' }}>
            Service Menu.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto' }}>
            Transparent pricing for our bespoke services. All services include a personalized consultation.
          </p>
        </div>
      </section>

      <section style={{ padding: '8rem 5vw' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {Object.entries(servicesData).map(([category, services]) => (
            <AccordionItem key={category} category={category} services={services} />
          ))}
          
          <div style={{ marginTop: '6rem', textAlign: 'center' }}>
             <PrimaryButton dark={false} onClick={openBooking}>Book Your Appointment</PrimaryButton>
          </div>
        </div>
      </section>

    </div>
  );
}
