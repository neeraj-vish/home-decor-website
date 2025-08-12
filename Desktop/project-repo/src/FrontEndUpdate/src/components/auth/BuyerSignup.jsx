import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const BuyerSignup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false); 

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange" });

  const checkUniqueField = async (field, value) => {
    try {
      const response = await fetch(
        `http://localhost:8083/api/buyers/check-${field}?${field}=${value}`
      );
      const exists = await response.json();
      return exists;
    } catch (error) {
      console.error(`Validation error for ${field}:`, error);
      return false;
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8083/api/buyers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phone,
          user: {
            email: data.email,
            password: data.password,
          },
        }),
      });

      if (!response.ok) throw new Error("Failed to register");

      const result = await response.json();
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error.message);
      toast.error("Signup failed. Please check your input or try again.");
    }
  };

  return (
    <div className="container-fluid d-flex vh-100 vw-100 justify-content-center align-items-center position-relative">
      {/* Background Image */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: "url('/buyer.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px)",
          zIndex: -1,
        }}
      ></div>

      {/* Form Card */}
      <div
        className="p-4 shadow rounded bg-white"
        style={{ maxWidth: "400px", width: "90%" }}
      >
        <h4 className="text-center mb-4">Buyer Signup</h4>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* First Name */}
          <input
            type="text"
            placeholder="First Name"
            className={`form-control mb-2 ${errors.firstName ? "is-invalid" : ""}`}
            {...register("firstName", {
              required: "First Name is required",
              pattern: {
                value: /^[A-Za-z]{2,}$/,
                message: "Minimum 2 letters (alphabets only)",
              },
            })}
          />
          {errors.firstName && (
            <div className="invalid-feedback">{errors.firstName.message}</div>
          )}

          {/* Last Name */}
          <input
            type="text"
            placeholder="Last Name"
            className={`form-control mb-2 ${errors.lastName ? "is-invalid" : ""}`}
            {...register("lastName", {
              required: "Last Name is required",
              pattern: {
                value: /^[A-Za-z]{2,}$/,
                message: "Minimum 2 letters (alphabets only)",
              },
            })}
          />
          {errors.lastName && (
            <div className="invalid-feedback">{errors.lastName.message}</div>
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className={`form-control mb-2 ${errors.email ? "is-invalid" : ""}`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9_.-]{5,10}@gmail\.com$/,
                message: "Must be 5–10 characters before @gmail.com",
              },
              validate: async (value) =>
                !(await checkUniqueField("email", value)) || "Email already exists",
            })}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}

          {/* Password with Toggle */}
          <div className="input-group mb-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^[A-Za-z0-9*%$_.-]{8,12}$/,
                  message:
                    "Password format: letters, digits, *%$_.- (8–12 characters)",
                },
              })}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <div className="invalid-feedback d-block">
              {errors.password.message}
            </div>
          )}

          {/* Address */}
          <input
            type="text"
            placeholder="Address"
            className={`form-control mb-2 ${errors.address ? "is-invalid" : ""}`}
            {...register("address", {
              required: "Address is required",
              minLength: { value: 5, message: "Minimum 5 characters" },
            })}
          />
          {errors.address && (
            <div className="invalid-feedback">{errors.address.message}</div>
          )}

          {/* Phone */}
          <input
            type="tel"
            placeholder="Phone Number"
            className={`form-control mb-3 ${errors.phone ? "is-invalid" : ""}`}
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Must be 10 digits",
              },
              validate: async (value) =>
                !(await checkUniqueField("phone", value)) ||
                "Phone number already exists",
            })}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone.message}</div>
          )}

          {/* Buttons */}
          <button
            className="btn btn-success w-100 mb-2"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Register"}
          </button>

          <button
            type="button"
            className="btn btn-link w-100"
            onClick={() => navigate("/auth/login")}
          >
            ← Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default BuyerSignup;
