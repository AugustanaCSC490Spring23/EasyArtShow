import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  getAuth,
} from "@firebase/auth";
import { auth } from '../../../firebase';

function Login() {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  // const auth = getAuth();

  console.log(auth);
  const loginWithGoogle = async () => {
    const loginAttempt = await signInWithPopup(auth, provider)
      .then((result) => {
        console.log('success');
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
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div>
      Login
      <button onClick={() => navigate("/dashboard")}> Get started </button>
      <button onClick={loginWithGoogle}> Login with Google </button>
    </div>
  );
}

export default Login;
