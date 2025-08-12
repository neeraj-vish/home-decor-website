import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]); 

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    // Fetch product
    axios.get(`http://localhost:5000/api/Product/${id}`)
      .then(res => {
        setProduct(res.data);
        setValue('productName', res.data.productName);
        setValue('price', res.data.price);
        setValue('categoryId', res.data.categoryId); 
        setValue('description', res.data.description);
      })
      .catch(err => console.error("Error loading product:", err));

    // Fetch categories for dropdown
    axios.get('http://localhost:5000/api/Category')  
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error loading categories:", err));
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:5000/api/Product/${id}`, data);
      toast.success('Product updated successfully!');
      navigate('/seller/dashboard');
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Update failed.");
    }
  };

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <h2 className="text-center mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white border rounded shadow p-4" noValidate>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            {...register('productName', { required: 'Required' })}
            className={`form-control ${errors.productName ? 'is-invalid' : ''}`}
          />
          {errors.productName && <div className="invalid-feedback">{errors.productName.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Price (₹)</label>
          <input
            {...register('price', { required: 'Required', valueAsNumber: true })}
            type="number"
            step="0.01"
            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
          />
          {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            {...register('categoryId', { required: 'Required' })}
            className={`form-control ${errors.categoryId ? 'is-invalid' : ''}`}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
          {errors.categoryId && <div className="invalid-feedback">{errors.categoryId.message}</div>}
        </div>

        <div className="mb-4">
          <label className="form-label">Description</label>
          <textarea
            {...register('description', { required: 'Required' })}
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            rows="4"
          />
          {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={!isValid || isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;