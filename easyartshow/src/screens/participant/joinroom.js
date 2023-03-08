import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue } from "@firebase/database";
import Navbar from "../../components/Navbar/Navbar";
import { AiOutlineArrowLeft } from "react-icons/ai";

function JoinRoom() {
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

  function joinroom() {
    if (roomCode in roomList) {
      // Debug
      navigate(`/waitingroom/${roomCode}`);
    } else {
      alert("Room does not exist");
    }
  }

  return (
    <div>
      <Navbar />
      <AiOutlineArrowLeft onClick={() => navigate(`/dashboard`)} />
      <h1> Join Room </h1>
      <br />
      Room passcode:{" "}
      <input type="text" onChange={onChangeHandler} value={roomCode} />
      <button onClick={() => joinroom()}>Join room</button>
    </div>
  );
}

export default JoinRoom;
