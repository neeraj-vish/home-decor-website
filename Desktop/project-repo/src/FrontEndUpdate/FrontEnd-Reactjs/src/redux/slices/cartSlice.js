import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { productSellerId, productId, name, price } = action.payload;

      if (
        productSellerId &&         
        productId &&
        name &&
        price &&
        !state.items.some((item) => item.productSellerId === productSellerId) 
      ) {
        state.items.push({ productSellerId, productId, name, price, qty: 1 }); // default qty
      } else if (state.items.some((item) => item.productSellerId === productSellerId)) {
        console.log('Item already in cart, skipping:', { productSellerId, productId, name, price });
      } else {
        console.error('Invalid data for addToCart:', action.payload);
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.productId !== action.payload);
    },

    updateCartItemQty: (state, action) => {
      const { productId, qty } = action.payload;
      const item = state.items.find((item) => item.productId === productId);
      if (item) {
        item.qty = qty;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQty } = cartSlice.actions;
export default cartSlice.reducer;
