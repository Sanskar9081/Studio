import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, Heart, ChefHat, Sprout, ShoppingCart, Play, ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';
import { products } from './data';
import { useCart } from './CartContext';

const colors = {
  brown: '#1F1512',
  text: '#1F1512',
  textLight: '#8C736D',
  cream: '#F8F6F0',
  border: 'rgba(45, 36, 34, 0.1)',
  accent: '#D99B29'
};

const fontSerif = '"Playfair Display", "Georgia", serif';
const fontCursive = '"Brush Script MT", cursive';
const fontSans = '"Inter", sans-serif';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const yCake = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const featured = products.slice(0, 4);

  return (
    <div style={{ backgroundColor: colors.cream, color: colors.text, fontFamily: fontSans, overflow: 'hidden' }}>
      <style>{`
        @media (max-width: 899px) {
          .cr-hero-container { flex-direction: column !important; justify-content: center !important; padding-top: 10vh !important; padding-bottom: 5vh !important; }
          .cr-hero-text { margin-top: 0 !important; text-align: center !important; display: flex; flex-direction: column; align-items: center; }
          .cr-hero-text h1 { font-size: clamp(2.5rem, 10vw, 4rem) !important; text-align: center !important; }
          .cr-hero-cta { flex-direction: column !important; gap: 1rem !important; }
          .cr-stats-row { flex-direction: column !important; gap: 1.5rem !important; align-items: center !important; text-align: center !important; position: static !important; background: ${colors.brown} !important; padding: 2rem 5vw !important; }
          .cr-values-grid { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
          .cr-values-item { flex-direction: column !important; align-items: center !important; text-align: center !important; }
          .cr-creations-header { flex-direction: column !important; gap: 1rem !important; align-items: flex-start !important; }
          .cr-creations-cats { margin-bottom: 2rem !important; }
          .cr-story-split { grid-template-columns: 1fr !important; }
          .cr-story-split-text { padding: 4rem 2rem !important; }
          .cr-story-polaroids { display: none !important; }
          .cr-custom-cakes { padding: 4rem 5vw !important; flex-direction: column !important; }
          .cr-custom-cakes > div { flex: 1 1 100% !important; width: 100% !important; text-align: center; }
          .cr-custom-cakes h2 { max-width: 100% !important; text-align: center; }
          .cr-custom-cakes p { max-width: 100% !important; text-align: center; }
          .cr-custom-cakes .hidden { display: none !important; }
          .cr-custom-steps { align-items: center !important; text-align: left; }
          .cr-testi-header { flex-direction: column !important; align-items: flex-start !important; gap: 1rem !important; }
          .cr-testi-grid { grid-template-columns: 1fr !important; }
          .cr-visit-section { height: 50vh !important; margin: 0 0 4rem 0 !important; border-radius: 0 !important; padding: 2rem !important; }
        }
        @media (max-width: 480px) {
          .cr-values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      {/* HERO SECTION */}
      <section style={{ position: 'relative', height: '100vh', minHeight: '800px', backgroundColor: colors.brown, marginTop: '-73px', overflow: 'hidden' }}>
        
        {/* Background Image & Overlay */}
        <motion.div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/assets/hero_cake_1789585158390.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.8, y: yHero
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(31,21,18,1) 0%, rgba(31,21,18,0.85) 30%, rgba(31,21,18,0.3) 100%)' }} />

        {/* Content Container */}
        <div className="cr-hero-container" style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto', padding: '0 5vw', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '120px' }}>
          
          {/* Left Text */}
          <div className="cr-hero-text" style={{ maxWidth: '650px', color: '#fff', marginTop: '10vh' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem', color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>
              FRESHLY BAKED. ALWAYS FOR A HAPPIER YOU.
            </motion.div>
            
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontFamily: fontSerif, fontSize: 'clamp(2.5rem, 6vw, 6.5rem)', lineHeight: 1.05, marginBottom: '2rem', fontWeight: 500 }}>
              Happier<br/>Days Taste<br/><span style={{ fontStyle: 'italic', fontWeight: 400 }}>Better Here.</span>
            </motion.h1>
            
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '3rem', color: 'rgba(255,255,255,0.8)', maxWidth: '450px' }}>
              Artisan breads, delightful pastries and custom cakes made with real ingredients and a whole lot of love.
            </motion.p>
            
            <motion.div className="cr-hero-cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
              style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <Link to="/work/the-cake-room/cakes" style={{
                backgroundColor: '#fff', color: colors.brown, padding: '1rem 2rem', borderRadius: '2rem',
                fontSize: '0.9rem', fontWeight: 600, border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem',
                textDecoration: 'none', transition: 'transform 0.2s ease'
              }}>
                Explore Our Menu <ArrowRight size={16} />
              </Link>
              <Link to="/work/the-cake-room/story" style={{
                color: '#fff', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem'
              }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Play size={16} fill="#fff" />
                </div>
                Watch Our Story
              </Link>
            </motion.div>
          </div>

          {/* Right Floating Elements - Simulated Parallax */}
          <motion.div style={{ position: 'relative', width: '55%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', y: yCake }}>
             
             
             {/* Cursive Annotations */}
             <div className="hidden md:block" style={{ position: 'absolute', top: '25%', right: '5%', fontFamily: fontCursive, fontSize: '3.5rem', color: '#fff', transform: 'rotate(-5deg)', opacity: 0.9, lineHeight: 1 }}>
               Good<br/>Food<br/>Brighter<br/>Mood. ♡
             </div>
          </motion.div>

        </div>

        {/* Stats Row */}
        <div className="cr-stats-row" style={{
          position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '2rem 5vw',
          background: 'linear-gradient(to top, rgba(31,21,18,0.95) 0%, transparent 100%)',
          display: 'flex', gap: '4rem', color: '#fff', zIndex: 20
        }}>
          <div>
            <div style={{ fontWeight: '600', fontSize: '1.25rem' }}>1000+</div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>Happy Customers</div>
          </div>
          <div>
            <div style={{ fontWeight: '600', fontSize: '1.25rem' }}>100%</div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>Fresh Ingredients</div>
          </div>
          <div>
            <div style={{ fontWeight: '600', fontSize: '1.25rem', color: colors.accent }}>4.9 ★</div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>Customer Rating</div>
          </div>
        </div>
      </section>

      {/* VALUES STRIP */}
      <section style={{ borderBottom: `1px solid ${colors.border}`, padding: '2rem 5vw' }}>
        <div className="cr-values-grid" style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          {[
            { icon: Leaf, title: 'Premium Ingredients', desc: 'Real. Fresh. Local.' },
            { icon: Heart, title: 'Made with Love', desc: 'In every bite.' },
            { icon: ChefHat, title: 'Fresh Daily', desc: 'Baked, not stored.' },
            { icon: Sprout, title: 'A Happier Planet', desc: 'Sustainable choices.' }
          ].map((item, i, arr) => (
            <React.Fragment key={i}>
              <div className="cr-values-item" style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <div style={{ color: colors.textLight }}><item.icon size={28} strokeWidth={1.5} /></div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: colors.text, marginBottom: '0.2rem' }}>{item.title}</div>
                  <div style={{ fontSize: '0.8rem', color: colors.textLight }}>{item.desc}</div>
                </div>
              </div>
              {i < arr.length - 1 && <div style={{ width: '1px', backgroundColor: colors.border, display: 'none' }} className="md:block" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* OUR CREATIONS / PRODUCTS */}
      <section style={{ padding: '8rem 5vw' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.textLight, fontWeight: 600, marginBottom: '1.5rem' }}>
            OUR CREATIONS
          </div>

          <div className="cr-creations-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
            <h2 style={{ fontFamily: fontSerif, fontSize: 'clamp(2rem, 5vw, 4.5rem)', color: colors.text, fontWeight: 400, margin: 0, lineHeight: 1.1 }}>
              Sweet Things<br/>Make Happier Days. <span style={{ color: colors.textLight, opacity: 0.5 }}>〰</span>
            </h2>
            <div className="hidden md:block" style={{ fontFamily: fontCursive, fontSize: '3rem', color: colors.textLight, transform: 'rotate(-10deg)', textAlign: 'center' }}>
              Life is<br/>better<br/>with cake ♡
            </div>
          </div>

          {/* Categories */}
          <div className="cr-creations-cats" style={{ display: 'flex', gap: '2rem', marginBottom: '4rem', overflowX: 'auto', paddingBottom: '1rem' }}>
             {[
               {name: 'All', img: '/assets/hero_cake_1789585158390.jpg'},
               {name: 'Cakes', img: '/assets/cake_chocolate_truffle_1789584761347.jpg'},
               {name: 'Breads', img: '/assets/bread_sourdough_1789584772605.jpg'},
               {name: 'Pastries', img: '/assets/pastry_croissant_1789584782658.jpg'},
               {name: 'Cookies', img: '/assets/pastry_croissant_1789584782658.jpg'},
               {name: 'Donuts', img: '/assets/cake_blueberry_cheesecake_1789584814981.jpg'},
               {name: 'Cupcakes', img: '/assets/cake_strawberry_bliss_1789584804446.jpg'}
             ].map((cat, i) => (
               <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', cursor: 'pointer', minWidth: '80px' }}>
                 <div style={{ width: '90px', height: '90px', borderRadius: '50%', backgroundColor: '#fff', border: `1px solid ${colors.border}`, padding: '0.5rem', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                   <img src={cat.img} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} alt={cat.name}/>
                 </div>
                 <span style={{ fontSize: '0.9rem', fontWeight: 600, color: colors.text }}>{cat.name}</span>
               </div>
             ))}
          </div>

          {/* Product Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {featured.map((p, idx) => (
              <div key={p.id} style={{ cursor: 'pointer', group: true }} onClick={() => navigate(`/work/the-cake-room/product/${p.id}`)}>
                <div style={{ overflow: 'hidden', borderRadius: '4px', position: 'relative', aspectRatio: '4/3', marginBottom: '1.5rem' }}>
                  {idx === 0 && (
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem', backgroundColor: colors.cream, color: colors.text, fontSize: '0.7rem', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '2px', zIndex: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      BESTSELLER
                    </div>
                  )}
                  <motion.img 
                    whileHover={{ scale: 1.05 }} 
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: colors.text, marginBottom: '0.5rem' }}>{p.name}</h3>
                    <p style={{ fontSize: '0.9rem', color: colors.textLight, margin: 0, maxWidth: '250px', lineHeight: 1.5 }}>
                      {p.desc}
                    </p>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: colors.text, marginTop: '1rem' }}>₹{p.price}</div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); addToCart(p); }} style={{ 
                      width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'transparent', border: `1px solid ${colors.border}`, color: colors.text, 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease'
                  }} onMouseOver={e => { e.currentTarget.style.backgroundColor = colors.brown; e.currentTarget.style.color = '#fff'; }} onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = colors.text; }}>
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY - SPLIT */}
      <section className="cr-story-split" style={{ margin: '0 5vw', marginBottom: '8rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '0' }}>
          <div className="cr-story-split-text" style={{ backgroundColor: '#F0EBE1', padding: '6rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.textLight, fontWeight: 600, marginBottom: '1.5rem' }}>
              OUR STORY
            </div>
            <h2 style={{ fontFamily: fontSerif, fontSize: 'clamp(2rem, 4.5vw, 4.5rem)', lineHeight: 1.1, color: colors.text, fontWeight: 400, marginBottom: '2rem' }}>
              More than just<br/>baked goods.
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: colors.textLight, marginBottom: '3rem', maxWidth: '400px' }}>
              The Cake Room started with a simple idea — to bring people closer through the joy of good food. We believe every cake, pastry and bread has the power to turn an ordinary day into a special one.
            </p>
            <div>
              <Link to="/work/the-cake-room/story" style={{
                backgroundColor: colors.brown, color: '#fff', padding: '1rem 2.5rem', borderRadius: '2rem',
                fontSize: '0.9rem', fontWeight: 500, border: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                textDecoration: 'none'
              }}>
                Our Story <ArrowRight size={16} />
              </Link>
            </div>
            
            {/* Polaroids */}
            <div className="cr-story-polaroids" style={{ position: 'absolute', bottom: '10%', right: '10%', display: 'flex', gap: '1rem', transform: 'rotate(5deg)' }}>
               <img src="/assets/story_baker_1789585171405.jpg" style={{ width: '80px', height: '100px', objectFit: 'cover', padding: '4px 4px 16px 4px', backgroundColor: '#fff', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} alt="Baker" />
               <img src="/assets/cake_blueberry_cheesecake_1789584814981.jpg" style={{ width: '80px', height: '100px', objectFit: 'cover', padding: '4px 4px 16px 4px', backgroundColor: '#fff', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', transform: 'rotate(-10deg) translateY(20px)' }} alt="Cake" />
               <div className="hidden md:block" style={{ position: 'absolute', bottom: '-40px', right: '0', fontFamily: fontCursive, fontSize: '1.5rem', color: colors.textLight, transform: 'rotate(-15deg)', whiteSpace: 'nowrap' }}>
                 Baking<br/>Memories<br/>Since 2020 ♡
               </div>
            </div>
          </div>
          
          <div style={{ position: 'relative', overflow: 'hidden', minHeight: '600px' }}>
            <img src="/assets/story_baker_1789585171405.jpg" alt="Baker dusting flour" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                 <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Play size={20} fill="#fff" color="#fff" style={{ marginLeft: '4px' }} />
                 </div>
                 <span style={{ color: '#fff', fontSize: '1rem', fontWeight: 600 }}>Watch Our Story</span>
               </div>
            </div>
            <div style={{ position: 'absolute', right: '3rem', bottom: '3rem', fontFamily: fontSerif, fontSize: '2.5rem', color: '#fff', fontStyle: 'italic', textAlign: 'right', lineHeight: 1.1, opacity: 0.9 }}>
              “Good<br/>bakes create<br/>better people.”
            </div>
          </div>
      </section>

      {/* CUSTOM CAKES */}
      <section className="cr-custom-cakes" style={{ backgroundColor: colors.brown, padding: '8rem 5vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4rem', position: 'relative' }}>
          
          <div style={{ flex: '1 1 500px', zIndex: 10, color: '#fff' }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontWeight: 600, marginBottom: '1.5rem' }}>
              CUSTOM CAKES
            </div>
            <h2 style={{ fontFamily: fontSerif, fontSize: 'clamp(2rem, 5vw, 4.5rem)', lineHeight: 1.1, fontWeight: 400, marginBottom: '2rem', maxWidth: '600px' }}>
              Every celebration deserves something special.
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', marginBottom: '3rem', maxWidth: '450px' }}>
              Birthdays, weddings, anniversaries or just because — we create custom cakes for your special moments.
            </p>
            <Link to="/work/the-cake-room/custom" style={{
              backgroundColor: '#fff', color: colors.brown, padding: '1rem 2.5rem', borderRadius: '2rem',
              fontSize: '0.9rem', fontWeight: 600, border: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              textDecoration: 'none'
            }}>
              Order a Custom Cake <ArrowRight size={16} />
            </Link>
          </div>
          
          {/* Cake Image Focus */}
          <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
             <img src="/assets/custom_cake_1789585184968.jpg" style={{ width: '100%', maxWidth: '500px', borderRadius: '8px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }} alt="Custom floral cake" />
             <div className="hidden md:block" style={{ position: 'absolute', top: '30%', left: '-15%', fontFamily: fontCursive, fontSize: '2.5rem', color: '#fff', transform: 'rotate(-10deg)', lineHeight: 1 }}>
               Your<br/>Story<br/>On Cake ♡
             </div>
          </div>
          
          {/* Process List */}
          <div className="cr-custom-steps" style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '2.5rem', zIndex: 10 }}>
            {[
              { num: '1', title: 'Share Your Idea', desc: 'Tell us your vision.' },
              { num: '2', title: 'We Design', desc: 'Our team creates a custom design.' },
              { num: '3', title: 'We Bake', desc: 'Crafted with love and care.' },
              { num: '4', title: 'You Celebrate', desc: 'Make memories that last.' }
            ].map((step) => (
              <div key={step.num} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', color: '#fff' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 'bold' }}>
                  {step.num}
                </div>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{step.title}</div>
                  <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>

      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '8rem 5vw' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.textLight, fontWeight: 600, marginBottom: '1.5rem' }}>
            REAL PEOPLE. SWEETEST STORIES.
          </div>
          <div className="cr-testi-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: fontSerif, fontSize: 'clamp(2rem, 4vw, 4rem)', color: colors.text, fontWeight: 400, margin: 0, lineHeight: 1.1 }}>
              What Our Customers<br/>Say. <span className="hidden md:inline" style={{ color: colors.textLight, fontFamily: fontCursive, fontSize: '2rem' }}>〰</span>
            </h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button style={{ width: '44px', height: '44px', borderRadius: '50%', border: `1px solid ${colors.border}`, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: colors.text }}>
                <ChevronLeft size={18} />
              </button>
              <button style={{ width: '44px', height: '44px', borderRadius: '50%', border: `1px solid ${colors.border}`, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: colors.text }}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="cr-testi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { text: "“The best chocolate cake I've ever had! So rich, so fresh, so perfect. ❤️”", author: "Priya Sharma", initial: "P" },
              { text: "“Beautiful custom cake for my sister's birthday. Everyone loved it!”", author: "Aarav Mehta", initial: "A" },
              { text: "“Their pastries are a must-try. Fresh, flavorful and always delightful.”", author: "Sneha Kapoor", initial: "S" }
            ].map((t, i) => (
              <div key={i} style={{ backgroundColor: '#fff', padding: '2.5rem', borderRadius: '8px', border: `1px solid ${colors.border}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: colors.text, fontWeight: 500, marginBottom: '2rem' }}>{t.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: colors.brown, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>{t.initial}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '1rem', color: colors.text }}>{t.author}</div>
                    <div style={{ color: colors.accent, letterSpacing: '2px', fontSize: '0.8rem', marginTop: '0.2rem' }}>★★★★★</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISIT SECTION */}
      <section className="cr-visit-section" style={{ height: '70vh', position: 'relative', display: 'flex', alignItems: 'center', margin: '0 5vw', marginBottom: '4rem', borderRadius: '12px', overflow: 'hidden' }}>
        <img src="/assets/bakery_interior_1789584826791.jpg" alt="Bakery interior" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(31, 21, 18, 0.7)' }} />
        
        <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
          <div>
            <h2 style={{ fontFamily: fontSerif, fontSize: 'clamp(2rem, 5vw, 4.5rem)', color: '#fff', fontWeight: 400, marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Good Food<br/>Brings People Together.
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '3rem', maxWidth: '500px', margin: '0 auto 3rem auto' }}>
              Visit us and experience the warmth, aroma and joy of freshly baked happiness.
            </p>
            <Link to="/work/the-cake-room/visit-us" style={{
              backgroundColor: '#fff', color: colors.brown, padding: '1rem 2.5rem', borderRadius: '2rem',
              fontSize: '0.9rem', fontWeight: 600, border: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              textDecoration: 'none'
            }}>
              Find Our Bakery <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="hidden md:block" style={{ position: 'absolute', right: '10%', top: '30%', fontFamily: fontCursive, fontSize: '3rem', color: '#fff', opacity: 0.8, transform: 'rotate(10deg)', lineHeight: 1 }}>
          Happiness<br/>Served<br/>Daily ♡
        </div>
      </section>

    </div>
  );
}
