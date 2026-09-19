import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Aura.css';

// Component to handle chroma-key extraction based on prompt math
const ChromaKeyImage = ({ src, className, style }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i] / 255;
        const g = data[i+1] / 255;
        const b = data[i+2] / 255;
        
        if (g > 0) {
          const maxRB = Math.max(r, b);
          const diff = (g - maxRB) / g;
          
          const edge0 = 0.10;
          const edge1 = 0.30;
          let alpha = 1;
          if (diff >= edge1) {
            alpha = 0;
          } else if (diff > edge0) {
            const t = (diff - edge0) / (edge1 - edge0);
            alpha = 1 - (t * t * (3 - 2 * t));
          }
          
          data[i+3] = alpha * 255;
          if (g > maxRB) {
             data[i+1] = maxRB * 255;
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);
    };
  }, [src]);

  return <canvas ref={canvasRef} className={className} style={style} />;
};

export default function AuraApp() {
  const [variant, setVariant] = useState({
    ground: '#EFEFEE',
    ink: '#0D0D0F',
    name: 'SILVER / RAW',
    accent: '#2F5BFF'
  });

  const scrollY = useRef(0);
  const partRotation = useRef(0);
  const marqueeX = useRef(0);
  const readoutRef = useRef(null);
  const dialRef = useRef(null);
  const marqueeRef = useRef(null);
  const svgTraceRef = useRef(null);
  const heroWordRef1 = useRef(null);
  const heroWordRef2 = useRef(null);
  const heroSubjectRef = useRef(null);

  // Scroll Choreography
  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mediaQuery.matches) {
      document.documentElement.classList.add('js');
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    document.querySelectorAll('.reveal-fade').forEach(el => observer.observe(el));

    let ticking = false;
    const handleScroll = () => {
      scrollY.current = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Counter-travel section (approximate positions)
          const section3 = document.getElementById('stage-section');
          if (section3) {
            const rect = section3.getBoundingClientRect();
            // Map progress through section
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
              partRotation.current = progress * 720;
              marqueeX.current = -(progress * 20); // vw
              
              if (dialRef.current) dialRef.current.style.transform = `rotate(${partRotation.current}deg)`;
              if (marqueeRef.current) marqueeRef.current.style.transform = `translateX(${marqueeX.current}vw)`;
              if (readoutRef.current) readoutRef.current.innerText = `ROTATION: ${(progress * 100).toFixed(2)}%`;
            }
          }
          
          // Hero parallax
          if (scrollY.current < window.innerHeight) {
             const heroProgress = scrollY.current / window.innerHeight;
             if (heroWordRef1.current) heroWordRef1.current.style.transform = `translateY(${-(heroProgress * 5)}vh)`;
             if (heroWordRef2.current) heroWordRef2.current.style.transform = `translateY(${-(heroProgress * 5)}vh)`;
             if (heroSubjectRef.current) heroSubjectRef.current.style.transform = `translateY(${heroProgress * 8}vh)`;
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // SVG Sine waves generation
    if (svgTraceRef.current) {
      const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      
      let d1 = 'M 0 50 ';
      let d2 = 'M 0 50 ';
      for(let x=0; x<=100; x+=1) {
         // Summed sine terms
         const y1 = 50 + Math.sin(x/5)*10 + Math.sin(x/2)*3 + Math.sin(x/1.5)*2;
         const y2 = 50 + Math.sin(x/10)*2 + Math.sin(x/5)*0.5; // nearly flat
         d1 += `L ${x} ${y1} `;
         d2 += `L ${x} ${y2} `;
      }
      
      path1.setAttribute('d', d1);
      path1.setAttribute('stroke', '#43444A');
      path1.setAttribute('fill', 'none');
      path1.setAttribute('stroke-width', '0.2');
      
      path2.setAttribute('d', d2);
      path2.setAttribute('stroke', 'var(--aura-accent)');
      path2.setAttribute('fill', 'none');
      path2.setAttribute('stroke-width', '0.4');
      
      svgTraceRef.current.appendChild(path1);
      svgTraceRef.current.appendChild(path2);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.classList.remove('js');
    };
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="aura-project min-h-screen">
      {/* Navigation */}
      <nav className="aura-nav px-4 md:px-8">
        <div 
          className="flex items-center gap-1 cursor-pointer" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="aura-display" style={{ fontSize: '16px', letterSpacing: '-0.035em', fontWeight: 800 }}>NOVA</span>
          <span style={{ color: 'var(--aura-accent)', fontWeight: 900 }}>.</span>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Specs', id: 'specs-section' },
              { label: 'Design', id: 'design-section' },
              { label: 'Performance', id: 'performance-section' },
              { label: 'Architecture', id: 'tech-section' }
            ].map(link => (
              <a 
                key={link.label} 
                href={`#${link.id}`} 
                onClick={(e) => scrollToSection(e, link.id)}
                className="aura-mono aura-nav-link text-black hover:text-black"
              >
                {link.label}
              </a>
            ))}
          </div>
          <button 
            className="aura-pill text-xs md:text-sm px-4 md:px-6 py-2 md:py-2.5"
            onClick={(e) => scrollToSection(e, 'close-section')}
          >
            Pre-order
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ backgroundColor: 'var(--aura-dim-ground)', minHeight: '100vh', paddingTop: '64px', position: 'relative', overflow: 'clip', isolation: 'isolate' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-full flex pt-12 md:pt-24 relative">
          <div className="w-full lg:w-1/2 flex flex-col items-start z-10 relative">
             <span className="aura-mono mb-4 text-[var(--aura-muted)] mt-10 md:mt-0">Mk. II Architecture</span>
             <h1 className="aura-display text-[clamp(44px,10vw,74px)] md:text-[clamp(34px,5.1vw,74px)] mb-6 text-[var(--aura-ink)] leading-[1.05]">
               Mastering grade.<br/>Absolute fidelity.<br/>
               <span style={{ color: 'var(--aura-accent)' }}>Zero compromise.</span>
             </h1>
             <p className="aura-mono mb-10 text-[var(--aura-ink-sec)]" style={{ maxWidth: '38ch', textTransform: 'none' }}>
               A poster-scale wordmark interlocked with a photographic product subject on a two-colour achromatic ground.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto">
               <button className="aura-pill w-full sm:w-auto" style={{ borderColor: 'var(--aura-ink)', backgroundColor: 'var(--aura-ink)', color: 'var(--aura-ground)' }}>Discover</button>
               <button className="aura-pill w-full sm:w-auto">Technical Specs</button>
             </div>
             
             <div className="w-full aura-hairline-top pt-4 flex flex-col gap-2 mb-12 lg:max-w-md">
                <div className="flex justify-between aura-mono text-[var(--aura-ink-sec)]"><span style={{color: 'var(--aura-accent)'}}>THD+N</span><span>-118dB</span></div>
                <div className="flex justify-between aura-mono text-[var(--aura-ink-sec)]"><span style={{color: 'var(--aura-accent)'}}>DYNAMIC RANGE</span><span>124dB</span></div>
                <div className="flex justify-between aura-mono text-[var(--aura-ink-sec)]"><span style={{color: 'var(--aura-accent)'}}>SAMPLE RATE</span><span>384kHz</span></div>
             </div>
             
             <div className="aura-mono text-[var(--aura-muted)] z-20 mb-32 lg:mb-0">NOVA AUDIO LABS © 2026</div>
          </div>
          
          {/* Pinned corners metadata */}
          <div className="absolute top-24 right-12 aura-mono text-[var(--aura-muted)] hidden lg:block">SYS.VER. 3.1.0</div>
        </div>

        {/* The Occlusion Weave Wordmark */}
        <div className="absolute bottom-0 left-0 w-full" style={{ transform: 'translateY(15%)' }}>
          <div 
            ref={heroWordRef1}
            className="flex justify-between w-[105%] -ml-[2.5%] aura-display-tight absolute bottom-0 z-[1]" 
            style={{ fontSize: 'clamp(88px,20.5vw,304px)', color: 'var(--aura-ink)', opacity: 0.05 }}
          >
            <span>N</span><span>O</span><span>V</span><span>A</span>
          </div>
          
          <div 
            ref={heroSubjectRef}
            className="absolute bottom-0 right-0 z-[2] flex justify-end items-end pointer-events-none w-full"
            style={{ width: 'min(58vw, 940px)', transformOrigin: 'bottom center', right: '-4vw' }}
          >
            <ChromaKeyImage 
              src="/assets/aura_audio.jpg" 
              className="w-full h-auto"
              style={{ filter: 'drop-shadow(0 26px 34px rgba(13,13,15,0.20))' }}
            />
          </div>

          <div 
            ref={heroWordRef2}
            className="flex justify-between w-[105%] -ml-[2.5%] aura-display-tight absolute bottom-0 z-[3]" 
            style={{ fontSize: 'clamp(88px,20.5vw,304px)', color: 'var(--aura-ink)' }}
          >
            <span style={{ visibility: 'hidden' }}>N</span>
            <span style={{ visibility: 'hidden' }}>O</span>
            <span style={{ visibility: 'hidden' }}>V</span>
            <span>A</span>
          </div>
        </div>
      </section>

      {/* Inverted Proof Section */}
      <section id="performance-section" className="min-h-screen flex items-center px-6 md:px-12 py-32" style={{ backgroundColor: 'var(--aura-ink)', color: 'var(--aura-ground)' }}>
         <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row gap-12 md:gap-16 reveal-fade">
            <div className="w-full md:w-1/2 flex flex-col">
               <h2 className="aura-display text-[clamp(40px,6vw,84px)] mb-6">Absolute<br/>Linearity.</h2>
               <p className="aura-mono text-[var(--aura-muted)] mb-12" style={{ maxWidth: '40ch', textTransform: 'none' }}>
                  A faint reference wanders while the signal trace holds flat, so the comparison IS the claim rather than an illustration of it.
               </p>
               <div className="flex items-baseline gap-4 mb-4">
                  <span className="aura-display-tight" style={{ fontSize: 'clamp(56px,9vw,132px)', fontVariantNumeric: 'tabular-nums' }}>0.0001</span>
                  <span className="aura-mono text-[var(--aura-muted)]">%</span>
               </div>
               <div className="aura-mono text-[var(--aura-accent)]">TOTAL HARMONIC DISTORTION</div>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center mt-12 md:mt-0">
               <svg ref={svgTraceRef} viewBox="0 0 100 100" className="w-full h-auto max-w-[500px]" preserveAspectRatio="none" style={{ height: '300px', backgroundColor: 'var(--aura-ink-sec)' }}>
                  {/* Traces drawn via JS */}
               </svg>
            </div>
         </div>
      </section>

      {/* Pinned Counter-Travel Stage */}
      <section id="stage-section" style={{ height: '320vh', backgroundColor: 'var(--aura-ground)', position: 'relative' }}>
         <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
            
            <div 
               ref={marqueeRef}
               className="absolute z-[1] aura-display-tight text-[var(--aura-ink)] opacity-10 whitespace-nowrap"
               style={{ fontSize: 'clamp(78px,17vw,250px)' }}
            >
               MACHINED PRECISION MACHINED PRECISION MACHINED PRECISION
            </div>
            
            <div className="z-[2] flex justify-center items-center w-full h-full relative pointer-events-none">
               <img 
                 ref={dialRef}
                 src="/assets/aura_dial.jpg"
                 alt="Machined dial"
                 className="shadow-2xl w-[80vw] h-[80vw] md:w-auto md:h-auto"
                 style={{ 
                    width: 'min(80vw, 600px)', 
                    height: 'min(80vw, 600px)', 
                    borderRadius: '50%',
                    objectFit: 'cover',
                    position: 'relative'
                 }}
               />
            </div>

            <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 aura-mono text-[var(--aura-muted)] z-20 text-xs md:text-base">INFINITE ROTARY ENCODER</div>
            <div ref={readoutRef} className="absolute bottom-6 md:bottom-12 right-6 md:right-12 aura-mono text-[var(--aura-accent)] z-20 font-bold text-xs md:text-base">ROTATION: 0.00%</div>
         </div>
      </section>

      {/* Technical Diagram Section */}
      <section id="tech-section" className="py-32 px-6 md:px-12" style={{ backgroundColor: 'var(--aura-dim-ground)' }}>
         <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-12 md:gap-16 reveal-fade">
            <div className="w-full md:w-1/2">
               <h2 className="aura-display text-[clamp(40px,5vw,74px)] mb-6">Architecture</h2>
               <p className="aura-mono text-[var(--aura-ink-sec)] mb-12" style={{ maxWidth: '40ch', textTransform: 'none' }}>
                  Compute the geometry rather than eyeballing it, and give the drawing's own line a heavier stroke than the label leaders so it does not read as one more leader.
               </p>
               
               <dl className="w-full flex flex-col">
                  {[
                     ['DAC CHIP', 'ESS Sabre PRO', '9038PRO'],
                     ['OP-AMP', 'Custom Discrete', 'N-9X'],
                     ['CLOCK', 'Femtosecond TCXO', '< 0.1ps'],
                     ['POWER', 'Linear Regulated', 'Multi-rail']
                  ].map(([label, desc, val], i) => (
                     <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 aura-hairline-top gap-2 sm:gap-0">
                        <div className="flex gap-4 sm:gap-8 w-full sm:w-2/3">
                           <dt className="aura-mono text-[var(--aura-accent)] w-1/2 sm:w-1/3">{label}</dt>
                           <dd className="aura-mono text-[var(--aura-ink)] w-1/2 sm:w-2/3" style={{ textTransform: 'none' }}>{desc}</dd>
                        </div>
                        <span className="aura-mono text-[var(--aura-ink-sec)] sm:text-right w-full sm:w-1/3 text-left">{val}</span>
                     </div>
                  ))}
               </dl>
            </div>
            
            <div className="w-full md:w-1/2 flex items-center justify-center relative mt-12 md:mt-0">
               <svg viewBox="0 0 200 200" className="w-full max-w-[500px] h-auto">
                  {/* Construction Geometry */}
                  <circle cx="100" cy="100" r="80" stroke="var(--aura-hairline)" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
                  <line x1="20" y1="100" x2="180" y2="100" stroke="var(--aura-hairline)" strokeWidth="0.5" />
                  <line x1="100" y1="20" x2="100" y2="180" stroke="var(--aura-hairline)" strokeWidth="0.5" />
                  
                  {/* Main Product SVG Line */}
                  <rect x="60" y="60" width="80" height="80" rx="10" stroke="var(--aura-ink)" strokeWidth="2" fill="none" />
                  <circle cx="100" cy="100" r="25" stroke="var(--aura-ink)" strokeWidth="2" fill="none" />
                  
                  {/* POI & Leaders */}
                  <circle cx="100" cy="100" r="3" fill="var(--aura-accent)" />
                  <line x1="100" y1="100" x2="160" y2="40" stroke="var(--aura-accent)" strokeWidth="0.5" />
                  <text x="165" y="38" className="aura-mono" fill="var(--aura-accent)" fontSize="4">CORE</text>
                  
                  <circle cx="60" cy="60" r="2" fill="var(--aura-accent)" />
                  <line x1="60" y1="60" x2="20" y2="20" stroke="var(--aura-accent)" strokeWidth="0.5" />
                  <text x="5" y="18" className="aura-mono" fill="var(--aura-accent)" fontSize="4">EDGE I/O</text>
               </svg>
            </div>
         </div>
      </section>

      {/* Variant Picker Section */}
      <section id="design-section" className="py-32 px-6 md:px-12 aura-variant-section" style={{ backgroundColor: variant.ground, color: variant.ink }}>
         <div className="max-w-[1400px] mx-auto reveal-fade">
            <h2 className="aura-display text-[clamp(40px,5vw,74px)] mb-12">Finishes</h2>
            <div className="flex gap-4 mb-16">
               <button 
                 className="aura-pill" 
                 style={{ borderColor: variant.ink, color: variant.ink }}
                 onClick={() => setVariant({ ground: '#EFEFEE', ink: '#0D0D0F', name: 'SILVER / RAW', accent: '#2F5BFF' })}
               >
                 Raw Aluminum
               </button>
               <button 
                 className="aura-pill" 
                 style={{ borderColor: variant.ink, color: variant.ink }}
                 onClick={() => setVariant({ ground: '#0D0D0F', ink: '#EFEFEE', name: 'STEALTH / MATTE', accent: '#7C97FF' })}
               >
                 Matte Black
               </button>
            </div>
            
            {/* Panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 w-full" style={{ borderTop: `1px solid color-mix(in srgb, currentColor 24%, transparent)` }}>
               <div className="p-6 border-b md:border-b-0 md:border-r" style={{ borderColor: `color-mix(in srgb, currentColor 24%, transparent)` }}>
                  <div className="aura-mono" style={{ color: variant.accent, marginBottom: '2rem' }}>MODEL</div>
                  <div className="aura-display text-2xl">{variant.name}</div>
               </div>
               <div className="p-6 border-b md:border-b-0 md:border-r" style={{ borderColor: `color-mix(in srgb, currentColor 24%, transparent)` }}>
                  <div className="aura-mono" style={{ color: variant.accent, marginBottom: '2rem' }}>MATERIAL</div>
                  <div className="aura-display text-2xl">AEROSPACE GRADE</div>
               </div>
               <div className="p-6" style={{ borderColor: `color-mix(in srgb, currentColor 24%, transparent)` }}>
                  <div className="aura-mono" style={{ color: variant.accent, marginBottom: '2rem' }}>TREATMENT</div>
                  <div className="aura-display text-2xl">ANODIZED</div>
               </div>
            </div>
         </div>
      </section>

      {/* Spec Table */}
      <section id="specs-section" className="py-32 px-6 md:px-12" style={{ backgroundColor: 'var(--aura-dim-ground)' }}>
         <div className="max-w-[1000px] mx-auto reveal-fade flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/2">
               {[
                  ['Dimensions', '214 × 140 × 44 mm'],
                  ['Weight', '1.45 kg'],
                  ['Chassis', 'CNC Machined Aluminum'],
                  ['Input', 'USB-C 3.2 Gen 2'],
                  ['Output A', 'XLR Balanced'],
                  ['Output B', '1/4" TRS Jack']
               ].map(([k,v], i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 aura-hairline-top gap-1 sm:gap-0">
                     <span className="aura-mono text-sm" style={{ textTransform: 'none' }}>{k}</span>
                     <span className="aura-mono text-xs sm:text-sm" style={{ color: 'var(--aura-muted)' }}>{v}</span>
                  </div>
               ))}
               <div className="aura-hairline-top"></div>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
               {[
                  ['DAC', 'ESS 9038PRO'],
                  ['SNR', '124dB (A-Weighted)'],
                  ['THD+N', '< 0.00015%'],
                  ['Output Impedance', '< 0.1 Ohm'],
                  ['Power', 'DC 15V / 2A'],
                  ['Warranty', '5 Years Limited']
               ].map(([k,v], i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 aura-hairline-top gap-1 sm:gap-0">
                     <span className="aura-mono text-sm" style={{ textTransform: 'none' }}>{k}</span>
                     <span className="aura-mono text-xs sm:text-sm" style={{ color: 'var(--aura-muted)' }}>{v}</span>
                  </div>
               ))}
               <div className="aura-hairline-top"></div>
            </div>
         </div>
      </section>

      {/* Close Section */}
      <section id="close-section" className="pt-32 pb-0 px-6 md:px-12 overflow-hidden flex flex-col justify-between min-h-screen" style={{ backgroundColor: 'var(--aura-ground)' }}>
         <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row justify-between items-start reveal-fade shrink-0">
            <div>
               <h2 className="aura-display text-[clamp(40px,5vw,74px)] mb-4">Hear everything.</h2>
               <p className="aura-mono text-[var(--aura-muted)] mb-8" style={{ textTransform: 'none' }}>Finalize your order today.</p>
            </div>
            <div className="mt-8 md:mt-0 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
               <button className="aura-pill w-full sm:w-auto text-center justify-center">Contact Sales</button>
               <button 
                 className="aura-pill w-full sm:w-auto text-center justify-center" 
                 style={{ borderColor: 'var(--aura-ink)', backgroundColor: 'var(--aura-ink)', color: 'var(--aura-ground)' }}
                 onClick={() => alert('Pre-order system coming soon!')}
               >
                 Pre-order
               </button>
            </div>
         </div>
         
         <div className="w-full mt-auto relative z-10 flex-1 flex flex-col justify-end">
            <div className="flex flex-wrap sm:flex-nowrap justify-between gap-4 py-4 aura-hairline-top mb-12">
               <span className="aura-mono text-[var(--aura-muted)] text-xs md:text-sm">PRESS</span>
               <span className="aura-mono text-[var(--aura-muted)] text-xs md:text-sm">TERMS</span>
               <span className="aura-mono text-[var(--aura-muted)] text-xs md:text-sm">PRIVACY</span>
               <span className="aura-mono text-[var(--aura-muted)] text-xs md:text-sm ml-auto">© 2026</span>
            </div>
            
            <div className="w-full flex justify-center mt-auto" style={{ paddingBottom: '0' }}>
               <div 
                  className="aura-display-tight text-[var(--aura-ink)] w-full text-center leading-none"
                  style={{ fontSize: 'clamp(84px,25vw,400px)', transform: 'translateY(0.22em)', overflow: 'hidden' }}
               >
                  NOVA
               </div>
            </div>
         </div>
      </section>

      {/* Global Link Back to Studio so user isn't trapped */}
      <Link 
        to="/" 
        className="fixed bottom-8 left-8 z-50 flex items-center gap-2 px-6 py-3 bg-black/5 backdrop-blur-md border border-black/10 rounded-full text-sm text-black hover:text-black hover:bg-black/10 transition-all duration-300 font-medium aura-mono"
        style={{ borderRadius: '999px' }}
      >
        <ArrowLeft size={16} />
        Back to Studio
      </Link>
    </div>
  );
}
