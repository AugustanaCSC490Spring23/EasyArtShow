import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import '../../../components/Auth/Login.css';
import thumbnail from '../../../asset/Thumbnail.png';

function Login() {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        console.log(error.message);
        
      });
  };

  return (
    <div>
      <div className="left-screen">
        <div className="header">
          <img src={thumbnail} />
        </div>

        <div className="content">
          <h1 className="headtext__major">LOGIN</h1>
          <div className="input-box">
            <label className="input-field">
              <label className="headtext__minor">Email</label>
              <input type="text" placeholder=" "/>
            </label>
            <label className="input-field">
              <label className="headtext__minor">Password</label>
              <input type="text" placeholder=" "/>
            </label>
            <a className="headtext__major">Forget password?</a>
          </div>
      
          <div className="button-group">
            <button className="system-button system-button-primary">Login</button>
            <button className="system-button">Continue as guest</button>
          </div>

          <div className="line-group">
            <div className="straight-line"/>
            <p className="headtext__major" style={{ margin: "0 10px", fontWeight: "200" }}>or</p>
            <div className="straight-line" />
          </div>

          <button className="login-with-google-btn" onClick={loginWithGoogle}> Login with Google </button>
        </div>
        
        {/* <div className="footer">
          <p className="headtext__major" style={{ fontWeight: "200", fontSize: "12px"}}>@wearequails.</p>
        </div> */}
      </div>
      {/* <button onClick={() => navigate("/dashboard")}> Get started </button> */}
    </div>
  );
}

export default Login;
