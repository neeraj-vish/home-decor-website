import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

const EditBuyer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    if (!id) {
      toast.warn("No buyer ID provided.");
      navigate("/admin/buyers");
      return;
    }

    axios
      .get(`http://localhost:8083/api/buyers/${id}`)
      .then((res) => {
        const buyer = res.data;
        setValue("firstName", buyer.firstName);
        setValue("lastName", buyer.lastName);
        setValue("phoneNumber", buyer.phoneNumber);
        setValue("address", buyer.address);
         setValue("email", buyer.user?.email || "");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch buyer:", err);
        toast.warn("Could not load buyer data.");
        navigate("/admin/buyers");
      });
  }, [id, navigate, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:8083/api/buyers/update/${id}`, data);
      toast.success("Buyer updated successfully.");
      navigate("/admin/buyers");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update buyer.");
    }
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div
      className="min-vh-100"
      style={{
        backgroundImage: "url('/selleredit1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <h1
        className="text-center display-6 text-white fw-bold py-3"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          textShadow: "2px 2px 4px #000000",
        }}
      >
        Edit Buyer Details
      </h1>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="p-4"
          style={{
            maxWidth: "500px",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            borderRadius: "10px",
            color: "white",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* First Name */}
            <div className="mb-3">
              <label className="form-label">First Name*</label>
              <input
                type="text"
                className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                {...register("firstName", {
                  required: "First name is required",
                  minLength: { value: 2, message: "At least 2 letters" },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Only alphabets allowed",
                  },
                })}
              />
              {errors.firstName && (
                <div className="invalid-feedback">{errors.firstName.message}</div>
              )}
            </div>

            {/* Last Name */}
            <div className="mb-3">
              <label className="form-label">Last Name*</label>
              <input
                type="text"
                className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: { value: 2, message: "At least 2 letters" },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Only alphabets allowed",
                  },
                })}
              />
              {errors.lastName && (
                <div className="invalid-feedback">{errors.lastName.message}</div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email*</label>
              <input
                type="email"
                placeholder="Email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Za-z0-9_.-]{5,10}@gmail\.com$/,
                    message: "Email must be 5–10 characters before @gmail.com",
                  },
                })}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            {/* Phone Number */}
            <div className="mb-3">
              <label className="form-label">Phone Number*</label>
              <input
                type="text"
                className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
                {...register("phoneNumber", {
                  required: "Phone is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Must be 10 digits",
                  },
                })}
              />
              {errors.phoneNumber && (
                <div className="invalid-feedback">{errors.phoneNumber.message}</div>
              )}
            </div>

            {/* Address */}
            <div className="mb-3">
              <label className="form-label">Address*</label>
              <textarea
                rows={3}
                className={`form-control ${errors.address ? "is-invalid" : ""}`}
                {...register("address", {
                  required: "Address is required",
                  minLength: { value: 5, message: "Minimum 5 characters" },
                })}
              />
              {errors.address && (
                <div className="invalid-feedback">{errors.address.message}</div>
              )}
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
              <button
                type="button"
                className="btn btn-secondary me-md-2"
                onClick={() => navigate("/admin/buyers")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Buyer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBuyer;
