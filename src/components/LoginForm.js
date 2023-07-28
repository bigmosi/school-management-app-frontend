import React, { useState } from "react";
import {Link, Navigate} from "react-router-dom";
import axios from "axios";
import configuration from "../config";
import { checkAuthentication } from "./auth";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(checkAuthentication());
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8080/api/login/admin', {
          username,
          password,
        });
        // Assuming the server returns a token upon successful login
        const token = response.data.token;
        // Save the token to localStorage or sessionStorage for future requests
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Login error:', error);
      }
    };
  
    if (isAuthenticated) {
      // If the user is already authenticated, redirect to the dashboard
      return <Navigate to="/" />;
    }
  
    return (
        <form onSubmit={handleLogin}>
            <label htmlFor="username">username:</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name..."
             />
             <label htmlFor="password">Password:</label>
             <input 
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
               />
               <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;
