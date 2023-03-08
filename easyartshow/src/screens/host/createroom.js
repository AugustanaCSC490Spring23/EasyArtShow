import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "@firebase/auth";
import { getDatabase, ref, push, set } from "@firebase/database";
import Login from "./authentication/login";
import Navbar from "../../components/Navbar/Navbar";

function CreateRoom() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomLocation, setRoomLocation] = useState("");
  const [roomIsPrivate, setRoomIsPrivate] = useState(true);
  const [roomVerify, setRoomVerify] = useState(true);

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
        roomIsPrivate: roomIsPrivate,
        roomVerify: roomVerify,
        roomParticipants: [],
      },
    });

    const postListRef = ref(db, `easyartshow/hosts/${user.uid}/${randomCode}`);
    set(postListRef, {
        roomName: roomName,
        roomCode: randomCode,
        roomDescription: roomDescription,
        roomLocation: roomLocation,
        roomIsPrivate: roomIsPrivate,
        roomVerify: roomVerify,
        roomParticipants: [],
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
          <h1> Create room </h1>
          <br />
          <h2> Your room name </h2>
          <input type="text" onChange={onChangeRoomName} value={roomName} />
          <br />
          <h2> Room description </h2>
          <textarea type="text" onChange={onChangeRoomDescription} value={roomDescription} />
          <br />
          {/* <br />
          <h2> Room location (leave blank if you don't want to add) </h2>
          <input type="text" />
          <br />
          <h3> Is your room public or private? </h3>
          <input type="radio" id="public" name="roomtype" value="public" />
          <label for="public"> Public </label>
          <br />
          <input type="radio" id="private" name="roomtype" value="private" />
          <label for="private"> Private </label>
          <br />
          <h3> Verify before uploading? </h3>
          <input type="radio" id="yes" name="verify" value="yes" />
          <label for="yes"> Yes </label>
          <br />
          <input type="radio" id="no" name="verify" value="no" />
          <label for="no"> No </label>
          <br /> */}
          <button onClick={() => createRoom()}> Create room </button>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default CreateRoom;
