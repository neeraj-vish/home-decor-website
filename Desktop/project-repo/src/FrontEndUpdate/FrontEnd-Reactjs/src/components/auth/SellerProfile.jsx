import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SellerProfile = () => {
  const userFromRedux = useSelector((state) => state.auth.user);
  const [sellerData, setSellerData] = useState(null);
  const navigate = useNavigate();

  const currentUser = userFromRedux || JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!currentUser || currentUser.role?.roleName !== "Seller") {
      navigate("/auth/login");
    } else {
      fetchSellerDetails(currentUser.email);
    }
  }, [currentUser, navigate]);

  const fetchSellerDetails = async (email) => {
    try {
      const res = await fetch(`http://localhost:8083/api/sellers/email/${email}`);
      if (res.ok) {
        const data = await res.json();
        setSellerData(data);
      } else {
        console.error("Failed to fetch seller data");
      }
    } catch (error) {
      console.error("Error fetching seller details:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Seller Profile</h2>
      <hr />
      {sellerData ? (
        <div className="card p-3">
          <p>
            <strong>Company Name:</strong> {sellerData.companyName}
          </p>
          <p>
            <strong>Email:</strong> {sellerData.email}
          </p>
          <p>
            <strong>Company Address:</strong> {sellerData.companyAddress}
          </p>
          <p>
            <strong>GST Number:</strong> {sellerData.gstNumber}
          </p>
          <p>
            <strong>License Number:</strong> {sellerData.licenseNumber}
          </p>

          <div className="d-flex gap-3 mt-3">
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/auth/EditSellerProfile")}
            >
              Edit Profile
            </button>

            <button className="btn btn-primary" onClick={() => navigate("/seller/dashboard")}>
              Back to Seller Dashboard
            </button>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default SellerProfile;
