import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct } from '../../redux/slices/productSlice';
import 'bootstrap/dist/css/bootstrap.min.css';


const EditProduct = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector(state => state.products.items);
  const productToEdit = products.find(p => p.product_seller_id === Number(id));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      product_name: '',
      price: '',
      category_name: '',
      description: '',
    },
  });

  useEffect(() => {
    if (productToEdit) {
      setValue('product_name', productToEdit.product_name);
      setValue('price', productToEdit.price);
      setValue('category_name', productToEdit.category_name);
      setValue('description', productToEdit.description);
    }
  }, [productToEdit, setValue]);

  const onSubmit = (data) => {
    const updatedProduct = {
      ...productToEdit,
      product_name: data.product_name,
      price: data.price,
      category_name: data.category_name,
      description: data.description,
    };

    dispatch(updateProduct(updatedProduct));
    alert('Product updated successfully!');
    navigate('/seller/seller-products');
  };

  if (!productToEdit) {
    return <p>Product not found</p>;
  }

  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <h2 className="text-center mb-4">Edit Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white border rounded shadow p-4" noValidate>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            {...register('product_name', {
              required: 'Product Name is required',
              minLength: { value: 2, message: 'Minimum 2 characters' },
            })}
            className={`form-control ${errors.product_name ? 'is-invalid' : ''}`}
            placeholder="Product Name"
          />
          {errors.product_name && <div className="invalid-feedback">{errors.product_name.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Price (₹)</label>
          <input
            {...register('price', {
              required: 'Price is required',
              valueAsNumber: true,
              min: { value: 1, message: 'Price must be greater than 0' },
              validate: value => !isNaN(value) || 'Price must be a number',
            })}
            type="number"
            step="0.01"
            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
            placeholder="Price in ₹"
          />
          {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            {...register('category_name', {
              required: 'Category is required',
              minLength: { value: 2, message: 'Minimum 2 characters' },
            })}
            className={`form-control ${errors.category_name ? 'is-invalid' : ''}`}
            placeholder="Category"
          />
          {errors.category_name && <div className="invalid-feedback">{errors.category_name.message}</div>}
        </div>

        <div className="mb-4">
          <label className="form-label">Description</label>
          <textarea
            {...register('description', {
              required: 'Description is required',
              minLength: { value: 5, message: 'Minimum 5 characters' },
            })}
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            rows="4"
            placeholder="Product Description"
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