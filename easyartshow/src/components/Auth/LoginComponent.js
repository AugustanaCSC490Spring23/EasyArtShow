import React from "react";
import "./Components.css";
const LoginComponent = (props) => {
  const wrapper = document.querySelector(".form-wrapper");
  const loginLink = document.querySelector(".login-link");
  const registerLink = document.querySelector(".register-link");

  registerLink?.addEventListener("click", () => {
    wrapper.classList.add("active");
  });

  loginLink?.addEventListener("click", () => {
    wrapper.classList.remove("active");
  });

  const handleSubmit = (e) => {
    /**
     * Prevent the default behaviour of the form
     * This prevents the page from reloading
     * 
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
     * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
     * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
     * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
     * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
     * 
     * @param {Event} e
     * @returns {void}
     */
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
