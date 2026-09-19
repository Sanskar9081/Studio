import React from 'react';
import { motion } from 'framer-motion';
import { Camera, ShoppingBag, Hexagon, Tv, Globe2, CreditCard } from 'lucide-react';

const clients = [
  { name: 'Instagram', icon: Camera },
  { name: 'Shopify', icon: ShoppingBag },
  { name: 'HubSpot', icon: Hexagon },
  { name: 'CNBC', icon: Tv },
  { name: 'BUSINESS INSIDER', icon: Globe2 },
  { name: 'stripe', icon: CreditCard },
];

// Duplicate for infinite scroll
const duplicatedClients = [...clients, ...clients, ...clients, ...clients];

export default function Clients() {
  return (
    <section className="py-24 bg-[#0c1128] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col items-center text-center">
        <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest text-white/70 mb-6">
          Interested
        </div>
        <h2 className="font-outfit font-medium text-2xl text-white/90">
          Trusted by 300+ businesses globally
        </h2>
      </div>

      <div className="relative w-full flex overflow-hidden mask-image-gradient">
        {/* Left Fade Overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0c1128] to-transparent z-10 pointer-events-none"></div>
        
        {/* Infinite Ticker */}
        <motion.div 
          className="flex items-center space-x-24 w-max px-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {duplicatedClients.map((client, idx) => (
            <div key={idx} className="flex items-center gap-3 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300">
              <client.icon size={32} className="text-white" />
              <span className="font-outfit font-bold text-2xl tracking-tighter text-white">
                {client.name}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Right Fade Overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0c1128] to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
}
