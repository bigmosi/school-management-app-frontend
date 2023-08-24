import React from "react";

function SignupForm() {
  return (
    <div className="signup">
      <div className="form-container">
        <h1>Register User</h1>
        <form className="form">
          <input type="text" placeholder="Enter Username" />
          <input type="email" placeholder="Enter Your email" />
          <input type="password" placeholder="Enter Your Password" />
          <input type="password" placeholder="Confirm Your Password" />
          <button type="submit" id="sign-btn">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
