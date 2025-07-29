// src/redux/slices/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action) {
      state.items.push(action.payload);
    },
    setProducts(state, action) {
      state.items = action.payload;
    },
    updateProduct(state, action) {
      const index = state.items.findIndex(item => item.product_seller_id === action.payload.product_seller_id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct(state, action) {
      state.items = state.items.filter(item => item.product_seller_id !== action.payload);
    },
    
  },
});

export const { addProduct, setProducts, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
