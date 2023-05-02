import React from "react";
import "./Components.css";

const LoginComponent = (props) => {
  const wrapper = document.querySelector(".form-wrapper");
  const loginLink = document.querySelector(".login-link");
  const registerLink = document.querySelector(".register-link");

  // Event Listeners
  registerLink?.addEventListener("click", () => {
    wrapper.classList.add("active");
  });

  loginLink?.addEventListener("click", () => {
    wrapper.classList.remove("active");
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="form-box login">
        <button
          className="system-button login-with-google-btn"
          onClick={props.loginWithGoogle}
          type="submit"
        >
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
