
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from './LandingPage';
import ProductsByCategory from '../Products/ProductsByCategory';

const LandingRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<LandingPage />} />
      <Route path=":categoryName" element={<ProductsByCategory />} />
    </Route>
  </Routes>
);

export default LandingRoutes;