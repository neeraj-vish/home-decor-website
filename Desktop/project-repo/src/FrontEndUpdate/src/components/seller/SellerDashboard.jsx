import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SellerProducts from './SellerProducts';

const SellerDashboard = () => {
  const user = useSelector((state) => state.auth.user) || JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <div className="d-flex min-vh-100">
      {/* Background Image */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: "url('/sellerdashboard.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1,
        }}
      ></div>

      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
        <h4 className="text-center mb-4">Seller Panel</h4>
        <ul className="nav flex-column">
          <li>
            <button className="btn btn-link text-white w-100" onClick={() => navigate('/seller/dashboard')}>
              Dashboard
            </button>
          </li>
          <li>
            <button className="btn btn-link text-white w-100" onClick={() => navigate('/seller/add-product')}>
              Add Product
            </button>
          </li>
        </ul>
      </div>

      {/* Product Display */}
      <div className="flex-grow-1 p-4">
        <SellerProducts embedded />
      </div>
    </div>
  );
};

export default SellerDashboard;
