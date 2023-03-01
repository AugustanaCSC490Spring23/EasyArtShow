import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue } from "@firebase/database";
import Header from "../../components/Header";

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

  function joinroom(id) {
    if (roomCode in roomList) {
      // Debug
      navigate(`/waitingroom/${roomCode}`);
    } else {
      alert("Room does not exist");
    }
  }

  return (
    <div>
      <Header />
      Name:{" "}
      <input
        type="text"
        onChange={onChangeParticipantName}
        value={roomPartcipantName}
      />
      Room passcode:{" "}
      <input type="text" onChange={onChangeHandler} value={roomCode} />
      <button onClick={() => joinroom()}>Join room</button>
    </div>
  );
}

export default JoinRoom;
