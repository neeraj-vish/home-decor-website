import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  if (!product) return null;

 const handleBuyNow = () => {
  if (product && product.productId && product.productName && product.price) {
    if (!user) {
      navigate('/auth/login');
    } else {
      dispatch(addToCart({
        productSellerId: product.productSellerId, 
        productId: product.productId,
        name: product.productName,
        price: product.price
      }));

      navigate(`/order/${product.productId}`);
    }
  } else {
    console.error('Invalid product data for Buy Now:', product);
  }
};


  return (
    <div className="card h-100 shadow-sm">
      {/* Product Image */}
      {product.imageUrl && (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{ height: 200, backgroundColor: 'rgb(248, 249, 250)' }}
  >
    <img
      src={product.imageUrl.startsWith('http') ? product.imageUrl : `http://localhost:5000${product.imageUrl}`}
      alt={product.productName}
      style={{
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
        marginTop: '15px'
      }}
    />
  </div>
)}


      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.productName}</h5>
        <p className="card-text">{product.description}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Price:</strong> ₹{product.price}</p>
        <p><strong>Seller:</strong> {product.companyName}</p>

        <button
          className="btn btn-primary mt-auto"
          onClick={handleBuyNow}
        >
          Add to Order
        </button>
      </div>
    </div>
  );
};

export default ProductCard;