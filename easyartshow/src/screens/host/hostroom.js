import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

import Login from "./authentication/login";

import HostHistory from "./HostHistory";
import Navbar from "../../components/Navbar/Navbar";
import WelcomeUser from "../../components/Dashboard/User";
import '../../components/Dashboard/Dashboard.css';
import { images } from '../../constants';

const HostRoom = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [goToJoinRoom, setGoToJoinRoom] = useState(false);


  function createRoom() {
    navigate("/createroom");
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    if (goToJoinRoom) {
      navigate("/joinroom");
    }
  }, [goToJoinRoom]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {user ? (
        <div>
          <Navbar />
          <div className="wrapper">
            <div className="content-wrapper">
              <WelcomeUser />
              <div className="button-group-row">
                <button className="system-button system-button-primary" onClick={() => createRoom()}> Create room </button>
                <button className="system-button" onClick={() => setGoToJoinRoom(true)}> Join room </button>
              </div>
              <HostHistory userUid={user.uid}/>
              {/* <button className="system-button logout-btn" onClick={() => logout()}>Logout</button>{" "} */}
            </div>
            <img src={images.gallery02} alt='gallery-img' className="img"/>
          </div>
        </div>
      ) : (
        <Login />
      )}
      </div>
  );
};

export default HostRoom;
