import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthRoutes from './components/auth/AuthRoutes';
import LandingRoutes from './components/LandingPage/LandingRoutes';
import SellerRoutes from './components/seller/SellerRoutes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<LandingRoutes />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/seller/*" element={<SellerRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
