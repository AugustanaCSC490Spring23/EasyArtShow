import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { doc, getFirestore, setDoc, updateDoc } from "@firebase/firestore";
import { randomCodeGenerator } from "../../../helperFunctions";

import Login from "../../../screens/host/authentication/login";

// CSS
import "./CreateRoom.css";
import "../../Room/Modal.css";

function CreateRoom() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [roomName, setRoomName] = useState("");

  const [roomDescription, setRoomDescription] = useState("");
  const [roomLocation, setRoomLocation] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [includeCommentBox, setCommentBox] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const createPublicRoom = (randomCode, privateMode, dbFireStore, currentTime) => {
    /**
     * Create public room in database
     * 
     * @param {string} randomCode - random code generated for room
     * @param {boolean} privateMode - true if private mode, false if public mode
     * @param {object} dbFireStore - firestore database object
     * @param {number} currentTime - current time in milliseconds
     * 
     * @returns {void}
     */
    
    setDoc(doc(dbFireStore, "public", randomCode), {
      hostid: user.uid,
      hostname: user.displayName,
      roomInfo: {
        roomName: roomName,
        roomCode: randomCode,
        roomDescription: roomDescription,
        roomLocation: roomLocation,
        roomPrivacy: isPrivate ? "Private" : "Public",
        commentBox: includeCommentBox ? "Include" : "Exclude",
        createdAt: currentTime,
      },
      images: [],
    });
  };
    
  const createRoomByMode = (privateMode, randomCode) => {
    /**
     * Create room in database
     * 
     * @param {boolean} privateMode - true if private mode, false if public mode
     * @param {string} randomCode - random code generated for room
     * 
     * @returns {void}
     * 
     */

    const dbFireStore = getFirestore();
    const currentTime = Date.now();
    const hostListRef = doc(dbFireStore, "hosts", `${user.uid}`);
    const roomRef = doc(dbFireStore, "rooms", randomCode);

    setDoc(roomRef, {
      hostid: user.uid,
      hostname: user.displayName,
      roomInfo: {
        roomName: roomName,
        roomDescription: roomDescription,
        roomLocation: roomLocation,
        roomCode: randomCode,
        roomPrivacy: isPrivate ? "Private" : "Public",
        commentBox: includeCommentBox ? "Include" : "Exclude",
        createdAt: currentTime,
      },
      images: [],
    });
    
    // Set host history
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
    
    // Create public room if public mode
    if (privateMode === false) {
      createPublicRoom(randomCode, privateMode, dbFireStore, currentTime);
    }
  };

  function createRoom() {
    /**
     * Create room
     * 
     * @returns {void}
     */
    const randomCode = randomCodeGenerator();
    createRoomByMode(isPrivate, randomCode);
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
  };

  const onChangeCommentBox = (event) => {
    setCommentBox(!event.target.checked);
    console.log(includeCommentBox);
  };

  return (
    <>
      {user ? (
        <div className="modal-background">
          <div className="modal">
            <h1 className="headtext__major">Create room</h1>
            <div className="input-field">
              <h2 className="headtext__info">Room name</h2>
              <input
                className=""
                type="text"
                onChange={onChangeRoomName}
                value={roomName}
              />
            </div>
            <div className="input-field">
              <h2 className="headtext__info">Room description</h2>
              <input
                className=""
                type="text"
                onChange={onChangeRoomDescription}
                value={roomDescription}
              />
            </div>

            <div className="button-group-row">
              <label className="headtext__info">
                <input type="checkbox" onChange={onChangeIsPrivate} /> Private
              </label>
              <label className="headtext__info">
                <input type="checkbox" onChange={onChangeCommentBox} /> Include
                comment box
              </label>
            </div>

            <div className="button-group-row">
              <button
                className="system-button-secondary system"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button
                className="system-button-primary"
                onClick={() => createRoom()}
              >
                Create room
              </button>
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
