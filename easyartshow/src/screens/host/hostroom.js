import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "@firebase/auth";

import Login from "./authentication/login";
import WaitingRoom from "./waitingroom";

import { getDatabase, ref, set } from "@firebase/database";

const HostRoom = ({ user }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [goToJoinRoom, setGoToJoinRoom] = useState(false);

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  function createRoom() {
    navigate('/createroom');
  };

  useEffect(() => {
    if (goToJoinRoom) {
      navigate("/joinroom");
    }
  }, [goToJoinRoom]); // This will only listen to changes on value

  return (
    <div>
      Welcome, {user.displayName}
      <br />
      Your user ID is {user.uid}
      <br />
      <button onClick={() => createRoom()}> Create room </button>
      <br />
      <button onClick={() => setGoToJoinRoom(true)}> Join room </button>
      <br />
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default HostRoom;
