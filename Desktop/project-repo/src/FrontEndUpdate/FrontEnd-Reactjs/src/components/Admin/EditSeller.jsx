import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Helper for checking uniqueness
const checkUniqueField = async (fieldName, value, currentValue) => {
  if (value === currentValue) return false; // not a duplicate if unchanged
  const res = await fetch(
    `http://localhost:8083/api/sellers/exists?${fieldName}=${encodeURIComponent(value)}`
  );
  const result = await res.json();
  return result.exists;
};

const EditSeller = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const res = await axios.get(`http://localhost:8083/api/sellers/${id}`);
        const seller = res.data;

        setInitialData(seller); 

        // Prefill form
        setValue("companyName", seller.companyName);
        setValue("companyAddress", seller.companyAddress);
        setValue("gstNumber", seller.gstNumber);
        setValue("licenseNumber", seller.licenseNumber);
        setValue("email", seller.user?.email || "");
      } catch (error) {
        console.error("Failed to fetch seller:", error);
        toast.warn("Could not load seller details.");
      }
    };

    fetchSeller();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        companyName: data.companyName,
        companyAddress: data.companyAddress,
        gstNumber: data.gstNumber,
        licenseNumber: data.licenseNumber,
      };

      await axios.put(`http://localhost:8083/api/sellers/update/${id}`, payload);
      toast.success("Seller updated successfully!");
      navigate("/admin/sellers");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update seller");
    }
  };

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
        Edit Seller Details
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
            {/* Company Name */}
            <div className="mb-3">
              <label className="form-label">Company Name*</label>
              <input
                type="text"
                className={`form-control ${errors.companyName ? "is-invalid" : ""}`}
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

            {/* Company Address */}
            <div className="mb-3">
              <label className="form-label">Company Address*</label>
              <textarea
                className={`form-control ${errors.companyAddress ? "is-invalid" : ""}`}
                {...register("companyAddress", {
                  required: "Company Address is required",
                  minLength: { value: 5, message: "Minimum 5 characters" },
                })}
                rows="3"
              />
              {errors.companyAddress && (
                <div className="invalid-feedback">{errors.companyAddress.message}</div>
              )}
            </div>

            <div className="row">
              {/* GST Number */}
              <div className="col-md-6 mb-3">
                <label className="form-label">GST Number*</label>
                <input
                  type="text"
                  className={`form-control ${errors.gstNumber ? "is-invalid" : ""}`}
                  {...register("gstNumber", {
                    required: "GST Number is required",
                    pattern: {
                      value:
                        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                      message: "Example: 27AAPFU0939F1ZV",
                    },
                    validate: async (value) =>
                      !(await checkUniqueField("gstNumber", value, initialData?.gstNumber)) ||
                      "GST Number already exists",
                  })}
                />
                {errors.gstNumber && (
                  <div className="invalid-feedback">{errors.gstNumber.message}</div>
                )}
              </div>

              {/* License Number */}
              <div className="col-md-6 mb-3">
                <label className="form-label">License Number*</label>
                <input
                  type="text"
                  className={`form-control ${errors.licenseNumber ? "is-invalid" : ""}`}
                  {...register("licenseNumber", {
                    required: "License Number is required",
                    minLength: { value: 5, message: "Minimum 5 characters" },
                    pattern: {
                      value: /^[A-Za-z0-9]{5,15}$/,
                      message: "Invalid License number",
                    },
                    validate: async (value) =>
                      !(await checkUniqueField("licenseNumber", value, initialData?.licenseNumber)) ||
                      "License Number already exists",
                  })}
                />
                {errors.licenseNumber && (
                  <div className="invalid-feedback">{errors.licenseNumber.message}</div>
                )}
              </div>
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
              <button
                type="button"
                className="btn btn-secondary me-md-2"
                onClick={() => navigate("/admin/sellers")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSeller;
