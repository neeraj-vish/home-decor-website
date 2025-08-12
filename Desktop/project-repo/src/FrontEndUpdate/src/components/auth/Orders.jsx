import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQty } from '../../redux/slices/cartSlice';
import axios from 'axios';
import Navbar from '../LandingPage/Navbar';
import { toast } from 'react-toastify';

const Orders = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);

  const paymentOptions = ['Credit Card', 'Net Banking', 'Cash on Delivery'];

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQtyChange = (productId, qty) => {
    dispatch(updateCartItemQty({ productId, qty: parseInt(qty) }));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  const paymentModeToId = {
    'Credit Card': 1,
    'Net Banking': 2,
    'Cash on Delivery': 3,
  };

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) {
      toast.warn('Your cart is empty');
      return;
    }
    setShowPaymentOptions(true);
  };

  const handlePaymentSelection = (mode) => {
    setSelectedPaymentMode(mode);
  };

  const handlePlaceOrder = async () => {
    if (!selectedPaymentMode) {
      toast('Please select a payment mode');
      return;
    }

    const invalidItems = cartItems.filter(
      (item) => !item.productSellerId || item.productSellerId === 0
    );

    if (invalidItems.length > 0) {
      toast.error(
        `Invalid productSellerId in your cart items: ${invalidItems
          .map((item) => item.name || '(Unnamed item)')
          .join(', ')}`
      );
      return;
    }

    setPlacingOrder(true);

    try {
      const userEmail = localStorage.getItem('email');
      if (!userEmail) {
        toast.error('User not logged in');
        setPlacingOrder(false);
        return;
      }

      const buyerResponse = await axios.get(
        `http://localhost:8083/api/buyers/email/${encodeURIComponent(userEmail)}`
      );

      const buyerId = buyerResponse.data.buyerId;
      if (!buyerId) {
        toast.error('Buyer info not found');
        setPlacingOrder(false);
        return;
      }

      const orderPayload = {
        transactionId: `TXN-${new Date().toISOString().replace(/[-T:]/g, '').slice(0, 12)}`,
        totalAmount: totalPrice,
        userId: buyerId,
        modeId: paymentModeToId[selectedPaymentMode],
        orderDetails: cartItems.map((item) => ({
          productSellerId: item.productSellerId,
          qty: item.qty || 1,
          price: item.price,
        })),
      };

      const response = await axios.post(
        'http://localhost:5000/api/orders/place',
        orderPayload
      );

      
      alert(`Order placed successfully!`);
      

      setShowPaymentOptions(false);
      setSelectedPaymentMode('');
    } catch (error) {
      console.error('Order placement error:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <>
      <div className="w-100 m-0 p-0">
        <Navbar />
      </div>

      <div className="container mt-5 pt-4 pb-5">
        <h2 className="text-center">Your Orders</h2>

        <div className="row">
          {cartItems.length === 0 ? (
            <p className="text-center">No items in your orders</p>
          ) : (
            cartItems.map((item) => (
              <div className="col-md-4 mb-4" key={item.productSellerId || item.productId}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.name}</h5>
                    <p>
                      <strong>Price:</strong> ₹{item.price}
                    </p>
                    <label><strong>Quantity:</strong></label>
                    <select
                      value={item.qty || 1}
                      onChange={(e) => handleQtyChange(item.productId, e.target.value)}
                      className="form-select mb-2"
                    >
                      {[...Array(10).keys()].map((n) => (
                        <option key={n + 1} value={n + 1}>{n + 1}</option>
                      ))}
                    </select>
                    <button
                      className="btn btn-danger mt-auto"
                      onClick={() => handleRemoveItem(item.productId)}
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="mt-4 text-center">
            <p>
              <strong>Total Price:</strong> ₹{totalPrice}
            </p>

            {showPaymentOptions ? (
              <div className="d-flex flex-column align-items-center" style={{ maxWidth: '300px', margin: '0 auto' }}>
                <h5>Select Payment Mode:</h5>
                <div className="btn-group-vertical w-100" style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '10px' }}>
                  {paymentOptions.map((option, index) => (
                    <button
                      key={index}
                      className={`btn ${selectedPaymentMode === option ? 'btn-primary' : 'btn-outline-primary'} mb-2`}
                      onClick={() => handlePaymentSelection(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {selectedPaymentMode && <p className="mt-2">Selected: {selectedPaymentMode}</p>}

                <button
                  className="btn btn-success mt-3"
                  onClick={handlePlaceOrder}
                  disabled={placingOrder}
                >
                  {placingOrder ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            ) : (
              <>
                <button className="btn btn-success me-3" onClick={handleConfirmOrder}>
                  Confirm Order
                </button>
                <button className="btn btn-secondary" onClick={() => (window.location.href = '/')}>Cancel</button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
