import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from 'react-toastify';


const EditSellerProfile = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const user = useSelector((state) => state.auth.user);
  const [sellerId, setSellerId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      toast.warn("User email not found. Please log in again.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8083/api/sellers/email/${user.email}`)
      .then((res) => {
        const seller = res.data;
        setSellerId(seller.sellerId);
        setValue("companyName", seller.companyName);
        setValue("companyAddress", seller.companyAddress);
        setValue("gstNumber", seller.gstNumber);
        setValue("licenseNumber", seller.licenseNumber);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching seller data:", error);
        toast.error("Failed to fetch profile.");
        setLoading(false);
      });
  }, [user?.email, setValue]);

  const onSubmit = async (data) => {
    if (!sellerId) {
      toast.error("Seller ID not available for update.");
      return;
    }

    try {
      await axios.put(`http://localhost:8083/api/sellers/update/${sellerId}`, data);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update profile.");
    }
  };

  if (loading) return <p className="text-center mt-4">Loading profile...</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Seller Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 shadow rounded bg-light">
        <div className="mb-3">
          <label>Company Name</label>
          <input
            className={`form-control ${errors.companyName ? "is-invalid" : ""}`}
            {...register("companyName", { required: "Company name is required" })}
          />
          {errors.companyName && <div className="invalid-feedback">{errors.companyName.message}</div>}
        </div>

        <div className="mb-3">
          <label>Company Address</label>
          <input
            className={`form-control ${errors.companyAddress ? "is-invalid" : ""}`}
            {...register("companyAddress", { required: "Company address is required" })}
          />
          {errors.companyAddress && <div className="invalid-feedback">{errors.companyAddress.message}</div>}
        </div>

        <div className="mb-3">
          <label>GST Number</label>
          <input
            className={`form-control ${errors.gstNumber ? "is-invalid" : ""}`}
            {...register("gstNumber", {
              required: "GST number is required",
              pattern: {
                value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                message: "Invalid GST format (e.g., 27AAPFU0939F1ZV)"
              }
            })}
          />
          {errors.gstNumber && <div className="invalid-feedback">{errors.gstNumber.message}</div>}
        </div>

        <div className="mb-3">
          <label>License Number</label>
          <input
            className={`form-control ${errors.licenseNumber ? "is-invalid" : ""}`}
            {...register("licenseNumber", {
              required: "License number is required",
              pattern: {
                value: /^[A-Za-z0-9]{5,15}$/,
                message: "Invalid license format"
              }
            })}
          />
          {errors.licenseNumber && <div className="invalid-feedback">{errors.licenseNumber.message}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100">Save Changes</button>
      </form>
    </div>
  );
};

export default EditSellerProfile;
