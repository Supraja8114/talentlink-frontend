import React from 'react';

const ClientDashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Client Dashboard</h1>
      <p>Welcome! Here you will post projects and view proposals.</p>
      <button onClick={() => {
        localStorage.clear();
        window.location.href = '/login';
      }}>Logout</button>
    </div>
  );
};

export default ClientDashboard;