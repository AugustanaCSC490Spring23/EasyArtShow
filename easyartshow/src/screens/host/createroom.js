import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "@firebase/auth";
import { getDatabase, ref, push, set } from "@firebase/database";
import { doc, getFirestore, setDoc } from "@firebase/firestore";
import Login from "./authentication/login";
import Navbar from "../../components/Navbar/Navbar";
import { Center } from "@react-three/drei";
import { AiOutlineArrowLeft, AiOutlineConsoleSql, AiOutlineLeft } from "react-icons/ai";
import Switch from 'react-switch';
import "../../components/Room/CreateRoom.css";
import '../../components/Room/Modal.css';

function CreateRoom() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [isPrivate,setIsPrivate] = useState(true);
  const [roomDescription, setRoomDescription] = useState("");
  const [roomLocation, setRoomLocation] = useState("");
  const [includeCommentBox, setCommentBox] = useState(true);
  const [privacy, setPrivacy]= useState("");

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
  // const handlePublicChange = (event) => {
  //   setIsCheckedPublic(event.target.checked);
  //   setIsCheckedPrivate(!event.target.checked);
  //   setPrivacy("Public");
  //   console.log(privacy);
  // };
  
  // const handlePrivateChange = (event) => {
  //   setIsCheckedPrivate(event.target.checked);
  //   setIsCheckedPublic(!event.target.checked);
  //   setPrivacy("Private");
  //   console.log(privacy);
  // };

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
        privacy: isPrivate ? "Private" : "Public",
        commentBox: includeCommentBox ? "True" : "False"
        
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
      privacy: isPrivate ? "Private" : "Public",
      commentBox: includeCommentBox ? "True" : "False"
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

  const onChangeCommentBox = (event) => {
    setCommentBox(!event.target.checked);
  }

  return (
    <>
    {
      user ? (
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
                <input type="checkbox" onChange={onChangeCommentBox}/> Include comment box
              </label>
            </div>
            
            <div className="button-group-row">
              <button className="system-button-secondary" onClick={() => navigate(-1)}>Cancel</button>
              <button className="system-button-primary" onClick={() => createRoom()}>Create room</button>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  )
}

export default CreateRoom;
