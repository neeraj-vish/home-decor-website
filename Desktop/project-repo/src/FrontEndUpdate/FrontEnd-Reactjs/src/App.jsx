import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthRoutes from './components/auth/AuthRoutes';
import LandingRoutes from './components/LandingPage/LandingRoutes';
import SellerRoutes from './components/seller/SellerRoutes';
import Orders from './components/auth/Orders';
import AdminRoutes from './components/Admin/AdminRoutes';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<LandingRoutes />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/seller/*" element={<SellerRoutes />} />
        <Route path="/order/:productId" element={<Orders />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
