import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <Link to="/" style={linkStyle}>Home</Link>
        </li>
        <li style={liStyle}>
          <Link to="/add-student" style={linkStyle}>Add New Student</Link>
        </li>
        <li style={liStyle}>
          <Link to="/students" style={linkStyle}>Students</Link>
        </li>
        <li style={liStyle}>
          <Link to="/teachers" style={linkStyle}>Teachers</Link>
        </li>
        <li style={liStyle}>
          <Link to="/courses" style={linkStyle}>Courses</Link>
        </li>
        <li style={liStyle}>
          <Link to="/attendance" style={linkStyle}>Attendance</Link>
        </li>
      </ul>
    </nav>
  );
};

// Define the CSS styles
const navStyle = {
  backgroundColor: "blue",
  padding: "10px",
};

const ulStyle = {
  listStyleType: "none",
  display: "flex",
  justifyContent: "space-between",
};

const liStyle = {
  margin: "0 10px",
};

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

export default Navigation;
