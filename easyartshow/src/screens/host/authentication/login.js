import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div>
      Login
      <button onClick={() => navigate("/dashboard")}> Get started </button>
    </div>
  );
}

export default Login;
