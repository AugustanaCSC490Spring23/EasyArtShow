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
      <button onClick={() => joinroom()}>Join room</button>
      </div>
    </div>
  );
}

export default JoinRoom;
