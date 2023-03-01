import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue } from "@firebase/database";

import Navbar from "../components/Navbar/Navbar";
import "../components/Landing/LandingModal.css";

function MainPage() {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [roomPartcipantName, setRoomParticipantName] = useState("");
  const db = getDatabase();
  const roomRef = ref(db, "easyartshow/rooms/");

  const onChangeParticipantName = (event) => {
    setRoomParticipantName(event.target.value);
  };

  const onChangeHandler = (event) => {
    setRoomCode(event.target.value);
  };
  useEffect(() => {
    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      setRoomList(data);
    });
  }, []);

  function joinroom(id) {
    if (roomCode in roomList) {
      // Debug
      navigate(`/waitingroom/${roomCode}`);
    } else {
      alert("Room does not exist");
    }
  }
  return (
    <div className="mainpage-container">
      <Navbar />
      <div className="modal-wrapper">
        <div className="modal-box">
          <div className="headtext__major modal-title component-padding">
            Join Room
          </div>
          <input placeholder="Room passcode" type="text" onChange={onChangeHandler} value={roomCode} />
          <div className="button-group-row">
          <button  className="system-button" onClick={() => joinroom()}>Join room</button>
            <button
              className="system-button system-button-primary"
              onClick={() => navigate("/dashboard")}
            >
              or Create room
            </button>
          </div>
        </div>
      </div>
      {/* <div className="section-padding">@2023.</div> */}
    </div>
  );
}

export default MainPage;
