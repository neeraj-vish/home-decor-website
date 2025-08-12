import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  // Additional state for admin functionality
  userType: localStorage.getItem("userType") || null, // 'admin', 'buyer', or 'seller'
  buyerDetails: JSON.parse(localStorage.getItem("buyerDetails")) || null,
  sellerDetails: JSON.parse(localStorage.getItem("sellerDetails")) || null,
  sellerProducts: JSON.parse(localStorage.getItem("sellerProducts")) || [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userType = action.payload.user.role;
      state.loading = false;
      state.error = null;
      
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userType", action.payload.user.role);
      
      // Initialize additional data based on user type
      if (action.payload.user.role === 'buyer') {
        state.buyerDetails = action.payload.buyerDetails || null;
        localStorage.setItem("buyerDetails", JSON.stringify(action.payload.buyerDetails));
      } else if (action.payload.user.role === 'seller') {
        state.sellerDetails = action.payload.sellerDetails || null;
        state.sellerProducts = action.payload.sellerProducts || [];
        localStorage.setItem("sellerDetails", JSON.stringify(action.payload.sellerDetails));
        localStorage.setItem("sellerProducts", JSON.stringify(action.payload.sellerProducts));
      }
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userType = null;
      state.buyerDetails = null;
      state.sellerDetails = null;
      state.sellerProducts = [];
      state.error = null;
      state.loading = false;
      
      // Clear all auth-related localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      localStorage.removeItem("buyerDetails");
      localStorage.removeItem("sellerDetails");
      localStorage.removeItem("sellerProducts");
    },
    clearError: (state) => {
      state.error = null;
    },
    // Enhanced buyer details update
    updateBuyerDetails: (state, action) => {
      if (state.userType === 'buyer' || state.userType === 'admin') {
        state.buyerDetails = { ...state.buyerDetails, ...action.payload };
        localStorage.setItem("buyerDetails", JSON.stringify(state.buyerDetails));
        
        // Also update the user object if these fields exist there
        if (state.user) {
          state.user = { 
            ...state.user, 
            firstName: action.payload.first_name || state.user.firstName,
            lastName: action.payload.last_name || state.user.lastName
          };
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      }
    },
    // Enhanced seller details update
    updateSellerDetails: (state, action) => {
      if (state.userType === 'seller' || state.userType === 'admin') {
        state.sellerDetails = { ...state.sellerDetails, ...action.payload };
        localStorage.setItem("sellerDetails", JSON.stringify(state.sellerDetails));
        
        // Also update the user object if these fields exist there
        if (state.user) {
          state.user = { 
            ...state.user, 
            companyName: action.payload.company_name || state.user.companyName,
            email: action.payload.email || state.user.email
          };
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      }
    },
    // New reducer for updating seller products
    updateSellerProducts: (state, action) => {
      if (state.userType === 'seller' || state.userType === 'admin') {
        state.sellerProducts = action.payload;
        localStorage.setItem("sellerProducts", JSON.stringify(action.payload));
      }
    },
    // New reducer for admin to switch between user types
    setAdminViewType: (state, action) => {
      if (state.userType === 'admin') {
        state.userType = action.payload; // 'buyer' or 'seller'
        localStorage.setItem("userType", action.payload);
        
        
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  updateBuyerDetails,
  updateSellerDetails,
  updateSellerProducts,
  setAdminViewType,
} = authSlice.actions;

export default authSlice.reducer;
