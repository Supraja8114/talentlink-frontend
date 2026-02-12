import React from 'react';
import {useNavigate } from "react-router-dom";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
localStorage.removeItem("accessToken");
localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    navigate("/login");
  };
  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, Client</h1>
      <button onClick={handleLogout}
      style={{
        marginTop: "20px",
        padding: "10px 20px",
        cursor: "pointer",
      }}
      >
        Logout
        </button>
    </div>
  );
};

export default ClientDashboard;