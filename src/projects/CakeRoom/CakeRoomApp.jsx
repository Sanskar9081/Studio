import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import Layout from './Layout';
import Home from './Home';
import Menu from './Menu';
import Story from './Story';
import Visit from './Visit';
import Cart from './Cart';
import ProductDetail from './ProductDetail';
import Custom from './Custom';

export default function CakeRoomApp() {
  return (
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/breads" element={<Menu category="breads" title="Freshly baked breads." subtitle="Made with care and local ingredients." />} />
          <Route path="/cakes" element={<Menu category="cakes" title="Cakes worth celebrating." subtitle="For the sweetest moments." />} />
          <Route path="/pastries" element={<Menu category="pastries" title="Small treats. Big happiness." subtitle="Perfect with your morning coffee." />} />
          <Route path="/story" element={<Story />} />
          <Route path="/visit-us" element={<Visit />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/custom" element={<Custom />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </Layout>
    </CartProvider>
  );
}
