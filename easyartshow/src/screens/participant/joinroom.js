import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDocs, getFirestore, collection } from "@firebase/firestore";

import { AiOutlineArrowLeft } from "react-icons/ai";

import Navbar from "../../components/Navbar/Navbar";

function JoinRoom() {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const roomList = [];
  const firestoreDB = getFirestore();
  const roomRef = collection(firestoreDB, `rooms`);

  const onChangeHandler = (event) => {
    setRoomCode(event.target.value);
  };

  const getRoomData = async () => {
    const data = await getDocs(roomRef);
    data.forEach((doc) => {
      roomList.push(doc.id);
    });
  };

  const joinroom = async () => {
    await getRoomData();
    if (roomList.includes(roomCode)) {
      navigate(`/waitingroom/${roomCode}`);
    } else {
      alert("Room does not exist");
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Navbar />
        <a href="/dashboard">
          <AiOutlineArrowLeft />
          <text> Back to dashboard </text>
        </a>
        <h1> Join Room </h1>
        <br />
        Room passcode: <br />
        <br />
        <input type="text" onChange={onChangeHandler} value={roomCode} />
        <br />
        <br />
        <button onClick={() => joinroom()}>Join room</button>
      </div>
    </div>
  );
}

export default JoinRoom;
