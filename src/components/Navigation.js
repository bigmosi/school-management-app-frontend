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
          <Link to="/students" style={linkStyle}>Students</Link>
        </li>
        <li style={liStyle}>
          <Link to="/teachers" style={linkStyle}>Teachers</Link>
        </li>
        <li style={liStyle}>
          <Link to="/courses" style={linkStyle}>Courses</Link>
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
  justifyContent: "space-around",
};

const liStyle = {
  margin: "0 10px",
};

const linkStyle = {
  textDecoration: "none",
  color: "white",
  fontSize: "18px",
  fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
};

export default Navigation;
