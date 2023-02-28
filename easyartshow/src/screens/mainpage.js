import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";

function MainPage() {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      Are you a host or a participant?
      <div>
        <button onClick={() => navigate("/dashboard")}>Host</button>
        <button onClick={() => navigate("/joinroom")}>Participant</button>
      </div>
    </div>
  );
}

export default MainPage;
