import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import EditBuyer from './EditBuyer';
import BuyerList from './BuyerList';
import EditSeller from './EditSeller';
import SellerList from './SellerList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminRoutes = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="buyers" element={<BuyerList />} />
        <Route path="edit-buyer/:id" element={<EditBuyer />} />
        <Route path="sellers" element={<SellerList />} />
      <Route path="edit-seller/:id" element={<EditSeller />} />
    </Routes>
    </>
  );
};

export default AdminRoutes;
