import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import '../../../components/Auth/Login.css';
import { images } from "../../../constants";
import auth from '../../../backend/firebase';

function Login() {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    const loggingAttempt = await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        localStorage.setItem(user.displayName, token);
        navigate("/dashboard");
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        console.log(error.message);
        
      });
      console.log(loggingAttempt);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className='screen'>
      <div className='left-screen'>
        <img src={images.gallery01} className='gallery-img' alt='gallery img'/>
        <h5 className="headtext__minor" style={{ fontSize: "10px"}}><a href="https://www.freepik.com/free-vector/tourists-escorted-tour-composition_4358851.htm#&position=1&from_view=user#position=1">image by macrovector</a> on Freepik</h5>
      </div>


      <div className="right-screen">
        <div className="content-container">
          <div className="header">
            <img src={images.logo} alt='thumbnail' className="thumbnail-img"/>
          </div>

          <form onSubmit={handleSubmit}>
            <h1 className="headtext__major">Login</h1>
            <div className="input-box">
              <label className="input-field">
                <label className="headtext__minor">Email</label>
                <input type="text" placeholder=" "/>
              </label>
              <label className="input-field">
                <label className="headtext__minor">Password</label>
                <input type="text" placeholder=" "/>
              </label>
              <p className="headtext__minor">Forget password?</p>
            </div>
        
            <div className="button-group">
              <button className="system-button system-button-primary" type="submit">Login</button>
              <button className="system-button" onClick={() => navigate("/dashboard")} type="submit">Continue as guest</button>
            </div>

            <div className="line-group">
              <div className="straight-line"/>
              <p className="headtext__minor" style={{ margin: "0 10px", fontWeight: "400" }}>or</p>
              <div className="straight-line" />
          </div>
          <button className="system-button login-with-google-btn" onClick={loginWithGoogle} type="submit">Login with Google</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
