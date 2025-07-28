import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/home-decor-logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const Navbar = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user from Redux state
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    if (window.confirm("Logout?")) {
      dispatch(logout());
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/auth/login");
    }
  };

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

        {/* Search form passed as children */}
        {children}

        <ul className="navbar-nav mb-2 mb-lg-0 align-items-center">
          <li className="nav-item">
            {!user && (
              <button
                className="btn btn-link nav-link text-white"
                onClick={() => navigate("/auth/login")}
              >
                Sign In
              </button>
            )}

        
            {user && (
              <div className="nav-link dropdown">
                <button
                  className="btn btn-link dropdown-toggle text-white d-flex align-items-center"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-person-circle fs-4"></i>
                  <span className="ms-2">{user.email || "User"}</span>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => navigate("/auth/profile")}
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li className="nav-item">
            <button
              className="btn btn-link nav-link text-white"
              onClick={() => navigate("/auth/orders")}
            >
              Orders
            </button>
          </li>

          {!user && (
            <li className="nav-item">
              <button
                className="btn btn-link nav-link text-white pe-3"
                onClick={() => navigate("/auth/profile")}
              >
                <i className="bi bi-person-circle fs-4"></i>
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
