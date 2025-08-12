// src/redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductsBySeller = createAsyncThunk(
  'products/fetchBySeller',
  async (email, thunkAPI) => {
    const response = await axios.get(`http://localhost:8083/api/products/seller/${email}`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addProduct(state, action) {
      state.items.push(action.payload);
    },
    setProducts(state, action) {
      state.items = action.payload;
    },
    updateProduct(state, action) {
      const index = state.items.findIndex(item => item.productId === action.payload.productId);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct(state, action) {
      state.items = state.items.filter(item => item.productId !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsBySeller.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsBySeller.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProductsBySeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addProduct, setProducts, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
