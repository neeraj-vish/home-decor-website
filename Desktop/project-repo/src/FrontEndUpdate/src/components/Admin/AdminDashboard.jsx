import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../LandingPage/Navbar";

const AdminDashboard = () => {
  const { userType } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div
      className="min-vh-100 position-relative"
      style={{
        backgroundImage: "url('/admin.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Navbar stays on top */}
      <div className="position-relative" style={{ zIndex: 2}}>
        <Navbar />
      </div>

      {/* Heading stays on top */}
      <h1
        className="text-center display-6 text-white fw-bold py-3 position-relative"
        // style={{
        //   zIndex: 2,
        //   textShadow: "2px 2px 4px #000000",
        //   backgroundColor: "rgba(0, 0, 0, 0.4)", // semi-transparent background for readability
        // }}
      >
        Admin Dashboard
      </h1>

      {/* Content */}
      <div
        className="d-flex justify-content-center align-items-center min-vh-100 position-relative"
        style={{ zIndex: 1 }}
      >
        <div className="text-center bg-dark bg-opacity-50 p-4 rounded shadow-lg">
          <p className="fs-4 text-white mb-4">Welcome, Admin</p>
          <div className="d-grid gap-3" style={{ maxWidth: "400px", margin: "0 auto" }}>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate("buyers")}
            >
              Manage Buyers
            </button>
            <button
              className="btn btn-info btn-lg"
              onClick={() => navigate("sellers")}
            >
              Manage Sellers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
