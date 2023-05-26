import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "@firebase/auth";
import { getDatabase, ref, push, set } from "@firebase/database";
import {
  doc,
  getFirestore,
  setDoc,
  addDoc,
  updateDoc,
} from "@firebase/firestore";
import Login from "./authentication/login";
import Navbar from "../../components/Navbar/Navbar";
import { Center } from "@react-three/drei";
import { AiOutlineArrowLeft, AiOutlineLeft } from "react-icons/ai";
import "../../components/Room/CreateRoom.css";
import "../../components/Room/Modal.css";

function CreateRoom() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [roomName, setRoomName] = useState("");
  
  const [roomDescription, setRoomDescription] = useState("");
  const [roomLocation, setRoomLocation] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [includeCommentBox, setCommentBox] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    const dbFireStore = getFirestore();
    const currentTime = Date.now();
    setDoc(doc(dbFireStore, "rooms/" + randomCode), {
      hostid: user.uid,
      hostname: user.displayName,
      roomInfo: {
        roomName: roomName,
        roomDescription: roomDescription,
        roomLocation: roomLocation,
        roomPrivacy: isPrivate ? "Private" : "Public",
        commentBox: includeCommentBox ? "Include" : "Exclude",
        createdAt: currentTime,
      },
      images: [],
    });

    const hostListRef = doc(dbFireStore, "hosts/", `${user.uid}`);
    updateDoc(hostListRef, {
      [randomCode]: {
        roomCode: randomCode,
        roomName: roomName,
        roomDescription: roomDescription,
        roomLocation: roomLocation,
        roomPrivacy: isPrivate ? "Private" : "Public",
        commentBox: includeCommentBox ? "Include" : "Exclude",
        createdAt: currentTime,
      },
    });

    navigate(`/waitingroom/${randomCode}`);
  }

  const onChangeRoomName = (event) => {
    setRoomName(event.target.value);
  };

  const onChangeRoomDescription = (event) => {
    setRoomDescription(event.target.value);
  };

  const onChangeIsPrivate = (event) => {
    setIsPrivate(!event.target.checked);
  }

  return (
    <>
      {user ? (
        <div className="modal-background">
          <div className="modal">
            <h1 className="headtext__major">Create room</h1>
            <div className="input-field">
              <h2 className="headtext__info">Room name</h2>
              <input className="" type="text" onChange={onChangeRoomName} value={roomName} />
            </div>
            <div className="input-field">
              <h2 className="headtext__info">Room description</h2>
              <input className="" type="text" onChange={onChangeRoomDescription} value={roomDescription} />
            </div>

            <div className="button-group-row">
              <label className="headtext__info">
                <input type="checkbox" onChange={onChangeIsPrivate} /> Private
              </label>
              <label className="headtext__info">
                <input type="checkbox" onChange={() => setCommentBox(!includeCommentBox)} /> Include comment box
              </label>
            </div>
            
            <div className="button-group-row">
              <button className="system-button-secondary system" onClick={() => navigate(-1)}>Cancel</button>
              <button className="system-button-primary" onClick={() => createRoom()}>Create room</button>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default CreateRoom;
