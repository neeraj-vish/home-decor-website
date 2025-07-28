import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/slices/productSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = [
    { category_id: 1, category_name: 'Lighting' },
    { category_id: 2, category_name: 'decotires' },
    { category_id: 3, category_name: 'furniture' },
    { category_id: 4, category_name: 'textile' },
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

  const onSubmit = (data) => {
    const productToSave = {
      ...data,
      seller_id: 1,
      // generate a product_seller_id for demo; in real app backend will assign
      product_seller_id: Date.now(),
    };
    dispatch(addProduct(productToSave));
    alert('Product added successfully!');
    navigate('/seller/seller-products');
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 600 }}>
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
            rows={4}
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            {...register('description', {
              required: 'Description is required',
              minLength: { value: 5, message: 'Minimum 5 characters' },
            })}
          ></textarea>
          {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
        </div>

        <button className="btn btn-success w-100" type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
