import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './LandingPage';
import ProductsByCategory from '../Products/ProductsByCategory';

const LandingRoutes = () => (
  <Routes>
    <Route index element={<LandingPage />} />
    <Route path=":categoryName" element={<ProductsByCategory />} />
  </Routes>
);

export default LandingRoutes;
