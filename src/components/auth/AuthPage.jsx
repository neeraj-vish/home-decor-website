import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  clearError,
} from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/home-decor-logo.png";

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false); //Toggle state

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    dispatch(loginStart());

    try {
      const response = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Login failed");
      }

      const result = await response.json();

      dispatch(
        loginSuccess({
          user: { email: result.email, role: result.role.roleName },
          token: result.token,
        })
      );

      if (result.role?.roleName === "Buyer") {
        navigate("/");
      } else if (result.role?.roleName === "Seller") {
        navigate("/seller/dashboard");
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  return (
    <div className="container-fluid d-flex vh-100 vw-100 justify-content-center align-items-center position-relative">
      {/* Blurred Background Layer */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: "url('/BG_IMG.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(3px)",
          zIndex: -1,
        }}
      ></div>

      <div
        className="card shadow p-4 bg-white rounded"
        style={{ maxWidth: 400, width: "90%" }}
      >
        <div className="text-center mb-3">
          <img
            src={logo}
            alt="Home Decor Logo"
            style={{ width: 60, height: 60 }}
          />
        </div>
        <h4 className="text-center mb-4">Login to Home Decor</h4>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9_.-]{5,10}@gmail\.com$/,
                  message:
                    "Email is invalid (must be 5-10 chars before @gmail.com)",
                },
              })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          {/* Password with toggle */}
          <div className="mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^[A-Za-z0-9*%$_.-]{8,12}$/,
                  message:
                    "Password must be 8-12 characters with letters, numbers, *%$_.-",
                },
              })}
            />
            {/* Toggle Button */}
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary position-absolute top-50 end-0 translate-middle-y me-2"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>

            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={!isValid || loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        <div className="mt-4 text-center">
          <p>Don't have an account?</p>
          <button
            className="btn btn-outline-primary w-100 mb-2"
            onClick={() => navigate("/auth/signup-buyer")}
          >
            Signup as Buyer
          </button>
          <button
            className="btn btn-outline-secondary w-100"
            onClick={() => navigate("/auth/signup-seller")}
          >
            Signup as Seller
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
