import React from "react";
import { useNavigate } from "react-router-dom";

import {  signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import '../../../components/Auth/Login.css';
import { images } from "../../../constants";
import auth from '../../../backend/firebase';

import LoginComponent from "../../../components/Auth/LoginComponent";

function Login() {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  function loginWithGoogle() {
    const loggingAttempt = signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error.message);
        
      });
      console.log(loggingAttempt);
  };

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
          <LoginComponent 
            loginWithGoogle={loginWithGoogle}
          />
        </div>
        
      </div>
    </div>
  );
}

export default Login;
