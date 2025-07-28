// src/components/seller/SellerProducts.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from '../../redux/slices/productSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const SellerProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);

  useEffect(() => {
    if (!products || products.length === 0) {
      // Load demo products into Redux store if empty (e.g., on page refresh)
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
    }
  }, [dispatch, products]);

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4 text-center">My Products</h2>

      <div className="row g-3">
        {products && products.length > 0 ? (
          products.map(product => (
            <div key={product.product_seller_id} className="col-md-3 col-sm-6 col-12">
              <div className="card h-100 shadow-sm">
                <img
                  src={product.image}
                  alt={product.product_name}
                  className="card-img-top"
                  style={{ width: '100%', height: 180, objectFit: 'cover', backgroundColor: '#f2f2f2' }}
                />
                <div className="card-body p-2">
                  <h6 className="card-title mb-1" style={{ fontSize: '0.95rem' }}>
                    {product.product_name}
                  </h6>
                  <p className="text-muted mb-1" style={{ fontSize: '0.8rem' }}>
                    Category: {product.category_name}
                  </p>
                  <p className="small mb-2" style={{ fontSize: '0.75rem' }}>
                    {product.description}
                  </p>
                  <p className="text-success fw-semibold mb-2" style={{ fontSize: '0.9rem' }}>
                    ₹{product.price}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                      onClick={() => navigate(`/seller/edit-product/${product.product_seller_id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                      onClick={() => alert('Delete functionality to be implemented')}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      {/* Navigation */}
      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate('/seller/dashboard')}>
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SellerProducts;
