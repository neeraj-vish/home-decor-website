import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SellerDashboard from './SellerDashboard';
import AddProduct from './AddProduct';
import SellerProducts from './SellerProducts';
import EditProduct from './EditProduct';

const SellerRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<SellerDashboard />} />
      <Route path="add-product" element={<AddProduct />} />
      <Route path="seller-products" element={<SellerProducts />} />
      <Route path="edit-product/:id" element={<EditProduct />} />
    </Routes>
  );
};

export default SellerRoutes;
