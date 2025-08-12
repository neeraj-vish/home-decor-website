import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../AllProducts/ProductCard';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ProductsByCategory = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (categoryName) {
      axios.get(`http://localhost:5000/api/product/bycategory/${categoryName}`)
        .then(res => {
          setProducts(res.data);
        })
        .catch(err => {
          if (err.response && err.response.status === 404) {
            setProducts([]);
          } else {
            console.error('Error fetching products by category:', err);
          }
        });
    }
  }, [categoryName]);

  const handleAddToOrder = () => {
    if (!user) {
      navigate('/auth/login');
    } else {
      
      navigate('/auth/orders');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Products in "{categoryName}"</h2>
      <div className="row">
        {products.length === 0 ? (
          <p className="text-center">No products available</p>
        ) : (
          products.map(product => (
            <div className="col-md-4 mb-4" key={product.productId}>
              <ProductCard product={product} onAddToOrder={handleAddToOrder} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsByCategory;