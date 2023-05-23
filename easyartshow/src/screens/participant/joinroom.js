import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getFirestore,
  getDocs,
} from "@firebase/firestore";
import Navbar from "../../components/Navbar/Navbar";
import { AiOutlineArrowLeft } from "react-icons/ai";

function JoinRoom() {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [roomList, setRoomList] = useState([]);
  const dbFireStore = getFirestore();

  const onChangeHandler = (event) => {
    /**
     * Set room code
     * 
     * @param {Event} event - event object
     */
    setRoomCode(event.target.value);
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


  useEffect(() => {
    getRoomsList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function joinRoom(roomCode) {
    /**
     * Join room
     * 
     * @param {string} roomCode - room code of the room to be joined
     */
    if (roomList.includes(roomCode)) {
      navigate(`/waitingroom/${roomCode}`);
    } else {
      alert("Room does not exist");
    }
  }

  return (
    <div >
      <div style={{textAlign:"center"}}> 
      <Navbar />
      <a href="/dashboard"> 
      <AiOutlineArrowLeft/>
      <text> Back to dashboard </text>
      </a>
      <h1> Join Room </h1>
      <br />
      Room passcode:{" "}
      <br/>
      <br/>
      <input type="text" onChange={onChangeHandler} value={roomCode} />
      <br/>
      <br/>
      <button onClick={() => joinRoom(roomCode)}>Join room</button>
      </div>
    </div>
  );
}

export default JoinRoom;
