import React from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  return (
    <div>
      Are you a host or a participant?
      <div>
        <button onClick={() => navigate("/login")}>Host</button>
        <button onClick={() => navigate("/joinroom")}>Participant</button>
      </div>
    </div>
  );
}

export default MainPage;
