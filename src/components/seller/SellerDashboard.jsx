import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from '../../redux/slices/productSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);

  useEffect(() => {
    // Load initial mock data or fetch from API
    const mockData = [
      {
        product_seller_id: 1,
        product_name: "Elegant Lamp",
        category_name: "Lighting",
        description: "Beautiful electric lamp for indoor use",
        price: "1199.00",
        image: "https://m.media-amazon.com/images/I/51AoplYc3lL._UF1000,1000_QL80_.jpg"
      },
      {
        product_seller_id: 2,
        product_name: "Wooden Chair",
        category_name: "Furniture",
        description: "Solid oak wood chair, handmade",
        price: "2399.00",
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQAljWnkfvNfcfHaVLB0QMfGGNyd3tKqCpx1n-fXKb2CC6yqrjb2rNIFUG92YhaEPVBQdg7o1_CdDN9kNQdsrSUuw6UH-iTZp-DymsrEwpV3oBf6ACBLydc&usqp=CAc"
      },
      {
        product_seller_id: 3,
        product_name: "Decorative Cushion Pack",
        category_name: "Textile",
        description: "Pack of 3 high-quality cushions",
        price: "899.00",
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRYbh7XePmH3TOUprG6bL2N49VcO3bAgAJMPTFYxW4VhnzodiPwrllHVfL5FbC1_dNYfJpLTkWBXrW2srnC8AQrQoguMdODHX5yPGPRLMdqRqw5rQHB0hBSnxUZY_VyAX886ogwRmg&usqp=CAc"
      }
    ];
    dispatch(setProducts(mockData));
  }, [dispatch]);

  return (
    <div className="container-fluid d-flex vh-100 vw-100 position-relative">
      {/* Background Image Div - Added this new div */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: "url('/sellerdashboard.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // filter: 'blur(2px)',
          zIndex: -1,
        }}
      ></div>

    
        <div className="d-flex min-vh-100 min-vw-100">
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
          <li>
            <button className="btn btn-link text-white w-100" onClick={() => navigate('/seller/seller-products')}>
              My Products
            </button>
          </li>
          <li>
            <button className="btn btn-outline-light w-100 mt-3" onClick={() => navigate('/')}>
              Logout
            </button>
          </li>
            </ul>
          </div>

          <div className="flex-grow-1 p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold" style={{ color: '#2c3e50' }}>Welcome, Seller</h3>
          <button className="btn btn-success" onClick={() => navigate('/seller/add-product')}>
            + Add New Product
          </button>
            </div>

            {products.length === 0 ? (
          <p>No products found.</p>
            ) : (
          <div className="row g-4">
            {products.map(product => (
              <div className="col-md-3 col-sm-6 col-12" key={product.product_seller_id}>
            <div className="card shadow h-100">
              <img
                src={product.image}
                alt={product.product_name}
                className="card-img-top"
                style={{ width: '100%', height: '120px', objectFit: 'contain', backgroundColor: '#f2f2f2' }}
              />
              <div className="card-body p-2">
                <h6 className="card-title mb-1" style={{ fontSize: '0.9rem', color: '#1a237e' }}>
              {product.product_name}
                </h6>
                <p className="text-muted mb-1" style={{ fontSize: '0.75rem', color: '#6c757d' }}>
              Category: {product.category_name}
                </p>
                <p className="small mb-2" style={{ fontSize: '0.75rem', color: '#616161' }}>
              {product.description}
                </p>
                <p className="text-success fw-semibold mb-2" style={{ fontSize: '0.9rem', color: '#388e3c' }}>
              ₹{product.price}
                </p>
                <div className="d-flex justify-content-between">
              <button
                className="btn btn-outline-primary btn-sm"
                style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }}
                onClick={() => navigate(`/seller/edit-product/${product.product_seller_id}`)}
              >
                Edit
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }}
                onClick={() => alert('Delete functionality to be implemented')}
              >
                Delete
              </button>
                </div>
              </div>
            </div>
              </div>
            ))}
          </div>
            )}



              {/* <footer className="text-center pt-5 fs-6" style={{ color: '#ffffffff' }}>© 2025 Home Decor Dashboard</footer> */}



              <footer className="text-center pt-5 fs-6">
  <mark style={{ 
    backgroundColor: '#000000de', 
    color: '#09ff3aa8',
    padding: '0 0.2rem'
  }}>
    © 2025 Home Decor Dashboard
  </mark>
</footer>
         



          </div>   

        </div>
          </div> 
  );
};

export default SellerDashboard;