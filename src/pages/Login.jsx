import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // 1. Import useNavigate
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 2. Initialize the hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // NOTE: Check with Harsh! Does his Django backend expect "email" or "username"?
      // If he uses default Django Auth, you might need to change 'email' to 'username' here.
      const res = await api.post("/login/", { email, password });

      // 3. Save Tokens (Correct as you had it)
      localStorage.setItem("accessToken", res.data.access);
      localStorage.setItem("refreshToken", res.data.refresh);
      
      // 4. Save Role (Crucial for TalentLink)
      // Ask Harsh to return the 'role' in the login response json.
      const userRole = res.data.role; 
      localStorage.setItem("role", userRole); 

      alert("Login Success");

      // 5. Redirect based on Role
      if (userRole === 'client') {
        navigate('/client-dashboard');
      } else if (userRole === 'freelancer') {
        navigate('/freelancer-dashboard');
      } else {
        navigate('/dashboard'); // Fallback default
      }

    } catch (error) {
      console.error("Login Error:", error);
      alert("Login Failed: " + (error.response?.data?.detail || "Invalid credentials"));
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
            <label>Email</label>
            <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            />
        </div>

        <div style={{ marginBottom: "15px" }}>
            <label>Password</label>
            <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            />
        </div>

        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }}>
            Login
        </button>
      </form>

      <p style={{ marginTop: "15px", textAlign: "center" }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}