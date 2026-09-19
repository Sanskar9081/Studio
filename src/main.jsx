import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ScrollManager from './components/ScrollManager';

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Showroom from './components/Showroom';
import Expertise from './components/Expertise';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StudioConcierge from './components/StudioConcierge';

import PortfolioApp from './projects/Portfolio/App';
import VeloraSalon from './projects/VeloraSalon';

import './styles.css';

function Home() {
  return (
    <div className="app-container">
      <Navigation />
      <main>
        <Hero />
        <Philosophy />
        <Showroom />
        <Expertise />
        <Process />
        <Contact />
      </main>
      <Footer />
      <StudioConcierge />
    </div>
  );
}

import AgencyApp from './projects/Agency/App';
import MuseumApp from './projects/Museum/App';
import HaloApp from './projects/Halo/App';
import NeoApp from './projects/Neo/App';
import CakeRoom from './projects/CakeRoom';

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/smilecare/*" element={<PortfolioApp />} />
          <Route path="/work/velora-salon/*" element={<VeloraSalon />} />
          <Route path="/work/nexal-digital/*" element={<AgencyApp />} />
          <Route path="/work/museum/*" element={<MuseumApp />} />
          <Route path="/work/halo/*" element={<HaloApp />} />
          <Route path="/work/neo/*" element={<NeoApp />} />
          <Route path="/work/the-cake-room/*" element={<CakeRoom />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
