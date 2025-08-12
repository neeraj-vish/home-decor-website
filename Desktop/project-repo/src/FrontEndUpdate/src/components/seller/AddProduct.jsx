import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [sellerId, setSellerId] = useState(null);

  const categories = [
    { category_id: 1, category_name: 'Textiles' },
    { category_id: 2, category_name: 'Furniture' },
    { category_id: 3, category_name: 'Lighting' },
    { category_id: 4, category_name: 'WallArt' },
    
    
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      product_name: '',
      category_id: '',
      price: '',
      description: '',
    },
  });

  // Fetch sellerId using email from localStorage
  useEffect(() => {
    const fetchSellerId = async () => {
      const email = localStorage.getItem("email");
      if (!email) {
        toast.warn("Login required.");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/seller/getsellerid?email=${email}`);
        setSellerId(res.data.sellerId);
      } catch (error) {
        console.error("Error fetching sellerId:", error);
        toast.warn("Seller not found. Please login again.");
      }
    };

    fetchSellerId();
  }, []);

  // Form submit handler
  const onSubmit = async (data) => {
    if (!file) {
      toast.warn('Please upload an image.');
      return;
    }

    if (!sellerId) {
      toast.warn('Seller ID not available yet.');
      return;
    }

    const formData = new FormData();
    formData.append('productName', data.product_name);
    formData.append('categoryId', data.category_id);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('sellerId', sellerId);
    formData.append('image', file);

    try {
      await axios.post('http://localhost:5000/api/product/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Product added successfully!');
      navigate('/seller/dashboard');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while uploading.');
    }
  };

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: 600 }}>

      <h2 className="text-center mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white border rounded shadow p-4" noValidate>
        
        {/* Product Name */}
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            placeholder="e.g. Wooden Chair"
            className={`form-control ${errors.product_name ? 'is-invalid' : ''}`}
            {...register('product_name', {
              required: 'Product Name is required',
              minLength: { value: 2, message: 'Minimum 2 characters' },
            })}
          />
          {errors.product_name && <div className="invalid-feedback">{errors.product_name.message}</div>}
        </div>

        {/* Category */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className={`form-select ${errors.category_id ? 'is-invalid' : ''}`}
            {...register('category_id', { required: 'Category is required' })}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.category_name}
              </option>
            ))}
          </select>
          {errors.category_id && <div className="invalid-feedback">{errors.category_id.message}</div>}
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="form-label">Price (₹)</label>
          <input
            type="number"
            step="0.01"
            placeholder="Enter price"
            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
            {...register('price', {
              required: 'Price is required',
              valueAsNumber: true,
              min: { value: 0.01, message: 'Price must be greater than 0' },
            })}
          />
          {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            placeholder="Short product description"
            rows={3}
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            {...register('description', {
              required: 'Description is required',
              minLength: { value: 5, message: 'Minimum 5 characters' },
            })}
          ></textarea>
          {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button className="btn btn-success w-100" type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
