import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Services from './Services';
import Work from './Work';
import About from './About';
import Visit from './Visit';
import { BookingProvider } from './BookingModal';

export default function VeloraSalonApp() {
  return (
    <BookingProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/visit-us" element={<Visit />} />
        </Routes>
      </Layout>
    </BookingProvider>
  );
}
