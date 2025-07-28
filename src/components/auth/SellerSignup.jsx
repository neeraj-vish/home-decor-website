import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Uniqueness check helper
const checkUniqueField = async (fieldName, value) => {
  const response = await fetch(
    `http://localhost:8081/api/sellers/exists?${fieldName}=${encodeURIComponent(
      value
    )}`
  );
  const result = await response.json();
  return result.exists;
};

const SellerSignup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);//Toggle state

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    const payload = {
      gstNumber: data.gstNo,
      licenseNumber: data.licenseNo,
      companyName: data.companyName,
      companyAddress: data.companyAddress,
      user: {
        email: data.email,
        password: data.password,
      },
    };

    try {
      const response = await fetch("http://localhost:8081/api/sellers/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMsg = response.statusText;
        const contentLength = response.headers.get("content-length");
        if (contentLength && parseInt(contentLength) > 0) {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        }
        throw new Error(errorMsg);
      }

      const savedSeller = await response.json();
      console.log("Seller created:", savedSeller);
      navigate("/auth/login");
    } catch (error) {
      console.error("Failed to save seller:", error);
      alert("Failed to register seller: " + error.message);
    }
  };

  return (
    <div className="container-fluid d-flex vh-100 vw-100 justify-content-center align-items-center position-relative">
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: "url('/sellerCopy.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px)",
          zIndex: -1,
        }}
      />
      <div
        className="p-4 shadow rounded bg-white"
        style={{ maxWidth: "400px", width: "90%" }}
      >
        <h4 className="text-center mb-4">Seller Registration</h4>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email with uniqueness validation */}
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
                !(await checkUniqueField("email", value)) ||
                "Email already exists",
            })}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}

          {/* Password */}
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

          {/* Company Name */}
          <input
            type="text"
            placeholder="Company Name"
            className={`form-control mb-2 ${
              errors.companyName ? "is-invalid" : ""
            }`}
            {...register("companyName", {
              required: "Company Name is required",
              minLength: { value: 2, message: "Minimum 2 characters" },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Only alphabets & spaces allowed",
              },
            })}
          />
          {errors.companyName && (
            <div className="invalid-feedback">{errors.companyName.message}</div>
          )}

          {/* Company Address */}
          <input
            type="text"
            placeholder="Company Address"
            className={`form-control mb-2 ${
              errors.companyAddress ? "is-invalid" : ""
            }`}
            {...register("companyAddress", {
              required: "Company Address is required",
              minLength: { value: 5, message: "Minimum 5 characters" },
            })}
          />
          {errors.companyAddress && (
            <div className="invalid-feedback">
              {errors.companyAddress.message}
            </div>
          )}

          {/* GST Number with uniqueness validation */}
          <input
            type="text"
            placeholder="GST Number"
            className={`form-control mb-2 ${errors.gstNo ? "is-invalid" : ""}`}
            {...register("gstNo", {
              required: "GST Number is required",
              pattern: {
                value:
                  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                message: "Example: 27AAPFU0939F1ZV",
              },
              validate: async (value) =>
                !(await checkUniqueField("gstNumber", value)) ||
                "GST Number already exists",
            })}
          />
          {errors.gstNo && (
            <div className="invalid-feedback">{errors.gstNo.message}</div>
          )}

          {/* License Number with uniqueness validation */}
          <input
            type="text"
            placeholder="License Number"
            className={`form-control mb-3 ${
              errors.licenseNo ? "is-invalid" : ""
            }`}
            {...register("licenseNo", {
              required: "License Number is required",
              minLength: { value: 5, message: "Minimum 5 characters" },
              pattern: {
                value: /^[A-Za-z0-9]{5,15}$/,
                message: "Invalid License number",
              },
              validate: async (value) =>
                !(await checkUniqueField("licenseNumber", value)) ||
                "License Number already exists",
            })}
          />
          {errors.licenseNo && (
            <div className="invalid-feedback">{errors.licenseNo.message}</div>
          )}

          <button
            type="submit"
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

export default SellerSignup;
