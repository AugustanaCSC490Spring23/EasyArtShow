import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDatabase,
  ref,
  onValue,
  orderByChild,
  equalTo,
} from "@firebase/database";

import Navbar from "../components/Navbar/Navbar";
import "../components/Landing/LandingModal.css";
import { images } from "../constants/";
import TopView from "../components/TopView";

function MainPage() {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [roomPartcipantName, setRoomParticipantName] = useState("");
  //
  const [roomData, setRoomData] = useState({});
  const [publicRoomsMap, setPublicRoomsMap] = useState({});

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

  // function getPublicRooms() {
  //   return new Promise((resolve, reject) => {
  //     onValue(
  //       roomRef,
  //       (snapshot) => {
  //         const rooms = snapshot.val();
  //         if (rooms) {
  //           Object.keys(rooms).forEach((roomCode) => {
  //             const roomPrivacy = rooms[roomCode].roomInfo.privacy;
  //             const roomName = rooms[roomCode].roomInfo.roomName;
  //             if (roomPrivacy == "Public") {
  //               setPublicRoomsMap(roomCode, { roomCode, roomName });
  //               console.log(
  //                 publicRoomsMap.get(roomCode).roomCode,
  //                 publicRoomsMap.get(roomCode).roomName
  //               );
  //               setRoomData(roomName, roomCode);
  //             }
  //           });
  //           resolve(publicRoomsMap);
  //         }
  //       },
  //       (error) => {
  //         console.error("Error:", error);
  //       }
  //     );
  //   });
  // }
  function getPublicRooms() {
    return new Promise((resolve, reject) => {
      onValue(
        roomRef,
        (snapshot) => {
          const rooms = snapshot.val();
          if (rooms) {
            Object.keys(rooms).forEach((roomCode) => {
              const roomPrivacy = rooms[roomCode].roomInfo.privacy;
              const roomName = rooms[roomCode].roomInfo.roomName;
              if (roomPrivacy === "Public") {
                setPublicRoomsMap((prevState) => ({
                  ...prevState,
                  [roomCode]: { roomCode, roomName },
                }));
                setRoomData((prevState) => ({
                  ...prevState,
                  [roomCode]: { roomName, roomCode },
                }));
              }
            });
            resolve(publicRoomsMap);
          }
        },
        (error) => {
          console.error("Error:", error);
        }
      );
    });
  }

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
         
            {/* <li >
              <Link to="/About">About</Link>
            </li>
            <li>
              <Link to="/ContactUs">Contact</Link>
            </li> */}
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
          <div style={{ marginTop: '50px' }}>
            <h3> Public rooms: </h3>
            <button onClick={() => getPublicRooms()}> Get public rooms </button>
            <div style={{ display: "flex", flexDirection: "row", marginTop: '50px' , gap: '20px'}}>
              

              {Object.entries(publicRoomsMap).map(
                ([roomCode, roomData], index) => (
                  <div key={index} >
                    <h2>{roomData.roomName}</h2>
                    <p >Room Code: {roomData.roomCode}</p>                   
                    <p >Privacy: Public</p>
                    <button 
                      onClick={() => navigate(`/waitingroom/${roomCode}`)}
                    >
                      Join room
                    </button>
                  </div>
                )
              )}

            
            </div>
          </div>
        </div>
        <div className="img-wrapper">
          <img src={images.gallery04} alt="img" />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
