import React from 'react';

const FreelancerDashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Freelancer Dashboard</h1>
      <p>Welcome! Here you will find work and manage contracts.</p>
      <button onClick={() => {
        localStorage.clear();
        window.location.href = '/login';
      }}>Logout</button>
    </div>
  );
};

export default FreelancerDashboard;