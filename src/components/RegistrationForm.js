import React, { useState } from "react";
import axios from "axios";
import configuration from "../config";
import "./RegistrationForm.css"; // Import the CSS file for styling

const RegistrationForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${configuration.base_url}api/register/admin`, {
        username: userName,
        email,
        password,
        role,
      });
      setSuccessMessage("Administrator registered successfully");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      setEmail("");
      setUserName("");
      setPassword("");
      setRole("");
    } catch (error) {
      console.error("Failed to register Admin");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      {successMessage && <p className="success-message">{successMessage}</p>}
      <label htmlFor="name">User Name:</label>
      <input
        type="text"
        name="name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Please enter user name..."
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Please enter your email address"
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Please enter a valid password"
      />
      <select
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      >
        <option value="admin">Admin</option>
        <option value="teacher">Teacher</option>
        <option value="staff">Staff</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
