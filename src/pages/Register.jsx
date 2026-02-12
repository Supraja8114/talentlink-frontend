import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = { username: name, email, password, role };
    console.log("Submitting registration with data:", formData);

    try {
      const response = await api.post("/register/", formData);
      console.log("Registration response:", response);
      console.log("Registration status:", response.status);
      console.log("Registration data:", response.data);
      alert("Register Success");
    } catch (error) {
      console.error("Registration error details:", error);
      console.error("Error response:", error.response);
      console.error("Error status:", error.response?.status);
      console.error("Error data:", error.response?.data);
      
      alert("Register Failed: " + (error.response?.data || "Unknown error"));
    }
  };


  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        >
          <option value="client">Client</option>
          <option value="freelancer">Freelancer</option>
        </select>

        <button style={{ width: "100%", padding: "10px" }}>Register</button>
      </form>

      <p style={{ marginTop: "10px" }}>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}
