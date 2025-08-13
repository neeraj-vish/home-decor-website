import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BuyerList = () => {
  const [buyers, setBuyers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBuyers();
  }, []);

  const fetchBuyers = () => {
    axios
      .get('http://localhost:8083/api/buyers/getAll')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setBuyers(response.data);
        } else {
          console.error('Unexpected response:', response.data);
          setBuyers([]);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch buyers', error);
        setBuyers([]);
      });
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-buyer/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this buyer?')) {
      try {
        await axios.delete(`http://localhost:8083/api/buyers/${id}`);
        setBuyers((prevBuyers) => prevBuyers.filter((b) => b.buyerId !== id));
      } catch (error) {
        console.error('Failed to delete buyer', error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Buyer List</h2>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {buyers.length > 0 ? (
            buyers.map((buyer) => (
              <tr key={buyer.buyerId}>
                <td>{buyer.buyerId}</td>
                <td>{buyer.firstName}</td>
                <td>{buyer.lastName}</td>
                <td>{buyer.email}</td>
                <td>{buyer.phoneNumber}</td>
                <td>{buyer.address}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(buyer.buyerId)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(buyer.buyerId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No Buyers Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BuyerList;
