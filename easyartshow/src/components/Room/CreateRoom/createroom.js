import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import {
  doc,
  getDoc,
  collection,
  getFirestore,
  setDoc,
  updateDoc,
  getDocs,
} from "@firebase/firestore";
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
  const [roomNameList, setRoomNameList] = useState([]); // eslint-disable-line no-unused-vars
  const [isPrivate, setIsPrivate] = useState(false);
  const [includeCommentBox, setCommentBox] = useState(true);

  const dbFireStore = getFirestore();

  // const getRoomsNameList = async (assignedName) => {
  //   /**
  //    * Get rooms from database
  //    */
  //   const docRef = collection(dbFireStore, "public");
  //   const querySnapshot = await getDocs(docRef);
  //   querySnapshot.forEach((doc) => {
  //     if (doc.data().roomInfo.roomName === assignedName) {
  //       alert(
  //         "Public room name already exists. Please choose another name or make this room private."
  //       );
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   });
  // };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const verifyInput = (roomName) => {
    /**
     * Verify input
     * @returns {boolean} true if input is valid, false otherwise
    */

    if (roomName === "") {
      alert("Please enter a room name.");
      return false;
    } else if (roomName.length > 20) {
      alert("Room name cannot be more than 20 characters.");
      return false;
    } else if (roomDescription.length > 100) {
      alert("Room description cannot be more than 100 characters.");
      return false;
    } else if (roomLocation.length > 100) {
      alert("Room location cannot be more than 100 characters.");
      return false;
    } else {
      return true;
    }
  };

  const createPublicRoom = (
    randomCode,
    privateMode,
    dbFireStore,
    currentTime
  ) => {
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

  const createRoomFromHost = (hostListRef, randomCode, currentTime) => {
    /**
     * Create room in database from host
     *
     * @param {object} hostListRef - host list reference
     * @param {string} randomCode - random code generated for room
     * @param {number} currentTime - current time in milliseconds
     *
     * @returns {void}
     */

    //Check if host exist
    getDoc(hostListRef).then((docSnap) => {
      if (!docSnap.exists()) {
        setDoc(hostListRef, {
          [randomCode]: {
            roomCode: randomCode,
            roomName: roomName,
            roomDescription: roomDescription,
            roomLocation: roomLocation,
            roomPrivacy: isPrivate ? "Private" : "Public",
            commentBox: includeCommentBox,
            createdAt: currentTime,
          },
        });
      } else {
        updateDoc(hostListRef, {
          [randomCode]: {
            roomCode: randomCode,
            roomName: roomName,
            roomDescription: roomDescription,
            roomLocation: roomLocation,
            roomPrivacy: isPrivate ? "Private" : "Public",
            commentBox: includeCommentBox,
            createdAt: currentTime,
          },
        });
      }
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

    // Create public room if public mode
    if (privateMode === false) {
      createPublicRoom(randomCode, privateMode, dbFireStore, currentTime);
    }

    setDoc(roomRef, {
      hostid: user.uid,
      hostname: user.displayName,
      roomInfo: {
        roomName: roomName,
        roomDescription: roomDescription,
        roomLocation: roomLocation,
        roomCode: randomCode,
        roomPrivacy: isPrivate ? "Private" : "Public",
        commentBox: includeCommentBox,
        createdAt: currentTime,
      },
      images: [],
    });

    // Set host history
    createRoomFromHost(hostListRef, randomCode, currentTime);
  };

  function createRoom() {
    /**
     * Create room
     *
     * @returns {void}
     */

    const randomCode = randomCodeGenerator();
    if (!verifyInput(roomName)) {
      return;
    } 
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
    setIsPrivate(!isPrivate);
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
