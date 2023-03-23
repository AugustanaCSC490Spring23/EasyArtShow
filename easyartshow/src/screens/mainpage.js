import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getDatabase, ref, onValue } from "@firebase/database";

import Navbar from "../components/Navbar/Navbar";
import "../components/Landing/LandingModal.css";
import { images } from "../constants/";

function MainPage() {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [roomList, setRoomList] = useState([]);
  const db = getDatabase();
  const roomRef = ref(db, "easyartshow/rooms/");
  // const ul = document.querySelector('ul');

  const onChangeHandler = (event) => {
    setRoomCode(event.target.value);
  };
  useEffect(() => {
    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      setRoomList(data);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0,  height: '50px' }}>
          <ul style={{display:'flex',  padding: '20px', gap: '50px'}}>
         
            <li >
              <Link to="/About">About</Link>
            </li>
            <li>
              <Link to="/ContactUs">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="modal-box">
          <div className="text-content">
            <h1 className="headtext__major headtext">
              Explore & Share Art Together
            </h1>
            <p className="headtext__minor">
              Li Europan lingues es membres del sam familie. Lor separat
              existentie es un myth. Por scientie, musica, sport etc, litot
              Europa usa li sam vocabular.
            </p>
          </div>

          <div className="headtext__major modal-title component-padding">
            Join Room
          </div>
          <input
            placeholder="Room passcode"
            type="text"
            onChange={onChangeHandler}
            value={roomCode}
          />
          <div className="button-group-row">
            <button className="system-button" onClick={() => joinroom()}>
              Join room
            </button>
            <button
              className="system-button system-button-primary"
              onClick={() => navigate("/dashboard")}
            >
              Create room
            </button>
          </div>
        </div>
        <div className="img-wrapper">
          <img src={images.gallery04} alt="img" />
        </div>
      </div>

      {/* <TopView /> */}
    </div>
  );
}

export default MainPage;
