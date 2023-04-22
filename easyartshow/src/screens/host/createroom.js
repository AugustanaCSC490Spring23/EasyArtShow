import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "@firebase/auth";
import { getDatabase, ref, push, set } from "@firebase/database";
import { doc, getFirestore, setDoc } from "@firebase/firestore";
import Login from "./authentication/login";
import Navbar from "../../components/Navbar/Navbar";
import { Center } from "@react-three/drei";
import { AiOutlineArrowLeft, AiOutlineLeft } from "react-icons/ai";
import Switch from 'react-switch';
import "../../components/Room/CreateRoom.css";
import '../../components/Room/Modal.css';

function CreateRoom() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [isPrivate,setIsPrivate] = useState(false);
  const [roomDescription, setRoomDescription] = useState("");
  const [roomLocation, setRoomLocation] = useState("");
  const [isCheckedPublic, setIsCheckedPublic] = useState(false);
  const [isCheckedPrivate, setIsCheckedPrivate] = useState(false);
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
  const handlePublicChange = (event) => {
    setIsCheckedPublic(event.target.checked);
    setIsCheckedPrivate(!event.target.checked);
    setPrivacy("Public");
  };
  
  const handlePrivateChange = (event) => {
    setIsCheckedPrivate(event.target.checked);
    setIsCheckedPublic(!event.target.checked);
    setPrivacy("Private");
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
        privacy: privacy
        
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
      privacy:privacy
      
    });
   
    navigate(`/waitingroom/${randomCode}`);
  }

  const onChangeRoomName = (event) => {
    setRoomName(event.target.value);
  };

  const onChangeRoomDescription = (event) => {
    setRoomDescription(event.target.value);
  };

  const onChangeIsPrivate = (nextChecked) => {
    setIsPrivate(nextChecked);
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
              <input className="" type="text" onchange={onChangeRoomName} value={roomName} />
            </div>
            <div className="input-field">
              <h2 className="headtext__info">Room description</h2>
              <input className="" type="text" onchange={onChangeRoomName} value={roomName} />
            </div>
            <div className="button-group-row">
              <label>
                <input type="checkbox" />
                <span className="headtext__info">Anyone with link can contribute</span>
              </label>
              <div class="pricing-toggle">
              <input type="radio" id="pricing-toggle-monthly" name="pricing" value="monthly" checked/>
              <label class="radio-button" for="pricing-toggle-monthly">Private</label>
    
              <input type="radio" id="pricing-toggle-annually" name="pricing" value="annually" />
              <label class="radio-button" for="pricing-toggle-annually">Public</label>
            </div>
            </div>
            
            <div className="button-group-row">
              <button className="system-button" onClick={() => navigate(-1)}>No, cancel</button>
              <button className="system-button system-button-primary" onClick={() => createRoom()}>Create room</button>
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
