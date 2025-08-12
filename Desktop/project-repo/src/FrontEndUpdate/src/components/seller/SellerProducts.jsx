import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SellerProducts = ({ embedded = false }) => {
  const user =
    useSelector((state) => state.auth.user) ||
    JSON.parse(localStorage.getItem("user"));
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const sellerRes = await axios.get(
          `http://localhost:5000/api/Seller/getsellerid?email=${user.email}`
        );
        const sellerId = sellerRes.data.sellerId;

        const res = await axios.get(
          `http://localhost:5000/api/Product/byseller/${sellerId}`
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    if (user?.email) fetchProducts();
  }, [user]);

  return (
    <div className={embedded ? "" : "container mt-4"}>
      {!embedded && (
        <h3 className="fw-bold mb-3">
          <i className="bi bi-box-seam me-2"></i>My Products
        </h3>
      )}

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-3" key={product.productId}>
              <div className="card h-100">
                {product.imageUrl && (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      height: 200,
                      backgroundColor: "rgb(248, 249, 250)",
                    }}
                  >
                    <img
                      src={product.imageUrl}
                      className="card-img-top"
                      alt={product.productName}
                      style={{
                        height: "200px",
                        width: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.productName}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="text-success fw-bold">₹{product.price}</p>
                  <Link
                    to={`/seller/edit-product/${product.productId}`}
                    className="btn btn-outline-primary mt-auto"
                  >
                    Edit Product
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerProducts;
