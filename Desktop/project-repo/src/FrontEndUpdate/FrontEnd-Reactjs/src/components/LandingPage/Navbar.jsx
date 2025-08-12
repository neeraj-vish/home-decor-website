import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/home-decor-logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const Navbar = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user =
    useSelector((state) => state.auth.user) ||
    JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    if (window.confirm("Logout?")) {
      dispatch(logout());
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/auth/login");
    }
  };

  const role = user?.role?.roleName;
  const isSeller = role === "Seller";
  const isAdmin = role === "Admin";

  const displayName =
    (isSeller && user?.companyName) ||
    (!isSeller && user?.firstName) ||
    user?.email ||
    "User";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img
            src={logo}
            alt="Logo"
            style={{ width: 48, height: 48, marginRight: 12 }}
          />
          <span className="fw-bold fs-4">Home Decor</span>
        </a>

        <div className="flex-grow-1 d-flex justify-content-center">
          {children}
        </div>

        <ul className="navbar-nav mb-2 mb-lg-0 align-items-center">
          <li className="nav-item">
            {!user ? (
              <button
                className="btn btn-link nav-link text-white me-2"
                onClick={() => navigate("/auth/login")}
              >
                Sign In
              </button>
            ) : (
              <div className="nav-link dropdown me-3">
                <button
                  className="btn btn-link dropdown-toggle text-white d-flex align-items-center"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-person-circle fs-4"></i>
                  <span className="ms-2">{displayName}</span>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  {!isAdmin && (
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          navigate(
                            isSeller
                              ? "/auth/SellerProfile"
                              : "/auth/BuyerProfile"
                          )
                        }
                      >
                        Profile
                      </button>
                    </li>
                  )}
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </li>

          {/* Show this only if user exists and is not admin */}
          {user && !isAdmin && (
            <li className="nav-item me-3">
              <button
                className="btn btn-link nav-link text-white"
                onClick={() => {
                  if (isSeller) {
                    navigate("/seller/add-product");
                  } else {
                    navigate("/auth/orders");
                  }
                }}
              >
                {isSeller ? "Add Product" : "Orders"}
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
