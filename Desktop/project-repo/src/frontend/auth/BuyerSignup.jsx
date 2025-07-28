import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


const BuyerSignup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    console.log('Buyer Signup Data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate('auth/buyer-dashboard');
  };

  return (
    <div className="container-fluid d-flex vh-100 vw-100 justify-content-center align-items-center position-relative">
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: "url('/buyer.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px)',
          zIndex: -1,
        }}
      ></div>

      <div className="p-4 shadow rounded bg-white" style={{ maxWidth: '400px', width: '90%' }}>
        <h4 className="text-center mb-4">Buyer Signup</h4>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <input
            type="text"
            placeholder="First Name"
            className={`form-control mb-2 ${errors.firstName ? 'is-invalid' : ''}`}
            {...register('firstName', {
              required: 'First Name is required',
              pattern: { value: /^[A-Za-z]{2,}$/, message: 'Minimum 2 letters (alphabets only)' },
            })}
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}

          <input
            type="text"
            placeholder="Last Name"
            className={`form-control mb-2 ${errors.lastName ? 'is-invalid' : ''}`}
            {...register('lastName', {
              required: 'Last Name is required',
              pattern: { value: /^[A-Za-z]{2,}$/, message: 'Minimum 2 letters (alphabets only)' },
            })}
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}

          <input
            type="email"
            placeholder="Email"
            className={`form-control mb-2 ${errors.email ? 'is-invalid' : ''}`}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[A-Za-z0-9_.-]{5,10}@gmail\.com$/, message: 'Email format invalid' },
            })}
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}

          <input
            type="password"
            placeholder="Password"
            className={`form-control mb-2 ${errors.password ? 'is-invalid' : ''}`}
            {...register('password', {
              required: 'Password is required',
              pattern: {
                value: /^[A-Za-z0-9*%$_.-]{8,12}$/,
                message: '8-12 chars, letters, numbers & *%$_.- allowed',
              },
            })}
          />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}

          <input
            type="text"
            placeholder="Address"
            className={`form-control mb-2 ${errors.address ? 'is-invalid' : ''}`}
            {...register('address', {
              required: 'Address is required',
              minLength: { value: 5, message: 'Minimum 5 characters' },
            })}
          />
          {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}

          <input
            type="tel"
            placeholder="Phone Number"
            className={`form-control mb-3 ${errors.phone ? 'is-invalid' : ''}`}
            {...register('phone', {
              required: 'Phone is required',
              pattern: { value: /^[0-9]{10}$/, message: 'Must be 10 digits' },
            })}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}

          <button className="btn btn-success w-100 mb-2" disabled={!isValid || isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Register'}
          </button>

          <button type="button" className="btn btn-link w-100" onClick={() => navigate('/auth/login')}>
            ← Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default BuyerSignup;
