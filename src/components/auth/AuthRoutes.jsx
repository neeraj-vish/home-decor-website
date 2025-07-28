import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthPage from './AuthPage';
import BuyerSignup from './BuyerSignup';
import SellerSignup from './SellerSignup';
import Logout from './Logout';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<AuthPage />} />
      <Route path="signup-buyer" element={<BuyerSignup />} />
      <Route path="signup-seller" element={<SellerSignup />} />
      <Route path="logout" element={<Logout />} />
    </Routes>
  );
};

export default AuthRoutes;
