import React from "react";
import "./Login.css";
function LoginForm() {
  return (
    <div className="form-container">
      <h1>login User</h1>
      <form className="form">
        <input type="email" placeholder="Enter Your email" />
        <input type="password" placeholder="Enter Your Password" />
        <button type="submit" id="login-btn">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
