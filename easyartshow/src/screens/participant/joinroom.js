import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getFirestore,
  getDocs,
} from "@firebase/firestore";

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
    <div className="modal-background">
      <div className="modal">
        <h1 className="headtext__major">Join room</h1>
        <div className="input-field">
          <h2 className="headtext__info">Room passcode</h2>
          <input type="text" onChange={onChangeHandler} value={roomCode} />
        </div>
        <div className="button-group-row">
          <button className="system-button-secondary system" onClick={() => navigate(-1)}>Cancel</button>
          <button className="system-button-primary" onClick={() => joinRoom(roomCode)}>Join room</button>
        </div>
      </div>
    </div>
  );
}

export default JoinRoom;
