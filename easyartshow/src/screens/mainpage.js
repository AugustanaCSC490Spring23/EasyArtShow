import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import '../components/Landing/LandingModal.css';

function MainPage() {
  const navigate = useNavigate();
  return (
    <div className="mainpage-container">
      <Navbar />
      <div className="modal-wrapper">
        <div className="modal-box">
          <div className='headtext__major modal-title component-padding'>ARE YOU A HOST OR A PARTICIPANT?</div>
          <div className="button-group-row">
            <button className="system-button" onClick={() => navigate("/joinroom")}>Participant</button>
            <button className="system-button system-button-primary" onClick={() => navigate("/login")}>Host</button>
          </div>
        </div>
      </div>
      {/* <div className="section-padding">@2023.</div> */}
    </div>
  );
}

export default MainPage;
