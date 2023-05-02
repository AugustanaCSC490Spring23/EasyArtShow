import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import {
  doc,
  getFirestore,
  setDoc,
  updateDoc,
  getDoc,
} from "@firebase/firestore";

import Login from "../../../screens/host/authentication/login";

import "./CreateRoom.css";
// import "../../components/Room/Room.css";

function CreateRoom() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [roomDescription, setRoomDescription] = useState("");
  const [roomLocation, setRoomLocation] = useState("");
  const [isCheckedPublic, setIsCheckedPublic] = useState(false);
  const [isCheckedPrivate, setIsCheckedPrivate] = useState(false);
  const [privacy, setPrivacy] = useState("");

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

  const createRoom = async () => {
    const randomCode = randomCodeGenerator();
    const dbFireStore = getFirestore();
    const currentTime = Date.now();
    const roomListRef = doc(dbFireStore, "rooms/" + randomCode);
    setDoc(roomListRef, {
      hostid: user.uid,
      hostname: user.displayName,
      roomInfo: {
        roomName: roomName,
        roomDescription: roomDescription,
        roomLocation: roomLocation,
        roomPrivacy: privacy,
        createdAt: currentTime,
        hostid: user.uid,
      },
      images: [],
    });

    const hostListRef = doc(dbFireStore, "hosts/", `${user.uid}`);
    const hostListSnap = await getDoc(hostListRef);
    if (hostListSnap.exists()) {
      updateDoc(hostListRef, {
        [randomCode]: {
          roomCode: randomCode,
          roomName: roomName,
          roomDescription: roomDescription,
          roomLocation: roomLocation,
          roomPrivacy: privacy,
          createdAt: currentTime,
          hostid: user.uid,
        },
      });
    } else {
      setDoc(hostListRef, {
        [randomCode]: {
          roomCode: randomCode,
          roomName: roomName,
          roomDescription: roomDescription,
          roomLocation: roomLocation,
          roomPrivacy: privacy,
          createdAt: currentTime,
          hostid: user.uid,
        },
      });
    }

    navigate(`/waitingroom/${randomCode}`);
  };

  const onChangeRoomName = (event) => {
    setRoomName(event.target.value);
  };

  const onChangeRoomDescription = (event) => {
    setRoomDescription(event.target.value);
  };

  const onChangeIsPrivate = (nextChecked) => {
    setIsPrivate(nextChecked);
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
                onChangeCapture={onChangeRoomName}
                value={roomName}
              />
            </div>
            <div className="input-field">
              <h2 className="headtext__info">Room description</h2>
              <input
                className=""
                type="text"
                onChangeCapture={onChangeRoomDescription}
                value={roomDescription}
              />
            </div>
            <div className="button-group-row">
              <label>
                <input type="checkbox" />
                <span className="headtext__info">
                  Anyone with link can contribute
                </span>
              </label>
              <div class="pricing-toggle">
                <input
                  type="radio"
                  id="pricing-toggle-monthly"
                  name="pricing"
                  value="monthly"
                  checked
                />
                <label class="radio-button" for="pricing-toggle-monthly">
                  Private
                </label>

                <input
                  type="radio"
                  id="pricing-toggle-annually"
                  name="pricing"
                  value="annually"
                />
                <label class="radio-button" for="pricing-toggle-annually">
                  Public
                </label>
              </div>
            </div>

            <div className="button-group-row">
              <button className="system-button" onClick={() => navigate(-1)}>
                No, cancel
              </button>
              <button
                className="system-button system-button-primary"
                onClick={() => createRoom()}
              >
                Create room
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1> Please log in before creating room </h1>
          <Login />
        </div>
      )}
    </>
  );
}

export default CreateRoom;
