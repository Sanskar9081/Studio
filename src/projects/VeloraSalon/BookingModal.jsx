import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { colors, fontSerif, fontSans } from './Layout';
import { servicesData, teamData } from './data';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openBooking = () => setIsOpen(true);
  const closeBooking = () => setIsOpen(false);

  return (
    <BookingContext.Provider value={{ openBooking, closeBooking }}>
      {children}
      <BookingModal isOpen={isOpen} onClose={closeBooking} />
    </BookingContext.Provider>
  );
};

const BookingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    category: '', service: null, stylist: null, date: '', time: '', name: '', email: '', phone: ''
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const reset = () => {
    setStep(1);
    setBookingData({ category: '', service: null, stylist: null, date: '', time: '', name: '', email: '', phone: '' });
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === 'booking-backdrop' && step !== 6) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="booking-backdrop"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            backgroundColor: 'rgba(59, 47, 47, 0.8)', backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end'
          }}
        >
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              backgroundColor: colors.ivory, width: '100%', maxWidth: '500px', height: '100%',
              display: 'flex', flexDirection: 'column', padding: '2rem', overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ fontFamily: fontSerif, fontSize: '1.5rem', color: colors.espresso }}>Book Appointment</div>
              {step !== 6 && (
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.espresso }}>
                  <X size={24} />
                </button>
              )}
            </div>

            <div style={{ flex: 1 }}>
              {step === 1 && (
                <Step1_Service data={bookingData} updateData={setBookingData} next={nextStep} />
              )}
              {step === 2 && (
                <Step2_Stylist data={bookingData} updateData={setBookingData} next={nextStep} prev={prevStep} />
              )}
              {step === 3 && (
                <Step3_DateTime data={bookingData} updateData={setBookingData} next={nextStep} prev={prevStep} />
              )}
              {step === 4 && (
                <Step4_Details data={bookingData} updateData={setBookingData} next={nextStep} prev={prevStep} />
              )}
              {step === 5 && (
                <Step5_Confirm data={bookingData} next={nextStep} prev={prevStep} />
              )}
              {step === 6 && (
                <Step6_Success reset={reset} />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- STEPS ---

const Step1_Service = ({ data, updateData, next }) => {
  const categories = Object.keys(servicesData);
  
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      <h3 style={{ fontSize: '1.25rem', color: colors.espresso, marginBottom: '1.5rem', fontWeight: 400 }}>1. Select a Service</h3>
      {!data.category ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => updateData({ ...data, category: cat })} style={{
              padding: '1.25rem', textAlign: 'left', backgroundColor: '#fff', border: `1px solid ${colors.champagne}`,
              borderRadius: '8px', fontSize: '1rem', color: colors.espresso, cursor: 'pointer',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              {cat} <ArrowRight size={16} color={colors.taupe} />
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => updateData({ ...data, category: '', service: null })} style={{
            background: 'none', border: 'none', color: colors.taupe, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '1rem'
          }}>
            <ArrowLeft size={14} /> Back to Categories
          </button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {servicesData[data.category].map(svc => (
              <div key={svc.id} onClick={() => { updateData({ ...data, service: svc }); next(); }} style={{
                padding: '1.25rem', backgroundColor: '#fff', border: `1px solid ${colors.champagne}`,
                borderRadius: '8px', cursor: 'pointer', transition: 'border-color 0.3s'
              }}>
                <div style={{ fontSize: '1.05rem', fontWeight: 600, color: colors.espresso, marginBottom: '0.25rem' }}>{svc.name}</div>
                <div style={{ fontSize: '0.85rem', color: colors.taupe, marginBottom: '0.75rem' }}>{svc.duration}</div>
                <div style={{ fontSize: '0.9rem', color: colors.espresso, fontWeight: 500 }}>From ₹{svc.price}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

const Step2_Stylist = ({ data, updateData, next, prev }) => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
    <button onClick={prev} style={{ background: 'none', border: 'none', color: colors.taupe, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '1rem' }}>
      <ArrowLeft size={14} /> Back
    </button>
    <h3 style={{ fontSize: '1.25rem', color: colors.espresso, marginBottom: '1.5rem', fontWeight: 400 }}>2. Select a Professional</h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div onClick={() => { updateData({ ...data, stylist: { name: 'Any Available Professional' } }); next(); }} style={{
        padding: '1.25rem', backgroundColor: '#fff', border: `1px solid ${colors.champagne}`, borderRadius: '8px', cursor: 'pointer', fontWeight: 500, color: colors.espresso
      }}>
        Any Available Professional
      </div>
      {teamData.map(member => (
        <div key={member.id} onClick={() => { updateData({ ...data, stylist: member }); next(); }} style={{
          padding: '1rem', backgroundColor: '#fff', border: `1px solid ${colors.champagne}`, borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem'
        }}>
          <img src={member.img} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} alt={member.name} />
          <div>
            <div style={{ fontWeight: 600, color: colors.espresso }}>{member.name}</div>
            <div style={{ fontSize: '0.8rem', color: colors.taupe }}>{member.role}</div>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const Step3_DateTime = ({ data, updateData, next, prev }) => {
  const dates = ['Today', 'Tomorrow', 'Oct 24', 'Oct 25', 'Oct 26'];
  const times = ['10:00 AM', '11:30 AM', '01:00 PM', '03:30 PM', '05:00 PM'];
  
  const canProceed = data.date && data.time;

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <button onClick={prev} style={{ background: 'none', border: 'none', color: colors.taupe, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '1rem' }}>
        <ArrowLeft size={14} /> Back
      </button>
      <h3 style={{ fontSize: '1.25rem', color: colors.espresso, marginBottom: '1.5rem', fontWeight: 400 }}>3. Select Date & Time</h3>
      
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.9rem', color: colors.taupe, marginBottom: '0.75rem' }}>Select Date</div>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
          {dates.map(d => (
            <button key={d} onClick={() => updateData({ ...data, date: d })} style={{
              padding: '0.75rem 1rem', borderRadius: '8px', border: `1px solid ${data.date === d ? colors.espresso : colors.champagne}`,
              backgroundColor: data.date === d ? colors.espresso : '#fff', color: data.date === d ? '#fff' : colors.espresso,
              whiteSpace: 'nowrap', cursor: 'pointer'
            }}>{d}</button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.9rem', color: colors.taupe, marginBottom: '0.75rem' }}>Select Time</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          {times.map(t => (
            <button key={t} onClick={() => updateData({ ...data, time: t })} style={{
              padding: '0.75rem', borderRadius: '8px', border: `1px solid ${data.time === t ? colors.espresso : colors.champagne}`,
              backgroundColor: data.time === t ? colors.espresso : '#fff', color: data.time === t ? '#fff' : colors.espresso,
              cursor: 'pointer'
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
        <button disabled={!canProceed} onClick={next} style={{
          width: '100%', padding: '1rem', backgroundColor: canProceed ? colors.espresso : colors.taupe, color: '#fff',
          border: 'none', borderRadius: '3rem', fontSize: '1rem', fontWeight: 500, cursor: canProceed ? 'pointer' : 'not-allowed',
          opacity: canProceed ? 1 : 0.5
        }}>Continue</button>
      </div>
    </motion.div>
  );
};

const Step4_Details = ({ data, updateData, next, prev }) => {
  const canProceed = data.name.length > 2 && data.phone.length >= 10;
  
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <button onClick={prev} style={{ background: 'none', border: 'none', color: colors.taupe, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '1rem' }}>
        <ArrowLeft size={14} /> Back
      </button>
      <h3 style={{ fontSize: '1.25rem', color: colors.espresso, marginBottom: '1.5rem', fontWeight: 400 }}>4. Your Details</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: colors.taupe, marginBottom: '0.5rem' }}>Full Name *</label>
          <input type="text" value={data.name} onChange={e => updateData({ ...data, name: e.target.value })} style={{
            width: '100%', padding: '1rem', borderRadius: '8px', border: `1px solid ${colors.champagne}`, fontSize: '1rem', outline: 'none'
          }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: colors.taupe, marginBottom: '0.5rem' }}>Phone Number *</label>
          <input type="tel" value={data.phone} onChange={e => updateData({ ...data, phone: e.target.value })} style={{
            width: '100%', padding: '1rem', borderRadius: '8px', border: `1px solid ${colors.champagne}`, fontSize: '1rem', outline: 'none'
          }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: colors.taupe, marginBottom: '0.5rem' }}>Email Address (Optional)</label>
          <input type="email" value={data.email} onChange={e => updateData({ ...data, email: e.target.value })} style={{
            width: '100%', padding: '1rem', borderRadius: '8px', border: `1px solid ${colors.champagne}`, fontSize: '1rem', outline: 'none'
          }} />
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
        <button disabled={!canProceed} onClick={next} style={{
          width: '100%', padding: '1rem', backgroundColor: canProceed ? colors.espresso : colors.taupe, color: '#fff',
          border: 'none', borderRadius: '3rem', fontSize: '1rem', fontWeight: 500, cursor: canProceed ? 'pointer' : 'not-allowed',
          opacity: canProceed ? 1 : 0.5
        }}>Review Booking</button>
      </div>
    </motion.div>
  );
};

const Step5_Confirm = ({ data, next, prev }) => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <button onClick={prev} style={{ background: 'none', border: 'none', color: colors.taupe, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '1rem' }}>
      <ArrowLeft size={14} /> Back
    </button>
    <h3 style={{ fontSize: '1.25rem', color: colors.espresso, marginBottom: '1.5rem', fontWeight: 400 }}>5. Confirm Appointment</h3>
    
    <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', border: `1px solid ${colors.champagne}`, marginBottom: '2rem' }}>
      <div style={{ fontSize: '1.1rem', fontWeight: 600, color: colors.espresso, marginBottom: '0.5rem' }}>{data.service.name}</div>
      <div style={{ fontSize: '0.9rem', color: colors.taupe, marginBottom: '1.5rem', borderBottom: `1px solid ${colors.champagne}`, paddingBottom: '1.5rem' }}>
        with {data.stylist.name}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span style={{ color: colors.taupe, fontSize: '0.9rem' }}>Date & Time</span>
        <span style={{ color: colors.espresso, fontWeight: 500, fontSize: '0.9rem' }}>{data.date} at {data.time}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span style={{ color: colors.taupe, fontSize: '0.9rem' }}>Duration</span>
        <span style={{ color: colors.espresso, fontWeight: 500, fontSize: '0.9rem' }}>{data.service.duration}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: colors.taupe, fontSize: '0.9rem' }}>Estimated Price</span>
        <span style={{ color: colors.espresso, fontWeight: 500, fontSize: '0.9rem' }}>₹{data.service.price}</span>
      </div>
    </div>
    
    <div style={{ fontSize: '0.85rem', color: colors.taupe, lineHeight: 1.5 }}>
      Your payment will be collected at the salon. Please arrive 10 minutes prior to your appointment time.
    </div>

    <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
      <button onClick={next} style={{
        width: '100%', padding: '1rem', backgroundColor: colors.espresso, color: '#fff',
        border: 'none', borderRadius: '3rem', fontSize: '1rem', fontWeight: 500, cursor: 'pointer'
      }}>Confirm Appointment</button>
    </div>
  </motion.div>
);

const Step6_Success = ({ reset }) => (
  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
    <div style={{ color: '#4CAF50', marginBottom: '1.5rem' }}>
      <CheckCircle size={64} strokeWidth={1.5} />
    </div>
    <h3 style={{ fontFamily: fontSerif, fontSize: '2rem', color: colors.espresso, marginBottom: '1rem', fontWeight: 400 }}>Appointment Confirmed</h3>
    <p style={{ color: colors.taupe, fontSize: '1rem', lineHeight: 1.6, marginBottom: '3rem' }}>
      Thank you for booking with Velora Salon. We have sent the confirmation details to your provided contact number.
    </p>
    <button onClick={reset} style={{
      width: '100%', padding: '1rem', backgroundColor: colors.espresso, color: '#fff',
      border: 'none', borderRadius: '3rem', fontSize: '1rem', fontWeight: 500, cursor: 'pointer'
    }}>Done</button>
  </motion.div>
);
