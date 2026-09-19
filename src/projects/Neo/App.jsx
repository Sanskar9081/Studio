import React from 'react';
import { Plus, X, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Neo.css';

export default function NeoApp() {
  return (
    <div className="neo-project min-h-screen">
      
      {/* Sticky Nav Pill */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] md:w-[90%] max-w-[800px] bg-white/90 backdrop-blur-sm neo-border neo-shadow rounded-full z-50 flex items-center justify-between p-2 pl-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-black bg-[var(--neo-green)] text-[var(--neo-black)] flex items-center justify-center font-bold text-sm font-['Space_Grotesk']">
            Y
          </div>
          <div className="font-['Space_Grotesk'] font-bold lowercase text-xl tracking-tight mr-4 md:mr-8 hidden sm:block">yuzu</div>
          
          <div className="hidden md:flex gap-6 font-['Space_Grotesk'] font-bold lowercase text-sm">
            <a href="#features" className="hover:text-[var(--neo-purple)] transition-colors">features</a>
            <a href="#grid" className="hover:text-[var(--neo-pink)] transition-colors">vibe check</a>
            <a href="#faq" className="hover:text-[var(--neo-green)] transition-colors">faq</a>
          </div>
        </div>
        <button className="bg-[var(--neo-black)] text-[var(--neo-white)] font-['Space_Grotesk'] font-bold lowercase px-4 sm:px-6 py-2 rounded-full hover:scale-105 transition-transform whitespace-nowrap text-sm sm:text-base" style={{ transitionTimingFunction: 'var(--neo-bounce)' }}>
          get app -&gt;
        </button>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen pt-32 pb-16 px-4 md:px-8 flex items-center" style={{ backgroundColor: 'var(--neo-green)' }}>
        <div className="max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative">
          
          {/* Background Blurred Circles */}
          <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-[var(--neo-pink)]/40 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>
          <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[var(--neo-purple)]/40 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>

          <div className="w-full lg:w-1/2 z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1 className="neo-headline text-[clamp(50px,12vw,140px)] mb-6 text-[var(--neo-black)] leading-[0.9]">
              your vibe, <br/>
              <span className="neo-text-gradient">digitized.</span>
            </h1>
            <p className="font-['DM_Sans'] text-lg md:text-xl mb-10 max-w-md font-medium leading-snug">
              drop the filters. ditch the algos. just pure, unhinged chaos with your fav humans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="neo-btn bg-[var(--neo-black)] text-[var(--neo-white)] neo-wobble text-sm rounded-xl py-3 px-6 flex justify-center items-center gap-2 w-full sm:w-auto">
                <span className="text-lg"></span> app store
              </button>
              <button className="neo-btn bg-[var(--neo-white)] text-[var(--neo-black)] neo-wobble text-sm rounded-xl py-3 px-6 flex justify-center items-center gap-2 w-full sm:w-auto">
                <span className="text-blue-500">▶</span> google play
              </button>
            </div>
            
            {/* Waitlist */}
            <div className="flex items-center gap-4 mt-8">
               <div className="flex -space-x-2">
                 <div className="w-10 h-10 rounded-full border-2 border-black bg-blue-500 shadow-[2px_2px_0px_#000]"></div>
                 <div className="w-10 h-10 rounded-full border-2 border-black bg-gray-600 shadow-[2px_2px_0px_#000]"></div>
                 <div className="w-10 h-10 rounded-full border-2 border-black bg-blue-400 shadow-[2px_2px_0px_#000]"></div>
               </div>
               <div className="bg-black text-white text-xs font-bold px-4 py-2 rounded-full border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
                 2k+ in waitlist
               </div>
            </div>
          </div>
          
          {/* Brutalist Phone Mockup & Stickers */}
          <div className="w-full lg:w-1/2 relative h-[600px] md:h-[700px] flex justify-center items-center">
            
            {/* Background elements */}
            <div className="absolute top-0 left-0 text-5xl opacity-80 hidden md:block" style={{ transform: 'rotate(-15deg)' }}>⭐</div>
            <div className="absolute top-[20%] right-[20%] text-4xl opacity-80 hidden md:block" style={{ transform: 'rotate(15deg)' }}>⚡</div>

            {/* Stickers */}
            <div className="absolute neo-float bg-white border-2 border-black rounded-full px-4 py-2 font-bold text-xs flex items-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] z-20 whitespace-nowrap" style={{ top: '10%', left: '0%', animationDelay: '0s' }}>
              ✨ finally, an app that isn't boring
            </div>
            <div className="absolute neo-float bg-[var(--neo-pink)] text-white border-2 border-black rounded-lg px-4 py-2 font-bold text-sm shadow-[4px_4px_0px_rgba(0,0,0,0.2)] z-20" style={{ top: '65%', left: '5%', animationDelay: '1.5s' }}>
              sheeeesh
            </div>
            <div className="absolute neo-float bg-white border-2 border-black rounded-lg w-12 h-12 flex items-center justify-center text-2xl shadow-[4px_4px_0px_rgba(0,0,0,0.2)] z-20 hidden md:flex" style={{ top: '25%', right: '15%', animationDelay: '3s' }}>
              🔥
            </div>

            <div className="relative w-full max-w-[340px] h-[550px] md:h-[680px] bg-[var(--neo-white)] border-[12px] border-[var(--neo-black)] rounded-[3rem] neo-shadow flex flex-col overflow-hidden bg-[#f9f9f9] scale-90 sm:scale-100">
              
              {/* Header */}
              <div className="flex justify-between items-center p-6 pt-8 md:pt-10">
                 <div className="font-['Space_Grotesk'] font-bold text-2xl lowercase">feed.</div>
                 <div className="w-8 h-8 bg-black rounded-full"></div>
              </div>
              
              {/* Feed Content */}
              <div className="flex-1 overflow-y-auto p-4 pt-4 space-y-6">
                
                <div className="bg-[var(--neo-green)] neo-border-sm shadow-[4px_4px_0px_#000] p-4 rounded-xl">
                  <div className="font-bold font-['Space_Grotesk'] text-lg mb-2 lowercase">@sarah</div>
                  <div className="w-full h-32 md:h-40 bg-[#1e4620] border-2 border-[var(--neo-black)] mb-3 rounded-lg overflow-hidden flex items-center justify-center text-5xl md:text-6xl shadow-inner">
                     🥚
                  </div>
                  <p className="font-['DM_Sans'] text-sm font-bold">current mood: screaming 😱</p>
                </div>
                
                <div className="bg-[var(--neo-purple)] neo-border-sm shadow-[4px_4px_0px_#000] p-4 rounded-xl">
                   <div className="w-full h-20"></div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Slanted Marquee */}
      <section className="w-full bg-[var(--neo-black)] py-4 overflow-hidden border-y-4 border-[var(--neo-white)]" style={{ transform: 'rotate(-2deg) scale(1.05)', position: 'relative', zIndex: 10 }}>
        <div className="neo-marquee-content text-[var(--neo-white)] font-['Space_Grotesk'] text-5xl md:text-7xl font-bold uppercase tracking-wider">
          <span className="mx-8">NO CAP</span> <span className="mx-8">✦</span> 
          <span className="mx-8">JUST VIBES</span> <span className="mx-8">✦</span> 
          <span className="mx-8">MAIN CHARACTER ENERGY</span> <span className="mx-8">✦</span> 
          <span className="mx-8">NO CAP</span> <span className="mx-8">✦</span> 
          <span className="mx-8">JUST VIBES</span> <span className="mx-8">✦</span> 
          <span className="mx-8">MAIN CHARACTER ENERGY</span> <span className="mx-8">✦</span>
          <span className="mx-8">NO CAP</span> <span className="mx-8">✦</span> 
          <span className="mx-8">JUST VIBES</span> <span className="mx-8">✦</span> 
          <span className="mx-8">MAIN CHARACTER ENERGY</span> <span className="mx-8">✦</span>
        </div>
      </section>

      {/* Bento Grid */}
      <section id="grid" className="py-32 px-4 md:px-8 bg-[#f5f5f5]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="neo-headline text-5xl md:text-8xl mb-16 text-center">the <span className="neo-text-gradient">features</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            
            {/* Card A (7 cols) */}
            <div className="md:col-span-7 bg-[#e0e0e0] p-8 md:p-10 neo-border neo-shadow hover:scale-[1.02] transition-transform relative overflow-hidden" style={{ transform: 'rotate(1deg)', transitionTimingFunction: 'var(--neo-bounce)' }}>
              <h3 className="font-['Space_Grotesk'] text-4xl font-bold mb-4 lowercase">unfiltered life.</h3>
              <p className="font-['DM_Sans'] text-xl max-w-sm relative z-10">post whatever. we don't care about aesthetic perfection. just be you.</p>
              <div className="absolute -bottom-4 -right-4 md:-bottom-10 md:-right-10 text-[120px] md:text-[180px] font-bold text-[var(--neo-white)] z-0" style={{ textShadow: '4px 4px 0 #000' }}>✌️</div>
            </div>

            {/* Card B (5 cols) */}
            <div className="md:col-span-5 bg-[var(--neo-black)] text-[var(--neo-white)] p-8 md:p-10 neo-border neo-shadow hover:scale-[1.02] transition-transform flex flex-col justify-center" style={{ transform: 'rotate(-2deg)', transitionTimingFunction: 'var(--neo-bounce)' }}>
              <h3 className="font-['Space_Grotesk'] text-4xl font-bold mb-4 lowercase text-[var(--neo-green)]">zero ads.</h3>
              <p className="font-['DM_Sans'] text-xl">we sell vibes, not your data. enjoy a completely ad-free experience forever.</p>
            </div>

            {/* Card C (12 cols) */}
            <div className="md:col-span-12 bg-[var(--neo-pink)] p-8 md:p-12 neo-border neo-shadow hover:scale-[1.01] transition-transform flex flex-col md:flex-row items-center gap-8 md:gap-12" style={{ transform: 'rotate(0.5deg)', transitionTimingFunction: 'var(--neo-bounce)' }}>
              <div className="w-full md:w-1/2">
                <h3 className="font-['Space_Grotesk'] text-5xl md:text-7xl font-bold mb-6 lowercase text-[var(--neo-white)] leading-[0.9]">squad up<br/>instantly.</h3>
                <p className="font-['DM_Sans'] text-xl md:text-2xl text-[var(--neo-white)] font-bold mb-8 max-w-lg">create private corners for you and your besties. no lurkers allowed.</p>
                <button className="neo-btn bg-[var(--neo-green)] text-[var(--neo-black)] neo-wobble">start a squad</button>
              </div>
              <div className="w-full md:w-1/2 bg-[var(--neo-white)] neo-border neo-shadow p-6 rounded-xl flex flex-col gap-4" style={{ transform: 'rotate(-1.5deg)' }}>
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 border-b-4 border-black pb-4">
                    <div className="font-['Space_Grotesk'] font-bold text-xl sm:text-2xl break-words">Squad: Midnight Riders 🦇</div>
                    <div className="flex -space-x-4 shrink-0">
                      <div className="w-10 h-10 rounded-full border-2 border-black bg-[var(--neo-green)]"></div>
                      <div className="w-10 h-10 rounded-full border-2 border-black bg-[var(--neo-purple)]"></div>
                      <div className="w-10 h-10 rounded-full border-2 border-black bg-[var(--neo-pink)]"></div>
                    </div>
                 </div>
                 <div className="bg-[#f0f0f0] border-2 border-black p-4 font-['DM_Sans'] font-bold text-sm md:text-base">yo, who is awake?</div>
                 <div className="bg-[var(--neo-purple)] text-white border-2 border-black p-4 font-['DM_Sans'] font-bold self-end text-right text-sm md:text-base">me. let's game.</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-4 md:px-8 bg-[var(--neo-white)]">
        <div className="max-w-[800px] mx-auto">
          <h2 className="neo-headline text-5xl md:text-8xl mb-16 text-center">no <span className="neo-text-gradient">cap</span> faq.</h2>
          
          <details className="neo-details" open>
            <summary className="text-lg md:text-xl">
              is this actually free?
              <Plus className="neo-icon shrink-0" size={32} />
            </summary>
            <p className="font-bold text-base md:text-lg">yeah literally 100% free. we might drop some exclusive paid stickers later but the core app is free forever.</p>
          </details>

          <details className="neo-details">
            <summary className="text-lg md:text-xl">
              how do algorithms work here?
              <Plus className="neo-icon shrink-0" size={32} />
            </summary>
            <p className="font-bold text-base md:text-lg">they don't. chronological feed only. what you see is what people actually post, in order.</p>
          </details>

          <details className="neo-details">
            <summary className="text-lg md:text-xl">
              can i use it on desktop?
              <Plus className="neo-icon shrink-0" size={32} />
            </summary>
            <p className="font-bold text-base md:text-lg">mobile only right now. touch grass, stay on the move.</p>
          </details>

        </div>
      </section>

      {/* Giant CTA & Footer */}
      <section className="bg-[var(--neo-pink)] pt-32 relative overflow-hidden flex flex-col items-center">
        
        <div className="neo-sticker neo-float opacity-20" style={{ top: '10%', left: '15%', fontSize: '120px', width: '200px', height: '200px' }}>🦄</div>
        <div className="neo-sticker neo-float opacity-20" style={{ top: '40%', right: '10%', fontSize: '150px', width: '250px', height: '250px', animationDelay: '2s' }}>👽</div>

        <div className="relative z-10 text-center px-4 md:px-8 mb-32">
          <h2 className="neo-headline text-[clamp(50px,12vw,200px)] text-[var(--neo-white)] leading-[0.8] mb-12">
            join the<br/>wave.
          </h2>
          <button className="neo-btn bg-[var(--neo-green)] text-[var(--neo-black)] neo-wobble text-xl md:text-3xl px-8 md:px-12 py-4 md:py-6 whitespace-nowrap">
            download z-sync
          </button>
        </div>

        <footer className="w-full bg-[var(--neo-white)] border-t-8 border-[var(--neo-black)] pt-16 pb-24 md:pb-8 relative overflow-hidden">
          {/* Watermark text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-['Space_Grotesk'] font-black text-[25vw] opacity-5 pointer-events-none whitespace-nowrap">
            Z-SYNC
          </div>

          <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 font-['Space_Grotesk'] font-bold lowercase text-lg md:text-xl">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
              <a href="#" className="hover:text-[var(--neo-purple)] text-center w-full sm:w-auto">instagram</a>
              <a href="#" className="hover:text-[var(--neo-pink)] text-center w-full sm:w-auto">tiktok</a>
              <a href="#" className="hover:text-[var(--neo-green)] text-center w-full sm:w-auto">x / twitter</a>
            </div>
            <div className="text-center">
              made with 💀 in 2026
            </div>
          </div>
        </footer>

      </section>
      
      {/* Back to Studio Global Link */}
      <Link 
        to="/" 
        className="fixed bottom-6 left-6 z-[100] flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[var(--neo-white)] neo-border-sm neo-shadow-sm font-['Space_Grotesk'] font-bold lowercase text-[var(--neo-black)] hover:scale-105 transition-transform"
        style={{ borderRadius: '999px', transitionTimingFunction: 'var(--neo-bounce)' }}
      >
        <ArrowLeft size={16} />
        <span className="hidden sm:inline">back to studio</span>
        <span className="sm:hidden">back</span>
      </Link>
    </div>
  );
}
