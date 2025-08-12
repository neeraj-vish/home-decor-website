import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const SellerTable = () => {
  const [sellers, setSellers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = () => {
    axios
      .get("http://localhost:8083/api/sellers/getAllSellers")
      .then((response) => {
        setSellers(response.data);
      })
      .catch((error) => console.error("Error fetching sellers:", error));
  };

 const handleEdit = (id) => {
    navigate(`/admin/edit-seller/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this seller?')) {
      try {
        await axios.delete(`http://localhost:8083/api/sellers/${id}`);
        setSellers((prevSellers) => prevSellers.filter((s) => s.sellerId !== id));
      } catch (error) {
        console.error('Failed to delete seller', error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Seller List</h2>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Address</th>
            <th>GST Number</th>
            <th>License Number</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sellers.length > 0 ? (
            sellers.map((seller) => (
              <tr key={seller.sellerId}>
                <td>{seller.sellerId}</td>
                <td>{seller.companyName}</td>
                <td>{seller.companyAddress}</td>
                <td>{seller.gstNumber}</td>
                <td>{seller.licenseNumber}</td>
                <td>{seller.user?.email}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(seller.sellerId)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(seller.sellerId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No Sellers Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SellerTable;
