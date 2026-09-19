import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, ArrowRight, ChevronLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const STUDIO_WHATSAPP = "1234567890"; // Placeholder

const ConciergeButton = ({ onClick, children, primary, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
      background: primary ? 'var(--accent-blue)' : 'rgba(255,255,255,0.03)',
      color: primary ? '#fff' : 'rgba(255,255,255,0.8)',
      border: `1px solid ${primary ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
      borderRadius: '8px',
      fontSize: '0.9rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      marginBottom: '8px',
      transition: 'all 0.2s ease',
      textAlign: 'left',
      opacity: disabled ? 0.5 : 1
    }}
    onMouseEnter={(e) => {
      if (disabled) return;
      if (!primary) {
        e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
      } else {
        e.currentTarget.style.opacity = '0.9';
      }
    }}
    onMouseLeave={(e) => {
      if (disabled) return;
      if (!primary) {
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
      } else {
        e.currentTarget.style.opacity = '1';
      }
    }}
  >
    {children}
  </button>
);

const ConciergeInput = ({ placeholder, value, onChange, type = "text" }) => {
  if (type === "textarea") {
    return (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          background: 'rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          padding: '12px',
          color: '#fff',
          fontSize: '0.9rem',
          marginBottom: '12px',
          outline: 'none',
          resize: 'vertical',
          minHeight: '80px',
          fontFamily: 'inherit',
          boxSizing: 'border-box'
        }}
        onFocus={(e) => e.target.style.borderColor = 'var(--accent-blue)'}
        onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
      />
    );
  }
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        width: '100%',
        background: 'rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        padding: '12px',
        color: '#fff',
        fontSize: '0.9rem',
        marginBottom: '12px',
        outline: 'none',
        fontFamily: 'inherit',
        boxSizing: 'border-box'
      }}
      onFocus={(e) => e.target.style.borderColor = 'var(--accent-blue)'}
      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
    />
  );
};

export default function StudioConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('HOME');
  const [history, setHistory] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const messagesEndRef = useRef(null);

  const [formData, setFormData] = useState({
    businessType: '',
    websiteReq: '',
    projectDetails: '',
    name: '',
    businessName: '',
    whatsapp: '',
    email: '',
    projectType: '',
    projectSize: '',
    preferredDay: '',
    preferredTime: '',
    otherMessage: ''
  });

  const updateForm = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const navigateTo = (nextStep) => {
    setHistory(prev => [...prev, step]);
    setStep(nextStep);
  };

  const goBack = () => {
    if (history.length > 0) {
      const newHistory = [...history];
      const prevStep = newHistory.pop();
      setHistory(newHistory);
      setStep(prevStep);
    }
  };

  const handleSubmit = async (type) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
      subject: `New Enquiry from Studio° Website: ${type}`,
      from_name: formData.name,
      business_name: formData.businessName,
      email: formData.email || 'Not provided',
      whatsapp: formData.whatsapp,
      enquiry_type: type,
      website_req: formData.websiteReq || 'N/A',
      project_details: formData.projectDetails || 'N/A',
      project_type: formData.projectType || 'N/A',
      project_size: formData.projectSize || 'N/A',
      preferred_day: formData.preferredDay || 'N/A',
      preferred_time: formData.preferredTime || 'N/A',
      message: formData.otherMessage || 'N/A',
      source: 'Studio° Website',
      submission_date: new Date().toISOString()
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.success) {
        setStep('SUCCESS');
        setHistory([]);
        setFormData({
          businessType: '', websiteReq: '', projectDetails: '', name: '',
          businessName: '', whatsapp: '', email: '', projectType: '',
          projectSize: '', preferredDay: '', preferredTime: '', otherMessage: ''
        });
      } else {
        setSubmitError(result.message || 'Something went wrong.');
      }
    } catch (error) {
      setSubmitError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [step]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-concierge', handleOpen);
    return () => window.removeEventListener('open-concierge', handleOpen);
  }, []);

  const renderContent = () => {
    switch (step) {
      case 'HOME':
        return (
          <div>
            <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem', fontSize: '1.05rem' }}>
              Hey — what can we help you with?
            </p>
            <ConciergeButton onClick={() => navigateTo('WEBSITE_TYPE')}>
              <span>01 &nbsp; I need a website</span> <ArrowRight size={14} />
            </ConciergeButton>
            <ConciergeButton onClick={() => navigateTo('WORK')}>
              <span>02 &nbsp; I want to see your work</span> <ArrowRight size={14} />
            </ConciergeButton>
            <ConciergeButton onClick={() => navigateTo('ESTIMATE_TYPE')}>
              <span>03 &nbsp; I want a price estimate</span> <ArrowRight size={14} />
            </ConciergeButton>
            <ConciergeButton onClick={() => navigateTo('BOOK_CALL')}>
              <span>04 &nbsp; I want to book a call</span> <ArrowRight size={14} />
            </ConciergeButton>
            <ConciergeButton onClick={() => navigateTo('OTHER')}>
              <span>05 &nbsp; Something else</span> <ArrowRight size={14} />
            </ConciergeButton>
          </div>
        );

      /* ================= OPTION 01: WEBSITE ================= */
      case 'WEBSITE_TYPE':
        return (
          <div>
            <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem', fontSize: '1.05rem' }}>What kind of business is it?</p>
            {['Bakery', 'Café / Restaurant', 'Salon', 'Clinic / Dentist', 'Retail / Fashion', 'Other'].map(type => (
              <ConciergeButton key={type} onClick={() => { updateForm('businessType', type); navigateTo('WEBSITE_REQ'); }}>
                <span>{type}</span> <ArrowRight size={14} />
              </ConciergeButton>
            ))}
          </div>
        );
      case 'WEBSITE_REQ':
        return (
          <div>
            <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem', fontSize: '1.05rem' }}>What are you looking for?</p>
            {['New website', 'Website redesign', 'E-commerce website', 'Not sure yet'].map(req => (
              <ConciergeButton key={req} onClick={() => { updateForm('websiteReq', req); navigateTo('WEBSITE_DETAILS'); }}>
                <span>{req}</span> <ArrowRight size={14} />
              </ConciergeButton>
            ))}
          </div>
        );
      case 'WEBSITE_DETAILS':
        return (
          <div>
            <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1rem', fontSize: '1.05rem' }}>Tell us a little about the project.</p>
            <ConciergeInput type="textarea" placeholder="Brief details..." value={formData.projectDetails} onChange={e => updateForm('projectDetails', e.target.value)} />
            <ConciergeInput placeholder="Your Name *" value={formData.name} onChange={e => updateForm('name', e.target.value)} />
            <ConciergeInput placeholder="Business Name *" value={formData.businessName} onChange={e => updateForm('businessName', e.target.value)} />
            <ConciergeInput placeholder="WhatsApp Number *" type="tel" value={formData.whatsapp} onChange={e => updateForm('whatsapp', e.target.value)} />
            <ConciergeInput placeholder="Email (Optional)" type="email" value={formData.email} onChange={e => updateForm('email', e.target.value)} />
            
            {submitError && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '12px', textAlign: 'center' }}>{submitError}</div>}
            <ConciergeButton primary onClick={() => handleSubmit('WEBSITE')} disabled={!formData.name || !formData.businessName || !formData.whatsapp || isSubmitting}>
              <span style={{ fontWeight: 500 }}>{isSubmitting ? 'Submitting...' : 'Submit'}</span> {!isSubmitting && <ArrowRight size={14} />}
            </ConciergeButton>
          </div>
        );

      /* ================= OPTION 02: WORK ================= */
      case 'WORK':
        return (
          <div>
            <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem', fontSize: '1.05rem' }}>Take a look around.</p>
            <Link to="/work/the-cake-room" style={{ textDecoration: 'none', display: 'block' }} onClick={() => setIsOpen(false)}>
              <ConciergeButton><span>Cake Room</span> <ArrowUpRight size={14} /></ConciergeButton>
            </Link>
            <Link to="/work/velora-salon" style={{ textDecoration: 'none', display: 'block' }} onClick={() => setIsOpen(false)}>
              <ConciergeButton><span>Velora Salon</span> <ArrowUpRight size={14} /></ConciergeButton>
            </Link>
            <a href="#work" style={{ textDecoration: 'none', display: 'block' }} onClick={() => setIsOpen(false)}>
              <ConciergeButton><span>View all work</span> <ArrowRight size={14} /></ConciergeButton>
            </a>
          </div>
        );

      /* ================= OPTION 03: ESTIMATE ================= */
      case 'ESTIMATE_TYPE':
        return (
          <div>
            <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem', fontSize: '1.05rem' }}>What's the project type?</p>
            {['New website', 'Redesign', 'E-commerce'].map(type => (
              <ConciergeButton key={type} onClick={() => { updateForm('projectType', type); navigateTo('ESTIMATE_SIZE'); }}>
                <span>{type}</span> <ArrowRight size={14} />
              </ConciergeButton>
            ))}
          </div>
        );
      case 'ESTIMATE_SIZE':
        return (
          <div>
            <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem', fontSize: '1.05rem' }}>How big is the project?</p>
            {['Small business', 'Growing business', 'Full custom experience', 'Not sure'].map(size => (
              <ConciergeButton key={size} onClick={() => { updateForm('projectSize', size); navigateTo('ESTIMATE_DETAILS'); }}>
                <span>{size}</span> <ArrowRight size={14} />
              </ConciergeButton>
            ))}
          </div>
        );
      case 'ESTIMATE_DETAILS':
        return (
          <div>
            <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1rem', fontSize: '1.05rem' }}>A few details to wrap up.</p>
            <ConciergeInput placeholder="Your Name *" value={formData.name} onChange={e => updateForm('name', e.target.value)} />
            <ConciergeInput placeholder="WhatsApp Number *" type="tel" value={formData.whatsapp} onChange={e => updateForm('whatsapp', e.target.value)} />
            {submitError && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '12px', textAlign: 'center' }}>{submitError}</div>}
            <ConciergeButton primary onClick={() => handleSubmit('ESTIMATE')} disabled={!formData.name || !formData.whatsapp || isSubmitting}>
              <span style={{ fontWeight: 500 }}>{isSubmitting ? 'Submitting...' : 'Submit'}</span> {!isSubmitting && <ArrowRight size={14} />}
            </ConciergeButton>
          </div>
        );

      /* ================= OPTION 04: BOOK CALL ================= */
      case 'BOOK_CALL':
        return (
          <div>
            <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1rem', fontSize: '1.05rem' }}>Let's find a good time to talk.</p>
            <ConciergeInput placeholder="Your Name *" value={formData.name} onChange={e => updateForm('name', e.target.value)} />
            <ConciergeInput placeholder="WhatsApp Number *" type="tel" value={formData.whatsapp} onChange={e => updateForm('whatsapp', e.target.value)} />
            <ConciergeInput placeholder="Preferred day (e.g. Tomorrow, Monday)" value={formData.preferredDay} onChange={e => updateForm('preferredDay', e.target.value)} />
            <ConciergeInput placeholder="Preferred time (e.g. Morning, 3 PM)" value={formData.preferredTime} onChange={e => updateForm('preferredTime', e.target.value)} />
            {submitError && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '12px', textAlign: 'center' }}>{submitError}</div>}
            <ConciergeButton primary onClick={() => handleSubmit('CALL')} disabled={!formData.name || !formData.whatsapp || isSubmitting}>
              <span style={{ fontWeight: 500 }}>{isSubmitting ? 'Requesting...' : 'Request a call'}</span> {!isSubmitting && <ArrowRight size={14} />}
            </ConciergeButton>
          </div>
        );

      /* ================= OPTION 05: OTHER ================= */
      case 'OTHER':
        return (
          <div>
            <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1rem', fontSize: '1.05rem' }}>Tell us what's on your mind.</p>
            <ConciergeInput type="textarea" placeholder="Message..." value={formData.otherMessage} onChange={e => updateForm('otherMessage', e.target.value)} />
            <ConciergeInput placeholder="Your Name *" value={formData.name} onChange={e => updateForm('name', e.target.value)} />
            <ConciergeInput placeholder="WhatsApp Number *" type="tel" value={formData.whatsapp} onChange={e => updateForm('whatsapp', e.target.value)} />
            {submitError && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '12px', textAlign: 'center' }}>{submitError}</div>}
            <ConciergeButton primary onClick={() => handleSubmit('OTHER')} disabled={!formData.name || !formData.whatsapp || !formData.otherMessage || isSubmitting}>
              <span style={{ fontWeight: 500 }}>{isSubmitting ? 'Sending...' : 'Send enquiry'}</span> {!isSubmitting && <ArrowRight size={14} />}
            </ConciergeButton>
          </div>
        );

      /* ================= SUCCESS SCREEN ================= */
      case 'SUCCESS':
        return (
          <div>
            <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem', fontSize: '1.05rem', textAlign: 'center', marginTop: '1rem' }}>
              Thanks! We've received your message.<br/><br/>
              <span style={{ color: 'var(--accent-blue)', fontWeight: 500 }}>We'll get back to you soon.</span>
            </p>
            <ConciergeButton primary onClick={() => { setIsOpen(false); setTimeout(() => setStep('HOME'), 300); }}>
              <span style={{ fontWeight: 500, display: 'block', width: '100%', textAlign: 'center' }}>Close</span>
            </ConciergeButton>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* LAUNCHER BUTTON */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              zIndex: 9999,
              background: '#0a0a0a',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '30px',
              padding: '12px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(59, 130, 246, 0.15)',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '1rem',
              backdropFilter: 'blur(10px)'
            }}
          >
            <MessageSquare size={18} style={{ color: 'var(--accent-blue)' }} />
            <span style={{ fontWeight: 500 }}>Let's talk &rarr;</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* CONCIERGE PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="studio-concierge-panel"
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              zIndex: 10000,
              width: 'calc(100vw - 32px)',
              maxWidth: '380px',
              background: '#0d0d0d',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(59, 130, 246, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                {step !== 'HOME' && (
                  <button onClick={goBack} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px', marginLeft: '-8px' }}>
                    <ChevronLeft size={20} />
                  </button>
                )}
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '-0.02em', marginBottom: '2px' }}>
                    studio<span style={{ color: 'var(--accent-blue)' }}>°</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Let's build something good.</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div style={{
              padding: '24px',
              maxHeight: '60vh',
              overflowY: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
            
            {/* CSS for mobile adjustments using a style tag scoped to class */}
            <style>{`
              @media (max-width: 768px) {
                .studio-concierge-panel {
                  right: 16px !important;
                  bottom: 16px !important;
                  width: calc(100vw - 32px) !important;
                  max-width: none !important;
                }
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
