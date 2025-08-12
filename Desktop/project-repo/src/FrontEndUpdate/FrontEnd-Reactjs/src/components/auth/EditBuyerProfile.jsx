import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from 'react-toastify';

const EditBuyerProfile = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const user = useSelector((state) => state.auth.user);
  const [buyerId, setBuyerId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!user?.email) {
    toast.warn("User email not found. Please log in again.");
    setLoading(false);
    return;
  }

  // Fetch buyer details using email
  axios
    .get(`http://localhost:8083/api/buyers/email/${user.email}`)
    .then((res) => {
      const buyer = res.data;
      setBuyerId(buyer.buyerId);
      setValue("firstName", buyer.firstName);
      setValue("lastName", buyer.lastName);
      setValue("phoneNumber", buyer.phoneNumber);
      setValue("address", buyer.address);

      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching buyer data by email:", error);
      toast.error("Failed to fetch profile.");
      setLoading(false);
    });
}, [user?.email, setValue]);


  const onSubmit = async (data) => {
    if (!buyerId) {
      toast.error("Buyer ID not available for update.");
      return;
    }

    try {
      await axios.put(`http://localhost:8083/api/buyers/update/${buyerId}`, data);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update profile.");
    }
  };

  if (loading) return <p className="text-center mt-4">Loading profile...</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Buyer Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 shadow rounded bg-light">
        <div className="mb-3">
          <label>First Name</label>
          <input
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            {...register("firstName", {
              required: "First name is required",
              minLength: { value: 2, message: "At least 2 characters" },
            })}
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
        </div>

        <div className="mb-3">
          <label>Last Name</label>
          <input
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            {...register("lastName", {
              required: "Last name is required",
              minLength: { value: 2, message: "At least 2 characters" },
            })}
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
        </div>

        <div className="mb-3">
          <label>Phone Number</label>
          <input
            className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone must be 10 digits",
              },
            })}
          />
          {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber.message}</div>}
        </div>

        <div className="mb-3">
          <label>Address</label>
          <input
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            {...register("address", {
              required: "Address is required",
              minLength: { value: 5, message: "Minimum 5 characters" },
            })}
          />
          {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBuyerProfile;
