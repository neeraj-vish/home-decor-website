import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BuyerProfile = () => {
  const userFromRedux = useSelector((state) => state.auth.user);
  const [buyerData, setBuyerData] = useState(null);
  const navigate = useNavigate();

  const currentUser = userFromRedux || JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!currentUser || currentUser.role?.roleName !== "Buyer") {
      navigate("/auth/login");
    } else {
      fetchBuyerDetails(currentUser.email);
    }
  }, [currentUser, navigate]);

  const fetchBuyerDetails = async (email) => {
    try {
      const res = await fetch(
        `http://localhost:8083/api/buyers/email/${email}`
      );
      if (res.ok) {
        const data = await res.json();
        setBuyerData(data);
      } else {
        console.error("Failed to fetch buyer data");
      }
    } catch (error) {
      console.error("Error fetching buyer details:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Buyer Profile</h2>
      <hr />
      {buyerData ? (
        <div className="card p-3">
          <p>
            <strong>First Name:</strong> {buyerData.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {buyerData.lastName}
          </p>
          <p>
            <strong>Email:</strong> {buyerData.email}
          </p>
          <p>
            <strong>Address:</strong> {buyerData.address}
          </p>
          <p>
            <strong>Phone Number:</strong> {buyerData.phoneNumber}
          </p>

          <div className="d-flex gap-3 mt-3">
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/auth/EditBuyerProfile")}
            >
              Edit Profile
            </button>

            <button className="btn btn-primary" onClick={() => navigate("/")}>
              Back to Home
            </button>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default BuyerProfile;