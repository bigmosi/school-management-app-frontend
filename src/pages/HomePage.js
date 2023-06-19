import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to School Management App</h1>
      <p>Manage your school efficiently with our comprehensive school management app.</p>
      <div>
        <h2>Get Started:</h2>
        <ul>
          <li>
            <Link to="/students">View Students</Link>
          </li>
          <li>
            <Link to="/add-student">Add New Student</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
