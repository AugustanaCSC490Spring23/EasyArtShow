import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../backend/firebase";
import { getFirestore, collection, getDocs } from "@firebase/firestore";

import Navbar from "../components/Navbar/Navbar";
import "../components/Landing/LandingModal.css";
import { images } from "../constants/";
import Carousel from "react-elastic-carousel";

import ThreeDView from "../components/ThreeD/ThreeDView";

function MainPage() {
  const navigate = useNavigate();
  const dbFireStore = getFirestore();

  const [roomCode, setRoomCode] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [user, setUser] = useState(null);
  const [publicRoomList, setPublicRoomList] = useState([]);
  const [publicRoomsMap, setPublicRoomsMap] = useState({});

  const onChangeHandler = (event) => {
    setRoomCode(event.target.value);
  };

  const getPublicRooms = async () => {
    /**
     * Get public rooms from database
     */
    const docRef = collection(dbFireStore, "public");
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      setPublicRoomList((prev) => [...prev, doc.data()]);
    });
  };

  const getRoomsList = async () => {
    /**
     * Get rooms from database
     */
    const docRef = collection(dbFireStore, "rooms");
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      setRoomList((prev) => [...prev, doc.data().roomInfo.roomCode]);
    });
  };

  function joinRoom(id) {
    /**
     * Join room
     *
     * @param {string} id - room code of the room to be joined
     *
     * @returns {void}
     */
    if (roomList.includes(roomCode)) {
      navigate(`/waitingroom/${roomCode}`);
    } else {
      alert("Room does not exist");
    }
  }

  function createRoom() {
    /**
     * Create room
     */
    if (user) {
      navigate("/createroom");
    } else {
      navigate("/dashboard");
    }
  }

  useEffect(() => {
    getRoomsList();
    getPublicRooms();
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="mainpage-container">
      <Navbar />
      <div className="modal-wrapper">
        <div className="modal-box">
          <div className="text-content">
            <h1 className="navbar-text headtext">
              Explore & Share Art Together
            </h1>
            <p className="navbar-text minor">
            Empower Your Artistic Journey with EasyArtShow: Discover, Connect, and Showcase Your Masterpieces on the Revolutionary Art Sharing Web App
            </p>
          </div>

          <div className="input-field">
            <h2 className="navbar-text">Join a room</h2>
            <input
              placeholder="Room passcode"
              type="text"
              onChange={onChangeHandler}
              value={roomCode}
            />
          </div>
          
          <div className="button-group-row">
            <button
              className="system-button-secondary"
              onClick={() => joinRoom(roomCode)}
            >
              Join room
            </button>
            <button className="custom-button" onClick={() => createRoom()}>
              Create room
            </button>
          </div>
          <div>
            <h3> Public rooms:</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "50px",
                gap: "20px",
              }}
            >
              {publicRoomList.map((room, index) => (
                <div key={index}>
                  <h2>{room.roomInfo.roomName}</h2>
                  <p>Room Code: {room.roomInfo.roomCode}</p>
                  <button
                    onClick={() =>
                      navigate(`/waitingroom/${room.roomInfo.roomCode}`)
                    }
                  >
                    Join room
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <div className="img-wrapper">
          <img src={images.gallery04} alt="img" />
        </div> */}
        <div style={{width: "50vw", height:"80vh"}}>
          <ThreeDView/>
        </div>
        
      </div>


      
    </div>
  );
}

export default MainPage;
