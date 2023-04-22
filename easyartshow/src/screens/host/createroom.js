import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "@firebase/auth";
import { getDatabase, ref, push, set } from "@firebase/database";
import { doc, getFirestore, setDoc } from "@firebase/firestore";
import Login from "./authentication/login";
import Navbar from "../../components/Navbar/Navbar";
import { Center } from "@react-three/drei";
import { AiOutlineArrowLeft, AiOutlineLeft } from "react-icons/ai";

function CreateRoom() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomLocation, setRoomLocation] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const randomCodeGenerator = () => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  function createRoom() {
    const randomCode = randomCodeGenerator();

    const db = getDatabase();
    set(ref(db, "easyartshow/rooms/" + randomCode), {
      hostid: user.uid,
      hostname: user.displayName,
      roomInfo: {
        roomName: roomName,
        roomCode: randomCode,
        roomDescription: roomDescription,
        roomLocation: roomLocation,
        roomParticipants: [],
        timeStamp: Date.now(),
      },
    });

    const dbFireStore = getFirestore();  
    const postListRef = ref(db, `easyartshow/hosts/${user.uid}/${randomCode}`);
    set(postListRef, {
        roomName: roomName,
        roomCode: randomCode,
        roomDescription: roomDescription,
        roomLocation: roomLocation,
        roomParticipants: [],
        timeStamp: Date.now(),
    });
    navigate(`/waitingroom/${randomCode}`);
  }

  const onChangeRoomName = (event) => {
    setRoomName(event.target.value);
  };

  const onChangeRoomDescription = (event) => {
    setRoomDescription(event.target.value);
  };

  return (
    <div>
      {user ? (
        <div>
          <Navbar />
          <div style={{ textAlign:"center" }}> 
          <a href="/dashboard"> 
          < AiOutlineArrowLeft/> 
          <text> Go back to dashboard </text>
          </a>
          <h1> Create room </h1>
          <br />
          <h2> Your room name </h2>
          <input type="text" onChange={onChangeRoomName} value={roomName} />
          <br />
          <h2> Room description </h2>
          <textarea type="text" onChange={onChangeRoomDescription} value={roomDescription} />
          <br />
          <button onClick={() => createRoom()}> Create room </button>
        </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default CreateRoom;
