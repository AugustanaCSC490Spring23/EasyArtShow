import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Components.css";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";

const LoginComponent = (props) => {
  var email = "";
  var password = "";
  var name = "";
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const auth = getAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // const onChangeName = (e) => {
  //   name = e.target.value;
  // };

  // const onChangeEmail = (e) => {
  //   email = e.target.value;
  // };

  // const onChangePassword = (e) => {
  //   password = e.target.value;
  // };
  const wrapper = document.querySelector(".form-wrapper");
  const loginLink = document.querySelector(".login-link");
  const registerLink = document.querySelector(".register-link");

  registerLink?.addEventListener("click", () => {
    wrapper.classList.add("active");
  });

  loginLink?.addEventListener("click", () => {
    wrapper.classList.remove("active");
  });

  function createUserWithEmailAndPassword(email, password) {
    createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        return user.updateProfile({
          displayName: name,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  function signInWithEmailAndPassword() {
    signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="form-box login">
        {/* <h1 className="headtext__major">Login</h1>
        <div className="input-box">
          <label className="input-field">
            <label className="headtext__minor">Email</label>
            <input
              type="text"
              placeholder=" "
            />
          </label>
          <label className="input-field">
            <label
              className="headtext__minor"
            >
              Password
            </label>
            <input type="password" placeholder=" " />
          </label>
        </div>

        <div className="button-group">
          <button
            className="system-button system-button-primary"
            type="submit"
            onClick={() => signInWithEmailAndPassword(email, password)}
          >
            Login
          </button>
        </div>

        <div className="line-group">
          <div className="straight-line" />
          <p
            className="headtext__minor"
            style={{ margin: "0 10px", fontWeight: "400" }}
          >
            or
          </p>
          <div className="straight-line" />
        </div> */}
        <button
          className="system-button login-with-google-btn"
          onClick={props.loginWithGoogle}
          type="submit"
        >
          Login with Google
        </button>

        {/* <div className="login-register">
          <p className="headtext__minor">
            Don't have an account?{" "}
            <a href="#" className="register-link">
              Register
            </a>
          </p>
        </div>
      </form>

      <form onSubmit={handleSubmit} className="form-box register">
        <h1 className="headtext__major">Register</h1>
        <div className="input-box">
          <label className="input-field">
            <label className="headtext__minor">Name</label>
            <input
              type="text"
              placeholder=" "
            />
          </label>
          <label className="input-field">
            <label
              className="headtext__minor"
            >
              Email
            </label>
            <input type="text" placeholder=" " />
          </label>
          <label className="input-field">
            <label
              className="headtext__minor"
            >
              Password
            </label>
            <input type="password" placeholder=" " />
          </label>
        </div>

        <div className="button-group">
          <button
            className="system-button system-button-primary"
            type="submit"
            onClick={() => createUserWithEmailAndPassword(email, password)}
          >
            Register
          </button>
        </div>

        <div className="line-group">
          <div className="straight-line" />
          <p
            className="headtext__minor"
            style={{ margin: "0 10px", fontWeight: "400" }}
          >
            or
          </p>
          <div className="straight-line" />
        </div>
        <button
          className="system-button login-with-google-btn"
          onClick={props.loginWithGoogle}
          type="submit"
        >
          Login with Google
        </button>

        <div className="login-register">
          <p className="headtext__minor">
            Already have an account?{" "}
            <a href="#" className="login-link">
              Login
            </a>
          </p> */}
        {/* </div> */}
      </form>
    </div>
  );
};

export default LoginComponent;
