import { Routes, Route } from 'react-router-dom';
import Navbar from '../LandingPage/Navbar';
import SellerDashboard from './SellerDashboard';
import AddProduct from './AddProduct';
import SellerProducts from './SellerProducts';
import EditProduct from './EditProduct';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';


const SellerRoutes = () => {
  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Routes>
        <Route path="dashboard" element={<SellerDashboard />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="seller-products" element={<SellerProducts />} />
        <Route path="edit-product/:id" element={<EditProduct />} />
      </Routes>
    </>
  );
};

export default SellerRoutes;