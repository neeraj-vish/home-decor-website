import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthPage from './AuthPage';
import BuyerSignup from './BuyerSignup';
import SellerSignup from './SellerSignup';
import Logout from './Logout';
import Orders from './Orders';
import BuyerProfile from './BuyerProfile';
import EditBuyerProfile from './EditBuyerProfile';
import SellerProfile from './SellerProfile';
import EditSellerProfile from './EditSellerProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const AuthRoutes = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Routes>

      <Route path="login" element={<AuthPage />} />
      <Route path="signup-buyer" element={<BuyerSignup />} />
      <Route path="signup-seller" element={<SellerSignup />} />
      <Route path="logout" element={<Logout />} />
      <Route path ="Orders" element={<Orders/>} />
      <Route path="BuyerProfile" element={<BuyerProfile />} />
     <Route path="EditBuyerProfile" element={<EditBuyerProfile />} />
     <Route path="SellerProfile" element={<SellerProfile />} />
    <Route path="EditSellerProfile" element={<EditSellerProfile />} />


    </Routes>
    </>
  );
};

export default AuthRoutes;


