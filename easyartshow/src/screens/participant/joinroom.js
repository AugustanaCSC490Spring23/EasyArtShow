import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue } from "@firebase/database";

function JoinRoom() {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [roomList, setRoomList] = useState([]);
  const db = getDatabase();
  const roomRef = ref(db, "easyartshow/rooms/");

  const onChangeHandler = (event) => {
    setRoomCode(event.target.value);
  };

  function joinroom(code) {
    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      setRoomList(data);
    });
    
    if (roomCode in roomList) {
      navigate("/waitingroom");
    } else {
      alert("Room does not exist");
    }
  }

  return (
    <div>
      Name: <input type="text" />
      Room passcode:{" "}
      <input type="text" onChange={onChangeHandler} value={roomCode} />
      <button onClick={() => joinroom()}>Join room</button>
    </div>
  );
}

export default JoinRoom;
