import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  { id: 1, src: '/images/gallery1.jpg', desc: 'The Platinum Ref. 520 - Hand finished dial' },
  { id: 2, src: '/images/gallery2.jpg', desc: 'Guilloche dial detailing under macro' },
  { id: 3, src: '/images/gallery3.jpg', desc: 'Sartorial elegance paired with the Rose Elegance' },
  { id: 4, src: '/images/gallery4.jpg', desc: 'Exhibition caseback showing Calibre 400' },
  { id: 5, src: '/images/gallery5.jpg', desc: 'The Noir Crimson in its element' },
];

export default function Gallery() {
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Horizontal Scroll
      const scrollWidth = scrollWrapperRef.current.scrollWidth - window.innerWidth;
      
      const scrollTween = gsap.to(scrollWrapperRef.current, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: `+=${scrollWidth}`,
        }
      });

      // Velocity Skew Effect
      const proxy = { skew: 0 };
      const skewSetter = gsap.quickSetter(".gallery-item", "skewX", "deg");
      const clamp = gsap.utils.clamp(-15, 15);

      ScrollTrigger.create({
        onUpdate: (self) => {
          const skew = clamp(self.getVelocity() / -300);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: "power3",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew)
            });
          }
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNext = (e) => {
    e.stopPropagation();
    const currIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currIndex + 1) % galleryImages.length;
    setSelectedImage(galleryImages[nextIndex]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const currIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(galleryImages[prevIndex]);
  };

  return (
    <section ref={containerRef} className="h-screen w-full bg-[#030303] overflow-hidden flex items-center">
      
      <div className="absolute top-10 left-6 md:left-10 z-10">
        <h2 className="font-bodoni text-3xl md:text-4xl text-white/40">Visual Archives</h2>
      </div>

      <div ref={scrollWrapperRef} className="flex gap-8 md:gap-16 px-8 md:px-32 items-center h-[60vh] md:h-[70vh]">
        {galleryImages.map((item) => (
          <div 
            key={item.id}
            className="gallery-item relative w-[80vw] md:w-[40vw] lg:w-[30vw] h-full shrink-0 cursor-pointer overflow-hidden group"
            onClick={() => setSelectedImage(item)}
          >
            <img 
              src={item.src} 
              alt={item.desc}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} strokeWidth={1} />
            </button>

            <button 
              className="absolute left-8 text-white/30 hover:text-white transition-colors hidden md:block"
              onClick={handlePrev}
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>
            <button 
              className="absolute right-8 text-white/30 hover:text-white transition-colors hidden md:block"
              onClick={handleNext}
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>

            <div className="flex flex-col items-center justify-center max-w-[80vw] h-screen p-8" onClick={e => e.stopPropagation()}>
              <motion.img 
                key={selectedImage.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                src={selectedImage.src} 
                alt={selectedImage.desc}
                className="max-h-[75vh] w-auto object-contain mb-8 shadow-2xl"
              />
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-inter text-white/60 text-lg tracking-wide text-center"
              >
                {selectedImage.desc}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
